/**
 * Generación de ilustraciones educativas con Pollinations AI (Sin tokens ni registros).
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

  const { descripcion, prompt: bodyPrompt, estilo = "escolar" } = req.body || {};
  const textoBase = String(descripcion || bodyPrompt || "").trim();

  if (!textoBase) {
    return res.status(400).json({
      error: "Escribe una descripción para la ilustración.",
    });
  }

  // Traducción y precisión semántica para EduNEM
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

  let estiloPrompt = "high-end 3D digital render, studio lighting, vivid natural colors, clean isolated solid white background";
  if (estilo === "cientifico") {
    estiloPrompt = "precise scientific visualization, clean technical 3D render, high contrast studio lighting, solid white background";
  } else if (estilo === "acuarela") {
    estiloPrompt = "soft pastel watercolor illustration, gentle artistic lighting, clean white background";
  } else if (estilo === "lineart") {
    estiloPrompt = "black and white outline coloring book page for kids, clean bold outlines, zero shading, solid white background";
  }

  const promptFinal = [
    promptTema,
    estiloPrompt,
    "ONLY the isolated subject centered in the frame. NO banners, NO frames, NO headers, NO title boxes, NO text boxes, ABSOLUTELY NO TEXT, NO LETTERS, NO WORDS, NO WATERMARKS"
  ].join(", ");

  if (promptFinal.length > 2048) {
    return res.status(400).json({
      error: "La descripción es demasiado larga. Reduce el texto e inténtalo de nuevo.",
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55000);

  try {
    // Generación limpia mediante URL directa de Pollinations
    const encodedPrompt = encodeURIComponent(promptFinal);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&private=true&model=flux`;

    clearTimeout(timeout);
    return res.status(200).json({
      imageUrl: imageUrl,
    });

  } catch (error) {
    clearTimeout(timeout);
    console.error("Pollinations connection error:", error);
    return res.status(502).json({
      error: `No fue posible conectar con el servicio de imágenes: ${error.message}`,
    });
  }
}
