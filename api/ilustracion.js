/**
 * Generación de ilustraciones educativas con Nvidia NIM API en EduNEM.
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

  const nvidiaApiKey = process.env.NVIDIA_API_KEY;

  if (!nvidiaApiKey) {
    return res.status(500).json({
      error: "Falta configurar la variable NVIDIA_API_KEY en Vercel.",
    });
  }

  const { descripcion, prompt: bodyPrompt, estilo = "escolar" } = req.body || {};
  const textoBase = String(descripcion || bodyPrompt || "").trim();

  if (!textoBase) {
    return res.status(400).json({
      error: "Escribe una descripción para la ilustración.",
    });
  }

  // Traducción y anclaje semántico estricto para EduNEM
  let promptTema = textoBase;
  const lower = textoBase.toLowerCase();

  if (lower.includes('bandera de mexico') || lower.includes('bandera mexicana')) {
    promptTema = "A majestic waving official Mexican flag attached to a silver flagpole with a golden sphere on top, vertical stripes of green white and red, detailed national coat of arms in the center white stripe";
  } else if (lower.includes('ciclo del agua')) {
    promptTema = "Detailed educational 3D scientific diagram of the water cycle, showing ocean evaporation, cloud formation, rain precipitation over mountains, and rivers flowing back";
  } else if (lower.includes('plato del bien comer') || lower.includes('alimentos')) {
    promptTema = "Vibrant educational 3D plate chart divided clearly into food groups: fruits, vegetables, grains, and legumes";
  } else if (lower.includes('planta') || lower.includes('raíz') || lower.includes('fotosíntesis')) {
    promptTema = "Detailed botanical 3D educational model of a green flowering plant showing underground roots in soil, stem, leaves, and sunlight";
  } else if (lower.includes('sistema solar') || lower.includes('planetas')) {
    promptTema = "Realistic 3D educational model of the solar system with the glowing sun in the center and all planets orbiting around it";
  } else {
    promptTema = `Clear educational diagram and 3D illustration of: ${textoBase}`;
  }

  let estiloPrompt = "high-end 3D digital render, studio lighting, vivid natural colors, clean isolated solid white background, highly detailed";
  if (estilo === "cientifico") {
    estiloPrompt = "precise scientific visualization, clean technical 3D cross-section render, high contrast studio lighting, solid white background";
  } else if (estilo === "acuarela") {
    estiloPrompt = "soft pastel watercolor educational illustration, gentle artistic lighting, clean white background";
  } else if (estilo === "lineart") {
    estiloPrompt = "black and white outline coloring book page for kids, clean bold outlines, zero shading, solid white background";
  }

  const promptFinal = [
    promptTema,
    estiloPrompt,
    "ONLY the isolated subject centered in the frame. NO banners, NO frames, NO headers, NO title boxes, NO text boxes, ABSOLUTELY NO TEXT, NO LETTERS, NO WORDS, NO WATERMARKS"
  ].join(", ");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55000);

  try {
    const response = await fetch(
      "https://integrate.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${nvidiaApiKey}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          prompt: promptFinal,
          width: 1024,
          height: 1024,
          steps: 30,
          cfg_scale: 7.5,
          samples: 1
        }),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("Nvidia NIM Image error:", response.status, errText);
      return res.status(502).json({
        error: `Nvidia NIM respondió con error (${response.status}): ${errText}`,
      });
    }

    const data = await response.json();
    const base64Image = data.image || (data.artifacts && data.artifacts[0] && data.artifacts[0].base64);

    if (!base64Image) {
      throw new Error("La respuesta de Nvidia no devolvió datos de imagen válidos.");
    }

    clearTimeout(timeout);
    return res.status(200).json({
      imageUrl: `data:image/jpeg;base64,${base64Image}`,
    });

  } catch (error) {
    clearTimeout(timeout);
    console.error("Nvidia connection error:", error);
    return res.status(502).json({
      error: `No fue posible conectar con el servicio de Nvidia: ${error.message}`,
    });
  }
}
