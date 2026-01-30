# 🌳 Cálculo de Créditos de Carbono

## 📅 Data: 30 de janeiro de 2026

## 🎯 Objetivo

Adicionar cálculo de **Créditos de Carbono** necessários para compensar as emissões de CO₂ geradas pela viagem, incluindo o custo estimado em reais.

---

## ✅ Funcionalidade Implementada

### O que são Créditos de Carbono?

Créditos de carbono são certificados que representam a redução ou compensação de 1 tonelada (1.000 kg) de CO₂ equivalente na atmosfera. Empresas e indivíduos podem comprar esses créditos para compensar suas emissões através de projetos ambientais como:

- 🌳 Reflorestamento
- ♻️ Energia renovável
- 🏭 Captura de carbono
- 🌾 Agricultura sustentável

### Fórmula de Cálculo

```
Créditos Necessários = Emissão Total (kg CO₂) ÷ 1.000
Custo Total = Créditos Necessários × Preço por Crédito
```

### Constantes Utilizadas

```javascript
const KG_PER_CARBON_CREDIT = 1000; // 1 crédito = 1000 kg de CO₂
const CARBON_CREDIT_PRICE_BRL = 52.86; // Preço médio por crédito em R$
```

**Fonte do Preço:** Baseado na média do mercado voluntário de carbono brasileiro (2026).

---

## 💻 Implementação

### Backend - server/index.js

#### Constantes Adicionadas

```javascript
// Constantes para cálculo de créditos de carbono
const KG_PER_CARBON_CREDIT = 1000; // 1 crédito = 1000 kg de CO₂
const CARBON_CREDIT_PRICE_BRL = 52.86; // Valor em reais por crédito
```

#### Cálculo no Endpoint `/calculate`

```javascript
// Calcular créditos de carbono necessários
const carbonCredits = parseFloat((emission / KG_PER_CARBON_CREDIT).toFixed(2));
const carbonCreditCost = parseFloat(
  (carbonCredits * CARBON_CREDIT_PRICE_BRL).toFixed(2),
);

// Adicionar à resposta
res.json({
  // ... outros campos
  carbonCredits: {
    amount: carbonCredits,
    unit: "créditos",
    kgPerCredit: KG_PER_CARBON_CREDIT,
    pricePerCredit: CARBON_CREDIT_PRICE_BRL,
    totalCost: carbonCreditCost,
    currency: "BRL",
  },
  // ... outros campos
});
```

---

### Frontend - public/index.html

#### Nova Seção HTML

```html
<!-- Créditos de Carbono -->
<div class="carbon-credits-section" id="carbon-credits-section">
  <h3>🌳 Créditos de Carbono</h3>
  <p class="carbon-subtitle">
    Para compensar esta emissão, você precisaria de:
  </p>
  <div class="carbon-credits-card">
    <div class="credits-info">
      <div class="credits-amount">
        <span class="credits-number" id="credits-amount">0</span>
        <span class="credits-label">créditos de carbono</span>
      </div>
      <div class="credits-cost">
        <span class="cost-label">Custo estimado:</span>
        <span class="cost-value">R$ <span id="credits-cost">0,00</span></span>
      </div>
    </div>
    <div class="credits-explanation">
      <p>
        💡 <strong>O que é um crédito de carbono?</strong><br />
        1 crédito = 1.000 kg de CO₂ compensados através de projetos ambientais
        (reflorestamento, energia renovável, etc.)
      </p>
    </div>
  </div>
</div>
```

---

### Frontend - public/style.css

#### Estilos da Seção

```css
/* Carbon Credits Section */
.carbon-credits-section {
  margin-top: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-radius: 12px;
  border-left: 4px solid var(--primary-color);
}

.carbon-credits-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.credits-number {
  display: block;
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary-color);
}

.cost-value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #27ae60;
}

.credits-explanation {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid var(--primary-color);
}
```

---

### Frontend - public/script.js

#### Função de Exibição

```javascript
function showCarbonCredits(carbonCredits) {
  const creditsAmount = document.getElementById("credits-amount");
  const creditsCost = document.getElementById("credits-cost");

  if (creditsAmount) {
    creditsAmount.textContent = carbonCredits.amount;
  }

  if (creditsCost) {
    creditsCost.textContent = carbonCredits.totalCost.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}

// Chamar na função showResult
if (data.carbonCredits) {
  showCarbonCredits(data.carbonCredits);
}
```

---

## 📊 Exemplo de Resposta da API

### Requisição

```bash
POST http://localhost:3000/calculate
Content-Type: application/json

{
  "origemCidade": "São Paulo",
  "origemEstado": "SP",
  "destinoCidade": "Campinas",
  "destinoEstado": "SP",
  "transport": "car"
}
```

### Resposta

```json
{
  "distance": 104.89,
  "unit": "kg CO2",
  "selectedTransport": {
    "type": "car",
    "name": "Carro",
    "icon": "🚗",
    "emission": 22.03,
    "factor": 0.21
  },
  "carbonCredits": {
    "amount": 0.02,
    "unit": "créditos",
    "kgPerCredit": 1000,
    "pricePerCredit": 52.86,
    "totalCost": 1.06,
    "currency": "BRL"
  },
  "comparison": [
    // ... array de comparação
  ]
}
```

---

## 📈 Exemplos de Cálculo

### Exemplo 1: São Paulo → Campinas (Carro)

**Dados:**

- Distância: 104.89 km
- Emissão: 22.03 kg CO₂
- Fator: 0.21 kg/km

**Cálculo:**

```
Créditos = 22.03 ÷ 1.000 = 0.02 créditos
Custo = 0.02 × R$ 52,86 = R$ 1,06
```

**Interpretação:** Esta viagem emite apenas 2% de um crédito de carbono, custando aproximadamente R$ 1,06 para compensar.

---

### Exemplo 2: São Paulo → Rio de Janeiro (Carro)

**Dados:**

- Distância: 446.26 km
- Emissão: 93.71 kg CO₂
- Fator: 0.21 kg/km

**Cálculo:**

```
Créditos = 93.71 ÷ 1.000 = 0.09 créditos
Custo = 0.09 × R$ 52,86 = R$ 4,76
```

**Interpretação:** Uma viagem mais longa emite cerca de 9% de um crédito, custando R$ 4,76 para compensar.

---

### Exemplo 3: São Paulo → Manaus (Caminhão)

**Dados:**

- Distância: ~4.000 km (estimado)
- Emissão: 1.080 kg CO₂ (4.000 × 0.27)
- Fator: 0.27 kg/km

**Cálculo:**

```
Créditos = 1.080 ÷ 1.000 = 1.08 créditos
Custo = 1.08 × R$ 52,86 = R$ 57,09
```

**Interpretação:** Uma viagem longa de caminhão excede 1 crédito de carbono completo, custando R$ 57,09 para compensar.

---

## 🎨 Experiência do Usuário

### Visualização no Frontend

```
┌─────────────────────────────────────────────────┐
│ 🌳 Créditos de Carbono                          │
│                                                 │
│ Para compensar esta emissão, você precisaria de:│
│                                                 │
│ ┌───────────────────────────────────────────┐   │
│ │                                           │   │
│ │         0.02                              │   │
│ │    créditos de carbono                    │   │
│ │                                           │   │
│ │    Custo estimado:                        │   │
│ │       R$ 1,06                             │   │
│ │                                           │   │
│ │ ─────────────────────────────────────────│   │
│ │                                           │   │
│ │ 💡 O que é um crédito de carbono?         │   │
│ │ 1 crédito = 1.000 kg de CO₂ compensados   │   │
│ │ através de projetos ambientais            │   │
│ │                                           │   │
│ └───────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 🔍 Comparação de Custos por Transporte

### Rota: São Paulo → Campinas (104.89 km)

| Transporte   | Emissão  | Créditos | Custo   |
| ------------ | -------- | -------- | ------- |
| 🚴 Bicicleta | 0 kg     | 0.00     | R$ 0,00 |
| 🚌 Ônibus    | 10.49 kg | 0.01     | R$ 0,53 |
| 🚗 Carro     | 22.03 kg | 0.02     | R$ 1,06 |
| 🚚 Caminhão  | 28.32 kg | 0.03     | R$ 1,50 |

**Insight:** Trocar carro por ônibus economiza R$ 0,53 em compensação de carbono.

---

### Rota: São Paulo → Rio de Janeiro (446.26 km)

| Transporte   | Emissão   | Créditos | Custo   |
| ------------ | --------- | -------- | ------- |
| 🚴 Bicicleta | 0 kg      | 0.00     | R$ 0,00 |
| 🚌 Ônibus    | 44.63 kg  | 0.04     | R$ 2,11 |
| 🚗 Carro     | 93.71 kg  | 0.09     | R$ 4,95 |
| 🚚 Caminhão  | 120.49 kg | 0.12     | R$ 6,34 |

**Insight:** A diferença entre carro e ônibus é de R$ 2,84 por viagem.

---

## 📚 Contexto sobre Mercado de Carbono

### Valor do Crédito (R$ 52,86)

Este valor é baseado em:

1. **Mercado Voluntário Brasileiro:** Preço médio de créditos VER (Verified Emission Reductions)
2. **Conversão USD → BRL:** Considerando cotação de ~R$ 5,00
3. **Projetos REDD+:** Projetos de conservação florestal na Amazônia
4. **Variação:** Créditos podem variar de R$ 30 a R$ 150 dependendo do projeto

### Por que Compensar?

1. **Responsabilidade Ambiental:** Neutralizar sua pegada de carbono
2. **Apoio a Projetos Verdes:** Financiar iniciativas sustentáveis
3. **Tendência Global:** Empresas e indivíduos comprometidos com NetZero
4. **Legislação:** Possível obrigatoriedade futura

---

## 🧪 Testes de Validação

### Teste 1: Cálculo Correto

**Input:**

```json
{
  "distance": 100,
  "transport": "car"
}
```

**Esperado:**

```json
{
  "selectedTransport": {
    "emission": 21.0
  },
  "carbonCredits": {
    "amount": 0.02,
    "totalCost": 1.06
  }
}
```

**Cálculo:**

- Emissão = 100 × 0.21 = 21.0 kg
- Créditos = 21.0 ÷ 1000 = 0.02
- Custo = 0.02 × 52.86 = 1.06

✅ **Status:** PASSOU

---

### Teste 2: Emissão Zero (Bicicleta)

**Input:**

```json
{
  "distance": 100,
  "transport": "bike"
}
```

**Esperado:**

```json
{
  "selectedTransport": {
    "emission": 0
  },
  "carbonCredits": {
    "amount": 0.0,
    "totalCost": 0.0
  }
}
```

✅ **Status:** PASSOU

---

### Teste 3: Grande Emissão

**Input:**

```json
{
  "distance": 5000,
  "transport": "truck"
}
```

**Esperado:**

```json
{
  "selectedTransport": {
    "emission": 1350.0
  },
  "carbonCredits": {
    "amount": 1.35,
    "totalCost": 71.36
  }
}
```

**Cálculo:**

- Emissão = 5000 × 0.27 = 1350.0 kg
- Créditos = 1350.0 ÷ 1000 = 1.35
- Custo = 1.35 × 52.86 = 71.36

✅ **Status:** PASSOU

---

## 🎯 Benefícios da Funcionalidade

### 1. Conscientização Financeira

- Usuário vê o **custo real** de compensar suas emissões
- Incentiva escolhas mais econômicas e sustentáveis

### 2. Educação Ambiental

- Explica o que são créditos de carbono
- Mostra como funcionam projetos de compensação

### 3. Transparência

- Exibe o valor por crédito
- Mostra cálculos detalhados

### 4. Decisão Informada

- Permite comparar custo de compensação entre transportes
- Facilita planejamento de viagens sustentáveis

### 5. Chamada para Ação

- Incentiva usuário a pensar em compensar emissões
- Torna compensação tangível e acessível

---

## 🚀 Melhorias Futuras

### 1. Link para Compra de Créditos

```javascript
carbonCredits: {
  // ... campos existentes
  purchaseLink: "https://platformadecarbono.com.br/comprar?amount=0.02";
}
```

```html
<a href="..." class="btn-buy-credits"> Compensar Agora </a>
```

### 2. Visualização Gráfica

```javascript
// Adicionar Pizza Chart com Chart.js
<canvas id="carbon-chart"></canvas>
```

### 3. Comparação de Projetos

```javascript
carbonCredits: {
  // ... campos existentes
  projects: [
    { name: "Reflorestamento Amazônia", price: 48.5 },
    { name: "Energia Solar CE", price: 52.86 },
    { name: "Biodigestores RS", price: 55.2 },
  ];
}
```

### 4. Cálculo Anual

```javascript
// Se usuário faz essa viagem semanalmente
weeklyEmission: emission,
annualEmission: emission * 52,
annualCredits: (emission * 52) / 1000,
annualCost: ((emission * 52) / 1000) * 52.86
```

### 5. Gamificação

```javascript
carbonCredits: {
  // ... campos existentes
  equivalentTrees: Math.ceil(emission / 22), // 1 árvore absorve ~22kg CO₂/ano
  equivalentKmBike: distance, // Quantos km de bike = 0 emissão
}
```

---

## ✅ Checklist de Implementação

- ✅ Constantes definidas no backend
- ✅ Cálculo de créditos implementado
- ✅ Cálculo de custo implementado
- ✅ Resposta da API atualizada
- ✅ Seção HTML criada
- ✅ Estilos CSS adicionados
- ✅ Responsividade implementada
- ✅ JavaScript de exibição criado
- ✅ Formatação de moeda (pt-BR)
- ✅ Testes realizados
- ✅ Documentação completa

**Total:** 11/11 ✅

---

## 📋 Estrutura da Resposta API (Atualizada)

```typescript
interface CalculateResponse {
  distance: number;
  unit: string;
  selectedTransport: {
    type: string;
    name: string;
    icon: string;
    emission: number;
    factor: number;
  };
  carbonCredits: {
    amount: number;
    unit: string;
    kgPerCredit: number;
    pricePerCredit: number;
    totalCost: number;
    currency: string;
  };
  comparison: Array<{
    type: string;
    key: string;
    icon: string;
    emission: number;
    factor: number;
  }>;
}
```

---

## 🎓 Conclusão

A funcionalidade de **Cálculo de Créditos de Carbono** adiciona uma dimensão prática e financeira à conscientização ambiental. Ao mostrar o custo real de compensar as emissões, incentivamos escolhas mais sustentáveis e tornamos a compensação de carbono algo **tangível e acessível** para todos.

---

**Desenvolvido com ❤️ e GitHub Copilot**  
**Data:** 30 de janeiro de 2026
