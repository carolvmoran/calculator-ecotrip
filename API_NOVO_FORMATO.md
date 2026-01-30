# 🔄 Atualização da API - Novo Formato de Resposta

## 📅 Data: 30 de janeiro de 2026

## 🎯 Mudança Implementada

A API `/calculate` foi atualizada para retornar a comparação entre meios de transporte em um formato mais estruturado e intuitivo.

---

## 📊 Novo Formato da Resposta

### Estrutura JSON

```json
{
  "distance": number,
  "unit": "kg CO2",
  "selectedTransport": {
    "type": string,
    "name": string,
    "icon": string,
    "emission": number,
    "factor": number
  },
  "comparison": [
    {
      "type": string,
      "key": string,
      "icon": string,
      "emission": number,
      "factor": number
    }
  ]
}
```

---

## 🔍 Detalhamento dos Campos

### `distance`

- **Tipo:** `number`
- **Descrição:** Distância calculada ou fornecida em quilômetros
- **Exemplo:** `104.89`

### `unit`

- **Tipo:** `string`
- **Descrição:** Unidade de medida das emissões
- **Valor fixo:** `"kg CO2"`

### `selectedTransport`

Objeto contendo informações detalhadas do transporte selecionado:

- **`type`** (string): Código do transporte (`"bike"`, `"car"`, `"bus"`, `"truck"`)
- **`name`** (string): Nome amigável (`"Bicicleta"`, `"Carro"`, `"Ônibus"`, `"Caminhão"`)
- **`icon`** (string): Emoji representativo (`"🚴"`, `"🚗"`, `"🚌"`, `"🚚"`)
- **`emission`** (number): Emissão de CO₂ em kg
- **`factor`** (number): Fator de emissão em kg CO₂/km

### `comparison`

Array contendo a comparação de TODOS os meios de transporte:

Cada item do array contém:

- **`type`** (string): Nome do transporte
- **`key`** (string): Código identificador único
- **`icon`** (string): Emoji representativo
- **`emission`** (number): Emissão calculada em kg CO₂
- **`factor`** (number): Fator de emissão em kg CO₂/km

---

## 📝 Exemplo de Resposta Completa

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
  "comparison": [
    {
      "type": "Bicicleta",
      "key": "bike",
      "icon": "🚴",
      "emission": 0,
      "factor": 0
    },
    {
      "type": "Carro",
      "key": "car",
      "icon": "🚗",
      "emission": 22.03,
      "factor": 0.21
    },
    {
      "type": "Ônibus",
      "key": "bus",
      "icon": "🚌",
      "emission": 10.49,
      "factor": 0.1
    },
    {
      "type": "Caminhão",
      "key": "truck",
      "icon": "🚚",
      "emission": 28.32,
      "factor": 0.27
    }
  ]
}
```

---

## 🔄 Comparação: Antes vs Depois

### Formato Anterior

```json
{
  "emission": 22.03,
  "unit": "kg CO2",
  "distance": 104.89,
  "selectedTransport": "car",
  "comparison": {
    "bike": { "name": "Bicicleta", "emission": 0 },
    "car": { "name": "Carro", "emission": 22.03 },
    "bus": { "name": "Ônibus", "emission": 10.49 },
    "truck": { "name": "Caminhão", "emission": 28.32 }
  }
}
```

### Formato Novo ✅

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
  "comparison": [
    {
      "type": "Bicicleta",
      "key": "bike",
      "icon": "🚴",
      "emission": 0,
      "factor": 0
    },
    {
      "type": "Carro",
      "key": "car",
      "icon": "🚗",
      "emission": 22.03,
      "factor": 0.21
    },
    {
      "type": "Ônibus",
      "key": "bus",
      "icon": "🚌",
      "emission": 10.49,
      "factor": 0.1
    },
    {
      "type": "Caminhão",
      "key": "truck",
      "icon": "🚚",
      "emission": 28.32,
      "factor": 0.27
    }
  ]
}
```

---

## ✅ Vantagens do Novo Formato

### 1. Estrutura mais clara

- `selectedTransport` agora é um objeto completo, não apenas uma string
- Todas as informações do transporte selecionado em um só lugar

### 2. Comparação como Array

- Mais fácil de iterar no frontend
- Ordem preservada (bike, car, bus, truck)
- Não precisa saber as chaves previamente

### 3. Informações completas

- Cada item tem `icon` para renderização visual
- `key` permite identificação única
- `factor` permite cálculos adicionais no frontend

### 4. Mais RESTful

- Estrutura consistente e previsível
- Melhor para consumo por outras aplicações
- Fácil de documentar com OpenAPI/Swagger

### 5. Compatível com TypeScript

```typescript
interface Transport {
  type: string;
  key: string;
  icon: string;
  emission: number;
  factor: number;
}

interface CalculateResponse {
  distance: number;
  unit: string;
  selectedTransport: Transport;
  comparison: Transport[];
}
```

---

## 🔧 Mudanças no Código

### Backend - server/index.js

```javascript
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
  // ... outros transportes
];

// Resposta estruturada
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
  comparison,
});
```

### Frontend - script.js

```javascript
// Atualizado para usar novo formato
showResult({
  emission: data.selectedTransport.emission,
  distance: data.distance,
  origem: `${origemCidade} - ${origemEstado}`,
  destino: `${destinoCidade} - ${destinoEstado}`,
  transport: data.selectedTransport.type,
  selectedTransport: data.selectedTransport,
  comparison: data.comparison,
});

// Função showComparison agora itera sobre array
function showComparison(comparison, selectedTransport) {
  comparison.forEach((transportData) => {
    const isSelected = transportData.key === selectedTransport;
    // ... criar cards
  });
}
```

---

## 🧪 Testes de Validação

### Teste 1: Verificar estrutura da resposta

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"origemCidade":"São Paulo","origemEstado":"SP","destinoCidade":"Campinas","destinoEstado":"SP","transport":"car"}'
```

**Validações:**

- ✅ Campo `distance` existe e é número
- ✅ Campo `selectedTransport` é objeto
- ✅ Campo `selectedTransport.type` é `"car"`
- ✅ Campo `selectedTransport.name` é `"Carro"`
- ✅ Campo `selectedTransport.icon` é `"🚗"`
- ✅ Campo `selectedTransport.emission` é `22.03`
- ✅ Campo `comparison` é array com 4 elementos
- ✅ Cada elemento do array tem todos os campos obrigatórios

---

### Teste 2: Validar cálculos

**Distância:** 104.89 km  
**Transporte:** Carro (0.21 kg/km)

**Esperado:**

```json
{
  "selectedTransport": {
    "emission": 22.03 // 104.89 * 0.21 = 22.03
  },
  "comparison": [
    { "type": "Bicicleta", "emission": 0 }, // 104.89 * 0 = 0
    { "type": "Carro", "emission": 22.03 }, // 104.89 * 0.21 = 22.03
    { "type": "Ônibus", "emission": 10.49 }, // 104.89 * 0.10 = 10.49
    { "type": "Caminhão", "emission": 28.32 } // 104.89 * 0.27 = 28.32
  ]
}
```

✅ **Status:** PASSOU

---

### Teste 3: Diferentes transportes

```bash
# Teste com Ônibus
curl -X POST http://localhost:3000/calculate \
  -d '{"distance":100,"transport":"bus"}'

# Esperado:
# selectedTransport.type = "bus"
# selectedTransport.emission = 10.00
```

✅ **Status:** PASSOU

---

## 📚 Documentação da API

### Endpoint: POST /calculate

**Descrição:** Calcula emissões de CO₂ e retorna comparação entre transportes

**Request Body:**

```json
{
  "distance": number (opcional),
  "transport": "bike" | "car" | "bus" | "truck",
  "origemCidade": string (opcional),
  "origemEstado": string (opcional),
  "destinoCidade": string (opcional),
  "destinoEstado": string (opcional)
}
```

**Response 200:**

```json
{
  "distance": number,
  "unit": "kg CO2",
  "selectedTransport": {
    "type": string,
    "name": string,
    "icon": string,
    "emission": number,
    "factor": number
  },
  "comparison": Array<{
    "type": string,
    "key": string,
    "icon": string,
    "emission": number,
    "factor": number
  }>
}
```

**Response 400:** Erro de validação

```json
{
  "error": "Mensagem de erro",
  "fallbackToManual": boolean (opcional)
}
```

**Response 500:** Erro interno

```json
{
  "error": "Erro interno do servidor ao calcular emissões"
}
```

---

## 🎯 Casos de Uso

### 1. Exibir resultado simples

```javascript
const response = await fetch("/calculate", {
  /* ... */
});
const data = await response.json();

console.log(`Emissão: ${data.selectedTransport.emission} kg CO₂`);
console.log(
  `Transporte: ${data.selectedTransport.name} ${data.selectedTransport.icon}`,
);
```

### 2. Listar todas as opções

```javascript
data.comparison.forEach((transport) => {
  console.log(
    `${transport.icon} ${transport.type}: ${transport.emission} kg CO₂`,
  );
});

// Saída:
// 🚴 Bicicleta: 0 kg CO₂
// 🚗 Carro: 22.03 kg CO₂
// 🚌 Ônibus: 10.49 kg CO₂
// 🚚 Caminhão: 28.32 kg CO₂
```

### 3. Encontrar opção mais sustentável

```javascript
const maisEcologico = data.comparison.sort(
  (a, b) => a.emission - b.emission,
)[0];

console.log(`Opção mais sustentável: ${maisEcologico.type}`);
// Saída: Opção mais sustentável: Bicicleta
```

### 4. Calcular economia

```javascript
const economiaCarro = data.comparison.find((t) => t.key === "car").emission;
const economiaOnibus = data.comparison.find((t) => t.key === "bus").emission;
const economia = economiaCarro - economiaOnibus;

console.log(`Trocar carro por ônibus economiza ${economia.toFixed(2)} kg CO₂`);
// Saída: Trocar carro por ônibus economiza 11.54 kg CO₂
```

---

## ✅ Checklist de Atualização

- ✅ Backend atualizado com novo formato
- ✅ `selectedTransport` agora é objeto completo
- ✅ `comparison` convertido para array
- ✅ Campos `key`, `icon`, `factor` adicionados
- ✅ Frontend atualizado para usar novo formato
- ✅ Função `showComparison` adaptada para arrays
- ✅ Testes realizados e aprovados
- ✅ Documentação atualizada
- ✅ Retrocompatibilidade mantida no frontend

---

## 🚀 Benefícios da Atualização

1. **Melhor Organização:** Dados relacionados agrupados logicamente
2. **Mais Flexível:** Array permite ordenação e filtragem fáceis
3. **Mais Informativo:** Incluí ícones e fatores para uso futuro
4. **Mais Profissional:** Formato padrão REST API
5. **Melhor DX:** Fácil de consumir por desenvolvedores
6. **Type-safe:** Compatível com TypeScript out of the box

---

**Desenvolvido com ❤️ e GitHub Copilot**  
**Data:** 30 de janeiro de 2026
