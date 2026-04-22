# Ya Quedó — Paquete de Diseño & Documentación TB1

Todo el material necesario para completar las secciones **Ch. III (Backlog)** y **Ch. IV (Product Design)** del informe TB1, más el diseño de la Web App (Material Design / Angular Material) que se implementará en sprints posteriores.

## Estructura

```
figma-design/
├── README.md                       ← este archivo (índice)
├── screenshots/
│   ├── desktop-full.png            ← landing completa 1440px
│   ├── desktop-navbar.png          ← navbar + hero (muestra switcher ES/EN)
│   └── mobile-full.png             ← landing completa 375px
├── assets/
│   ├── logo.svg
│   ├── favicon.svg
│   ├── hero-wave.svg
│   ├── color-palette.svg
│   └── gradients-swatches.svg
├── 01-design-system.md             ← tokens del landing (colores, tipografía, sombras, radios)
├── 02-components.md                ← componentes base del landing
├── 03-screens-desktop.md           ← landing @ 1440px — 14 secciones
├── 04-screens-mobile.md            ← landing @ 375px
├── 05-figma-build-guide.md         ← guía paso a paso para armar el archivo Figma
├── 06-internal-app-screens.md      ← 22 pantallas de la Web App en Material Design (US-11 a US-26)
├── 07-wireframes-lowfi.md          ← cómo armar los wireframes de baja fidelidad
├── 08-us-traceability.md           ← matriz User Stories ↔ frames Figma (100% cobertura)
├── 09-information-architecture.md  ← 4.2.1–4.2.5 (Organization, Labeling, Searching, Navigation, Site Map)
└── 10-user-flows.md                ← 8 User Flows con happy + unhappy paths (4.4.3)
```

## Mapeo al índice del informe TB1

| Sección TB1 | Archivo fuente |
|---|---|
| **3.1 Product Backlog** | validado en [08-us-traceability.md](./08-us-traceability.md) |
| **4.1 Style Guidelines** | [01-design-system.md](./01-design-system.md) |
| **4.2.1 Organization Systems** | [09-information-architecture.md](./09-information-architecture.md) |
| **4.2.2 Labeling Systems** | [09-information-architecture.md](./09-information-architecture.md) |
| **4.2.3 Searching Systems** | [09-information-architecture.md](./09-information-architecture.md) |
| **4.2.4 Navigation Systems** | [09-information-architecture.md](./09-information-architecture.md) |
| **4.2.5 Site Map** | [09-information-architecture.md](./09-information-architecture.md) |
| **4.3.1 Landing Wireframes** | [07-wireframes-lowfi.md](./07-wireframes-lowfi.md) + estructura de [03-](./03-screens-desktop.md) y [04-](./04-screens-mobile.md) |
| **4.3.2 Landing Mock-ups** | [03-screens-desktop.md](./03-screens-desktop.md) + [04-screens-mobile.md](./04-screens-mobile.md) + screenshots |
| **4.4.1 Web App Wireframes** | [07-wireframes-lowfi.md](./07-wireframes-lowfi.md) sección App |
| **4.4.2 Web App Mock-ups** | [06-internal-app-screens.md](./06-internal-app-screens.md) con Material Design |
| **4.4.3 Web App User Flow Diagrams** | [10-user-flows.md](./10-user-flows.md) (8 flujos con happy + unhappy) |
| **4.5 Prototyping + video 3-5 min** | sección Prototyping en [05-figma-build-guide.md](./05-figma-build-guide.md) |

## Material del lado del código (fuera de `figma-design/`)

| Archivo | Para qué sirve |
|---|---|
| [`../index.html`](../index.html) | Landing con i18n (es-419 / en-US), ARIA landmarks, skip link |
| [`../styles.css`](../styles.css) | Design system CSS + estilos de todas las secciones |
| [`../script.js`](../script.js) | Interacciones (form, FAQ, rotación testimonios, i18n hooks) |
| [`../i18n.js`](../i18n.js) | Diccionario ES/EN + switcher funcional |
| [`../terms.html`](../terms.html) | Términos y condiciones (incl. Libro de Reclamaciones — Ley 29571) |
| [`../privacy.html`](../privacy.html) | Política de privacidad (Ley 29733) + cookies |
| [`../netlify.toml`](../netlify.toml) | Config de despliegue en Netlify (headers de seguridad + redirects) |
| [`../.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml) | Despliegue automático a GitHub Pages |
| [`../DEPLOY.md`](../DEPLOY.md) | Instrucciones paso a paso para publicar la landing |

## Flujo recomendado en Figma

1. Crea el archivo `Ya Quedó — Landing & App`.
2. Importa el **Material 3 Design Kit** (Figma Community) en una página `🎨 Material 3 Base`.
3. Carga los tokens de marca en una página `🎨 Design System` (sigue [01-design-system.md](./01-design-system.md)).
4. Construye componentes base del landing en `🧩 Components` (sigue [02-components.md](./02-components.md)).
5. Arma el **landing** en `🖥 Desktop — Landing` y `📱 Mobile — Landing` (docs [03-](./03-screens-desktop.md) y [04-](./04-screens-mobile.md)).
6. Arma los **wireframes lo-fi** en `📝 Wireframes Lo-Fi` (doc [07-](./07-wireframes-lowfi.md)).
7. Arma los **mockups de la Web App** en `🖥 App Desktop` y `📱 App Mobile` (doc [06-](./06-internal-app-screens.md)).
8. Arma los **User Flows** en `🔀 User Flows` (doc [10-](./10-user-flows.md)).
9. Arma los **diagramas de arquitectura de información** en `🗺 Info Architecture` (doc [09-](./09-information-architecture.md)).
10. Conecta el **Prototype** (Paso 5 del [05-figma-build-guide.md](./05-figma-build-guide.md)).

## Cobertura TB1

- ✅ 26 User Stories cubiertas por diseño (ver [08-us-traceability.md](./08-us-traceability.md))
- ✅ i18n en landing (es-419 / en-US) con switcher
- ✅ a11y: skip link, ARIA landmarks, focus visible, `prefers-reduced-motion`
- ✅ Términos y Privacidad con cumplimiento ACM/IEEE + Ley 29733 + Ley 29571 peruana
- ✅ Deploy configurado (GitHub Pages + Netlify)
- ✅ 8 User Flows con happy + unhappy paths
- ⏳ Pendiente TB1: video de 3-5 min del prototipo (después de armar Figma)
- ⏳ Pendiente TB2+: implementación Angular + Spring Boot

---
Generado a partir del código en `develop`.
