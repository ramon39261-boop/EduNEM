
import { CampoFormativo } from "../types";

/**
 * Catálogo de trabajo de Procesos de Desarrollo de Aprendizaje
 * para educación primaria, grados 1.º a 6.º.
 *
 * Los textos se organizaron a partir de los PDA proporcionados
 * por el usuario y se corrigieron en ortografía y redacción.
 *
 * Este catálogo no constituye una transcripción oficial certificada
 * de los documentos de la SEP.
 */

export const PDA_NEM: Record<
  string,
  Record<CampoFormativo, string[]>
> = {
  "1": {
    "Lenguajes": [
      "Conversa, escucha y expresa ideas, sentimientos y experiencias de manera oral.",
      "Escucha y comprende narraciones, cuentos, leyendas y otros textos leídos en voz alta.",
      "Identifica palabras y expresiones familiares en textos orales y escritos de su entorno.",
      "Reconoce algunas letras de su nombre y de palabras conocidas.",
      "Escribe su nombre e identifica el de otras personas.",
      "Relaciona sonidos con letras en palabras de su entorno.",
      "Produce textos orales y escritos breves para comunicar ideas, necesidades y emociones de manera sencilla.",
      "Identifica la función de algunos textos que usa en su vida cotidiana."
    ],

    "Saberes y Pensamiento Científico": [
      "Cuenta, ordena y compara colecciones de objetos con números naturales hasta el 20.",
      "Lee y escribe números hasta el 20.",
      "Resuelve problemas sencillos de suma y resta con apoyo de objetos.",
      "Identifica y nombra figuras geométricas básicas: círculo, cuadrado, triángulo y rectángulo.",
      "Describe características de objetos y materiales del entorno.",
      "Observa y explora fenómenos naturales de su entorno.",
      "Identifica y describe características de plantas, animales y otros seres vivos."
    ],

    "Ética, Naturaleza y Sociedades": [
      "Reconoce su nombre, su historia personal y la de su familia.",
      "Identifica y valora características de su comunidad y su localidad.",
      "Reconoce y practica valores como el respeto, la honestidad, la solidaridad y la cooperación.",
      "Participa en actividades que favorecen la convivencia en la escuela y en su comunidad.",
      "Identifica algunas costumbres y tradiciones de su familia y comunidad.",
      "Reconoce la importancia de las normas para una convivencia armónica.",
      "Participa en acciones para cuidar su entorno y los recursos naturales."
    ],

    "De lo Humano y lo Comunitario": [
      "Identifica y expresa sus emociones y las de las demás personas.",
      "Desarrolla hábitos de higiene personal, alimentación y descanso.",
      "Participa en juegos y actividades físicas individuales y grupales.",
      "Sigue reglas en los juegos y actividades para favorecer la convivencia.",
      "Reconoce sus capacidades y logros, y los de sus compañeros.",
      "Trabaja de manera colaborativa en actividades y proyectos.",
      "Practica el autocuidado para mantener su bienestar y seguridad."
    ]
  },

  "2": {
    "Lenguajes": [
      "Lee y comprende distintos tipos de textos breves.",
      "Identifica la idea principal y los detalles importantes.",
      "Escribe palabras, oraciones y pequeños textos con mayor autonomía.",
      "Usa signos de puntuación básicos: punto, coma, signos de interrogación y exclamación.",
      "Expresa ideas, sentimientos y opiniones de forma oral y escucha con respeto a los demás.",
      "Reconoce y usa mayúsculas al inicio de oraciones y en nombres propios.",
      "Amplía su vocabulario y mejora su escritura."
    ],

    "Saberes y Pensamiento Científico": [
      "Lee, escribe y compara números hasta la unidad de millar.",
      "Resuelve problemas de suma, resta y multiplicación con números naturales.",
      "Reconoce fracciones 1/2, 1/4 y 1/3 en figuras y colecciones.",
      "Identifica y describe figuras geométricas (círculo, cuadrado, rectángulo y triángulo) y cuerpos geométricos.",
      "Mide, compara y estima longitudes, capacidades, masas y el tiempo con diferentes instrumentos.",
      "Observa, pregunta y explica fenómenos naturales.",
      "Reconoce características de los seres vivos y la importancia de cuidar el ambiente."
    ],

    "Ética, Naturaleza y Sociedades": [
      "Reconoce su identidad personal y la de su comunidad.",
      "Identifica y valora costumbres, tradiciones y formas de vida de su localidad.",
      "Practica valores como el respeto, la honestidad, la solidaridad y la responsabilidad.",
      "Participa en acciones que promueven el bienestar común.",
      "Reconoce la importancia de las normas para una convivencia armónica.",
      "Identifica cambios y permanencias en el entorno familiar, escolar y comunitario.",
      "Reflexiona sobre el cuidado del medio ambiente y participa en su conservación."
    ],

    "De lo Humano y lo Comunitario": [
      "Identifica y expresa sus emociones de manera adecuada.",
      "Desarrolla hábitos de higiene, alimentación y autocuidado.",
      "Participa en juegos y actividades físicas que favorecen su salud.",
      "Trabaja de manera colaborativa y respeta las reglas.",
      "Reconoce sus fortalezas y áreas de oportunidad.",
      "Fortalece su autoestima y el respeto por la diversidad.",
      "Toma decisiones responsables para su bienestar y el de los demás."
    ]
  },

  "3": {
    "Lenguajes": [
      "Lee y comprende distintos tipos de textos para ampliar su conocimiento y disfrute.",
      "Identifica la idea principal, los detalles importantes y la secuencia de los textos.",
      "Escribe textos más extensos con coherencia, cohesión y ortografía convencional.",
      "Utiliza signos de puntuación para dar sentido a sus escritos.",
      "Expresa ideas, sentimientos y opiniones de forma oral, clara y organizada.",
      "Escucha, comprende y valora los puntos de vista de las demás personas.",
      "Investiga y comparte información en forma oral y escrita.",
      "Usa su imaginación y creatividad en la producción de textos."
    ],

    "Saberes y Pensamiento Científico": [
      "Lee, escribe, ordena y compara números naturales de hasta seis cifras.",
      "Resuelve problemas de suma, resta, multiplicación y división con números naturales.",
      "Reconoce y usa fracciones 1/2, 1/3, 1/4, 2/4 y 3/4 en situaciones cotidianas.",
      "Identifica y construye figuras y cuerpos geométricos, y reconoce sus características.",
      "Estima, mide y calcula longitudes, capacidades, masas, superficies y el tiempo con diferentes unidades e instrumentos.",
      "Observa, plantea preguntas y explica fenómenos naturales.",
      "Clasifica los seres vivos y reconoce la importancia de la biodiversidad.",
      "Describe transformaciones en la naturaleza y el impacto de las actividades humanas.",
      "Propone acciones para cuidar el ambiente."
    ],

    "Ética, Naturaleza y Sociedades": [
      "Reconoce su identidad familiar y valora su historia.",
      "Identifica las características culturales de su comunidad y del mundo.",
      "Comprende la importancia de las normas y leyes para la convivencia.",
      "Practica valores como el respeto, la honestidad, la justicia, la solidaridad y la responsabilidad.",
      "Participa en la toma de decisiones que favorecen el bienestar común.",
      "Reconoce la diversidad natural, cultural y lingüística.",
      "Analiza situaciones de su comunidad y propone soluciones.",
      "Reflexiona sobre el uso responsable de los recursos naturales y el cuidado del ambiente."
    ],

    "De lo Humano y lo Comunitario": [
      "Identifica y expresa sus emociones y reconoce cómo influyen en su conducta.",
      "Desarrolla hábitos de higiene, alimentación, descanso y autocuidado para favorecer su salud.",
      "Participa en juegos y actividades físicas que fortalecen su cuerpo y su bienestar.",
      "Trabaja de manera colaborativa, reconoce sus fortalezas y respeta las de los demás.",
      "Reconoce y valora la diversidad, y promueve la inclusión y la igualdad.",
      "Fortalece su autoestima y confianza para enfrentar retos.",
      "Toma decisiones responsables para el cuidado de sí mismo y de los demás.",
      "Reconoce la importancia de la familia, la escuela y la comunidad en su desarrollo."
    ]
  },

  "4": {
    "Lenguajes": [
      "Lee, comprende y analiza distintos tipos de textos para ampliar su conocimiento y disfrutar la lectura.",
      "Identifica la idea principal, las ideas secundarias, causas, consecuencias y propósitos de los textos.",
      "Escribe textos más extensos y complejos con cohesión, coherencia y ortografía convencional.",
      "Utiliza recursos de puntuación, conectores y referencias para organizar sus escritos.",
      "Expresa ideas, sentimientos y opiniones de forma oral y escrita, de manera clara y respetuosa.",
      "Escucha, comprende y valora los puntos de vista de las demás personas.",
      "Investiga, selecciona y comparte información de diversas fuentes en forma oral y escrita.",
      "Usa su creatividad para producir textos con distintos propósitos y destinatarios."
    ],

    "Saberes y Pensamiento Científico": [
      "Lee, escribe, ordena y compara números naturales hasta millones.",
      "Resuelve problemas de suma, resta, multiplicación y división con números naturales.",
      "Reconoce y usa fracciones (1/2, 1/3, 1/4, 2/3, 3/4, 1/5, 2/5 y 3/5), decimales y porcentajes en situaciones cotidianas.",
      "Identifica y construye figuras y cuerpos geométricos, y calcula perímetros y áreas.",
      "Estima, mide y calcula longitudes, masas, capacidades, superficies y volúmenes, y el tiempo con diferentes unidades e instrumentos.",
      "Interpreta y representa datos en tablas, pictogramas, gráficas de barras y circulares.",
      "Observa, experimenta, plantea preguntas y explica fenómenos naturales.",
      "Comprende las características de los seres vivos, la materia, la energía y los cambios en la naturaleza.",
      "Propone acciones para cuidar el ambiente y promover la salud."
    ],

    "Ética, Naturaleza y Sociedades": [
      "Reconoce su identidad personal y colectiva, y valora la diversidad de su comunidad, México y el mundo.",
      "Analiza las características culturales, geográficas, económicas y sociales de su localidad, entidad, país y el mundo.",
      "Comprende la importancia de las normas, las leyes y los derechos para una convivencia justa y pacífica.",
      "Practica valores como el respeto, la honestidad, la justicia, la solidaridad y la responsabilidad.",
      "Participa en la toma de decisiones y en acciones que favorecen el bien común.",
      "Reconoce y valora la diversidad natural y cultural, y promueve su preservación.",
      "Analiza problemas sociales, ambientales y culturales, y propone alternativas de solución.",
      "Reflexiona sobre el uso responsable de los recursos naturales y el impacto de las actividades humanas."
    ],

    "De lo Humano y lo Comunitario": [
      "Identifica y expresa sus emociones, y reconoce cómo influyen en su conducta y en la de los demás.",
      "Desarrolla hábitos de higiene, alimentación, descanso y autocuidado para favorecer su salud.",
      "Participa en juegos, actividades físicas y expresivas que fortalecen su cuerpo, habilidades y bienestar.",
      "Trabaja de manera colaborativa, valora las fortalezas propias y de los demás, y respeta las diferencias.",
      "Reconoce y promueve la inclusión, la igualdad y la no discriminación.",
      "Fortalece su autoestima, confianza y seguridad para enfrentar retos.",
      "Toma decisiones responsables para su bienestar y el de los demás.",
      "Reconoce la importancia de la familia, la escuela y la comunidad en su desarrollo integral."
    ]
  },

  "5": {
    "Lenguajes": [
      "Lee, comprende y analiza textos de mayor complejidad de diversos géneros.",
      "Identifica la idea principal, las ideas secundarias, las causas, consecuencias y los propósitos de los textos.",
      "Escribe textos más extensos con coherencia, cohesión y ortografía convencional.",
      "Utiliza recursos de puntuación, conectores y referencias para organizar y dar claridad a sus escritos.",
      "Expresa ideas, sentimientos y opiniones de forma oral y escrita, argumentando y fundamentando sus puntos de vista.",
      "Escucha, comprende y valora los puntos de vista de las demás personas, con respeto y empatía.",
      "Investiga, selecciona y comparte información de diversas fuentes confiables.",
      "Usa su creatividad y conocimientos del lenguaje para producir textos con distintos propósitos y destinatarios."
    ],

    "Saberes y Pensamiento Científico": [
      "Lee, escribe, ordena y compara números naturales hasta millones y números decimales.",
      "Resuelve problemas de suma, resta, multiplicación y división con números naturales y decimales, y usa las operaciones en situaciones cotidianas.",
      "Usa fracciones propias, mixtas y equivalentes; las representa en la recta numérica y en situaciones de la vida diaria.",
      "Identifica y construye figuras y cuerpos geométricos, y calcula perímetros, áreas y volúmenes.",
      "Estima, mide y calcula longitudes, masas, capacidades, superficies y el tiempo con diferentes unidades.",
      "Interpreta y representa datos en tablas, gráficas de barras, circulares y pictogramas.",
      "Explica fenómenos naturales a partir de la observación, experimentación e indagación.",
      "Comprende las características de los seres vivos, la materia, la energía, los cambios en la naturaleza y el impacto de las actividades humanas.",
      "Propone acciones para cuidar el ambiente y promover la salud."
    ],

    "Ética, Naturaleza y Sociedades": [
      "Reconoce su identidad personal y colectiva, y valora la diversidad cultural de su comunidad, México y el mundo.",
      "Comprende las características culturales, geográficas, económicas, políticas y sociales de su localidad, entidad, país y del mundo.",
      "Analiza el origen y la función de las normas, las leyes y los derechos humanos para una convivencia justa y pacífica.",
      "Practica valores como el respeto, la honestidad, la justicia, la solidaridad, la responsabilidad y la empatía.",
      "Participa en la toma de decisiones y en acciones que favorecen el bienestar común.",
      "Reconoce y valora la diversidad natural, social, cultural y lingüística, y promueve su preservación.",
      "Analiza problemas sociales, ambientales y culturales, identifica causas y consecuencias, y propone alternativas de solución.",
      "Reflexiona sobre el uso responsable de los recursos naturales y el impacto de las actividades humanas en la naturaleza y la sociedad."
    ],

    "De lo Humano y lo Comunitario": [
      "Identifica y expresa sus emociones y reconoce cómo influyen en su conducta y en la de los demás.",
      "Desarrolla hábitos de higiene, alimentación, descanso y autocuidado para favorecer su salud física y mental.",
      "Participa en juegos, actividades físicas y expresivas que fortalecen sus habilidades y bienestar.",
      "Trabaja de manera colaborativa, valora las fortalezas propias y de los demás, y respeta las diferencias.",
      "Reconoce y promueve la inclusión, la igualdad y la no discriminación en su escuela y comunidad.",
      "Fortalece su autoestima, confianza y seguridad para enfrentar retos y alcanzar sus metas.",
      "Toma decisiones responsables para su bienestar y el de los demás.",
      "Reconoce la importancia de la familia, la escuela y la comunidad en su desarrollo integral y participa activamente en su mejora."
    ]
  },

  "6": {
    "Lenguajes": [
      "Lee, comprende y analiza textos de diversos géneros para ampliar su conocimiento, formar opinión y disfrutar la lectura.",
      "Identifica la idea principal, las ideas secundarias, argumentos, inferencias, propósito, postura del autor y relaciones entre textos.",
      "Explica relaciones de causa, efecto, comparación, semejanza, contraste y analogía en los textos.",
      "Escribe textos con coherencia, cohesión y ortografía convencional, adecuados al propósito, destinatario y tipo de texto.",
      "Usa recursos de puntuación, referentes y vocabulario variado para dar claridad y precisión a sus escritos.",
      "Expresa ideas, opiniones y posturas de manera oral y escrita, con fundamentos y respeto.",
      "Escucha, comprende y valora las ideas de otras personas; dialoga para construir acuerdos y solucionar conflictos.",
      "Investiga, selecciona, organiza y comparte información.",
      "Usa su creatividad y conocimientos del lenguaje para producir textos en distintos medios."
    ],

    "Saberes y Pensamiento Científico": [
      "Lee, escribe, ordena, compara y opera con números naturales, fracciones, decimales y enteros, hasta millones y miles de millones.",
      "Resuelve problemas de suma, resta, multiplicación, potenciación, radicación y jerarquía de operaciones en situaciones cotidianas.",
      "Usa y convierte unidades de medida de longitud, volumen, masa, capacidad y temperatura.",
      "Identifica, construye y analiza figuras y cuerpos geométricos, y calcula perímetros, áreas y volúmenes.",
      "Interpreta y representa información en tablas, gráficas de barras, circulares y pictogramas; calcula medidas de tendencia central.",
      "Explica fenómenos naturales con base en la experimentación y los conocimientos científicos.",
      "Comprende la estructura y funcionamiento de los seres vivos, los ecosistemas, la materia, la energía y sus transformaciones.",
      "Analiza el impacto de las actividades humanas en el ambiente y propone acciones para su cuidado y conservación.",
      "Promueve hábitos para cuidar la salud y prevenir riesgos en su entorno."
    ],

    "Ética, Naturaleza y Sociedades": [
      "Reconoce su identidad y valora la diversidad cultural, lingüística, étnica y de género.",
      "Analiza procesos históricos y su relevancia para entender el presente.",
      "Analiza las características geográficas, económicas, políticas y sociales de su entidad, país y el mundo.",
      "Reconoce la importancia de las normas, leyes y derechos para la vida en sociedad.",
      "Participa en acciones que promueven la justicia, la igualdad y la inclusión.",
      "Practica valores como el respeto, la honestidad, la justicia, la solidaridad, la responsabilidad y la empatía.",
      "Participa en la toma de decisiones para favorecer el bien común.",
      "Reconoce la diversidad cultural y natural y promueve su preservación.",
      "Analiza problemas sociales, ambientales y culturales, sus causas y consecuencias, y propone alternativas de solución.",
      "Reflexiona sobre el uso responsable de los recursos naturales y el impacto de las actividades humanas en la naturaleza."
    ],

    "De lo Humano y lo Comunitario": [
      "Identifica y expresa sus emociones, y reconoce cómo influyen en su conducta y la de los demás.",
      "Desarrolla hábitos de higiene, alimentación, descanso, autocuidado y actividad física para mejorar su salud física y mental.",
      "Participa en actividades físicas y expresivas que fortalecen su cuerpo, habilidades, creatividad y bienestar.",
      "Trabaja de manera colaborativa, valora sus fortalezas y las de los demás, y respeta la diversidad.",
      "Reconoce y promueve la inclusión, la igualdad y la no discriminación en su escuela y comunidad.",
      "Fortalece su autoestima, confianza y seguridad para enfrentar retos y alcanzar metas.",
      "Toma decisiones responsables para su bienestar, el de su familia, escuela, comunidad y ambiente.",
      "Reconoce la importancia de la familia, la escuela y la comunidad en su desarrollo integral."
    ]
  }
};

/**
 * Obtiene los PDA de un grado y campo formativo.
 * Devuelve un arreglo vacío cuando no existen datos.
 */
export function getPDA(
  grado: string,
  campo: CampoFormativo
): string[] {
  const gradoNormalizado = normalizarGrado(grado);

  return PDA_NEM[gradoNormalizado]?.[campo] ?? [];
}

/**
 * Obtiene los cuatro campos formativos disponibles para un grado.
 */
export function getCamposPDA(grado: string): CampoFormativo[] {
  const gradoNormalizado = normalizarGrado(grado);
  const datos = PDA_NEM[gradoNormalizado];

  if (!datos) return [];

  return Object.keys(datos) as CampoFormativo[];
}

/**
 * Obtiene los grados que tienen catálogo de PDA.
 */
export function getGradosPDA(): string[] {
  return Object.keys(PDA_NEM);
}

/**
 * Convierte formatos como "1°", "1.º", "Primero" o "1"
 * al identificador numérico del catálogo.
 */
function normalizarGrado(grado: string): string {
  const valor = String(grado || "").trim().toLowerCase();

  const equivalencias: Record<string, string> = {
    "1": "1",
    "1°": "1",
    "1º": "1",
    "1.º": "1",
    "primero": "1",
    "primer grado": "1",

    "2": "2",
    "2°": "2",
    "2º": "2",
    "2.º": "2",
    "segundo": "2",
    "segundo grado": "2",

    "3": "3",
    "3°": "3",
    "3º": "3",
    "3.º": "3",
    "tercero": "3",
    "tercer grado": "3",

    "4": "4",
    "4°": "4",
    "4º": "4",
    "4.º": "4",
    "cuarto": "4",
    "cuarto grado": "4",

    "5": "5",
    "5°": "5",
    "5º": "5",
    "5.º": "5",
    "quinto": "5",
    "quinto grado": "5",

    "6": "6",
    "6°": "6",
    "6º": "6",
    "6.º": "6",
    "sexto": "6",
    "sexto grado": "6"
  };

  return equivalencias[valor] ?? valor;
}
