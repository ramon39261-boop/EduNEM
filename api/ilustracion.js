
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const apiKey = process.env.NVIDIA_IMAGE_API_KEY;
    const modelo =
      process.env.NVIDIA_IMAGE_MODEL ||
      "black-forest-labs/flux.1-schnell";

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

    if (texto.length > 1500) {
      return res.status(400).json({
        error: "El tema es demasiado largo"
      });
    }

    const esBn = estilo === "bn";

    const prompt = `
Create ONE clear educational illustration for Mexican elementary school students, ages 6 to 12.

MAIN SUBJECT:
${texto}

EDUCATIONAL REQUIREMENTS:
- Represent the requested subject accurately.
- Focus only on the main educational topic.
- Show recognizable objects and correct visual details.
- Use a simple, organized composition.
- Make the illustration easy for primary school children to understand.
- Use a friendly children's textbook illustration style.
- Avoid unrelated objects, decorative clutter and confusing details.

IMPORTANT TEXT RULES:
- Do not include words.
- Do not include letters.
- Do not include numbers.
- Do not include captions, labels, titles or written explanations.
- Do not create pseudo-text or random symbols.

IMAGE QUALITY:
- One main scene.
- Clear shapes and well-defined elements.
- Balanced composition.
- Clean background.
- High-quality educational illustration.
- No watermark or signature.

SAFETY:
- Appropriate for children ages 6 to 12.
- No violence, frightening imagery or inappropriate content.

${esBn
  ? "BLACK AND WHITE COLORING PAGE. White background, clean bold black outlines, simple shapes, no colors, no gray shades, no shadows."
  : "FULL COLOR EDUCATIONAL ILLUSTRATION. Bright harmonious colors, attractive and clear, suitable for a Mexican elementary school textbook."}
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
        steps: 4
      })
    });

    const rawResponse = await response.text();

    let result;

    try {
      result = JSON.parse(rawResponse);
    } catch {
      result = {
        error: rawResponse || "El servidor devolvió una respuesta vacía"
      };
    }

    if (!response.ok) {
      console.error("Error NVIDIA FLUX:", result);

      const mensaje =
        result?.error ||
        result?.detail ||
        result?.message ||
        result?.title;

      return res.status(response.status).json({
        error: typeof mensaje === "string"
          ? mensaje
          : JSON.stringify(mensaje || result),
        details: result,
        status: response.status
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
      error: error.message || "Error interno al generar la ilustración"
    });
  }
}





