import { generarJSON, responderError } from "./_nvidia.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { prompt } = req.body || {};
    if (typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "No se recibió la información del proyecto." });
    }

    const instrucciones = `Eres especialista en diseño de proyectos educativos de la Nueva Escuela Mexicana para educación primaria.
Devuelve exclusivamente JSON válido, sin Markdown ni texto adicional, con esta estructura:
{
  "nombre": "string",
  "problematica": "string",
  "metodologia": "string",
  "proposito": "string",
  "fases": [
    { "nombre": "string", "actividades": ["string"] }
  ],
  "productoFinal": "string"
}
Todos los campos deben estar completos. No escribas 'En desarrollo' ni dejes apartados vacíos.
Diseña fases coherentes con la metodología solicitada, con actividades específicas, realizables y ordenadas. Incluye participación de alumnos, docente y comunidad cuando corresponda. Ajusta el lenguaje al grado escolar.`;

    const result = await generarJSON(prompt, instrucciones);
    if (!result.nombre || !result.proposito || !result.productoFinal || !Array.isArray(result.fases) || !result.fases.length) {
      throw new Error("La IA devolvió un proyecto incompleto. Intenta generarlo nuevamente.");
    }
    result.fases = result.fases.map(f => ({
      nombre: String(f.nombre || "Fase"),
      actividades: Array.isArray(f.actividades) ? f.actividades.map(String) : [],
    }));
    return res.status(200).json(result);
  } catch (error) {
    return responderError(res, error);
  }
}
