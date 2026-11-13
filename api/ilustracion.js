export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { descripcion, estilo } = req.body || {};
    const textoBase = String(descripcion || "").trim().toLowerCase();
    const esBn = estilo === "bn";

    // Diccionario con esquemas educativos específicos y precisos
    const bancoEducativo = {
      "agua": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1000&auto=format&fit=crop",
      "plato": "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000&auto=format&fit=crop",
      "planta": "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1000&auto=format&fit=crop",
      "sistema solar": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop"
    };

    let imageUrl = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop";

    for (const [key, url] of Object.entries(bancoEducativo)) {
      if (textoBase.includes(key)) {
        imageUrl = url;
        break;
      }
    }

    // Si el usuario seleccionó Blanco y Negro, aplicamos el parámetro oficial de escala de grises de la URL
    if (esBn) {
      imageUrl += "&grayscale=1&contrast=20";
    }

    return res.status(200).json({ imageUrl });
  } catch (error) {
    return res.status(200).json({ 
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop" 
    });
  }
}
