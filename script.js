// Gerenciamento de Saldo
let balance = 0.00;

function updateBalanceDisplay() {
    document.getElementById('balance-display').innerText = `MT ${balance.toFixed(2)}`;
}

// Sistema de Navegação
function navigate(page, element) {
    const homeView = document.getElementById('home-view');
    const emptyView = document.getElementById('empty-view');
    
    // Atualizar UI do Menu
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    if(element) element.classList.add('active');

    // Lógica de Troca de Tela
    if (page === 'home') {
        homeView.classList.add('active');
        emptyView.classList.remove('active');
        emptyView.style.display = 'none';
        homeView.style.display = 'block';
    } else {
        homeView.classList.remove('active');
        homeView.style.display = 'none';
        emptyView.classList.add('active');
        emptyView.style.display = 'flex'; // Centraliza o estado vazio
    }
}

// Simulação de abertura de jogo
function openGame(gameType) {
    alert(`Iniciando o jogo: ${gameType.toUpperCase()}\nPrepare-se para ganhar!`);
    
    // Simulação: Ganha 0.50 centavos só de clicar (apenas para exemplo)
    balance += 0.50;
    updateBalanceDisplay();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateBalanceDisplay();
});


document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker-content');
    const winnersCount = 12;

    for (let i = 0; i < winnersCount; i++) {
        const randomPhone = Math.floor(1000 + Math.random() * 9000);
        const randomMtn = (Math.random() * (10 - 1) + 1).toFixed(4); // Gera entre 1 e 10
        
        const item = document.createElement('div');
        item.className = 'winner-item';
        item.innerHTML = `
            <i class="fi fi-rr-check-circle"></i>
            <span>Usuário +258857*****${randomPhone} recebeu </span>
            <span class="winner-amount">${randomMtn} Mtn</span>
        `;
        ticker.appendChild(item);
    }

    // Duplicar conteúdo para o scroll ser infinito e sem cortes
    const clone = ticker.innerHTML;
    ticker.innerHTML += clone;
});


//mostrar

function updateBalanceDisplay() {
    const val = `MT ${balance.toFixed(2)}`;
    document.getElementById('balance-display').innerText = val;
    // Se a view da carteira existir, atualiza lá também
    if(document.getElementById('wallet-balance')) {
        document.getElementById('wallet-balance').innerText = val;
        document.getElementById('asset-mtn').innerText = balance.toFixed(2);
    }
}

function navigate(page, element) {
    const views = document.querySelectorAll('.view');
    views.forEach(v => v.classList.remove('active'));

    // 1. Atualizar URL no Navegador
    const urlPath = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({page: page}, '', urlPath);

    // 2. Trocar de Tela
    const targetView = document.getElementById(`${page}-view`);
    if(targetView) {
        targetView.classList.add('active');
    } else {
        document.getElementById('empty-view').classList.add('active');
    }

    // 3. UI do Menu
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    if(element) element.classList.add('active');
}

// Lógica para quando o usuário clicar no botão "Voltar" do navegador
window.onpopstate = function(event) {
    if(event.state && event.state.page) {
        navigate(event.state.page);
    }
};
