import { environment } from "../../../../environments/environment";

/**
 * Converts a text string into a URL-friendly slug format.
 * Removes special characters, spaces, accents, and converts to lowercase.
 *
 * @param text - The text string to be slugified.
 * @returns The slugified string, or an empty string if the text is null or empty.
 * @author [Uedney C Morais] <uedneymorais@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 */
export function getFullPathImage(imagePath: string | null | undefined): string {

  const PLACEHOLDER_IMAGE_PATH = '/assets/empty.png';

  if (!imagePath || imagePath.trim() === '') {
    return PLACEHOLDER_IMAGE_PATH;
  }
  const cleanImagePath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  return `${environment.apiUrl}${cleanImagePath}`;
}
