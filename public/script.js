// Elementos do DOM
const form = document.getElementById('emission-form');
const manualDistanceCheckbox = document.getElementById('manual-distance');
const distanceGroup = document.getElementById('distance-group');
const distanceInput = document.getElementById('distance');
const origemInput = document.getElementById('origem');
const destinoInput = document.getElementById('destino');
const transportButtons = document.querySelectorAll('.transport-btn');
const transportInput = document.getElementById('transport');
const errorMessage = document.getElementById('error-message');
const resultsSection = document.getElementById('results');

// Mapear valores para nomes amigáveis
const transportNames = {
    bike: '🚴 Bicicleta',
    car: '🚗 Carro',
    bus: '🚌 Ônibus',
    truck: '🚚 Caminhão'
};

// Variável para armazenar transporte selecionado
let selectedTransport = null;

// Controlar checkbox de distância manual
manualDistanceCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        distanceGroup.style.display = 'block';
        distanceInput.required = true;
    } else {
        distanceGroup.style.display = 'none';
        distanceInput.required = false;
        distanceInput.value = '';
    }
});

// Controlar seleção de transporte
transportButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active de todos os botões
        transportButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona active no botão clicado
        button.classList.add('active');
        
        // Armazena o transporte selecionado
        selectedTransport = button.dataset.transport;
        transportInput.value = selectedTransport;
        
        // Remove erro se existir
        if (errorMessage.style.display === 'block') {
            errorMessage.style.display = 'none';
        }
    });
});

// Função para exibir erro
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    resultsSection.style.display = 'none';
    
    // Scroll suave para o erro
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Esconder erro após 5 segundos
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Função para exibir resultado
function showResult(data) {
    // Esconder mensagem de erro
    errorMessage.style.display = 'none';
    
    // Preencher valores do resultado
    document.getElementById('co2-result').textContent = data.emission;
    document.getElementById('result-origem').textContent = data.origem;
    document.getElementById('result-destino').textContent = data.destino;
    document.getElementById('result-distance').textContent = data.distance;
    document.getElementById('result-transport').textContent = transportNames[data.transport];
    
    // Exibir seção de resultado
    resultsSection.style.display = 'block';
    
    // Scroll suave para o resultado
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Manipular envio do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Coletar dados do formulário
    const origem = origemInput.value.trim();
    const destino = destinoInput.value.trim();
    const distance = parseFloat(distanceInput.value);
    const transport = selectedTransport;
    
    // Validação no frontend
    if (!origem) {
        showError('Por favor, informe a cidade de origem');
        return;
    }
    
    if (!destino) {
        showError('Por favor, informe a cidade de destino');
        return;
    }
    
    if (!manualDistanceCheckbox.checked) {
        showError('Por favor, marque a opção "Inserir distância manualmente"');
        return;
    }
    
    if (!distance || distance <= 0) {
        showError('Por favor, informe uma distância válida maior que zero');
        return;
    }
    
    if (!transport) {
        showError('Por favor, selecione um meio de transporte');
        return;
    }
    
    // Desabilitar botão durante o envio
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Calculando...';
    submitButton.disabled = true;
    
    try {
        // Enviar requisição POST para /calculate
        const response = await fetch('http://localhost:3000/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                distance: distance,
                transport: transport
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Exibir resultado formatado em kg de CO₂
            showResult({
                emission: result.emission,
                origem: origem,
                destino: destino,
                distance: distance,
                transport: transport
            });
        } else {
            // Exibir mensagens de erro retornadas pela API
            showError(result.error || 'Erro ao calcular emissões. Tente novamente.');
        }
        
    } catch (error) {
        console.error('Erro na requisição:', error);
        showError('Erro de conexão com o servidor. Verifique se o servidor está rodando.');
    } finally {
        // Reabilitar botão
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

// Limpar mensagens de erro ao digitar
const inputs = [origemInput, destinoInput, distanceInput];
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (errorMessage.style.display === 'block') {
            errorMessage.style.display = 'none';
        }
    });
});
