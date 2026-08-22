// Presentación compartida entre Hero y ArticleRow: mismas etiquetas de
// categoría y mismo formato de fecha en toda la Home.

export const CATEGORY_LABELS: Record<string, string> = {
  politica: "Política",
  economia: "Economía",
  geopolitica: "Geopolítica",
  "otros-blogs": "Otros Blogs",
};

// Consumidos por articleEyebrow() (página de artículo, Article V2) — ver
// docs/EDITORIAL-SYSTEM.md.
export const EDITORIAL_TYPE_LABELS: Record<string, string> = {
  noticia: "Noticia",
  analisis: "Análisis",
  investigacion: "Investigación",
  opinion: "Opinión",
  ensayo: "Ensayo",
};

export const SUBCATEGORY_LABELS: Record<string, string> = {
  tecnologia: "Tecnología",
  cultura: "Cultura",
  educacion: "Educación",
  deporte: "Deporte",
  otros: "Otros",
};

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatArticleDate(date: Date): string {
  return dateFormatter.format(date);
}

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function editorialTypeLabel(editorialType: string): string {
  return EDITORIAL_TYPE_LABELS[editorialType] ?? editorialType;
}

export function subcategoryLabel(subcategory: string): string {
  return SUBCATEGORY_LABELS[subcategory] ?? subcategory;
}

// Eyebrow editorial de la página de artículo — "Política · Análisis" o
// "Otros Blogs · Tecnología · Ensayo". Aditiva: no toca categoryLabel() ni
// el eyebrow de PostRow.astro/Hero.astro, que siguen usando solo category.
export function articleEyebrow(data: {
  category: string;
  subcategory?: string;
  editorialType: string;
}): string {
  const parts = [categoryLabel(data.category)];
  if (data.subcategory) parts.push(subcategoryLabel(data.subcategory));
  parts.push(editorialTypeLabel(data.editorialType));
  return parts.join(" · ");
}

// Fecha larga en español, exclusiva de la metadata de artículo — no
// reemplaza formatArticleDate() (usado por Home/categorías vía PostRow).
const longDateFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatArticleDateLong(date: Date): string {
  const formatted = longDateFormatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

const SOURCE_TYPE_LABELS: Record<string, string> = {
  oficial: "Fuente oficial",
  medio: "Medio de comunicación",
  documento: "Documento",
  estudio_academico: "Estudio académico",
  organismo_internacional: "Organismo internacional",
  entrevista: "Entrevista",
  otro: "Otro",
};

export function sourceTypeLabel(type: string): string {
  return SOURCE_TYPE_LABELS[type] ?? type;
}
