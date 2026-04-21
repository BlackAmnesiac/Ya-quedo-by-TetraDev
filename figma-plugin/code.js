/**
 * Ya Quedó · Generator v2 — Plugin de Figma
 *
 * Genera automáticamente:
 *   1) Design System completo (colores, gradientes, tipografía Inter, sombras)
 *   2) Componentes: Button/Primary, Button/Secondary, Navbar/Desktop
 *   3) Landing Desktop completa con las 14 secciones pobladas con contenido real
 *   4) Landing Mobile como frame espejo con secciones identificadas
 *
 * Después de correr este plugin, el usuario solo debe refinar visuales
 * (íconos específicos, ajustes finos) y aplicar el mismo esquema al Mobile.
 */

(async function main() {
    // =========================================================================
    // 1) UTILIDADES
    // =========================================================================
    function hexToRgb(hex) {
        const h = hex.replace('#', '');
        const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
        const n = parseInt(full, 16);
        return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
    }

    function solidFill(hex, opacity) {
        return { type: 'SOLID', color: hexToRgb(hex), opacity: opacity == null ? 1 : opacity };
    }

    function linearGradient(from, to, angleDeg) {
        var a = (angleDeg || 135) * Math.PI / 180;
        var c = Math.cos(a), s = Math.sin(a);
        var fromRgb = hexToRgb(from);
        var toRgb = hexToRgb(to);
        return {
            type: 'GRADIENT_LINEAR',
            gradientTransform: [[c, -s, (1 - c + s) / 2], [s, c, (1 - s - c) / 2]],
            gradientStops: [
                { position: 0, color: { r: fromRgb.r, g: fromRgb.g, b: fromRgb.b, a: 1 } },
                { position: 1, color: { r: toRgb.r, g: toRgb.g, b: toRgb.b, a: 1 } }
            ]
        };
    }

    // =========================================================================
    // 2) CARGA DE FUENTES CON FALLBACK
    // =========================================================================
    async function tryLoad(family, style) {
        try { await figma.loadFontAsync({ family: family, style: style }); return true; }
        catch (e) { return false; }
    }

    var fontFamily = 'Inter';
    var hasInter = await tryLoad('Inter', 'Regular');
    if (!hasInter) {
        var hasRoboto = await tryLoad('Roboto', 'Regular');
        fontFamily = hasRoboto ? 'Roboto' : 'Inter';
    }

    var weightList = ['Regular', 'Medium', 'Semi Bold', 'Bold', 'Extra Bold'];
    var loadedWeight = {};
    for (var wi = 0; wi < weightList.length; wi++) {
        var ok = await tryLoad(fontFamily, weightList[wi]);
        loadedWeight[weightList[wi]] = ok ? weightList[wi] : 'Regular';
    }
    function resolveStyle(w) { return loadedWeight[w] || 'Regular'; }

    // =========================================================================
    // 3) PAINT STYLES (colores + gradientes)
    // =========================================================================
    var paintStyles = {};
    var textStyles = {};
    var effectStyles = {};

    var colorTokens = [
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
    var gradientTokens = [
        ['Gradient/primary', '#6366F1', '#4F46E5'],
        ['Gradient/accent',  '#EC4899', '#10B981'],
        ['Gradient/hero',    '#667EEA', '#764BA2'],
    ];

    for (var i = 0; i < colorTokens.length; i++) {
        var ct = colorTokens[i];
        var ps = figma.createPaintStyle();
        ps.name = ct[0];
        ps.paints = [solidFill(ct[1])];
        paintStyles[ct[0]] = ps;
    }
    for (var g = 0; g < gradientTokens.length; g++) {
        var gt = gradientTokens[g];
        var gs = figma.createPaintStyle();
        gs.name = gt[0];
        gs.paints = [linearGradient(gt[1], gt[2], 135)];
        paintStyles[gt[0]] = gs;
    }

    // =========================================================================
    // 4) TEXT STYLES
    // =========================================================================
    var textTokens = [
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
    for (var t = 0; t < textTokens.length; t++) {
        var tt = textTokens[t];
        var ts = figma.createTextStyle();
        ts.name = tt[0];
        ts.fontName = { family: fontFamily, style: resolveStyle(tt[2]) };
        ts.fontSize = tt[1];
        ts.lineHeight = { value: tt[3], unit: 'PERCENT' };
        textStyles[tt[0]] = ts;
    }

    // =========================================================================
    // 5) EFFECT STYLES (shadows)
    // =========================================================================
    var shadowTokens = [
        ['Shadow/sm', 0, 1,  2, 0,  0.05],
        ['Shadow/md', 0, 4,  6, -1, 0.10],
        ['Shadow/lg', 0, 10, 15, -3, 0.10],
        ['Shadow/xl', 0, 20, 25, -5, 0.10],
    ];
    for (var sh = 0; sh < shadowTokens.length; sh++) {
        var st = shadowTokens[sh];
        var es = figma.createEffectStyle();
        es.name = st[0];
        es.effects = [{
            type: 'DROP_SHADOW',
            color: { r: 0, g: 0, b: 0, a: st[5] },
            offset: { x: st[1], y: st[2] },
            radius: st[3], spread: st[4],
            visible: true, blendMode: 'NORMAL'
        }];
        effectStyles[st[0]] = es;
    }

    // =========================================================================
    // 6) HELPERS DE CREACIÓN
    // =========================================================================
    function makeText(parent, content, opts) {
        opts = opts || {};
        var txt = figma.createText();
        txt.fontName = { family: fontFamily, style: resolveStyle(opts.weight || 'Regular') };
        txt.fontSize = opts.size || 16;
        txt.characters = String(content == null ? '' : content);
        if (opts.color) txt.fills = [solidFill(opts.color, opts.opacity)];
        if (opts.textStyle && textStyles[opts.textStyle]) txt.textStyleId = textStyles[opts.textStyle].id;
        if (opts.lineHeight) txt.lineHeight = { value: opts.lineHeight, unit: 'PERCENT' };
        if (opts.align) txt.textAlignHorizontal = opts.align;
        if (opts.w) {
            txt.textAutoResize = 'HEIGHT';
            txt.resize(opts.w, txt.height);
        }
        if (opts.name) txt.name = opts.name;
        if (parent) parent.appendChild(txt);
        return txt;
    }

    function makeFrame(parent, opts) {
        opts = opts || {};
        var f = figma.createFrame();
        if (opts.name) f.name = opts.name;
        if (opts.w != null && opts.h != null) f.resize(opts.w, opts.h);
        else if (opts.w != null) f.resize(opts.w, f.height);
        else if (opts.h != null) f.resize(f.width, opts.h);
        if (opts.bgGradient) {
            f.fills = [linearGradient(opts.bgGradient[0], opts.bgGradient[1], opts.bgGradient[2] || 135)];
        } else if (opts.bg === null || opts.bg === 'transparent') {
            f.fills = [];
        } else if (opts.bg) {
            f.fills = [solidFill(opts.bg, opts.bgOpacity)];
        }
        if (opts.radius != null) f.cornerRadius = opts.radius;
        if (opts.stroke) {
            f.strokes = [solidFill(opts.stroke)];
            f.strokeWeight = opts.strokeWeight || 1;
        }
        if (opts.shadow && effectStyles[opts.shadow]) f.effectStyleId = effectStyles[opts.shadow].id;
        if (opts.clip === true) f.clipsContent = true;
        if (opts.dir) {
            f.layoutMode = opts.dir;
            if (opts.primaryAlign) f.primaryAxisAlignItems = opts.primaryAlign;
            if (opts.counterAlign) f.counterAxisAlignItems = opts.counterAlign;
            if (opts.gap != null) f.itemSpacing = opts.gap;
            if (opts.padding != null) {
                f.paddingTop = opts.padding; f.paddingBottom = opts.padding;
                f.paddingLeft = opts.padding; f.paddingRight = opts.padding;
            }
            if (opts.paddingH != null) { f.paddingLeft = opts.paddingH; f.paddingRight = opts.paddingH; }
            if (opts.paddingV != null) { f.paddingTop = opts.paddingV; f.paddingBottom = opts.paddingV; }
            if (opts.primarySizing) f.primaryAxisSizingMode = opts.primarySizing;
            if (opts.counterSizing) f.counterAxisSizingMode = opts.counterSizing;
        }
        if (parent) parent.appendChild(f);
        return f;
    }

    // Círculo "icono" con letra o símbolo dentro (placeholder para iconos reales)
    function iconCircle(parent, size, bgHex, label, labelColor, useGradient) {
        var c = makeFrame(parent, {
            w: size, h: size,
            bg: useGradient ? null : bgHex,
            bgGradient: useGradient || null,
            radius: size / 2,
            dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            name: 'Icon'
        });
        makeText(c, label || '●', {
            size: Math.round(size * 0.42),
            weight: 'Bold',
            color: labelColor || '#FFFFFF'
        });
        return c;
    }

    // Cuadrado "icono" con gradiente (para service cards)
    function iconSquare(parent, size, gradient, label) {
        var c = makeFrame(parent, {
            w: size, h: size,
            bgGradient: gradient,
            radius: Math.round(size * 0.21),
            dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            name: 'IconSquare'
        });
        makeText(c, label || '●', {
            size: Math.round(size * 0.42),
            weight: 'Bold',
            color: '#FFFFFF'
        });
        return c;
    }

    // Chip redondeado con texto
    function chip(parent, label, bgHex, txtColor) {
        var c = makeFrame(parent, {
            bg: bgHex,
            radius: 999,
            dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: 6, paddingH: 12,
            gap: 4,
            primarySizing: 'AUTO', counterSizing: 'AUTO',
            name: 'Chip'
        });
        makeText(c, label, {
            size: 12, weight: 'Semi Bold',
            color: txtColor || '#FFFFFF'
        });
        return c;
    }

    // Botón stand-alone (no componente)
    function button(parent, label, variant) {
        // variant: 'primary' | 'secondary' | 'cta-primary' | 'cta-secondary'
        var bg = '#6366F1', color = '#FFFFFF', stroke = null, useGradient = null;
        if (variant === 'primary') {
            useGradient = ['#6366F1', '#4F46E5', 135];
            color = '#FFFFFF';
        } else if (variant === 'secondary') {
            bg = '#FFFFFF'; color = '#6366F1'; stroke = '#6366F1';
        } else if (variant === 'cta-primary') {
            bg = '#FFFFFF'; color = '#6366F1';
        } else if (variant === 'cta-secondary') {
            bg = 'transparent'; color = '#FFFFFF'; stroke = '#FFFFFF';
        }
        var btn = makeFrame(parent, {
            name: 'Button · ' + label,
            bg: bg === 'transparent' ? null : bg,
            bgGradient: useGradient,
            radius: 8,
            dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: 14, paddingH: 32,
            primarySizing: 'AUTO', counterSizing: 'AUTO',
            stroke: stroke, strokeWeight: 2
        });
        if (bg === 'transparent') btn.fills = [];
        makeText(btn, label, { size: 16, weight: 'Semi Bold', color: color });
        return btn;
    }

    // Card base
    function card(parent, opts) {
        opts = opts || {};
        var c = makeFrame(parent, {
            name: opts.name || 'Card',
            bg: opts.bg || '#FFFFFF',
            radius: opts.radius != null ? opts.radius : 16,
            dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: opts.center ? 'CENTER' : 'MIN',
            padding: opts.padding != null ? opts.padding : 32,
            gap: opts.gap != null ? opts.gap : 16,
            shadow: opts.shadow || 'Shadow/md',
            primarySizing: 'AUTO', counterSizing: opts.w ? 'FIXED' : 'AUTO',
            stroke: opts.stroke, strokeWeight: opts.strokeWeight || 1,
            w: opts.w, h: opts.h
        });
        return c;
    }

    // Construye una sección full-width con container interno centrado (max 1200)
    function section(parent, opts) {
        opts = opts || {};
        var sec = makeFrame(parent, {
            name: opts.name,
            w: 1440, h: opts.h,
            bg: opts.bg || null,
            bgGradient: opts.bgGradient,
            dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: opts.padV != null ? opts.padV : 80,
            paddingH: opts.padH != null ? opts.padH : 32,
            gap: opts.gap || 24,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            clip: true
        });
        return sec;
    }

    // Título de sección (H2 + subtítulo)
    function sectionTitle(parent, h2Text, subtitle, dark) {
        var holder = makeFrame(parent, {
            name: 'SectionTitle',
            bg: null,
            dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 12,
            primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        makeText(holder, h2Text, {
            size: 40, weight: 'Bold', color: dark ? '#FFFFFF' : '#1F2937',
            align: 'CENTER', w: 600
        });
        if (subtitle) {
            makeText(holder, subtitle, {
                size: 18, weight: 'Regular',
                color: dark ? '#FFFFFF' : '#6B7280',
                opacity: dark ? 0.9 : 1,
                align: 'CENTER', w: 600
            });
        }
        return holder;
    }

    // =========================================================================
    // 7) COMPONENTES PRINCIPALES (Button/Primary, Button/Secondary, Navbar)
    // =========================================================================
    var componentsX = 0, componentsY = -1200; // zona arriba-izquierda para los componentes

    // Button/Primary componente
    var btnPrimaryCmp = figma.createComponent();
    btnPrimaryCmp.name = 'Button/Primary';
    btnPrimaryCmp.layoutMode = 'HORIZONTAL';
    btnPrimaryCmp.primaryAxisAlignItems = 'CENTER';
    btnPrimaryCmp.counterAxisAlignItems = 'CENTER';
    btnPrimaryCmp.primaryAxisSizingMode = 'AUTO';
    btnPrimaryCmp.counterAxisSizingMode = 'AUTO';
    btnPrimaryCmp.paddingLeft = 32; btnPrimaryCmp.paddingRight = 32;
    btnPrimaryCmp.paddingTop = 14; btnPrimaryCmp.paddingBottom = 14;
    btnPrimaryCmp.cornerRadius = 8;
    if (paintStyles['Gradient/primary']) btnPrimaryCmp.fillStyleId = paintStyles['Gradient/primary'].id;
    if (effectStyles['Shadow/md']) btnPrimaryCmp.effectStyleId = effectStyles['Shadow/md'].id;
    var bpText = figma.createText();
    bpText.fontName = { family: fontFamily, style: resolveStyle('Semi Bold') };
    bpText.fontSize = 16;
    bpText.characters = 'Registrarse';
    bpText.fills = [solidFill('#FFFFFF')];
    btnPrimaryCmp.appendChild(bpText);
    btnPrimaryCmp.x = componentsX; btnPrimaryCmp.y = componentsY;

    // Button/Secondary componente
    var btnSecondaryCmp = figma.createComponent();
    btnSecondaryCmp.name = 'Button/Secondary';
    btnSecondaryCmp.layoutMode = 'HORIZONTAL';
    btnSecondaryCmp.primaryAxisAlignItems = 'CENTER';
    btnSecondaryCmp.counterAxisAlignItems = 'CENTER';
    btnSecondaryCmp.primaryAxisSizingMode = 'AUTO';
    btnSecondaryCmp.counterAxisSizingMode = 'AUTO';
    btnSecondaryCmp.paddingLeft = 32; btnSecondaryCmp.paddingRight = 32;
    btnSecondaryCmp.paddingTop = 14; btnSecondaryCmp.paddingBottom = 14;
    btnSecondaryCmp.cornerRadius = 8;
    btnSecondaryCmp.fills = [solidFill('#FFFFFF')];
    btnSecondaryCmp.strokes = [solidFill('#6366F1')];
    btnSecondaryCmp.strokeWeight = 2;
    var bsText = figma.createText();
    bsText.fontName = { family: fontFamily, style: resolveStyle('Semi Bold') };
    bsText.fontSize = 16;
    bsText.characters = 'Ofrecer mis servicios';
    bsText.fills = [solidFill('#6366F1')];
    btnSecondaryCmp.appendChild(bsText);
    btnSecondaryCmp.x = componentsX + 200; btnSecondaryCmp.y = componentsY;

    // Navbar/Desktop componente
    var navbarCmp = figma.createComponent();
    navbarCmp.name = 'Navbar/Desktop';
    navbarCmp.resize(1440, 70);
    navbarCmp.layoutMode = 'HORIZONTAL';
    navbarCmp.primaryAxisAlignItems = 'CENTER';
    navbarCmp.counterAxisAlignItems = 'CENTER';
    navbarCmp.primaryAxisSizingMode = 'FIXED';
    navbarCmp.counterAxisSizingMode = 'FIXED';
    navbarCmp.paddingLeft = 32; navbarCmp.paddingRight = 32;
    navbarCmp.fills = [solidFill('#FFFFFF', 0.95)];
    if (effectStyles['Shadow/sm']) navbarCmp.effectStyleId = effectStyles['Shadow/sm'].id;
    navbarCmp.x = componentsX + 450; navbarCmp.y = componentsY;

    var logo = figma.createText();
    logo.fontName = { family: fontFamily, style: resolveStyle('Extra Bold') };
    logo.fontSize = 24;
    logo.characters = 'Ya Quedó';
    logo.fills = [solidFill('#6366F1')];
    navbarCmp.appendChild(logo);

    // Spacer
    var spacer = figma.createFrame();
    spacer.resize(1, 1);
    spacer.fills = [];
    spacer.layoutGrow = 1;
    navbarCmp.appendChild(spacer);

    // Menú horizontal
    var menu = figma.createFrame();
    menu.layoutMode = 'HORIZONTAL';
    menu.primaryAxisAlignItems = 'CENTER';
    menu.counterAxisAlignItems = 'CENTER';
    menu.primaryAxisSizingMode = 'AUTO';
    menu.counterAxisSizingMode = 'AUTO';
    menu.itemSpacing = 24;
    menu.fills = [];
    navbarCmp.appendChild(menu);

    var navItems = ['Inicio', 'Servicios', 'Cómo funciona', 'Trabajadores', 'FAQ', 'Iniciar sesión'];
    for (var ni = 0; ni < navItems.length; ni++) {
        var link = figma.createText();
        link.fontName = { family: fontFamily, style: resolveStyle('Medium') };
        link.fontSize = 16;
        link.characters = navItems[ni];
        link.fills = [solidFill('#1F2937')];
        menu.appendChild(link);
    }

    // Botón "Registrarse" inline (no instancia para mantener control)
    var regBtn = makeFrame(menu, {
        bg: null, bgGradient: ['#6366F1', '#4F46E5', 135],
        radius: 8,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 10, paddingH: 20,
        primarySizing: 'AUTO', counterSizing: 'AUTO',
        shadow: 'Shadow/sm',
        name: 'Nav Register'
    });
    makeText(regBtn, 'Registrarse', { size: 14, weight: 'Semi Bold', color: '#FFFFFF' });

    // Language switcher
    var switcher = makeFrame(menu, {
        bg: '#F3F4F6',
        radius: 999,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 3, paddingH: 3,
        gap: 2,
        primarySizing: 'AUTO', counterSizing: 'AUTO',
        name: 'Lang Switcher'
    });
    var esBtn = makeFrame(switcher, {
        bg: '#FFFFFF', radius: 999,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 4, paddingH: 10,
        primarySizing: 'AUTO', counterSizing: 'AUTO',
        shadow: 'Shadow/sm'
    });
    makeText(esBtn, 'ES', { size: 12, weight: 'Bold', color: '#6366F1' });
    var enBtn = makeFrame(switcher, {
        bg: null, radius: 999,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 4, paddingH: 10,
        primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    enBtn.fills = [];
    makeText(enBtn, 'EN', { size: 12, weight: 'Bold', color: '#6B7280' });

    // =========================================================================
    // 8) DESKTOP LANDING — 14 SECCIONES POBLADAS
    // =========================================================================
    var landing = figma.createFrame();
    landing.name = '🖥 Desktop · Landing';
    landing.resize(1440, 10);
    landing.x = 0; landing.y = 0;
    landing.fills = [solidFill('#FFFFFF')];
    landing.layoutMode = 'VERTICAL';
    landing.primaryAxisSizingMode = 'AUTO';
    landing.counterAxisSizingMode = 'FIXED';
    landing.primaryAxisAlignItems = 'MIN';
    landing.counterAxisAlignItems = 'CENTER';
    landing.itemSpacing = 0;
    landing.clipsContent = true;

    // Insertamos instancia del navbar arriba
    var navInstance = navbarCmp.createInstance();
    landing.appendChild(navInstance);

    // -------------------------------------------------------- HERO
    var hero = section(landing, {
        name: 'Hero',
        bgGradient: ['#667EEA', '#764BA2', 135],
        h: 620, padV: 128
    });
    var heroInner = makeFrame(hero, {
        bg: null,
        dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 24,
        primarySizing: 'AUTO', counterSizing: 'AUTO',
        w: 900
    });
    heroInner.fills = [];
    makeText(heroInner, 'Encuentra el servicio que necesitas, al instante', {
        size: 56, weight: 'Bold', color: '#FFFFFF',
        align: 'CENTER', w: 900
    });
    makeText(heroInner, 'Conectamos personas con trabajadores independientes de confianza en el Perú. Rápido, seguro y transparente.', {
        size: 20, weight: 'Regular', color: '#FFFFFF', opacity: 0.9,
        align: 'CENTER', w: 760
    });
    var heroBtns = makeFrame(heroInner, {
        bg: null,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 16,
        primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    heroBtns.fills = [];
    button(heroBtns, 'Buscar servicio', 'cta-primary');
    button(heroBtns, 'Ofrecer mis servicios', 'cta-secondary');

    // -------------------------------------------------------- PROBLEMA
    var problem = section(landing, {
        name: 'Problema', bg: '#F3F4F6', h: 560
    });
    sectionTitle(problem, 'El desafío que enfrentamos',
        'La informalidad laboral en el Perú afecta a millones de trabajadores y clientes');
    var problemGrid = makeFrame(problem, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    problemGrid.fills = [];
    var problemCards = [
        ['🔍', 'Dificultad para encontrar servicios', 'Los clientes pierden tiempo y esfuerzo buscando profesionales confiables y verificados.'],
        ['$', 'Precios poco transparentes', 'Falta de claridad en los costos y temor a estafas o trabajos mal ejecutados.'],
        ['💼', 'Informalidad laboral', 'Más del 60% de los trabajadores en el Perú no tienen acceso a beneficios laborales ni formalización.']
    ];
    for (var pc = 0; pc < problemCards.length; pc++) {
        var pcc = card(problemGrid, { w: 360 });
        iconCircle(pcc, 60, null, problemCards[pc][0], '#FFFFFF', ['#EC4899', '#10B981', 135]);
        makeText(pcc, problemCards[pc][1], { size: 22, weight: 'Bold', color: '#1F2937', w: 296 });
        makeText(pcc, problemCards[pc][2], { size: 15, weight: 'Regular', color: '#6B7280', w: 296 });
    }

    // -------------------------------------------------------- SOLUCIÓN
    var solution = section(landing, {
        name: 'Solución', bg: '#FFFFFF', h: 520, gap: 0
    });
    var solutionRow = makeFrame(solution, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 64, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    solutionRow.fills = [];
    var solLeft = makeFrame(solutionRow, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO',
        w: 568
    });
    solLeft.fills = [];
    makeText(solLeft, 'La solución: Ya Quedó', { size: 18, weight: 'Bold', color: '#6366F1' });
    makeText(solLeft, 'Transformando la forma de conectar servicios locales', {
        size: 36, weight: 'Bold', color: '#1F2937', w: 568
    });
    makeText(solLeft, 'Creamos una plataforma que revoluciona el mercado de servicios informales, ofreciendo confianza, rapidez y oportunidades de formalización para todos.', {
        size: 16, weight: 'Regular', color: '#6B7280', w: 568
    });
    var solFeatures = [
        'Verificación de identidad y habilidades',
        'Sistema de calificación transparente',
        'Pagos seguros y garantizados',
        'Capacitación y certificación interna',
        'Geolocalización precisa'
    ];
    var solList = makeFrame(solLeft, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 10, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    solList.fills = [];
    for (var sf = 0; sf < solFeatures.length; sf++) {
        var row = makeFrame(solList, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        row.fills = [];
        makeText(row, '✓', { size: 18, weight: 'Bold', color: '#10B981' });
        makeText(row, solFeatures[sf], { size: 16, weight: 'Regular', color: '#1F2937' });
    }
    var solRight = makeFrame(solutionRow, {
        bg: null, bgGradient: ['#6366F1', '#4F46E5', 135],
        radius: 16, dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 12, padding: 40,
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 568, h: 320,
        shadow: 'Shadow/lg'
    });
    makeText(solRight, 'YQ', { size: 64, weight: 'Extra Bold', color: '#FFFFFF' });
    makeText(solRight, 'Tecnología para el progreso', { size: 24, weight: 'Bold', color: '#FFFFFF', align: 'CENTER' });
    makeText(solRight, 'Utilizamos IA y algoritmos avanzados para conectar a las personas correctas', {
        size: 15, weight: 'Regular', color: '#FFFFFF', opacity: 0.9, align: 'CENTER', w: 400
    });

    // -------------------------------------------------------- CÓMO FUNCIONA
    var how = section(landing, {
        name: 'Cómo funciona', bg: '#F3F4F6', h: 560
    });
    sectionTitle(how, 'Así de fácil funciona', 'En solo 4 pasos simples puedes encontrar o ofrecer servicios');
    var howGrid = makeFrame(how, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    howGrid.fills = [];
    var steps = [
        ['1', 'Regístrate gratis',    'Crea tu perfil en menos de 2 minutos. Verificamos tu identidad para mayor seguridad.'],
        ['2', 'Busca o publica',      'Encuentra profesionales cercanos o publica tu servicio. Nuestro algoritmo te conecta al instante.'],
        ['3', 'Coordina y confirma',  'Chatea directamente, acuerda detalles y confirma el servicio con pago seguro.'],
        ['4', 'Califica y repite',    'Al finalizar, califica el servicio y ayuda a construir una comunidad más confiable.']
    ];
    for (var sp = 0; sp < steps.length; sp++) {
        var sc = card(howGrid, { w: 264, center: true });
        iconCircle(sc, 50, null, steps[sp][0], '#FFFFFF', ['#6366F1', '#4F46E5', 135]);
        makeText(sc, steps[sp][1], { size: 20, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 200 });
        makeText(sc, steps[sp][2], { size: 14, weight: 'Regular', color: '#6B7280', align: 'CENTER', w: 200 });
    }

    // -------------------------------------------------------- SERVICIOS (US-03)
    var services = section(landing, {
        name: 'Servicios', bg: '#FFFFFF', h: 680
    });
    sectionTitle(services, 'Servicios disponibles', 'Más de 6 categorías iniciales para resolver lo que necesites en casa');
    var servicesGrid = makeFrame(services, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    servicesGrid.fills = [];
    var svcRows = [
        [['⚡', 'Electricidad', 'Instalación, reparación y mantenimiento eléctrico certificado.'],
         ['🔧', 'Gasfitería',   'Fugas, desatoros y reparación de tuberías con garantía.'],
         ['🎨', 'Pintura',      'Interiores y exteriores con acabados profesionales.']],
        [['🔑', 'Cerrajería',         'Emergencias 24/7, cambio de cerraduras y llaves.'],
         ['🧯', 'Electrodomésticos', 'Reparación de lavadoras, refrigeradoras, microondas y más.'],
         ['🧹', 'Limpieza técnica',  'Limpieza profunda de tanques, aires y fachadas.']]
    ];
    for (var rIdx = 0; rIdx < 2; rIdx++) {
        var rowSvc = makeFrame(servicesGrid, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 0, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        rowSvc.fills = [];
    }
    // Grid de 3 columnas × 2 filas aplanado
    var servicesFlat = [];
    for (var a = 0; a < 2; a++) for (var b = 0; b < 3; b++) servicesFlat.push(svcRows[a][b]);
    // Reconstruyo el grid como 3 columnas
    // Figma no tiene grid nativo, hago 2 filas horizontales dentro de una vertical
    servicesGrid.layoutMode = 'VERTICAL';
    servicesGrid.itemSpacing = 24;
    for (var rr = 0; rr < 2; rr++) {
        var rowF = makeFrame(servicesGrid, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'MIN',
            gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        rowF.fills = [];
        for (var cc = 0; cc < 3; cc++) {
            var svcData = svcRows[rr][cc];
            var svcCard = card(rowF, {
                w: 376, stroke: '#F3F4F6', shadow: 'Shadow/sm', padding: 28, gap: 12
            });
            iconSquare(svcCard, 56, ['#6366F1', '#4F46E5', 135], svcData[0]);
            makeText(svcCard, svcData[1], { size: 20, weight: 'Bold', color: '#1F2937' });
            makeText(svcCard, svcData[2], { size: 15, weight: 'Regular', color: '#6B7280', w: 320 });
        }
    }

    // -------------------------------------------------------- BENEFICIOS
    var benefits = section(landing, {
        name: 'Beneficios', bg: '#FFFFFF', h: 640
    });
    sectionTitle(benefits, 'Beneficios para todos', 'Diseñado pensando tanto en clientes como en trabajadores');
    var benRow = makeFrame(benefits, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 48, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    benRow.fills = [];
    var benGroups = [
        ['🎯 Para Clientes', [
            'Ahorra tiempo buscando profesionales verificados',
            'Precios transparentes y competitivos',
            'Protección con pagos seguros',
            'Acceso a calificaciones reales de otros usuarios',
            'Atención inmediata y geolocalización precisa',
            'Garantía de satisfacción en cada servicio'
        ]],
        ['💼 Para Trabajadores', [
            'Acceso a más clientes sin costo de marketing',
            'Recibe pagos de forma segura y rápida',
            'Construye tu reputación profesional',
            'Capacitación gratuita y certificaciones',
            'Flexibilidad para elegir tus horarios',
            'Camino hacia la formalización laboral'
        ]]
    ];
    for (var bg_ = 0; bg_ < benGroups.length; bg_++) {
        var benCol = makeFrame(benRow, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO',
            w: 520
        });
        benCol.fills = [];
        makeText(benCol, benGroups[bg_][0], {
            size: 24, weight: 'Bold', color: '#6366F1', align: 'CENTER', w: 520
        });
        var items = benGroups[bg_][1];
        for (var it = 0; it < items.length; it++) {
            var itmFrame = makeFrame(benCol, {
                bg: '#F3F4F6', radius: 8,
                dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                padding: 16, gap: 8,
                primarySizing: 'AUTO', counterSizing: 'FIXED',
                w: 520
            });
            // Border-left 4px primary
            itmFrame.strokes = [solidFill('#6366F1')];
            itmFrame.strokeWeight = 0;
            itmFrame.strokeLeftWeight = 4;
            itmFrame.strokeAlign = 'INSIDE';
            makeText(itmFrame, items[it], { size: 15, weight: 'Regular', color: '#1F2937' });
        }
    }

    // -------------------------------------------------------- CARACTERÍSTICAS
    var features = section(landing, {
        name: 'Características', bg: '#F3F4F6', h: 760
    });
    sectionTitle(features, 'Características que nos hacen únicos', 'Tecnología de punta al servicio de la comunidad');
    var featGrid = makeFrame(features, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    featGrid.fills = [];
    var featData = [
        ['📍', 'Geolocalización',       'Encuentra profesionales cerca de tu ubicación en tiempo real'],
        ['⭐', 'Sistema de Reputación', 'Calificaciones transparentes basadas en experiencias reales'],
        ['🔒', 'Pagos Seguros',         'Transacciones protegidas con reembolso garantizado'],
        ['✅', 'Perfiles Verificados',  'Verificación de identidad y habilidades de cada profesional'],
        ['🎓', 'Capacitación',          'Cursos gratuitos para mejorar tus habilidades y certificaciones'],
        ['💬', 'Chat Integrado',        'Comunicación directa y segura entre clientes y trabajadores']
    ];
    for (var fr = 0; fr < 2; fr++) {
        var fRow = makeFrame(featGrid, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'MIN',
            gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        fRow.fills = [];
        for (var fc = 0; fc < 3; fc++) {
            var fd = featData[fr * 3 + fc];
            var fCard = card(fRow, { w: 376, center: true, padding: 32, gap: 16 });
            iconCircle(fCard, 80, null, fd[0], '#FFFFFF', ['#EC4899', '#10B981', 135]);
            makeText(fCard, fd[1], { size: 22, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 312 });
            makeText(fCard, fd[2], { size: 15, weight: 'Regular', color: '#6B7280', align: 'CENTER', w: 312 });
        }
    }

    // -------------------------------------------------------- TRABAJADORES (US-08)
    var workers = section(landing, {
        name: 'Trabajadores', bg: '#F3F4F6', h: 560
    });
    var workRow = makeFrame(workers, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 64, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    workRow.fills = [];
    var workLeft = makeFrame(workRow, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO',
        w: 620
    });
    workLeft.fills = [];
    chip(workLeft, 'Para trabajadores independientes', '#818CF8', '#FFFFFF');
    makeText(workLeft, 'Más clientes, pagos seguros y reputación que crece contigo', {
        size: 36, weight: 'Bold', color: '#1F2937', w: 620
    });
    makeText(workLeft, 'Si eres electricista, gasfitero, pintor, cerrajero o técnico, Ya Quedó te conecta con clientes verificados de tu zona. Tú defines tus tarifas, nosotros garantizamos el cobro.', {
        size: 16, weight: 'Regular', color: '#6B7280', w: 620
    });
    var workerBenefits = [
        ['👥', 'Flujo constante de clientes en tu distrito'],
        ['🛡', 'Pago garantizado por cada servicio completado'],
        ['🏅', 'Insignias y ranking que aumentan tu visibilidad'],
        ['🎓', 'Capacitaciones gratuitas con certificación'],
        ['📱', 'Agenda y cotizaciones desde tu celular']
    ];
    var workList = makeFrame(workLeft, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 10, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    workList.fills = [];
    for (var wb = 0; wb < workerBenefits.length; wb++) {
        var wRow = makeFrame(workList, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        wRow.fills = [];
        iconCircle(wRow, 32, null, workerBenefits[wb][0], '#FFFFFF', ['#EC4899', '#10B981', 135]);
        makeText(wRow, workerBenefits[wb][1], { size: 16, weight: 'Regular', color: '#1F2937' });
    }
    button(workLeft, 'Quiero ofrecer mis servicios', 'primary');

    var workRight = makeFrame(workRow, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO',
        w: 380
    });
    workRight.fills = [];
    var stats = [
        ['+40%', 'Ingresos promedio tras 3 meses en la plataforma'],
        ['48h',  'Tiempo máximo de verificación de identidad'],
        ['0%',   'Costo de registro y uso básico de la plataforma']
    ];
    for (var sx = 0; sx < stats.length; sx++) {
        var statCard = card(workRight, {
            w: 380, padding: 24, gap: 4, shadow: 'Shadow/md'
        });
        // Border-left 4px primary
        statCard.strokes = [solidFill('#6366F1')];
        statCard.strokeWeight = 0;
        statCard.strokeLeftWeight = 4;
        statCard.strokeAlign = 'INSIDE';
        makeText(statCard, stats[sx][0], { size: 36, weight: 'Extra Bold', color: '#6366F1' });
        makeText(statCard, stats[sx][1], { size: 15, weight: 'Regular', color: '#6B7280', w: 310 });
    }

    // -------------------------------------------------------- IMPACTO
    var impact = section(landing, {
        name: 'Impacto', bgGradient: ['#6366F1', '#4F46E5', 135], h: 520, gap: 32
    });
    sectionTitle(impact, 'Impacto social real',
        'No solo somos una plataforma tecnológica, somos un movimiento para transformar la economía informal en oportunidades reales.',
        true);
    var statGrid = makeFrame(impact, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 48, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    statGrid.fills = [];
    var impactStats = [['60%+', 'Trabajadores informales en LATAM'], ['2M+', 'Servicios conectados'], ['15', 'Países en expansión'], ['98%', 'Satisfacción de usuarios']];
    for (var ist = 0; ist < impactStats.length; ist++) {
        var stItem = makeFrame(statGrid, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        stItem.fills = [];
        makeText(stItem, impactStats[ist][0], {
            size: 56, weight: 'Extra Bold', color: '#FFFFFF', align: 'CENTER'
        });
        makeText(stItem, impactStats[ist][1], {
            size: 14, weight: 'Regular', color: '#FFFFFF', opacity: 0.9, align: 'CENTER', w: 180
        });
    }

    // -------------------------------------------------------- TESTIMONIOS (US-04)
    var testimonials = section(landing, {
        name: 'Testimonios', bg: '#F3F4F6', h: 580
    });
    sectionTitle(testimonials, 'Lo que dicen nuestros usuarios', 'Historias reales de transformación y éxito');
    var testGrid = makeFrame(testimonials, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    testGrid.fills = [];
    var testData = [
        ['"Gracias a Ya Quedó pasé de tener 2 clientes por semana a más de 20. Mi ingreso se triplicó y ahora puedo darles mejor futuro a mis hijos."',
         'MC', 'María Carmen Rodríguez', 'Electricista · San Miguel, Lima'],
        ['"Encontré un gasfitero confiable en 10 minutos. El servicio fue excelente, el precio justo y la plataforma me protegió de principio a fin."',
         'JL', 'Juan López', 'Cliente · Surco, Lima'],
        ['"La capacitación que me dieron me ayudó a profesionalizar mi servicio. Ahora tengo insignia Top Rated y los clientes me prefieren por eso."',
         'RG', 'Roberto Gómez', 'Técnico · Los Olivos, Lima']
    ];
    for (var td = 0; td < testData.length; td++) {
        var tCard = card(testGrid, { w: 376, padding: 32, gap: 20 });
        makeText(tCard, '"', { size: 48, weight: 'Bold', color: '#6366F1', opacity: 0.3 });
        makeText(tCard, testData[td][0], {
            size: 15, weight: 'Regular', color: '#1F2937', w: 312
        });
        var authorRow = makeFrame(tCard, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        authorRow.fills = [];
        iconCircle(authorRow, 48, null, testData[td][1], '#FFFFFF', ['#EC4899', '#10B981', 135]);
        var authorInfo = makeFrame(authorRow, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        authorInfo.fills = [];
        makeText(authorInfo, testData[td][2], { size: 16, weight: 'Bold', color: '#1F2937' });
        makeText(authorInfo, testData[td][3], { size: 13, weight: 'Regular', color: '#6B7280' });
    }

    // -------------------------------------------------------- FAQ (US-06)
    var faq = section(landing, {
        name: 'FAQ', bg: '#FFFFFF', h: 720
    });
    sectionTitle(faq, 'Preguntas frecuentes', 'Resolvemos las dudas más comunes antes de que empieces a usar Ya Quedó');
    var faqList = makeFrame(faq, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    faqList.fills = [];
    var faqs = [
        ['¿Cómo sé que un trabajador es confiable?', 'Todos los trabajadores pasan por un proceso de verificación de DNI y selfie. Sus reseñas provienen únicamente de servicios ejecutados a través de la plataforma.'],
        ['¿Cuánto cuesta registrarme?', 'El registro es totalmente gratuito. Solo cobramos una comisión por servicio completado al trabajador.'],
        ['¿Qué medios de pago aceptan?', 'Aceptamos Yape, Plin, tarjetas de débito y crédito. El dinero se retiene hasta que confirmes que el servicio fue ejecutado correctamente.'],
        ['¿Qué pasa si el servicio sale mal?', 'Puedes reportarlo desde la app. Nuestro equipo de soporte media la disputa y, si corresponde, retenemos los fondos hasta resolver el caso.'],
        ['¿En qué zonas opera Ya Quedó?', 'Iniciamos en Lima Metropolitana con expansión a Arequipa, Trujillo y Chiclayo en las siguientes fases.'],
        ['¿Cómo obtengo la insignia Top Rated?', 'Al mantener una calificación promedio ≥ 4.8 con al menos 20 servicios completados obtienes la insignia automáticamente.']
    ];
    for (var fq = 0; fq < faqs.length; fq++) {
        var faqItem = makeFrame(faqList, {
            bg: fq === 0 ? '#FFFFFF' : '#F3F4F6',
            radius: 12,
            dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 8, padding: 20,
            primarySizing: 'AUTO', counterSizing: 'FIXED',
            w: 820,
            shadow: fq === 0 ? 'Shadow/md' : null
        });
        var qRow = makeFrame(faqItem, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'FIXED',
            w: 780
        });
        qRow.fills = [];
        makeText(qRow, faqs[fq][0], { size: 17, weight: 'Semi Bold', color: '#1F2937', w: 740 });
        makeText(qRow, fq === 0 ? '−' : '+', { size: 24, weight: 'Bold', color: '#6366F1' });
        if (fq === 0) {
            makeText(faqItem, faqs[fq][1], { size: 15, weight: 'Regular', color: '#6B7280', w: 780 });
        }
    }

    // -------------------------------------------------------- PRE-REGISTRO (US-05)
    var preReg = section(landing, {
        name: 'Pre-registro', bgGradient: ['#EC4899', '#10B981', 135], h: 720
    });
    var formCard = makeFrame(preReg, {
        bg: '#FFFFFF',
        radius: 20,
        dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        padding: 40, gap: 20,
        primarySizing: 'AUTO', counterSizing: 'FIXED',
        w: 820,
        shadow: 'Shadow/xl'
    });
    var fHead = makeFrame(formCard, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 8, primarySizing: 'AUTO', counterSizing: 'FIXED',
        w: 740
    });
    fHead.fills = [];
    makeText(fHead, 'Déjanos tus datos y te avisamos cuando abramos el registro', {
        size: 28, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 740
    });
    makeText(fHead, 'Serás de los primeros en acceder y recibirás un beneficio exclusivo de lanzamiento.', {
        size: 15, weight: 'Regular', color: '#6B7280', align: 'CENTER', w: 740
    });

    // Toggle cliente / trabajador
    var toggle = makeFrame(formCard, {
        bg: '#F3F4F6', radius: 12,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        padding: 4, gap: 4,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 740
    });
    var togCli = makeFrame(toggle, {
        bg: '#FFFFFF', radius: 8,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 12, gap: 8,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 365, shadow: 'Shadow/sm'
    });
    makeText(togCli, '👤 Soy cliente', { size: 14, weight: 'Semi Bold', color: '#6366F1' });
    var togTra = makeFrame(toggle, {
        bg: null, radius: 8,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 12, gap: 8,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 365
    });
    togTra.fills = [];
    makeText(togTra, '💼 Soy trabajador', { size: 14, weight: 'Semi Bold', color: '#6B7280' });

    // Form fields (2 filas × 2 columnas)
    var fieldLabels = [
        ['Nombre completo', 'Correo electrónico'],
        ['Teléfono (WhatsApp)', 'Distrito']
    ];
    var placeholders = [
        ['', 'tu@correo.com'],
        ['+51 9XX XXX XXX', 'Selecciona tu distrito ▾']
    ];
    for (var row_ = 0; row_ < 2; row_++) {
        var fRow_ = makeFrame(formCard, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 16, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 740
        });
        fRow_.fills = [];
        for (var col = 0; col < 2; col++) {
            var fBlock = makeFrame(fRow_, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'MIN',
                gap: 6, primarySizing: 'AUTO', counterSizing: 'FIXED',
                w: 362
            });
            fBlock.fills = [];
            makeText(fBlock, fieldLabels[row_][col], { size: 14, weight: 'Semi Bold', color: '#1F2937' });
            var input = makeFrame(fBlock, {
                bg: '#FFFFFF',
                stroke: '#E5E7EB', strokeWeight: 1,
                radius: 8,
                dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                paddingV: 12, paddingH: 14,
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 362
            });
            makeText(input, placeholders[row_][col], { size: 15, weight: 'Regular', color: '#9CA3AF' });
        }
    }

    // Checkbox consentimiento
    var consent = makeFrame(formCard, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 8, primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 740
    });
    consent.fills = [];
    var cbox = makeFrame(consent, {
        bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1,
        radius: 4, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 18, h: 18
    });
    makeText(consent, 'Acepto los Términos y la Política de privacidad.', { size: 14, weight: 'Regular', color: '#6B7280' });

    // Botón submit ancho full
    var submitBtn = makeFrame(formCard, {
        bg: null, bgGradient: ['#6366F1', '#4F46E5', 135],
        radius: 8,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 16,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 740,
        shadow: 'Shadow/md'
    });
    makeText(submitBtn, 'Quiero ser de los primeros', { size: 16, weight: 'Semi Bold', color: '#FFFFFF' });

    // -------------------------------------------------------- FOOTER
    var footer = section(landing, {
        name: 'Footer', bg: '#1F2937', h: 380, padV: 48, gap: 32
    });
    var footCols = makeFrame(footer, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 48, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    footCols.fills = [];
    var footData = [
        { title: 'Ya Quedó', items: ['Transformando el mercado de servicios locales en el Perú.', '', '🔵 f  t  in  ig'] },
        { title: 'Enlaces rápidos', items: ['Inicio', 'Cómo funciona', 'Beneficios', 'Testimonios'] },
        { title: 'Servicios', items: ['Electricistas', 'Gasfiteros', 'Cuidadores', 'Técnicos'] },
        { title: 'Contacto', items: ['hola@yaquedo.com', '+51 9XX XXX XXX', 'Centro de ayuda'] },
        { title: 'Legal', items: ['Términos y condiciones', 'Política de privacidad', 'Política de cookies', 'Libro de reclamaciones'] }
    ];
    for (var fc = 0; fc < footData.length; fc++) {
        var fCol = makeFrame(footCols, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO',
            w: 200
        });
        fCol.fills = [];
        makeText(fCol, footData[fc].title, { size: 18, weight: 'Bold', color: '#818CF8' });
        for (var fi = 0; fi < footData[fc].items.length; fi++) {
            if (!footData[fc].items[fi]) continue;
            makeText(fCol, footData[fc].items[fi], {
                size: 14, weight: 'Regular', color: '#FFFFFF', opacity: 0.8, w: 200
            });
        }
    }
    var footBottom = makeFrame(footer, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 0, primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 1376, paddingV: 16
    });
    footBottom.fills = [];
    footBottom.strokes = [solidFill('#FFFFFF', 0.1)];
    footBottom.strokeTopWeight = 1;
    footBottom.strokeWeight = 0;
    footBottom.strokeAlign = 'INSIDE';
    makeText(footBottom, '© 2026 Ya Quedó · TetraDev. Todos los derechos reservados.', {
        size: 13, weight: 'Regular', color: '#FFFFFF', opacity: 0.8, align: 'CENTER'
    });

    // =========================================================================
    // 9) MOBILE LANDING — esqueleto con labels (el usuario lo rellena siguiendo
    //    04-screens-mobile.md usando el mismo esquema del desktop)
    // =========================================================================
    var mobile = figma.createFrame();
    mobile.name = '📱 Mobile · Landing';
    mobile.resize(375, 10);
    mobile.x = 1600; mobile.y = 0;
    mobile.fills = [solidFill('#FFFFFF')];
    mobile.layoutMode = 'VERTICAL';
    mobile.primaryAxisSizingMode = 'AUTO';
    mobile.counterAxisSizingMode = 'FIXED';
    mobile.primaryAxisAlignItems = 'MIN';
    mobile.counterAxisAlignItems = 'CENTER';
    mobile.clipsContent = true;

    var mobileSections = [
        ['Navbar',        70,   '#FFFFFF', '#1F2937'],
        ['Hero',          480,  null,      '#FFFFFF', ['#667EEA', '#764BA2', 135]],
        ['Problema',      720,  '#F3F4F6', '#1F2937'],
        ['Solución',      680,  '#FFFFFF', '#1F2937'],
        ['Cómo funciona', 1200, '#F3F4F6', '#1F2937'],
        ['Servicios',     1400, '#FFFFFF', '#1F2937'],
        ['Beneficios',    1400, '#FFFFFF', '#1F2937'],
        ['Características', 1800, '#F3F4F6', '#1F2937'],
        ['Trabajadores',  1100, '#F3F4F6', '#1F2937'],
        ['Impacto',       700,  null,      '#FFFFFF', ['#6366F1', '#4F46E5', 135]],
        ['Testimonios',   900,  '#F3F4F6', '#1F2937'],
        ['FAQ',           900,  '#FFFFFF', '#1F2937'],
        ['Pre-registro',  900,  null,      '#FFFFFF', ['#EC4899', '#10B981', 135]],
        ['Footer',        850,  '#1F2937', '#FFFFFF']
    ];
    for (var ms = 0; ms < mobileSections.length; ms++) {
        var msData = mobileSections[ms];
        var mSec = makeFrame(mobile, {
            name: msData[0],
            w: 375, h: msData[1],
            bg: msData[2],
            bgGradient: msData[4] || null,
            dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(mSec, msData[0], { size: 18, weight: 'Bold', color: msData[3] });
    }

    // =========================================================================
    // 10) FINAL — zoom y cierre
    // =========================================================================
    try {
        figma.viewport.scrollAndZoomIntoView([landing]);
    } catch (e) { /* noop */ }

    figma.closePlugin('✅ Ya Quedó v2 listo: Design System + Button/Primary + Button/Secondary + Navbar/Desktop + Desktop Landing con 14 secciones pobladas + Mobile Landing skeleton. Revisa el panel Assets para ver los styles.');
})().catch(function (err) {
    var msg = err && err.message ? err.message : String(err);
    console.error(err);
    figma.closePlugin('❌ Error: ' + msg);
});
