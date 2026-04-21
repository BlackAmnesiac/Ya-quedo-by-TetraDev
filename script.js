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

// Menú hamburguesa para mobile (con aria-expanded para a11y)
hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
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

// ======== TRACKING DE EVENTOS (US-10: Google Analytics 4) ========
function trackEvent(eventName, payload) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, payload || {});
    }
    console.log('[track]', eventName, payload);
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

// ======== ROTACIÓN DE TESTIMONIOS (US-04) ========
// En móvil destaca un testimonio a la vez cada 5 segundos.
(function initTestimonialRotation() {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    const interval = parseInt(grid.dataset.rotate || '5000', 10);
    const items = grid.querySelectorAll('.testimonial');
    if (items.length < 2) return;
    let active = 0;
    items[0].classList.add('is-active');

    setInterval(() => {
        items[active].classList.remove('is-active');
        active = (active + 1) % items.length;
        items[active].classList.add('is-active');
    }, interval);
})();

// ======== FAQ ACCORDION (US-06) ========
// Abrir solo un item a la vez (mejora UX); <details> ya cubre el fallback sin JS.
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', () => {
        if (item.open) {
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) other.removeAttribute('open');
            });
            trackEvent('faq_open', { question: item.querySelector('summary')?.textContent?.trim() });
        }
    });
});

// ======== FORMULARIO DE PRE-REGISTRO (US-05, US-08) ========
(function initPreRegisterForm() {
    const form = document.getElementById('preRegisterForm');
    if (!form) return;
    const feedback = form.querySelector('#formFeedback');
    const userTypeInput = form.querySelector('#userType');
    const toggleButtons = form.querySelectorAll('.toggle-option');

    // Toggle cliente / trabajador — cambia el tipo que se envía al backend
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const type = btn.dataset.type;
            userTypeInput.value = type;
            document.body.classList.toggle('mode-trabajador', type === 'trabajador');
            trackEvent('pre_register_mode', { type });
        });
    });

    // Si alguien clickea el CTA "Soy trabajador" en la sección workers, preselecciona el toggle
    document.querySelectorAll('[data-user-type="trabajador"]').forEach(link => {
        link.addEventListener('click', () => {
            const trabajadorBtn = form.querySelector('[data-type="trabajador"]');
            if (trabajadorBtn) trabajadorBtn.click();
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        feedback.className = 'form-feedback';
        feedback.textContent = '';

        // Validación mínima
        const data = Object.fromEntries(new FormData(form).entries());
        const fields = form.querySelectorAll('.form-field');
        fields.forEach(f => f.classList.remove('invalid'));

        let valid = true;
        if (!data.fullName || data.fullName.trim().length < 3) { valid = false; markInvalid(form, 'fullName'); }
        if (!validateEmail(data.email || '')) { valid = false; markInvalid(form, 'email'); }
        if (!validatePhone(data.phone || '')) { valid = false; markInvalid(form, 'phone'); }
        if (!data.district) { valid = false; markInvalid(form, 'district'); }
        if (data.userType === 'trabajador' && !data.trade) { valid = false; markInvalid(form, 'trade'); }
        if (!form.querySelector('[name="consent"]').checked) {
            valid = false;
            feedback.classList.add('error');
            feedback.textContent = 'Debes aceptar los términos para continuar.';
            return;
        }

        if (!valid) {
            feedback.classList.add('error');
            feedback.textContent = 'Revisa los campos marcados en rojo.';
            return;
        }

        // Simulación de envío (backend aún no existe). En prod, POST a API + manejar 409 / 5xx.
        try {
            feedback.textContent = 'Enviando…';
            await new Promise(r => setTimeout(r, 600));
            trackEvent('pre_register_submit', { type: data.userType, district: data.district });
            feedback.classList.add('success');
            feedback.textContent = '¡Listo! Te avisaremos apenas abramos el registro.';
            form.reset();
            document.body.classList.remove('mode-trabajador');
            form.querySelector('[data-type="usuario"]').click();
        } catch (err) {
            feedback.classList.add('error');
            feedback.textContent = 'No pudimos enviar tu solicitud. Intenta nuevamente.';
        }
    });

    function markInvalid(form, name) {
        const field = form.querySelector(`[name="${name}"]`)?.closest('.form-field');
        if (field) field.classList.add('invalid');
    }
})();

// ======== INICIALIZACIÓN ========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ya Quedó - Landing page cargada exitosamente');

    // Animación inicial del hero
    setTimeout(() => {
        const hc = document.querySelector('.hero-content');
        if (hc) hc.classList.add('loaded');
    }, 100);

    trackEvent('page_view', { page: 'landing' });
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
