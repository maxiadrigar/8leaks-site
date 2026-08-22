# 8LEAKS — Sistema de Diseño de Referencia

**Estado: APROBADO.** Este documento describe el lenguaje visual que ya construimos y quedó cerrado como línea base oficial. No es una propuesta — es la referencia contra la que se audita todo trabajo visual futuro.

## 0. Fuente de verdad

Dos páginas son la fuente de verdad visual del proyecto. Ante cualquier duda de diseño, se revisan ellas y sus componentes, no se reinterpreta el lenguaje desde cero:

- **Home** — `src/pages/index.astro` (+ `Hero.astro`, `LatestArticles.astro`, `PostRow.astro`): identidad institucional y de portada.
- **Artículo individual** — `src/pages/articulos/[slug].astro` (+ `ArticleAuthorProfile.astro`, `ArticleHeader.astro`, `ArticleCover.astro`, `ArticleBody.astro`, `ArticleSources.astro`, `ArticleTags.astro`, `ArticleShare.astro`, `ArticleRelated.astro`): identidad editorial y de lectura — **Master Template V2**, ver sección 14 para el detalle completo.

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
- Las composiciones asimétricas son parte del lenguaje: la página de artículo usa un grid real de dos columnas en desktop (152px de perfil de autor + 200px de gap + columna de lectura de `--container-reading`, ver sección 14) en vez de centrar todo por defecto — el perfil (`ArticleAuthorProfile.astro`) ocupa el margen izquierdo.
- No rellenar huecos automáticamente con contenido, líneas o cajas.

## 5. Marca — `public/brand/`

Assets oficiales, no recrear ni generar variantes nuevas sin autorización:

- `8leaks-logo-horizontal.png` — Header (nav global), Footer (si aplica).
- `8leaks-symbol.png` (isotipo 8L) — elemento gráfico de gran escala (Hero de Home: centrado, gigante, con el titular superpuesto encima).
- `8leaks-logo-vertical.png` — Footer, cuando la composición lo justifique.
- `logo-redondo.png` — sin uso activo actualmente (era el avatar de `ArticleBrandIdentity.astro`, componente retirado de la página de artículo — ver sección 14).
- `8leaks-logo-vertical.png` — además de Footer, es el avatar del autor institucional 8LEAKS en `ArticleAuthorProfile.astro` (cargado como dato en `src/content/autores/8leaks.md`, no hardcodeado en el componente).

El logo no tiene un tamaño fijo único: puede ser discreto en navegación o dominante como elemento gráfico institucional (como el isotipo del Hero). La escala responde a la composición de cada contexto, no a una regla universal.

## 6. Home — patrón institucional

Header negro minimalista → Hero negro de gran escala (isotipo 8L centrado y gigante de fondo, titular "Lo que está pasando ahora" superpuesto, sin subtítulo) → zona blanca con listado editorial horizontal tipográfico (sin imágenes, sin cards, título único por post en `--color-graphite-600`, categoría discreta, metadata) → Footer negro institucional (columnas de navegación + logo vertical grande).

## 7. Artículo individual — patrón de lectura

**Estado: APROBADO.** La implementación actual es la **Article Pages — Master Template V2**, documentada en detalle en la sección 14 (composición completa, componentes exactos y todos los valores reales de layout/tipografía/spacing).

Resumen: Header global → grid de dos columnas en desktop (perfil de autor a la izquierda, columna de lectura a la derecha; una sola columna en mobile/tablet) → eyebrow de clasificación editorial → H1 → metadata de autoría y fecha (sin bajada visible, sin tiempo de lectura) → portada opcional (se retira sola si falla, sin placeholder) → cuerpo editorial con jerarquía H2/H3/H4, sin cards → Fuentes → Tags → Compartir → Relacionados → Footer global.

El perfil de autor es una **firma editorial**, no un sidebar tradicional — no lleva bordes, fondos ni cards, y no es sticky (se va con el scroll junto al resto del encabezado).

## 8. Header y Footer

Componentes globales (`Header.astro`, `Footer.astro`), reutilizados sin cambios por ambas páginas de referencia. Las páginas nuevas los reutilizan tal cual — no se crean headers/footers por sección. Cualquier cambio global a estos dos componentes requiere justificación y aprobación explícita antes de implementarse.

## 9. Consistencia ≠ mismo layout

Mantener la identidad **no** significa clonar el layout de Home o de artículo en cada página nueva. Una página de categoría, de autor, o "Sobre 8LEAKS" puede tener una composición propia. Lo que se mantiene es el **sistema**: tipografía, paleta, spacing, jerarquía, composición, marca, minimalismo, proporciones, lenguaje editorial — no una plantilla fija repetida.

## 10. Responsive

Desktop puede usar composiciones editoriales ambiciosas y mucho espacio negativo (p. ej. la firma lateral del artículo, visible solo ≥1024px). Tablet preserva la jerarquía. Mobile prioriza lectura, claridad, navegación y jerarquía por sobre preservar layouts de múltiples columnas — se simplifica sin forzar el desktop a pantallas chicas (ver cómo `ArticleAuthorProfile` pasa a una fila horizontal compacta en mobile/tablet en vez de ocultarse — sección 14).

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

## 12. Subcategory Pages — `/otros-blogs/tecnologia/` es la plantilla maestra

**Estado: APROBADO.** Las subcategorías de "Otros Blogs" (Tecnología,
Educación, Cultura, Deporte — ver `docs/EDITORIAL-SYSTEM.md`) forman un
**segundo lenguaje visual**, deliberadamente distinto del de Category Pages
(sección 11). No reutilizan `CategoryBanner`: no hay imagen, no hay hero, no
hay bloque de color grande. `src/pages/otros-blogs/tecnologia/index.astro`
es la referencia canónica de este patrón.

**Jerarquía del sistema:**

- **Nivel 1 — Category Pages** (Política, Economía, Geopolítica, Otros
  Blogs): banners gráficos a pantalla completa, color propio por sección.
  Ver sección 11.
- **Nivel 2 — Subcategory Pages** (Tecnología, Educación, Cultura, Deporte,
  dentro de Otros Blogs): cabecera editorial tipográfica, minimalista,
  sobre `--color-paper`, sin imagen. Se sienten como una capa más editorial
  y de blog dentro de la misma identidad — nunca como una quinta Category
  Page.

**Composición de una Subcategory Page:**

```
<Header />
<main>
  <SubcategoryHeader parentLabel="Otros Blogs" title=... subtitle=... />
  <LatestArticles items={...} />
</main>
<Footer />
```

- `<Header />` a secas — **sin** `transparentOverHero`: no hay banner detrás
  del Header, así que el Header se comporta como en la página de artículo
  (fondo negro sólido desde el inicio).
- `SubcategoryHeader.astro` (nuevo componente, `src/components/`): cabecera
  centrada — eyebrow uppercase con el nombre de la categoría madre (p. ej.
  "OTROS BLOGS") en `--color-violet-600`, una línea fina decorativa en
  `--color-violet-500` debajo, título grande en `--color-ink-950` (escala
  propia `clamp(2.5rem, 1.7rem + 4vw, 4.75rem)` — **no** `--text-hero` ni la
  escala del título de `CategoryBanner`, para no competir visualmente con
  las Category Pages) y subtítulo en `--color-graphite-600`
  (`--text-hero-support`). `padding-block: var(--space-7) var(--space-6)`
  (desktop), `var(--space-6) var(--space-5)` (≤640px) — deliberadamente
  cerca del Header (51px), no un hero a pantalla completa; sin breadcrumb
  tradicional. Cierra con una línea divisoria ancha (100% del container) y
  delicada (3px, apenas más gruesa que la rulita de 2px del eyebrow) en
  `--color-violet-500`, que separa visualmente la cabecera del listado de
  posts.
- `LatestArticles`/`PostRow` se reutilizan sin cambios estructurales — mismo
  listado tipográfico que Home y las Category Pages, incluido el empty state
  ("Las próximas publicaciones aparecerán aquí."). Único agregado: prop
  opcional `dividerColor` en `LatestArticles` (por defecto
  `--color-gray-200`, sin cambiar Home ni Category Pages), que las
  Subcategory Pages pasan como `var(--color-violet-500)` para que el
  divisor entre posts lleve el acento violeta cuando hay más de uno.
- Filtro de artículos: `getPublishedArticlesByCategory("otros-blogs",
  "<subcategory>")` en `src/lib/articles.ts` — mismo helper que las Category
  Pages, extendido con un segundo parámetro `subcategory` opcional (no
  rompe las llamadas existentes que no lo pasan).

**Violeta — uso deliberadamente escaso:** es el único acento cromático de
este patrón (`--color-violet-500`/`--color-violet-600`, `tokens.css`),
relaciona cada subcategoría con "Otros Blogs". Aparece en el eyebrow, la
línea fina y el divisor entre posts (`LatestArticles` `dividerColor`) —
nunca como fondo, título ni bloque grande. No introducir un color distinto
por subcategoría: el violeta es compartido por todas las Subcategory Pages,
a diferencia de las Category Pages donde cada sección tiene su propio color
de banner.

**Cualquier cambio futuro a este patrón** debe hacerse primero sobre
`SubcategoryHeader.astro` y `/otros-blogs/tecnologia/`, con aprobación
explícita — mismo criterio que la sección 11 para Category Pages.

## 13. Proceso para páginas nuevas

Antes de escribir código para cualquier página nueva (categorías, autor, "Sobre 8LEAKS", contacto, búsqueda, tags, archivos, etc.):

1. Revisar Home, artículo individual, Header/Footer, `tokens.css`/`global.css` y los componentes reutilizables existentes. **Para una página de categoría específicamente, revisar además la sección 11 y usar `/politica/` como referencia canónica** — no reinterpretar el patrón desde cero.
2. Determinar qué tokens/componentes/patrones existentes aplican.
3. Proponer la composición nueva solo donde el sistema no alcance — priorizando reutilización sobre creación, pero sin forzar componentes donde no correspondan conceptualmente.
4. Presentar auditoría + plan (componentes a reutilizar, qué se crea, archivos a tocar, decisiones nuevas) y **esperar aprobación** antes de implementar cualquier página nueva o cambio visual importante.

No se rediseña Home ni el artículo individual salvo pedido explícito.

## 14. Article Pages — Master Template V2

**Estado: APROBADO DEFINITIVAMENTE (nivel visual).** La implementación
actual de `src/pages/articulos/[slug].astro` es la **plantilla maestra
única** de toda página individual de artículo de 8LEAKS — Política,
Economía, Geopolítica y Otros Blogs (con o sin subcategoría), para
cualquier `editorialType`, autor, longitud, cantidad de fuentes o tags.
No existen ni deben crearse plantillas visuales por categoría
(`ArticlePolitics`, `TechnologyArticle`, etc.). Los datos editoriales
determinan el **contenido**; la arquitectura visual es siempre la misma.
Confirmado por auditoría: `category`/`subcategory`/`editorialType` solo se
leen como texto (para componer el eyebrow, ver más abajo) — no existe
ninguna rama condicional de layout basada en esos campos, ni en
`[slug].astro` ni en ningún componente `Article*`.

Cualquier cambio visual futuro que afecte a Article Pages debe hacerse
sobre esta plantilla maestra y propagarse de forma genérica a todos los
artículos — nunca una modificación visual específica de un artículo
individual, salvo que exista una funcionalidad editorial explícita que lo
justifique y haya sido aprobada primero.

### Componentes

`src/pages/articulos/[slug].astro` compone, en este orden:
`Header` → `ArticleAuthorProfile` → (columna de artículo:
`ArticleHeader` → `ArticleCover` → `ArticleBody` → `ArticleSources` →
`ArticleTags` → `ArticleShare`) → `ArticleRelated` → `Footer`.

`ArticleBrandIdentity.astro` (la firma institucional hardcodeada de la
V1) **sigue existiendo en el repo pero ya no se usa** — fue reemplazada
funcionalmente por `ArticleAuthorProfile.astro`, que resuelve autor
humano e institucional desde datos, sin hardcodear ninguna interfaz
especial. Se mantiene sin borrar a la espera de limpieza futura.

### Composición general (desktop, ≥1024px)

```
Header (global, negro, sticky)
↓ padding-top: var(--space-8) — aire entre Header y contenido
┌───────────────────┬──────────────────────────────────────┐
│ ArticleAuthorProfile │ eyebrow                              │
│ (152px)              │ H1                                    │
│                       │ Por Nombre / Fecha / Actualizado...  │
│                       │ portada (opcional)                   │
│                       │ cuerpo (H2/H3/H4, párrafos, listas,  │
│                       │ blockquote, links)                   │
│                       │ Fuentes                              │
│                       │ Tags                                 │
│                       │ Compartir                            │
└───────────────────┴──────────────────────────────────────┘
        (152px)   (200px gap)      (hasta --container-reading)
↓
ArticleRelated (fondo #F5F8FA, ancho completo, mismo grid de 2 columnas)
↓
Footer (global)
```

Grid real en `.article-layout` (`[slug].astro`):
`grid-template-columns: 152px 1fr; column-gap: 200px;` dentro de un
contenedor `max-width: var(--container-max)` (1200px) +
`padding-inline: var(--container-padding)`. La columna de artículo
(`.article-column`) no tiene ancho fijo — es `1fr` con
`max-width: var(--container-reading)` (**680px**), así se achica con
gracia cerca del breakpoint de 1024px en vez de generar overflow.

### Responsive — tablet/mobile (<1024px)

`.article-layout` colapsa a `grid-template-columns: 1fr` (una sola
columna). `ArticleAuthorProfile` **no se oculta**: pasa a fila horizontal
compacta (`display: flex`, avatar 48px en vez de 96px, `border-bottom`
como divisor) apilada antes del `ArticleHeader`, en vez de sidebar
vertical. Mismo comportamiento en tablet y mobile — sin breakpoint
intermedio adicional.

### `ArticleAuthorProfile.astro`

Alimentado 100% desde la colección `autores` (`author.data`), sin datos
hardcodeados — funciona igual para 8LEAKS (autor institucional) que para
cualquier autor humano presente o futuro.

- **Avatar**: si `author.data.avatar` existe, `<img>` circular 96px
  (48px en mobile/tablet), `object-fit: cover`,
  `border: var(--border-hairline-light)`, servido vía los helpers de
  Cloudinary (`cloudinaryUrlAtWidth`/`cloudinarySrcSet`,
  `AVATAR_WIDTHS = [48, 96, 192]`) — también acepta una ruta local
  (`avatar.url` admite URL absoluta `http(s)` o una ruta que empiece con
  `/`, no solo Cloudinary). Si no hay avatar: fallback sobrio de
  iniciales del nombre real (máx. 2 letras) sobre `--color-gray-200`,
  nunca una foto/persona inventada.
- **Nombre**: `--color-black`, `1.125rem` (18px, 16px en mobile) bold,
  `line-height: var(--leading-solid)`.
- **Handle**: prioridad `instagram > twitter > linkedin > website` sobre
  `author.data.socialLinks` — solo se muestra si hay una URL real
  cargada, y se renderiza como `<a target="_blank">` (nunca se infiere un
  `@usuario` a partir del nombre). Si no hay `socialLinks` pero existe
  `author.data.handle` (string plano, sin URL confirmada — campo
  separado en el schema), se muestra el mismo estilo visual como
  `<span>` sin navegación. Estilo en ambos casos: `--color-black`,
  `var(--text-meta)` (14px), subrayado, `text-underline-offset: 2px`.
- **Headline**: `author.data.headline` (opcional), `--color-graphite-600`,
  `var(--text-meta)`, `line-height: var(--leading-snug)` (1.35).
- **Multi-autor**: coautores (todo el array `author[]` salvo el primero)
  se listan como "Con la colaboración de X y Y" debajo del headline —
  mismo estilo que el headline, sin avatares adicionales ni cards.

### `ArticleHeader.astro`

- **Eyebrow**: `articleEyebrow({category, subcategory, editorialType})`
  (`src/lib/content-format.ts`) — compone `categoryLabel` + (si existe)
  `subcategoryLabel` + `editorialTypeLabel`, unidos por `" · "`. Ejemplos
  reales: `"Política · Noticia"`, `"Otros Blogs · Tecnología · Análisis"`.
  Función aditiva y genérica — no distingue visualmente por categoría.
  `--color-graphite-600`, `var(--text-meta)` (14px) bold.
- **H1**: `--color-black`, `var(--text-article-title)` (clamp ~28–44px),
  bold, `line-height: var(--leading-solid)`,
  `letter-spacing: var(--tracking-display)`.
- **Bajada/dek**: **deliberadamente no se muestra** debajo del H1. El dato
  (`article.data.dek`/`excerpt`) sigue existiendo en el schema para SEO u
  otros usos editoriales futuros — no se eliminó del modelo, solo de esta
  vista.
- **Metadata** (`margin-top: var(--space-4)` bajo el H1):
  - `Por [Nombre]` — "Por" en `--color-graphite-600`; el nombre en
    `--color-black` + subrayado (`text-underline-offset: 2px`), como
    `<span>` sin `href` (no existe todavía `src/pages/autores/`, así que
    no se genera navegación falsa — queda listo para volverse `<a>` real).
    Ambos a `0.8125rem` (13px, más chico que `--text-meta` y que el
    cuerpo del artículo), peso 400.
  - Fecha de publicación en línea propia (`margin-top: var(--space-1)`),
    `<time datetime>` con `formatArticleDateLong()` (español largo,
    `Intl.DateTimeFormat("es-AR", {weekday:"long", day, month:"long",
    year})`, primera letra capitalizada — ej. "Miércoles, 12 de agosto de
    2026"), `--color-graphite-600`, mismo `0.8125rem`.
  - `Actualizado el [fecha larga]` — **solo si `updatedAt` existe y
    difiere de `publishedAt`**; si no, no se renderiza nada (sin hueco
    reservado). `0.9375rem` (15px, 2px más grande que las otras dos
    líneas), `--color-black`, peso `500`, `font-style: italic`.
  - **Tiempo de lectura: deliberadamente no se muestra.** `[slug].astro`
    sigue calculándolo (`calculateReadingTime()`,
    `src/lib/reading-time.ts`) y pasándolo como prop `readingTime` a
    `ArticleHeader`, pero el componente ya no lo consume ni renderiza —
    ver sección 16 del último reporte de esta tarea sobre este remanente.

### `ArticleBody.astro` — jerarquía del cuerpo

Base: `--color-graphite-600`, `var(--text-article-body)` (16px),
`line-height: 1.5` (valor explícito, no un token `--leading-*`
existente). Párrafos con `margin-block: var(--space-5)` (24px).

| Nivel | Color | Tamaño | Peso |
|---|---|---|---|
| H2 | `--color-black` | `1.25rem` (20px) | 700 |
| H3 | `#657786` (valor exacto pedido, no token) | `1.125rem` (18px) | 700 |
| H4 | `#657786` | `1rem` (16px) | 700 |

La jerarquía entre H2/H3/H4 se distingue por tamaño/peso/spacing — el
color de H2 es una excepción deliberada y aprobada (negro), distinta de
H3/H4 (gris `#657786`); ninguno de los tres usa color de categoría.
`strong` usa `--color-ink-900`. Listas (`ul`/`ol`) con `padding-left:
1.25em`, `li` con `margin-block: var(--space-2)`. Links `--color-ink-900`
subrayados (`hover: opacity 0.7`). `blockquote` con borde izquierdo de 2px
`--color-gray-200`, `--color-graphite-600`, itálica. Imágenes internas a
ancho completo con `border-radius: var(--radius-subtle)`.

### `ArticleSources.astro`

Se renderiza solo si `sources.length > 0`. Heading "Fuentes"
(`--color-ink-900`, `var(--text-section-heading)`, 28px). Cada fuente:
label (link si tiene `url`, texto si no) + `— publisher` si existe, más
una segunda línea con `sourceTypeLabel(source.type)` (mapa de labels
legibles) y, si existe `accessedAt`, `" · Consultado el [fecha larga]"`.
Divisor hairline entre items, sin cards ni cajas.

### `ArticleTags.astro`

Se renderiza solo si `tags.length > 0`. Texto plano unido por `" · "`
(sin links — no existen páginas de tags todavía, así que no se generan
hrefs rotos), sin pills.

### `ArticleShare.astro`

X, WhatsApp, LinkedIn (enlaces construidos en build a partir de
`Astro.url.href` + título) y "Copiar enlace" (`navigator.clipboard`, con
mínimo JS inline). Sin SDKs, sin barra flotante, mismo estilo de link
subrayado que el resto del artículo.

### `ArticleRelated.astro`

Usa `getRelatedArticles(article, 3)` (`src/lib/articles.ts`, función
nueva y aditiva — no modifica `getPublishedArticlesByCategory`).
Prioridad estrictamente lexicográfica: misma `subcategory` > misma
`category` > cantidad de tags compartidos > `publishedAt` descendente;
excluye el artículo actual y cualquier draft; máximo 3. Se renderiza solo
si hay resultados (0 relacionados es un resultado válido, no se fuerza
contenido).

Ya no reutiliza `PostRow.astro` (que queda intacto, sin modificar) —
tiene su propia estructura calcada de
`references/article-v2/relacionados.jpg`: sección de ancho completo con
fondo **`#F5F8FA`**, mismo grid de dos columnas que `.article-layout`
(label "Relacionados" a la izquierda, alineado a la misma altura que
`ArticleAuthorProfile`; lista a la derecha con el mismo
`max-width: var(--container-reading)` que la columna de artículo). Cada
item: título (link real a `/articulos/[slug]/`, `--color-graphite-600`,
`var(--text-post-title)`, sin eyebrow de categoría) + una sola línea de
metadata `"Por [Nombre] el [Fecha]"` (solo el nombre en
`--color-black` + subrayado; el resto en `--color-graphite-600`).

### Principio de plantilla única

Un mismo artículo puede tener cualquier combinación real de
`category`/`subcategory`/`editorialType` — `Política · Noticia`,
`Economía · Investigación`, `Otros Blogs · Deporte · Análisis`, etc. — y
siempre atraviesa exactamente los mismos componentes, en el mismo orden,
con los mismos estilos. La única variación visual entre artículos es la
que producen los propios datos (longitud del título, presencia de
`updatedAt`, cantidad de fuentes/tags, si hay coautores, si el autor
tiene avatar/handle/headline cargados).
