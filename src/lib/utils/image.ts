export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export type ImageValidationError = "notImage" | "tooLarge";

export function validateImageFile(file: File): ImageValidationError | null {
  if (!file.type.startsWith("image/")) {
    return "notImage";
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return "tooLarge";
  }
  return null;
}
