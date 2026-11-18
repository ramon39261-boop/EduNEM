export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const apiKey = process.env.NVIDIA_IMAGE_API_KEY;
    const modelo = process.env.NVIDIA_IMAGE_MODEL || "black-forest-labs/flux.1-schnell";

    if (!apiKey) {
      return res.status(500).json({ error: "Falta configurar NVIDIA_IMAGE_API_KEY en Vercel" });
    }

    const { descripcion, estilo } = req.body || {};
    const texto = String(descripcion || "").trim();

    if (!texto) {
      return res.status(400).json({ error: "Escribe un tema para generar la ilustración" });
    }

    const esBn = String(estilo || "").trim().toLowerCase() === "bn";

    // Instrucciones ultra estrictas para Blanco y Negro (Libro para colorear)
    const instruccionesBn = `
BLACK AND WHITE COLORING BOOK PAGE, outline vector line art only.
- Pure solid white background.
- Clean, thick, smooth black ink contour outlines.
- ZERO colors, ZERO gray shades, ZERO gradients, ZERO shading, ZERO fills.
- Large empty white spaces inside objects so children can color them with crayons.
- Absolutely NO text, NO letters, NO words, NO titles, NO watermarks anywhere.
`;

    // Instrucciones para Color
    const instruccionesColor = `
BRIGHT COLORFUL EDUCATIONAL ILLUSTRATION:
- Vibrant elementary school textbook style.
- Clean white background, centered subject.
- Absolutely NO text, NO letters, NO words, NO titles anywhere.
`;

    const prompt = `
Educational illustration for Mexican elementary school students (ages 6 to 12) about: "${texto}".
${esBn ? instruccionesBn : instruccionesColor}
`;

    const endpoint = `https://ai.api.nvidia.com/v1/genai/${modelo}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
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
      result = { error: rawResponse || "El servidor devolvió una respuesta vacía" };
    }

    if (!response.ok) {
      console.error("Error NVIDIA FLUX:", result);
      const mensaje = result?.error || result?.detail || result?.message || result?.title;
      return res.status(response.status).json({
        error: typeof mensaje === "string" ? mensaje : JSON.stringify(mensaje || result),
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
      imageUrl,
      imageBase64: base64,
      images: [imageUrl],
      estilo: esBn ? "bn" : "color"
    });

  } catch (error) {
    console.error("Error en generación de ilustración:", error);
    return res.status(500).json({
      error: error.message || "Error interno al generar la ilustración"
    });
  }
}





