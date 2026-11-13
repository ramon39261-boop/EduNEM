export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { descripcion } = req.body || {};
    const textoBase = String(descripcion || "").trim().toLowerCase();

    // Banco de imágenes educativas estables y garantizadas (PNG directo)
    const bancoSeguro = {
      "ciclo del agua": "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?q=80&w=1000&auto=format&fit=crop",
      "plato del bien comer": "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000&auto=format&fit=crop",
      "partes de la planta": "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1000&auto=format&fit=crop",
      "sistema solar": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop",
      "bandera de mexico": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop"
    };

    let imageUrl = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop"; // Imagen educativa por defecto

    for (const [key, url] of Object.entries(bancoSeguro)) {
      if (textoBase.includes(key)) {
        imageUrl = url;
        break;
      }
    }

    return res.status(200).json({ imageUrl });
  } catch (error) {
    return res.status(200).json({ 
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop" 
    });
  }
}
