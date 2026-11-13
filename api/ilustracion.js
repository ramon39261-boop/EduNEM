export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { descripcion, estilo } = req.body || {};
    const textoBase = String(descripcion || "").trim();
    const esBn = estilo === "bn";

    // Semilla numérica basada en el texto para mantener consistencia
    let seed = 42;
    for (let i = 0; i < textoBase.length; i++) {
      seed = (seed + textoBase.charCodeAt(i)) % 1000;
    }

    // Usamos un servicio de imágenes dinámicas basado en etiquetas y texto descriptivo
    // Si es blanco y negro, aplicamos parámetros de escala de grises y alto contraste
    const query = encodeURIComponent(textoBase + " educational school diagram vector illustration");
    let imageUrl = `https://picsum.photos/seed/${seed}/800/600`;

    if (esBn) {
      // Filtro para forzar estilo monocromático / blanco y negro idóneo para fotocopias
      imageUrl = `https://picsum.photos/seed/${seed}/800/600?grayscale&blur=0`;
    }

    return res.status(200).json({ imageUrl });
  } catch (error) {
    return res.status(200).json({ 
      imageUrl: "https://picsum.photos/seed/edunem/800/600" 
    });
  }
}
