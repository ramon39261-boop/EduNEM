/**
 * Generación avanzada de ilustraciones educativas con Cloudflare Workers AI.
 * Modelo: FLUX.1-schnell
 */

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    return res.status(500).json({
      error: "Faltan CLOUDFLARE_ACCOUNT_ID o CLOUDFLARE_API_TOKEN en Vercel.",
    });
  }

  const { descripcion, prompt: bodyPrompt, estilo = "escolar", pasos = 4 } = req.body || {};
  const textoBase = String(descripcion || bodyPrompt || "").trim();

  if (!textoBase) {
    return res.status(400).json({
      error: "Escribe una descripción para la ilustración.",
    });
  }

  // Estilos reforzados para evitar texto falso y asegurar calidad didáctica
  let estiloPrompt = "clean educational vector illustration for elementary school children, bright colors, minimalist design, simple graphic elements, white background.";
  if (estilo === "cientifico") {
    estiloPrompt = "accurate scientific diagram, clean technical line drawing, anatomical structure style, high contrast, pure white background, educational textbook graphics.";
  } else if (estilo === "acuarela") {
    estiloPrompt = "soft pastel watercolor illustration for children's books, gentle colors, clean artistic style, white background.";
  } else if (estilo === "lineart") {
    estiloPrompt = "black and white outline coloring book page for school kids, clean bold outlines, zero shading, pure white background.";
  }

  // Prompt mejorado con restricciones estrictas en inglés para que Flux no invente letras
  const prompt = [
    textoBase,
    estiloPrompt,
    "ABSOLUTELY NO TEXT, NO LETTERS, NO WORDS, NO LABELS, NO CAPTIONS, NO WATERMARKS, NO SIGNATURES. ONLY pure visual graphics and icons."
  ].join(", ");

  if (prompt.length > 2048) {
    return res.status(400).json({
      error: "La descripción es demasiado larga. Reduce el texto e inténtalo de nuevo.",
    });
  }

  const numSteps = Math.min(Math.max(parseInt(pasos, 10) || 4, 2), 8);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55000);

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          steps: numSteps,
        }),
        signal: controller.signal,
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      console.error("Cloudflare image error:", response.status, data.errors || data);
      return res.status(response.status === 429 ? 429 : 502).json({
        error: "Cloudflare no pudo generar la ilustración. Verifica el servicio y vuelve a intentarlo.",
      });
    }

    const base64Image = data?.result?.image;

    if (!base64Image || typeof base64Image !== "string") {
      return res.status(502).json({
        error: "Cloudflare respondió, pero no devolvió una imagen válida.",
      });
    }

    return res.status(200).json({
      imageUrl: `data:image/jpeg;base64,${base64Image}`,
    });

  } catch (error) {
    console.error("Cloudflare illustration error:", error);
    if (error?.name === "AbortError") {
      return res.status(504).json({
        error: "Cloudflare tardó demasiado en generar la ilustración.",
      });
    }
    return res.status(502).json({
      error: "No fue posible conectar con Cloudflare Workers AI.",
    });
  } finally {
    clearTimeout(timeout);
  }
}
