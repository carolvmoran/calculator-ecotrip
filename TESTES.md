# 🧪 Testes da Calculadora de Emissão de CO₂

## Data: 30 de janeiro de 2026

Este arquivo contém exemplos de testes para validar o funcionamento da Calculadora de Emissão de CO₂ com as novas funcionalidades de APIs integradas.

---

## ✅ Testes de Backend

### 1. Teste: Listar Estados

**Endpoint**: `GET /api/estados`

**Comando**:

```bash
curl http://localhost:3000/api/estados
```

**Resultado Esperado**: Lista de 27 estados brasileiros ordenados alfabeticamente

**Exemplo de Resposta**:

```json
[
  {
    "id": 12,
    "sigla": "AC",
    "nome": "Acre"
  },
  {
    "id": 35,
    "sigla": "SP",
    "nome": "São Paulo"
  },
  ...
]
```

**Status**: ✅ Passou

---

### 2. Teste: Listar Municípios de São Paulo

**Endpoint**: `GET /api/municipios/:estadoId`

**Comando**:

```bash
curl http://localhost:3000/api/municipios/35
```

**Resultado Esperado**: Lista de 645 municípios de São Paulo ordenados alfabeticamente

**Exemplo de Resposta**:

```json
[
  {
    "id": 3550308,
    "nome": "São Paulo"
  },
  {
    "id": 3509502,
    "nome": "Campinas"
  },
  ...
]
```

**Status**: ✅ Passou

---

### 3. Teste: Calcular Distância entre São Paulo e Rio de Janeiro

**Endpoint**: `POST /api/calculate-distance`

**Comando**:

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

**Resultado Esperado**: Distância calculada ~357 km

**Resposta Obtida**:

```json
{
  "distance": 357.01,
  "unit": "km",
  "origem": {
    "cidade": "São Paulo",
    "estado": "São Paulo",
    "coordinates": {
      "lat": -23.5506507,
      "lon": -46.6333824
    }
  },
  "destino": {
    "cidade": "Rio de Janeiro",
    "estado": "Rio de Janeiro",
    "coordinates": {
      "lat": -22.9110137,
      "lon": -43.2093727
    }
  }
}
```

**Status**: ✅ Passou

---

### 4. Teste: Calcular Emissões com Distância Automática

**Endpoint**: `POST /calculate`

**Comando**:

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

**Resultado Esperado**:

- Distância: ~357 km
- Emissão: ~75 kg CO₂ (357 × 0.21)

**Resposta Obtida**:

```json
{
  "emission": 74.97,
  "unit": "kg CO2",
  "distance": 357.01
}
```

**Cálculo Manual**:

```
357.01 km × 0.21 kg/km = 74.9721 kg ≈ 74.97 kg CO₂ ✅
```

**Status**: ✅ Passou

---

### 5. Teste: Calcular Emissões com Distância Manual

**Endpoint**: `POST /calculate`

**Comando**:

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "distance": 100,
    "transport": "bus"
  }'
```

**Resultado Esperado**: 10 kg CO₂ (100 × 0.10)

**Resposta Obtida**:

```json
{
  "emission": 10,
  "unit": "kg CO2",
  "distance": 100
}
```

**Status**: ✅ Passou

---

### 6. Teste: Obter Fatores de Emissão

**Endpoint**: `GET /emission-factors`

**Comando**:

```bash
curl http://localhost:3000/emission-factors
```

**Resultado Esperado**: Lista de fatores de emissão

**Resposta Obtida**:

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

**Status**: ✅ Passou

---

## 🧮 Testes de Cálculo de Distância

### Teste 1: São Paulo → Campinas

**Entrada**:

- Origem: São Paulo, SP
- Destino: Campinas, SP

**Comando**:

```bash
curl -X POST http://localhost:3000/api/calculate-distance \
  -H "Content-Type: application/json" \
  -d '{
    "origemCidade": "São Paulo",
    "origemEstado": "São Paulo",
    "destinoCidade": "Campinas",
    "destinoEstado": "São Paulo"
  }'
```

**Resultado Esperado**: ~90-100 km

**Status**: 🔄 Aguardando execução

---

### Teste 2: São Paulo → Brasília

**Entrada**:

- Origem: São Paulo, SP
- Destino: Brasília, DF

**Comando**:

```bash
curl -X POST http://localhost:3000/api/calculate-distance \
  -H "Content-Type: application/json" \
  -d '{
    "origemCidade": "São Paulo",
    "origemEstado": "São Paulo",
    "destinoCidade": "Brasília",
    "destinoEstado": "Distrito Federal"
  }'
```

**Resultado Esperado**: ~870-1000 km

**Status**: 🔄 Aguardando execução

---

### Teste 3: Porto Alegre → Florianópolis

**Entrada**:

- Origem: Porto Alegre, RS
- Destino: Florianópolis, SC

**Comando**:

```bash
curl -X POST http://localhost:3000/api/calculate-distance \
  -H "Content-Type: application/json" \
  -d '{
    "origemCidade": "Porto Alegre",
    "origemEstado": "Rio Grande do Sul",
    "destinoCidade": "Florianópolis",
    "destinoEstado": "Santa Catarina"
  }'
```

**Resultado Esperado**: ~400-450 km

**Status**: 🔄 Aguardando execução

---

## 🚗 Testes de Emissões por Transporte

### Cenário: Viagem de 100 km

| Transporte   | Fator (kg/km) | Emissão Esperada | Comando                                                                                                                         |
| ------------ | ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 🚴 Bicicleta | 0.00          | 0 kg CO₂         | `curl -X POST http://localhost:3000/calculate -H "Content-Type: application/json" -d '{"distance": 100, "transport": "bike"}'`  |
| 🚌 Ônibus    | 0.10          | 10 kg CO₂        | `curl -X POST http://localhost:3000/calculate -H "Content-Type: application/json" -d '{"distance": 100, "transport": "bus"}'`   |
| 🚗 Carro     | 0.21          | 21 kg CO₂        | `curl -X POST http://localhost:3000/calculate -H "Content-Type: application/json" -d '{"distance": 100, "transport": "car"}'`   |
| 🚚 Caminhão  | 0.27          | 27 kg CO₂        | `curl -X POST http://localhost:3000/calculate -H "Content-Type: application/json" -d '{"distance": 100, "transport": "truck"}'` |

---

## ❌ Testes de Validação e Erros

### Teste 1: Distância Inválida (Zero)

**Comando**:

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "distance": 0,
    "transport": "car"
  }'
```

**Resultado Esperado**: Erro 400 - "A distância deve ser um número maior que zero"

**Status**: 🔄 Aguardando execução

---

### Teste 2: Transporte Inválido

**Comando**:

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "distance": 100,
    "transport": "airplane"
  }'
```

**Resultado Esperado**: Erro 400 - "Meio de transporte inválido"

**Status**: 🔄 Aguardando execução

---

### Teste 3: Cidade Não Encontrada

**Comando**:

```bash
curl -X POST http://localhost:3000/api/calculate-distance \
  -H "Content-Type: application/json" \
  -d '{
    "origemCidade": "CidadeInexistente123",
    "origemEstado": "São Paulo",
    "destinoCidade": "São Paulo",
    "destinoEstado": "São Paulo"
  }'
```

**Resultado Esperado**: Erro 500 com sugestão de fallback para modo manual

**Status**: 🔄 Aguardando execução

---

### Teste 4: Campos Faltando

**Comando**:

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "transport": "car"
  }'
```

**Resultado Esperado**: Erro 400 - "A distância deve ser fornecida ou as cidades de origem e destino devem ser especificadas"

**Status**: 🔄 Aguardando execução

---

## 🎨 Testes de Frontend

### Teste Manual 1: Fluxo Completo Automático

**Passos**:

1. Acessar `http://localhost:3000`
2. Selecionar Estado de Origem: **São Paulo**
3. Aguardar carregamento das cidades
4. Selecionar Cidade de Origem: **São Paulo**
5. Selecionar Estado de Destino: **Rio de Janeiro**
6. Aguardar carregamento das cidades
7. Selecionar Cidade de Destino: **Rio de Janeiro**
8. Aguardar cálculo automático da distância (~357 km)
9. Selecionar Transporte: **Carro**
10. Clicar em "Calcular Emissão"

**Resultado Esperado**:

- Campo de distância preenchido automaticamente: ~357 km
- Resultado: ~75 kg CO₂
- Seção de resultados exibida com todos os dados

**Status**: ✅ Passou (verificado visualmente)

---

### Teste Manual 2: Modo Manual (Fallback)

**Passos**:

1. Acessar `http://localhost:3000`
2. Selecionar Estado de Origem: **São Paulo**
3. Selecionar Cidade de Origem: **São Paulo**
4. Selecionar Estado de Destino: **Rio de Janeiro**
5. Selecionar Cidade de Destino: **Rio de Janeiro**
6. Marcar checkbox "Inserir distância manualmente"
7. Digitar distância: **400**
8. Selecionar Transporte: **Ônibus**
9. Clicar em "Calcular Emissão"

**Resultado Esperado**:

- Campo de distância editável
- Resultado: 40 kg CO₂ (400 × 0.10)

**Status**: 🔄 Aguardando execução

---

### Teste Manual 3: Validação de Formulário

**Cenário**: Tentar calcular sem selecionar transporte

**Passos**:

1. Acessar `http://localhost:3000`
2. Selecionar origem e destino
3. Aguardar cálculo da distância
4. **NÃO** selecionar transporte
5. Clicar em "Calcular Emissão"

**Resultado Esperado**:

- Mensagem de erro: "Por favor, selecione um meio de transporte"
- Formulário não enviado

**Status**: 🔄 Aguardando execução

---

### Teste Manual 4: Carregamento de Estados

**Passos**:

1. Acessar `http://localhost:3000`
2. Observar os selects de estado

**Resultado Esperado**:

- Mensagem "Carregando estados..." aparece brevemente
- 27 estados aparecem nos selects
- Estados ordenados alfabeticamente

**Status**: ✅ Passou

---

### Teste Manual 5: Carregamento de Cidades

**Passos**:

1. Selecionar estado "São Paulo"
2. Observar o select de cidades

**Resultado Esperado**:

- Select de cidades desabilitado inicialmente
- Mensagem "Carregando..." aparece
- 645 cidades de SP aparecem
- Cidades ordenadas alfabeticamente

**Status**: ✅ Passou

---

## 📊 Matriz de Cobertura de Testes

| Funcionalidade                      | Testado | Status                  |
| ----------------------------------- | ------- | ----------------------- |
| Listagem de estados                 | ✅      | Passou                  |
| Listagem de municípios              | ✅      | Passou                  |
| Cálculo de distância (Haversine)    | ✅      | Passou                  |
| Cálculo de emissões (automático)    | ✅      | Passou                  |
| Cálculo de emissões (manual)        | ✅      | Passou                  |
| Obtenção de fatores de emissão      | ✅      | Passou                  |
| Validação de distância              | 🔄      | Pendente                |
| Validação de transporte             | 🔄      | Pendente                |
| Erro de geocodificação              | 🔄      | Pendente                |
| Fallback para modo manual           | 🔄      | Pendente                |
| Interface - seleção de estados      | ✅      | Passou                  |
| Interface - seleção de cidades      | ✅      | Passou                  |
| Interface - cálculo automático      | ✅      | Passou                  |
| Interface - modo manual             | 🔄      | Pendente                |
| Interface - validação de formulário | 🔄      | Pendente                |
| Cache de coordenadas                | ⚠️      | Não testado diretamente |

---

## 🏆 Resumo dos Resultados

### ✅ Testes Aprovados: 9/15

### 🔄 Testes Pendentes: 5/15

### ❌ Testes Falhados: 0/15

### ⚠️ Testes Não Executados: 1/15

### Taxa de Sucesso: 100% (dos testes executados)

---

## 📝 Observações

1. **Performance**:
   - API do IBGE responde rapidamente (~200-500ms)
   - Nominatim pode ser mais lento (~1-2s)
   - Cache de coordenadas melhora muito a performance em consultas repetidas

2. **Limitações Identificadas**:
   - Distância calculada é "em linha reta", não considera rotas reais
   - Nominatim tem limite de 1 req/s (política de uso justo)
   - Cidades muito pequenas podem não ter coordenadas no Nominatim

3. **Melhorias Sugeridas**:
   - Adicionar mais testes de validação
   - Implementar testes automatizados (Jest, Mocha)
   - Adicionar testes de carga/stress
   - Testar com diferentes navegadores

---

## 🔄 Próximos Passos

1. Completar testes pendentes de validação
2. Implementar suite de testes automatizados
3. Adicionar testes de integração end-to-end (Cypress, Playwright)
4. Documentar casos de borda e comportamentos especiais
5. Criar testes de performance e benchmark

---

## 🤝 Contribuindo com Testes

Para adicionar novos testes:

1. Escolha uma funcionalidade não testada
2. Defina entrada, comando e resultado esperado
3. Execute o teste
4. Documente o resultado
5. Atualize a matriz de cobertura

---

**Última atualização**: 30 de janeiro de 2026  
**Versão da aplicação**: 2.0.0 (com APIs integradas)
