// Elementos do DOM
const form = document.getElementById("emission-form");
const manualDistanceCheckbox = document.getElementById("manual-distance");
const distanceInput = document.getElementById("distance");

// Selects de estados e cidades
const origemEstadoSelect = document.getElementById("origem-estado");
const origemCidadeSelect = document.getElementById("origem-cidade");
const destinoEstadoSelect = document.getElementById("destino-estado");
const destinoCidadeSelect = document.getElementById("destino-cidade");

// Transporte
const transportButtons = document.querySelectorAll(".transport-btn");
const transportInput = document.getElementById("transport");

// Mensagens e resultados
const errorMessage = document.getElementById("error-message");
const resultsSection = document.getElementById("results");

// Estado da aplicação
let selectedTransport = null;
let isManualDistance = false;
let calculatedDistance = null;

// Mapear valores para nomes amigáveis
const transportNames = {
  bike: "🚴 Bicicleta",
  car: "🚗 Carro",
  bus: "🚌 Ônibus",
  truck: "🚚 Caminhão",
};

// ========================================
// FUNÇÕES DE CARREGAMENTO DE DADOS
// ========================================

// Carregar estados do IBGE
async function loadEstados() {
  try {
    if (!origemEstadoSelect || !destinoEstadoSelect) {
      console.error("Selects de estado não encontrados no DOM!");
      return;
    }

    showLoading("Carregando estados...");

    const response = await fetch("/api/estados");
    const estados = await response.json();

    // Preencher ambos os selects de estado
    [origemEstadoSelect, destinoEstadoSelect].forEach((select) => {
      select.innerHTML = '<option value="">Selecione um estado</option>';
      estados.forEach((estado) => {
        const option = document.createElement("option");
        option.value = estado.sigla;
        option.textContent = estado.nome;
        option.dataset.estadoId = estado.id;
        select.appendChild(option);
      });
    });

    hideLoading();
  } catch (error) {
    console.error("Erro ao carregar estados:", error);
    showError("Erro ao carregar lista de estados. Tente novamente.");
  }
}

// Carregar municípios de um estado
async function loadMunicipios(estadoId, cidadeSelect) {
  try {
    cidadeSelect.disabled = true;
    cidadeSelect.innerHTML = '<option value="">Carregando...</option>';

    const response = await fetch(`/api/municipios/${estadoId}`);
    const municipios = await response.json();

    cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
    municipios.forEach((municipio) => {
      const option = document.createElement("option");
      option.value = municipio.nome;
      option.textContent = municipio.nome;
      cidadeSelect.appendChild(option);
    });

    cidadeSelect.disabled = false;
  } catch (error) {
    console.error("Erro ao carregar municípios:", error);
    cidadeSelect.innerHTML = '<option value="">Erro ao carregar</option>';
    showError("Erro ao carregar lista de cidades. Tente novamente.");
  }
}

// Calcular distância automaticamente
async function calculateDistance() {
  if (isManualDistance) {
    return; // Usuário optou por inserir manualmente
  }

  const origemCidade = origemCidadeSelect.value;
  const origemEstado =
    origemEstadoSelect.options[origemEstadoSelect.selectedIndex].textContent;
  const destinoCidade = destinoCidadeSelect.value;
  const destinoEstado =
    destinoEstadoSelect.options[destinoEstadoSelect.selectedIndex].textContent;

  if (!origemCidade || !destinoCidade) {
    return; // Ainda não selecionou todas as cidades
  }

  try {
    showLoading("Calculando distância...");

    const response = await fetch("/api/calculate-distance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origemCidade,
        origemEstado,
        destinoCidade,
        destinoEstado,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao calcular distância");
    }

    calculatedDistance = data.distance;
    distanceInput.value = data.distance;

    hideLoading();
  } catch (error) {
    console.error("Erro ao calcular distância:", error);
    hideLoading();
    showError(error.message + " Por favor, insira a distância manualmente.");

    // Habilitar modo manual
    manualDistanceCheckbox.checked = true;
    isManualDistance = true;
    distanceInput.readOnly = false;
    distanceInput.placeholder = "Digite a distância em km";
    distanceInput.required = true;
  }
}

// ========================================
// EVENT LISTENERS
// ========================================

// Quando selecionar estado de origem
if (origemEstadoSelect) {
  origemEstadoSelect.addEventListener("change", (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const estadoId = selectedOption.dataset.estadoId;

    if (estadoId) {
      loadMunicipios(estadoId, origemCidadeSelect);
    } else {
      origemCidadeSelect.innerHTML =
        '<option value="">Primeiro selecione o estado</option>';
      origemCidadeSelect.disabled = true;
    }

    // Limpar distância calculada
    if (!isManualDistance) {
      distanceInput.value = "";
      calculatedDistance = null;
    }
  });
}

// Quando selecionar estado de destino
if (destinoEstadoSelect) {
  destinoEstadoSelect.addEventListener("change", (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const estadoId = selectedOption.dataset.estadoId;

    if (estadoId) {
      loadMunicipios(estadoId, destinoCidadeSelect);
    } else {
      destinoCidadeSelect.innerHTML =
        '<option value="">Primeiro selecione o estado</option>';
      destinoCidadeSelect.disabled = true;
    }

    // Limpar distância calculada
    if (!isManualDistance) {
      distanceInput.value = "";
      calculatedDistance = null;
    }
  });
}

// Quando selecionar cidade de origem
if (origemCidadeSelect) {
  origemCidadeSelect.addEventListener("change", () => {
    calculateDistance();
  });
}

// Quando selecionar cidade de destino
if (destinoCidadeSelect) {
  destinoCidadeSelect.addEventListener("change", () => {
    calculateDistance();
  });
}

// Checkbox de distância manual
if (manualDistanceCheckbox) {
  manualDistanceCheckbox.addEventListener("change", (e) => {
    isManualDistance = e.target.checked;

    if (isManualDistance) {
      distanceInput.readOnly = false;
      distanceInput.placeholder = "Digite a distância em km";
      distanceInput.required = true;
      distanceInput.value = "";
    } else {
      distanceInput.readOnly = true;
      distanceInput.placeholder = "Calculada automaticamente";
      distanceInput.required = false;
      calculateDistance(); // Recalcular
    }
  });
}

// Controlar seleção de transporte
if (transportButtons.length > 0) {
  transportButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active de todos os botões
      transportButtons.forEach((btn) => btn.classList.remove("active"));

      // Adiciona active no botão clicado
      button.classList.add("active");

      // Armazena o transporte selecionado
      selectedTransport = button.dataset.transport;
      if (transportInput) {
        transportInput.value = selectedTransport;
      }

      // Remove erro se existir
      if (errorMessage && errorMessage.style.display === "block") {
        errorMessage.style.display = "none";
      }
    });
  });
}

// Submit do formulário
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validações
    if (!selectedTransport) {
      showError("Por favor, selecione um meio de transporte");
      return;
    }

    const origemCidade = origemCidadeSelect.value;
    const origemEstado = origemEstadoSelect.value;
    const destinoCidade = destinoCidadeSelect.value;
    const destinoEstado = destinoEstadoSelect.value;

    if (!origemCidade || !origemEstado || !destinoCidade || !destinoEstado) {
      showError("Por favor, selecione as cidades de origem e destino");
      return;
    }

    let distance = parseFloat(distanceInput.value);

    if (!distance || distance <= 0) {
      showError(
        "Por favor, aguarde o cálculo da distância ou insira-a manualmente",
      );
      return;
    }

    // Enviar para o backend
    try {
      showLoading("Calculando emissões de CO₂...");

      const response = await fetch("/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          distance,
          transport: selectedTransport,
          origemCidade,
          origemEstado:
            origemEstadoSelect.options[origemEstadoSelect.selectedIndex]
              .textContent,
          destinoCidade,
          destinoEstado:
            destinoEstadoSelect.options[destinoEstadoSelect.selectedIndex]
              .textContent,
        }),
      });

      const data = await response.json();

      hideLoading();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao calcular emissões");
      }

      // Mostrar resultado
      showResult({
        emission: data.selectedTransport.emission,
        distance: data.distance,
        origem: `${origemCidade} - ${origemEstado}`,
        destino: `${destinoCidade} - ${destinoEstado}`,
        transport: data.selectedTransport.type,
        selectedTransport: data.selectedTransport,
        carbonCredits: data.carbonCredits,
        comparison: data.comparison,
      });
    } catch (error) {
      hideLoading();
      console.error("Erro:", error);
      showError(error.message || "Erro ao calcular emissões. Tente novamente.");
    }
  });
}

// ========================================
// FUNÇÕES DE UI
// ========================================

function showLoading(message = "Carregando...") {
  if (errorMessage) {
    errorMessage.textContent = `⏳ ${message}`;
    errorMessage.style.display = "block";
    errorMessage.style.backgroundColor = "#2196F3";
    errorMessage.style.color = "white";
  }
}

function hideLoading() {
  if (errorMessage) {
    errorMessage.style.display = "none";
    errorMessage.style.backgroundColor = "";
    errorMessage.style.color = "";
  }
}

function showError(message) {
  if (!errorMessage || !resultsSection) return;

  errorMessage.textContent = `❌ ${message}`;
  errorMessage.style.display = "block";
  errorMessage.style.backgroundColor = "#f44336";
  errorMessage.style.color = "white";
  resultsSection.style.display = "none";

  // Scroll suave para o erro
  errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });

  // Esconder erro após 8 segundos
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 8000);
}

function showResult(data) {
  if (!errorMessage || !resultsSection) return;

  // Esconder mensagem de erro
  errorMessage.style.display = "none";

  // Preencher resultado
  const co2Result = document.getElementById("co2-result");
  const resultOrigem = document.getElementById("result-origem");
  const resultDestino = document.getElementById("result-destino");
  const resultDistance = document.getElementById("result-distance");
  const resultTransport = document.getElementById("result-transport");

  if (co2Result) co2Result.textContent = data.emission;
  if (resultOrigem) resultOrigem.textContent = data.origem;
  if (resultDestino) resultDestino.textContent = data.destino;
  if (resultDistance) resultDistance.textContent = data.distance;
  if (resultTransport)
    resultTransport.textContent = transportNames[data.transport];

  // Preencher créditos de carbono
  if (data.carbonCredits) {
    showCarbonCredits(data.carbonCredits);
  }

  // Preencher comparação entre meios de transporte
  if (data.comparison) {
    showComparison(data.comparison, data.transport);
  }

  // Mostrar seção de resultados
  resultsSection.style.display = "block";

  // Scroll suave para o resultado
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showCarbonCredits(carbonCredits) {
  const creditsAmount = document.getElementById("credits-amount");
  const creditsCost = document.getElementById("credits-cost");

  if (creditsAmount) {
    creditsAmount.textContent = carbonCredits.creditsNeeded;
  }

  if (creditsCost) {
    creditsCost.textContent = carbonCredits.totalCost.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}

function showComparison(comparison, selectedTransport) {
  const comparisonGrid = document.getElementById("comparison-grid");
  if (!comparisonGrid) return;

  // Limpar conteúdo anterior
  comparisonGrid.innerHTML = "";

  // comparison agora é um array
  if (!Array.isArray(comparison)) {
    console.error("Comparison deve ser um array");
    return;
  }

  // Criar cards para cada meio de transporte
  comparison.forEach((transportData) => {
    const isSelected = transportData.key === selectedTransport;

    const card = document.createElement("div");
    card.className = `comparison-item ${isSelected ? "selected" : ""}`;
    card.innerHTML = `
      <span class="icon">${transportData.icon}</span>
      <div class="transport-name">${transportData.type}</div>
      <div class="emission-value">${transportData.emission}</div>
      <span class="emission-unit">kg CO₂</span>
      ${isSelected ? '<div class="selected-badge">✓ Selecionado</div>' : ""}
    `;

    comparisonGrid.appendChild(card);
  });
}

// ========================================
// INICIALIZAÇÃO
// ========================================

// Carregar estados quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  loadEstados();
});
