# 09 — Information Architecture (Sección 4.2 del TB1)

Este documento cubre las 5 subsecciones obligatorias del TB1:
4.2.1 Organization Systems · 4.2.2 Labeling Systems · 4.2.3 Searching Systems · 4.2.4 Navigation Systems · 4.2.5 Site Map.

Cada subsección incluye la explicación escrita para el informe y un **diagrama ASCII** que puedes replicar en **Figma / LucidChart** como evidencia visual.

---

## 4.2.1 Organization Systems

**Decisión**: combinamos tres esquemas de Peter Morville:
1. **Por audiencia** (cliente vs. trabajador) — el contenido se adapta al tipo de usuario.
2. **Por tarea** (buscar, cotizar, pagar, calificar, capacitarse) — la app interna se organiza por tareas clave.
3. **Por tema** (categoría de servicio: electricidad, gasfitería, etc.) — la landing y el buscador agrupan contenido por tema.

### Diagrama — Organización de contenidos

```
YA QUEDÓ
│
├─ LANDING PÚBLICA  ← por audiencia + tema
│   ├─ Segmento Cliente
│   │   ├─ Hero: propuesta de valor
│   │   ├─ Problema / Solución
│   │   ├─ Cómo funciona
│   │   ├─ Servicios (por tema)
│   │   ├─ Beneficios · Características
│   │   ├─ Testimonios
│   │   └─ FAQ
│   └─ Segmento Trabajador
│       ├─ Sección "Trabajadores" (beneficios, stats)
│       └─ CTA pre-registro "Soy trabajador"
│
├─ APLICACIÓN WEB  ← por tarea
│   ├─ Cuenta (Registro, Login, Perfil, Verificación)
│   ├─ Descubrimiento (Home, Búsqueda, Filtros)
│   ├─ Contratación (Cotización, Agendamiento, Chat)
│   ├─ Pagos (Checkout, Comprobante, Dashboard $)
│   ├─ Reputación (Calificar, Responder, Insignias)
│   └─ Capacitación (Cursos, Quiz, Insignias)
│
└─ LEGAL & SOPORTE
    ├─ Términos y condiciones
    ├─ Política de privacidad
    ├─ Política de cookies
    ├─ Libro de reclamaciones
    └─ Centro de ayuda
```

**Cómo diagramarlo en Figma**: frame `📐 Organization System`, rectángulos anidados con etiquetas, usar colores tenues para agrupar por audiencia (celeste = público, lavanda = app, gris = legal).

---

## 4.2.2 Labeling Systems

**Decisión**: las etiquetas siguen tres principios:
- **Claridad sobre creatividad**: "Registrarse" y no "Únete a la tribu".
- **Consistencia**: la misma acción tiene el mismo nombre en todo el producto.
- **Lenguaje del usuario**: en español peruano neutro ("gasfitero" y no "fontanero", "distrito" y no "municipio").

### Cuadro de etiquetas (para replicar en Figma)

| Categoría | Etiqueta (es-419) | Etiqueta (en-US) | Dónde aparece |
|---|---|---|---|
| Navegación | Inicio | Home | Navbar |
| Navegación | Servicios | Services | Navbar |
| Navegación | Cómo funciona | How it works | Navbar |
| Navegación | Trabajadores | Workers | Navbar |
| Navegación | FAQ | FAQ | Navbar |
| Navegación | Iniciar sesión | Log in | Navbar |
| CTA primario | Registrarse | Sign up | Navbar |
| CTA hero | Buscar servicio | Find a service | Hero |
| CTA hero | Ofrecer mis servicios | Offer my services | Hero |
| Acción trabajador | Solicitar cotización | Request quote | Perfil trabajador |
| Acción trabajador | Aceptar y agendar | Accept and schedule | Cotización recibida |
| Acción usuario | Calificar servicio | Rate service | Post-servicio |
| Estado verificación | En revisión | Under review | Onboarding trabajador |
| Estado verificación | Verificado | Verified | Perfil/Search |
| Estado verificación | Rechazado | Rejected | Onboarding trabajador |
| Insignia | Top Rated | Top Rated | Perfil/Search |
| Pago | Pagar con Yape | Pay with Yape | Checkout |
| Legal | Términos y condiciones | Terms and conditions | Footer |
| Legal | Política de privacidad | Privacy policy | Footer |
| Legal | Libro de reclamaciones | Complaints book | Footer |
| Reclamo formal | Hoja de Reclamo | Complaint Form | Libro reclamaciones |

**Microcopy forbidden list** (para mantener consistencia — el equipo NO debe usar):
- ❌ "Hacer click" → ✅ "Pulsa" / "Selecciona"
- ❌ "Formulario" → ✅ "Datos"
- ❌ "Submit" → ✅ "Enviar"
- ❌ "Freelancer" → ✅ "Trabajador independiente"

---

## 4.2.3 Searching Systems

**Decisión**: implementamos dos capas de búsqueda.

### Capa 1 — Búsqueda global (header)
- Input `MatAutocomplete` en el topbar de la app logueada.
- **Qué busca**: oficios, trabajadores por nombre, distritos.
- **Sugerencias en vivo** tras 2 caracteres.
- **Atajos teclado**: `/` enfoca el search (accesibilidad).

### Capa 2 — Búsqueda por tarea (Search Results page)
- Input principal + `MatSelect` distrito.
- **Filtros facetados** (sidebar desktop / bottom sheet mobile):
  - Oficio (multi-checkbox)
  - Distrito (multi-select con chips)
  - Calificación mínima (slider 0–5)
  - Rango de precio (slider S/. 20–500)
  - Disponibilidad (hoy, mañana, esta semana)
- **Orden**: cercanía (default), mejor calificado, menor precio.
- **Resultados sin match**: fallback a distritos aledaños + sugerir ampliar filtros.

### Diagrama — Flujo de búsqueda

```
[ TOPBAR: input "¿Qué servicio?" ]
        │
        ▼  (escribe "gasfit…")
[ Autocomplete: "Gasfitería", "Gasfitero - San Miguel", ... ]
        │
        ▼ (selecciona "Gasfitería")
┌────────────────────────────────────┐
│   SEARCH RESULTS                   │
│ ┌────────────┬─────────────────┐   │
│ │ FILTROS    │  Resultados     │   │
│ │ □ Oficio   │  [Card 1]       │   │
│ │ □ Distrito │  [Card 2]       │   │
│ │ ═ Rating   │  [Card 3]       │   │
│ │ ═ Precio   │  ...            │   │
│ │ □ Disp.    │                 │   │
│ │ [Aplicar]  │                 │   │
│ └────────────┴─────────────────┘   │
└────────────────────────────────────┘
```

En Figma, incluye una captura del buscador con estado `autocomplete open` + una de `results + filters applied`.

---

## 4.2.4 Navigation Systems

**Decisión**: tres tipos de navegación, según contexto.

### 1. Navegación global (siempre visible)
- **Landing**: Navbar fijo con scroll suave a secciones + switcher ES/EN + login/registro.
- **App logueada desktop**: Topbar + Sidenav persistente.
- **App logueada mobile**: Topbar + Bottom Navigation con 4 tabs.

### 2. Navegación local (dentro de una sección)
- **Tabs de perfil trabajador**: Resumen / Reseñas / Galería / Tarifas.
- **Tabs de perfil editable**: Información / Oficios / Trabajos / Disponibilidad.
- **Stepper de verificación**: 3 pasos lineales.

### 3. Navegación contextual
- **Breadcrumbs** en búsqueda: `Inicio / Servicios / Gasfitería / San Miguel`.
- **Links relacionados** en FAQ (entre preguntas).
- **CTAs inteligentes**: "Ver más trabajadores similares" en perfil.

### Diagrama de navegación

```
┌──────────────────────────── NAVBAR (público) ───────────────────────────┐
│  [Logo]  Inicio · Servicios · Cómo · Trabajadores · FAQ · [Login] [Reg] │
│                                                            ES │ EN      │
└─────────────────────────────────────────────────────────────────────────┘
           │
           ▼ (click Registrarse)
┌──────────────────────────── TOPBAR (app) ───────────────────────────────┐
│  [☰]  [Ya Quedó]   [ 🔍 buscar… ]        [🔔]  [👤 Usuario ▾]          │
└─────────────────────────────────────────────────────────────────────────┘
  │                      │
  │ Sidenav (desktop)    │ Bottom Nav (mobile)
  ▼                      ▼
  🏠 Inicio              🏠   🔍   💬   👤
  🔍 Buscar
  💬 Mensajes
  📅 Mis solicitudes
  💳 Pagos
  ⭐ Reseñas
  🎓 Capacitaciones (solo trabajador)
  ⚙ Ajustes
  ↩ Cerrar sesión
```

---

## 4.2.5 Site Map

Jerarquía completa de páginas y vistas de toda la plataforma.

```
YA QUEDÓ
│
├─ / (Landing pública)
│   ├─ #inicio (Hero)
│   ├─ #problema
│   ├─ #solucion
│   ├─ #como-funciona
│   ├─ #servicios
│   ├─ #beneficios
│   ├─ #caracteristicas
│   ├─ #trabajadores
│   ├─ #impacto
│   ├─ #testimonios
│   ├─ #faq
│   └─ #pre-registro
│
├─ /terms.html  (Términos y Condiciones)
│   └─ #libro-reclamaciones
├─ /privacy.html  (Política de privacidad)
│   └─ #cookies
│
├─ /auth/
│   ├─ /register  (US-11)
│   ├─ /register/otp  (US-11 alt)
│   ├─ /login  (US-12)
│   └─ /recover  (US-12 alt)
│
├─ /app/  (logueado, rol cliente)
│   ├─ /home
│   ├─ /search
│   │   ├─ ?oficio=…&distrito=…&rating=…
│   │   └─ /empty
│   ├─ /worker/:id  (perfil trabajador)
│   │   ├─ /resumen
│   │   ├─ /resenas
│   │   ├─ /galeria
│   │   └─ /tarifas
│   ├─ /quote/request/:workerId
│   ├─ /quote/received/:quoteId
│   ├─ /booking/:bookingId
│   ├─ /payment/:bookingId
│   ├─ /payment/receipt/:txId
│   ├─ /messages
│   │   └─ /:conversationId
│   ├─ /rating/submit/:bookingId
│   ├─ /mis-solicitudes
│   └─ /ajustes
│
├─ /app/worker/  (logueado, rol trabajador)
│   ├─ /onboarding  (verificación identidad, US-13)
│   │   ├─ /dni
│   │   ├─ /selfie
│   │   └─ /revision
│   ├─ /profile-edit  (US-14)
│   ├─ /requests  (bandeja US-19)
│   ├─ /quote/respond/:requestId
│   ├─ /dashboard  (finanzas, US-22)
│   ├─ /reviews  (US-24)
│   └─ /training  (US-26)
│       └─ /course/:courseId
│           └─ /quiz
│
└─ /ayuda  (Centro de ayuda — fuera de alcance TB1, planificado)
```

**Cómo armarlo en Figma**:
1. Frame `🗺 Site Map` de 2000×1500.
2. Cada nivel del árbol = una columna.
3. Usa rectángulos redondeados con color según rol:
   - Gris claro: público
   - Lavanda (`#E0E7FF`): app cliente
   - Menta (`#D1FAE5`): app trabajador
   - Rojo claro (`#FEE2E2`): legal
4. Conecta con líneas L-shape.

---

## Checklist para el informe TB1

- [ ] Captura del diagrama Organization System
- [ ] Captura del cuadro de etiquetas (Labeling)
- [ ] Captura del prototipo del buscador + filtros (Searching)
- [ ] Captura del diagrama de navegación (Navigation)
- [ ] Captura del Site Map completo
- [ ] Breve explicación escrita por cada subsección (ya redactada arriba)
