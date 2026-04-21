// ======== VARIABLES GLOBALES ========
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const fadeElements = document.querySelectorAll('.fade-in');

// ======== NAVBAR INTERACTIVO ========
// Cambiar estilo del navbar al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menú hamburguesa para mobile
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ======== SMOOTH SCROLL ========
// Scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Ajuste para navbar fijo
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ======== ANIMACIONES AL SCROLL ========
// Observer para animaciones fade-in
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animación escalonada para elementos en grid
            const parent = entry.target.closest('.problem-grid, .steps, .features-grid, .testimonials-grid');
            if (parent) {
                const siblings = parent.querySelectorAll('.fade-in');
                const index = Array.from(siblings).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observar todos los elementos con clase fade-in
fadeElements.forEach(element => {
    observer.observe(element);
});

// ======== INTERACCIONES ADICIONALES ========
// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});

// Animación de contador para estadísticas
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Formatear según el tipo de número
        if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (element.textContent.includes('M+')) {
            element.textContent = (current / 1000000).toFixed(1) + 'M+';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Iniciar contadores cuando la sección de impacto es visible
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number');
            stats[0] && animateCounter(stats[0], 60);
            stats[1] && animateCounter(stats[1], 2000000);
            stats[2] && animateCounter(stats[2], 15);
            stats[3] && animateCounter(stats[3], 98);
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const impactSection = document.querySelector('.impact-content');
if (impactSection) {
    impactObserver.observe(impactSection);
}

// ======== VALIDACIÓN DE FORMULARIO (si se agrega) ========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[\d\s\-()]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ======== EFECTOS HOAVY EN BOTONES ========
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    // Efecto de onda al hacer click
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ======== TRACKING DE EVENTOS (para analytics futuro) ========
function trackEvent(eventName, element) {
    console.log('Event tracked:', eventName, element);
    // Aquí se integraría con Google Analytics u otro servicio
}

// Trackear clicks en botones CTA
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('cta_click', buttonText);
    });
});

// ======== OPTIMIZACIÓN DE RENDIMIENTO ========
// Lazy loading para imágenes (si se agregan en el futuro)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ======== INICIALIZACIÓN ========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ya Quedó - Landing page cargada exitosamente');
    
    // Animación inicial del hero
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('loaded');
    }, 100);
});

// ======== MANEJO DE ERRORES ========
window.addEventListener('error', (e) => {
    console.error('Error en la landing page:', e.error);
    // Aquí se podría enviar a un servicio de monitoreo
});

// ======== ACCESIBILIDAD ========
// Navegación por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Cerrar menú móvil si está abierto
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Asegurar que los enlaces sean accesibles
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
        }
    });
});
