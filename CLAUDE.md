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
