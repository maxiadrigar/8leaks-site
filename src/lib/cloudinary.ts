// Utilidades puras para derivar URLs responsive de Cloudinary a partir de
// la URL completa que guarda el frontmatter (coverImage.url / avatar.url).
// Sin llamadas de red ni al SDK/API de Cloudinary: son transformaciones de
// string sobre la URL de delivery, así que el build nunca depende de que
// Cloudinary esté arriba. Si la URL no es de Cloudinary, se devuelve tal
// cual (fallback seguro, no rompe el build ni el render).

const UPLOAD_MARKER = "/image/upload/";

/**
 * Antepone una transformación a la cadena de transformaciones existente en
 * una URL de Cloudinary. Cloudinary aplica transformaciones encadenadas de
 * izquierda a derecha, así que anteponer es válido sin necesidad de parsear
 * o reemplazar lo que ya hubiera en la URL.
 */
export function withCloudinaryTransformation(url: string, transformation: string): string {
  const idx = url.indexOf(UPLOAD_MARKER);
  if (idx === -1) return url;
  const insertAt = idx + UPLOAD_MARKER.length;
  return `${url.slice(0, insertAt)}${transformation}/${url.slice(insertAt)}`;
}

export interface CloudinaryResponsiveOptions {
  /** Transformaciones adicionales encadenadas junto al ancho (formato Cloudinary). */
  extra?: string;
}

const DEFAULT_EXTRA = "c_limit,f_auto,q_auto";

/** URL con un ancho fijo — para usar como `src` por defecto. */
export function cloudinaryUrlAtWidth(
  url: string,
  width: number,
  options: CloudinaryResponsiveOptions = {},
): string {
  const extra = options.extra ?? DEFAULT_EXTRA;
  return withCloudinaryTransformation(url, `w_${width},${extra}`);
}

/** Genera un atributo `srcset` con una variante por cada ancho pedido. */
export function cloudinarySrcSet(
  url: string,
  widths: number[],
  options: CloudinaryResponsiveOptions = {},
): string {
  return widths.map((width) => `${cloudinaryUrlAtWidth(url, width, options)} ${width}w`).join(", ");
}

export const COVER_IMAGE_WIDTHS = [400, 800, 1200, 1600];
export const AVATAR_WIDTHS = [48, 96, 192];
