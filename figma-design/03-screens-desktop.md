# 03 — Breakdown de Pantalla Desktop (1440px)

Frame maestro: **1440 × ~8500**. Usa Auto Layout vertical con gap 0 (cada sección controla su propio padding).

Contenido máximo: 1200px centrado (el resto es padding lateral 32px).

**Orden final de secciones (post-adaptación US-01 a US-10):**
1. Navbar · 2. Hero · 3. Problema · 4. Solución · 5. Cómo funciona ·
6. **Servicios (US-03)** · 7. Beneficios · 8. Características ·
9. **Trabajadores (US-08)** · 10. Impacto · 11. Testimonios (US-04) ·
12. **FAQ (US-06)** · 13. **Pre-registro (US-05)** · 14. Footer (US-07)

---

## 1. Navbar (fijo, top)
- **Alto**: 70px
- **Posición**: sticky top: 0, ancho 100%
- **Links**: Inicio · Servicios · Cómo funciona · Trabajadores · FAQ · Iniciar sesión · [Registrarse]
- **Ver componente `Navbar` en 02-components.md**

---

## 2. Hero `#inicio`
- **Alto**: ~620px
- **Background**: `gradient/hero` (#667EEA → #764BA2, 135°)
- **Padding**: 128px 32px 64px (top: 128 para dejar respirar del navbar fijo)
- **Contenido centrado** (max-width 900, text-align center, Auto Layout vertical gap 24px):
  - **H1**: "Encuentra el servicio que necesitas, al instante" — `text/h1` en blanco
  - **Subtitle**: "Conectamos personas con trabajadores independientes de confianza en toda Latinoamérica. Rápido, seguro y transparente." — `text/body-lg` blanco 90%
  - **Botones** (Auto Layout horizontal gap 16px):
    - `Button / primary` → "Buscar servicio"
    - `Button / secondary` (variante invertida: fondo blanco, texto primary) → "Ofrecer mis servicios"
- **Decoración**: onda SVG blanca en el bottom (ver `assets/hero-wave.svg`)

---

## 3. Problema `#problema`
- **Alto**: ~540px
- **Background**: `color/light-gray`
- **Padding vertical**: 80px
- **Header** (center, gap 16px, margin-bottom 48px):
  - **H2**: "El desafío que enfrentamos"
  - **Subtítulo**: "La informalidad laboral en Latinoamérica afecta a millones de trabajadores"
- **Grid de 3 columnas** (gap 32px):
  1. **Card/Problem** — ícono 🔍 | "Dificultad para encontrar servicios" | "Los clientes pierden tiempo y esfuerzo buscando profesionales confiables y verificados."
  2. **Card/Problem** — ícono 💲 | "Precios poco transparentes" | "Falta de claridad en los costos y temor a estafas o trabajos mal ejecutados."
  3. **Card/Problem** — ícono 💼 | "Informalidad laboral" | "Más del 60% de los trabajadores en LATAM no tienen acceso a beneficios laborales ni formalización."

---

## 4. Solución `#solucion`
- **Alto**: ~480px
- **Background**: `white`
- **Padding vertical**: 80px
- **Layout**: Grid de 2 columnas, gap 64px, align center

**Columna izquierda** (Auto Layout vertical, gap 16px):
- **Eyebrow**: "La solución: Ya Quedó" — `text/h3` en `color/primary`
- **H2**: "Transformando la forma de conectar servicios locales"
- **Párrafo**: descripción en `color/gray`
- **Lista de features** (cada ítem: ✓ verde + texto `text/body`):
  1. Verificación de identidad y habilidades
  2. Sistema de calificación transparente
  3. Pagos seguros y garantizados
  4. Capacitación y certificación interna
  5. Geolocalización precisa

**Columna derecha** (card decorativa):
- **Size**: 568 × 320
- **Background**: `gradient/primary`, radius 16px, padding 32px, texto blanco center
- **Contenido** (gap 16px, center):
  - "YQ" — 48px/700 blanco
  - "Tecnología para el progreso" — `text/h4` blanco
  - Párrafo: "Utilizamos IA y algoritmos avanzados para conectar las personas correctas" — `text/body` en `color/dark` (revisar: en la página actual aparece en negro)

---

## 5. Cómo Funciona `#como-funciona`
- **Alto**: ~540px
- **Background**: `color/light-gray`
- **Padding vertical**: 80px
- **Header** (center):
  - **H2**: "Así de fácil funciona"
  - **Subtítulo**: "En solo 4 pasos simples puedes encontrar o ofrecer servicios"
- **Grid de 4 columnas** (gap 32px, margin-top 48px):
  1. **Card/Step** — número 1 · ícono 👤➕ · "Regístrate gratis" · "Crea tu perfil en menos de 2 minutos. Verificamos tu identidad para mayor seguridad."
  2. **Card/Step** — número 2 · ícono 🔍📍 · "Busca o publica" · "Encuentra profesionales cercanos o publica tu servicio. Nuestro algoritmo te conecta al instante."
  3. **Card/Step** — número 3 · ícono 🤝 · "Coordina y confirma" · "Chatea directamente, acuerda detalles y confirma el servicio con pago seguro."
  4. **Card/Step** — número 4 · ícono ⭐ · "Califica y repite" · "Al finalizar, califica el servicio y ayuda a construir una comunidad más confiable."

---

## 5b. Servicios `#servicios` (US-03)
- **Alto**: ~540px
- **Background**: `white`
- **Padding vertical**: 80px
- **Header** (center):
  - **H2**: "Servicios disponibles"
  - **Subtítulo**: "Más de 6 categorías iniciales para resolver lo que necesites en casa"
- **Grid de 3 columnas × 2 filas** (gap 24px):
  Cada tarjeta es un `Service Card` (componente nuevo):
  - **Size**: 376 × 190
  - **Background**: `white`, border 1px `color/light-gray`, radius 16px
  - **Padding**: 32px
  - **Contenido** vertical gap 12px:
    - **Ícono cuadrado** 56×56, radius 12px, `gradient/primary`, ícono blanco 24px
    - **H3** 20px
    - **Descripción** `text/body` en `color/gray`
  - **Hover**: translateY -4px, shadow-lg, border `primary-light`
  Categorías (mismos textos que el HTML):
  1. ⚡ Electricidad — "Instalación, reparación y mantenimiento eléctrico certificado."
  2. 🔧 Gasfitería — "Fugas, desatoros y reparación de tuberías con garantía."
  3. 🎨 Pintura — "Interiores y exteriores con acabados profesionales."
  4. 🔑 Cerrajería — "Emergencias 24/7, cambio de cerraduras y llaves."
  5. 🧯 Electrodomésticos — "Reparación de lavadoras, refrigeradoras, microondas y más."
  6. 🧹 Limpieza técnica — "Limpieza profunda de tanques, aires acondicionados y fachadas."
- **Interacción (prototype)**: cada card → scroll al formulario de pre-registro con `data-service` pre-llenado.

---

## 6. Beneficios `#beneficios`
- **Alto**: ~640px
- **Background**: `white`
- **Padding vertical**: 80px
- **Header** (center):
  - **H2**: "Beneficios para todos"
  - **Subtítulo**: "Diseñado pensando tanto en clientes como en trabajadores"
- **Grid de 2 columnas** (gap 64px, margin-top 48px):

**Para Clientes** (🎯 ícono + H3 "Para Clientes" center, color/primary)
Lista de 6 `Card/Benefit Item`:
- Ahorra tiempo buscando profesionales verificados
- Precios transparentes y competitivos
- Protección con pagos seguros
- Acceso a calificaciones reales de otros usuarios
- Atención inmediata y geolocalización precisa
- Garantía de satisfacción en cada servicio

**Para Trabajadores** (💼 ícono + H3 "Para Trabajadores" center, color/primary)
Lista de 6 `Card/Benefit Item`:
- Acceso a más clientes sin costo de marketing
- Recibe pagos de forma segura y rápida
- Construye tu reputación profesional
- Capacitación gratuita y certificaciones
- Flexibilidad para elegir tus horarios
- Camino hacia la formalización laboral

---

## 7. Características `#caracteristicas`
- **Alto**: ~680px
- **Background**: `color/light-gray`
- **Padding vertical**: 80px
- **Header** (center):
  - **H2**: "Características que nos hacen únicos"
  - **Subtítulo**: "Tecnología de punta al servicio de la comunidad"
- **Grid de 3 columnas** × 2 filas (gap 32px):
  1. 📍 Geolocalización — "Encuentra profesionales cerca de tu ubicación en tiempo real"
  2. ⭐ Sistema de Reputación — "Calificaciones transparentes basadas en experiencias reales"
  3. 🔒 Pagos Seguros — "Transacciones protegidas con reembolso garantizado"
  4. ✅ Perfiles Verificados — "Verificación de identidad y habilidades de cada profesional"
  5. 🎓 Capacitación — "Cursos gratuitos para mejorar tus habilidades y certificaciones"
  6. 💬 Chat Integrado — "Comunicación directa y segura entre clientes y trabajadores"

---

## 7b. Trabajadores `#trabajadores` (US-08)
- **Alto**: ~540px
- **Background**: `color/light-gray`
- **Padding vertical**: 80px
- **Layout**: Grid 1.3fr / 1fr (gap 64px, align center)

**Columna izquierda** (texto + CTA):
- **Eyebrow pill**: "Para trabajadores independientes" — fondo `primary-light`, blanco, radius 999px, padding 6/12
- **H2**: "Más clientes, pagos seguros y reputación que crece contigo"
- **Párrafo**: en `color/gray`
- **Lista de 5 beneficios** (gap 12px):
  Cada ítem = ícono circular 32×32 con `gradient/accent` + texto `text/body` en `color/dark`:
  - 👥 "Flujo constante de clientes en tu distrito"
  - 🛡 "Pago garantizado por cada servicio completado"
  - 🏅 "Insignias y ranking que aumentan tu visibilidad"
  - 🎓 "Capacitaciones gratuitas con certificación"
  - 📱 "Agenda y cotizaciones desde tu celular"
- **Botón primario** "Quiero ofrecer mis servicios" (`data-user-type=trabajador` → prototype: scroll al form y activar toggle "Soy trabajador")

**Columna derecha** (3 stat cards apilados, gap 16px):
- Card blanco, radius 16px, padding 24px, `shadow/md`, border-left 4px `primary`:
  - **+40%** (grande, `primary`) — "Ingresos promedio tras 3 meses en la plataforma"
  - **48h** — "Tiempo máximo de verificación de identidad"
  - **0%** — "Costo de registro y uso básico de la plataforma"

---

## 8. Impacto Social `#impacto`
- **Alto**: ~480px
- **Background**: `gradient/primary`
- **Padding vertical**: 80px
- **Decoración**: círculo blanco 500×500 con 10% opacidad, posición top-right -50% / right -10% (clippeado al container)
- **Contenido** (centrado, max-width 800, gap 24px):
  - **H2**: "Impacto social real" — blanco
  - **Párrafo**: "No solo somos una plataforma tecnológica, somos un movimiento para transformar la economía informal en oportunidades reales de progreso." — blanco
- **Grid de 4 stats** (gap 32px, margin-top 48px):
  - **60%+** — "Trabajadores informales en LATAM"
  - **2M+** — "Servicios conectados"
  - **15** — "Países en expansión"
  - **98%** — "Satisfacción de usuarios"

---

## 9. Testimonios `#testimonios`
- **Alto**: ~540px
- **Background**: `color/light-gray`
- **Padding vertical**: 80px
- **Header** (center):
  - **H2**: "Lo que dicen nuestros usuarios"
  - **Subtítulo**: "Historias reales de transformación y éxito"
- **Grid de 3 columnas** (gap 32px, margin-top 48px):
  1. **Card/Testimonial** — texto sobre pasar de 2 a 20 clientes · avatar "MC" · **María Carmen Rodríguez** · Electricista - México DF
  2. **Card/Testimonial** — texto sobre encontrar plomero en 10 min · avatar "JL" · **Juan López** · Cliente - Buenos Aires
  3. **Card/Testimonial** — texto sobre capacitación · avatar "RG" · **Roberto Gómez** · Técnico - Bogotá

---

## 9b. Testimonios — detalle actualizado (US-04)
- Mismo layout que antes pero **agrega distrito** en author info:
  - **María Carmen Rodríguez** — "Electricista · San Miguel, Lima"
  - **Juan López** — "Cliente · Surco, Lima"
  - **Roberto Gómez** — "Técnico · Los Olivos, Lima"
- **Estado activo** (rotación 5s): el testimonio activo gana `translateY(-6px)` + `shadow/xl` + borde top 3px `primary`.
- En Figma: crear **variant `active`** del componente `Card/Testimonial` y prototipar con **Smart Animate** o documentar el comportamiento en una nota flotante.

---

## 10. FAQ `#faq` (US-06)
- **Alto**: ~640px
- **Background**: `white`
- **Padding vertical**: 80px
- **Header** (center):
  - **H2**: "Preguntas frecuentes"
  - **Subtítulo**: "Resolvemos las dudas más comunes antes de que empieces a usar Ya Quedó"
- **Lista de 6 FAQ items** (max-width 820, gap 12px):
  Componente nuevo `FAQ Item`:
  - **Estado cerrado**: fondo `light-gray`, radius 12px, padding 20px, summary con texto 600 + símbolo `+` `primary`
  - **Estado abierto**: fondo `white`, `shadow/md`, símbolo `−` `primary`, texto respuesta `text/body` `color/gray`
  - **Variants**: `closed` / `open`
- **Preguntas** (usar los textos del HTML):
  1. ¿Cómo sé que un trabajador es confiable?
  2. ¿Cuánto cuesta registrarme?
  3. ¿Qué medios de pago aceptan?
  4. ¿Qué pasa si el servicio sale mal?
  5. ¿En qué zonas opera Ya Quedó?
  6. ¿Cómo obtengo la insignia Top Rated como trabajador?

---

## 11. Pre-registro `#pre-registro` (US-05, US-08 CTA dual)
- **Alto**: ~720px
- **Background**: `gradient/accent` (rosa → verde)
- **Padding vertical**: 80px
- **Card central** (max-width 820, blanco, radius 20px, `shadow/xl`, padding 40px):

**Header**:
- **H2**: "Déjanos tus datos y te avisamos cuando abramos el registro" (center, `color/dark`)
- **Párrafo**: "Serás de los primeros en acceder y recibirás un beneficio exclusivo de lanzamiento."

**Toggle segmentado** (tab bar, 2 opciones, fondo `light-gray`, radius 12px):
- **Soy cliente** (default activo, fondo `white`, texto `primary`, ícono 👤)
- **Soy trabajador** (inactivo, texto `gray`, ícono 💼)
- Variants: `usuario / trabajador`

**Campos** (Auto Layout vertical, gap 16px):
- Fila 1 (2 columnas): `Nombre completo` · `Correo electrónico`
- Fila 2 (2 columnas): `Teléfono (WhatsApp)` · `Distrito` (select)
- Campo condicional (solo si `trabajador`): `Oficio principal` (select)
- Checkbox: "Acepto los Términos y la Política de privacidad."
- Botón primario ancho full: "Quiero ser de los primeros"
- Línea de feedback (success/error) bajo el botón

**Estados del input**:
- default: border 1px `#E5E7EB`
- focus: border `primary` + ring `rgba(99,102,241,0.15)`
- invalid: border `#EF4444`

**Comportamiento** (prototipo):
- Click en toggle → cambia estado activo y oculta/muestra campo `Oficio principal`
- Submit sin errores → toast/feedback verde "¡Listo! Te avisaremos…"
- Email ya registrado → feedback "Ya estás en la lista. Te avisaremos pronto." (criterio alternativo)
- Error de red → feedback rojo "No pudimos enviar tu solicitud. Intenta nuevamente." (criterio error)

---

## 12. Footer
- **Alto**: ~380px
- **Background**: `color/dark` (#1F2937)
- **Padding**: 48px 32px 16px
- **Grid de 5 columnas** (gap 32px) — agregamos columna `Legal`:

**Columna 1 — Brand**
- **H3**: "Ya Quedó" (en `color/primary-light`)
- **Párrafo**: "Transformando el mercado de servicios locales en Latinoamérica." (blanco 80%)
- **Social links** (gap 16px): Facebook, Twitter, LinkedIn, Instagram (ver componente `Social Link`)

**Columna 2 — Enlaces rápidos**
- **H3**: "Enlaces rápidos"
- Links: Inicio, Cómo funciona, Beneficios, Testimonios

**Columna 3 — Servicios**
- **H3**: "Servicios"
- Links: Electricistas, Plomeros, Cuidadores, Técnicos

**Columna 4 — Contacto**
- **H3**: "Contacto"
- Links: hola@yaquedo.com, +51 9XX XXX XXX, Centro de ayuda

**Columna 5 — Legal (US-07)**
- **H3**: "Legal"
- Links: Términos y condiciones, Política de privacidad, Política de cookies, Libro de reclamaciones

**Footer bottom** (centrado, padding-top 32px, border-top 1px blanco 10%):
- "© 2026 Ya Quedó · TetraDev. Todos los derechos reservados." (blanco 80%)
