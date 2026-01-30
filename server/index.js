const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Fatores de emissão de CO2 por tipo de transporte (kg CO2 por km)
const emissionFactors = {
  bike: 0, // Bicicleta: 0 kg de CO₂
  car: 0.21, // Carro: 0.21 kg de CO₂ por km
  bus: 0.1, // Ônibus: 0.10 kg de CO₂ por km
  truck: 0.27, // Caminhão: 0.27 kg de CO₂ por km
};

// Fator de correção para distância de rodovias
// A distância real por rodovia é aproximadamente 25% maior que a linha reta
// devido a curvas, desvios, contornos de montanhas, etc.
const HIGHWAY_CORRECTION_FACTOR = 1.25;

// Constantes para cálculo de créditos de carbono
const KG_PER_CARBON_CREDIT = 1000; // 1 crédito = 1000 kg de CO₂
const CARBON_CREDIT_PRICE_BRL = 52.86; // Valor em reais por crédito

// Cache para coordenadas das cidades (evitar chamadas repetidas)
const coordinatesCache = new Map();

// Função auxiliar para calcular distância entre duas coordenadas (Haversine)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raio da Terra em km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return parseFloat(distance.toFixed(2));
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Função para obter coordenadas de uma cidade via Nominatim (OpenStreetMap)
async function getCityCoordinates(cityName, stateName) {
  const cacheKey = `${cityName}-${stateName}`;

  // Verificar cache
  if (coordinatesCache.has(cacheKey)) {
    return coordinatesCache.get(cacheKey);
  }

  try {
    const searchQuery = `${cityName}, ${stateName}, Brasil`;
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: searchQuery,
          format: "json",
          limit: 1,
          addressdetails: 1,
        },
        headers: {
          "User-Agent": "CO2-Calculator-EcoTrip/1.0",
        },
      },
    );

    if (response.data && response.data.length > 0) {
      const coords = {
        lat: parseFloat(response.data[0].lat),
        lon: parseFloat(response.data[0].lon),
      };

      // Salvar no cache
      coordinatesCache.set(cacheKey, coords);

      return coords;
    }

    throw new Error("Coordenadas não encontradas");
  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error.message);
    throw error;
  }
}

// API - Obter lista de estados do Brasil
app.get("/api/estados", async (req, res) => {
  try {
    const response = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome",
    );

    const estados = response.data.map((estado) => ({
      id: estado.id,
      sigla: estado.sigla,
      nome: estado.nome,
    }));

    res.json(estados);
  } catch (error) {
    console.error("Erro ao buscar estados:", error.message);
    res.status(500).json({
      error: "Erro ao buscar lista de estados",
    });
  }
});

// API - Obter lista de municípios de um estado
app.get("/api/municipios/:estadoId", async (req, res) => {
  try {
    const { estadoId } = req.params;

    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios?orderBy=nome`,
    );

    const municipios = response.data.map((municipio) => ({
      id: municipio.id,
      nome: municipio.nome,
    }));

    res.json(municipios);
  } catch (error) {
    console.error("Erro ao buscar municípios:", error.message);
    res.status(500).json({
      error: "Erro ao buscar lista de municípios",
    });
  }
});

// API - Calcular distância entre duas cidades
app.post("/api/calculate-distance", async (req, res) => {
  try {
    const { origemCidade, origemEstado, destinoCidade, destinoEstado } =
      req.body;

    // Validações
    if (!origemCidade || !origemEstado || !destinoCidade || !destinoEstado) {
      return res.status(400).json({
        error: "Todos os campos são obrigatórios",
      });
    }

    // Obter coordenadas das cidades
    const origemCoords = await getCityCoordinates(origemCidade, origemEstado);
    const destinoCoords = await getCityCoordinates(
      destinoCidade,
      destinoEstado,
    );

    // Calcular distância em linha reta (Haversine)
    const straightLineDistance = calculateDistance(
      origemCoords.lat,
      origemCoords.lon,
      destinoCoords.lat,
      destinoCoords.lon,
    );

    // Aplicar fator de correção para distância de rodovia
    // Rodovias são aproximadamente 25% mais longas que a linha reta
    const roadDistance = parseFloat(
      (straightLineDistance * HIGHWAY_CORRECTION_FACTOR).toFixed(2),
    );

    res.json({
      distance: roadDistance,
      straightLineDistance: straightLineDistance,
      correctionFactor: HIGHWAY_CORRECTION_FACTOR,
      unit: "km",
      origem: {
        cidade: origemCidade,
        estado: origemEstado,
        coordinates: origemCoords,
      },
      destino: {
        cidade: destinoCidade,
        estado: destinoEstado,
        coordinates: destinoCoords,
      },
    });
  } catch (error) {
    console.error("Erro ao calcular distância:", error.message);
    res.status(500).json({
      error:
        "Não foi possível calcular a distância automaticamente. Por favor, insira a distância manualmente.",
      fallbackToManual: true,
    });
  }
});

// Rota principal - serve o HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// API - Calcular emissões de CO2
// POST /calculate
// Body: { distance: number (opcional se enviado origens/destinos), transport: string, origemCidade, origemEstado, destinoCidade, destinoEstado }
// Response: { emission: number, unit: "kg CO2", distance: number }
app.post("/calculate", async (req, res) => {
  try {
    let {
      distance,
      transport,
      origemCidade,
      origemEstado,
      destinoCidade,
      destinoEstado,
    } = req.body;

    // Se não tiver distância, tentar calcular automaticamente
    if (!distance || distance <= 0) {
      if (origemCidade && origemEstado && destinoCidade && destinoEstado) {
        try {
          // Obter coordenadas e calcular distância
          const origemCoords = await getCityCoordinates(
            origemCidade,
            origemEstado,
          );
          const destinoCoords = await getCityCoordinates(
            destinoCidade,
            destinoEstado,
          );

          // Calcular distância em linha reta
          const straightLineDistance = calculateDistance(
            origemCoords.lat,
            origemCoords.lon,
            destinoCoords.lat,
            destinoCoords.lon,
          );

          // Aplicar fator de correção para distância de rodovia
          distance = parseFloat(
            (straightLineDistance * HIGHWAY_CORRECTION_FACTOR).toFixed(2),
          );
        } catch (error) {
          return res.status(400).json({
            error:
              "Não foi possível calcular a distância automaticamente. Por favor, insira a distância manualmente.",
            fallbackToManual: true,
          });
        }
      } else {
        return res.status(400).json({
          error:
            "A distância deve ser fornecida ou as cidades de origem e destino devem ser especificadas",
        });
      }
    }

    // Validação: distância maior que zero
    if (!distance || typeof distance !== "number" || distance <= 0) {
      return res.status(400).json({
        error: "A distância deve ser um número maior que zero",
      });
    }

    // Validação: meio de transporte válido
    if (!transport || !emissionFactors.hasOwnProperty(transport)) {
      return res.status(400).json({
        error:
          "Meio de transporte inválido. Escolha entre: bike, car, bus ou truck",
      });
    }

    // Cálculo da emissão para o transporte selecionado
    const emissionFactor = emissionFactors[transport];
    const emission = parseFloat((distance * emissionFactor).toFixed(2));

    // Mapeamento de tipos para nomes amigáveis
    const transportNames = {
      bike: "Bicicleta",
      car: "Carro",
      bus: "Ônibus",
      truck: "Caminhão",
    };

    const transportIcons = {
      bike: "🚴",
      car: "🚗",
      bus: "🚌",
      truck: "🚚",
    };

    // Calcular comparação com TODOS os meios de transporte (formato array)
    const comparison = [
      {
        type: "Bicicleta",
        key: "bike",
        icon: "🚴",
        emission: parseFloat((distance * emissionFactors.bike).toFixed(2)),
        factor: emissionFactors.bike,
      },
      {
        type: "Carro",
        key: "car",
        icon: "🚗",
        emission: parseFloat((distance * emissionFactors.car).toFixed(2)),
        factor: emissionFactors.car,
      },
      {
        type: "Ônibus",
        key: "bus",
        icon: "🚌",
        emission: parseFloat((distance * emissionFactors.bus).toFixed(2)),
        factor: emissionFactors.bus,
      },
      {
        type: "Caminhão",
        key: "truck",
        icon: "🚚",
        emission: parseFloat((distance * emissionFactors.truck).toFixed(2)),
        factor: emissionFactors.truck,
      },
    ];

    // Calcular créditos de carbono necessários
    const carbonCredits = parseFloat(
      (emission / KG_PER_CARBON_CREDIT).toFixed(2),
    );
    const carbonCreditCost = parseFloat(
      (carbonCredits * CARBON_CREDIT_PRICE_BRL).toFixed(2),
    );

    // Resposta
    res.json({
      distance: parseFloat(distance.toFixed(2)),
      unit: "kg CO2",
      selectedTransport: {
        type: transport,
        name: transportNames[transport],
        icon: transportIcons[transport],
        emission: emission,
        factor: emissionFactor,
      },
      carbonCredits: {
        creditsNeeded: carbonCredits,
        pricePerCredit: CARBON_CREDIT_PRICE_BRL,
        totalCost: carbonCreditCost,
      },
      comparison,
    });
  } catch (error) {
    console.error("Erro ao calcular emissões:", error);
    res.status(500).json({
      error: "Erro interno do servidor ao calcular emissões",
    });
  }
});

// Rota para obter fatores de emissão (informativa)
app.get("/emission-factors", (req, res) => {
  res.json({
    factors: emissionFactors,
    info: "Fatores de emissão em kg CO2 por km",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌍 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/calculate`);
});
