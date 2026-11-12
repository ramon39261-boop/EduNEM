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

  // Traducción y precisión semántica para evitar confusiones comunes en IA
  let promptTema = textoBase;
  const lower = textoBase.toLowerCase();

  if (lower.includes('bandera de mexico') || lower.includes('bandera mexicana')) {
    promptTema = "Official Mexican flag, rectangular flag with three vertical stripes of green, white, and red, with the national coat of arms of an eagle on a cactus eating a snake in the center white stripe, waving gently";
  } else if (lower.includes('ciclo del agua')) {
    promptTema = "Water cycle diagram showing evaporation from the ocean, condensation into clouds, precipitation as rain over mountains, and rivers flowing back to the sea";
  } else if (lower.includes('plato del bien comer') || lower.includes('alimentos')) {
    promptTema = "Healthy food plate chart divided into fruits, vegetables, grains, and legumes";
  } else if (lower.includes('planta') || lower.includes('raíz') || lower.includes('hojas')) {
    promptTema = "Detailed botany diagram of a green flowering plant showing roots in soil, stem, green leaves, and a flower on top";
  } else if (lower.includes('sistema solar')) {
    promptTema = "Solar system showing the sun in the center and all eight planets orbiting around it in order";
  } else if (lower.includes('mapa de mexico') || lower.includes('republica mexicana')) {
    promptTema = "Accurate geographical outline map of Mexico showing states and borders";
  }

  // Estilos visuales optimizados
  let estiloPrompt = "clean educational vector illustration, simple graphic design, bright primary colors, plain solid white background";
  if (estilo === "cientifico") {
    estiloPrompt = "accurate scientific diagram, clean technical line drawing, anatomical structure, high contrast, solid white background";
  } else if (estilo === "acuarela") {
    estiloPrompt = "soft pastel watercolor illustration, gentle colors, clean artistic style, solid white background";
  } else if (estilo === "lineart") {
    estiloPrompt = "black and white outline coloring book page for kids, clean bold outlines, zero shading, solid white background";
  }

  // Prompt estricto anti-texto y anti-distorsiones
  const prompt = [
    promptTema,
    estiloPrompt,
    "ONLY the isolated subject filling the frame. NO banners, NO frames, NO headers, NO title boxes, NO text boxes, ABSOLUTELY NO TEXT, NO LETTERS, NO WORDS, NO LABELS, NO WATERMARKS"
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
