# 📊 Comparação entre Meios de Transporte

## 📅 Data: 30 de janeiro de 2026

## 🎯 Objetivo

Adicionar uma funcionalidade que permite ao usuário **comparar as emissões de CO₂** de diferentes meios de transporte para a mesma viagem, incentivando escolhas mais sustentáveis.

---

## ✅ Funcionalidades Implementadas

### Backend

✅ Endpoint `/calculate` agora retorna comparação completa  
✅ Cálculo automático para TODOS os meios de transporte  
✅ Dados estruturados com nome, ícone, emissão e fator  
✅ Indicação do transporte selecionado pelo usuário

### Frontend

✅ Nova seção "Comparação entre Meios de Transporte"  
✅ Grid responsivo com cards para cada meio de transporte  
✅ Destaque visual do transporte selecionado  
✅ Dica de sustentabilidade incentivando escolhas ecológicas  
✅ Animações suaves e design moderno

---

## 🏗️ Arquitetura

### Fluxo de Dados

```
┌─────────────────────────┐
│ Usuário calcula emissão │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ POST /calculate                     │
│ { distance, transport, cidades }    │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Backend calcula:                    │
│ 1. Emissão do transporte escolhido  │
│ 2. Emissão de TODOS os transportes  │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Retorna JSON com:                   │
│ - emission (selecionado)            │
│ - comparison (todos)                │
│ - selectedTransport                 │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Frontend exibe:                     │
│ 1. Resultado principal              │
│ 2. Grid de comparação               │
│ 3. Destaque do selecionado          │
│ 4. Dica de sustentabilidade         │
└─────────────────────────────────────┘
```

---

## 💻 Implementação

### 1. Backend - server/index.js

#### Cálculo de Comparação

```javascript
// Calcular comparação com TODOS os meios de transporte
const comparison = {
  bike: {
    name: "Bicicleta",
    icon: "🚴",
    emission: parseFloat((distance * emissionFactors.bike).toFixed(2)),
    factor: emissionFactors.bike,
  },
  car: {
    name: "Carro",
    icon: "🚗",
    emission: parseFloat((distance * emissionFactors.car).toFixed(2)),
    factor: emissionFactors.car,
  },
  bus: {
    name: "Ônibus",
    icon: "🚌",
    emission: parseFloat((distance * emissionFactors.bus).toFixed(2)),
    factor: emissionFactors.bus,
  },
  truck: {
    name: "Caminhão",
    icon: "🚚",
    emission: parseFloat((distance * emissionFactors.truck).toFixed(2)),
    factor: emissionFactors.truck,
  },
};
```

#### Resposta da API

```javascript
res.json({
  emission, // Emissão do transporte selecionado
  unit: "kg CO2",
  distance: parseFloat(distance.toFixed(2)),
  selectedTransport: transport, // Qual foi selecionado
  comparison, // Comparação completa
});
```

---

### 2. Frontend - public/index.html

#### Estrutura HTML

```html
<!-- Comparação entre Meios de Transporte -->
<div class="comparison-section" id="comparison-section">
  <h3>📊 Comparação entre Meios de Transporte</h3>
  <p class="comparison-subtitle">
    Veja quanto CO₂ seria emitido com cada meio de transporte para esta mesma
    viagem:
  </p>
  <div class="comparison-grid" id="comparison-grid">
    <!-- Será preenchido dinamicamente pelo JavaScript -->
  </div>
  <div class="sustainability-tip">
    <p>
      💡 <strong>Dica:</strong> Escolher meios de transporte mais sustentáveis
      pode reduzir significativamente suas emissões de CO₂. A bicicleta é a
      opção mais ecológica! 🌱
    </p>
  </div>
</div>
```

---

### 3. Frontend - public/style.css

#### Estilos Principais

```css
/* Seção de comparação */
.comparison-section {
  margin-top: 30px;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid var(--primary-color);
}

/* Grid responsivo */
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

/* Card de cada transporte */
.comparison-item {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

/* Hover effect */
.comparison-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Destaque do selecionado */
.comparison-item.selected {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

/* Badge de selecionado */
.comparison-item.selected .selected-badge {
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-top: 8px;
  font-weight: bold;
}

/* Dica de sustentabilidade */
.sustainability-tip {
  background: linear-gradient(135deg, #fff3cd 0%, #ffe69c 100%);
  padding: 15px 20px;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  color: #856404;
  line-height: 1.6;
}
```

---

### 4. Frontend - public/script.js

#### Função de Exibição

```javascript
function showComparison(comparison, selectedTransport) {
  const comparisonGrid = document.getElementById("comparison-grid");
  if (!comparisonGrid) return;

  // Limpar conteúdo anterior
  comparisonGrid.innerHTML = "";

  // Criar cards para cada meio de transporte
  const transports = ["bike", "car", "bus", "truck"];

  transports.forEach((transport) => {
    const transportData = comparison[transport];
    const isSelected = transport === selectedTransport;

    const card = document.createElement("div");
    card.className = `comparison-item ${isSelected ? "selected" : ""}`;
    card.innerHTML = `
      <span class="icon">${transportData.icon}</span>
      <div class="transport-name">${transportData.name}</div>
      <div class="emission-value">${transportData.emission}</div>
      <span class="emission-unit">kg CO₂</span>
      ${isSelected ? '<div class="selected-badge">✓ Selecionado</div>' : ""}
    `;

    comparisonGrid.appendChild(card);
  });
}
```

---

## 📊 Exemplo de Resposta da API

### Requisição

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "origemCidade": "São Paulo",
    "origemEstado": "SP",
    "destinoCidade": "Campinas",
    "destinoEstado": "SP",
    "transport": "car"
  }'
```

### Resposta

```json
{
  "emission": 22.03,
  "unit": "kg CO2",
  "distance": 104.89,
  "selectedTransport": "car",
  "comparison": {
    "bike": {
      "name": "Bicicleta",
      "icon": "🚴",
      "emission": 0,
      "factor": 0
    },
    "car": {
      "name": "Carro",
      "icon": "🚗",
      "emission": 22.03,
      "factor": 0.21
    },
    "bus": {
      "name": "Ônibus",
      "icon": "🚌",
      "emission": 10.49,
      "factor": 0.1
    },
    "truck": {
      "name": "Caminhão",
      "icon": "🚚",
      "emission": 28.32,
      "factor": 0.27
    }
  }
}
```

---

## 🎨 Experiência do Usuário

### Antes (sem comparação)

```
✅ Resultado: 22.03 kg CO₂
```

### Depois (com comparação)

```
✅ Resultado: 22.03 kg CO₂

📊 Comparação entre Meios de Transporte

┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   🚴         │  │   🚗         │  │   🚌         │  │   🚚         │
│ Bicicleta    │  │ Carro        │  │ Ônibus       │  │ Caminhão     │
│   0.00       │  │  22.03       │  │  10.49       │  │  28.32       │
│  kg CO₂      │  │  kg CO₂      │  │  kg CO₂      │  │  kg CO₂      │
│              │  │ ✓ Selecionado│  │              │  │              │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
                    (destacado)

💡 Dica: Escolher meios de transporte mais sustentáveis pode reduzir
significativamente suas emissões de CO₂. A bicicleta é a opção mais
ecológica! 🌱
```

---

## 📈 Comparações Reais

### Caso 1: São Paulo → Campinas (104.89 km)

| Meio de Transporte | Emissão  | Economia vs Caminhão | % Redução |
| ------------------ | -------- | -------------------- | --------- |
| 🚴 **Bicicleta**   | 0.00 kg  | -28.32 kg            | -100%     |
| 🚌 **Ônibus**      | 10.49 kg | -17.83 kg            | -63%      |
| 🚗 **Carro**       | 22.03 kg | -6.29 kg             | -22%      |
| 🚚 **Caminhão**    | 28.32 kg | 0 kg                 | 0%        |

**Insight:** Escolher ônibus em vez de carro reduz **53% das emissões**!

---

### Caso 2: São Paulo → Rio de Janeiro (446.26 km)

| Meio de Transporte | Emissão   | Economia vs Caminhão | % Redução |
| ------------------ | --------- | -------------------- | --------- |
| 🚴 **Bicicleta**   | 0.00 kg   | -120.49 kg           | -100%     |
| 🚌 **Ônibus**      | 44.63 kg  | -75.86 kg            | -63%      |
| 🚗 **Carro**       | 93.71 kg  | -26.78 kg            | -22%      |
| 🚚 **Caminhão**    | 120.49 kg | 0 kg                 | 0%        |

**Insight:** Trocar carro por ônibus economiza **49 kg de CO₂** nesta viagem!

---

## 🎯 Benefícios da Funcionalidade

### 1. Conscientização Ambiental

- Usuário visualiza claramente o impacto de cada escolha
- Comparação lado a lado facilita a decisão
- Números concretos aumentam o senso de responsabilidade

### 2. Incentivo a Escolhas Sustentáveis

- Dica textual reforça a importância de transportes limpos
- Destaque visual do transporte selecionado
- Mostra alternativas viáveis

### 3. Transparência

- Mostra todos os cálculos
- Fatores de emissão visíveis
- Usuário pode conferir a matemática

### 4. Educação

- Usuário aprende sobre emissões de diferentes transportes
- Percebe que pequenas mudanças fazem diferença
- Incentiva mudança de comportamento

---

## 🧪 Testes de Validação

### Teste 1: Cálculo Correto

**Distância:** 100 km  
**Transporte Selecionado:** Carro

**Esperado:**

- Bicicleta: 0 kg
- Carro: 21 kg (100 × 0.21)
- Ônibus: 10 kg (100 × 0.10)
- Caminhão: 27 kg (100 × 0.27)

✅ **Status:** PASSOU

---

### Teste 2: Destaque Visual

**Ação:** Selecionar "Ônibus"

**Esperado:**

- Card de Ônibus tem classe "selected"
- Card de Ônibus tem background verde
- Card de Ônibus tem badge "✓ Selecionado"
- Outros cards permanecem brancos

✅ **Status:** PASSOU

---

### Teste 3: Responsividade

**Dispositivos testados:**

- 📱 Mobile (320px - 480px): 1 coluna
- 📱 Tablet (481px - 768px): 2 colunas
- 💻 Desktop (769px+): 4 colunas

✅ **Status:** PASSOU

---

### Teste 4: Dica de Sustentabilidade

**Esperado:**

- Dica aparece sempre
- Fundo amarelo
- Texto legível
- Borda esquerda destacada

✅ **Status:** PASSOU

---

## 🚀 Melhorias Futuras

### 1. Ordenação por Sustentabilidade

```javascript
// Ordenar do mais sustentável para o menos sustentável
const sortedTransports = Object.entries(comparison).sort(
  (a, b) => a[1].emission - b[1].emission,
);
```

### 2. Economia Monetária

```javascript
comparison: {
  car: {
    // ...
    emission: 22.03,
    costPerKm: 0.50,  // R$ por km
    totalCost: 52.45,  // R$ total
  }
}
```

### 3. Tempo de Viagem

```javascript
comparison: {
  car: {
    // ...
    estimatedTime: "1h 20min",
    avgSpeed: 80,  // km/h
  }
}
```

### 4. Impacto Ambiental Visual

```javascript
// Adicionar comparação visual
"🌲 Equivale a X árvores necessárias para compensar";
"💧 Economiza Y litros de combustível";
```

### 5. Gráfico de Barras

```javascript
// Adicionar chart.js para visualização gráfica
<canvas id="emission-chart"></canvas>
```

---

## 📋 Checklist de Implementação

- ✅ Backend calcula emissão de todos os transportes
- ✅ Backend retorna objeto `comparison` na resposta
- ✅ Frontend exibe seção de comparação
- ✅ Frontend cria cards dinâmicos
- ✅ Frontend destaca transporte selecionado
- ✅ Frontend exibe dica de sustentabilidade
- ✅ CSS responsivo implementado
- ✅ Animações suaves adicionadas
- ✅ Testes de validação realizados
- ✅ Documentação completa criada

**Total:** 10/10 ✅

---

## 📚 Referências

### Fatores de Emissão

Os fatores de emissão são baseados em estudos reconhecidos:

- **IPCC (Intergovernmental Panel on Climate Change)**
- **EPA (Environmental Protection Agency - EUA)**
- **European Environment Agency**

### Melhores Práticas de UX

- **Material Design Guidelines** - Comparação visual
- **Nielsen Norman Group** - Feedback e transparência
- **Web Content Accessibility Guidelines (WCAG)** - Acessibilidade

---

## 🎓 Conclusão

A funcionalidade de **Comparação entre Meios de Transporte** adiciona um valor significativo à Calculadora de Emissão de CO₂, transformando-a de uma ferramenta de cálculo simples em uma **plataforma educacional e de conscientização ambiental**.

### Impacto Esperado

1. **Maior engajamento** do usuário com a aplicação
2. **Decisões mais conscientes** sobre transporte
3. **Redução real** nas emissões de CO₂
4. **Educação ambiental** acessível e visual

---

**Desenvolvido com ❤️ e GitHub Copilot**  
**Data:** 30 de janeiro de 2026
