export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Falta configurar NVIDIA_API_KEY en Vercel" });
  }

  try {
    const { descripcion, estilo } = req.body || {};
    const texto = String(descripcion || "").trim();

    if (!texto) {
      return res.status(400).json({ error: "Escribe el tema de la lámina educativa" });
    }

    const esBn = estilo === "bn";

    // Paso 1: Nemotron traduce y optimiza la petición del docente a un prompt visual exacto
    const llmRes = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3.5-lightning-30b-a3b",
        messages: [
          {
            role: "system",
            content:
              "You are an educational illustrator prompt engineer for Mexican primary schools. Translate the user's topic into a clear, descriptive English image generation prompt (max 45 words). Output ONLY the prompt text, with no quotes, labels, or explanations."
          },
          {
            role: "user",
            content: esBn
              ? `Topic: ${texto}. Style: black and white coloring book line art for primary school kids, pure white background, clean thick black outlines, no gray shading, easy to print and photocopy.`
              : `Topic: ${texto}. Style: bright colorful educational school poster illustration, flat clean vector art for primary school kids, white background, clear visual elements.`
          }
        ],
        temperature: 0.2,
        max_tokens: 100
      })
    });

    let promptVisual = texto;
    if (llmRes.ok) {
      const llmData = await llmRes.json();
      promptVisual = llmData.choices?.[0]?.message?.content?.trim() || texto;
    }

    // Paso 2: FLUX.1-schnell de NVIDIA NIM genera la lámina en ~2 segundos
    const imgRes = await fetch("https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-schnell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/json"
      },
      body: JSON.stringify({
        prompt: promptVisual,
        width: 1024,
        height: 768,
        seed: Math.floor(Math.random() * 100000),
        steps: 4
      })
    });

    if (!imgRes.ok) {
      const errText = await imgRes.text();
      throw new Error(`Error NVIDIA NIM Imagen (${imgRes.status}): ${errText}`);
    }

    const imgData = await imgRes.json();
    const base64Img = imgData.artifacts?.[0]?.base64;

    if (!base64Img) {
      throw new Error("NVIDIA NIM no devolvió datos de imagen.");
    }

    const dataUrl = `data:image/jpeg;base64,${base64Img}`;

    return res.status(200).json({
      images: [dataUrl],
      imageUrl: dataUrl
    });
  } catch (error) {
    console.error("Error en NVIDIA NIM:", error);
    return res.status(500).json({
      error: error.message || "Error al generar la lámina con NVIDIA NIM"
    });
  }
}
