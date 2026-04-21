# Ya Quedó · Plugin Generator para Figma — v2

Plugin que genera **todo el landing desktop con contenido real** + design system completo + componentes base.

## Qué genera ahora (v2)

### Design System
- 10 paint styles de color + 3 gradientes
- 11 estilos de texto (Inter con fallback a Roboto)
- 4 estilos de sombra (sm, md, lg, xl)

### Componentes
- `Button/Primary` (gradiente + sombra)
- `Button/Secondary` (outline)
- `Navbar/Desktop` (logo + 6 links + botón registrarse + switcher ES/EN)

### Desktop Landing (1440px) — **con contenido real**
14 secciones completas:
1. Navbar (instancia del componente)
2. **Hero** — H1 + subtítulo + 2 botones sobre gradiente hero
3. **Problema** — título + 3 cards con iconos y texto
4. **Solución** — 2 columnas (texto + lista + card visual YQ)
5. **Cómo funciona** — 4 step cards con número, icono y descripción
6. **Servicios** — grid 3×2 con 6 categorías (US-03)
7. **Beneficios** — 2 columnas (clientes/trabajadores) con 6 items cada una
8. **Características** — grid 3×2 con 6 features
9. **Trabajadores** — 2 columnas (texto+CTA / 3 stat cards) (US-08)
10. **Impacto** — título blanco + 4 stats sobre gradiente primary
11. **Testimonios** — 3 cards con cita, avatar, nombre y distrito (US-04)
12. **FAQ** — 6 items colapsables (el primero expandido) (US-06)
13. **Pre-registro** — formulario completo con toggle cliente/trabajador (US-05)
14. **Footer** — 5 columnas con links legales + copyright

### Mobile Landing (375px) — skeleton
14 secciones dimensionadas con labels. Sigue [../figma-design/04-screens-mobile.md](../figma-design/04-screens-mobile.md) para rellenar cada una con el mismo patrón que el desktop.

## Requisitos

- **Figma Desktop** (https://www.figma.com/downloads/)

## Instalación (solo la primera vez)

1. Abre Figma Desktop
2. Crea un archivo en blanco
3. Menú: **Plugins → Development → Import plugin from manifest…**
4. Selecciona `C:\Users\USER\Documents\Ya-quedo-by-TetraDev\figma-plugin\manifest.json`

## Cada vez que haya cambios en `code.js`

Figma relee el archivo automáticamente al ejecutar. **NO** necesitas re-importar salvo que cambie `manifest.json`.

## Ejecutar

**Plugins → Development → Ya Quedó · Generator**

Toma ~20 segundos. Al final verás un mensaje "✅ Ya Quedó v2 listo…" y el viewport hará zoom al landing.

## Qué hacer después

1. **Panel Assets (derecha)**: verás los styles organizados bajo `Color/...`, `Gradient/...`, `Text/...`, `Shadow/...`.
2. **Panel Components (derecha)**: verás `Button/Primary`, `Button/Secondary`, `Navbar/Desktop`.
3. **Canvas**: el Desktop Landing está a la izquierda (posición 0,0), el Mobile a la derecha.
4. **Organiza en páginas**: mueve los componentes a una página `🧩 Components`, el landing a `🖥 Desktop Landing`, el mobile a `📱 Mobile Landing`.
5. **Refina visuales**: los iconos son emojis placeholder — reemplázalos con iconos reales (Font Awesome, lucide, Material Icons) importando un plugin de iconos en Figma.
6. **Rellena el mobile**: duplica la lógica del desktop dentro de cada sección mobile, ajustando grid a 1 columna.

## Troubleshooting

- **"The font X could not be loaded"**: el plugin detecta automáticamente y usa Roboto o Regular como fallback. Si sigue fallando, instala Inter: https://fonts.google.com/specimen/Inter
- **"Cannot call with documentAccess: dynamic-page"**: re-importa el plugin (manifest ya está corregido en v2).
- **Spread operator error**: v2 ya no usa spread operators.
- **Errores en runtime**: abre la consola con `Plugins → Development → Open Console` y pega el error.

## Limitaciones conocidas

- Los íconos son emojis (📍 ⚡ 🔧 etc.). Figma puede no renderizar algunos emoji coloridos. Si se ven raros, reemplázalos con íconos SVG después.
- El FAQ muestra solo el primer item expandido. Los otros 5 se muestran cerrados (+). Puedes manualmente expandirlos.
- El testimonial no tiene border top 3px en el "activo" porque no simulamos el estado de rotación (es runtime).
- El plugin sobrescribe styles con el mismo nombre si ya existen. Ejecuta en archivo NUEVO para evitar duplicados.

---

Siguiente paso tras correr el plugin: revisa [../figma-design/05-figma-build-guide.md](../figma-design/05-figma-build-guide.md) paso 5+ para el prototipado.
