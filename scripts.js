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