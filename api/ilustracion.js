/**
 * Generación avanzada de ilustraciones educativas con Cloudflare Workers AI y Agnes AI de respaldo.
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

  // INTENTO 1: Cloudflare Workers AI (Flux.1-schnell)
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (accountId && apiToken) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 50000);

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

      if (response.ok && data.success !== false && data?.result?.image) {
        clearTimeout(timeout);
        return res.status(200).json({
          imageUrl: `data:image/jpeg;base64,${data.result.image}`,
        });
      }
      console.warn("Cloudflare falló o dio límite, intentando respaldo con Agnes AI...");
    } catch (cfError) {
      console.warn("Error en Cloudflare, pasando a Agnes AI:", cfError);
    } finally {
      clearTimeout(timeout);
    }
  }

  // INTENTO 2: Respaldo automático con Agnes AI (si Cloudflare falla o da 429)
  const agnesApiKey = process.env.AGNES_API_KEY;
  if (!agnesApiKey) {
    return res.status(502).json({
      error: "Cloudflare alcanzó su límite y falta configurar AGNES_API_KEY en Vercel como respaldo.",
    });
  }

  const agnesController = new AbortController();
  const agnesTimeout = setTimeout(() => agnesController.abort(), 55000);

  try {
    const agnesResponse = await fetch("https://api.agnes.ai/v1/images/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${agnesApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model: "agnes-image-flash",
      }),
      signal: agnesController.signal,
    });

    const agnesData = await agnesResponse.json().catch(() => ({}));

    if (!agnesResponse.ok || !agnesData?.url && !agnesData?.image) {
      throw new Error(agnesData?.error || "Error en el servicio de Agnes AI");
    }

    const finalImageUrl = agnesData.url || `data:image/jpeg;base64,${agnesData.image}`;

    clearTimeout(agnesTimeout);
    return res.status(200).json({
      imageUrl: finalImageUrl,
    });

  } catch (agnesError) {
    clearTimeout(agnesTimeout);
    console.error("Agnes AI fallback error:", agnesError);
    return res.status(502).json({
      error: "Cloudflare llegó a su límite diario y el respaldo de Agnes AI no pudo completar la generación.",
    });
  }
}
