
import { generarJSON, responderError } from './_nvidia.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método no permitido.'
    });
  }

  try {
    const {
      grado,
      tema,
      subtema,
      cantidadEjercicios,
      dificultad,
      instruccionesAdicionales
    } = req.body || {};

    if (!grado || !tema) {
      return res.status(400).json({
        error: 'Debes seleccionar el grado y el tema.'
      });
    }

    const cantidad = Math.min(
      20,
      Math.max(1, Number(cantidadEjercicios) || 10)
    );

    const prompt = `
Genera una ficha de matemáticas para educación primaria en México.

DATOS:
- Grado: ${grado}
- Tema: ${tema}
- Subtema: ${subtema || 'Libre elección dentro del tema'}
- Cantidad exacta de ejercicios: ${cantidad}
- Dificultad: ${dificultad || 'intermedia'}
- Indicaciones adicionales: ${instruccionesAdicionales || 'Ninguna'}

REQUISITOS PEDAGÓGICOS:
1. Adapta el vocabulario, los números y la dificultad al grado escolar.
2. Los ejercicios deben ser variados, claros y adecuados para niñas y niños.
3. Incluye problemas contextualizados en situaciones cotidianas.
4. Evita ejercicios ambiguos o con más de una respuesta posible, salvo que se indique.
5. Incluye espacio suficiente para que el alumno resuelva cada ejercicio.
6. Comprueba matemáticamente cada respuesta antes de entregarla.
7. En operaciones y problemas, incluye el procedimiento correcto.
8. No incluyas las respuestas en los enunciados destinados al alumno.
9. La ficha debe tener exactamente ${cantidad} ejercicios.
10. La clave de respuestas debe corresponder exactamente con la numeración de los ejercicios.

FORMATO DE RESPUESTA:
Devuelve exclusivamente un objeto JSON válido, sin Markdown ni explicaciones fuera del JSON.

Estructura obligatoria:
{
  "titulo": "Título atractivo de la ficha",
  "grado": "${grado}",
  "tema": "${tema}",
  "objetivo": "Objetivo de aprendizaje",
  "instrucciones": "Instrucciones para el alumno",
  "ejercicios": [
    {
      "numero": 1,
      "tipo": "operacion",
      "enunciado": "Enunciado del ejercicio",
      "opciones": [],
      "respuestaCorrecta": "Respuesta correcta",
      "procedimiento": "Procedimiento explicado paso a paso",
      "espacioRespuesta": 3
    }
  ],
  "recomendacionesDocente": "Sugerencias para trabajar y revisar la ficha"
}

TIPOS PERMITIDOS:
operacion, problema, completar, comparar, ordenar, geometria, fracciones, patrones.

IMPORTANTE:
- Usa exactamente ${cantidad} ejercicios.
- La propiedad opciones debe ser un arreglo. Si no aplica, devuelve [].
- Todas las propiedades deben estar presentes.
- No inventes resultados matemáticos.
- Verifica los cálculos y las unidades.
`;

    const instrucciones = `
Responde exclusivamente con JSON válido.
No utilices bloques Markdown.
No agregues comentarios antes ni después del JSON.
Verifica que ejercicios y respuestas coincidan.
`;

    const resultado = await generarJSON(prompt, instrucciones);

    if (!resultado || typeof resultado !== 'object') {
      throw new Error('La IA no devolvió una ficha válida.');
    }

    if (!Array.isArray(resultado.ejercicios)) {
      throw new Error('La ficha no contiene una lista válida de ejercicios.');
    }

    if (resultado.ejercicios.length !== cantidad) {
      throw new Error(
        `Se solicitaron ${cantidad} ejercicios, pero se recibieron ${resultado.ejercicios.length}. Intenta nuevamente.`
      );
    }

    const ejerciciosValidos = resultado.ejercicios.every(
      (ejercicio, indice) =>
        ejercicio &&
        typeof ejercicio.enunciado === 'string' &&
        typeof ejercicio.respuestaCorrecta === 'string' &&
        String(ejercicio.numero) === String(indice + 1)
    );

    if (!ejerciciosValidos) {
      throw new Error('Uno o más ejercicios tienen información incompleta o numeración incorrecta.');
    }

    return res.status(200).json({
      ...resultado,
      grado,
      tema,
      ejercicios: resultado.ejercicios
    });

  } catch (error) {
    console.error('Error al generar ficha matemática:', error);
    return responderError(res, error);
  }
}
