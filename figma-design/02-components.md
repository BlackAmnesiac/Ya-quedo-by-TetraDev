# 02 — Componentes Reutilizables

Crea una página `🧩 Components` en Figma con estos componentes. Usa **Variants** para estados (default / hover) y **Auto Layout** en todos.

---

## 🔘 Button

**Base**: height 48px, padding `14px 32px`, radius `8px`, font 16px/600.

| Variant | Background | Texto | Border |
|---|---|---|---|
| `primary/default` | `gradient/primary` | `white` | — |
| `primary/hover` | `gradient/primary` + shadow-xl + translateY -2px | `white` | — |
| `secondary/default` | `white` | `color/primary` | 2px `color/primary` |
| `secondary/hover` | `color/primary` | `white` | 2px `color/primary` |
| `cta-primary` (en CTA final) | `white` | `color/primary` | — |
| `cta-secondary` (en CTA final) | transparent | `white` | 2px `white` |

---

## 🧭 Navbar

- **Size**: 1440 × 70 (desktop), 375 × 70 (mobile)
- **Background**: `white` con 95% opacidad + `backdrop-blur(10px)` (usa efecto "Background Blur" en Figma)
- **Sombra**: `shadow/sm`
- **Padding**: `16px 32px`
- **Contenido** (Auto Layout horizontal, space-between):
  - **Izquierda**: Logo `Ya Quedó` (texto 24px/800 con gradiente `gradient/primary` aplicado al texto)
  - **Derecha (desktop)**: 4 links + botón primario "Registrarse"
    - Links: Inicio · Cómo funciona · Beneficios · Testimonios (16px/500, `color/dark`)
  - **Derecha (mobile)**: ícono hamburguesa (3 barras de 25×3px, gap 4px, `color/dark`)

### Estado hover de nav-link
Underline animado: línea de 2px en `color/primary` debajo del texto.

---

## 🃏 Card — Problem

- **Size**: 360 × 220 mínimo (flexible)
- **Background**: `white`
- **Padding**: 32px
- **Radius**: 16px
- **Sombra**: `shadow/md` (hover: `shadow/xl` + translateY -5px)
- **Borde superior accent** (hover): barra de 4px con `gradient/accent`
- **Contenido** (Auto Layout vertical, gap 16px):
  - **Ícono circular**: 60 × 60, `gradient/accent`, radius full, ícono blanco 29px (Font Awesome equivalente)
  - **Título**: `text/h4` (24px)
  - **Descripción**: `text/body` en `color/gray`

---

## 🃏 Card — Step (Cómo funciona)

- **Size**: 280 × 260
- **Background**: `white`, radius 16px, sombra `shadow/md`
- **Padding**: 32px, alineación **center**
- **Contenido** (Auto Layout vertical, gap 16px, align center):
  - **Step number**: círculo 50×50, `gradient/primary`, texto blanco 19px/700
  - **Step icon**: 32px, `color/dark`
  - **Título**: `text/h4`
  - **Descripción**: `text/body-sm`, `color/gray`, center

---

## 🃏 Card — Benefit Item

- **Size**: ancho full del grid, alto auto
- **Background**: `color/light-gray`
- **Padding**: 16px
- **Radius**: 8px
- **Border-left**: 4px `color/primary`
- **Texto**: `text/body`, `color/gray`

Estado hover: translateX 5px.

---

## 🃏 Card — Feature

- **Size**: 280 × 260
- **Background**: `white`, radius 16px, sombra `shadow/md`
- **Padding**: 32px, alineación **center**
- **Contenido** (Auto Layout vertical, gap 16px, center):
  - **Feature icon**: círculo 80×80, `gradient/accent`, ícono blanco 32px
  - **Título**: `text/h4`
  - **Descripción**: `text/body-sm`, `color/gray`

---

## 🃏 Card — Testimonial

- **Size**: 360 × 220
- **Background**: `white`, radius 16px, sombra `shadow/md`
- **Padding**: 32px
- **Elemento decorativo**: comillas gigantes `"` de 48px en `color/primary` con 30% opacidad, posición top-left
- **Contenido** (Auto Layout vertical, gap 24px):
  - **Texto** en italic, `text/body`
  - **Author row** (Auto Layout horizontal, gap 12px):
    - **Avatar**: círculo 50×50, `gradient/accent`, iniciales blancas 16px/700
    - **Info** (vertical, gap 2px): nombre 16px/700 `color/dark`, rol 14px `color/gray`

---

## 📊 Stat (en sección Impacto)

- **Layout**: vertical, center, gap 8px
- **Número**: `text/stat-number` (48px/700, blanco)
- **Label**: `text/body`, blanco 90% opacidad

---

## 🦶 Footer Section (columna)

- **Size**: 280 × auto
- **Gap interno**: 16px
- **Título**: `text/h5` en `color/primary-light`
- **Links**: `text/body` en blanco 80% opacidad, lista vertical con gap 8px

---

## 🔗 Social Link (ícono circular)

- **Size**: 40 × 40, radius full
- **Background**: `color/primary`
- **Ícono**: 16px, blanco, centrado
- **Hover**: scale 1.1

---

## 🎯 Checklist de componentes

- [ ] Button (4 variants)
- [ ] Navbar (desktop + mobile)
- [ ] Card/Problem
- [ ] Card/Step
- [ ] Card/Benefit Item
- [ ] Card/Feature
- [ ] Card/Testimonial
- [ ] Stat
- [ ] Footer Section
- [ ] Social Link
- [ ] Logo (Text component con gradient fill)
