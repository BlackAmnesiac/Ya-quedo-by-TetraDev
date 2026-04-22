# 06 — Pantallas Web App (US-11 a US-26) · Material Design / Angular Material

> **Importante**: el rubro TB1 fija **Angular + Angular Material** para la Web App. Los mockups que entregues en Figma deben basarse en el **Design System de Material 3** (M3), no en el look custom de la landing. La landing mantiene su estilo; la app interna adopta Material.

**Recurso Figma recomendado**: importa el archivo oficial **"Material 3 Design Kit"** (Figma Community, filtrado por Google). Tiene todos los componentes listos: MatCard, MatButton, MatFormField, MatTable, MatDialog, MatSnackBar, MatChip, MatTabs, MatSidenav, etc.

## Tokens Material 3 a usar

Mapear los tokens de marca (landing) a los slots M3:

| M3 Token | Hex | Uso |
|---|---|---|
| `md.sys.color.primary` | `#6366F1` | FAB, botones primarios, app bar activa |
| `md.sys.color.on-primary` | `#FFFFFF` | Texto sobre primary |
| `md.sys.color.primary-container` | `#E0E7FF` | Chips activos, estados selected |
| `md.sys.color.secondary` | `#EC4899` | Accents (badges, highlights) |
| `md.sys.color.tertiary` | `#10B981` | Éxito, confirmaciones |
| `md.sys.color.surface` | `#FFFFFF` | Cards |
| `md.sys.color.surface-variant` | `#F3F4F6` | Fondos secundarios |
| `md.sys.color.on-surface` | `#1F2937` | Texto |
| `md.sys.color.error` | `#EF4444` | Errores y disputas |

**Tipografía**: Material 3 recomienda `Roboto` o la fuente del sistema. Para mantener marca, se puede configurar `Inter` como fuente base (`mat.typography-level($font-family: Inter)`).

**Elevaciones**: usar las 5 niveles M3 (0–5). Cards = elevation 1. Dialogs = elevation 3. FAB = elevation 3.

---

## Shell común de la app logueada

**Topbar** (MatToolbar, elevation 0, 64px):
- Logo + nombre "Ya Quedó" a la izquierda
- Search autocomplete center (MatAutocomplete)
- Iconos derecha: notificaciones (MatBadge), avatar con menú (MatMenu)

**Sidenav** (MatSidenav, modo `side` en desktop, `over` en mobile):
- Ítems del menú vertical con MatIcon + MatListItem
- Footer con link "Cerrar sesión"

**Bottom Navigation** (solo mobile, MatTabNav):
- 4 tabs: Home · Buscar · Mensajes · Perfil

---

## Pantalla 01 — Registro (US-11)
**Frame**: `App / Auth / Register` · 1440×900 / 375×812
- `MatCard` central 480×620 desktop, full en mobile
- Contenido:
  - `MatButtonToggleGroup` cliente / trabajador
  - `MatFormField` (appearance `outline`): Nombre · Apellido · Correo · Teléfono · Contraseña · Confirmar contraseña
  - `MatCheckbox` "Acepto términos"
  - `MatButton` (raised, color primary) "Crear cuenta" ancho full
  - Link "¿Ya tienes cuenta? Inicia sesión"
- **Variants**:
  - `default`
  - `loading` → `MatProgressSpinner` dentro del botón
  - `email-exists` → `MatSnackBar` warn amarillo con acción "Recuperar"
- **Validación inline**: `mat-error` bajo cada campo inválido

## Pantalla 02 — OTP SMS (US-11 alt)
**Frame**: `App / Auth / OTP`
- 6 casillas `MatFormField` tamaño corto, auto-focus entre ellas
- `MatButton` "Verificar"
- Link "Reenviar código en 59s" con countdown
- **Variants**: `waiting`, `invalid-code` (shake + mat-error), `success` (check verde + redirect)

## Pantalla 03 — Login (US-12)
**Frame**: `App / Auth / Login`
- MatCard 440×480
- Campos: email + password (`MatFormField outline`)
- `MatCheckbox` "Recordarme"
- Link "¿Olvidaste tu contraseña?"
- `MatButton` raised "Iniciar sesión"
- `MatDivider` con label "o"
- `MatButton` stroked "Continuar con Google" (logo + texto)
- **Variants**: `error-invalid` (MatSnackBar rojo), `error-locked` (MatDialog "Intenta de nuevo en 5 minutos")

## Pantalla 04 — Recuperar contraseña (US-12 alt)
- `MatFormField` email + `MatButton` "Enviar enlace"
- Estado éxito: `MatSnackBar` verde

## Pantalla 05 — Verificación de identidad (US-13)
**Frame**: `App / Worker / Identity Verify`
- `MatStepper` horizontal con 3 pasos: `Identidad · Selfie · Revisión`
- **Paso 1**: 2 `MatCard` con upload zones (drag & drop) para anverso/reverso DNI
- **Paso 2**: 1 zona de upload de selfie con silueta guía
- **Paso 3**: `MatCard` con `MatChip` status:
  - `En revisión` (color warn amarillo) — "hasta 48h"
  - `Verificado` (color primary verde) — check + "Obtuviste la insignia Verificado"
  - `Rechazado` (color warn rojo) — motivo + `MatButton` "Reintentar"

## Pantalla 06 — Perfil editable trabajador (US-14)
**Frame**: `App / Worker / Profile Edit`
- `MatTabGroup` con 4 tabs: `Información` · `Oficios y tarifas` · `Trabajos anteriores` · `Disponibilidad`
- **Tab Oficios**: `MatTable` editable con columnas `Oficio | Tarifa | Tiempo` + `MatIconButton` añadir
- **Tab Galería**: `MatGridList` de 10 slots; `MatIconButton` para añadir/eliminar
- **Sticky bottom bar** con `MatButton` "Guardar" — `MatSnackBar` al guardar

## Pantalla 07 — Home del usuario (US-15 entry)
**Frame**: `App / User / Home`
- Greeting "Hola Juan, ¿qué necesitas hoy?"
- `MatFormField` búsqueda grande + `MatSelect` distrito + `MatButton` "Buscar"
- `MatChipListbox` de 6 categorías (scroll horizontal en mobile)
- Sección "Destacados": carrusel horizontal de `MatCard` trabajadores
- Sección "Últimas solicitudes": `MatList`

## Pantalla 08 — Resultados de búsqueda (US-15, US-16)
**Frame**: `App / Search / Results`
- **Desktop**: `MatSidenav` modo side con filtros + área de resultados
- **Mobile**: `MatBottomSheet` con filtros, activado por FAB "Filtros"

**Filtros (MatExpansionPanel por grupo)**:
- Oficio (`MatCheckbox` multi)
- Distrito (`MatSelect` multi con `MatChip` seleccionados)
- Calificación mínima (`MatSlider` 0–5)
- Rango de precio (`MatSlider` range 20–500)
- Disponibilidad (`MatChipListbox` single select)
- `MatButton` "Aplicar" + `MatButton` text "Limpiar todo"

**Resultados**:
- Header `MatToolbar` "12 resultados" + `MatSelect` orden
- `MatCard` con Worker info (foto, nombre, oficio, distrito, rating + estrellas, tarifa, `MatChipSet` insignias, `MatButton` "Ver perfil")
- **Empty state**: ilustración + "No hay trabajadores en tu distrito. Te mostramos de distritos aledaños"

## Pantalla 09 — Perfil público del trabajador (US-17)
**Frame**: `App / Worker / Profile View`
- **Hero**: avatar, nombre, oficio, distrito, `MatChipSet` insignias, `MatButton` raised primary "Solicitar cotización"
- `MatTabGroup`: `Resumen · Reseñas (54) · Galería · Tarifas`
- **Reseñas**: `MatCard` por reseña con avatar + estrellas + texto + foto opcional + respuesta anidada (card anidada)
- **Empty state** si 0 reseñas: "Trabajador nuevo en la plataforma"

## Pantalla 10 — Solicitud de cotización (US-18)
**Frame**: `App / Quote / Request`
- `MatDialog` 640×720 (desktop) o pantalla completa (mobile, CDK FullscreenOverlay)
- Campos: oficio (preselect), descripción (textarea), fotos (drag&drop hasta 5), urgencia (`MatRadioGroup`), fecha tentativa (`MatDatepicker`), dirección (input con autocomplete de Maps)
- `MatCheckbox` "Enviar también a 2 trabajadores similares" (alt US-18)
- `MatButton` "Enviar solicitud"
- **Variants**: `sending` (spinner), `success` (snackbar verde + redirect), `offline` (snackbar azul "Guardado · se enviará cuando tengas conexión")

## Pantalla 11 — Bandeja del trabajador (US-19)
**Frame**: `App / Worker / Requests Inbox`
- `MatTabGroup`: Pendientes · Respondidas · Rechazadas
- `MatCard` por cada solicitud: avatar cliente, distrito, oficio, resumen, urgencia chip, timestamp, `MatButton` "Responder" / `MatButton` stroked "Rechazar"

## Pantalla 12 — Responder cotización (US-19)
**Frame**: `App / Worker / Quote Response`
- Summary card read-only
- Formulario: monto (`MatFormField` con prefijo "S/."), tipo (`MatRadio` cerrado/rango), tiempo estimado, fecha (`MatDatepicker`), mensaje
- `MatButton` "Enviar" + link "Rechazar"
- **Timer visual** (MatProgressBar): "Responde antes de las 2h para mantener tu ranking"

## Pantalla 13 — Cotización recibida (US-20)
**Frame**: `App / Quote / Received`
- `MatCard` cotización completa con CTAs:
  - `MatButton` raised primary "Aceptar y agendar"
  - `MatButton` stroked "Proponer otra fecha" → abre `MatDialog` con `MatDatepicker`
  - `MatButton` text "Rechazar"

## Pantalla 14 — Agendamiento (US-20)
**Frame**: `App / Booking / Schedule`
- `MatCalendar` con slots disponibles marcados y ocupados tachados
- Confirmación: "Agendar el martes 5 de mayo, 10:00 AM"
- `MatButton` "Confirmar"
- Pantalla éxito: `MatIcon` check verde + `MatSnackBar`

## Pantalla 15 — Pago (US-21)
**Frame**: `App / Payment / Checkout`
- `MatCard` resumen del servicio
- `MatRadioGroup` métodos (cada uno estilizado como card): Yape, Plin, Tarjeta
- `MatFormField` cupón
- Desglose: Servicio + Comisión = Total (usar `MatList`)
- `MatButton` raised "Pagar S/. 180"
- **Variants**:
  - `processing` (spinner + mensaje "Procesando…")
  - `success` → redirect a comprobante + `MatSnackBar` verde
  - `failed` → `MatDialog` "Pago falló. Intenta con otro método"
  - `gateway-down` → `MatSnackBar` warn "Pasarela caída. Pausamos tu transacción y te avisamos"

## Pantalla 16 — Comprobante (US-21)
**Frame**: `App / Payment / Receipt`
- `MatCard` con datos de transacción
- `MatButton` stroked "Descargar PDF" + `MatButton` text "Volver al inicio"

## Pantalla 17 — Dashboard trabajador / Finanzas (US-22)
**Frame**: `App / Worker / Dashboard Finance`
- KPI row: 3 `MatCard` con `MatIcon` + número grande + label
- `MatTable` con sticky header: fecha · cliente · servicio · bruto · comisión · neto · estado (`MatChip`: Pendiente/Liberado/Disputa)
- Filtros superiores: `MatDateRangePicker` + `MatSelect` estado
- FAB "Retirar" (MatFabButton)
- `MatCard` info: "Los fondos se liberan 24h después de tu confirmación. Si hay disputa, se retienen."

## Pantalla 18 — Chat (apoyo US-19/20)
**Frame**: `App / Messages / Conversation`
- **Desktop**: `MatSidenav` con lista de conversaciones + panel chat
- **Mobile**: stack de pantallas
- Header con avatar + estado (`MatChip` verde "En línea")
- Burbujas con `MatCard` (elevation 0) alineadas según remitente
- Componentes especiales:
  - `Quote Bubble` (MatCard con CTAs Aceptar/Rechazar)
  - `Booking Bubble` (MatCard con ícono calendario)
- Input: `MatFormField` + `MatIconButton` adjuntar + `MatIconButton` enviar

## Pantalla 19 — Calificación post-servicio (US-23)
**Frame**: `App / Rating / Submit`
- `MatDialog` con:
  - Avatar + nombre del trabajador
  - 5 estrellas grandes (componente custom sobre `MatIcon`)
  - `MatFormField` textarea
  - Upload foto opcional
  - `MatChipListbox` aspectos: Puntualidad, Limpieza, Precio, Profesionalismo
  - `MatButton` "Publicar reseña"
- **Variants**:
  - `content-warning` → `MatSnackBar` warn amarillo (alt US-23)
  - `success` → `MatSnackBar` verde

## Pantalla 20 — Respuesta a reseña (US-24)
**Frame**: `App / Worker / Reviews`
- `MatList` de reseñas recibidas, cada una con `MatButton` "Responder"
- `MatDialog` de respuesta: textarea con `mat-hint` "0/500"
- `MatButton` "Publicar respuesta"
- Variants: `published`, `rejected-by-filter`

## Pantalla 21 — Perfil con Top Rated (US-25)
- Variantes del componente `Worker Profile Hero`:
  - `verified-only` (badge azul)
  - `top-rated` (badge dorado + `MatIcon` star)
- En el dashboard del trabajador, card educativa: "Estás a 3 servicios de ser Top Rated" con `MatProgressBar`

## Pantalla 22 — Capacitaciones (US-26)
**Frame**: `App / Worker / Training`
- **Listado**: `MatGridList` de `Course Card` (thumbnail, título, duración, `MatChip` estado)
- **Detalle de curso**:
  - Player mockup (card con ícono play)
  - Descripción + lista de objetivos
  - Quiz: 5 `MatRadioGroup` preguntas
  - `MatButton` "Finalizar y obtener insignia"
- **Variants**:
  - `quiz-passed` → `MatDialog` + ilustración + insignia
  - `quiz-failed` → `MatCard` con timer 24h
  - `video-error` → `MatSnackBar` con acción "Descargar offline"

---

## Componentes Material adicionales a construir

Aparte de los de la librería oficial, crea como variants en Figma:
- `Worker Card` (sobre MatCard) — versión compacta y expandida
- `Request Card` (MatCard con acciones)
- `Stat Card` (MatCard + MatIcon grande)
- `Review Item`
- `Course Card`
- `Chat Bubble` (4 variants: self / other / quote / booking)
- `Status Badge` sobre MatChip (verified, top-rated, pending, rejected)

---

## Flujos de prototipado (Figma Prototype)

**Flujo Cliente** (happy path):
```
Landing → Register → OTP → Home → Search → Filter
→ Results → Worker Profile → Quote Request → Chat
→ Quote Received → Schedule → Payment → Receipt → Rating
```

**Flujo Trabajador** (happy path):
```
Landing (CTA "Soy trabajador") → Register → OTP → Identity Verify
→ Profile Edit → Requests Inbox → Quote Response → Chat
→ Booking Confirmation → Dashboard Finance → Reviews Response
→ Training → Course Detail → Quiz
```

Los **unhappy paths** están en [10-user-flows.md](./10-user-flows.md).

## Accesibilidad (a11y) y i18n en la Web App

- Todos los MatFormField con `mat-label` y `mat-error` vinculados.
- `MatButton` con `aria-label` cuando solo tenga ícono (`MatIconButton`).
- Focus order lógico y `MatRipple` visible.
- Textos externos a `i18n/es-419.json` y `i18n/en-US.json` (NgxTranslate o Angular i18n nativo).
- RTL soportado por default en Material.
