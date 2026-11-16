export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { descripcion, estilo } = req.body || {};
    const texto = String(descripcion || "").trim();

    if (!texto) {
      return res.status(400).json({ error: "Escribe un tema educativo" });
    }

    const esBn = estilo === "bn";

    // Diccionario de términos clave en inglés para maximizar aciertos en buscadores globales abiertos
    const traducciones = {
      "ciclo del agua": "water cycle diagram school",
      "plato del bien comer": "food nutrition plate diagram",
      "partes de una planta": "plant anatomy school diagram",
      "sistema solar": "solar system planets kids",
      "aparato digestivo": "digestive system diagram school",
      "aparato respiratorio": "respiratory system diagram",
      "célula": "cell structure biology diagram",
      "volcán": "volcano cross section school",
      "mapa de mexico": "mexico map educational"
    };

    let queryFinal = texto.toLowerCase();
    for (const [clave, valor] of Object.entries(traducciones)) {
      if (queryFinal.includes(clave)) {
        queryFinal = valor;
        break;
      }
    }

    if (esBn) {
      queryFinal += " line art black and white outline";
    } else {
      queryFinal += " educational illustration vector";
    }

    // Consulta en paralelo a Wikimedia Commons (enorme base de esquemas científicos/educativos)
    const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      `filetype:bitmap|drawing ${queryFinal}`
    )}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`;

    const openverseUrl = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(
      queryFinal
    )}&category=illustration,digitized_artwork&page_size=6`;

    const [wikiRes, openverseRes] = await Promise.all([
      fetch(wikiUrl, { headers: { "User-Agent": "EduNEM-App/1.0" } }).catch(() => null),
      fetch(openverseUrl, { headers: { "User-Agent": "EduNEM-App/1.0" } }).catch(() => null)
    ]);

    let imagenes = [];

    if (wikiRes && wikiRes.ok) {
      const wikiData = await wikiRes.json();
      const pages = wikiData?.query?.pages || {};
      const wikiImgs = Object.values(pages)
        .map((p) => p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url)
        .filter(Boolean);
      imagenes.push(...wikiImgs);
    }

    if (openverseRes && openverseRes.ok) {
      const openData = await openverseRes.json();
      const openImgs = (openData?.results || [])
        .map((item) => item.thumbnail || item.url)
        .filter(Boolean);
      imagenes.push(...openImgs);
    }

    // Eliminamos duplicados
    imagenes = [...new Set(imagenes)];

    return res.status(200).json({
      images: imagenes,
      imageUrl: imagenes[0] || ""
    });
  } catch (error) {
    console.error("Error en buscador visual:", error);
    return res.status(500).json({
      error: "No se pudo conectar con el catálogo visual"
    });
  }
}
