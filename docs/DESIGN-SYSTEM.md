# 8LEAKS — Sistema de Diseño de Referencia

**Estado: APROBADO.** Este documento describe el lenguaje visual que ya construimos y quedó cerrado como línea base oficial. No es una propuesta — es la referencia contra la que se audita todo trabajo visual futuro.

## 0. Fuente de verdad

Dos páginas son la fuente de verdad visual del proyecto. Ante cualquier duda de diseño, se revisan ellas y sus componentes, no se reinterpreta el lenguaje desde cero:

- **Home** — `src/pages/index.astro` (+ `Hero.astro`, `LatestArticles.astro`, `PostRow.astro`): identidad institucional y de portada.
- **Artículo individual** — `src/pages/articulos/[slug].astro` (+ `ArticleHeader.astro`, `ArticleBrandIdentity.astro`, `ArticleCover.astro`, `ArticleBody.astro`, `ArticleSources.astro`): identidad editorial y de lectura.

`Header.astro` y `Footer.astro` son globales y los reutilizan ambas. `src/styles/tokens.css` y `src/styles/global.css` son la base compartida.

Las capturas de X Corp en `./references/` fueron **inspiración de proceso** (jerarquía, escala, disciplina tipográfica) durante la construcción de este sistema. Ya cumplieron su función: **la referencia activa a partir de ahora es 8LEAKS mismo** (Home + artículo), no X.

## 1. Principio

8LEAKS debe sentirse como medio editorial digital corporativo, premium, minimalista, contemporáneo, con identidad propia — nunca como blog personal, plantilla genérica, portal de noticias tradicional, dashboard, sitio Bootstrap, colección de cards o landing de startup.

La fuerza visual viene de: **negro, blanco, grises, tipografía, escala, composición, contraste, espacio negativo, alineación, jerarquía editorial.** No de decoración. Evitar deliberadamente: sombras innecesarias, cards genéricas, bordes redondeados grandes, gradients decorativos, badges, cajas alrededor de cada elemento, exceso de líneas/colores, iconografía decorativa, fondos de color arbitrarios, layouts fragmentados.

Menos elementos, más presencia.

## 2. Color — `src/styles/tokens.css`

Paleta esencialmente monocromática. El gris es parte de la identidad, no un color secundario — **los textos no tienen que ser negro puro.**

| Token | Valor | Uso |
|---|---|---|
| `--color-black` | `#000000` | Header, Footer, Hero, superficies institucionales importantes |
| `--color-paper` / `--color-white` | `#ffffff` | Fondo de toda zona editorial/lectura |
| `--color-ink-900` | `#2e2c28` | Titulares de mayor jerarquía en zona clara (grafito oscuro, no negro puro) |
| `--color-ink-950` | `#18160f` | Negro casi puro — reservado para estados de énfasis (p. ej. hover de títulos, hoy preparado pero sin activar) |
| `--color-graphite-600` | `#657887` | **El gris principal del sistema**: títulos de post, metadata (autor · fecha), estados vacíos, publishers de fuentes. Es el único gris de metadata/título — el gris anterior (`--color-gray-500`) fue eliminado del proyecto a propósito |
| `--color-gray-700` | `#5b584f` | Cuerpo/excerpt en zona clara |
| `--color-gray-200` | `#e6e3db` | Divisores finos sobre fondo claro |
| `--color-gray-400` | `#9a978f` | Reservado, sin uso activo actualmente |
| `--color-text-on-dark` | `#f3f2ef` | Texto principal sobre fondo negro (casi blanco, no blanco puro) |
| `--color-text-on-dark-secondary` | `#a6a49d` | Texto secundario sobre fondo negro |
| `--color-amber-500` | `#ff6a00` | Ámbar vivo — únicamente detalles pequeños sobre superficies de buen contraste (líneas, microacentos) |
| `--color-amber-600` | `#c25100` | Mismo matiz oscurecido para texto chico sobre fondo claro (AA) |

**Reglas de color:**
- El ámbar/naranja es un acento deliberadamente escaso. No reintroducir el tono anterior (`#c1802f`/`#96621f`) ni ampliar su uso a superficies grandes, navegación o titulares principales.
- No introducir colores de marca nuevos sin aprobación explícita.
- Todo texto sobre `--color-paper` debe verificarse contra AA (4.5:1 texto normal, 3:1 texto grande) antes de aprobarse — no es opcional, es parte del sistema.

## 3. Tipografía

- **Familia:** `--font-sans: "Outfit", Arial, "Helvetica Neue", Helvetica, sans-serif` — cargada vía Google Fonts en `Layout.astro`. No cambiar la familia global sin autorización explícita.
- **Escala** (cada token corresponde a un uso real, no hay tamaños de relleno): `--text-meta` (14px, metadata/eyebrow/nav secundario/footer), `--text-nav` (15px, nav del Header), `--text-body` (16px, excerpt/dek), `--text-hero-support`, `--text-post-title` (~28-40px, único tamaño para todos los posts de un listado — sin distinción "principal/secundario"), `--text-section-heading` (28px), `--text-hero` (~43-95px, H1 institucional), `--text-article-title` (~28-44px, H1 de artículo), `--text-article-body` (15px).
- **Tracking fijo en píxeles** (`--tracking-display: -0.4px`, `--tracking-body: 0.4px`) — negativo en tipografía de exhibición grande, positivo en texto chico. Deliberadamente no usa `em`/`rem`: no debe escalar con el tamaño de fuente.
- **Line-height:** `--leading-solid: 1` para tipografía de exhibición (titulares); `--leading-meta: 24px` fijo como ritmo vertical para nav/metadata/footer; `--leading-relaxed` para cuerpo largo de lectura.
- Los titulares deben tener actitud — grandes, peso fuerte, compactos. Pero no todas las páginas son un H1 gigante: la escala responde a la función editorial de cada página (institucional en Home, de lectura en artículo).

## 4. Espacio negativo

Uno de los principios más importantes. El espacio vacío es parte del diseño, no un vacío a rellenar.

- No centrar todo por default solo porque haya espacio disponible.
- Las composiciones asimétricas son parte del lenguaje: la página de artículo desplaza la columna de lectura hacia la derecha (`--container-reading`, `--reading-offset`) y usa el margen izquierdo para la firma institucional (`ArticleBrandIdentity.astro`), en vez de centrar todo por defecto.
- No rellenar huecos automáticamente con contenido, líneas o cajas.

## 5. Marca — `public/brand/`

Assets oficiales, no recrear ni generar variantes nuevas sin autorización:

- `8leaks-logo-horizontal.png` — Header (nav global), Footer (si aplica).
- `8leaks-symbol.png` (isotipo 8L) — elemento gráfico de gran escala (Hero de Home: centrado, gigante, con el titular superpuesto encima).
- `8leaks-logo-vertical.png` — Footer, cuando la composición lo justifique.
- `logo-redondo.png` — firma editorial circular (`ArticleBrandIdentity.astro` en la página de artículo).

El logo no tiene un tamaño fijo único: puede ser discreto en navegación o dominante como elemento gráfico institucional (como el isotipo del Hero). La escala responde a la composición de cada contexto, no a una regla universal.

## 6. Home — patrón institucional

Header negro minimalista → Hero negro de gran escala (isotipo 8L centrado y gigante de fondo, titular "Lo que está pasando ahora" superpuesto, sin subtítulo) → zona blanca con listado editorial horizontal tipográfico (sin imágenes, sin cards, título único por post en `--color-graphite-600`, categoría discreta, metadata) → Footer negro institucional (columnas de navegación + logo vertical grande).

## 7. Artículo individual — patrón de lectura

Header global → **sin hero adicional**, fondo blanco directo → columna editorial controlada (`--container-reading: 720px`) desplazada hacia la derecha → firma institucional lateral (logo circular + "8LEAKS" + "@8leaks") alineada con el tope del titular, solo en desktop (≥1024px) → categoría pequeña, título grande y pesado en negro, bajada gris, metadata discreta → portada opcional (se retira sola si falla, sin placeholder) → cuerpo en gris azulado (`--color-graphite-600`) con h2/h3/listas/blockquotes/enlaces editoriales, sin cards → sección "Fuentes" limpia → Footer global.

La firma lateral es una **firma institucional**, no un sidebar tradicional — no lleva bordes, fondos ni cards, y no es sticky (se va con el scroll junto al resto del encabezado).

## 8. Header y Footer

Componentes globales (`Header.astro`, `Footer.astro`), reutilizados sin cambios por ambas páginas de referencia. Las páginas nuevas los reutilizan tal cual — no se crean headers/footers por sección. Cualquier cambio global a estos dos componentes requiere justificación y aprobación explícita antes de implementarse.

## 9. Consistencia ≠ mismo layout

Mantener la identidad **no** significa clonar el layout de Home o de artículo en cada página nueva. Una página de categoría, de autor, o "Sobre 8LEAKS" puede tener una composición propia. Lo que se mantiene es el **sistema**: tipografía, paleta, spacing, jerarquía, composición, marca, minimalismo, proporciones, lenguaje editorial — no una plantilla fija repetida.

## 10. Responsive

Desktop puede usar composiciones editoriales ambiciosas y mucho espacio negativo (p. ej. la firma lateral del artículo, visible solo ≥1024px). Tablet preserva la jerarquía. Mobile prioriza lectura, claridad, navegación y jerarquía por sobre preservar layouts de múltiples columnas — se simplifica sin forzar el desktop a pantallas chicas (ver cómo `ArticleBrandIdentity` se oculta por completo en mobile en vez de forzar una versión horizontal).

## 11. Category Pages — `/politica/` es la plantilla maestra

**Estado: APROBADO.** `src/pages/politica/index.astro` es la referencia
canónica visual de toda página de categoría de 8LEAKS (`/economia/`,
`/geopolitica/`, `/otros-blogs/`, y cualquier otra sección temática futura).
No es "una página más que se parece a Política" — es la plantilla: las
páginas de categoría comparten el mismo `Header`, `CategoryBanner`,
`LatestArticles`/`PostRow` y `Footer` sin reimplementar CSS por página.
Consistencia aquí significa **reutilización estructural**, no "quedó
parecido".

**Composición de una página de categoría:**

```
<Header transparentOverHero />
<main>
  <CategoryBanner title=... subtitle=... imageSrc=... overlayHeader />
  <LatestArticles items={...} />
</main>
<Footer />
```

Lo único que cambia entre categorías: el `imageSrc`/color del banner, el
`title`/`subtitle` de texto, el `title`/`description` de SEO en `Layout`, y
el filtro de artículos (`getPublishedArticlesByCategory("<category>")`, en
`src/lib/articles.ts`). Todo lo demás — Header, CategoryBanner, PostRow,
Footer, tokens, spacing — se reutiliza sin cambios.

**Header transparente-sobre-banner** (patrón aprobado, no experimental):

- `<Header transparentOverHero />` activa el comportamiento opt-in (default
  `false`, no afecta a Home ni al artículo individual, que siguen usando
  `<Header />` a secas).
- Mientras el `CategoryBanner` (con `overlayHeader`, que agrega
  `data-header-overlay-target`) sigue intersectando la franja bajo el
  Header, el Header queda transparente (`.is-transparent`: `background:
  transparent`, `border-bottom-color: transparent`). En cuanto el banner
  deja de intersectar esa franja, el Header vuelve a negro
  (`var(--color-black)`). Detección vía `IntersectionObserver` con
  `rootMargin` igual a la altura real del Header (medida en runtime con
  `getBoundingClientRect()`, no un `scrollY` fijo).
- Fallback seguro: el HTML server-rendered siempre arranca negro. Solo pasa
  a transparente si JS confirma banner + observer disponibles.
- El auto-hide existente del Header (`.is-hidden` al bajar, reaparece al
  subir o al detenerse) es independiente de `.is-transparent` — ambos
  estados conviven sin interferirse, y no se modifica su lógica para
  páginas de categoría.
- Mobile: mismo comportamiento, mismo Header, mismo menú (fondo negro sólido
  al abrirse aunque el Header exterior esté transparente).

**Valores actuales del Header** (medidos en runtime, no recalculados a
mano — si el Header cambia, volver a medir en vez de reusar estos números):

- Altura total: **51px** — la fija el nav-toggle/`.primary-nav__link`
  (40px), no el logo.
- Logo (`.site-header__logo`, `8leaks-logo-horizontal.png`): **18px** de
  alto. El archivo fue recortado para eliminar relleno transparente
  (quedó en 2551×348px); `height` en CSS ahora corresponde 1:1 al tamaño
  visible real.
- `padding-block` del `.site-header__inner`: **5px**.

**CategoryBanner — valores actuales:**

- `overlayHeader` (default `false`): agrega `data-header-overlay-target` y
  la clase `.category-banner--overlay`, que extiende el banner detrás del
  Header transparente compensando exactamente la altura del Header
  (`margin-top: -51px; padding-top: 51px;`) sin mover el borde inferior del
  banner ni el texto de su posición visual habitual. Si la altura del
  Header cambia, este valor debe actualizarse junto con el fallback del
  `IntersectionObserver` en `Header.astro`.
- Altura del banner: `min-height: clamp(320px, 42vh, 480px)` (desktop),
  `clamp(240px, 46vh, 360px)` (≤640px) — no es el mismo componente que
  `Hero.astro` de Home, tiene su propia escala.
- Título (`.category-banner__title`): **no** usa `--text-hero` (ese token
  es exclusivo del H1 institucional de Home) — usa una escala propia y más
  chica, `clamp(2rem, 1.2rem + 3.8vw, 4rem)` (32px–64px), pensada
  específicamente para el H1 del banner de categoría. Mismo peso (700),
  `line-height` (`--leading-solid`) y `letter-spacing`
  (`--tracking-display`) que el resto de la tipografía de exhibición.
- Subtítulo: `--text-hero-support`, sin cambios.

**Mapa de banners aprobado** (`public/banners/`, no editar/regenerar sin
autorización):

| Categoría | Archivo | Color |
|---|---|---|
| Política | `banner-politica.png` | Azul |
| Economía | `banner-economia.png` | Verde |
| Geopolítica | `banner-geopolitica.png` | Coral |
| Otros Blogs | `banner-otros-blogs.png` | Violeta |

Cada categoría tiene identidad cromática propia a través de su banner —
esto es intencional y no debe uniformarse a un solo color. El sistema
visual (tipografía, spacing, componentes, comportamiento) sí debe
mantenerse idéntico entre categorías.

**Cualquier cambio futuro a este patrón** (Header, CategoryBanner,
comportamiento transparente/negro, tamaños, spacing) debe hacerse primero
sobre la plantilla maestra (`/politica/` y sus componentes) y con
aprobación explícita — nunca directamente en una página de categoría
individual, para no divergir el sistema entre secciones.

## 12. Proceso para páginas nuevas

Antes de escribir código para cualquier página nueva (categorías, autor, "Sobre 8LEAKS", contacto, búsqueda, tags, archivos, etc.):

1. Revisar Home, artículo individual, Header/Footer, `tokens.css`/`global.css` y los componentes reutilizables existentes. **Para una página de categoría específicamente, revisar además la sección 11 y usar `/politica/` como referencia canónica** — no reinterpretar el patrón desde cero.
2. Determinar qué tokens/componentes/patrones existentes aplican.
3. Proponer la composición nueva solo donde el sistema no alcance — priorizando reutilización sobre creación, pero sin forzar componentes donde no correspondan conceptualmente.
4. Presentar auditoría + plan (componentes a reutilizar, qué se crea, archivos a tocar, decisiones nuevas) y **esperar aprobación** antes de implementar cualquier página nueva o cambio visual importante.

No se rediseña Home ni el artículo individual salvo pedido explícito.
