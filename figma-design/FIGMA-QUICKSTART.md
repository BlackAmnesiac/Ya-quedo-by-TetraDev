# 🚀 Figma Quickstart — Primeros 30 minutos

Sigue estos 10 pasos en orden. Al final tendrás el **Design System + Navbar + Hero** listos y el resto se compone por replicación.

Ten abierto en paralelo: el navegador con la landing en [local](file:///C:/Users/USER/Documents/Ya-quedo-by-TetraDev/index.html) (o la URL pública una vez desplegada).

---

## Paso 1 · Crear el archivo (1 min)

1. Ve a https://figma.com y haz click en **"+ New design file"**.
2. Renómbralo a **`Ya Quedó — TB1`** (click en el título arriba-centro).
3. Panel izquierdo → **Pages** → crea estas páginas (doble click para renombrar):
   - `📐 Cover`
   - `🎨 Design System`
   - `🧩 Components`
   - `🖥 Desktop — Landing`
   - `📱 Mobile — Landing`
   - `🗺 Info Architecture`
   - `🔀 User Flows`
   - `🖥 App Desktop`
   - `📱 App Mobile`
   - `📝 Wireframes Lo-Fi`

---

## Paso 2 · Instalar la fuente Inter (1 min)

Figma detecta Google Fonts automáticamente. Solo empieza a escribir un texto y en el selector de fuente escribe `Inter` — debe aparecer. Si no aparece, instala [Inter desde Google Fonts](https://fonts.google.com/specimen/Inter) en tu sistema.

---

## Paso 3 · Crear las variables de color (5 min)

Estás en página `🎨 Design System`. Panel derecho → **Variables** (icono con ≡).

Click **"+ Create collection"** → nombre: `Ya Quedó`.

Dentro de la colección, click **"+"** en la sección Color y crea estas 10 variables (copia/pega los hex):

```
primary        = #6366F1
primary-dark   = #4F46E5
primary-light  = #818CF8
secondary      = #EC4899
accent         = #10B981
dark           = #1F2937
gray           = #6B7280
light-gray     = #F3F4F6
white          = #FFFFFF
error          = #EF4444
```

---

## Paso 4 · Crear los estilos de texto (5 min)

Crea un texto de prueba (tecla `T` + click en canvas).

En el panel derecho, sección **Typography** → `Create style` (icono de 4 puntos). Crea estos 11 estilos con Inter:

| Nombre del estilo | Tamaño | Weight | Line-height |
|---|---|---|---|
| `h1` | 56 | 700 | 120% |
| `h2` | 40 | 700 | 120% |
| `h3` | 30 | 700 | 120% |
| `h4` | 24 | 700 | 120% |
| `h5` | 20 | 700 | 120% |
| `body-lg` | 20 | 400 | 160% |
| `body` | 16 | 400 | 160% |
| `body-sm` | 14 | 400 | 160% |
| `button` | 16 | 600 | 100% |
| `stat-number` | 48 | 700 | 100% |
| `logo` | 24 | 800 | 120% |

> Atajo: crea el primero con T+click, asigna tamaño y peso, en el panel derecho de Typography click en los **4 puntitos → + (Create style)** → ponle nombre. Luego duplica el texto y repite.

---

## Paso 5 · Crear los estilos de sombra (2 min)

Crea un rectángulo cualquiera con `R`. Panel derecho → **Effects** → `+ Drop shadow`. Configura:

| Nombre | X | Y | Blur | Spread | Color |
|---|---|---|---|---|---|
| `shadow-sm` | 0 | 1 | 2 | 0 | rgba(0,0,0,0.05) |
| `shadow-md` | 0 | 4 | 6 | -1 | rgba(0,0,0,0.10) |
| `shadow-lg` | 0 | 10 | 15 | -3 | rgba(0,0,0,0.10) |
| `shadow-xl` | 0 | 20 | 25 | -5 | rgba(0,0,0,0.10) |

Guarda cada uno como style: click en **4 puntitos al lado de Effects → + Create style**.

---

## Paso 6 · Construir el botón primary (3 min)

En página `🧩 Components`:

1. `R` → rectángulo 180×48, fill `primary`, corner radius 8.
2. `T` → texto "Buscar servicio", estilo `button`, color `white`. Céntralo sobre el rectángulo.
3. Selecciona los dos → `Ctrl+G` (grupo) → luego `Shift+A` para convertir a Auto Layout.
4. Click en el grupo → ajusta padding a 14 arriba/abajo y 32 a los lados.
5. `Ctrl+Alt+K` (crear componente). Renómbralo `Button/Primary`.

**Bonus (hover variant)**:
- Seleccionado el componente → panel derecho **+ Variants**.
- En Variant Properties añade `state: default, hover`.
- Duplica el frame → variante `hover`: añade `shadow-xl`, translate -2px en Y.

---

## Paso 7 · Construir el navbar (5 min)

Aún en `🧩 Components`:

1. `F` → Frame 1440×70, fill `white` 95%, **Effects** → `Background Blur 10`.
2. Dentro crea (todo en Auto Layout horizontal, space-between, padding 16 · 32):
   - **Izquierda**: texto "Ya Quedó" con estilo `logo` y fill gradient `primary → primary-dark`.
   - **Derecha**: un Auto Layout horizontal con los 7 elementos:
     - Inicio · Servicios · Cómo funciona · Trabajadores · FAQ · Iniciar sesión (texto `body` color `dark`)
     - Instancia de `Button/Primary` con texto "Registrarse"
     - Switcher ES/EN (dos botoncitos redondos, radius full, `ES` fondo blanco y `EN` transparente)
3. `Ctrl+Alt+K` → componente `Navbar/Desktop`.

---

## Paso 8 · Armar el frame Desktop Landing (3 min)

Ve a `🖥 Desktop — Landing`.

1. `F` → selecciona **Desktop 1440** de la paleta derecha de Frames. Dale altura 8500 provisional.
2. Arrastra una instancia de `Navbar/Desktop` al top.
3. Debajo, crea el Hero:
   - Frame 1440×620, fill gradient `#667EEA → #764BA2` a 135°.
   - Auto Layout vertical, padding 128 top, 64 bottom, 32 horizontal, align center.
   - Texto H1 blanco: "Encuentra el servicio que necesitas, al instante".
   - Texto body-lg blanco: el subtítulo.
   - Auto Layout horizontal con 2 botones (Primary + otro Secondary que crees igual que el Primary pero con fill white / border primary).

---

## Paso 9 · Importar los screenshots de referencia (2 min)

1. Dentro del frame Desktop Landing, crea un rectángulo al costado (fuera del frame, en el canvas).
2. Arrastra [desktop-full.png](./screenshots/desktop-full.png) sobre ese rectángulo.
3. Selecciónalo → botón derecho → **Lock** (para no moverlo por accidente).
4. Escálalo al 50% y déjalo a la derecha de tu frame como referencia visual.

Haz lo mismo con [mobile-full.png](./screenshots/mobile-full.png) en la página `📱 Mobile — Landing`.

---

## Paso 10 · Guardar y compartir (1 min)

1. Click arriba-derecha en **"Share"**.
2. En "Anyone with the link" elige **"Can view"**.
3. Copia el link.
4. Agrégalo al informe TB1 en la sección 4.3.2 / 4.4.2 / 4.5.

---

## ✅ Al terminar estos 30 min tendrás

- Design System (colores + tipografía + sombras) listo
- 2 componentes base (`Button/Primary`, `Navbar/Desktop`)
- Hero del Desktop Landing armado
- Screenshots como referencia
- Link compartido del archivo

## Qué sigue (siguientes 2 horas)

Sigue sección por sección de [03-screens-desktop.md](./03-screens-desktop.md):
- Problema → 3 cards (componente `Card/Problem`)
- Solución → 2 columnas
- Cómo funciona → 4 steps (`Card/Step`)
- Servicios → 6 categorías (`Card/Service`)
- Beneficios → 2 bloques
- Características → 6 features (`Card/Feature`)
- Trabajadores → sección con stats
- Impacto → 4 stats
- Testimonios → 3 cards (`Card/Testimonial`)
- FAQ → 6 items (`FAQ Item`)
- Pre-registro → form card
- Footer → 5 columnas

Regla de oro: **cada tarjeta es un componente**. Úsalos como instancias, no copies/pegues.

---

Cuando termines el Desktop, el Mobile sale casi solo duplicando el frame y ajustando Auto Layouts a 1 columna.
