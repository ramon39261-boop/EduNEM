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

  // Traducción y precisión semántica optimizada
  let promptTema = textoBase;
  const lower = textoBase.toLowerCase();

  if (lower.includes('bandera de mexico') || lower.includes('bandera mexicana')) {
    promptTema = "A majestic waving official Mexican flag attached to a silver flagpole with a golden sphere on top, high quality 3D render, realistic fabric texture with folds and wind movement, vertical stripes of green white and red, detailed national coat of arms in the center white stripe";
  } else if (lower.includes('ciclo del agua')) {
    promptTema = "Detailed educational 3D render of the water cycle showing ocean evaporation, cloud formation, rain precipitation over mountains, and rivers flowing back";
  } else if (lower.includes('plato del bien comer') || lower.includes('alimentos')) {
    promptTema = "Vibrant 3D educational plate chart divided clearly into food groups: fruits, vegetables, grains, and legumes";
  } else if (lower.includes('planta') || lower.includes('raíz')) {
    promptTema = "Detailed botanical 3D educational model of a green flowering plant showing underground roots in soil, stem, leaves, and flower";
  } else if (lower.includes('sistema solar')) {
    promptTema = "Realistic 3D educational model of the solar system with the glowing sun in the center and all planets orbiting around it";
  }

  // Estilos visuales con calidad de render profesional
  let estiloPrompt = "high-end 3D digital render, studio lighting, vivid natural colors, clean isolated solid white background";
  if (estilo === "cientifico") {
    estiloPrompt = "precise scientific visualization, clean technical 3D render, high contrast studio lighting, solid white background";
  } else if (estilo === "acuarela") {
    estiloPrompt = "soft pastel watercolor illustration, gentle artistic lighting, clean white background";
  } else if (estilo === "lineart") {
    estiloPrompt = "black and white outline coloring book page for kids, clean bold outlines, zero shading, solid white background";
  }

  // Prompt optimizado para aislar el objeto y evitar textos basura
  const prompt = [
    promptTema,
    estiloPrompt,
    "ONLY the isolated subject centered in the frame. NO banners, NO frames, NO headers, NO title boxes, NO text boxes, ABSOLUTELY NO TEXT, NO LETTERS, NO WORDS, NO WATERMARKS"
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
