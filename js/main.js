// --- TRANSIÇÃO SUAVE AO CARREGAR A PÁGINA ---
window.addEventListener('load', () => {
    const body = document.querySelector('body');
    gsap.to(body, {
        duration: 0.8,
        opacity: 1,
        ease: 'power2.inOut'
    });
});

// --- SCRIPT DO FUNDO AURORA SUTIL ---
const canvas = document.getElementById('aurora-canvas');
const ctx = canvas.getContext('2d');
let blobs = [];
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

class Blob {
    constructor(color, x, y, radius) {
        this.originX = x;
        this.originY = y;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    update() {
        const springFactor = 0.04;
        let targetX = this.originX;
        let targetY = this.originY;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 250;

        if (dist < interactionRadius) {
            const force = (interactionRadius - dist) / interactionRadius;
            const forceX = (dx / dist) * force * 25;
            const forceY = (dy / dist) * force * 25;
            targetX += forceX;
            targetY += forceY;
        }

        this.x += (targetX - this.x) * springFactor;
        this.y += (targetY - this.y) * springFactor;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initAurora() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    blobs = [
        new Blob('rgba(59, 130, 246, 0.5)', canvas.width * 0.2, canvas.height * 0.3, 250),
        new Blob('rgba(91, 33, 182, 0.5)', canvas.width * 0.8, canvas.height * 0.2, 300),
        new Blob('rgba(129, 28, 152, 0.4)', canvas.width * 0.7, canvas.height * 0.8, 280),
        new Blob('rgba(30, 64, 175, 0.4)', canvas.width * 0.3, canvas.height * 0.7, 220)
    ];
}

function animateAurora() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const blob of blobs) {
        blob.update();
        blob.draw();
    }
    requestAnimationFrame(animateAurora);
}

initAurora();
animateAurora();
window.addEventListener('resize', initAurora);

// --- SCRIPT DO PRELOADER MELHORADO ---
const preloader = document.getElementById('preloader');
const preloaderTitle = document.getElementById('preloader-title');
const preloaderUnderline = document.getElementById('preloader-underline');

function setupPreloaderAnimation() {
    preloaderTitle.style.visibility = 'visible';
    const text = preloaderTitle.textContent;
    preloaderTitle.textContent = '';

    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        preloaderTitle.appendChild(span);
    });

    const tl = gsap.timeline();

    tl.fromTo(".preloader-title span", {
        autoAlpha: 0,
        y: 40,
        rotationX: -90,
        filter: 'blur(8px)'
    }, {
        duration: 1.2,
        autoAlpha: 1,
        y: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.2
    });

    tl.to(preloaderUnderline, {
        duration: 0.8,
        scaleX: 1,
        ease: "power2.out"
    }, "-=0.6");

    tl.to(preloader, {
        duration: 1.0,
        opacity: 0,
        ease: 'power2.inOut',
        delay: 0.5,
        onComplete: () => {
            preloader.style.display = 'none';
        }
    });
}

if (sessionStorage.getItem('preloaderShown') === 'true') {
    preloader.style.display = 'none';
} else {
    window.addEventListener('load', setupPreloaderAnimation);
    sessionStorage.setItem('preloaderShown', 'true');
}

// --- ANIMAÇÃO AO ROLAR ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- FORMULÁRIO DE CONTATO ---
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const submitText = submitBtn.querySelector('.submit-text');
const successMessage = document.getElementById('form-success-message');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitText.textContent = 'A enviar...';
    setTimeout(() => {
        form.reset();
        successMessage.classList.remove('hidden');
        submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        submitBtn.classList.add('bg-green-600');
        submitText.textContent = 'Enviado!';
        setTimeout(() => {
            successMessage.classList.add('hidden');
            submitBtn.disabled = false;
            submitBtn.classList.remove('bg-green-600');
            submitBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
            submitText.textContent = 'Enviar Mensagem';
        }, 4000);
    }, 1500);
});

// --- EFEITO DE VIDRO NO HEADER ---
const header = document.querySelector('header');
window.addEventListener('scroll', () => { header.classList.toggle('header-scrolled', window.scrollY > 50); });

// --- DADOS DO PORTFÓLIO (EXPORTADOS PARA A GALERIA) ---
export const allCertificates = [
    { title: 'Formação .NET Developer', institution: 'Digital Innovation One (DIO)', image: 'https://i.ibb.co/gb70xyVm/Captura-de-tela-18-7-2025-234143.jpg', link: '#', tags: ['.NET', 'C#', 'SQL', 'AWS'], detailsTarget: 'net-details-page' },
    { title: 'Arquiteto de Soluções AWS', institution: 'Digital Innovation One (DIO)', image: 'https://placehold.co/1920x1080/111111/60a5fa?text=Certificado+AWS', link: '#', tags: ['AWS', 'Cloud'] },
    { title: 'JavaScript Moderno (ES6+)', institution: 'Udemy', image: 'https://placehold.co/1920x1080/111111/60a5fa?text=Certificado+JS', link: '#', tags: ['JavaScript', 'HTML'] },
    { title: 'Docker para Desenvolvedores', institution: 'Alura', image: 'https://placehold.co/1920x1080/111111/60a5fa?text=Certificado+Docker', link: '#', tags: ['Docker', 'DevOps'] },
];

export const allProjects = [
    { title: 'Sistema de Estacionamento', description: 'Sistema de console em C# para gerenciar a entrada, saída e cobrança de veículos.', video: 'https://placehold.co/600x400/000/fff?text=Estacionamento', link: 'https://github.com/tarxdev/sistema-estacionamento-csharp.git', tags: ['C#', '.NET'] },
    { title: 'Sistema de Hospedagem', description: 'Modelo de classes em C# para um sistema de hotel, com lógica para cálculo de diárias.', video: 'https://placehold.co/600x400/000/fff?text=Hospedagem', link: 'https://github.com/tarxdev/sistema-hospedagem-csharp.git', tags: ['C#', 'POO'] },
    { title: 'Modelagem de Celular (POO)', description: 'Demonstração de POO (Herança, Polimorfismo) para modelar diferentes marcas de celulares em C#.', video: 'https://placehold.co/600x400/000/fff?text=Celular+POO', link: 'https://github.com/tarxdev/sistema-celular-oop-csharp.git', tags: ['C#', 'POO'] },
    { title: 'Site com Docker e Apache', description: 'Uso de Docker Compose para servir um site estático com um container do servidor Apache.', video: 'https://placehold.co/600x400/000/fff?text=Docker', link: 'https://github.com/tarxdev/desafio-docker-compose-apache.git', tags: ['Docker', 'DevOps'] },
    { title: 'Desafio SQL com Node.js', description: 'Script Node.js que cria, popula e executa consultas analíticas em um banco de dados SQLite.', video: 'https://placehold.co/600x400/000/fff?text=SQL', link: 'https://github.com/tarxdev/desafio-sql-com-nodejs.git', tags: ['Node.js', 'SQL'] },
    { title: 'Desafio de Testes Manuais (QA)', description: 'Documentação de um ciclo de testes, incluindo plano, casos de teste e simulação de ticket Jira.', video: 'https://placehold.co/600x400/000/fff?text=QA', link: 'https://github.com/tarxdev/desafio-qa-testes-manuais.git', tags: ['QA', 'Processos'] }
];

export const allArticles = [
    { title: 'Do Sertanejo ao Funk: Decifrando o DNA do Hit Brasileiro com Python e Análise de Dados', publication: 'Python', image: 'https://i.ibb.co/xSXRP8GQ/artigo-1.png', link: 'https://web.dio.me/articles/python-na-minha-jornada-como-essa-linguagem-mudou-meu-jeito-de-programar-pythonnadio-8d0257e84c6e?back=/articles', tags: ['Python', 'Análise de Dados'], winner: true, podiumLink: 'https://web.dio.me/articles/o-resultado-da-32a-competicao-de-artigos-chegou-72ea358371aa?back=/home' },
    { title: 'Introdução ao Docker: Um Guia Prático', publication: 'Dev.to', image: 'https://placehold.co/600x400/1e293b/94a3b8?text=Artigo+Docker', link: '#', tags: ['Docker', 'DevOps'] },
    { title: 'Dominando o async/await em JavaScript', publication: 'Medium', image: 'https://placehold.co/600x400/1e293b/94a3b8?text=Artigo+JS', link: '#', tags: ['JavaScript'] },
];

// --- FUNÇÕES DE NAVEGAÇÃO (MOVEMOS PARA FORA PARA PODER EXPORTAR) ---
function handleVisualTransition(targetId) {
    const activePage = document.querySelector('.page-content.active');
    const pageFooter = document.getElementById('page-footer');
    const backButton = document.getElementById('back-button');
    const homeNavControls = document.getElementById('home-nav-controls');
    
    gsap.to(activePage, {
        opacity: 0, 
        duration: 0.4, 
        onComplete: () => {
            if(activePage) {
               activePage.classList.add('hidden');
               activePage.classList.remove('active');
            }
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.remove('hidden');
                targetPage.classList.add('active');
                gsap.fromTo(targetPage, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, delay: 0.1});
            }
            if (targetId !== 'home-page') {
                backButton.classList.remove('hidden');
                homeNavControls.classList.add('hidden');
            } else {
                backButton.classList.add('hidden');
                homeNavControls.classList.remove('hidden');
            }
            pageFooter.classList.toggle('hidden', targetId !== 'home-page');
            window.scrollTo(0, 0);
        }
    });
}

export function navigateTo(targetId) {
    const pageName = targetId.replace('-page', '');
    const path = pageName === 'home' ? window.location.pathname : `#${pageName}`;
    if (window.location.hash !== `#${pageName}` || (pageName === 'home' && window.location.hash)) {
        history.pushState({ page: targetId }, '', path);
    }
    handleVisualTransition(targetId);
}

// --- LÓGICA DE MENU E EVENTOS ---
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    const menuOverlay = document.getElementById('menu-overlay');
    const body = document.body;
    const backButton = document.getElementById('back-button');
    const navBrand = document.getElementById('nav-brand');
    const pages = document.querySelectorAll('.page-content');
    const homePage = document.getElementById('home-page');
    const netProjectsGrid = document.getElementById('net-projects-grid');

    function toggleMenu(callback) {
        const isMenuOpen = hamburgerBtn.classList.contains('is-active');
        const tl = gsap.timeline({
            defaults: { ease: 'power3.inOut' },
            onComplete: () => { if (callback && typeof callback === 'function') { callback(); } }
        });

        if (isMenuOpen) {
            tl.to('.mobile-nav-link', { opacity: 0, x: 30, duration: 0.3, stagger: 0.05 })
            .to(mainNav, { x: '100%', duration: 0.4 }, "-=0.2")
            .to(menuOverlay, { opacity: 0, duration: 0.4 }, "<")
            .call(() => {
                mainNav.classList.add('translate-x-full');
                gsap.set(mainNav, { clearProps: 'transform' });
                menuOverlay.classList.add('pointer-events-none');
                hamburgerBtn.classList.remove('is-active');
                body.classList.remove('menu-open');
            });
        } else {
            body.classList.add('menu-open');
            hamburgerBtn.classList.add('is-active');
            mainNav.classList.remove('translate-x-full');
            menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
            
            tl.to(menuOverlay, { opacity: 1, duration: 0.4 })
            .fromTo(mainNav, { x: '100%' }, { x: '0%', duration: 0.4 }, "<")
            .to('.mobile-nav-link', { opacity: 1, x: 0, duration: 0.4, stagger: 0.08 });
        }
    }

    hamburgerBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
    menuOverlay.addEventListener('click', () => toggleMenu());

    document.querySelectorAll('.nav-link, .nav-link-scroll').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const isMobileClick = window.innerWidth < 768 && mainNav.contains(link);
            const navigateAction = () => {
                if (link.dataset.target) {
                    navigateTo(link.dataset.target);
                } else if (link.getAttribute('href').startsWith('#')) {
                    const targetElement = document.querySelector(link.getAttribute('href'));
                    if (targetElement) {
                        if (homePage.classList.contains('active')) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            navigateTo('home-page');
                            setTimeout(() => { targetElement.scrollIntoView({ behavior: 'smooth' }); }, 600);
                        }
                    }
                }
            };
            if (isMobileClick && hamburgerBtn.classList.contains('is-active')) {
                toggleMenu(navigateAction);
            } else { navigateAction(); }
        });
    });

    backButton.addEventListener('click', (e) => { e.preventDefault(); history.back(); });
    navBrand.addEventListener('click', (e) => { e.preventDefault(); if(!homePage.classList.contains('active')) { navigateTo('home-page'); } });
    window.addEventListener('popstate', (event) => { const hash = window.location.hash.substring(1); const targetId = hash ? `${hash}-page` : 'home-page'; handleVisualTransition(targetId); });
    
    // Lógica de inicialização da página
    const initialHash = window.location.hash.substring(1);
    const initialTargetId = initialHash ? `${initialHash}-page` : 'home-page';
    pages.forEach(p => { p.classList.add('hidden'); p.classList.remove('active'); });
    const initialPage = document.getElementById(initialTargetId);
    if (initialPage) {
        initialPage.classList.remove('hidden');
        initialPage.classList.add('active');
        handleVisualTransition(initialTargetId); // Força a transição visual correta no carregamento
    }
        
    // Função para gerar cards de projetos, usada na página de detalhes do certificado
    function generateProjectCards(items, gridElement) {
        if (!gridElement) return;
        gridElement.innerHTML = items.map(item => `
            <div class="card-base rounded-lg">
                <div class="aspect-video w-full overflow-hidden rounded-t-lg bg-black">
                   <video class="w-full h-48 object-cover" autoplay loop muted playsinline poster="${item.video}"></video> 
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold">${item.title}</h3>
                    <p class="text-gray-400 mt-2 flex-grow">${item.description}</p>
                    <div class="mt-4 flex flex-wrap gap-2">${item.tags.map(tag => `<span class="tech-tag text-xs px-2 py-1 rounded-full">${tag}</span>`).join('')}</div>
                    <a href="${item.link}" target="_blank" class="mt-6 font-bold text-blue-400 group">
                        Ver no GitHub <span class="inline-block transition-transform group-hover:translate-x-2">→</span>
                    </a>
                </div>
            </div>`).join('');
    }

    // Popula a grade de projetos relacionados na página de detalhes do certificado .NET
    if (netProjectsGrid) {
        generateProjectCards(allProjects.filter(p => p.tags.includes('.NET') || p.tags.includes('C#')), netProjectsGrid);
    }
});
let cursorEffectLoaded = false;

function loadCursorEffect() {
    if (window.innerWidth >= 768 && !cursorEffectLoaded) {
        import('./fluidcursor.js')
            .then(() => {
                cursorEffectLoaded = true;
                console.log("Efeito de cursor ativado no desktop.");
            })
            .catch(err => console.error("Erro ao carregar fluidcursor.js:", err));
    } else if (window.innerWidth < 768 && cursorEffectLoaded) {
        // Aqui você pode remover o efeito, se necessário
        cursorEffectLoaded = false;
        console.log("Efeito de cursor desativado no mobile.");
    }
}

window.addEventListener('resize', loadCursorEffect);
loadCursorEffect();
