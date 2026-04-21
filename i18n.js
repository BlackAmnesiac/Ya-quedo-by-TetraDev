/**
 * i18n.js — Internationalization para Ya Quedó
 * Soporta español (es-419) e inglés (en-US). La selección persiste en localStorage.
 * Cada elemento traducible lleva `data-i18n="clave"`; elementos que traducen atributos
 * usan `data-i18n="clave" data-i18n-attr="content|placeholder|aria-label"`.
 */

const translations = {
    'es-419': {
        'meta.title': 'Ya Quedó · Encuentra servicios locales al instante',
        'meta.description': 'Marketplace de servicios locales hipersegmentado. Conecta clientes con trabajadores independientes de confianza en el Perú.',
        'a11y.skip': 'Saltar al contenido principal',
        'nav.home': 'Inicio',
        'nav.services': 'Servicios',
        'nav.howItWorks': 'Cómo funciona',
        'nav.workers': 'Trabajadores',
        'nav.faq': 'FAQ',
        'nav.login': 'Iniciar sesión',
        'nav.register': 'Registrarse',
        'hero.title': 'Encuentra el servicio que necesitas, al instante',
        'hero.subtitle': 'Conectamos personas con trabajadores independientes de confianza en el Perú. Rápido, seguro y transparente.',
        'hero.ctaSearch': 'Buscar servicio',
        'hero.ctaOffer': 'Ofrecer mis servicios',
        'problem.title': 'El desafío que enfrentamos',
        'problem.subtitle': 'La informalidad laboral en el Perú afecta a millones de trabajadores y clientes',
        'solution.eyebrow': 'La solución: Ya Quedó',
        'solution.title': 'Transformando la forma de conectar servicios locales',
        'how.title': 'Así de fácil funciona',
        'how.subtitle': 'En solo 4 pasos simples puedes encontrar o ofrecer servicios',
        'services.title': 'Servicios disponibles',
        'services.subtitle': 'Más de 6 categorías iniciales para resolver lo que necesites en casa',
        'benefits.title': 'Beneficios para todos',
        'benefits.subtitle': 'Diseñado pensando tanto en clientes como en trabajadores',
        'features.title': 'Características que nos hacen únicos',
        'features.subtitle': 'Tecnología de punta al servicio de la comunidad',
        'workers.eyebrow': 'Para trabajadores independientes',
        'workers.title': 'Más clientes, pagos seguros y reputación que crece contigo',
        'impact.title': 'Impacto social real',
        'testimonials.title': 'Lo que dicen nuestros usuarios',
        'testimonials.subtitle': 'Historias reales de transformación y éxito',
        'faq.title': 'Preguntas frecuentes',
        'faq.subtitle': 'Resolvemos las dudas más comunes antes de que empieces a usar Ya Quedó',
        'form.title': 'Déjanos tus datos y te avisamos cuando abramos el registro',
        'form.subtitle': 'Serás de los primeros en acceder y recibirás un beneficio exclusivo de lanzamiento.',
        'footer.legal': 'Legal',
        'footer.terms': 'Términos y condiciones',
        'footer.privacy': 'Política de privacidad',
        'footer.cookies': 'Política de cookies',
        'footer.complaints': 'Libro de reclamaciones',
    },
    'en-US': {
        'meta.title': 'Ya Quedó · Find local services instantly',
        'meta.description': 'Hyper-segmented local services marketplace. Connects customers with trusted independent workers in Peru.',
        'a11y.skip': 'Skip to main content',
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.howItWorks': 'How it works',
        'nav.workers': 'Workers',
        'nav.faq': 'FAQ',
        'nav.login': 'Log in',
        'nav.register': 'Sign up',
        'hero.title': 'Find the service you need, instantly',
        'hero.subtitle': 'We connect people with trusted independent workers across Peru. Fast, safe and transparent.',
        'hero.ctaSearch': 'Find a service',
        'hero.ctaOffer': 'Offer my services',
        'problem.title': 'The challenge we face',
        'problem.subtitle': 'Labor informality in Peru affects millions of workers and customers',
        'solution.eyebrow': 'The solution: Ya Quedó',
        'solution.title': 'Transforming how local services connect',
        'how.title': 'This is how easy it works',
        'how.subtitle': 'In just 4 simple steps you can find or offer services',
        'services.title': 'Available services',
        'services.subtitle': 'More than 6 starter categories to solve anything you need at home',
        'benefits.title': 'Benefits for everyone',
        'benefits.subtitle': 'Designed with both customers and workers in mind',
        'features.title': 'Features that make us unique',
        'features.subtitle': 'Cutting-edge technology serving the community',
        'workers.eyebrow': 'For independent workers',
        'workers.title': 'More clients, secure payments and a reputation that grows with you',
        'impact.title': 'Real social impact',
        'testimonials.title': 'What our users say',
        'testimonials.subtitle': 'Real stories of transformation and success',
        'faq.title': 'Frequently asked questions',
        'faq.subtitle': 'We solve the most common doubts before you start using Ya Quedó',
        'form.title': 'Leave us your details and we will let you know when registration opens',
        'form.subtitle': 'You will be among the first to access and receive an exclusive launch benefit.',
        'footer.legal': 'Legal',
        'footer.terms': 'Terms and conditions',
        'footer.privacy': 'Privacy policy',
        'footer.cookies': 'Cookie policy',
        'footer.complaints': 'Complaints book',
    }
};

const STORAGE_KEY = 'yq:lang';
const DEFAULT_LANG = 'es-419';

function getSavedLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
    const browser = (navigator.language || '').toLowerCase();
    if (browser.startsWith('en')) return 'en-US';
    return DEFAULT_LANG;
}

function applyLanguage(lang) {
    if (!translations[lang]) lang = DEFAULT_LANG;
    const dict = translations[lang];

    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const attr = el.dataset.i18nAttr;
        const value = dict[key];
        if (!value) return;
        if (attr) {
            el.setAttribute(attr, value);
        } else {
            el.textContent = value;
        }
    });

    // Actualiza el estado del switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isActive = (btn.dataset.lang === 'es' && lang === 'es-419')
                      || (btn.dataset.lang === 'en' && lang === 'en-US');
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Trackear cambio de idioma (GA4)
    if (typeof gtag === 'function') {
        gtag('event', 'language_change', { language: lang });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(getSavedLang());

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang === 'en' ? 'en-US' : 'es-419';
            applyLanguage(lang);
        });
    });
});
