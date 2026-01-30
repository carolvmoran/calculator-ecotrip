# 🍃 Calculadora de Emissão de CO₂<div align="center">![CO2 Calculator](https://img.shields.io/badge/CO2-Calculator-green?style=for-the-badge)![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)Uma aplicação web fullstack para calcular emissões de CO₂ em viagens de acordo com o meio de transporte utilizado.[Demo](#-demonstração) • [Instalação](#-instalação) • [Como Usar](#-como-usar) • [API](#-api) • [Tecnologias](#-tecnologias-utilizadas)</div>---## 📋 DescriçãoA **Calculadora de Emissão de CO₂** é uma ferramenta que permite aos usuários calcular o impacto ambiental de suas viagens, estimando a quantidade de dióxido de carbono (CO₂) emitida com base na distância percorrida e no meio de transporte utilizado.O projeto tem como objetivo **conscientizar** sobre o impacto ambiental das escolhas de transporte e incentivar alternativas mais sustentáveis.### ✨ Funcionalidades- ✅ Cálculo de emissões de CO₂ por quilômetro rodado- ✅ Suporte para 4 meios de transporte: - 🚴 **Bicicleta** (0 kg CO₂/km) - 🚗 **Carro** (0.21 kg CO₂/km) - 🚌 **Ônibus** (0.10 kg CO₂/km) - 🚚 **Caminhão** (0.27 kg CO₂/km)- ✅ Interface intuitiva e responsiva- ✅ Validação de dados no frontend e backend- ✅ API RESTful para integração com outros sistemas- ✅ Mensagens de erro claras e específicas---## 🚀 Demonstração### Interface da CalculadoraA aplicação possui uma interface limpa e moderna com:- Card centralizado com fundo gradiente verde claro- Campos para origem, destino e distância- Botões visuais para seleção do meio de transporte- Exibição clara do resultado da emissão de CO₂### Exemplo de Uso`Origem: São PauloDestino: Rio de JaneiroDistância: 430 kmTransporte: 🚗 CarroResultado: 90.3 kg CO₂`---## 🛠️ Tecnologias Utilizadas### Backend- **Node.js** - Ambiente de execução JavaScript- **Express.js** - Framework web minimalista- **CORS** - Habilitação de requisições cross-origin### Frontend- **HTML5** - Estrutura semântica- **CSS3** - Estilização moderna com variáveis CSS e animações- **JavaScript (ES6+)** - Lógica do cliente e comunicação com API### Arquitetura- **REST API** - Comunicação cliente-servidor- **JSON** - Formato de troca de dados- **Fetch API** - Requisições HTTP assíncronas---## 📦 Instalação### Pré-requisitos- **Node.js** (versão 14 ou superior)- **npm** (gerenciador de pacotes do Node.js)### Passo a Passo1. **Clone o repositório** `bash   git clone https://github.com/carolvmoran/calculator-ecotrip.git   cd calculator-ecotrip   `2. **Instale as dependências** `bash   npm install   `3. **Inicie o servidor** `bash   npm start   `4. **Acesse a aplicação** `   http://localhost:3000   `### Scripts Disponíveis- `npm start` - Inicia o servidor em modo produção- `npm run dev` - Inicia o servidor em modo desenvolvimento com auto-reload (nodemon)---## 💻 Como Usar### Interface Web1. **Acesse** `http://localhost:3000` no navegador2. **Preencha** os campos: - Cidade de origem - Cidade de destino3. **Marque** o checkbox "Inserir distância manualmente"4. **Digite** a distância em quilômetros5. **Selecione** o meio de transporte clicando em um dos botões6. **Clique** em "Calcular Emissão"7. **Visualize** o resultado com a emissão de CO₂ calculada### Exemplo Prático```📍 Origem: São Paulo

📍 Destino: Campinas
📏 Distância: 100 km
🚗 Transporte: Carro

💨 Resultado: 21 kg CO₂

```

---

## 🔧 Como Funciona o Cálculo

### Fórmula

O cálculo de emissões é baseado em fatores de emissão padronizados:

```

Emissão de CO₂ = Distância × Fator de Emissão

```

### Fatores de Emissão

| Meio de Transporte | Fator (kg CO₂/km) | Impacto        |
|-------------------|-------------------|----------------|
| 🚴 Bicicleta      | 0.00              | Nenhum         |
| 🚌 Ônibus         | 0.10              | Baixo          |
| 🚗 Carro          | 0.21              | Médio          |
| 🚚 Caminhão       | 0.27              | Alto           |

### Exemplo de Cálculo

**Viagem de carro (100 km):**
```

Emissão = 100 km × 0.21 kg CO₂/km = 21 kg CO₂

```

**Viagem de ônibus (100 km):**
```

Emissão = 100 km × 0.10 kg CO₂/km = 10 kg CO₂

```

**Economia ao escolher ônibus:**
```

Redução = 21 - 10 = 11 kg CO₂ (52% menos emissões!)

````

---

## 📡 API

### Endpoints Disponíveis

#### POST `/calculate`

Calcula a emissão de CO₂ para uma viagem.

**Request:**
```json
{
  "distance": 100,
  "transport": "car"
}
````

**Response (Sucesso - 200):**

```json
{
  "emission": 21,
  "unit": "kg CO2"
}
```

**Response (Erro - 400):**

```json
{
  "error": "A distância deve ser um número maior que zero"
}
```

#### GET `/emission-factors`

Retorna os fatores de emissão utilizados nos cálculos.

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

### Exemplos de Uso da API

**cURL:**

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 100, "transport": "car"}'
```

**JavaScript (Fetch):**

```javascript
const response = await fetch("http://localhost:3000/calculate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ distance: 100, transport: "car" }),
});

const result = await response.json();
console.log(result.emission); // 21
```

---

## 📁 Estrutura do Projeto

```
calculator-ecotrip/
├── server/
│   └── index.js              # Servidor Express e lógica da API
├── public/
│   ├── index.html            # Interface do usuário
│   ├── style.css             # Estilos e design responsivo
│   └── script.js             # Lógica do frontend e integração com API
├── package.json              # Dependências e scripts
├── .gitignore               # Arquivos ignorados pelo Git
├── README.md                # Documentação do projeto
├── API_TESTS.md             # Documentação de testes da API
├── IMPLEMENTACAO.md         # Detalhes da implementação
└── CORRECAO_IDS_HTML.md     # Histórico de correções
```

---

## 🧪 Testes

### Testar a API Manualmente

**1. Cálculo com Carro:**

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 100, "transport": "car"}'
```

**2. Cálculo com Bicicleta:**

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 10, "transport": "bike"}'
```

**3. Validação de Erro:**

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 0, "transport": "car"}'
```

### Casos de Teste

| Teste               | Entrada                               | Saída Esperada                   |
| ------------------- | ------------------------------------- | -------------------------------- |
| Carro 100km         | `{distance: 100, transport: "car"}`   | `{emission: 21, unit: "kg CO2"}` |
| Bicicleta 10km      | `{distance: 10, transport: "bike"}`   | `{emission: 0, unit: "kg CO2"}`  |
| Ônibus 50km         | `{distance: 50, transport: "bus"}`    | `{emission: 5, unit: "kg CO2"}`  |
| Caminhão 200km      | `{distance: 200, transport: "truck"}` | `{emission: 54, unit: "kg CO2"}` |
| Distância inválida  | `{distance: -10, transport: "car"}`   | `{error: "..."}`                 |
| Transporte inválido | `{distance: 100, transport: "plane"}` | `{error: "..."}`                 |

---

## 🌍 Impacto Ambiental

### Por que isso importa?

O setor de transporte é responsável por aproximadamente **24% das emissões globais de CO₂**. Escolhas conscientes de transporte podem fazer uma diferença significativa.

### Comparativo de Emissões (viagem de 100 km)

```
🚴 Bicicleta:  0 kg CO₂    ████████████████████ 100% mais limpo!
🚌 Ônibus:     10 kg CO₂   ██████████░░░░░░░░░░ 52% mais limpo que carro
🚗 Carro:      21 kg CO₂   ████░░░░░░░░░░░░░░░░ Linha de base
🚚 Caminhão:   27 kg CO₂   ██░░░░░░░░░░░░░░░░░░ 29% mais poluente
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Desenvolvimento

### Ferramentas de Desenvolvimento

- **VSCode** - Editor de código
- **GitHub Copilot** - Assistente de programação com IA
- **Nodemon** - Auto-reload do servidor em desenvolvimento
- **Chrome DevTools** - Debug e inspeção do frontend

### Observações

> 💡 **Este projeto foi desenvolvido com o apoio do GitHub Copilot**, uma ferramenta de programação em par com IA que auxiliou na:
>
> - Estruturação do código
> - Implementação de funcionalidades
> - Criação de documentação
> - Resolução de problemas
> - Otimização e boas práticas

---

## 🔮 Roadmap

Funcionalidades planejadas para versões futuras:

- [ ] Integração com API de mapas para cálculo automático de distância
- [ ] Mais meios de transporte (metrô, avião, trem)
- [ ] Comparativo visual entre diferentes meios de transporte
- [ ] Histórico de cálculos realizados
- [ ] Exportação de relatórios em PDF
- [ ] Modo escuro (dark mode)
- [ ] Internacionalização (i18n)
- [ ] Gráficos de impacto ambiental
- [ ] Dicas de sustentabilidade personalizadas
- [ ] PWA (Progressive Web App)

---

## 📧 Contato

**Carol VM** - [@carolvmoran](https://github.com/carolvmoran)

**Link do Projeto:** [https://github.com/carolvmoran/calculator-ecotrip](https://github.com/carolvmoran/calculator-ecotrip)

---

## 🙏 Agradecimentos

- [GitHub Copilot](https://github.com/features/copilot) - Assistente de programação com IA
- [Express.js](https://expressjs.com/) - Framework web para Node.js
- [Node.js](https://nodejs.org/) - Runtime JavaScript
- Comunidade open source pelo suporte e inspiração

---

<div align="center">

**Feito com 💚 e ♻️ pensando em um mundo mais sustentável**

⭐ Se este projeto foi útil, considere dar uma estrela!

</div>
