
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    // Configuración independiente para generación de imágenes
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
        error: "La descripción es demasiado larga. Máximo 1500 caracteres."
      });
    }

    // Bloqueo básico de solicitudes claramente inapropiadas.
    const terminosProhibidos = [
      "pornografía",
      "pornografia",
      "contenido sexual explícito",
      "sexo explícito",
      "desnudez explícita",
      "violación sexual",
      "abuso sexual",
      "fetiche sexual",
      "gore",
      "mutilación",
      "mutilacion",
      "desmembramiento",
      "tortura gráfica",
      "tortura grafica"
    ];

    const descripcionNormalizada = texto.toLowerCase();

    const contieneContenidoProhibido =
      terminosProhibidos.some(termino =>
        descripcionNormalizada.includes(termino)
      );

    if (contieneContenidoProhibido) {
      return res.status(400).json({
        error: "Esta solicitud no es apropiada para una ilustración educativa de primaria."
      });
    }

    // Determinar el estilo solicitado
    const esBn = estilo === "bn";

    // Instrucciones educativas para FLUX
    const instruccionesEstilo = esBn
      ? `
STYLE: BLACK AND WHITE COLORING BOOK.
- Pure white background.
- Clean, thick and well-defined black outlines.
- Simple shapes that children can color easily.
- No colors.
- No gray shades.
- No shadows or gradients.
- No complex textures.
`
      : `
STYLE: COLORFUL ELEMENTARY SCHOOL ILLUSTRATION.
- Bright, harmonious and cheerful colors.
- Clear, attractive and friendly drawings.
- Soft, clean and pleasant visual appearance.
- Well-defined shapes and balanced composition.
- Professional educational textbook illustration.
`;

    const prompt = `
Create ONE educational illustration for Mexican elementary
school students, approximately 6 to 12 years old.

EDUCATIONAL PURPOSE:
The illustration must support learning in elementary school.
It should be appropriate for classroom activities, worksheets,
school projects and educational materials.

REQUESTED SUBJECT:
${texto}

STRICT CONTENT RULES:
- Represent the requested subject accurately.
- Focus on the main educational topic.
- Include only objects and elements relevant to the subject.
- Do not invent unrelated objects or characters.
- Do not change the meaning of the requested topic.
- Use age-appropriate educational representations.
- Keep the illustration friendly, clear and easy to understand.
- Avoid frightening, inappropriate or adult content.
- Do not include violence, gore or sexual content.

TEXT AND TYPOGRAPHY RULES:
- Do not write titles.
- Do not write sentences.
- Do not generate labels or captions.
- Do not generate random letters or words.
- Do not include watermarks, signatures or logos.
- Do not simulate handwritten text.
- Leave enough clean space for educational labels
  to be added separately.

COMPOSITION:
- Center the main educational subject.
- Use a clean and balanced layout.
- Make important elements easy to recognize.
- Avoid unnecessary decorative details.
- Use a simple white or very light background.
- Create a polished illustration suitable for primary school.

${instruccionesEstilo}

FINAL REQUIREMENT:
The result must look like an educational illustration
created specifically for an elementary school textbook.
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

    // Leer la respuesta sin asumir que siempre será JSON
    const rawResponse = await response.text();

    let result;

    try {
      result = JSON.parse(rawResponse);
    } catch {
      result = {
        error: rawResponse || "Respuesta vacía del servidor NVIDIA"
      };
    }

    // Manejo de errores de NVIDIA
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

    // Obtener imagen generada
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

    // Mantener compatibilidad con EduNEM
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
      error: error.message ||
        "Error interno al generar la ilustración"
    });
  }
}



