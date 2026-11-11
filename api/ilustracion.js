
/**
 * Generación de ilustraciones educativas con Cloudflare Workers AI.
 * Modelo: FLUX.1-schnell
 * Las credenciales permanecen en el servidor de Vercel.
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

  const descripcion = String(
    req.body?.descripcion || req.body?.prompt || ""
  ).trim();

  if (!descripcion) {
    return res.status(400).json({
      error: "Escribe una descripción para la ilustración.",
    });
  }

  const prompt = [
    "Create a high-quality educational illustration for a Mexican school lesson.",
    descripcion,
    "Clear composition, accurate educational subject matter, friendly and age-appropriate visual style, balanced colors, clean background.",
    "Do not include words, letters, captions, labels, watermarks, logos, or signatures. The image must be illustration only.",
  ].join(" ");

  if (prompt.length > 2048) {
    return res.status(400).json({
      error: "La descripción es demasiado larga. Reduce el texto e inténtalo de nuevo.",
    });
  }

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
          steps: 4,
        }),
        signal: controller.signal,
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      console.error(
        "Cloudflare image error:",
        response.status,
        data.errors || data
      );

      return res.status(
        response.status === 429 ? 429 : 502
      ).json({
        error: "Cloudflare no pudo generar la ilustración. Verifica el servicio y vuelve a intentarlo.",
      });
    }

    const base64Image = data?.result?.image;

    if (!base64Image || typeof base64Image !== "string") {
      console.error("Cloudflare no devolvió una imagen válida:", data);

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

