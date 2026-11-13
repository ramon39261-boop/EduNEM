export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { descripcion } = req.body || {};
    const textoBase = String(descripcion || "").trim().toLowerCase();

    // Banco directo de láminas educativas institucionales de alta compatibilidad y formato SVG/PNG directo
    const bancoDirecto = {
      "ciclo del agua": "https://upload.wikimedia.org/wikipedia/commons/9/94/Water_cycle_en.svg",
      "plato del bien comer": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Plato_del_bien_comer.svg",
      "partes de la planta": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Plant_anatomy_en.svg",
      "sistema solar": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Solar_system_scale_jup.jpg",
      "bandera de mexico": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg"
    };

    let imageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/3a/Open_book_01.svg"; // Fallback por defecto

    for (const [key, url] of Object.entries(bancoDirecto)) {
      if (textoBase.includes(key)) {
        imageUrl = url;
        break;
      }
    }

    return res.status(200).json({ imageUrl });
  } catch (error) {
    return res.status(200).json({ 
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Open_book_01.svg" 
    });
  }
}
