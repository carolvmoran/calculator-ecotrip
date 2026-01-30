const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Fatores de emissão de CO2 por tipo de transporte (kg CO2 por km)
const emissionFactors = {
  bicicleta: 0,
  carro: 0.192,      // ~192g CO2/km (média de carros a gasolina)
  onibus: 0.089,     // ~89g CO2/km por passageiro
  caminhao: 0.962    // ~962g CO2/km (caminhão de carga)
};

// Rota principal - serve o HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API - Calcular emissões de CO2
app.post('/api/calculate', (req, res) => {
  try {
    const { origem, destino, distancia, transporte } = req.body;

    // Validações
    if (!origem || origem.trim() === '') {
      return res.status(400).json({
        error: 'A cidade de origem é obrigatória'
      });
    }

    if (!destino || destino.trim() === '') {
      return res.status(400).json({
        error: 'A cidade de destino é obrigatória'
      });
    }

    if (!distancia || distancia <= 0) {
      return res.status(400).json({
        error: 'A distância deve ser maior que zero'
      });
    }

    if (!transporte || !emissionFactors.hasOwnProperty(transporte)) {
      return res.status(400).json({
        error: 'Tipo de transporte inválido. Escolha entre: bicicleta, carro, onibus ou caminhao'
      });
    }

    // Cálculo da emissão
    const fatorEmissao = emissionFactors[transporte];
    const emissaoCO2 = (distancia * fatorEmissao).toFixed(2);

    // Cálculo de equivalências
    const arvoresNecessarias = Math.ceil(emissaoCO2 / 21); // Uma árvore absorve ~21kg CO2/ano

    // Resposta
    res.json({
      success: true,
      data: {
        origem,
        destino,
        distancia,
        transporte,
        emissaoCO2: parseFloat(emissaoCO2),
        unidade: 'kg',
        arvoresNecessarias,
        mensagem: transporte === 'bicicleta' 
          ? '🎉 Parabéns! A bicicleta não emite CO2!'
          : `Esta viagem emite ${emissaoCO2} kg de CO2`
      }
    });

  } catch (error) {
    console.error('Erro ao calcular emissões:', error);
    res.status(500).json({
      error: 'Erro interno do servidor ao calcular emissões'
    });
  }
});

// Rota para obter fatores de emissão (informativa)
app.get('/api/emission-factors', (req, res) => {
  res.json({
    success: true,
    factors: emissionFactors,
    info: 'Fatores de emissão em kg CO2 por km'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌍 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api/calculate`);
});
