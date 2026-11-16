
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

    const bn = estilo === "bn";

    const traducciones = {
      "ciclo del agua": "water cycle diagram",
      "plato del bien comer": "healthy eating plate food groups",
      "partes de una planta": "plant parts anatomy diagram",
      "sistema solar": "solar system planets educational diagram",
      "aparato digestivo": "human digestive system anatomy diagram",
      "aparato respiratorio": "human respiratory system diagram",
      "celula": "cell structure biology diagram",
      "célula": "cell structure biology diagram",
      "volcan": "volcano cross section diagram",
      "volcán": "volcano cross section diagram",
      "mapa de mexico": "Mexico educational map",
      "mapa de méxico": "Mexico educational map"
    };

    const normalizar = (s) =>
      s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    let consulta = texto;
    const textoNormalizado = normalizar(texto);

    for (const [clave, valor] of Object.entries(traducciones)) {
      if (textoNormalizado.includes(normalizar(clave))) {
        consulta = valor;
        break;
      }
    }

    const terminos = bn
      ? [`${consulta} black and white drawing`, `${consulta} coloring page`, consulta]
      : [`${consulta} educational illustration`, `${consulta} school diagram`, consulta];

    const resultados = await Promise.allSettled(
      terminos.map(async (termino) => {
        const [wiki, openverse] = await Promise.allSettled([
          buscarWikimedia(termino),
          buscarOpenverse(termino)
        ]);

        return [
          ...(wiki.status === "fulfilled" ? wiki.value : []),
          ...(openverse.status === "fulfilled" ? openverse.value : [])
        ];
      })
    );

    const imagenes = [];
    const urls = new Set();

    for (const resultado of resultados) {
      if (resultado.status !== "fulfilled") continue;

      for (const imagen of resultado.value) {
        if (!imagen.url || urls.has(imagen.url)) continue;
        urls.add(imagen.url);
        imagenes.push(imagen);
      }
    }

    return res.status(200).json({
      images: imagenes.map((img) => img.url),
      results: imagenes,
      imageUrl: imagenes[0]?.url || "",
      total: imagenes.length
    });

  } catch (error) {
    console.error("Error en buscador visual:", error);

    return res.status(500).json({
      error: "No se pudo conectar con los catálogos de imágenes"
    });
  }
}

async function buscarWikimedia(termino) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: termino,
    gsrnamespace: "6",
    gsrlimit: "15",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "900",
    format: "json",
    origin: "*"
  });

  const response = await fetch(
    `https://commons.wikimedia.org/w/api.php?${params}`,
    {
      headers: { "User-Agent": "EduNEM/1.0 (educational application)" }
    }
  );

  if (!response.ok) throw new Error("Wikimedia no disponible");

  const data = await response.json();
  const pages = Object.values(data.query?.pages || {});

  return pages.map((page) => {
    const info = page.imageinfo?.[0];
    if (!info) return null;

    return {
      url: info.thumburl || info.url,
      original: info.url,
      title: page.title.replace(/^File:/, ""),
      source: "Wikimedia Commons",
      license: info.extmetadata?.LicenseShortName?.value || "Consultar licencia",
      attribution: info.extmetadata?.Artist?.value || ""
    };
  }).filter((item) => item?.url);
}

async function buscarOpenverse(termino) {
  const params = new URLSearchParams({
    q: termino,
    page_size: "15",
    mature: "false"
  });

  const response = await fetch(
    `https://api.openverse.org/v1/images/?${params}`
  );

  if (!response.ok) throw new Error("Openverse no disponible");

  const data = await response.json();

  return (data.results || []).map((item) => ({
    url: item.thumbnail || item.url,
    original: item.url,
    title: item.title || "Ilustración educativa",
    source: "Openverse",
    license: item.license || "Consultar licencia",
    attribution: item.attribution || ""
  })).filter((item) => item.url);
}

