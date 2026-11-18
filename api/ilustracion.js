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

    const esBn =
      String(estilo || "").trim().toLowerCase() === "bn";

    const instruccionesBn = `
Create a REAL BLACK AND WHITE COLORING BOOK PAGE for elementary school children.

STRICT COLORING PAGE REQUIREMENTS:
- Pure white background.
- Black ink outlines only.
- Thick, smooth, clean black contour lines.
- Large enclosed areas that children can color with crayons.
- Simple shapes with clearly defined boundaries.
- Minimal details, suitable for children ages 6 to 12.
- Every object must be drawn using black outlines.
- Keep the inside of all shapes completely white and empty.
- Use consistent outline thickness.
- Printable coloring worksheet appearance.

ABSOLUTELY FORBIDDEN:
- No colors whatsoever.
- No gray.
- No grayscale.
- No gradients.
- No shadows.
- No lighting effects.
- No textures.
- No pencil shading.
- No crosshatching.
- No filled black areas except small necessary outline details.
- No photographic appearance.
- No colored illustration converted to grayscale.

The result must look like a traditional children's coloring book page, ready to print and color.
`;

    const instruccionesColor = `
FULL COLOR EDUCATIONAL ILLUSTRATION:
- Bright, harmonious and attractive colors.
- Friendly children's textbook illustration style.
- Clear and recognizable objects.
- Beautiful but simple educational composition.
- Soft, clean visual appearance.
- Appropriate for Mexican elementary school students ages 6 to 12.
`;

    const prompt = `
Create ONE educational illustration for Mexican elementary school students, ages 6 to 12.

MAIN EDUCATIONAL SUBJECT:
${texto}

EDUCATIONAL ACCURACY:
- Represent the subject correctly.
- Show the most important elements clearly.
- Use recognizable shapes and objects.
- Make the illustration easy for primary school children to understand.
- Avoid confusing or unrelated details.

COMPOSITION:
- One main educational scene.
- Balanced and organized composition.
- Clean, uncluttered background.
- Centered subject.
- No watermark or signature.

TEXT RESTRICTIONS:
- No words.
- No letters.
- No numbers.
- No captions.
- No labels.
- No titles.
- No random symbols.

CHILD SAFETY:
- Friendly and appropriate for children ages 6 to 12.
- No violence or frightening imagery.

${esBn ? instruccionesBn : instruccionesColor}
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




