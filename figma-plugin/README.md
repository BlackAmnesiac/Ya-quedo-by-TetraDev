# Ya Quedó · Plugin Generator para Figma

Plugin que automatiza la creación del Design System + componentes base + frames esqueleto del proyecto **Ya Quedó** directamente dentro de tu archivo Figma.

## Qué genera (todo de un golpe)

- ✅ **13 Paint Styles**: 10 colores + 3 gradientes
- ✅ **11 Text Styles** con fuente Inter (todos los pesos necesarios)
- ✅ **4 Effect Styles** (sombras sm, md, lg, xl)
- ✅ **Componentes**: Button/Primary, Button/Secondary, Navbar/Desktop
- ✅ **Frame esqueleto Desktop Landing** (1440×8500) con las 14 secciones ya dimensionadas
- ✅ **Frame esqueleto Mobile Landing** (375×13500) con las 14 secciones

Al terminar, tú solo completas el contenido de cada sección siguiendo [03-screens-desktop.md](../figma-design/03-screens-desktop.md) y [04-screens-mobile.md](../figma-design/04-screens-mobile.md).

## Requisitos

- **Figma Desktop** (no funciona en browser para plugins en desarrollo).
  Descarga: https://www.figma.com/downloads/

## Instalación (una sola vez, 2 minutos)

1. Abre **Figma Desktop**.
2. Crea o abre un archivo en blanco donde quieras generar el proyecto.
3. En el menú: **Plugins → Development → Import plugin from manifest…**
4. Navega a `C:\Users\USER\Documents\Ya-quedo-by-TetraDev\figma-plugin\manifest.json` y seleccionalo.
5. El plugin aparecerá en **Plugins → Development → Ya Quedó · Generator**.

## Ejecutar (10 segundos)

1. Con un archivo Figma abierto (mejor si está vacío), ve a:
   **Plugins → Development → Ya Quedó · Generator**
2. El plugin se ejecuta solo. Al terminar verás un mensaje:
   > ✅ Ya Quedó generado: 10 colores + 3 gradientes + 11 text styles + 4 sombras + Button/Primary + Button/Secondary + Navbar/Desktop + Desktop Landing skeleton + Mobile Landing skeleton.

3. El viewport hace auto-zoom a los frames generados.

## Qué viste después de correrlo

- En el **panel derecho → Assets** verás:
  - Colors: los 13 styles organizados bajo `Color/...` y `Gradient/...`
  - Text: 11 styles bajo `Text/...`
  - Effects: 4 styles bajo `Shadow/...`
  - Components: `Button/Primary`, `Button/Secondary`, `Navbar/Desktop`
- En el canvas:
  - A la izquierda: **🖥 Desktop · Landing** (1440×8500) con 14 secciones placeholder
  - A la derecha: **📱 Mobile · Landing** (375×13500) con las secciones mobile
  - Al centro: los componentes sueltos listos para usar

## Qué hacer después

1. **Mueve los componentes a una página propia**: crea una página `🧩 Components` y arrastra ahí Button/Primary, Button/Secondary y Navbar/Desktop.
2. **Mueve los frames Landing a su propia página**: página `🖥 Desktop — Landing` y `📱 Mobile — Landing`.
3. **Completa cada sección placeholder**: sigue el contenido detallado en [../figma-design/03-screens-desktop.md](../figma-design/03-screens-desktop.md).
4. **Importa los screenshots como referencia visual** (explicado en [../figma-design/05-figma-build-guide.md](../figma-design/05-figma-build-guide.md) Paso 9).

## Troubleshooting

- **"Cannot find manifest.json"**: asegúrate de tener el archivo `manifest.json` y `code.js` juntos en la misma carpeta.
- **"Font Inter not found"**: instala Inter desde https://fonts.google.com/specimen/Inter y reinicia Figma Desktop.
- **El plugin no aparece en el menú**: cierra y reabre Figma Desktop después de importar.
- **Error al ejecutar**: copia el mensaje exacto y lo depuramos.

## Limitaciones conocidas

- El plugin genera el **esqueleto**, no el contenido visual final de cada sección (las 14 secciones tienen solo un label placeholder). El relleno lo haces tú en ~1-2 horas siguiendo los docs.
- Los gradientes `Gradient/hero` están guardados como Paint Style pero Figma no siempre renderiza los 3 gradientes del mismo modo que CSS. Verifica en la pantalla.
- Los componentes Button se crean sin variants para mantener el plugin simple. Puedes agregar variants manualmente (Panel derecho → + Variant).

---

¿Preguntas? Revisa [../figma-design/05-figma-build-guide.md](../figma-design/05-figma-build-guide.md) o [../figma-design/FIGMA-QUICKSTART.md](../figma-design/FIGMA-QUICKSTART.md).
