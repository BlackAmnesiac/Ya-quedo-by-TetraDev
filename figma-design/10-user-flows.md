# 10 — User Flow Diagrams (Sección 4.4.3 del TB1)

> El TB1 exige un **User Flow por cada User Goal**, incluyendo **happy path y al menos un unhappy path**. Cada diagrama debe incluir el User Goal y una breve explicación.

Total de user goals cubiertos: **8** (4 del segmento cliente + 4 del segmento trabajador).

**Cómo armarlo en Figma**:
1. Crea una página `🔀 User Flows` en el archivo Figma.
2. Por cada flujo crea un frame de ~2400×1400.
3. Usa la notación estándar:
   - Rectángulo redondeado = pantalla
   - Rombo = decisión del sistema
   - Flecha sólida = happy path
   - Flecha punteada = unhappy / alt path
   - Etiqueta en la flecha = evento disparador (click, submit, timeout, error)
4. Incluye miniaturas de las pantallas (de los mockups hi-fi) dentro de cada rectángulo.

---

## Convenciones

```
    ┌────────┐
    │Pantalla│       ◇ Decisión     → Happy   ⇢ Unhappy
    └────────┘
```

---

## Flow 01 — User Goal: Cliente contrata un servicio técnico
**Frame Figma**: `Flow/Client/Hire Service`

### Happy Path
```
Landing
  │ click "Buscar servicio"
  ▼
Register ──submit──► OTP ──code OK──► Home
                                        │ busca "gasfitería"
                                        ▼
                                    Search Results
                                        │ aplica filtros
                                        ▼
                                    Worker Profile (ver reseñas)
                                        │ click "Solicitar cotización"
                                        ▼
                                    Quote Request (llenar form + enviar)
                                        │ trabajador responde
                                        ▼
                                    Quote Received
                                        │ click "Aceptar y agendar"
                                        ▼
                                    Schedule (elige slot)
                                        │ confirma
                                        ▼
                                    Payment (elige Yape)
                                        │ pago ok
                                        ▼
                                    Receipt
                                        │ servicio ejecutado
                                        ▼
                                    Rating (5⭐ + comentario)
                                        │
                                        ▼
                                       END
```

### Unhappy paths (ramas)

| Punto | Caso | Comportamiento |
|---|---|---|
| Register | Email ya existe | Banner "Este correo ya está registrado" + link "Recuperar contraseña" |
| OTP | Código inválido 3× | Mostrar mat-error + habilitar reenviar código tras 60s |
| Search | No hay resultados en distrito | Muestra resultados de distritos aledaños + mensaje explicativo |
| Quote Request | Sin conexión | Guarda offline con `MatSnackBar` "Se enviará cuando tengas conexión" |
| Quote Response | Trabajador no responde en 2h | Sistema notifica al cliente y sugiere contactar a otros |
| Schedule | Slot ya no disponible | Sistema propone los siguientes slots libres |
| Payment | Pago falla (tarjeta rechazada) | MatDialog "Pago falló. Intenta con otro método" |
| Payment | Pasarela caída | Mensaje "Pausamos tu transacción, te avisaremos" |
| Rating | Comentario con lenguaje ofensivo | Banner amarillo "Revisaremos tu comentario antes de publicar" |

---

## Flow 02 — User Goal: Cliente compara cotizaciones de varios trabajadores
**Frame Figma**: `Flow/Client/Compare Quotes`

### Happy Path
```
Worker Profile (trabajador A)
  │ click "Solicitar cotización"
  ▼
Quote Request
  ├─ marca checkbox "Enviar también a 2 trabajadores similares"
  │ submit
  ▼
Inbox cliente (3 solicitudes activas)
  │ esperar respuestas
  ▼
Quote Received (3 cotizaciones)
  │ compara monto/tiempo/rating
  │ elige el mejor
  ▼
Accept + Schedule → Payment → END
```

### Unhappy paths
- Solo 1 trabajador responde → cliente elige con esa cotización o rechaza todas
- Ningún trabajador responde en 24h → banner "Sin respuestas aún. Te notificaremos"
- Cliente rechaza las 3 → vuelve a Search

---

## Flow 03 — User Goal: Cliente reclama por un mal servicio
**Frame Figma**: `Flow/Client/Dispute`

### Happy Path
```
Receipt (servicio concluido)
  │ NO confirma en 72h  OR  confirma con nota negativa
  ▼
Rating Submit (1-2 estrellas)
  │ botón "Abrir disputa"
  ▼
Dispute Form (descripción + foto evidencia)
  │ submit
  ▼
Status: En revisión (fondos retenidos)
  │ soporte analiza 48h
  ▼
Resolución: reembolso total / parcial / sin lugar
  │
  ▼
Cliente recibe notificación + monto devuelto (si aplica)
```

### Unhappy paths
- Cliente no sube evidencia → form rechaza, pide al menos 1 foto
- Pasado el plazo de 7 días sin responder al soporte → caso se cierra a favor del trabajador
- Soporte necesita más info → solicita datos extra vía chat de soporte

---

## Flow 04 — User Goal: Cliente encuentra respuesta a una duda sin contactar soporte (FAQ)
**Frame Figma**: `Flow/Client/FAQ Self-service`

### Happy Path
```
Landing
  │ click nav "FAQ"
  ▼
FAQ Section
  │ expande pregunta "¿Cómo sé que un trabajador es confiable?"
  ▼
Respuesta visible (inline)
  │
  ▼
END (duda resuelta)
```

### Unhappy paths
- Ninguna FAQ responde su duda → CTA "Contactar soporte" (abre email / chat)
- Usuario no encuentra sección FAQ → Site search lo dirige

---

## Flow 05 — User Goal: Trabajador se registra y obtiene la insignia "Verificado"
**Frame Figma**: `Flow/Worker/Onboarding + Verify`

### Happy Path
```
Landing (CTA "Soy trabajador")
  │ toggle cambia al modo trabajador
  ▼
Register → OTP → Login post-registro
  │
  ▼
Identity Verify / Step 1 (sube DNI anverso y reverso)
  │ ok
  ▼
Identity Verify / Step 2 (sube selfie con DNI)
  │ ok
  ▼
Identity Verify / Step 3 — Status "En revisión"
  │ 48h pasan, documentos válidos
  ▼
Status "Verificado" (insignia visible) → email de notificación
  │
  ▼
Profile Edit (completa oficios, tarifas, fotos) → END
```

### Unhappy paths
- Foto DNI ilegible → Status "Rechazado" + motivo + botón "Reintentar" → vuelve a Step 1
- Usuario abandona en Step 2 → email recordatorio a los 2 días
- Falla subida (error de red) → retry automático, preserva los otros datos del formulario (US-13 criterio error)
- DNI no corresponde al rostro de la selfie → Status "Rechazado" por fraude, bloqueo manual

---

## Flow 06 — User Goal: Trabajador acepta una solicitud y cobra por el servicio
**Frame Figma**: `Flow/Worker/Accept + Get Paid`

### Happy Path
```
Dashboard trabajador
  │ notificación "Nueva solicitud de Juan"
  ▼
Requests Inbox (abre solicitud)
  │ lee descripción + fotos
  │ click "Responder"
  ▼
Quote Response (monto S/. 180, 2h, mañana 10am)
  │ submit
  ▼
Chat (cliente pregunta y confirma)
  │ cliente acepta cotización y agenda
  ▼
Booking confirmado (calendario sync)
  │ trabajador ejecuta el servicio
  ▼
Cliente confirma → 24h después
  ▼
Dashboard Finance: monto neto acreditado
  │
  ▼
Retiro a Yape/cuenta bancaria → END
```

### Unhappy paths
- Trabajador no responde en 2h → ranking baja + cliente notificado, solicitud expira
- Cliente rechaza cotización → Trabajador recibe notificación, solicitud cerrada
- Trabajador rechaza solicitud → cliente ve alternativas sugeridas
- Cliente no confirma tras servicio → liberación automática a las 72h (US-22 criterio alt)
- Cliente abre disputa → fondos retenidos, soporte interviene (ver Flow 03)

---

## Flow 07 — User Goal: Trabajador responde a una reseña negativa
**Frame Figma**: `Flow/Worker/Answer Bad Review`

### Happy Path
```
Notificación "Recibiste una reseña de 2⭐"
  ▼
Reviews Panel
  │ abre reseña
  │ click "Responder"
  ▼
Response Dialog (escribe respuesta profesional, <500 chars)
  │ submit
  ▼
Filtro de contenido automático → OK
  ▼
Respuesta publicada bajo la reseña → END
```

### Unhappy paths
- Texto > 500 chars → mat-error "Máximo 500 caracteres" bloquea submit
- Contenido ofensivo detectado → MatSnackBar "Tu respuesta fue rechazada por el filtro" + sugerencia de tono
- Reseña era falsa/abusiva → reportar al soporte (flujo separado)

---

## Flow 08 — User Goal: Trabajador sube de nivel con capacitación
**Frame Figma**: `Flow/Worker/Training + Badge`

### Happy Path
```
Dashboard trabajador
  │ ve card "Mejora tu perfil con capacitación"
  ▼
Training Catalog
  │ elige curso "Seguridad eléctrica nivel 1"
  ▼
Course Detail (ve video 8 min)
  │ finaliza video
  ▼
Quiz (5 preguntas)
  │ aprueba (≥ 4/5)
  ▼
Insignia del curso añadida al perfil → email + notificación
  │
  ▼
Perfil público actualizado con la insignia → END
```

### Unhappy paths
- Video no carga → "Descargar para ver sin conexión" (US-26 criterio error)
- Quiz < 4/5 → "Puedes reintentar en 24h" con timer
- Abandona el video → al volver, reanuda desde donde quedó
- Insignia se pierde si deja la plataforma 6 meses → email de alerta 30 días antes

---

## Evidencia para el informe

Por cada flujo, la entrega ideal en TB1 incluye:
1. **Un frame de Figma** con el diagrama armado
2. **User Goal** escrito arriba del frame
3. **Explicación de 3-5 líneas** del recorrido y las ramas unhappy
4. **Link al prototipo navegable** (dentro del archivo Figma) para cada flujo

Para el video de 3-5 minutos exigido en **4.5 Prototyping**, prioriza demostrar:
- Flow 01 (Cliente contrata servicio) — core business
- Flow 05 (Onboarding trabajador) — core business trabajador
- Flow 06 (Trabajador cobra) — cierre del loop económico

Los otros flujos se muestran con un barrido rápido como evidencia de cobertura.
