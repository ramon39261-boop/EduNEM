export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { descripcion, estilo } = req.body || {};
    const texto = String(descripcion || "").trim();

    if (!texto) {
      return res.status(400).json({ error: "Escribe un término de búsqueda" });
    }

    // Traducimos términos clave comunes de primaria para obtener mejores diagramas educativos
    const diccionarioBusqueda = {
      "ciclo del agua": "water cycle diagram",
      "plato del bien comer": "plato del bien comer",
      "partes de una planta": "plant anatomy diagram",
      "sistema solar": "solar system planets diagram",
      "aparato digestivo": "digestive system diagram",
      "aparato respiratorio": "respiratory system diagram",
      "célula": "cell structure diagram",
      "volcán": "volcano cross section diagram"
    };

    let queryFinal = texto;
    const textoLower = texto.toLowerCase();
    for (const [clave, traduccion] of Object.entries(diccionarioBusqueda)) {
      if (textoLower.includes(clave)) {
        queryFinal = traduccion;
        break;
      }
    }

    // Si pide blanco y negro, añadimos términos de dibujo lineal / esquema
    if (estilo === "bn") {
      queryFinal += " line drawing outline diagram";
    } else {
      queryFinal += " illustration diagram";
    }

    // Consulta real a la API de búsqueda de imágenes de Wikimedia Commons
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      `filetype:bitmap|drawing ${queryFinal}`
    )}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`;

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "EduNEM-App/1.0 (Educational Platform)"
      }
    });

    const data = await response.json();
    const pages = data?.query?.pages || {};

    // Extraemos las URLs de miniaturas renderizadas en PNG/JPG (evita errores de rutas SVG directas)
    const imagenes = Object.values(pages)
      .map((page) => {
        const info = page.imageinfo?.[0];
        return info?.thumburl || info?.url;
      })
      .filter(Boolean);

    if (imagenes.length === 0) {
      return res.status(200).json({
        images: [],
        imageUrl: ""
      });
    }

    return res.status(200).json({
      images: imagenes,
      imageUrl: imagenes[0]
    });
  } catch (error) {
    console.error("Error buscando ilustraciones:", error);
    return res.status(500).json({
      error: "Error al conectar con el buscador educativo"
    });
  }
}
