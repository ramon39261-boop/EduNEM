import { generarJSON, responderError } from "./_nvidia.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { prompt } = req.body || {};
    if (typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "No se recibió la información de la planeación." });
    }

    const instrucciones = `Eres un especialista en planeación didáctica de educación primaria en México y en la Nueva Escuela Mexicana.
Devuelve exclusivamente un objeto JSON válido, sin Markdown ni texto adicional, con esta estructura exacta:
{
  "titulo": "string",
  "grado": "string",
  "libroTexto": "string",
  "campoFormativo": "string",
  "ejesArticuladores": ["string"],
  "pda": "string",
  "inicio": "string",
  "desarrollo": "string",
  "cierre": "string",
  "evaluacion": "string",
  "recursos": ["string"]
}
Completa todos los campos. No uses frases como 'En desarrollo', 'por definir' ni dejes campos vacíos.
PDA: redacta un proceso de desarrollo de aprendizaje pertinente al grado, campo y lección. No inventes citas textuales ni afirmes que una formulación es cita oficial si no puedes verificarla; presenta una formulación pedagógica alineada.
Inicio, desarrollo y cierre: actividades concretas que el docente y los alumnos puedan realizar, en orden, con tiempos sugeridos y materiales. Desarrollo debe ser la parte más amplia. Evaluación: criterios observables y evidencias de aprendizaje. Recursos: lista de materiales específicos.
Conserva la vinculación con el libro y la lección indicados por el usuario.`;

    const result = await generarJSON(prompt, instrucciones);
    const required = ["titulo", "pda", "inicio", "desarrollo", "cierre", "evaluacion"];
    for (const key of required) {
      if (typeof result[key] !== "string" || !result[key].trim()) {
        throw new Error(`La respuesta de la IA no incluyó el apartado ${key}. Genera nuevamente.`);
      }
    }
    result.recursos = Array.isArray(result.recursos) ? result.recursos : [];
    result.ejesArticuladores = Array.isArray(result.ejesArticuladores) ? result.ejesArticuladores : [];
    return res.status(200).json(result);
  } catch (error) {
    return responderError(res, error);
  }
}
