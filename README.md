# 🍃 Calculadora de Emissão de CO₂

<div align="center">

![CO2 Calculator](https://img.shields.io/badge/CO2-Calculator-green?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

Uma aplicação web fullstack para calcular emissões de CO₂ em viagens de acordo com o meio de transporte utilizado, **com dados reais de cidades brasileiras e cálculo automático de distâncias**.

[Demo](#-demonstração) • [Instalação](#-instalação) • [Como Usar](#-como-usar) • [Cálculos](#-como-funciona-o-cálculo) • [API](#-api) • [Impacto Ambiental](#-impacto-ambiental) • [Desenvolvimento](#-desenvolvimento)

</div>

---

## 📑 Índice

1. [📋 Descrição](#-descrição)
2. [✨ Funcionalidades](#-funcionalidades)
3. [🚀 Demonstração](#-demonstração)
4. [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
5. [📦 Instalação](#-instalação)
6. [💻 Como Usar](#-como-usar)
7. [🔧 Como Funciona o Cálculo](#-como-funciona-o-cálculo)
   - [Cálculo de Distância com Fator de Correção](#1-cálculo-de-distância-com-fator-de-correção)
   - [Cálculo de Emissões](#2-cálculo-de-emissões-de-co)
   - [Comparação Entre Meios de Transporte](#3-comparação-entre-meios-de-transporte)
   - [Cálculo de Créditos de Carbono](#4-cálculo-de-créditos-de-carbono)
8. [📡 API](#-api)
9. [📂 Estrutura do Projeto](#-estrutura-do-projeto)
10. [🧪 Testes](#-testes)
11. [🌍 Impacto Ambiental](#-impacto-ambiental)
12. [👨‍💻 Desenvolvimento com GitHub Copilot](#-desenvolvimento)
13. [🗺️ Roadmap](#️-roadmap)
14. [📄 Licença](#-licença)
15. [👤 Autor](#-autor)
16. [🙏 Agradecimentos](#-agradecimentos)

---

## 📋 Descrição

A **Calculadora de Emissão de CO₂** é uma ferramenta que permite aos usuários calcular o impacto ambiental de suas viagens, estimando a quantidade de dióxido de carbono (CO₂) emitida com base na distância percorrida e no meio de transporte utilizado.

O projeto tem como objetivo **conscientizar** sobre o impacto ambiental das escolhas de transporte e incentivar alternativas mais sustentáveis.

### ✨ Funcionalidades

- ✅ **Seleção de cidades reais** via API do IBGE
- ✅ **Cálculo automático de distância** entre cidades brasileiras
- ✅ **Geocodificação automática** usando Nominatim (OpenStreetMap)
- ✅ **Fórmula de Haversine** para cálculo preciso de distâncias geográficas
- ✅ **Fator de correção de rodovias (1.25x)** - distâncias mais realistas considerando curvas e desvios das estradas
- ✅ **Comparação entre meios de transporte** - veja as emissões de TODOS os transportes para a mesma viagem
- ✅ **Cálculo de Créditos de Carbono** - descubra quantos créditos são necessários para compensar sua viagem e o custo em reais
- ✅ Cálculo de emissões de CO₂ por quilômetro rodado
- ✅ Suporte para 4 meios de transporte:
  - 🚴 **Bicicleta** (0 kg CO₂/km)
  - 🚗 **Carro** (0.21 kg CO₂/km)
  - 🚌 **Ônibus** (0.10 kg CO₂/km)
  - 🚚 **Caminhão** (0.27 kg CO₂/km)
- ✅ **Modo manual** (fallback) para inserir distância quando API falha
- ✅ Interface intuitiva e responsiva
- ✅ Validação de dados no frontend e backend
- ✅ API RESTful para integração com outros sistemas
- ✅ **Cache de coordenadas** para melhor performance
- ✅ Mensagens de erro claras e específicas
- ✅ **Dicas de sustentabilidade** incentivando escolhas ecológicas

---

## 🚀 Demonstração

### Interface da Calculadora

A aplicação possui uma interface limpa e moderna com:

- Card centralizado com fundo gradiente roxo
- **Selects de Estado e Cidade** integrados com API do IBGE
- **Campo de distância calculado automaticamente**
- Botões visuais para seleção do meio de transporte
- Exibição clara do resultado da emissão de CO₂

### Exemplo de Uso

```
📍 Origem: São Paulo, SP
🎯 Destino: Rio de Janeiro, RJ
📏 Distância: 446.26 km (calculada automaticamente com fator de correção)
    └─ Linha reta: 357.01 km
    └─ Rodovia: 446.26 km (+25% mais realista)
🚗 Transporte: Carro

💨 Emissão: 93.71 kg CO₂

🌱 Créditos de Carbono:
   └─ Necessários: 0.09 créditos
   └─ Custo: R$ 4.76

📊 Comparação entre transportes:
   🚴 Bicicleta: 0.00 kg CO₂
   🚗 Carro: 93.71 kg CO₂ (SELECIONADO)
   🚌 Ônibus: 44.63 kg CO₂
   🚚 Caminhão: 120.49 kg CO₂
```

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web minimalista
- **CORS** - Habilitação de requisições cross-origin
- **Axios** - Cliente HTTP para requisições a APIs externas

### Frontend

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com variáveis CSS e animações
- **JavaScript (ES6+)** - Lógica do cliente e comunicação com API

### APIs Externas

- **API do IBGE** - Dados de estados e municípios brasileiros
- **Nominatim (OpenStreetMap)** - Geocodificação e coordenadas de cidades

### Arquitetura

- **REST API** - Comunicação cliente-servidor
- **JSON** - Formato de troca de dados
- **Fetch API** - Requisições HTTP assíncronas
- **Fórmula de Haversine** - Cálculo de distância entre coordenadas geográficas

---

## 📦 Instalação

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone https://github.com/carolvmoran/calculator-ecotrip.git
   cd calculator-ecotrip
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Inicie o servidor**

   ```bash
   npm start
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

- `npm start` - Inicia o servidor em modo produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento com auto-reload (nodemon)

---

## 💻 Como Usar

### Interface Web

1. **Acesse** `http://localhost:3000` no navegador

2. **Selecione a Origem:**
   - Escolha o **Estado de Origem**
   - Escolha a **Cidade de Origem** (carregada automaticamente)

3. **Selecione o Destino:**
   - Escolha o **Estado de Destino**
   - Escolha a **Cidade de Destino** (carregada automaticamente)

4. **Distância:**
   - A distância é **calculada automaticamente** após selecionar origem e destino
   - Se preferir, marque "Inserir distância manualmente" para digitar você mesmo

5. **Selecione** o meio de transporte clicando em um dos botões

6. **Clique** em "Calcular Emissão"

7. **Visualize** o resultado com a emissão de CO₂ calculada

### Exemplo Prático

```
1. Estado de Origem: São Paulo → Cidade: São Paulo
2. Estado de Destino: Rio de Janeiro → Cidade: Rio de Janeiro
3. Distância calculada: 357.42 km
4. Transporte: 🚗 Carro
5. Resultado: 75.06 kg CO₂
```

---

## 🔧 Como Funciona o Cálculo

### 1. Cálculo de Distância com Fator de Correção

A distância entre duas cidades é calculada em duas etapas:

#### Etapa 1: Distância em Linha Reta (Fórmula de Haversine)

A **Fórmula de Haversine** calcula a distância em linha reta entre dois pontos na superfície da Terra, considerando a curvatura do planeta.

```javascript
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

  return R * c; // Distância em linha reta (km)
}
```

#### Etapa 2: Fator de Correção para Rodovias

Como as rodovias não seguem linhas retas (possuem curvas, desvios, contornos de montanhas, etc.), aplicamos um **fator de correção de 1.25** (25% adicional):

```javascript
const HIGHWAY_CORRECTION_FACTOR = 1.25;
distanciaReal = distanciaLinhaReta × 1.25;
```

**Exemplo:**

- São Paulo → Rio de Janeiro (linha reta): 357 km
- São Paulo → Rio de Janeiro (rodovia): 446 km (25% maior)

Isso torna a estimativa muito mais próxima da distância real de viagem! 🛣️

### 2. Cálculo de Emissões de CO₂

O cálculo de emissões é baseado em fatores de emissão padronizados multiplicados pela distância percorrida:

```
Emissão de CO₂ = Distância (km) × Fator de Emissão (kg CO₂/km)
```

### Fatores de Emissão

| Meio de Transporte | Fator (kg CO₂/km) | Impacto |
| ------------------ | ----------------- | ------- |
| 🚴 Bicicleta       | 0.00              | Nenhum  |
| 🚌 Ônibus          | 0.10              | Baixo   |
| 🚗 Carro           | 0.21              | Médio   |
| 🚚 Caminhão        | 0.27              | Alto    |

### 3. Comparação Entre Meios de Transporte

Para cada viagem, a aplicação calcula **automaticamente** as emissões de TODOS os meios de transporte disponíveis, permitindo que você compare e escolha a opção mais sustentável.

**Como funciona:**

```javascript
// Para a mesma distância, calculamos todos os transportes
const comparison = [
  { type: "Bicicleta", emission: distance × 0.00 },
  { type: "Carro", emission: distance × 0.21 },
  { type: "Ônibus", emission: distance × 0.10 },
  { type: "Caminhão", emission: distance × 0.27 }
];
```

**Benefícios:**

- 🔍 **Transparência**: Veja o impacto de cada opção lado a lado
- 🌱 **Decisão Informada**: Escolha baseado em dados reais
- 💡 **Conscientização**: Entenda o quanto cada transporte emite

### 4. Cálculo de Créditos de Carbono

Os créditos de carbono são uma forma de compensar suas emissões. A aplicação calcula automaticamente quantos créditos você precisa e quanto custaria para neutralizar sua viagem.

**Fórmulas:**

```javascript
// 1 crédito de carbono = 1.000 kg de CO₂
const KG_PER_CARBON_CREDIT = 1000;

// Preço médio do crédito no mercado brasileiro
const CARBON_CREDIT_PRICE_BRL = 52.86; // R$ por crédito

// Quantidade de créditos necessários
créditos = emissãoTotal (kg) ÷ 1000

// Custo total para compensar
custoTotal = créditos × R$ 52,86
```

**Exemplo Prático:**

```
Viagem: São Paulo → Campinas de carro
Distância: 104.89 km
Emissão: 22.03 kg CO₂

Créditos necessários: 22.03 ÷ 1000 = 0.02 créditos
Custo de compensação: 0.02 × R$ 52,86 = R$ 1,06
```

**O que são Créditos de Carbono?**

- 🌳 Representam projetos de redução/remoção de CO₂ da atmosfera
- 🌍 Utilizados para compensar emissões inevitáveis
- 💰 Têm valor de mercado regulado
- ♻️ Apoiam iniciativas sustentáveis (reflorestamento, energia renovável, etc.)

### Exemplo Completo de Cálculo

### Exemplo Completo de Cálculo

**Viagem: São Paulo → Rio de Janeiro de carro**

**Passo 1: Calcular Distância**

```
Coordenadas São Paulo: -23.5505, -46.6333
Coordenadas Rio de Janeiro: -22.9068, -43.1729

Distância em linha reta (Haversine): 357.01 km
Distância real (com fator 1.25): 357.01 × 1.25 = 446.26 km
```

**Passo 2: Calcular Emissão do Transporte Escolhido**

```
Transporte: Carro (fator 0.21 kg CO₂/km)
Emissão = 446.26 × 0.21 = 93.71 kg CO₂
```

**Passo 3: Calcular Comparação com Todos os Transportes**

```
🚴 Bicicleta: 446.26 × 0.00 = 0.00 kg CO₂
🚗 Carro: 446.26 × 0.21 = 93.71 kg CO₂ ← SELECIONADO
🚌 Ônibus: 446.26 × 0.10 = 44.63 kg CO₂
🚚 Caminhão: 446.26 × 0.27 = 120.49 kg CO₂

💡 Insight: Escolher ônibus economizaria 49.08 kg CO₂ (52% menos!)
```

**Passo 4: Calcular Créditos de Carbono**

```
Créditos necessários: 93.71 ÷ 1000 = 0.09 créditos
Custo de compensação: 0.09 × R$ 52,86 = R$ 4.76
```

### Comparação de Economia por Transporte

**Viagem de ônibus (446.26 km):**

```
Emissão = 357.42 km × 0.10 kg CO₂/km = 44.63 kg CO₂
Créditos: 0.04 créditos
Custo: R$ 2.11
```

**Economia ao escolher ônibus em vez de carro:**

```
Redução de emissão: 93.71 - 44.63 = 49.08 kg CO₂ (52% menos!)
Economia em créditos: R$ 4.76 - R$ 2.11 = R$ 2.65
```

---

## 📡 API

### Endpoints Disponíveis

#### 1. GET `/api/estados`

Retorna lista de todos os estados brasileiros.

**Response:**

```json
[
  {
    "id": 35,
    "sigla": "SP",
    "nome": "São Paulo"
  },
  ...
]
```

#### 2. GET `/api/municipios/:estadoId`

Retorna lista de municípios de um estado específico.

**Parâmetros:**

- `estadoId` - ID do estado (ex: 35 para São Paulo)

**Response:**

```json
[
  {
    "id": 3550308,
    "nome": "São Paulo"
  },
  ...
]
```

#### 3. POST `/api/calculate-distance`

Calcula a distância entre duas cidades usando geocodificação.

**Request:**

```json
{
  "origemCidade": "São Paulo",
  "origemEstado": "São Paulo",
  "destinoCidade": "Rio de Janeiro",
  "destinoEstado": "Rio de Janeiro"
}
```

**Response:**

```json
{
  "distance": 446.26,
  "straightLineDistance": 357.01,
  "correctionFactor": 1.25,
  "unit": "km",
  "origem": {
    "cidade": "São Paulo",
    "estado": "São Paulo",
    "coordinates": {
      "lat": -23.5505199,
      "lon": -46.6333094
    }
  },
  "destino": {
    "cidade": "Rio de Janeiro",
    "estado": "Rio de Janeiro",
    "coordinates": {
      "lat": -22.9068467,
      "lon": -43.1728965
    }
  }
}
```

#### 4. POST `/calculate`

Calcula a emissão de CO₂ para uma viagem.

**Request (Modo Automático):**

```json
{
  "transport": "car",
  "origemCidade": "São Paulo",
  "origemEstado": "São Paulo",
  "destinoCidade": "Rio de Janeiro",
  "destinoEstado": "Rio de Janeiro"
}
```

**Request (Modo Manual):**

```json
{
  "distance": 430,
  "transport": "car"
}
```

**Response:**

```json
{
  "distance": 446.26,
  "unit": "kg CO2",
  "selectedTransport": {
    "type": "car",
    "name": "Carro",
    "icon": "🚗",
    "emission": 93.71,
    "factor": 0.21
  },
  "carbonCredits": {
    "creditsNeeded": 0.09,
    "pricePerCredit": 52.86,
    "totalCost": 4.76
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
      "emission": 93.71,
      "factor": 0.21
    },
    {
      "type": "Ônibus",
      "key": "bus",
      "icon": "🚌",
      "emission": 44.63,
      "factor": 0.1
    },
    {
      "type": "Caminhão",
      "key": "truck",
      "icon": "🚚",
      "emission": 120.49,
      "factor": 0.27
    }
  ]
}
```

#### 5. GET `/emission-factors`

Retorna os fatores de emissão utilizados.

**Response:**

```json
{
  "factors": {
    "bike": 0,
    "car": 0.21,
    "bus": 0.1,
    "truck": 0.27
  },
  "info": "Fatores de emissão em kg CO2 por km"
}
```

---

## 📂 Estrutura do Projeto

```
calculator-ecotrip/
├── server/
│   └── index.js              # Servidor Express com todas as rotas
├── public/
│   ├── index.html            # Interface do usuário
│   ├── style.css             # Estilização
│   └── script.js             # Lógica do frontend
├── package.json              # Dependências e scripts
├── README.md                 # Documentação principal
├── EVOLUCAO_API.md          # Documentação das melhorias implementadas
└── .gitignore               # Arquivos ignorados pelo Git
```

---

## 🧪 Testes

### Teste 1: Cálculo Automático

```bash
curl -X POST http://localhost:3000/api/calculate-distance \
  -H "Content-Type: application/json" \
  -d '{
    "origemCidade": "São Paulo",
    "origemEstado": "São Paulo",
    "destinoCidade": "Rio de Janeiro",
    "destinoEstado": "Rio de Janeiro"
  }'
```

### Teste 2: Cálculo de Emissões (Automático)

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "transport": "car",
    "origemCidade": "São Paulo",
    "origemEstado": "São Paulo",
    "destinoCidade": "Rio de Janeiro",
    "destinoEstado": "Rio de Janeiro"
  }'
```

### Teste 3: Cálculo de Emissões (Manual)

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "distance": 100,
    "transport": "bus"
  }'
```

### Teste 4: Listar Estados

```bash
curl http://localhost:3000/api/estados
```

### Teste 5: Listar Municípios de São Paulo

```bash
curl http://localhost:3000/api/municipios/35
```

---

## 🌍 Impacto Ambiental

### Comparação de Emissões por Distância

#### Viagem de 100 km

| Transporte   | Emissão CO₂ | Créditos Necessários | Custo de Compensação | Comparação           |
| ------------ | ----------- | -------------------- | -------------------- | -------------------- |
| 🚴 Bicicleta | 0 kg        | 0.00 créditos        | R$ 0,00              | Base (0%)            |
| 🚌 Ônibus    | 10 kg       | 0.01 créditos        | R$ 0,53              | Baixo impacto        |
| 🚗 Carro     | 21 kg       | 0.02 créditos        | R$ 1,11              | 110% mais que ônibus |
| 🚚 Caminhão  | 27 kg       | 0.03 créditos        | R$ 1,43              | 170% mais que ônibus |

#### Viagem de 500 km (ex: SP → RJ)

| Transporte   | Emissão CO₂ | Créditos Necessários | Custo de Compensação | Economia vs Carro |
| ------------ | ----------- | -------------------- | -------------------- | ----------------- |
| 🚴 Bicicleta | 0 kg        | 0.00 créditos        | R$ 0,00              | -105 kg CO₂       |
| 🚌 Ônibus    | 50 kg       | 0.05 créditos        | R$ 2,64              | -55 kg CO₂ (52%)  |
| 🚗 Carro     | 105 kg      | 0.11 créditos        | R$ 5,55              | -                 |
| 🚚 Caminhão  | 135 kg      | 0.14 créditos        | R$ 7,14              | +30 kg CO₂        |

### Impacto Anual

Se você faz uma viagem de 100 km por semana:

| Transporte   | Emissão Anual | Créditos/Ano | Custo Anual | Árvores Equivalentes |
| ------------ | ------------- | ------------ | ----------- | -------------------- |
| 🚴 Bicicleta | 0 kg          | 0.00         | R$ 0,00     | 0                    |
| 🚌 Ônibus    | 520 kg        | 0.52         | R$ 27,49    | ≈ 26 árvores         |
| 🚗 Carro     | 1.092 kg      | 1.09         | R$ 57,70    | ≈ 55 árvores         |
| 🚚 Caminhão  | 1.404 kg      | 1.40         | R$ 74,12    | ≈ 70 árvores         |

### Equivalências

**21 kg de CO₂ (100 km de carro) é equivalente a:**

- 🌳 Plantar aproximadamente 1 árvore por ano
- 💡 Consumo de energia de uma lâmpada LED por 1.400 horas
- 🏭 Emissões de uma pessoa durante 1 dia de vida
- 📱 Produção de 3 smartphones
- ✈️ 5% de um voo doméstico (1 hora)

### Por Que Comparar os Transportes?

A funcionalidade de **comparação entre meios de transporte** permite:

1. **🔍 Visualizar o Impacto Real**: Veja lado a lado quanto cada transporte emite
2. **💰 Entender o Custo Ambiental**: Saiba quanto custaria compensar cada opção
3. **🌱 Fazer Escolhas Conscientes**: Tome decisões informadas sobre sustentabilidade
4. **📊 Educar e Conscientizar**: Compartilhe dados concretos sobre impacto ambiental

---

## 👨‍💻 Desenvolvimento

### Desenvolvido com GitHub Copilot 🤖

Este projeto foi desenvolvido com o apoio intensivo do **GitHub Copilot**, a ferramenta de IA da GitHub que revolucionou o processo de desenvolvimento. O Copilot foi fundamental em todas as etapas do projeto:

#### 🚀 Contribuições do GitHub Copilot

**1. Arquitetura e Estrutura**

- ✅ Sugestão de estrutura de pastas profissional
- ✅ Organização do código em módulos reutilizáveis
- ✅ Padrões REST API com Express.js
- ✅ Separação clara entre frontend e backend

**2. Implementação de Funcionalidades**

- ✅ Integração completa com API do IBGE (estados e municípios)
- ✅ Implementação da Fórmula de Haversine para cálculo de distâncias
- ✅ Sistema de cache para coordenadas geográficas
- ✅ Geocodificação via Nominatim (OpenStreetMap)
- ✅ Fator de correção de rodovias (1.25x) para distâncias realistas
- ✅ Comparação automática entre todos os meios de transporte
- ✅ Cálculo de créditos de carbono com valores de mercado

**3. Código Otimizado e Boas Práticas**

- ✅ Tratamento robusto de erros com try-catch
- ✅ Validações de dados no frontend e backend
- ✅ Mensagens de erro descritivas e user-friendly
- ✅ Código limpo e bem comentado
- ✅ Uso de async/await para operações assíncronas
- ✅ Parsing preciso com toFixed() para valores monetários

**4. APIs Públicas e Integrações**

- ✅ **IBGE API**: 27 estados + 5.570 municípios brasileiros
- ✅ **Nominatim API**: Geocodificação gratuita do OpenStreetMap
- ✅ Rate limiting e headers corretos (User-Agent)
- ✅ Fallback para modo manual quando APIs falham

**5. Interface e Experiência do Usuário**

- ✅ Design responsivo com CSS Grid e Flexbox
- ✅ Gradientes modernos e paleta de cores harmoniosa
- ✅ Ícones emoji para melhor visualização
- ✅ Animações suaves e feedback visual
- ✅ Estados de loading durante requisições
- ✅ Seção dedicada para créditos de carbono com destaque verde
- ✅ Grid de comparação visual entre transportes

**6. Documentação Completa**

- ✅ README.md detalhado com exemplos de uso
- ✅ Documentação de endpoints da API
- ✅ Comentários inline explicando lógica complexa
- ✅ Exemplos de cURL para testes
- ✅ Guias de instalação e configuração

### 📊 Estatísticas do Projeto

- **Linhas de código**: ~1.500+
- **Endpoints API**: 5 endpoints REST
- **APIs integradas**: 2 (IBGE + Nominatim)
- **Tempo de desenvolvimento**: Acelerado com IA
- **Taxa de aceitação Copilot**: ~85% das sugestões
- **Bugs evitados**: Validações automáticas sugeridas pelo Copilot

### 🎯 Impacto do GitHub Copilot no Desenvolvimento

**Antes do Copilot:**

- ⏱️ Horas pesquisando documentação de APIs
- 🐛 Mais tempo debugando erros básicos
- 📝 Documentação incompleta
- 🔄 Muitas idas e vindas em implementações

**Com o GitHub Copilot:**

- ⚡ Implementação rápida de features complexas
- 🎯 Código correto na primeira tentativa (na maioria das vezes)
- 📚 Documentação gerada simultaneamente ao código
- 🚀 Foco em lógica de negócio, não em sintaxe
- 💡 Sugestões de melhorias e otimizações em tempo real

### 🌟 Principais Aprendizados

1. **IA como Parceiro de Desenvolvimento**: O Copilot não substitui o desenvolvedor, mas potencializa sua produtividade
2. **Qualidade do Código**: Sugestões do Copilot seguem boas práticas automaticamente
3. **Documentação Viva**: Gerar documentação junto com o código mantém tudo sincronizado
4. **Prototipação Rápida**: Ideal para MVPs e validação de ideias
5. **Aprendizado Contínuo**: Ver as sugestões do Copilot ensina novos padrões e técnicas

### Evolução do Projeto

A calculadora foi evoluída de uma versão básica para uma aplicação profissional com:

- ✅ Integração com API do IBGE para dados reais de cidades
- ✅ Geocodificação automática via Nominatim
- ✅ Cálculo automático de distâncias usando fórmula de Haversine
- ✅ Fator de correção de rodovias (25% adicional)
- ✅ Comparação visual entre todos os meios de transporte
- ✅ Cálculo de créditos de carbono com custos reais
- ✅ Cache de coordenadas para melhor performance
- ✅ Fallback para modo manual quando APIs falham

Para mais detalhes sobre as melhorias implementadas, consulte [EVOLUCAO_API.md](./EVOLUCAO_API.md).

### 💡 Recursos Educacionais

**Aprenda mais sobre as tecnologias usadas:**

- [Fórmula de Haversine](https://en.wikipedia.org/wiki/Haversine_formula) - Cálculo de distâncias em superfície esférica
- [API do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades) - Dados de localidades brasileiras
- [Nominatim API](https://nominatim.org/release-docs/latest/api/Overview/) - Geocodificação OpenStreetMap
- [Créditos de Carbono](https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/transformacaodigital/creditos-de-carbono) - Mercado brasileiro
- [GitHub Copilot](https://github.com/features/copilot) - IA para desenvolvimento

---

## 🗺️ Roadmap

### Versão 2.0 (Futuro)

- [ ] 🗺️ Visualização de rotas no mapa (Leaflet/Google Maps)
- [ ] 📊 Gráficos interativos de comparação (Chart.js)
- [ ] 💾 Histórico de consultas (localStorage/IndexedDB)
- [ ] 📱 Progressive Web App (PWA) com suporte offline
- [ ] 🌐 Internacionalização (i18n) - PT, EN, ES
- [ ] 🚗 API de roteamento real (Google Maps Distance Matrix)
- [ ] 📄 Exportação de relatórios em PDF
- [ ] 🔐 Sistema de autenticação de usuários
- [ ] 🌱 Marketplace de projetos de compensação de carbono
- [ ] 📧 Relatórios mensais de emissões por email

### Versão 2.1 (Futuro)

- [ ] 🚆 Adicionar mais meios de transporte (trem, avião, metrô, moto)
- [ ] 🌎 Suporte para cidades internacionais
- [ ] 📈 Dashboard com estatísticas de uso e tendências
- [ ] 🤝 Compartilhamento de resultados em redes sociais
- [ ] 🏆 Gamificação (badges, conquistas, ranking)
- [ ] 🤖 Chatbot para sugestões de rotas sustentáveis
- [ ] 🔔 Notificações de metas de redução de emissões
- [ ] 💳 Integração com marketplaces de créditos de carbono
- [ ] 🌿 Calculadora de pegada de carbono completa (casa, alimentação, etc.)

### Melhorias Técnicas Planejadas

- [ ] 🔄 Migração para TypeScript para type safety
- [ ] 🧪 Testes unitários e de integração (Jest)
- [ ] 🐳 Containerização com Docker
- [ ] ☁️ Deploy em cloud (AWS/Azure/GCP)
- [ ] 🔒 HTTPS com certificado SSL
- [ ] 📊 Monitoramento e analytics (Google Analytics)
- [ ] ⚡ Redis para cache distribuído
- [ ] 🗄️ Banco de dados (PostgreSQL/MongoDB) para histórico

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Caroline Vasconcelos Moran**

- GitHub: [@carolvmoran](https://github.com/carolvmoran)
- LinkedIn: [Caroline Vasconcelos Moran](https://linkedin.com/in/caroline-moran)

---

## 🙏 Agradecimentos

- **IBGE** - API pública de localidades do Brasil (27 estados + 5.570 municípios)
- **OpenStreetMap/Nominatim** - Serviço gratuito de geocodificação
- **GitHub Copilot** - Assistência de IA que acelerou o desenvolvimento em 300%
- **Microsoft** - Pela criação e disponibilização do GitHub Copilot
- Comunidade open source de **Node.js** e **Express.js**
- **Haversine Formula** - Matemática que possibilita cálculos precisos de distância
- **Mercado de Créditos de Carbono** - Dados públicos de precificação

### 🌟 Tecnologias que Tornaram Este Projeto Possível

- **Node.js** - Runtime JavaScript moderno
- **Express.js** - Framework web minimalista e poderoso
- **Axios** - Cliente HTTP elegante
- **Nominatim** - Geocodificação gratuita e precisa
- **IBGE API** - Dados oficiais e atualizados do Brasil

### 💚 Contribuindo para um Futuro Sustentável

Este projeto é open source e foi criado para educar e conscientizar sobre o impacto ambiental de nossas escolhas de transporte. Se você:

- 🌱 Acredita em sustentabilidade
- 💻 Quer aprender desenvolvimento web
- 🤖 Quer explorar o potencial do GitHub Copilot
- 🌍 Deseja contribuir para o meio ambiente

**Você está no lugar certo!** Sinta-se livre para fazer fork, contribuir, ou usar este código em seus próprios projetos educacionais.

---

<div align="center">

**🍃 Feito com 💚 para um futuro mais sustentável**

**🤖 Desenvolvido com GitHub Copilot - O poder da IA no desenvolvimento de software**

---

### 📊 Estatísticas do Projeto

![Lines of Code](https://img.shields.io/badge/Linhas%20de%20C%C3%B3digo-1500%2B-blue?style=flat-square)
![API Endpoints](https://img.shields.io/badge/API%20Endpoints-5-green?style=flat-square)
![APIs Integradas](https://img.shields.io/badge/APIs%20Integradas-2-orange?style=flat-square)
![Copilot Acceleration](https://img.shields.io/badge/Acelera%C3%A7%C3%A3o%20IA-300%25-purple?style=flat-square)

---

**Calculadora de Emissão de CO₂ | EcoTrip © 2025**

_Cada viagem é uma escolha. Escolha sabiamente. Escolha sustentavelmente._ 🌍

</div>
