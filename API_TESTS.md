# Testes da API - Calculadora de CO₂

## Endpoint: POST /calculate

### Teste 1: Carro - 100 km

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 100, "transport": "car"}'
```

**Resposta esperada:**

```json
{
  "emission": 21,
  "unit": "kg CO2"
}
```

---

### Teste 2: Ônibus - 50 km

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 50, "transport": "bus"}'
```

**Resposta esperada:**

```json
{
  "emission": 5,
  "unit": "kg CO2"
}
```

---

### Teste 3: Caminhão - 200 km

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 200, "transport": "truck"}'
```

**Resposta esperada:**

```json
{
  "emission": 54,
  "unit": "kg CO2"
}
```

---

### Teste 4: Bicicleta - 10 km

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 10, "transport": "bike"}'
```

**Resposta esperada:**

```json
{
  "emission": 0,
  "unit": "kg CO2"
}
```

---

### Teste 5: Erro - Distância inválida (zero)

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 0, "transport": "car"}'
```

**Resposta esperada (400 Bad Request):**

```json
{
  "error": "A distância deve ser um número maior que zero"
}
```

---

### Teste 6: Erro - Distância negativa

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": -50, "transport": "car"}'
```

**Resposta esperada (400 Bad Request):**

```json
{
  "error": "A distância deve ser um número maior que zero"
}
```

---

### Teste 7: Erro - Meio de transporte inválido

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 100, "transport": "plane"}'
```

**Resposta esperada (400 Bad Request):**

```json
{
  "error": "Meio de transporte inválido. Escolha entre: bike, car, bus ou truck"
}
```

---

### Teste 8: Erro - Sem distância

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"transport": "car"}'
```

**Resposta esperada (400 Bad Request):**

```json
{
  "error": "A distância deve ser um número maior que zero"
}
```

---

## Endpoint: GET /emission-factors

### Teste 9: Obter fatores de emissão

```bash
curl http://localhost:3000/emission-factors
```

**Resposta esperada:**

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

## Fatores de Emissão

| Transporte | Fator (kg CO₂/km) |
| ---------- | ----------------- |
| Bicicleta  | 0.00              |
| Carro      | 0.21              |
| Ônibus     | 0.10              |
| Caminhão   | 0.27              |

---

## Exemplos de Cálculo

**Fórmula:** `emissão = distância × fator`

- **Carro (100 km):** 100 × 0.21 = 21 kg CO₂
- **Ônibus (50 km):** 50 × 0.10 = 5 kg CO₂
- **Caminhão (200 km):** 200 × 0.27 = 54 kg CO₂
- **Bicicleta (qualquer distância):** sempre 0 kg CO₂
