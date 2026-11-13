/**
 * Buscador inteligente de láminas y diagramas educativos para EduNEM.
 * Cero costos, sin límites de IA y con resultados instantáneos en el lienzo.
 */

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  const { descripcion, prompt: bodyPrompt } = req.body || {};
  const textoBase = String(descripcion || bodyPrompt || "").trim().toLowerCase();

  if (!textoBase) {
    return res.status(400).json({
      error: "Escribe un tema para buscar el recurso visual.",
    });
  }

  // 1. Repositorio curado instantáneo para los temas más solicitados en primaria (México / SEP)
  const repositorioCurado = {
    "ciclo del agua": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Water_cycle_en.svg/1024px-Water_cycle_en.svg.png",
    "plato del bien comer": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Plato_del_bien_comer.svg/1024px-Plato_del_bien_comer.svg.png",
    "partes de la planta": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Plant_anatomy_en.svg/1024px-Plant_anatomy_en.svg.png",
    "sistema solar": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solar_system_scale_jup.jpg/1024px-Solar_system_scale_jup.jpg",
    "bandera de mexico": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1024px-Flag_of_Mexico.svg.png",
    "fotosíntesis": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Plant_photosynthesis_en.svg/1024px-Plant_photosynthesis_en.svg.png"
  };

  let imageUrl = null;

  // Verificamos si el texto del profesor coincide con algún tema curado
  for (const [key, url] of Object.entries(repositorioCurado)) {
    if (textoBase.includes(key)) {
      imageUrl = url;
      break;
    }
  }

  // 2. Si es un tema personalizado, consultamos la API pública y gratuita de Wikimedia Commons
  if (!imageUrl) {
    try {
      const queryBusqueda = encodeURIComponent(textoBase + " educational diagram schema vector");
      const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${queryBusqueda}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;

      const response = await fetch(wikiUrl, {
        headers: {
          "User-Agent": "EduNEM-EducationalPlatform/1.0 (contacto@edunem.mx)"
        }
      });

      const data = await response.json();
      const pages = data?.query?.pages;

      if (pages) {
        const pageId = Object.keys(pages)[0];
        if (pages[pageId]?.imageinfo?.[0]?.url) {
          imageUrl = pages[pageId].imageinfo[0].url;
        }
      }
    } catch (error) {
      console.error("Error buscando en repositorio educativo:", error);
    }
  }

  // 3. Fallback predeterminado si no se encuentra imagen (un icono escolar neutro)
  if (!imageUrl) {
    imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Open_book_01.svg/1024px-Open_book_01.svg.png";
  }

  return res.status(200).json({
    imageUrl: imageUrl,
  });
}
