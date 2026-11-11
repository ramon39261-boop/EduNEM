/**
 * Generación de ilustraciones educativas con NVIDIA NIM (FLUX.1-schnell).
 * La clave NVIDIA_API_KEY permanece únicamente en el servidor de Vercel.
 */
export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "Falta configurar NVIDIA_API_KEY en las variables de entorno de Vercel.",
    });
  }

  const descripcion = String(req.body?.descripcion || req.body?.prompt || "").trim();
  if (!descripcion) {
    return res.status(400).json({ error: "Escribe una descripción para la ilustración." });
  }

  if (descripcion.length > 8000) {
    return res.status(400).json({ error: "La descripción es demasiado larga. Reduce el texto e inténtalo de nuevo." });
  }

  const prompt = [
    "Create a high-quality educational illustration for a Mexican school lesson.",
    descripcion,
    "Clear composition, accurate educational subject matter, friendly and age-appropriate visual style, balanced colors, clean background.",
    "Do not include words, letters, captions, labels, watermarks, logos, or signatures. The image must be illustration only.",
  ].join(" ");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55000);

  try {
    const response = await fetch(
      "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          height: 1024,
          width: 1024,
          cfg_scale: 0,
          mode: "base",
          samples: 1,
          seed: 0,
          steps: 4,
        }),
        signal: controller.signal,
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const upstreamMessage =
        data?.detail || data?.message || data?.error || `NVIDIA respondió con estado ${response.status}.`;
      console.error("NVIDIA image generation error:", response.status, upstreamMessage);

      if (response.status === 401 || response.status === 403) {
        return res.status(response.status).json({
          error: "NVIDIA rechazó la clave API. Verifica NVIDIA_API_KEY en Vercel.",
        });
      }
      if (response.status === 429) {
        return res.status(429).json({
          error: "NVIDIA alcanzó el límite de solicitudes. Espera un momento e inténtalo de nuevo.",
        });
      }
      return res.status(response.status >= 500 ? 502 : response.status).json({
        error: "NVIDIA no pudo generar la ilustración. Inténtalo nuevamente más tarde.",
      });
    }

    const base64Image = data?.artifacts?.[0]?.base64;
    if (!base64Image) {
      console.error("NVIDIA returned no image artifact:", Object.keys(data || {}));
      return res.status(502).json({
        error: "NVIDIA respondió, pero no devolvió una imagen válida.",
      });
    }

    return res.status(200).json({
      imageUrl: `data:image/jpeg;base64,${base64Image}`,
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      return res.status(504).json({
        error: "La generación de la ilustración tardó demasiado. Inténtalo de nuevo.",
      });
    }

    console.error("Illustration generation failed:", error);
    return res.status(502).json({
      error: "No fue posible conectar con el servicio de imágenes de NVIDIA.",
    });
  } finally {
    clearTimeout(timeout);
  }
}
