// Função para mostrar seções ao rolar a página com animação mais sofisticada
function revealSections() {
    const sections = document.querySelectorAll('.section');
    const animatedContents = document.querySelectorAll('.animated-content');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });

    animatedContents.forEach(content => {
        const contentTop = content.getBoundingClientRect().top;
        if (contentTop < windowHeight - 50) {
            content.classList.add('visible');
        }
    });
}

// Barra de progresso ao rolar com animação suave
function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Usando requestAnimationFrame para animação mais suave
    requestAnimationFrame(() => {
        document.getElementById('progressBar').style.width = scrollPercentage + '%';
    });
}

// Toggle para o menu mobile com animação
document.getElementById('mobileMenuBtn').addEventListener('click', function () {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');

    // Animar ícone do menu
    this.querySelector('i').classList.toggle('fa-bars');
    this.querySelector('i').classList.toggle('fa-times');
});

// Tabs interativas com animação
const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all tabs
        const tabContainer = this.closest('.tab-container');
        tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Hide all tab contents with fade-out effect
        tabContainer.querySelectorAll('.tab-content.active').forEach(content => {
            content.style.opacity = '0';
            setTimeout(() => {
                content.classList.remove('active');
            }, 200);
        });

        // Add active class to current tab
        this.classList.add('active');

        // Show the selected tab content with fade-in effect
        const tabId = this.getAttribute('data-tab');
        setTimeout(() => {
            const activeTab = document.getElementById(tabId);
            activeTab.classList.add('active');
            setTimeout(() => {
                activeTab.style.opacity = '1';
            }, 50);
        }, 250);
    });
});

// Link suave para âncoras com animação aprimorada
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Adicionar classe de destaque temporário
            const highlightSection = () => {
                targetElement.style.transition = 'box-shadow 0.5s';
                targetElement.style.boxShadow = '0 0 0 2px rgba(52, 152, 219, 0.5)';

                setTimeout(() => {
                    targetElement.style.boxShadow = 'none';
                }, 1000);
            };

            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });

            // Destaque após a rolagem
            setTimeout(highlightSection, 600);

            // Fechar menu mobile se estiver aberto
            document.getElementById('navLinks').classList.remove('active');

            // Restaurar ícone do menu
            const menuBtn = document.getElementById('mobileMenuBtn');
            menuBtn.querySelector('i').classList.add('fa-bars');
            menuBtn.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Inicializar funções ao carregar a página
window.addEventListener('load', function () {
    // Mostrar progressivamente as seções iniciais
    setTimeout(() => {
        revealSections();
        updateProgressBar();

        // Adicionar animação na entrada da página
        document.querySelector('header').style.animation = 'fadeIn 1s ease-in-out';
    }, 100);
});

// Atualizar ao rolar com throttling para performance
let scrollTimeout;
window.addEventListener('scroll', function () {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            revealSections();
            updateProgressBar();
            scrollTimeout = null;
        }, 10);
    }
});

// Removida interatividade do gráfico de esquecimento
// O gráfico agora é uma imagem estática

// Adicionar animação para cards quando entram no viewport
const animateCards = () => {
    const cards = document.querySelectorAll('.card');
    const windowHeight = window.innerHeight;

    cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight - 50) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
};

// Inicializar cards com estado inicial
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Adicionar animação de cards ao scroll
window.addEventListener('scroll', animateCards);
window.addEventListener('load', () => {
    setTimeout(animateCards, 500);
});

// Adicionar estilos de animação diretamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes bobUpDown {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(10px); }
    }
    
    .tab-content {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .tab-content.active {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Adicione este código ao final do arquivo scripts.js

// Funções para o plano de estudo de 100 dias
function initStudyPlanInteractivity() {
    const daySlider = document.getElementById('daySlider');
    const dayValue = document.getElementById('dayValue');
    const progressCircle = document.getElementById('progressCircle');
    const wordCount = document.getElementById('wordCount');
    
    if (!daySlider || !dayValue || !progressCircle || !wordCount) return;
    
    // Comprimento total da circunferência do círculo SVG
    const circumference = 2 * Math.PI * 120;
    
    // Atualiza o progresso visual quando o slider é movido
    daySlider.addEventListener('input', function() {
        const days = parseInt(this.value);
        
        // Atualizar texto de dias
        dayValue.textContent = days;
        
        // Calcular palavras aprendidas (10 por dia)
        const words = days * 10;
        wordCount.textContent = words;
        
        // Atualizar círculo de progresso
        const progress = days / 100;
        const dashoffset = circumference * (1 - progress);
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = dashoffset;
        
        // Atualizar marcos visuais
        updateMilestones(progress);
    });
    
    // Função para atualizar a visibilidade dos marcos de progresso
    function updateMilestones(progress) {
        const milestone25 = document.getElementById('milestone25');
        const milestone50 = document.getElementById('milestone50');
        const milestone75 = document.getElementById('milestone75');
        const milestone100 = document.getElementById('milestone100');
        
        if (!milestone25 || !milestone50 || !milestone75 || !milestone100) return;
        
        milestone25.style.opacity = progress >= 0.25 ? "1" : "0.4";
        milestone50.style.opacity = progress >= 0.5 ? "1" : "0.4";
        milestone75.style.opacity = progress >= 0.75 ? "1" : "0.4";
        milestone100.style.opacity = progress >= 1 ? "1" : "0.4";
    }
    
    // Adicionar interatividade ao cartão de palavra
    const wordCard = document.querySelector('.word-card');
    if (wordCard) {
        wordCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    }
    
    // Inicializar com valores zero
    daySlider.value = 0;
    dayValue.textContent = "0";
    wordCount.textContent = "0";
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
}

// Executar inicialização quando o documento estiver pronto
window.addEventListener('load', function() {
    // Inicializar interatividade do plano de estudo
    initStudyPlanInteractivity();
    
    // Isso mantém todas as outras funções que você já tem
    revealSections();
    updateProgressBar();
    animateCards();
    
    // Chamar a revelação da seção do plano de estudo também
    setTimeout(() => {
        const studyPlanSection = document.getElementById('study-plan');
        if (studyPlanSection) {
            studyPlanSection.classList.add('visible');
        }
    }, 300);
});

// Adicione este código ao seu arquivo JavaScript

// Inicialização e gerenciamento da calculadora de vocabulário
function initVocabularyCalculator() {
    const daysInput = document.getElementById('daysInput');
    const wordsPerDayInput = document.getElementById('wordsPerDayInput');
    const totalWordsResult = document.getElementById('totalWordsResult');
    const calculateBtn = document.getElementById('calculateBtn');
    const progressCircle = document.getElementById('calculatorProgress');
    const progressPercentage = document.getElementById('progressPercentage');
    
    // Referencias aos marcos de progresso
    const milestone250 = document.querySelector('#milestone250 .milestone-progress');
    const milestone500 = document.querySelector('#milestone500 .milestone-progress');
    const milestone1000 = document.querySelector('#milestone1000 .milestone-progress');
    const milestone2000 = document.querySelector('#milestone2000 .milestone-progress');
    
    // Verificar se os elementos foram encontrados
    if (!daysInput || !wordsPerDayInput || !totalWordsResult || !calculateBtn || 
        !progressCircle || !progressPercentage) {
        console.error('Elementos da calculadora não encontrados');
        return;
    }
    
    // Comprimento da circunferência do círculo SVG
    const circumference = 2 * Math.PI * 54;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
    
    // Função para calcular palavras e atualizar visuais
    function calculateVocabulary() {
        const days = parseInt(daysInput.value) || 0;
        const wordsPerDay = parseInt(wordsPerDayInput.value) || 0;
        const totalWords = days * wordsPerDay;
        
        // Atualizar o resultado
        totalWordsResult.textContent = totalWords.toLocaleString();
        
        // Calcular percentual para o gráfico circular (baseado em 2000 palavras como 100%)
        const maxWords = 2000;
        const percentage = Math.min(totalWords / maxWords * 100, 100);
        
        // Atualizar o círculo de progresso
        const dashoffset = circumference - (circumference * percentage / 100);
        progressCircle.style.strokeDashoffset = dashoffset;
        
        // Atualizar o texto de percentual
        progressPercentage.textContent = Math.round(percentage) + '%';
        
        // Atualizar barras de progresso dos marcos
        updateMilestones(totalWords);
        
        // Animação de destaque nos resultados
        totalWordsResult.classList.add('highlight');
        setTimeout(() => {
            totalWordsResult.classList.remove('highlight');
        }, 500);
    }
    
    // Atualizar barras de progresso dos marcos
    function updateMilestones(totalWords) {
        if (!milestone250 || !milestone500 || !milestone1000 || !milestone2000) return;
        
        // Calcular percentagens para cada marco
        const progress250 = Math.min(totalWords / 250 * 100, 100);
        const progress500 = Math.min(totalWords / 500 * 100, 100);
        const progress1000 = Math.min(totalWords / 1000 * 100, 100);
        const progress2000 = Math.min(totalWords / 2000 * 100, 100);
        
        // Aplicar as percentagens às barras de progresso com animação
        milestone250.style.width = progress250 + '%';
        milestone500.style.width = progress500 + '%';
        milestone1000.style.width = progress1000 + '%';
        milestone2000.style.width = progress2000 + '%';
    }
    
    // Evento de clique no botão de calcular
    calculateBtn.addEventListener('click', calculateVocabulary);
    
    // Eventos de tecla Enter nos inputs
    daysInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            calculateVocabulary();
        }
    });
    
    wordsPerDayInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            calculateVocabulary();
        }
    });
    
    // Configurar limites de input
    daysInput.addEventListener('change', function() {
        if (this.value < 0) this.value = 0;
        if (this.value > 365) this.value = 365;
    });
    
    wordsPerDayInput.addEventListener('change', function() {
        if (this.value < 1) this.value = 1;
        if (this.value > 50) this.value = 50;
    });
    
    // Inicializar a calculadora com os valores padrão
    calculateVocabulary();
    
    // Adicionar a classe para estilo de destaque (inclua isso em seu CSS)
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            animation: pulse 0.5s ease-out;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); color: var(--accent); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Adicionar à inicialização da página
window.addEventListener('load', function() {
    // Inicializar calculadora de vocabulário
    initVocabularyCalculator();
    
    // Manter outras inicializações existentes
    if (typeof initStudyPlanInteractivity === 'function') {
        initStudyPlanInteractivity();
    }
    
    if (typeof revealSections === 'function') {
        revealSections();
    }
    
    if (typeof updateProgressBar === 'function') {
        updateProgressBar();
    }
    
    if (typeof animateCards === 'function') {
        animateCards();
    }
});