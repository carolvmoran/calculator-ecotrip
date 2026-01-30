# 🍃 Calculadora de Emissão de CO₂

<div align="center">

![CO2 Calculator](https://img.shields.io/badge/CO2-Calculator-green?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

Uma aplicação web fullstack para calcular emissões de CO₂ em viagens de acordo com o meio de transporte utilizado, **com dados reais de cidades brasileiras e cálculo automático de distâncias**.

[Demo](#-demonstração) • [Instalação](#-instalação) • [Como Usar](#-como-usar) • [API](#-api) • [Tecnologias](#-tecnologias-utilizadas)

</div>

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

💨 Resultado: 93.71 kg CO₂
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

### Cálculo de Distância

A distância entre duas cidades é calculada usando a **Fórmula de Haversine**, que calcula a distância em linha reta entre dois pontos na superfície da Terra.

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

  return R * c; // Distância em km
}
```

### Cálculo de Emissões

O cálculo de emissões é baseado em fatores de emissão padronizados:

```
Emissão de CO₂ = Distância × Fator de Emissão
```

### Fatores de Emissão

| Meio de Transporte | Fator (kg CO₂/km) | Impacto |
| ------------------ | ----------------- | ------- |
| 🚴 Bicicleta       | 0.00              | Nenhum  |
| 🚌 Ônibus          | 0.10              | Baixo   |
| 🚗 Carro           | 0.21              | Médio   |
| 🚚 Caminhão        | 0.27              | Alto    |

### Exemplo de Cálculo

**Viagem de carro (357.42 km):**

```
Emissão = 357.42 km × 0.21 kg CO₂/km = 75.06 kg CO₂
```

**Viagem de ônibus (357.42 km):**

```
Emissão = 357.42 km × 0.10 kg CO₂/km = 35.74 kg CO₂
```

**Economia ao escolher ônibus:**

```
Redução = 75.06 - 35.74 = 39.32 kg CO₂ (52% menos emissões!)
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
  "distance": 357.42,
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
  "emission": 75.06,
  "unit": "kg CO2",
  "distance": 357.42
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

### Comparação de Emissões (100 km)

| Transporte   | Emissão CO₂ | Comparação           |
| ------------ | ----------- | -------------------- |
| 🚴 Bicicleta | 0 kg        | Base (0%)            |
| 🚌 Ônibus    | 10 kg       | Baixo impacto        |
| 🚗 Carro     | 21 kg       | 110% mais que ônibus |
| 🚚 Caminhão  | 27 kg       | 170% mais que ônibus |

### Equivalências

**21 kg de CO₂ (100 km de carro) é equivalente a:**

- 🌳 Plantar aproximadamente 1 árvore por ano
- 💡 Consumo de energia de uma lâmpada LED por 1.400 horas
- 🏭 Emissões de uma pessoa durante 1 dia de vida

---

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido com o apoio do **GitHub Copilot**, a ferramenta de IA da GitHub que auxiliou na:

- Escrita de código otimizado
- Estruturação do projeto
- Implementação de boas práticas de desenvolvimento
- Integração com APIs externas
- Documentação completa

### Evolução do Projeto

A calculadora foi evoluída de uma versão básica para uma aplicação profissional com:

- ✅ Integração com API do IBGE para dados reais de cidades
- ✅ Geocodificação automática via Nominatim
- ✅ Cálculo automático de distâncias usando fórmula de Haversine
- ✅ Cache de coordenadas para melhor performance
- ✅ Fallback para modo manual quando APIs falham

Para mais detalhes sobre as melhorias implementadas, consulte [EVOLUCAO_API.md](./EVOLUCAO_API.md).

---

## 🗺️ Roadmap

### Versão 2.0 (Futuro)

- [ ] 🗺️ Visualização de rotas no mapa (Leaflet/Google Maps)
- [ ] 📊 Gráficos de comparação entre transportes
- [ ] 💾 Histórico de consultas (localStorage)
- [ ] 📱 Progressive Web App (PWA)
- [ ] 🌐 Internacionalização (i18n)
- [ ] 🚗 API de roteamento real (Google Maps Distance Matrix)
- [ ] 📄 Exportação de relatórios em PDF
- [ ] 🔐 Sistema de autenticação de usuários
- [ ] 💳 Cálculo de compensação de carbono

### Versão 2.1 (Futuro)

- [ ] 🚆 Adicionar mais meios de transporte (trem, avião, metrô)
- [ ] 🌎 Suporte para cidades internacionais
- [ ] 📈 Dashboard com estatísticas de uso
- [ ] 🤝 Compartilhamento de resultados em redes sociais
- [ ] 🏆 Gamificação (badges, conquistas)

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

- **IBGE** - API pública de localidades do Brasil
- **OpenStreetMap/Nominatim** - Serviço de geocodificação
- **GitHub Copilot** - Assistência no desenvolvimento
- Comunidade open source de Node.js e Express

---

<div align="center">

**🍃 Feito com 💚 para um futuro mais sustentável**

</div>
