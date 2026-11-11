export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // NVIDIA NIM Chat Completions genera texto; no es un servicio de generación
  // de imágenes. Se devuelve un error explícito en lugar de una imagen falsa.
  return res.status(501).json({
    error: "La generación de ilustraciones requiere un proveedor de imágenes. NVIDIA_API_KEY para chat no habilita por sí sola la creación de imágenes. Las planeaciones y proyectos sí usan NVIDIA.",
  });
}
