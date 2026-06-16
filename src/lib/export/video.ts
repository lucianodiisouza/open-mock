export interface VideoExportOptions {
  fps?: number;
  typingDurationMs?: number;
  messageDelayMs?: number;
  filename?: string;
}

export async function exportToVideo(
  element: HTMLElement,
  messageCount: number,
  options: VideoExportOptions = {},
): Promise<void> {
  const {
    fps = 30,
    typingDurationMs = 1500,
    messageDelayMs = 500,
    filename = `open-mock-${Date.now()}.webm`,
  } = options;

  const canvas = document.createElement("canvas");
  const rect = element.getBoundingClientRect();
  canvas.width = rect.width * 2;
  canvas.height = rect.height * 2;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, {
    mimeType: "video/webm;codecs=vp9",
  });
  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const totalFrames =
    messageCount * (typingDurationMs + messageDelayMs) * (fps / 1000) + fps * 2;

  return new Promise((resolve, reject) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = filename;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      resolve();
    };

    recorder.onerror = () => reject(new Error("Recording failed"));

    recorder.start();

    import("html-to-image").then(({ toCanvas }) => {
      let frame = 0;

      const renderFrame = async () => {
        if (frame >= totalFrames) {
          recorder.stop();
          return;
        }

        try {
          const frameCanvas = await toCanvas(element, {
            pixelRatio: 2,
            cacheBust: true,
          });
          ctx.drawImage(frameCanvas, 0, 0, canvas.width, canvas.height);
        } catch {
          // continue on frame error
        }

        frame++;
        setTimeout(renderFrame, 1000 / fps);
      };

      renderFrame();
    });
  });
}
