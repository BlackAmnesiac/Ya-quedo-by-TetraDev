# 01 — Sistema de Diseño (Design Tokens)

Extraído 1:1 de `styles.css` (`:root`). Crea estos tokens como **Variables** en Figma (Modo claro único por ahora).

## 🎨 Colores

### Primario (Índigo)
| Token | Hex | Uso |
|---|---|---|
| `color/primary` | `#6366F1` | Botón principal, enlaces, acentos |
| `color/primary-dark` | `#4F46E5` | Hover botón primario, fin de gradientes |
| `color/primary-light` | `#818CF8` | Footer headings, fondos sutiles |

### Secundarios
| Token | Hex | Uso |
|---|---|---|
| `color/secondary` | `#EC4899` | Acento rosa (gradientes de iconos) |
| `color/accent` | `#10B981` | Éxito, check de listas |

### Neutrales
| Token | Hex | Uso |
|---|---|---|
| `color/dark` | `#1F2937` | Texto principal, fondo footer |
| `color/gray` | `#6B7280` | Texto secundario |
| `color/light-gray` | `#F3F4F6` | Fondos alternos de sección |
| `color/white` | `#FFFFFF` | Base, texto sobre fondos oscuros |

## 🌈 Gradientes

Crea estos como **estilos de color (gradient fill)** en Figma. Dirección: 135° (top-left → bottom-right).

| Estilo | Stops |
|---|---|
| `gradient/primary` | `#6366F1` 0% → `#4F46E5` 100% |
| `gradient/accent` | `#EC4899` 0% → `#10B981` 100% |
| `gradient/hero` | `#667EEA` 0% → `#764BA2` 100% |

## ✍️ Tipografía

Fuente: **Inter** (fallback: -apple-system, Segoe UI, Roboto). Carga desde Google Fonts en Figma.

| Estilo | Font | Tamaño desktop | Tamaño mobile (≤768) | Weight | Line-height |
|---|---|---|---|---|---|
| `text/h1` | Inter | 56px (3.5rem) | 32px | 700 | 1.2 |
| `text/h2` | Inter | 40px (2.5rem) | 32px | 700 | 1.2 |
| `text/h3` | Inter | 30px (1.875rem) | 24px | 700 | 1.2 |
| `text/h4` | Inter | 24px (1.5rem) | 24px | 700 | 1.2 |
| `text/h5` | Inter | 20px (1.25rem) | 20px | 700 | 1.2 |
| `text/body-lg` | Inter | 20px (1.25rem) | 18px | 400 | 1.6 |
| `text/body` | Inter | 16px (1rem) | 16px | 400 | 1.6 |
| `text/body-sm` | Inter | 14px (0.875rem) | 14px | 400 | 1.6 |
| `text/button` | Inter | 16px | 14px | 600 | 1.0 |
| `text/stat-number` | Inter | 48px (3rem) | 40px | 700 | 1.0 |
| `text/logo` | Inter | 24px (1.5rem) | 24px | 800 | 1.2 |

## 📐 Espaciado (escala 4px)

| Token | Valor |
|---|---|
| `space/1` | 4px |
| `space/2` | 8px |
| `space/3` | 12px |
| `space/4` | 16px (1rem) |
| `space/5` | 20px |
| `space/6` | 24px |
| `space/8` | 32px (2rem) |
| `space/10` | 40px |
| `space/12` | 48px (3rem) |
| `space/16` | 64px (4rem) |
| `space/20` | 80px (5rem) — **padding vertical de sección** |

## 🟦 Border Radius

| Token | Valor |
|---|---|
| `radius/sm` | 8px (0.5rem) — botones |
| `radius/md` | 16px (1rem) — cards |
| `radius/full` | 9999px — avatares, badges, iconos circulares |

## 🌑 Sombras (Effects en Figma)

| Token | X, Y, Blur, Spread | Color |
|---|---|---|
| `shadow/sm` | 0, 1, 2, 0 | `rgba(0,0,0,0.05)` |
| `shadow/md` | 0, 4, 6, -1 | `rgba(0,0,0,0.10)` |
| `shadow/lg` | 0, 10, 15, -3 | `rgba(0,0,0,0.10)` |
| `shadow/xl` | 0, 20, 25, -5 | `rgba(0,0,0,0.10)` |

## 📏 Layout / Grid

- **Desktop container**: `max-width: 1200px`, margin auto, padding horizontal 32px.
- **Breakpoints**:
  - Desktop: `≥ 1025px`
  - Tablet: `769–1024px`
  - Mobile large: `481–768px`
  - Mobile small: `≤ 480px`
- **Frame anchos recomendados en Figma**: **1440** (desktop) y **375** (mobile iPhone-like).

## 📋 Checklist de creación de Variables en Figma

- [ ] 10 variables de Color (primary, primary-dark, primary-light, secondary, accent, dark, gray, light-gray, white, + fondo sección alternado)
- [ ] 3 estilos de gradiente (primary, accent, hero)
- [ ] 11 estilos de texto (h1–h5, body-lg, body, body-sm, button, stat-number, logo)
- [ ] 4 estilos de efecto (shadow sm, md, lg, xl)
- [ ] 3 variables de radius (sm, md, full)
