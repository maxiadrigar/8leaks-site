## 8LEAKS — Visual Design System

The Home (`src/pages/index.astro`) and the individual article page
(`src/pages/articulos/[slug].astro`), together with the global `Header`/
`Footer` and `src/styles/tokens.css`/`global.css`, are the **approved,
frozen visual baseline** for the whole project. Full rules, color/type
tokens, brand-asset usage, and the required audit-before-building process
for any new page are documented in **[docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)**.

**Before building or visually changing any page, read that file first.**
Do not redesign Home or the article page without explicit request, and do
not design a new page in isolation from the existing system — audit
reusable tokens/components, propose the plan, and wait for approval before
implementing any new page or significant visual change.

**Before creating or modifying a category page** (`/politica/`,
`/economia/`, `/geopolitica/`, `/otros-blogs/`, etc.), read the "Category
Pages" section in `docs/DESIGN-SYSTEM.md` and use `/politica/` as the
canonical reference — it is the approved master template for category
pages, reused structurally (Header, CategoryBanner, LatestArticles/PostRow,
Footer), not reinterpreted per page.

## 8LEAKS — Editorial System

The conceptual and content-architecture source of truth (official definition
of 8LEAKS, editorial principles, V1 sections/`category`, `editorialType`,
`subcategory` under "Otros Blogs", tags, sources, authors, and the evolution
philosophy toward future DATA/ESPECIALES branches) is documented in
**[docs/EDITORIAL-SYSTEM.md](docs/EDITORIAL-SYSTEM.md)**.

**Before changing `src/content.config.ts`, `public/admin/config.yml`, or any
editorial classification field, read that file first.** It governs content
architecture the same way DESIGN-SYSTEM.md governs the visual layer.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
