# Implementação da API - Calculadora de CO₂

## ✅ Implementação Concluída

### Endpoint POST /calculate

**URL:** `http://localhost:3000/calculate`

**Request Body:**

```json
{
  "distance": number,
  "transport": "bike" | "car" | "bus" | "truck"
}
```

**Response (sucesso):**

```json
{
  "emission": number,
  "unit": "kg CO2"
}
```

**Response (erro 400):**

```json
{
  "error": "mensagem de erro"
}
```

---

## Fatores de Emissão Implementados

| Transporte | Fator (kg CO₂/km) | Variável |
| ---------- | ----------------- | -------- |
| Bicicleta  | 0.00              | `bike`   |
| Carro      | 0.21              | `car`    |
| Ônibus     | 0.10              | `bus`    |
| Caminhão   | 0.27              | `truck`  |

---

## Validações Implementadas

### ✅ Distância maior que zero

- Verifica se `distance` existe
- Verifica se é do tipo `number`
- Verifica se é maior que zero
- **Erro:** "A distância deve ser um número maior que zero"

### ✅ Meio de transporte válido

- Verifica se `transport` existe
- Verifica se está entre: `bike`, `car`, `bus`, `truck`
- **Erro:** "Meio de transporte inválido. Escolha entre: bike, car, bus ou truck"

---

## Exemplos de Uso

### Cálculo para Carro (100 km)

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 100, "transport": "car"}'
```

**Resultado:** `{"emission":21,"unit":"kg CO2"}`

### Cálculo para Bicicleta (10 km)

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 10, "transport": "bike"}'
```

**Resultado:** `{"emission":0,"unit":"kg CO2"}`

### Erro - Distância Inválida

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 0, "transport": "car"}'
```

**Resultado:** `{"error":"A distância deve ser um número maior que zero"}`

### Erro - Transporte Inválido

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"distance": 100, "transport": "plane"}'
```

**Resultado:** `{"error":"Meio de transporte inválido. Escolha entre: bike, car, bus ou truck"}`

---

## Endpoint Adicional: GET /emission-factors

**URL:** `http://localhost:3000/emission-factors`

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

## Testes Realizados

✅ Cálculo com carro (100 km) → 21 kg CO₂  
✅ Cálculo com bicicleta (10 km) → 0 kg CO₂  
✅ Validação de distância zero → Erro apropriado  
✅ Validação de transporte inválido → Erro apropriado  
✅ Endpoint de fatores de emissão → Funcionando

---

## Estrutura do Código

```javascript
// Fatores de emissão
const emissionFactors = {
  bike: 0,
  car: 0.21,
  bus: 0.1,
  truck: 0.27,
};

// Endpoint POST /calculate
app.post("/calculate", (req, res) => {
  const { distance, transport } = req.body;

  // Validações
  // ...

  // Cálculo
  const emission = distance * emissionFactors[transport];

  // Resposta
  res.json({ emission, unit: "kg CO2" });
});
```

---

## Status do Servidor

🌍 **Servidor:** http://localhost:3000  
📊 **API:** http://localhost:3000/calculate  
📖 **Fatores:** http://localhost:3000/emission-factors

**Status:** ✅ Online e funcionando corretamente
