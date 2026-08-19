# 8LEAKS — Sistema Editorial de Referencia

**Estado: APROBADO (V1).** Este documento es la fuente de verdad conceptual y de
arquitectura editorial del proyecto — qué es 8LEAKS, cómo se clasifica el
contenido y por qué. Para todo lo visual, la referencia sigue siendo
[docs/DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md); este documento no lo reemplaza ni
lo modifica.

## 0. Definición oficial

> "8LEAKS es un medio digital independiente de análisis, investigación,
> actualidad e ideas, creada para interpretar los acontecimientos y fenómenos
> relevantes de la sociedad con rigor, criterio y una voz editorial propia."

Principio adicional de producto: **la identidad de 8LEAKS es estable; sus
formatos, secciones y funcionalidades pueden evolucionar.**

8LEAKS no es un agregador de noticias, ni un portal tradicional, ni un blog
personal, ni una arquitectura cerrada alrededor de sus funcionalidades
actuales. La noticia puede formar parte de 8LEAKS, pero no es necesariamente
su producto editorial de mayor valor — la autoridad de la marca se construye
principalmente mediante investigación, análisis, opinión fundamentada, ensayo
y producción propia.

## 1. Principios editoriales

- **Rigor** — las afirmaciones importantes deben poder sostenerse con
  evidencia y fuentes.
- **Independencia** — el análisis no se adapta automáticamente para favorecer
  a una fuerza política.
- **Distinción** — hechos, análisis, investigación y opinión deben poder
  distinguirse editorialmente entre sí. Este principio es estructural: es la
  razón por la que `category` y `editorialType` son campos separados (ver
  sección 3).
- **Profundidad** — priorizar comprender y explicar por encima de publicar
  rápido.
- **Voz propia** — 8LEAKS no se limita a repetir lo que otros medios ya
  publicaron.
- **Evolución** — la arquitectura V1 debe poder crecer sin convertirse en el
  techo del proyecto (ver sección 8).

## 2. Secciones V1 (`category`)

`category` responde: **¿sobre qué habla este contenido?**

| Valor técnico | Label en Decap |
|---|---|
| `politica` | Política |
| `economia` | Economía |
| `geopolitica` | Geopolítica |
| `otros-blogs` | Otros Blogs |

Se mantiene el nombre técnico `category` (no `section`) para evitar churn
innecesario en el schema y el contenido existente, aunque el label visible en
Decap es "Sección".

### Otros Blogs

Función deliberadamente amplia: aloja contenido que pertenece a 8LEAKS pero
que no necesita encajar artificialmente en Política, Economía o Geopolítica.

**Subcategorías V1** (campo `subcategory`, opcional, solo aplica
conceptualmente cuando `category === "otros-blogs"`):

| Valor técnico | Label en Decap |
|---|---|
| `tecnologia` | Tecnología |
| `cultura` | Cultura |
| `educacion` | Educación |
| `deporte` | Deporte |
| `otros` | Otros |

Lista deliberadamente acotada en V1. Psicología, Sociedad, Historia, Ciencia,
Internet, Libros y otras quedan como subcategorías **futuras** — no existen
todavía en el enum ni en el select de Decap. Se activan ampliando la
constante `SUBCATEGORIES` en `src/content.config.ts` y su espejo en
`public/admin/config.yml`; no requiere ningún otro cambio de arquitectura.

## 3. `category` vs. `editorialType` — dos preguntas distintas

Este es uno de los principios estructurales más importantes del sistema: **no
mezclar temática y formato editorial.**

- `category` responde **¿sobre qué habla?** (Política, Economía, Geopolítica,
  Otros Blogs).
- `editorialType` responde **¿qué clase de contenido es?** (noticia, análisis,
  investigación, opinión, ensayo).

Ejemplos válidos: Política + Investigación, Economía + Análisis, Geopolítica +
Noticia, Otros Blogs + Ensayo. Los dos campos son independientes y ambos son
requeridos en cada artículo.

## 4. Tipos editoriales (`editorialType`)

| Valor técnico | Label en Decap | Función |
|---|---|---|
| `noticia` | Noticia | Informar. Prioridad: hechos → contexto → fuentes. La opinión editorial debe ser mínima o inexistente. |
| `analisis` | Análisis | Interpretar qué significa un acontecimiento: relaciona hechos, antecedentes, consecuencias y escenarios. Aquí puede aparecer la voz intelectual de 8LEAKS. |
| `investigacion` | Investigación | Contenido basado idealmente en información propia, documentos, datos, múltiples fuentes, reconstrucciones y hallazgos. Uno de los formatos de mayor prestigio futuro de la marca. |
| `opinion` | Opinión | Existe una posición explícita. Debe estar identificada claramente como opinión para no confundirse con información factual. |
| `ensayo` | Ensayo | Formato más libre y reflexivo. Especialmente útil para Otros Blogs y temas como tecnología, cultura, educación, deporte, psicología, historia, etc. |

`editorialType` es requerido y no tiene valor por defecto: cada artículo
exige una elección editorial explícita, en línea con el principio de
distinción.

## 5. Tags

Los tags son una capa transversal y deliberadamente abierta (`z.array(z.string()).max(8)`,
sin lista cerrada). Un mismo tag puede atravesar varias secciones — por
ejemplo, "inteligencia-artificial" puede existir simultáneamente en Economía,
Geopolítica y Otros Blogs. Los tags no reemplazan ni se confunden con
`category` ni con `subcategory`: esos dos son campos estructurales que
definen de qué "menú" cuelga el artículo y su futura URL; los tags son
descriptivos y no tienen esa función.

## 6. Fuentes

El schema de `sources` (`label`, `url`, `type`, `publisher`, `accessedAt`) ya
prioriza la jerarquía de fuentes que exige el rigor editorial: `oficial`,
`documento`, `estudio_academico` y `organismo_internacional` conviven con
`medio` y `entrevista` como tipos igualmente válidos, pero la intención es
priorizar fuentes primarias (documentos originales, estadísticas oficiales,
legislación, papers, informes, bases de datos, discursos) cuando sea posible.
Las fuentes periodísticas también pueden utilizarse cuando corresponda. No se
modificó este schema en la migración V1: ya está alineado con la filosofía.

## 7. Autores

8LEAKS no asume que siempre habrá un único autor: `author` es un arreglo de
referencias a la colección `autores` (mínimo 1), preparado para múltiples
autores, colaboradores, especialistas e invitados por artículo.

## 8. Filosofía de evolución — V1 no es un techo

La arquitectura V1 (Política, Economía, Geopolítica, Otros Blogs + tipos
editoriales + subcategorías acotadas) es intencionalmente el punto de
partida, no el límite del proyecto. La visión conceptual a futuro puede
crecer hacia ramas hoy inexistentes y no implementadas:

```
8LEAKS
│
├── EDITORIAL
│   ├── Política
│   ├── Economía
│   ├── Geopolítica
│   └── Otros Blogs
│
├── DATA
│   ├── Encuestas
│   ├── Indicadores
│   ├── Estadísticas
│   ├── APIs
│   └── Visualizaciones
│
└── ESPECIALES
    ├── Elecciones
    ├── Investigaciones
    ├── Dossiers
    └── Coberturas
```

Esto no es un roadmap cerrado ni una funcionalidad en construcción — es
prueba conceptual de que la arquitectura V1 (campos, colecciones, taxonomía)
no debe tomar decisiones que hagan artificialmente difícil crecer hacia estas
u otras ramas futuras. Ninguna de estas funcionalidades se implementa en esta
fase.

## 9. Alcance de esta versión

Esta migración (V1) cubre exclusivamente el modelo de contenido: schema de
`src/content.config.ts`, `public/admin/config.yml` y la migración del
contenido existente. No cubre — son fases separadas, cada una con su propia
aprobación:

- Páginas de sección/subcategoría (`/politica/`, `/otros-blogs/`, etc.).
- Cambios de navegación en Header/Footer.
- Exposición visual de `editorialType` o `subcategory` en la página de
  artículo.
- Cualquier cambio al sistema visual (ver [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md),
  que permanece intacto).
