
import { generarJSON, responderError } from "./_nvidia.js";

const CAMPOS_FORMATIVOS = [
  "Lenguajes",
  "Saberes y Pensamiento Científico",
  "Ética, Naturaleza y Sociedades",
  "De lo Humano y lo Comunitario",
];

const TIPOS_REACTIVO = [
  "opcion_multiple",
  "verdadero_falso",
  "relacionar_columnas",
  "respuesta_abierta",
];

const DIFICULTADES = [
  "basica",
  "intermedia",
  "avanzada",
  "mixta",
];

function textoValido(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

function normalizarPregunta(pregunta, indice) {
  const tipos = TIPOS_REACTIVO;

  if (!pregunta || !textoValido(pregunta.enunciado)) {
    throw new Error(`La pregunta ${indice + 1} no tiene un enunciado válido.`);
  }

  if (!tipos.includes(pregunta.tipo)) {
    throw new Error(`La pregunta ${indice + 1} tiene un tipo de reactivo inválido.`);
  }

  const valor = Number(pregunta.valor);

  return {
    numero: indice + 1,
    tipo: pregunta.tipo,
    enunciado: pregunta.enunciado.trim(),
    opciones: Array.isArray(pregunta.opciones)
      ? pregunta.opciones.filter(textoValido)
      : [],
    respuestaCorrecta: textoValido(pregunta.respuestaCorrecta)
      ? pregunta.respuestaCorrecta.trim()
      : "",
    respuestaEsperada: textoValido(pregunta.respuestaEsperada)
      ? pregunta.respuestaEsperada.trim()
      : "",
    columnaA: Array.isArray(pregunta.columnaA)
      ? pregunta.columnaA.filter(textoValido)
      : [],
    columnaB: Array.isArray(pregunta.columnaB)
      ? pregunta.columnaB.filter(textoValido)
      : [],
    relacionCorrecta: Array.isArray(pregunta.relacionCorrecta)
      ? pregunta.relacionCorrecta.filter(textoValido)
      : [],
    valor: Number.isFinite(valor) && valor > 0 ? valor : 1,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido. Utiliza POST.",
    });
  }

  try {
    const {
      grado,
      campoFormativo,
      contenido,
      pda,
      cantidadPreguntas,
      tiposReactivos,
      dificultad,
    } = req.body || {};

    // Validar grado escolar
    const gradoTexto = String(grado || "").trim();

    if (!/^[1-6](?:°)?(?:\s*Primaria)?$/i.test(gradoTexto)) {
      return res.status(400).json({
        error: "Selecciona un grado de primaria válido, del 1.º al 6.º.",
      });
    }

    // Validar campo formativo
    if (!CAMPOS_FORMATIVOS.includes(campoFormativo)) {
      return res.status(400).json({
        error: "El campo formativo seleccionado no es válido.",
      });
    }

    // Validar contenido y PDA
    if (!textoValido(contenido) || !textoValido(pda)) {
      return res.status(400).json({
        error: "Debes seleccionar un contenido curricular y un PDA.",
      });
    }

    // Validar cantidad de preguntas
    const cantidad = Number(cantidadPreguntas);

    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 30) {
      return res.status(400).json({
        error: "La cantidad de preguntas debe estar entre 1 y 30.",
      });
    }

    // Validar tipos de reactivos
    if (
      !Array.isArray(tiposReactivos) ||
      tiposReactivos.length === 0 ||
      tiposReactivos.some((tipo) => !TIPOS_REACTIVO.includes(tipo))
    ) {
      return res.status(400).json({
        error: "Selecciona al menos un tipo de reactivo válido.",
      });
    }

    // Validar dificultad
    if (!DIFICULTADES.includes(dificultad)) {
      return res.status(400).json({
        error: "El nivel de dificultad seleccionado no es válido.",
      });
    }

    const tiposTexto = tiposReactivos.map((tipo) => {
      const nombres = {
        opcion_multiple: "Opción múltiple",
        verdadero_falso: "Verdadero o falso",
        relacionar_columnas: "Relacionar columnas",
        respuesta_abierta: "Respuesta abierta",
      };

      return nombres[tipo];
    }).join(", ");

    const configuracion = {
      grado: gradoTexto,
      campoFormativo,
      contenido: contenido.trim(),
      pda: pda.trim(),
      cantidadPreguntas: cantidad,
      tiposReactivos,
      dificultad,
    };

    const prompt = `
Genera un examen escolar para educación primaria en México.

CONFIGURACIÓN DEL EXAMEN:

Grado: ${configuracion.grado}
Campo formativo: ${configuracion.campoFormativo}
Contenido curricular: ${configuracion.contenido}
Proceso de Desarrollo de Aprendizaje (PDA): ${configuracion.pda}
Cantidad exacta de preguntas: ${configuracion.cantidadPreguntas}
Tipos de reactivos permitidos: ${tiposTexto}
Dificultad: ${configuracion.dificultad}

INSTRUCCIONES PEDAGÓGICAS:

1. El examen debe ser apropiado exclusivamente para alumnos del grado indicado.
2. Utiliza un lenguaje claro, sencillo y adecuado a la edad de los niños.
3. Evalúa el contenido curricular y el PDA proporcionados. No cambies su sentido ni introduzcas otros contenidos.
4. No inventes contenidos curriculares ni PDA.
5. Genera exactamente ${configuracion.cantidadPreguntas} preguntas.
6. Utiliza únicamente los tipos de reactivos seleccionados.
7. Distribuye los tipos de reactivos de manera equilibrada cuando se haya seleccionado más de uno.
8. Las preguntas deben ser claras, comprensibles y no ambiguas.
9. Evita preguntas repetidas.
10. Utiliza situaciones cotidianas y ejemplos cercanos al contexto de niños de primaria.
11. Las preguntas deben evaluar comprensión y aprendizaje, no solamente memorización.
12. Asigna un valor en puntos a cada pregunta.
13. La suma de los valores de las preguntas debe coincidir con puntajeTotal.
14. La clave de respuestas debe corresponder exactamente a las preguntas generadas.
15. Los criterios de evaluación deben ser útiles para el docente.

REGLAS SEGÚN EL TIPO DE REACTIVO:

- opcion_multiple:
  Incluye 3 o 4 opciones. Solo una debe ser correcta. Indica la respuesta correcta en respuestaCorrecta.

- verdadero_falso:
  Elabora una afirmación clara. En respuestaCorrecta escribe exactamente "Verdadero" o "Falso".

- relacionar_columnas:
  Incluye columnaA y columnaB con elementos que puedan relacionarse. En relacionCorrecta escribe las correspondencias correctas.

- respuesta_abierta:
  Formula una pregunta que permita al alumno expresar sus ideas. Incluye una respuestaEsperada como orientación para el docente.

FORMATO DE RESPUESTA:

Devuelve exclusivamente un objeto JSON válido, sin explicaciones, sin texto antes o después y sin bloques Markdown.

Utiliza exactamente esta estructura:

{
  "titulo": "Examen de evaluación",
  "instrucciones": "Lee cuidadosamente cada pregunta y responde según se te indique.",
  "preguntas": [
    {
      "numero": 1,
      "tipo": "opcion_multiple",
      "enunciado": "Pregunta para el alumno",
      "opciones": ["Opción A", "Opción B", "Opción C"],
      "respuestaCorrecta": "Opción B",
      "valor": 1
    }
  ],
  "puntajeTotal": 10,
  "criteriosEvaluacion": [
    {
      "criterio": "Comprensión del contenido",
      "descripcion": "Identifica y comprende los aprendizajes evaluados.",
      "puntaje": 5
    }
  ],
  "claveRespuestas": [
    "1. Opción B"
  ],
  "recomendacionesDocente": "Recomendaciones para revisar los resultados y reforzar los aprendizajes."
}

IMPORTANTE:
- El ejemplo de estructura es ilustrativo. Genera todas las preguntas solicitadas.
- Incluye solamente los campos necesarios para cada tipo de reactivo.
- No incluyas la respuesta correcta dentro del enunciado que verá el alumno.
- La clave de respuestas debe estar en su propio apartado.
- No omitas criterios de evaluación ni recomendaciones para el docente.
`;

    const instrucciones = `
Eres un especialista en evaluación educativa de la Nueva Escuela Mexicana (NEM), con experiencia en educación primaria.

Tu tarea es elaborar exámenes pedagógicamente adecuados y rigurosos.

Debes cumplir todas las instrucciones del usuario y devolver exclusivamente JSON válido.

No inventes datos curriculares. Respeta el grado, campo formativo, contenido y PDA proporcionados.

Verifica que todas las preguntas tengan respuesta o solución evaluable, que los tipos de reactivos sean correctos y que la clave coincida con las preguntas.

No incluyas comentarios, explicaciones ni Markdown fuera del objeto JSON.
`;

    const resultado = await generarJSON(prompt, instrucciones);

    if (
      !resultado ||
      !Array.isArray(resultado.preguntas) ||
      resultado.preguntas.length !== cantidad
    ) {
      throw new Error(
        "La IA no generó la cantidad exacta de preguntas solicitadas. Intenta nuevamente."
      );
    }

    const preguntas = resultado.preguntas.map(normalizarPregunta);

    // Comprobar que todos los tipos generados fueron seleccionados
    for (const pregunta of preguntas) {
      if (!tiposReactivos.includes(pregunta.tipo)) {
        throw new Error(
          "La IA generó un tipo de pregunta que no fue seleccionado. Intenta nuevamente."
        );
      }
    }

    // Validar clave de respuestas
    let claveRespuestas = Array.isArray(resultado.claveRespuestas)
      ? resultado.claveRespuestas.filter(textoValido)
      : [];

    if (claveRespuestas.length === 0) {
      claveRespuestas = preguntas.map((pregunta) => {
        if (pregunta.tipo === "respuesta_abierta") {
          return `${pregunta.numero}. ${pregunta.respuestaEsperada}`;
        }

        if (pregunta.tipo === "relacionar_columnas") {
          return `${pregunta.numero}. ${pregunta.relacionCorrecta.join("; ")}`;
        }

        return `${pregunta.numero}. ${pregunta.respuestaCorrecta}`;
      });
    }

    if (claveRespuestas.length !== cantidad) {
      throw new Error(
        "La clave de respuestas no coincide con la cantidad de preguntas."
      );
    }

    // Validar criterios de evaluación
    const criteriosEvaluacion = Array.isArray(resultado.criteriosEvaluacion)
      ? resultado.criteriosEvaluacion
          .filter((criterio) =>
            criterio &&
            textoValido(criterio.criterio) &&
            textoValido(criterio.descripcion)
          )
          .map((criterio) => ({
            criterio: criterio.criterio.trim(),
            descripcion: criterio.descripcion.trim(),
            puntaje: Number.isFinite(Number(criterio.puntaje))
              ? Number(criterio.puntaje)
              : 0,
          }))
      : [];

    if (criteriosEvaluacion.length === 0) {
      throw new Error(
        "La IA no generó criterios de evaluación válidos. Intenta nuevamente."
      );
    }

    const puntajeTotal = preguntas.reduce(
      (total, pregunta) => total + pregunta.valor,
      0
    );

    const examen = {
      titulo: textoValido(resultado.titulo)
        ? resultado.titulo.trim()
        : `Examen de ${configuracion.campoFormativo}`,
      grado: configuracion.grado,
      campoFormativo: configuracion.campoFormativo,
      contenido: configuracion.contenido,
      pda: configuracion.pda,
      instrucciones: textoValido(resultado.instrucciones)
        ? resultado.instrucciones.trim()
        : "Lee cuidadosamente cada pregunta y responde según se te indique.",
      preguntas,
      puntajeTotal,
      criteriosEvaluacion,
      claveRespuestas,
      recomendacionesDocente: textoValido(resultado.recomendacionesDocente)
        ? resultado.recomendacionesDocente.trim()
        : "Revisa las respuestas y refuerza los aprendizajes que presenten dificultades.",
    };

    return res.status(200).json(examen);

  } catch (error) {
    return responderError(res, error);
  }
}
