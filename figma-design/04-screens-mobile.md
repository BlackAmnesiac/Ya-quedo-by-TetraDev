# 04 — Breakdown de Pantalla Mobile (375px)

Frame maestro: **375 × ~13500**. Auto Layout vertical. Padding lateral 16px.

**Orden de secciones (post-adaptación)**:
1. Navbar · 2. Hero · 3. Problema · 4. Solución · 5. Cómo funciona · 6. **Servicios (US-03)** ·
7. Beneficios · 8. Características · 9. **Trabajadores (US-08)** · 10. Impacto · 11. Testimonios (US-04) ·
12. **FAQ (US-06)** · 13. **Pre-registro (US-05)** · 14. Footer (US-07).

**Regla general mobile**:
- Todos los grids colapsan a 1 columna (excepto stats/features que usan 2 columnas en ≤768 y 1 columna en ≤480).
- H1 reduce a 32px, H2 a 32px, H3 a 24px.
- Padding vertical de sección baja a 48px (3rem).
- Hero padding top: 80px (navbar es más bajo).

---

## 1. Navbar Mobile
- **Alto**: 70px, fondo blanco 95% + blur
- **Izquierda**: logo "Ya Quedó" (24px/800, gradient)
- **Derecha**: ícono hamburguesa (3 barras 25×3px, gap 4px)
- **Menú abierto** (estado): panel blanco full-width debajo del navbar con sombra lg, links verticales center, padding 32px 0
  - Inicio · Cómo funciona · Beneficios · Testimonios · [Botón "Registrarse"]

---

## 2. Hero (mobile)
- **Alto**: ~480px
- **Background**: `gradient/hero`
- **Padding**: 96px 16px 48px
- **Contenido** (gap 20px, center):
  - **H1** 32px blanco: "Encuentra el servicio que necesitas, al instante"
  - **Subtitle** 18px blanco 90%: "Conectamos personas con trabajadores independientes..."
  - **Botones verticales** (gap 16px, ancho 100% o max 280px):
    - `Button / primary` "Buscar servicio"
    - `Button / secondary` "Ofrecer mis servicios"

---

## 3. Problema (mobile)
- **Background**: `color/light-gray`
- **Padding vertical**: 48px
- **Header** (center): H2 32px + subtítulo
- **Stack vertical** de 3 `Card/Problem` (gap 24px, ancho full)

---

## 4. Solución (mobile)
- **Background**: `white`
- **Padding vertical**: 48px
- **Layout**: 1 columna (colapsa el grid 2×1):
  1. Texto (eyebrow + H2 + párrafo + lista features)
  2. Card visual YQ (padding 32px, ancho full, altura ~240px)

---

## 5. Cómo Funciona (mobile)
- **Background**: `color/light-gray`
- **Padding vertical**: 48px
- **Stack vertical** de 4 `Card/Step` (gap 24px, cada card ancho full 343px)

---

## 5b. Servicios (mobile, US-03)
- **Background**: `white`, padding vertical 48px
- **1 columna** de 6 `Service Card` (gap 16px, ancho full 343px)
- Cada card con ícono 56×56 a la izquierda + texto a la derecha **o** con ícono arriba y texto abajo (ambos OK; recomendado vertical para consistencia)

---

## 6. Beneficios (mobile)
- **Background**: `white`
- **Padding vertical**: 48px
- **Layout**: 2 grupos apilados verticalmente (gap 32px):
  - **Para Clientes** (H3 center + 6 `Card/Benefit Item` verticales gap 16px)
  - **Para Trabajadores** (igual estructura)

---

## 7. Características (mobile)
- **Background**: `color/light-gray`
- **Padding vertical**: 48px
- **Grid 2 columnas** en mobile grande (≤768) / **1 columna** en ≤480
- 6 `Card/Feature` (gap 24px)

---

## 7b. Trabajadores (mobile, US-08)
- **Background**: `color/light-gray`, padding vertical 48px
- **1 columna** (texto arriba, stat cards abajo):
  - Eyebrow pill + H2 + párrafo + lista 5 beneficios (gap 12px) + botón primary ancho full
  - Luego 3 `Worker Stat Card` apilados (gap 16px)

---

## 8. Impacto Social (mobile)
- **Background**: `gradient/primary`
- **Padding vertical**: 48px
- **Texto center** H2 + párrafo
- **Grid 2×2** de stats (en ≤480 colapsa a 1 columna, gap 16px):
  - 60%+ / 2M+ / 15 / 98%
- Stat number: 40px/700 (en ≤480 baja a 40px con etiqueta debajo)

---

## 9. Testimonios (mobile)
- **Background**: `color/light-gray`
- **Padding vertical**: 48px
- **Stack vertical** de 3 `Card/Testimonial` (gap 24px, ancho full)

---

## 10. FAQ (mobile, US-06)
- **Background**: `white`, padding vertical 48px
- Stack vertical de 6 `FAQ Item` (ancho full, gap 8px). Mismos comportamientos que desktop.

---

## 11. Pre-registro (mobile, US-05)
- **Background**: `gradient/accent`, padding vertical 48px
- Card blanco ancho full (padding 24px, radius 20px, shadow-xl)
- **Campos en 1 columna** (gap 16px)
- **Toggle cliente/trabajador** igual a desktop pero ancho full
- **Botón** ancho full

---

## 12. Footer (mobile)
- **Background**: `color/dark`
- **Padding**: 48px 16px 16px
- **Columnas apiladas** verticalmente (gap 32px, todo center):
  1. **Brand**: H3 + descripción + social links (iconos center, gap 16px)
  2. **Enlaces rápidos**
  3. **Servicios**
  4. **Contacto**
- **Footer bottom**: "© 2026 Ya Quedó..." center

---

## Tips para armar Mobile en Figma

- Empieza por **duplicar el frame Desktop** y redimensionar el Auto Layout a 375px. La mayoría de secciones reflow solas si usaste Auto Layout con wrap.
- Para grids con wrap, cambia la propiedad `Wrap` del Auto Layout a `Wrap` en vez de `No wrap`.
- Pon los botones con `Fill container` para que ocupen el ancho completo en mobile.
- Usa Constraints `Scale` en los botones secondary si tienen border 2px para que no se deforme.
