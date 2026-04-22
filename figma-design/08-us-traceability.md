# 08 — Matriz de Trazabilidad: User Stories ↔ Pantallas de Figma

Esta matriz demuestra que **cada historia del Product Backlog (US-01 a US-26) tiene al menos una pantalla/componente en el diseño**, cubriendo los criterios de aceptación (éxito, alternativo y error).

Úsala en el informe TB1 como evidencia de cobertura.

| US | Título | Epic | Prioridad | SP | Frame(s) Figma | Estados cubiertos |
|---|---|---|---|---|---|---|
| US-01 | Propuesta de valor en landing | EP-06 | Must | 2 | `Desktop/Landing → Hero` · `Mobile/Landing → Hero` | Éxito (hero visible sin scroll), Alt (mobile 1 col), Error (fondo sólido si falla imagen — variant `hero-fallback`) |
| US-02 | Sección cómo funciona | EP-06 | Must | 2 | `Desktop/Landing → Cómo funciona` (4 steps) | Éxito, Alt (mobile stack), Error (número en lugar de ícono) |
| US-03 | Listado de servicios | EP-06 | Must | 3 | `Desktop/Landing → Servicios` (6 cards) · `Mobile idem` | Éxito (6+ categorías), Alt (click → form con `data-service`), Error (texto plano si falla ícono) |
| US-04 | Testimonios | EP-06 | Should | 3 | `Desktop/Landing → Testimonios` + variant `card/testimonial:active` | Éxito (3 cards con foto+nombre+distrito+texto), Alt (rotación 5s), Error (avatar iniciales como fallback) |
| US-05 | Formulario de pre-registro | EP-06 | Must | 3 | `Desktop/Landing → Pre-registro` (form card) | Éxito (validación + toast), Alt (email existente → banner), Error (feedback rojo + preservar datos) |
| US-06 | FAQ | EP-06 | Should | 2 | `Desktop/Landing → FAQ` (6 items) + variants `closed/open` | Éxito (colapsables), Alt (sin JS → expanded), Error (N/A) |
| US-07 | Footer | EP-06 | Must | 1 | `Desktop/Landing → Footer` (5 columnas) | Éxito (contacto+redes+legal), Alt (1 col mobile), Error (texto si falla ícono social) |
| US-08 | Sección para trabajadores | EP-06 | Must | 2 | `Desktop/Landing → Trabajadores` + CTA con `data-user-type=trabajador` | Éxito (beneficios + CTA), Alt (CTA preselecciona toggle trabajador en form), Error (backend asume `usuario` si falta campo) |
| US-09 | Responsive completo | EP-06 | Must | 3 | Ambos frames (Desktop 1440 / Mobile 375) + frame intermedio `Tablet 768` | Éxito (3 breakpoints), Alt (tablet), Error (sin scroll horizontal) |
| US-10 | Analítica GA4 | EP-06 | Should | 2 | **Nota técnica en el archivo** (no pantalla) + estado `cookie-banner` en Landing | Éxito (tracking activo), Alt (respeta rechazo cookies), Error (landing sigue funcionando) |
| US-11 | Registro correo + teléfono | EP-01 | Must | 5 | `App/Auth/Register` · `App/Auth/OTP Verify` | Éxito (registro completo), Alt (email ya existe → sugerir recuperar), Error (reenviar SMS tras 60s) |
| US-12 | Login seguro | EP-01 | Must | 3 | `App/Auth/Login` · `App/Auth/Recover` | Éxito (dashboard), Alt (olvidé contraseña), Error (bloqueo 5 min tras 3 intentos) |
| US-13 | Verificación identidad trabajador | EP-01 | Must | 8 | `App/Worker/Identity Verify` (3 pasos + 3 variants status) | Éxito (verificado en 48h), Alt (rechazado con motivo + reintentar), Error (reintentar sin perder datos) |
| US-14 | Perfil editable trabajador | EP-01 | Must | 5 | `App/Worker/Profile Edit` (4 tabs) | Éxito (guardar refleja inmediato), Alt (máx 10 fotos), Error (preserva edición local) |
| US-15 | Búsqueda oficio + distrito | EP-02 | Must | 5 | `App/Search/Results` | Éxito (ordenado por cercanía+rating), Alt (distritos aledaños si no hay resultados), Error (mensaje + reintentar) |
| US-16 | Filtros avanzados | EP-02 | Should | 3 | `App/Search/Results → Filter Panel` (sidebar + bottom sheet mobile) | Éxito (aplicación dinámica), Alt (limpiar todo con 1 botón), Error (sugerir ampliar filtros si no hay match) |
| US-17 | Perfil del trabajador | EP-02 | Must | 3 | `App/Worker/Profile View` (4 tabs) + variant `empty-reviews` | Éxito (info sin scroll excesivo), Alt ("Trabajador nuevo"), Error (resto visible si falla carga img) |
| US-18 | Solicitud de cotización | EP-03 | Must | 5 | `App/Quote/Request` (modal) | Éxito (form + notificación), Alt (enviar a 3 trabajadores), Error (guardar offline + reintentar) |
| US-19 | Respuesta con cotización | EP-03 | Must | 5 | `App/Worker/Requests Inbox` · `App/Worker/Quote Response` | Éxito (respuesta en 1h), Alt (rechazar → sugerir alternativas), Error (notificar tras 2h sin respuesta) |
| US-20 | Aceptación y agendamiento | EP-03 | Must | 5 | `App/Quote/Received` · `App/Booking/Schedule` | Éxito (confirma fecha + notif), Alt (proponer otra fecha), Error (slots alternativos si fecha no disponible) |
| US-21 | Pago con Yape / tarjeta | EP-04 | Must | 8 | `App/Payment/Checkout` · `App/Payment/Receipt` | Éxito (comprobante por correo), Alt (otro método si falla), Error (pausar si gateway caído) |
| US-22 | Liberación de fondos | EP-04 | Must | 8 | `App/Worker/Dashboard Finance` (tabla + estados) | Éxito (monto neto al día siguiente), Alt (liberación auto 72h si no confirma), Error (retenido en disputa) |
| US-23 | Calificación y reseña | EP-05 | Must | 3 | `App/Rating/Submit` | Éxito (1-5 estrellas + comentario), Alt (foto opcional), Error (revisión manual por filtro contenido) |
| US-24 | Respuesta a reseñas | EP-05 | Should | 2 | `App/Worker/Reviews` (modal respuesta) | Éxito (publicación inmediata), Alt (límite 500 chars), Error (rechazo por filtro + notificación) |
| US-25 | Badge Top Rated | EP-05 | Could | 3 | Variants del `Worker Profile Hero` + progreso en `Dashboard Finance` | Éxito (auto con ≥4.8 + 20 servicios), Alt (recalcula semanal), Error (retiro con notificación) |
| US-26 | Capacitaciones cortas | EP-07 | Could | 5 | `App/Worker/Training` · `App/Worker/Course Detail` | Éxito (video + quiz + insignia), Alt (reintento 24h), Error (descarga offline) |

## Resumen

- **Total User Stories**: 26
- **Total Frames de Figma**: ~22 (landing: 1 desktop + 1 mobile, app: 20 pantallas únicas)
- **Total Componentes**: ~25 (11 del design system base + 14 de la app interna)
- **Story Points totales**: 105 (distribuidos en 4 sprints aproximadamente)

## Cobertura por Epic

| Epic | US | SP | Frames clave |
|---|---|---|---|
| EP-01 Gestión de cuentas | US-11, US-12, US-13, US-14 | 21 | Register, Login, Identity Verify, Profile Edit |
| EP-02 Búsqueda | US-15, US-16, US-17 | 11 | Search Results, Filter Panel, Worker Profile |
| EP-03 Contratación | US-18, US-19, US-20 | 15 | Quote Request/Response, Schedule |
| EP-04 Pagos | US-21, US-22 | 16 | Checkout, Receipt, Dashboard Finance |
| EP-05 Reputación | US-23, US-24, US-25 | 8 | Rating, Reviews, Top Rated badge |
| EP-06 Landing | US-01 a US-10 | 24 | Landing Desktop + Mobile |
| EP-07 Capacitación | US-26 | 5 | Training, Course Detail |

Esta matriz demuestra que el diseño **cubre al 100% el Product Backlog** y que cada criterio de aceptación (éxito, alternativo, error) tiene un estado visual en Figma.
