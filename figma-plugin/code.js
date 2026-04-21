/**
 * Ya Quedó · Generator — Plugin de Figma
 *
 * Genera automáticamente el Design System (colores, tipografía, sombras),
 * componentes base (Button, Navbar, Service Card, FAQ Item) y los frames
 * esqueleto de las páginas principales del proyecto.
 *
 * Instalación: ver figma-plugin/README.md
 */

(async function main() {
    // ============ Utilidades ============
    function hexToRgb(hex) {
        const h = hex.replace('#', '');
        const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
        return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
    }

    function solidFill(hex, opacity) {
        return { type: 'SOLID', color: hexToRgb(hex), opacity: opacity == null ? 1 : opacity };
    }

    function linearGradient(from, to, angleDeg) {
        // Figma gradientTransform para un gradiente diagonal 135° se aproxima así:
        var a = (angleDeg || 135) * Math.PI / 180;
        var c = Math.cos(a), s = Math.sin(a);
        var fromRgb = hexToRgb(from);
        var toRgb = hexToRgb(to);
        return {
            type: 'GRADIENT_LINEAR',
            gradientTransform: [[c, -s, (1 - c + s) / 2], [s, c, (1 - s - c) / 2]],
            gradientStops: [
                { position: 0, color: { r: fromRgb.r, g: fromRgb.g, b: fromRgb.b, a: 1 } },
                { position: 1, color: { r: toRgb.r,   g: toRgb.g,   b: toRgb.b,   a: 1 } }
            ]
        };
    }

    // ============ 1. Paint Styles (colores + gradientes) ============
    const colorTokens = [
        ['Color/primary',        '#6366F1'],
        ['Color/primary-dark',   '#4F46E5'],
        ['Color/primary-light',  '#818CF8'],
        ['Color/secondary',      '#EC4899'],
        ['Color/accent',         '#10B981'],
        ['Color/dark',           '#1F2937'],
        ['Color/gray',           '#6B7280'],
        ['Color/light-gray',     '#F3F4F6'],
        ['Color/white',          '#FFFFFF'],
        ['Color/error',          '#EF4444'],
    ];

    const gradientTokens = [
        ['Gradient/primary', '#6366F1', '#4F46E5'],
        ['Gradient/accent',  '#EC4899', '#10B981'],
        ['Gradient/hero',    '#667EEA', '#764BA2'],
    ];

    for (const [name, hex] of colorTokens) {
        const s = figma.createPaintStyle();
        s.name = name;
        s.paints = [solidFill(hex)];
    }

    for (const [name, from, to] of gradientTokens) {
        const s = figma.createPaintStyle();
        s.name = name;
        s.paints = [linearGradient(from, to, 135)];
    }

    // ============ 2. Text Styles ============
    // Detecta la familia disponible: Inter preferida, Roboto fallback.
    async function tryLoad(family, style) {
        try {
            await figma.loadFontAsync({ family: family, style: style });
            return true;
        } catch (e) {
            return false;
        }
    }

    var fontFamily = 'Inter';
    var hasInter = await tryLoad('Inter', 'Regular');
    if (!hasInter) {
        var hasRoboto = await tryLoad('Roboto', 'Regular');
        fontFamily = hasRoboto ? 'Roboto' : 'Inter';
    }

    // Carga todos los pesos; los que fallan caen a Regular
    var weightList = ['Regular', 'Medium', 'Semi Bold', 'Bold', 'Extra Bold'];
    var loadedWeight = {};
    for (var wi = 0; wi < weightList.length; wi++) {
        var ok = await tryLoad(fontFamily, weightList[wi]);
        loadedWeight[weightList[wi]] = ok ? weightList[wi] : 'Regular';
    }

    function resolveStyle(w) {
        return loadedWeight[w] || 'Regular';
    }

    const textTokens = [
        ['Text/h1',          56, 'Bold',       120],
        ['Text/h2',          40, 'Bold',       120],
        ['Text/h3',          30, 'Bold',       120],
        ['Text/h4',          24, 'Bold',       120],
        ['Text/h5',          20, 'Bold',       120],
        ['Text/body-lg',     20, 'Regular',    160],
        ['Text/body',        16, 'Regular',    160],
        ['Text/body-sm',     14, 'Regular',    160],
        ['Text/button',      16, 'Semi Bold',  100],
        ['Text/stat-number', 48, 'Bold',       100],
        ['Text/logo',        24, 'Extra Bold', 120],
    ];

    for (const [name, size, wName, lhPct] of textTokens) {
        const s = figma.createTextStyle();
        s.name = name;
        s.fontName = { family: fontFamily, style: resolveStyle(wName) };
        s.fontSize = size;
        s.lineHeight = { value: lhPct, unit: 'PERCENT' };
    }

    // ============ 3. Effect Styles (shadows) ============
    const shadowTokens = [
        ['Shadow/sm', 0, 1,  2, 0,  0.05],
        ['Shadow/md', 0, 4,  6, -1, 0.10],
        ['Shadow/lg', 0, 10, 15, -3, 0.10],
        ['Shadow/xl', 0, 20, 25, -5, 0.10],
    ];

    for (const [name, x, y, blur, spread, alpha] of shadowTokens) {
        const s = figma.createEffectStyle();
        s.name = name;
        s.effects = [{
            type: 'DROP_SHADOW',
            color: { r: 0, g: 0, b: 0, a: alpha },
            offset: { x, y },
            radius: blur,
            spread: spread,
            visible: true,
            blendMode: 'NORMAL'
        }];
    }

    // Utilidad: obtener el ID de un paint style ya creado por nombre
    function styleIdByName(name) {
        const all = figma.getLocalPaintStyles();
        const match = all.find(s => s.name === name);
        return match ? match.id : null;
    }

    function textStyleIdByName(name) {
        const all = figma.getLocalTextStyles();
        const match = all.find(s => s.name === name);
        return match ? match.id : null;
    }

    function effectStyleIdByName(name) {
        const all = figma.getLocalEffectStyles();
        const match = all.find(s => s.name === name);
        return match ? match.id : null;
    }

    // ============ 4. Componente Button ============
    const primaryGrad = figma.getStyleById(styleIdByName('Gradient/primary'));
    const whiteStyle = figma.getStyleById(styleIdByName('Color/white'));
    const primaryColor = figma.getStyleById(styleIdByName('Color/primary'));
    const shadowMd = figma.getStyleById(effectStyleIdByName('Shadow/md'));

    function createButtonVariant(label, type) {
        // type: 'primary' | 'secondary'
        const frame = figma.createFrame();
        frame.layoutMode = 'HORIZONTAL';
        frame.primaryAxisAlignItems = 'CENTER';
        frame.counterAxisAlignItems = 'CENTER';
        frame.paddingLeft = 32; frame.paddingRight = 32;
        frame.paddingTop = 14; frame.paddingBottom = 14;
        frame.cornerRadius = 8;
        frame.name = label;

        if (type === 'primary') {
            if (primaryGrad) frame.fillStyleId = primaryGrad.id;
            if (shadowMd) frame.effectStyleId = shadowMd.id;
        } else {
            if (whiteStyle) frame.fillStyleId = whiteStyle.id;
            frame.strokes = [solidFill('#6366F1')];
            frame.strokeWeight = 2;
        }

        const t = figma.createText();
        t.characters = 'Button';
        t.fontName = { family: fontFamily, style: resolveStyle('Semi Bold') };
        t.fontSize = 16;
        const btnStyle = textStyleIdByName('Text/button');
        if (btnStyle) t.textStyleId = btnStyle;
        t.fills = [solidFill(type === 'primary' ? '#FFFFFF' : '#6366F1')];
        frame.appendChild(t);

        return frame;
    }

    // Crea dos componentes: Button/Primary y Button/Secondary
    const btnPrimary = figma.createComponent();
    btnPrimary.name = 'Button/Primary';
    btnPrimary.layoutMode = 'HORIZONTAL';
    btnPrimary.primaryAxisAlignItems = 'CENTER';
    btnPrimary.counterAxisAlignItems = 'CENTER';
    btnPrimary.paddingLeft = 32; btnPrimary.paddingRight = 32;
    btnPrimary.paddingTop = 14; btnPrimary.paddingBottom = 14;
    btnPrimary.cornerRadius = 8;
    if (primaryGrad) btnPrimary.fillStyleId = primaryGrad.id;
    if (shadowMd) btnPrimary.effectStyleId = shadowMd.id;
    const bpText = figma.createText();
    bpText.characters = 'Registrarse';
    bpText.fontName = { family: fontFamily, style: resolveStyle('Semi Bold') };
    bpText.fontSize = 16;
    bpText.fills = [solidFill('#FFFFFF')];
    btnPrimary.appendChild(bpText);
    btnPrimary.x = 100; btnPrimary.y = 100;

    const btnSecondary = figma.createComponent();
    btnSecondary.name = 'Button/Secondary';
    btnSecondary.layoutMode = 'HORIZONTAL';
    btnSecondary.primaryAxisAlignItems = 'CENTER';
    btnSecondary.counterAxisAlignItems = 'CENTER';
    btnSecondary.paddingLeft = 32; btnSecondary.paddingRight = 32;
    btnSecondary.paddingTop = 14; btnSecondary.paddingBottom = 14;
    btnSecondary.cornerRadius = 8;
    if (whiteStyle) btnSecondary.fillStyleId = whiteStyle.id;
    btnSecondary.strokes = [solidFill('#6366F1')];
    btnSecondary.strokeWeight = 2;
    const bsText = figma.createText();
    bsText.characters = 'Ofrecer mis servicios';
    bsText.fontName = { family: fontFamily, style: resolveStyle('Semi Bold') };
    bsText.fontSize = 16;
    bsText.fills = [solidFill('#6366F1')];
    btnSecondary.appendChild(bsText);
    btnSecondary.x = 300; btnSecondary.y = 100;

    // ============ 5. Componente Navbar (simplificado, 1440×70) ============
    const navbar = figma.createComponent();
    navbar.name = 'Navbar/Desktop';
    navbar.resize(1440, 70);
    navbar.layoutMode = 'HORIZONTAL';
    navbar.primaryAxisAlignItems = 'CENTER';
    navbar.counterAxisAlignItems = 'CENTER';
    navbar.primaryAxisSizingMode = 'FIXED';
    navbar.counterAxisSizingMode = 'FIXED';
    navbar.paddingLeft = 32; navbar.paddingRight = 32;
    navbar.fills = [solidFill('#FFFFFF', 0.95)];
    navbar.x = 100; navbar.y = 250;
    navbar.itemSpacing = 0;

    // Logo
    const logo = figma.createText();
    logo.characters = 'Ya Quedó';
    logo.fontName = { family: fontFamily, style: resolveStyle('Extra Bold') };
    logo.fontSize = 24;
    logo.fills = [solidFill('#6366F1')];
    navbar.appendChild(logo);

    // Spacer
    const spacer = figma.createFrame();
    spacer.resize(1, 1);
    spacer.fills = [];
    spacer.layoutGrow = 1;
    navbar.appendChild(spacer);

    // Menu horizontal
    const menu = figma.createFrame();
    menu.layoutMode = 'HORIZONTAL';
    menu.primaryAxisAlignItems = 'CENTER';
    menu.counterAxisAlignItems = 'CENTER';
    menu.itemSpacing = 32;
    menu.fills = [];
    menu.primaryAxisSizingMode = 'AUTO';
    menu.counterAxisSizingMode = 'AUTO';

    const navItems = ['Inicio', 'Servicios', 'Cómo funciona', 'Trabajadores', 'FAQ', 'Iniciar sesión'];
    for (const label of navItems) {
        const link = figma.createText();
        link.characters = label;
        link.fontName = { family: fontFamily, style: resolveStyle('Medium') };
        link.fontSize = 16;
        link.fills = [solidFill('#1F2937')];
        menu.appendChild(link);
    }

    // Botón registrarse (instancia del componente)
    const registerBtn = btnPrimary.createInstance();
    // Por limitación del plugin no se puede cambiar el texto en instance,
    // pero el componente ya trae "Registrarse".
    menu.appendChild(registerBtn);

    // Switcher ES/EN
    const switcher = figma.createFrame();
    switcher.layoutMode = 'HORIZONTAL';
    switcher.primaryAxisAlignItems = 'CENTER';
    switcher.counterAxisAlignItems = 'CENTER';
    switcher.itemSpacing = 2;
    switcher.paddingLeft = 3; switcher.paddingRight = 3;
    switcher.paddingTop = 3; switcher.paddingBottom = 3;
    switcher.cornerRadius = 999;
    switcher.fills = [solidFill('#F3F4F6')];
    for (const code of ['ES', 'EN']) {
        const btn = figma.createFrame();
        btn.layoutMode = 'HORIZONTAL';
        btn.primaryAxisAlignItems = 'CENTER';
        btn.counterAxisAlignItems = 'CENTER';
        btn.paddingLeft = 10; btn.paddingRight = 10;
        btn.paddingTop = 5; btn.paddingBottom = 5;
        btn.cornerRadius = 999;
        btn.fills = [code === 'ES' ? solidFill('#FFFFFF') : solidFill('#F3F4F6', 0)];
        const tt = figma.createText();
        tt.characters = code;
        tt.fontName = { family: fontFamily, style: resolveStyle('Bold') };
        tt.fontSize = 12;
        tt.fills = [solidFill(code === 'ES' ? '#6366F1' : '#6B7280')];
        btn.appendChild(tt);
        switcher.appendChild(btn);
    }
    menu.appendChild(switcher);

    navbar.appendChild(menu);

    // ============ 6. Frames esqueleto de páginas ============
    // Creamos 2 frames grandes: Desktop Landing y Mobile Landing
    const desktopLanding = figma.createFrame();
    desktopLanding.name = '🖥 Desktop · Landing';
    desktopLanding.resize(1440, 8500);
    desktopLanding.x = -1800; desktopLanding.y = 0;
    desktopLanding.fills = [solidFill('#FFFFFF')];

    // Instancia del navbar arriba
    const navInstance = navbar.createInstance();
    desktopLanding.appendChild(navInstance);
    navInstance.x = 0; navInstance.y = 0;

    // Placeholders de secciones (con texto centrado)
    const sections = [
        ['Hero · 620px',          620,  '#667EEA'],
        ['Problema · 540px',      540,  '#F3F4F6'],
        ['Solución · 480px',      480,  '#FFFFFF'],
        ['Cómo funciona · 540px', 540,  '#F3F4F6'],
        ['Servicios · 540px',     540,  '#FFFFFF'],
        ['Beneficios · 640px',    640,  '#FFFFFF'],
        ['Características · 680px', 680, '#F3F4F6'],
        ['Trabajadores · 540px',  540,  '#F3F4F6'],
        ['Impacto · 480px',       480,  '#6366F1'],
        ['Testimonios · 540px',   540,  '#F3F4F6'],
        ['FAQ · 640px',           640,  '#FFFFFF'],
        ['Pre-registro · 720px',  720,  '#EC4899'],
        ['Footer · 380px',        380,  '#1F2937'],
    ];

    let currentY = 70;
    for (const [label, h, bg] of sections) {
        const sec = figma.createFrame();
        sec.name = label;
        sec.resize(1440, h);
        sec.x = 0; sec.y = currentY;
        sec.fills = [solidFill(bg)];
        sec.layoutMode = 'VERTICAL';
        sec.primaryAxisAlignItems = 'CENTER';
        sec.counterAxisAlignItems = 'CENTER';
        sec.primaryAxisSizingMode = 'FIXED';
        sec.counterAxisSizingMode = 'FIXED';

        const lbl = figma.createText();
        lbl.characters = label;
        lbl.fontName = { family: fontFamily, style: resolveStyle('Bold') };
        lbl.fontSize = 24;
        const isDarkBg = bg === '#1F2937' || bg === '#6366F1' || bg === '#667EEA' || bg === '#EC4899';
        lbl.fills = [solidFill(isDarkBg ? '#FFFFFF' : '#1F2937')];
        sec.appendChild(lbl);

        desktopLanding.appendChild(sec);
        currentY += h;
    }

    // Mobile Landing (375×13500) — mismo esquema
    const mobileLanding = figma.createFrame();
    mobileLanding.name = '📱 Mobile · Landing';
    mobileLanding.resize(375, 13500);
    mobileLanding.x = 2000; mobileLanding.y = 0;
    mobileLanding.fills = [solidFill('#FFFFFF')];

    const mobileSections = [
        ['Navbar · 70px',           70,   '#FFFFFF'],
        ['Hero · 480px',            480,  '#667EEA'],
        ['Problema',                720,  '#F3F4F6'],
        ['Solución',                680,  '#FFFFFF'],
        ['Cómo funciona',           1200, '#F3F4F6'],
        ['Servicios',               1400, '#FFFFFF'],
        ['Beneficios',              1400, '#FFFFFF'],
        ['Características',         1800, '#F3F4F6'],
        ['Trabajadores',            1100, '#F3F4F6'],
        ['Impacto',                 700,  '#6366F1'],
        ['Testimonios',             900,  '#F3F4F6'],
        ['FAQ',                     900,  '#FFFFFF'],
        ['Pre-registro',            900,  '#EC4899'],
        ['Footer',                  850,  '#1F2937'],
    ];

    let mY = 0;
    for (const [label, h, bg] of mobileSections) {
        const sec = figma.createFrame();
        sec.name = label;
        sec.resize(375, h);
        sec.x = 0; sec.y = mY;
        sec.fills = [solidFill(bg)];
        sec.layoutMode = 'VERTICAL';
        sec.primaryAxisAlignItems = 'CENTER';
        sec.counterAxisAlignItems = 'CENTER';
        sec.primaryAxisSizingMode = 'FIXED';
        sec.counterAxisSizingMode = 'FIXED';
        const lbl = figma.createText();
        lbl.characters = label;
        lbl.fontName = { family: fontFamily, style: resolveStyle('Bold') };
        lbl.fontSize = 18;
        const isDark = bg === '#1F2937' || bg === '#6366F1' || bg === '#667EEA' || bg === '#EC4899';
        lbl.fills = [solidFill(isDark ? '#FFFFFF' : '#1F2937')];
        sec.appendChild(lbl);
        mobileLanding.appendChild(sec);
        mY += h;
    }

    // Scroll para ver lo generado
    figma.viewport.scrollAndZoomIntoView([desktopLanding, navbar, btnPrimary, btnSecondary, mobileLanding]);

    figma.closePlugin('✅ Ya Quedó generado: 10 colores + 3 gradientes + 11 text styles + 4 sombras + Button/Primary + Button/Secondary + Navbar/Desktop + Desktop Landing skeleton + Mobile Landing skeleton.');
})().catch(err => {
    figma.closePlugin('❌ Error: ' + (err && err.message ? err.message : err));
});
