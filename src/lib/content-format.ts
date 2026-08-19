// Presentación compartida entre Hero y ArticleRow: mismas etiquetas de
// categoría y mismo formato de fecha en toda la Home.

export const CATEGORY_LABELS: Record<string, string> = {
  politica: "Política",
  economia: "Economía",
  geopolitica: "Geopolítica",
  "otros-blogs": "Otros Blogs",
};

// No usados todavía en ninguna vista (editorialType/subcategory no se
// muestran visualmente en esta fase) — preparados para las fases
// siguientes de la migración editorial. Ver docs/EDITORIAL-SYSTEM.md.
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
