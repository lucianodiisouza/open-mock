import { toPng } from "html-to-image";

export interface ExportOptions {
  scale?: number;
  transparent?: boolean;
  filename?: string;
}

export async function exportToPng(
  element: HTMLElement,
  options: ExportOptions = {},
): Promise<void> {
  const { scale = 3, transparent = false, filename } = options;

  const dataUrl = await toPng(element, {
    pixelRatio: scale,
    backgroundColor: transparent ? "transparent" : undefined,
    cacheBust: true,
  });

  const link = document.createElement("a");
  link.download = filename ?? `open-mock-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}
