import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// Única fuente de verdad del lado de Astro — debe mantenerse igual
// a las opciones del select "Sección" (category) en Decap CMS.
const CATEGORIES = ["politica", "economia", "geopolitica", "otros-blogs"] as const;

// Tipo editorial — responde "¿qué clase de contenido es?", independiente
// de la sección temática (category). Ver docs/EDITORIAL-SYSTEM.md.
const EDITORIAL_TYPES = [
  "noticia",
  "analisis",
  "investigacion",
  "opinion",
  "ensayo",
] as const;

// Subcategorías V1 de "Otros Blogs" — solo aplica conceptualmente cuando
// category === "otros-blogs". Lista inicial deliberadamente acotada; nuevas
// subcategorías (psicología, sociedad, historia, etc.) se activan más
// adelante ampliando esta constante y su espejo en Decap. Ver
// docs/EDITORIAL-SYSTEM.md para la justificación de este modelado.
const SUBCATEGORIES = ["tecnologia", "cultura", "educacion", "deporte", "otros"] as const;

const sourceSchema = z.object({
  label: z.string().min(3),
  url: z.string().url().optional(),
  type: z.enum([
    "oficial",
    "medio",
    "documento",
    "estudio_academico",
    "organismo_internacional",
    "entrevista",
    "otro",
  ]),
  publisher: z.string().optional(),
  accessedAt: z.coerce.date().optional(),
});

const articleSchema = z.object({
  title: z.string().min(10).max(120),
  dek: z.string().max(200).optional(),
  excerpt: z.string().min(50).max(300),
  coverImage: z.object({
    url: z.string().url(),
    alt: z.string().min(1),
  }),
  author: z.array(reference("autores")).min(1),
  category: z.enum(CATEGORIES),
  editorialType: z.enum(EDITORIAL_TYPES),
  subcategory: z.enum(SUBCATEGORIES).optional(),
  tags: z.array(z.string()).max(8).default([]),
  sources: z.array(sourceSchema).default([]),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  featured: z.boolean().default(false),
  featuredOrder: z.number().int().optional(),
  access: z.enum(["free", "premium"]).default("free"),
  sponsor: z
    .object({
      sponsored: z.boolean().default(false),
      sponsorName: z.string().optional(),
    })
    .optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: z.string().url().optional(),
      noindex: z.boolean().default(false),
    })
    .optional(),
  draft: z.boolean().default(true),
});

const authorSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(500).optional(),
  avatar: z
    .object({
      url: z.string().url(),
      alt: z.string(),
    })
    .optional(),
  socialLinks: z
    .array(
      z.object({
        platform: z.enum(["twitter", "instagram", "linkedin", "website"]),
        url: z.string().url(),
      }),
    )
    .default([]),
  role: z
    .enum(["autor_principal", "colaborador", "editor"])
    .default("colaborador"),
});

export const collections = {
  articulos: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/articulos" }),
    schema: articleSchema,
  }),
  autores: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/autores" }),
    schema: authorSchema,
  }),
};
