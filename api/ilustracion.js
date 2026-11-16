
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

    const normalizar = (valor) =>
      String(valor || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const traducciones = {
      "ciclo del agua": "water cycle",
      "plato del bien comer": "healthy eating plate food groups",
      "partes de una planta": "parts of a plant",
      "sistema solar": "solar system planets",
      "aparato digestivo": "human digestive system",
      "aparato respiratorio": "human respiratory system",
      "celula": "cell structure",
      "volcan": "volcano diagram",
      "mapa de mexico": "Mexico map"
    };

    const textoNormalizado = normalizar(texto);
    let temaIngles = texto;

    for (const [clave, valor] of Object.entries(traducciones)) {
      if (textoNormalizado.includes(normalizar(clave))) {
        temaIngles = valor;
        break;
      }
    }

    const consultas = bn
      ? [
          `${texto} dibujo para colorear primaria`,
          `${temaIngles} coloring page kids`,
          `${temaIngles} black white outline children`
        ]
      : [
          `${texto} lámina didáctica primaria niños`,
          `${temaIngles} educational illustration kids`,
          `${temaIngles} elementary school diagram`
        ];

    const respuestas = await Promise.allSettled(
      consultas.flatMap((consulta) => [
        buscarWikimedia(consulta),
        buscarOpenverse(consulta)
      ])
    );

    let resultados = [];

    for (const respuesta of respuestas) {
      if (respuesta.status === "fulfilled") {
        resultados.push(...respuesta.value);
      }
    }

    const palabrasTema = normalizar(`${texto} ${temaIngles}`)
      .split(/[^a-z0-9]+/)
      .filter((palabra) => palabra.length >= 4);

    const palabrasExcluir = [
      "book cover",
      "magazine cover",
      "portada",
      "revista",
      "newspaper",
      "periodico",
      "manuscript",
      "document scan",
      "libro escaneado",
      "adult content"
    ];

    resultados = resultados
      .map((imagen) => {
        const contenido = normalizar(
          `${imagen.title} ${imagen.description}`
        );

        if (
          palabrasExcluir.some((palabra) =>
            contenido.includes(normalizar(palabra))
          )
        ) {
          return null;
        }

        let puntuacion = 0;

        // Priorizar imágenes relacionadas directamente con el tema.
        for (const palabra of palabrasTema) {
          if (contenido.includes(palabra)) {
            puntuacion += 3;
          }
        }

        // Priorizar material infantil y escolar.
        const terminosInfantiles = [
          "kids",
          "children",
          "child",
          "school",
          "elementary",
          "primary",
          "educational",
          "education",
          "infantil",
          "primaria",
          "escolar",
          "didactica",
          "educativa",
          "niños",
          "dibujo",
          "illustration",
          "diagram"
        ];

        for (const termino of terminosInfantiles) {
          if (contenido.includes(normalizar(termino))) {
            puntuacion += 2;
          }
        }

        if (bn) {
          if (
            contenido.includes("coloring") ||
            contenido.includes("colorear") ||
            contenido.includes("outline")
          ) {
            puntuacion += 5;
          }
        }

        return { ...imagen, puntuacion };
      })
      .filter((imagen) => imagen && imagen.puntuacion > 0)
      .sort((a, b) => b.puntuacion - a.puntuacion);

    // Eliminar imágenes repetidas.
    const urlsVistas = new Set();

    const imagenes = resultados
      .filter((imagen) => {
        if (!imagen.url || urlsVistas.has(imagen.url)) {
          return false;
        }

        urlsVistas.add(imagen.url);
        return true;
      })
      .slice(0, 24);

    return res.status(200).json({
      images: imagenes.map((imagen) => imagen.url),
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

async function buscarWikimedia(consulta) {
  const parametros = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: consulta,
    gsrnamespace: "6",
    gsrlimit: "20",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "800",
    format: "json"
  });

  const respuesta = await fetch(
    `https://commons.wikimedia.org/w/api.php?${parametros}`,
    {
      headers: {
        "User-Agent": "EduNEM/1.0 (aplicacion educativa)"
      }
    }
  );

  if (!respuesta.ok) {
    throw new Error("Wikimedia no disponible");
  }

  const datos = await respuesta.json();
  const paginas = Object.values(datos.query?.pages || {});

  return paginas.map((pagina) => {
    const info = pagina.imageinfo?.[0];

    return {
      url: info?.thumburl || info?.url,
      title: pagina.title.replace(/^File:/, ""),
      description: info?.extmetadata?.ImageDescription?.value || "",
      source: "Wikimedia Commons"
    };
  }).filter((imagen) => imagen.url);
}

async function buscarOpenverse(consulta) {
  const parametros = new URLSearchParams({
    q: consulta,
    category: "illustration",
    page_size: "20",
    mature: "false"
  });

  const respuesta = await fetch(
    `https://api.openverse.org/v1/images/?${parametros}`
  );

  if (!respuesta.ok) {
    throw new Error("Openverse no disponible");
  }

  const datos = await respuesta.json();

  return (datos.results || []).map((item) => ({
    url: item.thumbnail || item.url,
    title: item.title || "",
    description: item.description || "",
    source: "Openverse"
  })).filter((imagen) => imagen.url);
}

