const express = require("express");
const cors = require("cors");
const path = require("path");

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

// Rota principal - serve o HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// API - Calcular emissões de CO2
// POST /calculate
// Body: { distance: number, transport: "bike" | "car" | "bus" | "truck" }
// Response: { emission: number, unit: "kg CO2" }
app.post("/calculate", (req, res) => {
  try {
    const { distance, transport } = req.body;

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

    // Cálculo da emissão
    const emissionFactor = emissionFactors[transport];
    const emission = parseFloat((distance * emissionFactor).toFixed(2));

    // Resposta
    res.json({
      emission,
      unit: "kg CO2",
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
