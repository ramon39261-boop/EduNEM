export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Falta configurar NVIDIA_API_KEY en Vercel." });
  }

  try {
    const { descripcion, estilo } = req.body || {};
    const texto = String(descripcion || "").trim();

    if (!texto) {
      return res.status(400).json({ error: "Escribe el tema de la lámina educativa." });
    }

    const esBn = estilo === "bn";

    // Paso 1: Usamos el modelo de texto de NVIDIA para optimizar el prompt visual en inglés
    const modelText = process.env.NVIDIA_MODEL || "nvidia/nemotron-3.5-lightning-30b-a3b";
    
    const textRes = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelText,
        messages: [
          { 
            role: "system", 
            content: "You are an educational illustrator prompt engineer for Mexican primary schools. Translate the user's topic into a clear, descriptive English image generation prompt (max 40 words). Output ONLY the prompt text, with no quotes or explanations." 
          },
          { 
            role: "user", 
            content: esBn 
              ? `Topic: ${texto}. Style: black and white coloring book line art for primary school kids, pure white background, clean outlines, no shading.`
              : `Topic: ${texto}. Style: bright colorful educational school poster illustration, flat clean vector art for kids, white background.`
          },
        ],
        temperature: 0.3,
        max_tokens: 100,
      }),
    });

    const textPayload = await textRes.json().catch(() => ({}));
    let promptVisual = texto;
    if (textRes.ok) {
      promptVisual = textPayload?.choices?.[0]?.message?.content?.trim() || texto;
    }

    // Paso 2: Generamos la imagen con FLUX.1-schnell de NVIDIA NIM
    const imgRes = await fetch("https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-schnell", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        prompt: promptVisual,
        width: 1024,
        height: 768,
        seed: Math.floor(Math.random() * 100000),
        steps: 4,
      }),
    });

    if (!imgRes.ok) {
      const errText = await imgRes.text();
      throw new Error(`Error en NVIDIA NIM Imagen: ${imgRes.status} - ${errText}`);
    }

    const imgData = await imgRes.json();
    const base64Img = imgData.artifacts?.[0]?.base64;

    if (!base64Img) {
      throw new Error("NVIDIA NIM no devolvió datos de imagen válidos.");
    }

    const dataUrl = `data:image/jpeg;base64,${base64Img}`;

    return res.status(200).json({
      images: [dataUrl],
      imageUrl: dataUrl,
    });

  } catch (error) {
    console.error("EduNEM Ilustración API:", error);
    return res.status(error.status || 500).json({
      error: error.message || "Error al generar la lámina educativa.",
    });
  }
}
