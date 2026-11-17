
const NVIDIA_IMAGE_URL =
  "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-schnell";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const apiKey = process.env.NVIDIA_IMAGE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta configurar NVIDIA_IMAGE_API_KEY en Vercel."
      });
    }

    const { descripcion, estilo } = req.body || {};
    const tema = String(descripcion || "").trim();

    if (!tema) {
      return res.status(400).json({
        error: "Escribe el tema de la ilustración."
      });
    }

    if (tema.length > 1500) {
      return res.status(400).json({
        error: "La descripción es demasiado larga."
      });
    }

    const esBn = estilo === "bn";

    const estiloVisual = esBn
      ? `Black and white educational coloring page for elementary school children aged 6 to 12.
         Clean white background, thick clear black outlines, simple friendly cartoon drawings,
         large shapes, no gray shading, no colors, printable worksheet illustration.`
      : `Colorful educational illustration for elementary school children aged 6 to 12.
         Friendly cartoon drawing style, bright harmonious colors, clear shapes,
         simple visual composition, attractive children's school textbook illustration.`;

    const prompt = `
Create one high-quality educational illustration for Mexican elementary school students.

TOPIC: ${tema}

STYLE:
${estiloVisual}

REQUIREMENTS:
- Appropriate for children aged 6 to 12.
- Scientifically and educationally accurate.
- Show the main elements of the topic clearly.
- Friendly, attractive and easy to understand.
- Well organized composition.
- No photographs.
- No logos, watermarks or signatures.
- Avoid complicated technical details.
- Do not include random letters or illegible text.
`;

    const response = await fetch(NVIDIA_IMAGE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        height: 1024,
        width: 1024,
        mode: "base",
        samples: 1,
        seed: 0,
        steps: 4
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("NVIDIA FLUX error:", data);

      const detalle =
        data?.detail ||
        data?.error?.message ||
        data?.message ||
        `NVIDIA respondió con HTTP ${response.status}`;

      return res.status(response.status).json({
        error: detalle
      });
    }

    // NVIDIA puede devolver la imagen en artifacts o en data.
    const imagenBase64 =
      data?.artifacts?.[0]?.base64 ||
      data?.data?.[0]?.b64_json ||
      data?.image ||
      "";

    if (!imagenBase64) {
      console.error("Respuesta NVIDIA sin imagen:", data);

      return res.status(502).json({
        error: "NVIDIA respondió, pero no devolvió una imagen."
      });
    }

    const imagen = imagenBase64.startsWith("data:")
      ? imagenBase64
      : `data:image/jpeg;base64,${imagenBase64}`;

    return res.status(200).json({
      images: [imagen],
      imageUrl: imagen,
      total: 1,
      modelo: "FLUX.1 Schnell"
    });

  } catch (error) {
    console.error("Error en generación de ilustración:", error);

    return res.status(500).json({
      error: error.message || "No se pudo generar la ilustración."
    });
  }
}

