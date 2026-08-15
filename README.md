# 8leaks

Plataforma editorial digital: actualidad, política argentina, geopolítica, economía, sociedad, psicología y comportamiento, análisis y opinión. El artículo largo es la pieza central; el resto de los formatos (redes, newsletter) se derivan de él.

## Stack

- **[Astro](https://astro.build)** — generador de sitio estático (SSG), sin servidor de aplicación.
- **Markdown/MDX** — contenido versionado en Git, fuente de verdad portable.
- **[Decap CMS](https://decapcms.org)** — interfaz de publicación sobre GitHub (se incorpora en la Fase 2).
- **Cloudflare Pages** — hosting y CDN.
- **Cloudinary** — almacenamiento y optimización de imágenes.
- **Umami Cloud** — analytics sin cookies.
- **Pagefind** — búsqueda estática generada en build.
- **Kit** — captura de email para newsletter.

Sin base de datos. Sin autenticación de lectores. Sin comentarios. Sin paywall/membresías/publicidad activa en el MVP.

## Arquitectura

El contenido vive como Markdown en `src/content/`, tipado y validado en build por Astro Content Collections (`src/content.config.ts`). No hay backend propio: todo lo que el lector recibe se genera en build time y se sirve estático desde el edge de Cloudflare. El detalle completo de arquitectura, flujo editorial y decisiones (ADRs) vive en la documentación técnica del proyecto, fuera de este repositorio de código.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo local |
| `npm run build` | Build de producción a `dist/` |
| `npm run preview` | Sirve el build de `dist/` localmente |
| `npm run check` | Valida tipos de TypeScript y de Content Collections |

## Estructura del proyecto

```
src/
├── content/
│   ├── articulos/       # un archivo .md por artículo
│   └── autores/         # un archivo .md por autor
├── content.config.ts    # schemas Zod + relaciones (Content Layer API)
├── pages/                # rutas del sitio
├── components/           # componentes reutilizables (Fase 2+)
├── layouts/               # layouts de página (Fase 2+)
├── lib/                   # helpers (SEO, imágenes, etc. — Fase 2+)
└── styles/                # estilos globales (Fase 2+)
public/                    # assets estáticos
```

## Estado

Fase 1 (bootstrap) completa: Content Collections, schemas y contenido de prueba funcionando. Decap CMS, autenticación, integraciones (Cloudinary/Umami/Pagefind/Kit), SEO y diseño visual se incorporan en fases posteriores.
