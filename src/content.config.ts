import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// Única fuente de verdad del lado de Astro — debe mantenerse igual
// a las opciones del select "category" en la configuración de Decap CMS (fase 2).
const CATEGORIES = [
  "politica",
  "economia",
  "geopolitica",
  "sociedad",
  "psicologia-comportamiento",
  "analisis-opinion",
] as const;

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
