# 07 — Wireframes de Baja Fidelidad

Los wireframes de baja fidelidad sirven para **validar estructura y jerarquía** sin distraer con color ni tipografía final. Son el entregable pedido en las secciones **4.3.1** y **4.4.1** del informe TB1.

## Reglas visuales

- **Solo 3 colores**: blanco (fondo), negro/gris oscuro (líneas y texto), gris claro (fondos de bloque).
- **Sin gradientes, sin sombras realistas, sin imágenes**. Las imágenes se representan con un rectángulo que tiene una `X` diagonal.
- **Una sola fuente**: la que Figma traiga por defecto (Inter en negro).
- **Placeholder de texto**: usa "Lorem ipsum" o un bloque gris llamado `████` para indicar bloques de texto.
- **CTAs**: rectángulos con borde, texto en mayúsculas pequeña.
- **Íconos**: círculos o cuadrados con una letra o símbolo simple.

## Cómo armarlos en Figma

1. Crea una página `📝 Wireframes Lo-Fi`.
2. Duplica los frames de `03-screens-desktop.md` y `04-screens-mobile.md`.
3. A cada frame duplicado, aplica:
   - Fondo blanco a todos los bloques
   - Quita gradientes, sombras y colores
   - Reemplaza imágenes por placeholders con `X`
   - Cambia el color de texto a `#1F2937`
   - Cambia el color de bordes a `#9CA3AF` (1px solid)

---

## Wireframes requeridos para TB1

### Landing Page — Desktop (US-01 a US-10)
Un único frame `Wireframe / Landing / Desktop` (1440 × 8500) que muestre los 14 bloques en secuencia vertical.

Cada bloque representado como un rectángulo gris claro con etiqueta negra indicando qué sección es:

```
┌──────────────────────────────────────────────┐
│ NAVBAR · Logo | Links | [Registrarse]        │ ← 70px
├──────────────────────────────────────────────┤
│                                              │
│  HERO · H1 + subtitle + 2 CTAs               │ ← 620px
│                                              │
├──────────────────────────────────────────────┤
│  PROBLEMA · 3 tarjetas                       │ ← 540px
├──────────────────────────────────────────────┤
│  SOLUCIÓN · Texto + visual                   │ ← 480px
├──────────────────────────────────────────────┤
│  CÓMO FUNCIONA · 4 pasos                     │ ← 540px
├──────────────────────────────────────────────┤
│  SERVICIOS · Grid 6 categorías (US-03)       │ ← 540px
├──────────────────────────────────────────────┤
│  BENEFICIOS · 2 columnas (clientes/trab.)    │ ← 640px
├──────────────────────────────────────────────┤
│  CARACTERÍSTICAS · 6 features                │ ← 680px
├──────────────────────────────────────────────┤
│  TRABAJADORES (US-08) · Texto + stats        │ ← 540px
├──────────────────────────────────────────────┤
│  IMPACTO · 4 stats                           │ ← 480px
├──────────────────────────────────────────────┤
│  TESTIMONIOS (US-04) · 3 cards + rotación    │ ← 540px
├──────────────────────────────────────────────┤
│  FAQ (US-06) · 6 preguntas colapsables       │ ← 640px
├──────────────────────────────────────────────┤
│  PRE-REGISTRO (US-05) · Form con toggle      │ ← 720px
├──────────────────────────────────────────────┤
│  FOOTER (US-07) · 5 columnas + legal         │ ← 380px
└──────────────────────────────────────────────┘
```

### Landing Page — Mobile
Mismo contenido pero en columna única, 375×13500.

### App Web — Wireframes clave
Crea wireframes de baja fidelidad para las pantallas de **mayor criticidad del flujo** (no de las 22 — solo las 8 que cuentan la historia):

1. **Registro** (US-11) — 1 columna, campos apilados, botón abajo.
2. **Login** (US-12) — igual, más compacto.
3. **Verificación identidad trabajador** (US-13) — stepper 3 pasos + drop zones.
4. **Búsqueda con filtros** (US-15, US-16) — sidebar izquierda + grid central.
5. **Perfil del trabajador** (US-17) — hero + tabs + reseñas.
6. **Solicitud de cotización** (US-18) — formulario modal.
7. **Pago** (US-21) — radio métodos + resumen.
8. **Calificación** (US-23) — estrellas + textarea.

Cada wireframe: un frame 1440×900 (desktop) o 375×812 (mobile), sin estilos, solo cajas y etiquetas.

---

## Wireflow (versión lineal del flujo + wireframe)

En una página `🔀 User Flow` de Figma:
- Coloca cada wireframe pequeño (escalado a 20%)
- Conéctalos con flechas que indican el flujo
- Etiqueta cada flecha con la acción: `click "Buscar"`, `submit form`, etc.

**Flujo Cliente completo (wireflow)**:
```
Landing → Registro → OTP → Home → Búsqueda → Filtros
  → Resultados → Perfil Trabajador → Solicitar Cotización
  → Chat (esperar respuesta) → Cotización Recibida
  → Agendar → Pago → Comprobante → Calificar
```

**Flujo Trabajador completo (wireflow)**:
```
Landing → Registro (tipo trabajador) → OTP → Verificación DNI
  → Perfil Edit → Bandeja Solicitudes → Responder Cotización
  → Chat (acordar detalles) → Dashboard Finanzas
  → Reseña Recibida → Responder Reseña
  → Capacitaciones → Curso Detalle → Quiz
```

---

## Entrega final

Para TB1, exporta de Figma:
- **Un PNG** por cada wireframe principal (ancho 1024px).
- **Un PDF** con la secuencia completa del wireflow.
- **Link compartido** del archivo (modo viewer) para que el docente pueda navegarlo.
