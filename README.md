# 🍃 Calculadora de Emissão de CO₂

Aplicação fullstack para calcular emissões de CO₂ em viagens de acordo com o meio de transporte utilizado.

## 📋 Funcionalidades

- Cálculo de emissões de CO₂ baseado em:
  - Distância percorrida
  - Meio de transporte (Bicicleta, Carro, Ônibus, Caminhão)
- Interface moderna e responsiva
- Validação de dados no frontend e backend
- API RESTful
- Mensagens de erro claras

## 🛠️ Stack Tecnológica

### Backend

- Node.js
- Express.js
- CORS

### Frontend

- HTML5 Semântico
- CSS3 (com variáveis CSS e animações)
- JavaScript Vanilla (ES6+)

## 📁 Estrutura do Projeto

```
calculator-ecotrip/
├── server/
│   └── index.js          # Servidor Express e API
├── public/
│   ├── index.html        # Interface do usuário
│   ├── style.css         # Estilos
│   └── script.js         # Lógica do frontend
├── package.json
├── .gitignore
└── README.md
```

## 🚀 Como Executar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar o Servidor

```bash
npm start
```

Ou para desenvolvimento com auto-reload:

```bash
npm run dev
```

### 3. Acessar a Aplicação

Abra seu navegador e acesse:

```
http://localhost:3000
```

## 📊 API Endpoints

### POST `/api/calculate`

Calcula a emissão de CO₂ para uma viagem.

**Request Body:**

```json
{
  "origem": "São Paulo",
  "destino": "Rio de Janeiro",
  "distancia": 430,
  "transporte": "carro"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "origem": "São Paulo",
    "destino": "Rio de Janeiro",
    "distancia": 430,
    "transporte": "carro",
    "emissaoCO2": 82.56,
    "unidade": "kg",
    "arvoresNecessarias": 4,
    "mensagem": "Esta viagem emite 82.56 kg de CO2"
  }
}
```

### GET `/api/emission-factors`

Retorna os fatores de emissão utilizados nos cálculos.

## 🌍 Fatores de Emissão

| Transporte | Emissão (kg CO₂/km) |
| ---------- | ------------------- |
| Bicicleta  | 0                   |
| Carro      | 0.192               |
| Ônibus     | 0.089               |
| Caminhão   | 0.962               |

## ✨ Características

- ✅ Validação completa de dados
- ✅ Mensagens de erro claras
- ✅ Interface responsiva
- ✅ Checkbox para inserir distância manualmente
- ✅ Cálculo de árvores necessárias para compensação
- ✅ Feedback visual com animações
- ✅ Bicicleta sempre retorna 0 kg CO₂

## 📝 Licença

MIT

## 👨‍💻 Autor

EcoTrip Calculator - 2026
