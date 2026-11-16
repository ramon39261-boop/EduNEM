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

    // Traducción rápida de temas frecuentes para maximizar resultados en Openverse
    const equivalencias = {
      "ciclo del agua": "water cycle diagram",
      "plato del bien comer": "healthy food plate nutrition",
      "partes de una planta": "plant parts anatomy diagram",
      "sistema solar": "solar system planets",
      "aparato digestivo": "digestive system diagram",
      "aparato respiratorio": "respiratory system diagram",
      "célula": "cell biology diagram",
      "volcán": "volcano diagram",
      "mapa de mexico": "mexico map"
    };

    let query = texto;
    const lower = texto.toLowerCase();
    for (const [clave, valor] of Object.entries(equivalencias)) {
      if (lower.includes(clave)) {
        query = valor;
        break;
      }
    }

    if (esBn) {
      query += " illustration outline";
    }

    // Búsqueda instantánea en Openverse (sin API Key, respuesta en <1 segundo)
    const openverseUrl = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(
      query
    )}&category=illustration,digitized_artwork&page_size=8`;

    const response = await fetch(openverseUrl, {
      headers: {
        "User-Agent": "EduNEM-App/1.0"
      }
    });

    const data = await response.json();
    const resultados = (data?.results || [])
      .map((item) => item.thumbnail || item.url)
      .filter(Boolean);

    // Enlaces externos preparados con el término exacto del docente
    const queryExterna = esBn
      ? `${texto} dibujo para colorear blanco y negro`
      : `${texto} lamina educativa primaria`;

    const enlaces = {
      google: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(queryExterna)}`,
      pinterest: `https://www.pinterest.com.mx/search/pins/?q=${encodeURIComponent(queryExterna)}`,
      educima: `https://www.educima.com/dibujos-para-colorear-busqueda.php?q=${encodeURIComponent(texto)}`
    };

    return res.status(200).json({
      images: resultados,
      enlaces
    });
  } catch (error) {
    console.error("Error en búsqueda visual:", error);
    return res.status(500).json({
      error: "No se pudo conectar con el catálogo visual"
    });
  }
}
