/**
 * Generación de ilustraciones educativas con Hugging Face Router (SDXL).
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

  const hfToken = process.env.HF_TOKEN;

  if (!hfToken) {
    return res.status(500).json({
      error: "Falta configurar la variable HF_TOKEN en Vercel.",
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55000);

  try {
    // Usando Stable Diffusion XL, compatible con el router actual de Hugging Face
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
          "x-wait-for-model": "true"
        },
        body: JSON.stringify({ inputs: prompt }),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("Hugging Face Router error:", response.status, errText);
      return res.status(502).json({
        error: `Hugging Face respondió con error (${response.status}): ${errText}`,
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    clearTimeout(timeout);
    return res.status(200).json({
      imageUrl: `data:image/jpeg;base64,${base64Image}`,
    });

  } catch (error) {
    clearTimeout(timeout);
    console.error("Hugging Face connection error:", error);
    return res.status(502).json({
      error: `No fue posible conectar con Hugging Face: ${error.message}`,
    });
  }
}
