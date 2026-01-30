# 🔄 Evolução da Calculadora de Emissão de CO₂

## 📅 Data: 30 de janeiro de 2026

## 🎯 Objetivo

Evoluir a Calculadora de Emissão de CO₂ para usar dados reais via APIs públicas, proporcionando uma experiência mais profissional e precisa aos usuários.

---

## 🚀 Mudanças Implementadas

### 1. **Integração com API do IBGE**

#### Estados

- **Endpoint**: `GET /api/estados`
- **Fonte**: API pública do IBGE
- **Funcionalidade**: Retorna lista completa dos estados brasileiros ordenados alfabeticamente
- **Formato de resposta**:

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

#### Municípios

- **Endpoint**: `GET /api/municipios/:estadoId`
- **Fonte**: API pública do IBGE
- **Funcionalidade**: Retorna lista de municípios de um estado específico
- **Formato de resposta**:

```json
[
  {
    "id": 3550308,
    "nome": "São Paulo"
  },
  ...
]
```

### 2. **Cálculo Automático de Distância**

#### Endpoint de Cálculo de Distância

- **Endpoint**: `POST /api/calculate-distance`
- **Método**: Fórmula de Haversine (distância entre coordenadas geográficas)
- **API de Geocodificação**: Nominatim (OpenStreetMap)

**Request Body**:

```json
{
  "origemCidade": "São Paulo",
  "origemEstado": "São Paulo",
  "destinoCidade": "Rio de Janeiro",
  "destinoEstado": "Rio de Janeiro"
}
```

**Response**:

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

#### Fórmula de Haversine

Implementada para calcular a distância entre dois pontos na Terra:

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
  const distance = R * c;

  return parseFloat(distance.toFixed(2));
}
```

### 3. **Interface Aprimorada**

#### Novo Fluxo de Seleção

1. **Origem**
   - Selecionar Estado de Origem
   - Selecionar Cidade de Origem (carrega automaticamente após selecionar estado)

2. **Destino**
   - Selecionar Estado de Destino
   - Selecionar Cidade de Destino (carrega automaticamente após selecionar estado)

3. **Distância**
   - Calculada automaticamente após selecionar origem e destino
   - Campo somente leitura por padrão
   - Opção de inserir manualmente (checkbox)

4. **Transporte**
   - Mantido o sistema de botões visual

#### Elementos Visuais Novos

- **Grupos de localização**: Cards destacados para origem e destino
- **Seção de distância**: Card amarelo indicando cálculo automático
- **Selects estilizados**: Design consistente com o tema da aplicação
- **Estados desabilitados**: Selects de cidade desabilitados até selecionar o estado

### 4. **Melhorias de Backend**

#### Cache de Coordenadas

- Implementado cache em memória para coordenadas de cidades
- Reduz chamadas à API de geocodificação
- Melhora performance para consultas repetidas

```javascript
const coordinatesCache = new Map();
```

#### Atualização do Endpoint de Cálculo

O endpoint `/calculate` foi atualizado para aceitar dois modos:

**Modo Automático**:

```json
{
  "transport": "car",
  "origemCidade": "São Paulo",
  "origemEstado": "São Paulo",
  "destinoCidade": "Rio de Janeiro",
  "destinoEstado": "Rio de Janeiro"
}
```

**Modo Manual** (fallback):

```json
{
  "distance": 430,
  "transport": "car"
}
```

### 5. **Tratamento de Erros Aprimorado**

#### Fallback para Modo Manual

Quando a API de geocodificação falha:

1. Exibe mensagem de erro ao usuário
2. Habilita automaticamente o modo manual
3. Permite que o usuário insira a distância manualmente

```javascript
if (!response.ok || data.fallbackToManual) {
  // Habilitar modo manual
  manualDistanceCheckbox.checked = true;
  isManualDistance = true;
  distanceInput.readOnly = false;
}
```

#### Mensagens de Loading

Implementado feedback visual durante operações assíncronas:

- "Carregando estados..."
- "Carregando cidades..."
- "Calculando distância..."
- "Calculando emissões de CO₂..."

---

## 📦 Dependências Adicionadas

```json
{
  "axios": "^1.x.x",
  "node-fetch": "^3.x.x"
}
```

---

## 🎨 Atualizações de CSS

### Novos Estilos

```css
/* Grupos de localização */
.location-group {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid var(--primary-color);
}

/* Seção de distância */
.distance-section {
  background: #fff3cd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #ffc107;
}

/* Selects estilizados */
select {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: var(--dark-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

select:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

## 🔄 Fluxo Completo de Uso

### 1. Carregamento Inicial

```
Usuário acessa → Página carrega → API IBGE busca estados → Popula selects
```

### 2. Seleção de Origem

```
Usuário seleciona estado → API IBGE busca municípios → Popula select de cidade
Usuário seleciona cidade origem → Aguarda seleção de destino
```

### 3. Seleção de Destino

```
Usuário seleciona estado → API IBGE busca municípios → Popula select de cidade
Usuário seleciona cidade destino → Calcula distância automaticamente
```

### 4. Cálculo de Distância

```
Script obtém coordenadas via Nominatim → Aplica fórmula de Haversine → Exibe distância
```

### 5. Cálculo de Emissões

```
Usuário seleciona transporte → Clica "Calcular Emissão"
Backend valida → Calcula emissão → Retorna resultado → Exibe na tela
```

---

## 🧪 Exemplos de Teste

### Teste 1: Fluxo Completo Automático

```
1. Origem: São Paulo, SP
2. Destino: Rio de Janeiro, RJ
3. Distância: ~357 km (calculada automaticamente)
4. Transporte: Carro
5. Resultado: ~75 kg CO₂
```

### Teste 2: Modo Manual (Fallback)

```
1. Origem: São Paulo, SP
2. Destino: Cidade pequena sem geocodificação
3. API falha → Modo manual habilitado
4. Usuário insere: 200 km
5. Transporte: Ônibus
6. Resultado: 20 kg CO₂
```

### Teste 3: Mesma Origem e Destino

```
1. Origem: São Paulo, SP
2. Destino: São Paulo, SP
3. Distância: ~0 km
4. Transporte: Qualquer
5. Resultado: 0 kg CO₂
```

---

## 📊 APIs Utilizadas

### 1. IBGE - Localidades

- **URL Base**: `https://servicodados.ibge.gov.br/api/v1/localidades`
- **Documentação**: https://servicodados.ibge.gov.br/api/docs/localidades
- **Limite de requisições**: Sem limite (API pública)
- **Autenticação**: Não requerida

### 2. Nominatim - Geocodificação

- **URL Base**: `https://nominatim.openstreetmap.org`
- **Documentação**: https://nominatim.org/release-docs/latest/api/Search/
- **Política de uso**: Máximo 1 requisição por segundo
- **User-Agent**: Obrigatório (configurado: "CO2-Calculator-EcoTrip/1.0")

---

## ⚠️ Limitações e Considerações

### 1. Precisão da Distância

- A distância calculada é "em linha reta" (great circle distance)
- Não considera rotas reais de estradas
- Para maior precisão, seria necessário usar APIs de roteamento (Google Maps, Mapbox, etc.)

### 2. Disponibilidade das APIs

- **IBGE**: Alta disponibilidade, sem autenticação
- **Nominatim**: Limite de 1 req/s, pode falhar para cidades pequenas

### 3. Performance

- Cache implementado reduz chamadas repetidas
- Primeira carga pode ser mais lenta devido a chamadas à API

### 4. Cobertura

- Todas as cidades brasileiras estão disponíveis (IBGE)
- Nem todas as cidades podem ter coordenadas precisas (Nominatim)

---

## 🔮 Melhorias Futuras Sugeridas

### 1. API de Roteamento

Integrar com Google Maps Distance Matrix API ou similar para distâncias reais de estrada.

### 2. Persistência de Cache

Salvar cache de coordenadas em banco de dados ou arquivo para persistir entre reinicializações.

### 3. Autocomplete

Implementar autocomplete nos selects para facilitar busca em listas grandes.

### 4. Histórico de Consultas

Salvar consultas do usuário (localStorage ou backend) para facilitar reconsultas.

### 5. Comparação de Rotas

Permitir comparar múltiplos meios de transporte simultaneamente.

### 6. Exportação de Relatórios

Gerar PDFs com histórico de emissões calculadas.

### 7. Visualização no Mapa

Mostrar rota visual no mapa usando bibliotecas como Leaflet ou Google Maps.

---

## 📝 Conclusão

A evolução implementada transforma a Calculadora de Emissão de CO₂ de uma ferramenta simples em uma aplicação profissional com:

✅ Dados reais de estados e cidades brasileiras  
✅ Cálculo automático de distâncias geográficas  
✅ Interface intuitiva com feedback visual  
✅ Tratamento robusto de erros  
✅ Performance otimizada com cache  
✅ Fallback para modo manual quando necessário

A aplicação agora oferece uma experiência muito mais rica e profissional aos usuários! 🎉
