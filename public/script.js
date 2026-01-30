// URL da API (ajuste se necessário)
const API_URL = "http://localhost:3000/api";

// Elementos do DOM
const form = document.getElementById("emission-form");
const manualDistanceCheckbox = document.getElementById("manual-distance");
const distanceGroup = document.getElementById("distance-group");
const distanceInput = document.getElementById("distancia");
const errorMessage = document.getElementById("error-message");
const resultsSection = document.getElementById("results");

// Mapear valores para nomes amigáveis
const transporteNomes = {
  bicicleta: "🚴 Bicicleta",
  carro: "🚗 Carro",
  onibus: "🚌 Ônibus",
  caminhao: "🚚 Caminhão",
};

// Controlar exibição do campo de distância
manualDistanceCheckbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    distanceGroup.style.display = "block";
    distanceInput.required = true;
  } else {
    distanceGroup.style.display = "none";
    distanceInput.required = false;
    distanceInput.value = "";
  }
});

// Inicialmente esconder o campo de distância
distanceGroup.style.display = "none";
distanceInput.required = false;

// Função para exibir erro
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  resultsSection.style.display = "none";

  // Scroll suave para o erro
  errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });

  // Esconder erro após 5 segundos
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 5000);
}

// Função para exibir resultado
function showResult(data) {
  // Esconder mensagem de erro
  errorMessage.style.display = "none";

  // Preencher informações da viagem
  document.getElementById("result-origem").textContent = data.origem;
  document.getElementById("result-destino").textContent = data.destino;
  document.getElementById("result-distancia").textContent = data.distancia;
  document.getElementById("result-transporte").textContent =
    transporteNomes[data.transporte] || data.transporte;

  // Preencher resultado de emissão
  document.getElementById("co2-result").textContent = data.emissaoCO2;
  document.getElementById("emission-message").textContent = data.mensagem;

  // Exibir informação sobre árvores se não for bicicleta
  const treesInfo = document.getElementById("trees-info");
  if (data.transporte === "bicicleta" || data.emissaoCO2 === 0) {
    treesInfo.style.display = "none";
  } else {
    document.getElementById("trees-equivalent").textContent =
      data.arvoresNecessarias;
    treesInfo.style.display = "block";
  }

  // Exibir seção de resultados
  resultsSection.style.display = "block";

  // Scroll suave para o resultado
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Manipular envio do formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Coletar dados do formulário
  const formData = {
    origem: document.getElementById("origem").value.trim(),
    destino: document.getElementById("destino").value.trim(),
    distancia: parseFloat(document.getElementById("distancia").value) || 0,
    transporte: document.getElementById("transporte").value,
  };

  // Validação no frontend
  if (!formData.origem) {
    showError("Por favor, informe a cidade de origem");
    return;
  }

  if (!formData.destino) {
    showError("Por favor, informe a cidade de destino");
    return;
  }

  if (
    !manualDistanceCheckbox.checked ||
    !formData.distancia ||
    formData.distancia <= 0
  ) {
    showError("Por favor, marque a opção e informe uma distância válida");
    return;
  }

  if (!formData.transporte) {
    showError("Por favor, selecione um meio de transporte");
    return;
  }

  // Desabilitar botão durante o envio
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Calculando...";
  submitButton.disabled = true;

  try {
    // Enviar requisição para a API
    const response = await fetch(`${API_URL}/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Exibir resultado
      showResult(result.data);
    } else {
      // Exibir erro da API
      showError(result.error || "Erro ao calcular emissões. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    showError(
      "Erro de conexão com o servidor. Verifique se o servidor está rodando.",
    );
  } finally {
    // Reabilitar botão
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  }
});

// Limpar mensagens de erro ao digitar
const inputs = form.querySelectorAll("input, select");
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (errorMessage.style.display === "block") {
      errorMessage.style.display = "none";
    }
  });
});
