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

    // Prompt directo optimizado para velocidad y precisión didáctica
    const promptVisual = esBn
      ? `Coloring book line art for primary school: ${texto}, pure white background, clean thick black outlines, no shading, easy to print.`
      : `Bright colorful educational school poster illustration: ${texto}, flat clean vector art for kids, white background.`;

    // Generación ultra rápida con FLUX.1-schnell (2 pasos para evitar timeout en Vercel)
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
        steps: 2, // Reducido a 2 pasos para respuesta inmediata (<2 segundos)
      }),
    });

    if (!imgRes.ok) {
      const errText = await imgRes.text();
      throw new Error(`Error en NVIDIA NIM Imagen (${imgRes.status}): ${errText}`);
    }

    const imgData = await imgRes.json();
    
    // Validamos ambos formatos posibles que devuelve NVIDIA (base64 o url)
    const base64Img = imgData.artifacts?.[0]?.base64;
    const urlImg = imgData.artifacts?.[0]?.url || imgData.url;

    let dataUrl = "";
    if (base64Img) {
      dataUrl = `data:image/jpeg;base64,${base64Img}`;
    } else if (urlImg) {
      dataUrl = urlImg;
    } else {
      throw new Error("NVIDIA NIM no devolvió una imagen válida.");
    }

    return res.status(200).json({
      images: [dataUrl],
      imageUrl: dataUrl,
    });

  } catch (error) {
    console.error("EduNEM Ilustración API:", error);
    return res.status(500).json({
      error: error.message || "Error al generar la lámina educativa.",
    });
  }
}
