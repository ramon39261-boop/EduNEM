
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const apiKey = process.env.NVIDIA_IMAGE_API_KEY;
    const modelo =
      process.env.NVIDIA_IMAGE_MODEL || "black-forest-labs/flux.1-schnell";

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta configurar NVIDIA_IMAGE_API_KEY en Vercel"
      });
    }

    const { descripcion, estilo } = req.body || {};
    const texto = String(descripcion || "").trim();

    if (!texto) {
      return res.status(400).json({
        error: "Escribe un tema para generar la ilustración"
      });
    }

    const esBn = estilo === "bn";

    const prompt = `
Create a high-quality educational illustration for Mexican elementary school children.

Subject: ${texto}

Style:
- Friendly and attractive children's educational illustration.
- Clear shapes and recognizable objects.
- Simple composition, centered subject.
- Appropriate for elementary school students.
- Clean background.
- No watermark.
- No signatures.
- No unnecessary decorative elements.
- No realistic violence or frightening content.
- Educational and age-appropriate.

${esBn
  ? "Black and white coloring book illustration, clean bold outlines, white background, no gray shades, no colors."
  : "Bright harmonious colors, colorful children's textbook illustration."}
`;

    const endpoint =
      `https://ai.api.nvidia.com/v1/genai/${modelo}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        height: 1024,
        width: 1024,
        cfg_scale: 0,
        mode: "base",
        image: null,
        samples: 1,
        seed: 0,
        steps: 4
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error NVIDIA FLUX:", result);

      return res.status(response.status).json({
        error:
          result?.detail ||
          result?.message ||
          result?.title ||
          "NVIDIA no pudo generar la ilustración",
        details: result
      });
    }

    const base64 =
      result?.data?.[0]?.artifacts?.[0]?.base64 ||
      result?.artifacts?.[0]?.base64 ||
      result?.data?.artifacts?.[0]?.base64;

    if (!base64) {
      console.error("Respuesta inesperada de NVIDIA:", result);

      return res.status(502).json({
        error: "NVIDIA respondió, pero no se encontró la imagen generada",
        details: result
      });
    }

    const imageUrl = `data:image/png;base64,${base64}`;

    return res.status(200).json({
      success: true,
      image: imageUrl,
      imageUrl: imageUrl,
      imageBase64: base64,
      images: [imageUrl]
    });

  } catch (error) {
    console.error("Error en generación de ilustración:", error);

    return res.status(500).json({
      error: "Error interno al generar la ilustración",
      details: error.message
    });
  }
}

