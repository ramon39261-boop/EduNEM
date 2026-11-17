export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { descripcion, estilo } = req.body || {};
    const texto = String(descripcion || "").trim().toLowerCase();

    if (!texto) {
      return res.status(400).json({ error: "Escribe un tema educativo" });
    }

    const esBn = estilo === "bn";

    // Diccionario de equivalencias exactas para asegurar aciertos pedagógicos
    const equivalencias = {
      "mapa de mexico": "map of Mexico geography states blank outline",
      "mapa": "map of Mexico geography",
      "ciclo del agua": "water cycle diagram school science",
      "plato del bien comer": "healthy food plate nutrition chart",
      "partes de una planta": "plant anatomy school diagram biology",
      "sistema solar": "solar system planets space diagram",
      "aparato digestivo": "digestive system diagram school",
      "aparato respiratorio": "respiratory system diagram",
      "célula": "cell structure biology diagram",
      "volcán": "volcano cross section diagram"
    };

    let queryFinal = "mexico educational illustration";
    for (const [clave, valor] of Object.entries(equivalencias)) {
      if (texto.includes(clave)) {
        queryFinal = valor;
        break;
      }
    }

    if (esBn) {
      queryFinal += " line art black and white coloring page outline";
    } else {
      queryFinal += " bright vector illustration school poster";
    }

    // Consulta dirigida a Wikimedia Commons orientada estrictamente a imágenes y mapas
    const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      queryFinal
    )}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`;

    const response = await fetch(wikiUrl, {
      headers: { "User-Agent": "EduNEM-App/1.0" }
    });

    const data = await response.json();
    const pages = data?.query?.pages || {};
    
    let imagenes = Object.values(pages)
      .map((p) => p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url)
      .filter(Boolean);

    // Respaldo de seguridad si la búsqueda específica arroja pocos resultados
    if (imagenes.length === 0) {
      imagenes = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Mexico_in_its_region_%28USA_centered%29.svg/800px-Mexico_in_its_region_%28USA_centered%29.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mexico_%28orthographic_projection%29.svg/800px-Mexico_%28orthographic_projection%29.svg.png"
      ];
    }

    return res.status(200).json({
      images: imagenes,
      imageUrl: imagenes[0]
    });
  } catch (error) {
    console.error("Error en buscador visual:", error);
    return res.status(500).json({
      error: "No se pudo conectar con el catálogo visual"
    });
  }
}
