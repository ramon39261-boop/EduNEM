export interface ContenidoCurricular {
  grado: string;
  campo: string;
  contenidos: string[];
}

export const CONTENIDOS_NEM: Record<string, Record<string, string[]>> = {
  // FASE 3 - PRIMARIA (1º y 2º)
  "1º de Primaria": {
    "Lenguajes": [
      "Escritura colectiva e individual de nombres y palabras familiares",
      "Narración de actividades y eventos relevantes del entorno escolar y familiar",
      "Uso del dibujo y la escritura para recordar eventos y acuerdos",
      "Expresión de necesidades, emociones, gustos e ideas en lengua materna",
      "Lectura compartida en voz alta de cuentos y fábulas",
      "Producción de letreros, carteles y avisos para la comunidad escolar",
    ],
    "Saberes y Pensamiento Científico": [
      "El cuerpo humano: partes externas, hábitos de higiene y cuidado de la salud",
      "Características del entorno natural y sociocultural: seres vivos y naturaleza",
      "Estudio de los números del 1 al 100: conteo, comparación y orden",
      "Construcción de la noción de suma y resta como operaciones básicas",
      "Figuras geométricas en el entorno: círculos, cuadrados, rectángulos y triángulos",
      "Medición de longitud y masa usando unidades no convencionales",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Cuidado y respeto hacia los seres vivos y la naturaleza del entorno",
      "Historia personal y familiar: memoria y sentido de pertenencia",
      "Manifestaciones culturales, símbolos patrios y festividades locales",
      "Situaciones de riesgo en el hogar, la escuela y la comunidad: autocuidado",
      "Acuerdos y reglas de convivencia en el aula y la familia",
    ],
    "De lo Humano y lo Comunitario": [
      "Formas de ser, pensar, actuar y relacionarse con los demás",
      "Estilos de vida activos y saludables: actividad física y alimentación sana",
      "Sentido de pertenencia a la familia, aula y comunidad escolar",
      "Posibilidades expresivas y motrices en juegos individuales y colectivos",
      "Identificación y manejo inicial de emociones para la convivencia armónica",
    ],
  },

  "2º de Primaria": {
    "Lenguajes": [
      "Descripción de objetos, personas y seres vivos del entorno",
      "Registro y resumen de información consultada en fuentes orales y escritas",
      "Producción e interpretación de avisos, carteles e instructivos sencillos",
      "Lectura compartida y recreación de cuentos, rimas y coplas infantiles",
      "Elaboración de notas informativas sobre sucesos de la comunidad",
      "Uso de signos de puntuación (punto y coma) en textos breves",
    ],
    "Saberes y Pensamiento Científico": [
      "Estructura y funcionamiento del cuerpo: sentidos y locomoción",
      "Clasificación de animales y plantas según su hábitat y alimentación",
      "Estudio de los números hasta el 1000: lectura, escritura y regularidades",
      "Suma y resta como operaciones inversas y resolución de problemas cotidianos",
      "Medición de longitud, peso y capacidad con instrumentos cotidianos",
      "Cuerpos geométricos y sus características (caras, aristas, vértices)",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Impacto de las actividades humanas en la naturaleza y acciones de sustentabilidad",
      "Diversidad lingüística y cultural de México y la comunidad",
      "Convivencia pacífica, acuerdos democráticos y resolución de diferencias",
      "Prevención de accidentes, desastres naturales y medidas de protección civil",
      "Los derechos de niñas y niños en la vida diaria",
    ],
    "De lo Humano y lo Comunitario": [
      "Reconocimiento de capacidades, habilidades y destrezas motrices",
      "Acciones individuales y colectivas para una alimentación saludable y el plato del bien comer",
      "Apoyo mutuo, solidaridad y colaboración en la escuela y el hogar",
      "Manejo asertivo de emociones y empatía frente a las necesidades de otros",
      "Hábitos de higiene personal y cuidado colectivo del entorno escolar",
    ],
  },

  // FASE 4 - PRIMARIA (3º y 4º)
  "3º de Primaria": {
    "Lenguajes": [
      "Narración de sucesos del pasado y del presente con orden cronológico",
      "Comprensión y producción de textos instructivos (recetas, reglamentos y manuales)",
      "Búsqueda, selección y registro reflexivo de información en libros e internet",
      "Creación de propuestas artísticas y teatrales con lenguaje plástico y sonoro",
      "Elaboración de cartas personales y mensajes comunitarios",
      "Lectura y análisis de mitos y leyendas locales de México",
    ],
    "Saberes y Pensamiento Científico": [
      "Estructura y funciones del sistema locomotor, respiratorio y digestivo",
      "Interacciones entre plantas, animales y el entorno: cadenas alimentarias",
      "Propiedades de los materiales: masa, longitud y cambios de estado",
      "Multiplicación y división como operaciones reversibles en situaciones cotidianas",
      "Fracciones sencillas (medios, cuartos y octavos) en mediciones y repartos",
      "Figuras geométricas: ángulos, simetría y cálculo de perímetros",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Representaciones cartográficas de la localidad y la entidad federativa",
      "La vida cotidiana antes de la conquista y en el México colonial",
      "El derecho a la protección, la salud y la integridad de la infancia",
      "Cuidado, aprovechamiento sustentable y distribución justa del agua",
      "Valores democráticos: igualdad, justicia, diálogo y respeto a las leyes",
    ],
    "De lo Humano y lo Comunitario": [
      "Hábitos saludables: nutrición equilibrada, agua potable y ejercicio físico diario",
      "Sentido de comunidad y satisfacción colaborativa de necesidades básicas",
      "El juego limpio como estrategia de convivencia pacífica e inclusión escolar",
      "Toma de decisiones asertivas frente a situaciones de presión social",
      "Expresión y autorregulación de emociones ante conflictos",
    ],
  },

  "4º de Primaria": {
    "Lenguajes": [
      "Lectura y elaboración de textos informativos con subtemas e ilustraciones",
      "Comprensión y formulación de textos argumentativos sencillos y opiniones",
      "Elaboración de trípticos, folletos y carteles de difusión comunitaria",
      "Participación en debates, mesas redondas y asambleas escolares",
      "Poesía, caligramas y canciones populares tradicionales de México",
      "Uso de conectores lógicos y ortografía puntual (acentuación y signos)",
    ],
    "Saberes y Pensamiento Científico": [
      "Estructura y función del sistema circulatorio, excretor e inmunológico",
      "El ciclo hidrológico del agua y su papel en el equilibrio ecológico",
      "Estados de agregación de la materia y transformaciones térmicas",
      "Fracciones y números decimales en situaciones de medida y reparto",
      "Cálculo mental, algoritmos de multiplicación y división con dividendos de tres cifras",
      "Área y perímetro de cuadriláteros y triángulos mediante fórmulas sencillas",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Caracterización y localización del territorio nacional: relieve, climas y regiones naturales",
      "Pueblos originarios y comunidades afromexicanas: aportes a la identidad nacional",
      "La democracia como forma de vida y organización política",
      "Acciones para mitigar el cambio climático y proteger la biodiversidad local",
      "Cultura de paz y prevención de la violencia en el entorno escolar y comunitario",
    ],
    "De lo Humano y lo Comunitario": [
      "Efectos de los hábitos de consumo en la salud personal, familiar y planetaria",
      "Potencialidades cognitivas, motrices, creativas y afectivas en retos colectivos",
      "Interacción motriz, inclusión e igualdad de género en juegos y deportes",
      "Prevención de la discriminación, el racismo y el acoso escolar",
      "Diseño de un proyecto comunitario para el bienestar y la convivencia escolar",
    ],
  },

  // FASE 5 - PRIMARIA (5º y 6º)
  "5º de Primaria": {
    "Lenguajes": [
      "Comprensión y producción de textos explicativos y científicos escolares",
      "Análisis crítico de noticias en prensa, radio, televisión y medios digitales",
      "Producción de textos discontinuos (tablas, gráficas de barras, mapas conceptuales)",
      "Diálogo, deliberación y debate formal para la toma de acuerdos colectivos",
      "Elaboración de antologías literarias de cuentos, leyendas y poemas",
      "Uso de nexos subordinantes y redacción de borradores corregidos",
    ],
    "Saberes y Pensamiento Científico": [
      "Estructura y funciones del sistema reproductor humano y salud sexual integral",
      "Biodiversidad de México: megadiversidad, especies endémicas y extinción",
      "Propiedades de la materia: masa, volumen, densidad y mezclas (soluciones)",
      "Proporcionalidad directa y cálculo de porcentajes (10%, 25%, 50%) en problemas cotidianos",
      "Ecosistemas: factores bióticos y abióticos, cadenas y redes tróficas",
      "Plano cartesiano, coordenadas y polígonos regulares",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Factores que conforman la biodiversidad y el patrimonio biocultural",
      "Movimientos independentistas y transformación social del México del siglo XIX",
      "Derechos humanos, equidad de género y erradicación de estereotipos",
      "Sustentabilidad ambiental: huella ecológica y consumo responsable",
      "Constitución Política y garantías individuales de la ciudadanía mexicana",
    ],
    "De lo Humano y lo Comunitario": [
      "Construcción del proyecto de vida personal y colectivo: metas y aspiraciones",
      "Estilos de vida activos: prevención de sobrepeso, diabetes y sedentarismo",
      "Educación integral en sexualidad, afectividad y toma de decisiones libres",
      "Resolución pacífica, mediación y justicia restaurativa en conflictos comunitarios",
      "Liderazgo participativo y solidaridad en causas comunitarias",
    ],
  },

  "6º de Primaria": {
    "Lenguajes": [
      "Comprensión y producción de textos argumentativos, ensayos breves y artículos de opinión",
      "Elaboración de informes de investigación documental con citas bibliográficas",
      "Análisis de textos dramáticos y representación teatral con enfoque sociocrítico",
      "Rescate de lenguas originarias y valorización del multilingüismo en México",
      "Creación de podcasts, cápsulas informativas y boletines comunitarios",
      "Coherencia y cohesión textual en proyectos de comunicación comunitaria",
    ],
    "Saberes y Pensamiento Científico": [
      "Funciones vitales, adaptación y evolución de los seres vivos a través del tiempo",
      "Salud sexual y reproductiva responsable: métodos anticonceptivos e ITS",
      "Transformaciones temporales y permanentes de la materia (combustión, oxidación)",
      "Energía: fuentes renovables y no renovables, calor, luz y electricidad",
      "Nociones de probabilidad, tablas de frecuencia, media, mediana y moda",
      "Cálculo de volumen de prismas rectos y resolución de problemas algebraicos básicos",
    ],
    "Ética, Naturaleza y Sociedades": [
      "México contemporáneo: retos sociales, económicos, ambientales y democráticos",
      "Migración nacional e internacional: causas, consecuencias y derechos humanos",
      "Cultura de paz, no discriminación y rechazo a toda forma de violencia",
      "Conservación del patrimonio histórico, cultural y natural ante el cambio climático",
      "Organizaciones de la sociedad civil y mecanismos de participación ciudadana",
    ],
    "De lo Humano y lo Comunitario": [
      "Autoconocimiento, autoestima y construcción de la identidad en la pubertad",
      "Hábitos de vida saludable, prevención de adicciones y salud mental comunitaria",
      "Desarrollo del pensamiento estratégico en actividades físicas y colaborativas",
      "Gestión constructiva de las emociones y relaciones interpersonales sanas",
      "Diseño y ejecución de una iniciativa de Aprendizaje Servicio en la comunidad",
    ],
  },

  // FASE 2 - PREESCOLAR
  "1º de Preescolar": {
    "Lenguajes": [
      "Comunicación oral de necesidades, emociones, gustos e ideas con sus pares",
      "Narración de pequeñas anécdotas y cuentos ilustrados",
      "Expresión corporal y gestual mediante cantos y rondas infantiles",
      "Exploración de libros, imágenes y carteles del aula",
    ],
    "Saberes y Pensamiento Científico": [
      "Reconocimiento de partes del cuerpo y sentidos mediante el juego",
      "Exploración de la naturaleza: plantas, animales, tierra y agua",
      "Conteo oral de objetos en juegos cotidianos (1 al 10)",
      "Comparación de tamaños y formas básicas en objetos del entorno",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Cuidado de las plantas y animales del hogar y la escuela",
      "Reconocimiento de los miembros de su familia y personas de apoyo",
      "Costumbres familiares y celebraciones de la comunidad",
      "Normas de seguridad y autocuidado en el salón de clases",
    ],
    "De lo Humano y lo Comunitario": [
      "Hábitos básicos de higiene: lavado de manos y cuidado personal",
      "Exploración de movimientos: gatear, correr, saltar y mantener el equilibrio",
      "Convivencia y compartir materiales con sus compañeras y compañeros",
      "Expresión de sensaciones de alegría, tristeza o calma en el aula",
    ],
  },

  "2º de Preescolar": {
    "Lenguajes": [
      "Descripción de personas, animales y lugares familiares",
      "Interpretación y creación de historias a partir de ilustraciones",
      "Producción de grafismos y dibujos con intención comunicativa",
      "Juegos con el lenguaje: rimas, canciones y trabalenguas sencillos",
    ],
    "Saberes y Pensamiento Científico": [
      "Observación y registro de características de seres vivos y fenómenos naturales",
      "Los números en situaciones de conteo y reparto lúdico (1 al 20)",
      "Ubicación espacial: arriba, abajo, cerca, lejos, adentro y afuera",
      "Clasificación de objetos según su color, textura y forma geométrica",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Prácticas de cuidado del agua y la vegetación en la escuela",
      "Sentido de pertenencia a la comunidad escolar y respeto a las diferencias",
      "Tradiciones y relatos orales de su localidad",
      "Resolución pacífica de desacuerdos mediante la palabra",
    ],
    "De lo Humano y lo Comunitario": [
      "Coordinación motriz fina y gruesa en retos lúdicos y circuitos",
      "Alimentación sana y consumo de frutas y agua simple",
      "Reconocimiento de sus propias cualidades y respeto a las de los demás",
      "Colaboración en tareas del aula y cuidado del espacio común",
    ],
  },

  "3º de Preescolar": {
    "Lenguajes": [
      "Narración estructurada de historias con inicio, desarrollo y desenlace",
      "Producción de textos con recursos propios (dibujos, letras y símbolos)",
      "Intercambio oral de opiniones y acuerdos en asamblea escolar",
      "Apropiación de la cultura escrita a través de la lectura compartida de cuentos",
    ],
    "Saberes y Pensamiento Científico": [
      "Planteamiento de preguntas e hipótesis sobre la naturaleza y los seres vivos",
      "Resolución de problemas numéricos sencillos mediante conteo y estimación",
      "Medición de objetos usando unidades no convencionales (listones, pasos, palitos)",
      "Patrones, secuencias y construcción de figuras con bloques geométricos",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Acciones cotidianas para reducir la basura y cuidar el medio ambiente",
      "La historia de mi comunidad y personas que aportan al bienestar común",
      "Valores de igualdad, justicia y trato digno a todas las personas",
      "Medidas de prevención y zonas de seguridad ante emergencias",
    ],
    "De lo Humano y lo Comunitario": [
      "Destrezas motrices complejas en juegos colectivos y cooperativos",
      "Hábitos de vida saludable e higiene como forma de autocuidado",
      "Autorregulación emocional y comunicación asertiva con sus pares",
      "Participación solidaria y trabajo colaborativo para un propósito común",
    ],
  },

  // FASE 6 - SECUNDARIA
  "1º de Secundaria": {
    "Lenguajes": [
      "La diversidad lingüística y sus formas de expresión en México y el mundo",
      "Creación y representación de textos dramáticos sobre problemáticas comunitarias",
      "Análisis crítico de los mensajes transmitidos en redes sociales y medios masivos",
      "Elaboración de ensayos sobre temas de interés social y científico",
    ],
    "Saberes y Pensamiento Científico": [
      "Célula como unidad funcional de los seres vivos y biodiversidad",
      "Alimentación saludable, requerimientos calóricos y prevención de enfermedades",
      "Expresiones algebraicas y resolución de ecuaciones de primer grado",
      "Medidas de tendencia central y dispersión en estudios de población",
    ],
    "Ética, Naturaleza y Sociedades": [
      "El espacio geográfico como producto de las relaciones naturaleza-sociedad",
      "Los derechos humanos en México y el mundo como base de la dignidad",
      "Procesos de poblamiento y orígenes de las civilizaciones mesoamericanas",
      "Cultura de paz y prevención de la violencia en el entorno escolar",
    ],
    "De lo Humano y lo Comunitario": [
      "Formas de ser, pensar y relacionarse en la adolescencia",
      "Potencialidades motrices, condición física y estilos de vida activos",
      "Educación integral en sexualidad, género y prevención del embarazo adolescente",
      "Diseño de propuestas colaborativas para el bienestar de la comunidad",
    ],
  },

  "2º de Secundaria": {
    "Lenguajes": [
      "Manifestaciones culturales y artísticas como expresión de la identidad comunitaria",
      "Textos de divulgación científica: estructura, lenguaje y difusión",
      "Participación en mesas de diálogo y debates argumentativos sobre dilemas éticos",
      "La poesía y la literatura universal en el enriquecimiento de la cosmovisión",
    ],
    "Saberes y Pensamiento Científico": [
      "Leyes del movimiento y energía en la vida cotidiana y la tecnología (Física)",
      "Estructura de la materia, modelos atómicos y propiedades térmicas y eléctricas",
      "Sistemas de dos ecuaciones lineales con dos incógnitas y métodos de solución",
      "Teorema de Pitágoras y propiedades de triángulos y polígonos semejantes",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Conquista, colonización y mestizaje en la conformación del México novohispano",
      "Riesgos de desastre, vulnerabilidad territorial y cambio climático global",
      "Principios y valores de la democracia como forma de gobierno y vida",
      "Igualdad de género y erradicación de la violencia hacia las mujeres",
    ],
    "De lo Humano y lo Comunitario": [
      "Desarrollo de habilidades socioemocionales para el autoconocimiento y la resiliencia",
      "Estrategias motrices e inclusión en actividades deportivas y recreativas",
      "Prevención de adicciones (alcohol, tabaco, drogas) y factores de protección",
      "Construcción del proyecto de vida personal, vocacional y ciudadano",
    ],
  },

  "3º de Secundaria": {
    "Lenguajes": [
      "Análisis crítico de discursos persuasivos, publicidad y propaganda política",
      "Elaboración y publicación de textos argumentativos y monografías de investigación",
      "Proyectos comunitarios de fomento a la lectura y preservación de la tradición oral",
      "Experimentación con lenguajes artísticos contemporáneos (videoarte, fotografía, muralismo)",
    ],
    "Saberes y Pensamiento Científico": [
      "Propiedades y transformaciones de los materiales y reacciones químicas (Química)",
      "La tabla periódica: regularidades y clasificación de elementos químicos",
      "Ecuaciones cuadráticas y modelación matemática de fenómenos naturales",
      "Trigonometría básica, funciones y cálculo de probabilidades compuestas",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Las revoluciones modernas y los movimientos sociales de México en el siglo XX y XXI",
      "Globalización económica, geopolítica y sustentabilidad del planeta",
      "Participación ciudadana, transparencia y rendición de cuentas en el Estado de derecho",
      "Preservación de los derechos bioculturales de los pueblos indígenas",
    ],
    "De lo Humano y lo Comunitario": [
      "Consolidación del proyecto de vida y toma de decisiones profesionales y formativas",
      "Cultura física, salud integral y prevención del sedentarismo",
      "Relaciones afectivas saludables, respeto y autonomía en el noviazgo",
      "Liderazgo juvenil y ejecución de proyectos de Aprendizaje Servicio comunitarios",
    ],
  },

  // OTRAS MODALIDADES
  "Educación Inicial (Fase 1)": {
    "Lenguajes": [
      "Balbuceos, gestos y primeras palabras en el vínculo de apego seguro",
      "Lectura de nanas, arrullos, canciones y cuentos sonoros",
      "Exploración de texturas, sonidos y colores en el entorno",
    ],
    "Saberes y Pensamiento Científico": [
      "Exploración sensorial del entorno y del propio cuerpo",
      "Curiosidad y manipulación libre de objetos y juguetes seguros",
      "Permanencia de los objetos y nociones espaciales iniciales",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Vínculos afectivos seguros con cuidadores y educadores",
      "Contacto sensible con la naturaleza, plantas y animales",
      "Rutinas de convivencia cálidas y respetuosas",
    ],
    "De lo Humano y lo Comunitario": [
      "Desarrollo de la autonomía en el comer, caminar y jugar",
      "Expresión y acompañamiento amoroso de necesidades básicas y emociones",
      "Movimiento libre y desarrollo psicomotriz armónico",
    ],
  },

  "Multigrado / CAM": {
    "Lenguajes": [
      "Comunicación adaptada y sistemas aumentativos o alternativos de comunicación",
      "Lectura y escritura funcional situada en la vida cotidiana de la comunidad",
      "Narración de vivencias y tradiciones familiares multigrado",
      "Expresión artística libre a través de diversas técnicas sensoriales",
    ],
    "Saberes y Pensamiento Científico": [
      "Cuidado de la salud, hábitos de vida independiente y nutrición",
      "Matemáticas prácticas: uso del dinero, conteo, medidas y tiempo en la vida diaria",
      "El huerto escolar y el aprovechamiento de los recursos naturales locales",
      "Fenómenos naturales y experimentación adaptada a diferentes ritmos de aprendizaje",
    ],
    "Ética, Naturaleza y Sociedades": [
      "Inclusión plena, derechos humanos y respeto a la neurodiversidad",
      "Identidad comunitaria y saberes tradicionales locales",
      "Convivencia cooperativa y apoyo intergeneracional",
      "Prevención de riesgos en el hogar y la comunidad",
    ],
    "De lo Humano y lo Comunitario": [
      "Habilidades para la vida independiente y la inclusión laboral",
      "Autocuidado, higiene y bienestar socioemocional",
      "Participación en tareas comunitarias y eventos escolares",
      "Juego adaptado, recreación y psicomotricidad inclusiva",
    ],
  },
};

/**
 * Returns available NEM 2025-2026 contenidos for a given grade and optional campo formativo
 */
export function getContenidosNEM(grado: string, campo?: string): string[] {
  const gradoData = CONTENIDOS_NEM[grado];
  if (!gradoData) {
    // Fallback search across similar grades
    for (const key of Object.keys(CONTENIDOS_NEM)) {
      if (grado.includes(key) || key.includes(grado)) {
        if (campo && CONTENIDOS_NEM[key][campo]) {
          return CONTENIDOS_NEM[key][campo];
        }
        return Object.values(CONTENIDOS_NEM[key]).flat();
      }
    }
    return [
      "El cuidado de la salud y la alimentación",
      "La biodiversidad y el cuidado del entorno",
      "Lectura y escritura en situaciones cotidianas",
      "Resolución de problemas del entorno",
      "Convivencia pacífica y valores comunitarios",
    ];
  }

  if (campo && gradoData[campo]) {
    return gradoData[campo];
  }

  // Return all topics across all fields for this grade
  return Object.values(gradoData).flat();
}

export const PROBLEMATICAS_NEM_POR_FASE: Record<string, string[]> = {
  "preescolar": [
    "Dificultad para compartir y regular emociones en el aula y patio de recreo",
    "Consumo excesivo de alimentos ultraprocesados en el desayuno escolar",
    "Falta de hábitos de higiene: lavado de manos y cuidado de los dientes",
    "Poco cuidado de las áreas verdes y plantitas del jardín de niños",
    "Falta de conocimiento sobre los oficios y personas de nuestra comunidad",
  ],
  "primaria_baja": [ // 1º y 2º
    "Exceso de basura plástica y envolturas a la hora del recreo escolar",
    "Desperdicio de agua potable en los baños y bebederos de la escuela",
    "Falta de consumo de frutas y verduras en la lonchera diaria",
    "Conflictos en los juegos de patio y necesidad de reglas de convivencia",
    "Desconocimiento de la historia y tradiciones de los abuelos de la comunidad",
  ],
  "primaria_media": [ // 3º y 4º
    "Escasez y contaminación del agua potable en la colonia o localidad",
    "Consumo habitual de bebidas azucaradas y comida chatarra en la escuela",
    "Falta de separación de residuos orgánicos e inorgánicos en la comunidad",
    "Pérdida de áreas verdes y poca vegetación nativa en el entorno escolar",
    "Situaciones de exclusión o burlas entre compañeros en el aula",
    "Falta de prevención de riesgos y accidentes en la temporada de lluvias",
  ],
  "primaria_alta": [ // 5º y 6º
    "Manejo inadecuado de la basura y quema de desechos en la comunidad",
    "Desperdicio y crisis del agua en la localidad: necesidad de captación de lluvia",
    "Sedentarismo, sobrepeso y mala nutrición en la población infantil",
    "Acoso escolar (bullying) y necesidad de cultura de paz y mediación escolar",
    "Discriminación por origen étnico, género o condición socioeconómica",
    "Desconocimiento y pérdida de la riqueza biocultural de los pueblos originarios",
  ],
  "secundaria": [ // 1º, 2º y 3º
    "Contaminación ambiental, huella de carbono y acumulación de desechos tecnológicos",
    "Uso excesivo de pantallas, ciberacoso y desinformación en redes sociales",
    "Problemas de salud mental en adolescentes: ansiedad, estrés y baja autoestima",
    "Consumo de sustancias nocivas (vapeadores, alcohol) en el entorno juvenil",
    "Violencia en el noviazgo y estereotipos de género en la comunidad",
    "Falta de oportunidades y proyectos de emprendimiento comunitario sustentable",
  ],
  "multigrado": [
    "Falta de agua limpia y servicios básicos en la localidad rural",
    "Rescate y preservación de saberes agrícolas tradicionales y huertos familiares",
    "Cuidado comunitario de la salud integral y nutrición familiar",
    "Integración e inclusión de niñas y niños con discapacidad en la escuela",
  ]
};

export function getProblematicasNEM(grado: string): string[] {
  const g = grado.toLowerCase();
  if (g.includes("preescolar") || g.includes("maternal") || g.includes("inicial")) {
    return PROBLEMATICAS_NEM_POR_FASE["preescolar"];
  }
  if (g.includes("1º de primaria") || g.includes("2º de primaria")) {
    return PROBLEMATICAS_NEM_POR_FASE["primaria_baja"];
  }
  if (g.includes("3º de primaria") || g.includes("4º de primaria")) {
    return PROBLEMATICAS_NEM_POR_FASE["primaria_media"];
  }
  if (g.includes("5º de primaria") || g.includes("6º de primaria")) {
    return PROBLEMATICAS_NEM_POR_FASE["primaria_alta"];
  }
  if (g.includes("secundaria")) {
    return PROBLEMATICAS_NEM_POR_FASE["secundaria"];
  }
  if (g.includes("multigrado") || g.includes("cam") || g.includes("indígena")) {
    return PROBLEMATICAS_NEM_POR_FASE["multigrado"];
  }
  return PROBLEMATICAS_NEM_POR_FASE["primaria_media"];
}

export const LIBROS_TEXTO_NEM: Record<string, string[]> = {
  "inicial": [
    "Guía pedagógica para la atención integral a la primera infancia",
    "Lecturas y arrullos para la primera infancia",
    "Fichero de actividades lúdicas y motrices"
  ],
  "preescolar": [
    "Jardín de Niños: Libro para la educadora",
    "Láminas de diálogo y conversación",
    "Mi álbum de Preescolar",
    "Materiales didácticos y juegos interactivos"
  ],
  "1º de primaria": [
    "Proyectos de Aula",
    "Proyectos Escolares",
    "Proyectos Comunitarios",
    "Múltiples Lenguajes",
    "Múltiples Lenguajes: Trazos y palabras",
    "Múltiples Lenguajes: Trazos y números",
    "Nuestros Saberes: Libro para alumnos, maestros y familia"
  ],
  "2º de primaria": [
    "Proyectos de Aula",
    "Proyectos Escolares",
    "Proyectos Comunitarios",
    "Múltiples Lenguajes",
    "Múltiples Lenguajes: Trazos y palabras",
    "Múltiples Lenguajes: Trazos y números",
    "Nuestros Saberes: Libro para alumnos, maestros y familia"
  ],
  "3º de primaria": [
    "Proyectos de Aula",
    "Proyectos Escolares",
    "Proyectos Comunitarios",
    "Múltiples Lenguajes",
    "Nuestros Saberes: Libro para alumnos, maestros y familia"
  ],
  "4º de primaria": [
    "Proyectos de Aula",
    "Proyectos Escolares",
    "Proyectos Comunitarios",
    "Múltiples Lenguajes",
    "Nuestros Saberes: Libro para alumnos, maestros y familia",
    "Cartografía de México y el mundo",
    "Nuestros Saberes: México, grandeza y diversidad"
  ],
  "5º de primaria": [
    "Proyectos de Aula",
    "Proyectos Escolares",
    "Proyectos Comunitarios",
    "Múltiples Lenguajes",
    "Nuestros Saberes: Libro para alumnos, maestros y familia",
    "Cartografía de México y el mundo",
    "Nuestros Saberes: México, grandeza y diversidad"
  ],
  "6º de primaria": [
    "Proyectos de Aula",
    "Proyectos Escolares",
    "Proyectos Comunitarios",
    "Múltiples Lenguajes",
    "Nuestros Saberes: Libro para alumnos, maestros y familia",
    "Cartografía de México y el mundo",
    "Nuestros Saberes: México, grandeza y diversidad"
  ],
  "1º de secundaria": [
    "Lenguajes (Español, Artes, Inglés)",
    "Saberes y Pensamiento Científico: Matemáticas 1",
    "Saberes y Pensamiento Científico: Ciencias 1 (Biología)",
    "Ética, Naturaleza y Sociedades: Geografía",
    "Ética, Naturaleza y Sociedades: Historia 1",
    "Ética, Naturaleza y Sociedades: Formación Cívica y Ética 1",
    "De lo Humano y lo Comunitario (Tecnología, Ed. Física, Tutoría)",
    "Múltiples Lenguajes 1",
    "Nuestro Libro de Proyectos 1"
  ],
  "2º de secundaria": [
    "Lenguajes (Español, Artes, Inglés)",
    "Saberes y Pensamiento Científico: Matemáticas 2",
    "Saberes y Pensamiento Científico: Ciencias 2 (Física)",
    "Ética, Naturaleza y Sociedades: Historia 2",
    "Ética, Naturaleza y Sociedades: Formación Cívica y Ética 2",
    "De lo Humano y lo Comunitario (Tecnología, Ed. Física, Tutoría)",
    "Múltiples Lenguajes 2",
    "Nuestro Libro de Proyectos 2"
  ],
  "3º de secundaria": [
    "Lenguajes (Español, Artes, Inglés)",
    "Saberes y Pensamiento Científico: Matemáticas 3",
    "Saberes y Pensamiento Científico: Ciencias 3 (Química)",
    "Ética, Naturaleza y Sociedades: Historia 3",
    "Ética, Naturaleza y Sociedades: Formación Cívica y Ética 3",
    "De lo Humano y lo Comunitario (Tecnología, Ed. Física, Tutoría)",
    "Múltiples Lenguajes 3",
    "Nuestro Libro de Proyectos 3"
  ],
  "multigrado": [
    "Proyectos de Aula (Multigrado)",
    "Proyectos Escolares y Comunitarios",
    "Múltiples Lenguajes (Inclusivo y adaptado)",
    "Nuestros Saberes: Guía integral docente"
  ]
};

export function getLibrosTextoNEM(grado: string): string[] {
  const g = grado.toLowerCase();
  if (g.includes("preescolar")) {
    return LIBROS_TEXTO_NEM["preescolar"];
  }
  if (g.includes("inicial") || g.includes("maternal")) {
    return LIBROS_TEXTO_NEM["inicial"];
  }
  if (g.includes("1º de primaria")) {
    return LIBROS_TEXTO_NEM["1º de primaria"];
  }
  if (g.includes("2º de primaria")) {
    return LIBROS_TEXTO_NEM["2º de primaria"];
  }
  if (g.includes("3º de primaria")) {
    return LIBROS_TEXTO_NEM["3º de primaria"];
  }
  if (g.includes("4º de primaria")) {
    return LIBROS_TEXTO_NEM["4º de primaria"];
  }
  if (g.includes("5º de primaria")) {
    return LIBROS_TEXTO_NEM["5º de primaria"];
  }
  if (g.includes("6º de primaria")) {
    return LIBROS_TEXTO_NEM["6º de primaria"];
  }
  if (g.includes("1º de secundaria")) {
    return LIBROS_TEXTO_NEM["1º de secundaria"];
  }
  if (g.includes("2º de secundaria")) {
    return LIBROS_TEXTO_NEM["2º de secundaria"];
  }
  if (g.includes("3º de secundaria")) {
    return LIBROS_TEXTO_NEM["3º de secundaria"];
  }
  if (g.includes("multigrado") || g.includes("cam") || g.includes("indígena")) {
    return LIBROS_TEXTO_NEM["multigrado"];
  }
  return LIBROS_TEXTO_NEM["1º de primaria"];
}

export function getContenidosPorLibro(grado: string, libro: string): string[] {
  const l = libro.toLowerCase();
  if (l.includes("múltiples lenguajes") || l.includes("lenguajes")) {
    return getContenidosNEM(grado, "Lenguajes");
  }
  if (l.includes("matemáticas") || l.includes("ciencias") || l.includes("saberes y pensamiento")) {
    return getContenidosNEM(grado, "Saberes y Pensamiento Científico");
  }
  if (l.includes("geografía") || l.includes("historia") || l.includes("cívica") || l.includes("ética") || l.includes("cartografía")) {
    return getContenidosNEM(grado, "Ética, Naturaleza y Sociedades");
  }
  if (l.includes("humano") || l.includes("tecnología") || l.includes("tutoría") || l.includes("física")) {
    return getContenidosNEM(grado, "De lo Humano y lo Comunitario");
  }
  if (l.includes("proyectos comunitarios")) {
    const etica = getContenidosNEM(grado, "Ética, Naturaleza y Sociedades");
    const humano = getContenidosNEM(grado, "De lo Humano y lo Comunitario");
    return [...etica.slice(0, 3), ...humano.slice(0, 3)];
  }
  if (l.includes("proyectos escolares")) {
    const leng = getContenidosNEM(grado, "Lenguajes");
    const sab = getContenidosNEM(grado, "Saberes y Pensamiento Científico");
    return [...leng.slice(0, 3), ...sab.slice(0, 3)];
  }
  if (l.includes("proyectos de aula")) {
    const leng = getContenidosNEM(grado, "Lenguajes");
    const humano = getContenidosNEM(grado, "De lo Humano y lo Comunitario");
    return [...leng.slice(0, 3), ...humano.slice(0, 3)];
  }
  if (l.includes("nuestros saberes")) {
    const sab = getContenidosNEM(grado, "Saberes y Pensamiento Científico");
    const etica = getContenidosNEM(grado, "Ética, Naturaleza y Sociedades");
    return [...sab.slice(0, 3), ...etica.slice(0, 3)];
  }
  return getContenidosNEM(grado);
}

export function getCampoFromLibro(libro: string): string {
  const l = libro.toLowerCase();
  if (l.includes("trazos y números") || l.includes("números")) return "Saberes y Pensamiento Científico";
  if (l.includes("lenguajes")) return "Lenguajes";
  if (l.includes("matemáticas") || l.includes("ciencias") || l.includes("saberes y pensamiento")) return "Saberes y Pensamiento Científico";
  if (l.includes("geografía") || l.includes("historia") || l.includes("cívica") || l.includes("ética") || l.includes("cartografía")) return "Ética, Naturaleza y Sociedades";
  if (l.includes("humano") || l.includes("tecnología") || l.includes("tutoría") || l.includes("física")) return "De lo Humano y lo Comunitario";
  if (l.includes("proyectos comunitarios")) return "Ética, Naturaleza y Sociedades";
  if (l.includes("proyectos escolares")) return "De lo Humano y lo Comunitario";
  if (l.includes("nuestros saberes")) return "Saberes y Pensamiento Científico";
  return "Lenguajes";
}

/**
 * Catálogo exhaustivo de TODAS las lecciones, proyectos y lecturas de los Libros de Texto Gratuitos (SEP - NEM 2025-2026)
 */
export const LECCIONES_LIBROS_NEM: Record<string, Record<string, string[]>> = {
  // ==========================================
  // PRIMARIA 1º (FASE 3)
  // ==========================================
  "1º de primaria": {
    "Proyectos de Aula": [
      "Conozcamos las maravillas de la lectura (Pág. 12 - Lenguajes)",
      "Nombrario del grupo (Pág. 20 - Lenguajes)",
      "Baúl de soluciones (Pág. 28 - Lenguajes)",
      "Los saberes de mi comunidad (Pág. 38 - Lenguajes)",
      "¡Creemos textos en colectivo! (Pág. 48 - Lenguajes)",
      "Hagamos historietas con historias familiares o comunitarias (Pág. 58 - Lenguajes)",
      "Somos y sentimos lo que comemos (Pág. 70 - Lenguajes)",
      "Me autorreconozco (Pág. 80 - Lenguajes)",
      "Mi cuerpo y sus movimientos (Pág. 90 - Saberes y Pensamiento Científico)",
      "¡Cuidado con los azúcares! (Pág. 102 - Saberes y Pensamiento Científico)",
      "¿Qué tan resistente es un tubo de papel? (Pág. 112 - Saberes y Pensamiento Científico)",
      "Lámparas de luz solar (Pág. 122 - Saberes y Pensamiento Científico)",
      "Soy único y tú también (Pág. 130 - Ética, Naturaleza y Sociedades)",
      "Diálogo para la justicia (Pág. 136 - Ética, Naturaleza y Sociedades)",
      "Mi cuerpo dentro de una burbuja (Pág. 142 - Ética, Naturaleza y Sociedades)",
      "Me siento bien cuando me cuido (Pág. 150 - Ética, Naturaleza y Sociedades)",
      "La importancia del bosque (Pág. 158 - Ética, Naturaleza y Sociedades)",
      "México y la diversidad de símbolos culturales que lo representan (Pág. 166 - Ética, Naturaleza y Sociedades)",
      "El reglamento del aula y su importancia (Pág. 174 - Ética, Naturaleza y Sociedades)",
      "El árbol de cualidades, actitudes y valores (Pág. 182 - De lo Humano y lo Comunitario)",
      "Hablemos de empatía (Pág. 194 - De lo Humano y lo Comunitario)",
      "La salud, ¡mi gran derecho! (Pág. 210 - De lo Humano y lo Comunitario)",
      "El rincón de juegos (Pág. 220 - De lo Humano y lo Comunitario)",
      "¡Expresamos nuestras ideas para ejercer nuestros derechos! (Pág. 239 - Ética y Derechos Humanos)"
    ],
    "Proyectos Escolares": [
      "Memoria escrita de sentimientos y pensamientos (Pág. 12 - Lenguajes)",
      "Cada cosa en su lugar (Pág. 28 - Lenguajes)",
      "¡Disfrutemos de las bibliotecas! (Pág. 40 - Lenguajes)",
      "Lotería de nuestras fiestas (Pág. 52 - Lenguajes)",
      "¡Modelamos una vida de paz! (Pág. 62 - Lenguajes)",
      "Yo te cuido, tú me cuidas (Pág. 70 - Lenguajes)",
      "Frases y expresiones de cortesía (Pág. 82 - Lenguajes)",
      "Historias de mi comunidad escolar (Pág. 92 - Lenguajes)",
      "¿Qué puede decir la medida de mi cintura con mi estatura? (Pág. 104 - Saberes y Pensamiento Científico)",
      "¡Rico y saludable! (Pág. 118 - Saberes y Pensamiento Científico)",
      "Figuras geométricas en la naturaleza (Pág. 128 - Saberes y Pensamiento Científico)",
      "¿Cómo construir un puente? (Pág. 142 - Saberes y Pensamiento Científico)",
      "Los sonidos en la naturaleza (Pág. 152 - Saberes y Pensamiento Científico)",
      "Construyo resbaladillas y rampas seguras (Pág. 166 - Saberes y Pensamiento Científico)",
      "Mi comunidad escolar (Pág. 180 - Ética, Naturaleza y Sociedades)",
      "Nos comprometemos con otros seres vivos (Pág. 188 - Ética, Naturaleza y Sociedades)",
      "Mi escuela y el paisaje que la rodea (Pág. 196 - Ética, Naturaleza y Sociedades)",
      "Transformar conflictos en bien de nuestra comunidad escolar (Pág. 204 - Ética, Naturaleza y Sociedades)",
      "Situaciones de riesgo en la escuela (Pág. 210 - Ética, Naturaleza y Sociedades)",
      "Jugamos y nos cuidamos (Pág. 220 - De lo Humano y lo Comunitario)",
      "¡Una escuela llena de emociones! (Pág. 234 - De lo Humano y lo Comunitario)",
      "Mi escuela, amigable con la salud y el medio ambiente (Pág. 244 - De lo Humano y lo Comunitario)",
      "Nuestros hábitos de consumo responsable (Pág. 254 - De lo Humano y lo Comunitario)",
      "¡Expresamos nuestras ideas para ejercer nuestros derechos! (Pág. 271 - Ética y Derechos Humanos)"
    ],
    "Proyectos Comunitarios": [
      "Juntos resolvemos problemas (Pág. 12 - Lenguajes)",
      "Así festejan las familias de mi comunidad (Pág. 24 - Lenguajes)",
      "Nuestras manos hablan (Pág. 34 - Lenguajes)",
      "¡Hagámoslo entre todxs! (Pág. 46 - Lenguajes)",
      "¡Bailamos palabras musicalizadas! (Pág. 56 - Lenguajes)",
      "¡Arriba la vida, abajo el peligro! (Pág. 70 - Lenguajes)",
      "Me reconozco y pertenezco (Pág. 80 - Lenguajes)",
      "Los héroes sin capa de nuestra comunidad (Pág. 90 - Lenguajes)",
      "Mi huerto de plantas medicinales (Pág. 100 - Saberes y Pensamiento Científico)",
      "La comida chatarra en mi comunidad (Pág. 112 - Saberes y Pensamiento Científico)",
      "Cuentaestrellas (Pág. 124 - Saberes y Pensamiento Científico)",
      "¿Cómo mover objetos a lugares altos? (Pág. 142 - Saberes y Pensamiento Científico)",
      "Mi derecho a la alimentación y los alimentos de mi comunidad (Pág. 152 - Ética, Naturaleza y Sociedades)",
      "Con saberes y quehaceres participamos en nuestro entorno (Pág. 160 - Ética, Naturaleza y Sociedades)",
      "¡Los microorganismos existen! (Pág. 168 - Ética, Naturaleza y Sociedades)",
      "Los beneficios de las plantas (Pág. 174 - Ética, Naturaleza y Sociedades)",
      "En la comunidad todxs importan (Pág. 182 - Ética, Naturaleza y Sociedades)",
      "¿Quién resuelve los conflictos en mi comunidad? (Pág. 188 - Ética, Naturaleza y Sociedades)",
      "Conozco, cuido y aprecio mi comunidad (Pág. 196 - De lo Humano y lo Comunitario)",
      "Un museo de las emociones (Pág. 212 - De lo Humano y lo Comunitario)",
      "Jugamos y convivimos en un entorno seguro y feliz (Pág. 228 - De lo Humano y lo Comunitario)",
      "Juntos fomentamos la lectura (Pág. 238 - De lo Humano y lo Comunitario)",
      "Un día de fiesta en mi comunidad (Pág. 252 - De lo Humano y lo Comunitario)",
      "¡Expresamos nuestras ideas para ejercer nuestros derechos! (Pág. 271 - Ética y Derechos Humanos)"
    ],
    "Múltiples Lenguajes": [
      "Cómo leer este libro (Pág. 7)",
      "Alebrijes (Pág. 8 - Arte)",
      "Quisiera ser marinero (Pág. 14 - Literatura)",
      "Lluvia (Pág. 15 - Literatura)",
      "Polinizadores (Pág. 16 - Saberes y Pensamiento Científico)",
      "¡Échale un ojo! (Pág. 18 - Arte)",
      "¿Aburridos? ¡Miren bien! (Pág. 22 - Arte)",
      "El mito del tlacuache (Pág. 24 - Cultura y Literatura)",
      "La danza de las abejas (Pág. 26 - Saberes y Pensamiento Científico)",
      "El ojo que piensa (Pág. 30 - Arte)",
      "Espacio (Pág. 35 - Arte)",
      "Casa cometa (Pág. 36 - Literatura)",
      "1,700 kilos (Pág. 40 - Saberes y Pensamiento Científico)",
      "Jugando gato ¿o perro? (Pág. 41 - Matemáticas)",
      "Los números (Pág. 42 - Matemáticas)",
      "Se buscan flores (Pág. 46 - Saberes y Pensamiento Científico)",
      "Hasta los huesos (Pág. 48 - Cultura y Tradición)",
      "Sorpresa (Pág. 51 - Literatura)",
      "La prueba de Eloísa (Pág. 52 - Literatura)",
      "Formas en libertad (Pág. 56 - Arte)",
      "Masticahuesos (Pág. 60 - Literatura)",
      "Descubriendo las partituras: ¡aprendamos a leer música! (Pág. 62 - Arte)",
      "¡Hola, me llamo Caco! (Pág. 66 - Literatura)",
      "Hablar en animal (Pág. 70 - Lenguajes)",
      "Un viaje en tren (Pág. 74 - Literatura)",
      "Texturas visuales (Pág. 78 - Arte)",
      "En busca de... (Pág. 80 - Saberes y Pensamiento Científico)",
      "Reta de ritmos y colores (Pág. 82 - Arte)",
      "Qué miden los relojes (Pág. 84 - Matemáticas)",
      "El origen de la lluvia (Pág. 86 - Cultura y Tradición)",
      "Recordemos la historia (Pág. 88 - Historia)",
      "Aprendiendo situaciones justas e injustas al jugar serpientes y escaleras (Pág. 90 - Ética)",
      "Unidos por el arte (Pág. 92 - Arte)",
      "¡Tercera llamada, tercera… Comenzamos! (Pág. 94 - Arte y Teatro)",
      "México, tierra del mamut colombino (Pág. 96 - Historia)",
      "Pintura de Roger von Gunten (Pág. 100 - Arte)",
      "Los duendes de las palomas (Pág. 102 - Literatura)",
      "El origen de las letras (Pág. 104 - Historia y Lenguajes)",
      "El monstruo de pelusa (Pág. 108 - Literatura)",
      "Soy valioso y me reconozco (Pág. 112 - De lo Humano y lo Comunitario)",
      "El origen de los montes (Pág. 114 - Cultura y Tradición)",
      "Estrella (Pág. 116 - Literatura)",
      "Noche (Pág. 117 - Literatura)",
      "Por cielo, mar y tierra (Pág. 118 - Saberes y Pensamiento Científico)",
      "Colonia (Pág. 124 - De lo Humano y lo Comunitario)",
      "La escuela de las figuras geométricas (Pág. 126 - Matemáticas)",
      "Florecitas del sol (Pág. 130 - Saberes y Pensamiento Científico)",
      "Las fases de la luna (Pág. 134 - Saberes y Pensamiento Científico)",
      "Los niños me’phaa (Pág. 138 - Cultura y Pueblos Originarios)",
      "Las estrellas (Pág. 140 - Saberes y Pensamiento Científico)",
      "Un par de minutos (Pág. 144 - Matemáticas)",
      "El fascinante mundo de las sombras (Pág. 146 - Saberes y Pensamiento Científico)",
      "Cantos (Pág. 148 - Literatura y Poesía)",
      "Salmo del salmón (Pág. 149 - Literatura)",
      "Y tú, ¿qué ves? (Pág. 150 - Arte e Imaginación)",
      "Familias extraordinarias (Pág. 154 - Ética y De lo Humano)",
      "¡A contar se ha dicho! (Pág. 156 - Matemáticas)",
      "Las termitas y el didgeridoo (Pág. 158 - Saberes y Arte)",
      "Un nuevo comienzo I (Pág. 160 - Literatura)",
      "Un pez cegado de luna (Pág. 161 - Literatura)",
      "El lunes conocí a Emi (Pág. 162 - Literatura)",
      "Un totol para celebrar (Pág. 166 - Cultura y Tradición)",
      "A un solo ritmo (Pág. 170 - Arte y Música)",
      "Florario (Pág. 174 - Saberes y Biodiversidad)",
      "Nieve (Pág. 177 - Literatura)",
      "El Rey Kong Oy (Pág. 178 - Cultura y Leyendas)",
      "Vivo y convivo en mi comunidad (Pág. 180 - De lo Humano y lo Comunitario)",
      "Canción con ola (Pág. 182 - Literatura)",
      "Omelette existencial (Pág. 183 - Literatura)",
      "Una historia con sabor (Pág. 184 - Cultura y Gastronomía)",
      "Pregúntale a las rocas (Pág. 188 - Saberes y Geología)",
      "Duendes del monte: guardianes de la naturaleza (Pág. 194 - Cultura y Tradición)",
      "Un sombrero de oferta (Pág. 196 - Literatura)",
      "Pintura de Jaime Lupercio (Pág. 200 - Arte)",
      "Mujeres: raíces en la sociedad (Pág. 202 - Historia y Sociedad)",
      "El paso a paso del baile (Pág. 208 - Arte y Danza)",
      "El lente de Nacho (Pág. 212 - Arte y Fotografía)",
      "Seamos silvestres (Pág. 218 - Saberes y Medio Ambiente)",
      "Yo en el fondo del mar (Pág. 222 - Literatura)",
      "Música en todas partes (Pág. 224 - Arte y Música)",
      "Antes de mí (Pág. 228 - Historia y Memoria Familiar)",
      "Camino del comer formando figuras (Pág. 232 - Matemáticas)",
      "El salterio (Pág. 234 - Arte e Instrumentos Musicales)",
      "Axolote: el sonriente anfibio mexicano (Pág. 236 - Saberes y Biodiversidad)",
      "Palíndromos (Pág. 240 - Lenguajes)",
      "Las manchas del ocelote (Pág. 242 - Cultura y Leyendas)",
      "Afrodescendientes (Pág. 244 - Historia y Cultura)",
      "Los duendes de la tienda (Pág. 248 - Literatura)",
      "¡Expresamos nuestras ideas para ejercer nuestros derechos! (Pág. 255 - Ética y Derechos Humanos)"
    ],
    "Múltiples Lenguajes: Trazos y palabras": [
      "México lindo y querido. Nos reconocemos (Pág. 6)",
      "Identifico mi nombre y el de mis familiares (Pág. 6)",
      "Partes de la cara y el cuerpo (Pág. 7)",
      "Nombres propios y crucigramas del aula (Pág. 8)",
      "Participemos en juegos para mantener una vida activa y saludable (Pág. 11)",
      "Juegos tradicionales de patio y rondas (Pág. 12)",
      "Hábitos saludables para una vida sana (Pág. 16)",
      "Día Mundial del Agua (Pág. 17)",
      "Cuidado del agua en la escuela y el hogar (Pág. 18)",
      "Los derechos de las niñas y los niños (Pág. 21)",
      "Derecho a la identidad, salud y educación (Pág. 22)",
      "Identidad cultural, unión y tradiciones (Pág. 26)",
      "Fiestas tradicionales y platillos de México (Pág. 27)",
      "Vivo y convivo en paz (Pág. 29)",
      "Palabras de paz y resolución pacífica de conflictos (Pág. 30)",
      "Biodiversidad. Nuestra fauna (Pág. 31)",
      "Animales de México y sopas de letras (Pág. 32)",
      "Sueño literario. Inspiración y orgullo nacional (Pág. 35)",
      "Poemas, versos y rimas infantiles (Pág. 36)",
      "Valores para la convivencia (Pág. 37)",
      "El respeto, la empatía y la solidaridad (Pág. 38)",
      "Diversidad lingüística y cultural (Pág. 44)",
      "Palabras en náhuatl y lenguas originarias (Pág. 46)",
      "Relatos prehispánicos y tlatoanis (Pág. 50)",
      "Biodiversidad. De colores se visten las frutas (Pág. 60)",
      "Frutas de México y textos descriptivos (Pág. 62)",
      "Símbolo de la cultura mexicana: la piñata (Pág. 64)",
      "Coplas, cantos populares y piñatas navideñas (Pág. 66)",
      "Actividades y oficios de mi comunidad (Pág. 70)",
      "El zapatero, la panadera, la doctora y el bombero (Pág. 72)",
      "Protección civil. ¿Quién protege a las personas y a la sociedad cuando ocurre un desastre? (Pág. 79)",
      "Brigadas escolares y prevención ante sismos (Pág. 82)",
      "Símbolos que comunican (Pág. 86)",
      "Señales de tránsito, íconos y pictogramas (Pág. 87)",
      "México es nuestro país (Pág. 88)",
      "Volcanes, ríos y paisajes patrios (Pág. 89)",
      "Identidad nacional. Nuestra patria (Pág. 90)",
      "Los símbolos patrios: La bandera, el escudo y el himno (Pág. 91)",
      "Recortables didácticos y alfabeto móvil (Pág. 97)"
    ],
    "Múltiples Lenguajes: Trazos y números": [
      "Los animales se desplazan (Pág. 6)",
      "La música (Pág. 8)",
      "Ubico las cosas (Pág. 9)",
      "Muchos o pocos (Pág. 11)",
      "Cuidemos a los animales (Pág. 12)",
      "Contemos a los animales (Pág. 17)",
      "Mi entorno (Pág. 19)",
      "Números en todos lados (Pág. 20)",
      "La misma cantidad (Pág. 26)",
      "Sumas (Pág. 27)",
      "Contemos más cosas (Pág. 28)",
      "Contar para llegar a diez (Pág. 32)",
      "Números ordinales (Pág. 35)",
      "Sigue los pasos (Pág. 36)",
      "La recta numérica (Pág. 37)",
      "Sumas - Estrategias de cálculo (Pág. 40)",
      "Ubica en la recta numérica (Pág. 41)",
      "Diez objetos (Pág. 43)",
      "La decena (Pág. 45)",
      "Las decenas (Pág. 47)",
      "Descomponer números (Pág. 56)",
      "La centena (Pág. 57)",
      "¡El orden es el mismo! (Pág. 58)",
      "Las flores de mi país (Pág. 61)",
      "Sucesiones (Pág. 62)",
      "Contemos los saltos (Pág. 64)",
      "Componer números (Pág. 68)",
      "Jugando a contar (Pág. 71)",
      "Otra forma de restar (Pág. 74)",
      "Obtenemos datos (Pág. 76)",
      "El pictograma (Pág. 77)",
      "Encuentra el número (Pág. 79)",
      "Cuido mi cuerpo y el lugar donde vivo (Pág. 80)",
      "Las montañas de mi país (Pág. 81)",
      "Mi cuerpo cambia (Pág. 82)",
      "Días de la semana (Pág. 83)",
      "Las estaciones (Pág. 84)",
      "Sumo y resto (Pág. 85)",
      "El reloj (Pág. 87)",
      "Mi rutina en la mañana (Pág. 90)",
      "Mi rutina en la tarde (Pág. 91)",
      "Llegar a mi casa (Pág. 92)",
      "El croquis (Pág. 94)",
      "Suma lo mismo (Pág. 96)",
      "Esfera (Pág. 97)",
      "Cono (Pág. 98)",
      "Cilindro (Pág. 99)",
      "Prismas y pirámides (Pág. 100)",
      "Figuras geométricas (Pág. 101)",
      "Líneas (Pág. 102)",
      "Canción de cuna (Pág. 103)",
      "Números mayas (Pág. 104)",
      "Comparo (Pág. 105)",
      "La balanza (Pág. 106)",
      "Los árboles emblemáticos de México (Pág. 107)",
      "La mitad (Pág. 108)",
      "Recortables didácticos (Pág. 113)"
    ],
    "Nuestros Saberes: Libro para alumnos, maestros y familia": [
      "Partes del cuerpo humano y sentidos (Pág. 12)",
      "Los números, el conteo y colecciones cotidianas (Pág. 22)",
      "Animales domésticos y silvestres de México (Pág. 34)",
      "La materia en el entorno: Líquidos, sólidos y gases (Pág. 46)",
      "Reglas de convivencia y derechos de la niñez (Pág. 58)",
      "El plato del bien comer y la jarra del buen beber (Pág. 70)",
      "Luz, sombra y fuentes de energía (Pág. 82)",
      "El calendario, días de la semana y estaciones (Pág. 94)",
      "Los seres vivos y su hábitat natural (Pág. 106)",
      "Figuras geométricas: Círculos, triángulos, cuadrados y rectángulos (Pág. 118)",
      "Sentido de pertenencia y diversidad familiar (Pág. 130)",
      "Medidas no convencionales: Pasos, palmas y cordones (Pág. 142)",
      "Cuidado del entorno natural y sustentabilidad (Pág. 154)",
      "Prevención de riesgos en el hogar y la escuela (Pág. 166)",
    ],
  },

  // ==========================================
  // PRIMARIA 2º (FASE 3)
  // ==========================================
  "2º de primaria": {
    "Proyectos de Aula": [
      "Conozcámonos mejor para hacer equipo (Pág. 10 - Lenguajes)",
      "Nos reinventamos (Pág. 20 - Lenguajes)",
      "Jardín del lenguaje (Pág. 38 - Lenguajes)",
      "Lo que nos gusta y lo que nos disgusta (Pág. 52 - Lenguajes)",
      "Investigamos y creamos mitos y leyendas sobre fenómenos naturales (Pág. 64 - Lenguajes)",
      "El árbol de las campeonas y los campeones (Pág. 78 - Lenguajes)",
      "Cantando ando (Pág. 92 - Lenguajes)",
      "Los sentidos de mi cuerpo (Pág. 108 - Saberes y Pensamiento Científico)",
      "¡Una mano a la alimentación! (Pág. 118 - Saberes y Pensamiento Científico)",
      "¡Se puede estirar! (Pág. 130 - Saberes y Pensamiento Científico)",
      "Cuidamos el agua, cuidamos nuestros derechos (Pág. 144 - Ética, Naturaleza y Sociedades)",
      "¡Decir sí a mi derecho! (Pág. 152 - Ética, Naturaleza y Sociedades)",
      "Familias diversas (Pág. 166 - Ética, Naturaleza y Sociedades)",
      "Cuídame, también soy tu casa (Pág. 176 - Ética, Naturaleza y Sociedades)",
      "¡Conozcamos nuestra identidad! (Pág. 186 - Ética, Naturaleza y Sociedades)",
      "Los saberes de mi comunidad (Pág. 192 - Ética, Naturaleza y Sociedades)",
      "Convivencia armónica en el aula (Pág. 200 - Ética, Naturaleza y Sociedades)",
      "Aprendemos a convivir desde nuestras diferencias (Pág. 208 - De lo Humano y lo Comunitario)",
      "Soy como mi familia es (Pág. 220 - De lo Humano y lo Comunitario)",
      "La Galería de emociones (Pág. 232 - De lo Humano y lo Comunitario)",
      "Teatro guiñol por la convivencia (Pág. 242 - De lo Humano y lo Comunitario)",
      "¡Expresamos nuestras ideas para ejercer nuestros derechos! (Pág. 261 - Ética y Derechos Humanos)"
    ],
    "Proyectos Escolares": [
      "Había una vez... una obra de teatro (Pág. 10 - Lenguajes)",
      "Aunque diferentes, somos iguales (Pág. 26 - Lenguajes)",
      "Libro álbum de historias y emociones (Pág. 40 - Lenguajes)",
      "Instalando sensaciones (Pág. 52 - Lenguajes)",
      "Muro de los deseos (Pág. 60 - Lenguajes)",
      "Reconozco y represento un estado de mi país (Pág. 72 - Lenguajes)",
      "¡Construyamos como abejas! (Pág. 86 - Saberes y Pensamiento Científico)",
      "¿Qué animales y plantas observamos? (Pág. 102 - Saberes y Pensamiento Científico)",
      "¡Un muñeco con cabello de pasto! (Pág. 116 - Saberes y Pensamiento Científico)",
      "¡El compactador escolar! (Pág. 130 - Saberes y Pensamiento Científico)",
      "Cuidamos nuestra escuela (Pág. 142 - Ética, Naturaleza y Sociedades)",
      "Ante el acoso escolar la solución somos todxs (Pág. 150 - Ética, Naturaleza y Sociedades)",
      "Cuidamos de los seres vivos (Pág. 160 - Ética, Naturaleza y Sociedades)",
      "Mi compromiso con mi casa: la naturaleza (Pág. 168 - Ética, Naturaleza y Sociedades)",
      "Cuidado de las mascotas (Pág. 176 - Ética, Naturaleza y Sociedades)",
      "Actividades artesanales (Pág. 184 - Ética, Naturaleza y Sociedades)",
      "Jugar futbol sin conflictos (Pág. 192 - Ética, Naturaleza y Sociedades)",
      "Yoga y emociones (Pág. 202 - De lo Humano y lo Comunitario)",
      "Biblioteca de empatía (Pág. 218 - De lo Humano y lo Comunitario)",
      "Reviso la bolsa del mandado (Pág. 230 - De lo Humano y lo Comunitario)",
      "Guardianes de la seguridad (Pág. 240 - De lo Humano y lo Comunitario)",
      "Cuidemos juntos nuestro medio ambiente (Pág. 252 - De lo Humano y lo Comunitario)",
      "¡Expresamos nuestras ideas para ejercer nuestros derechos! (Pág. 269 - Ética y Derechos Humanos)"
    ],
    "Proyectos Comunitarios": [
      "Nos divertimos con juegos tradicionales (Pág. 10 - Lenguajes)",
      "Madre Tierra (Pág. 22 - Lenguajes)",
      "Si un oficio has de tener, el mejor debes ser (Pág. 34 - Lenguajes)",
      "La fiesta de nuestra comunidad (Pág. 44 - Lenguajes)",
      "Más monstruos, menos bolsas (Pág. 56 - Lenguajes)",
      "La diversidad nos enriquece (Pág. 72 - Lenguajes)",
      "¿Cómo cargamos objetos pesados? (Pág. 92 - Saberes y Pensamiento Científico)",
      "Lo que cambia y lo que permanece (Pág. 104 - Saberes y Pensamiento Científico)",
      "Agua que no has de beber… ¡No la dejes correr! (Pág. 116 - Saberes y Pensamiento Científico)",
      "Luces y sombras (Pág. 126 - Saberes y Pensamiento Científico)",
      "¡Desfile por la igualdad! (Pág. 140 - Ética, Naturaleza y Sociedades)",
      "Pintemos y hagamos un mundo sin violencia (Pág. 146 - Ética, Naturaleza y Sociedades)",
      "Acciones comunitarias sostenibles (Pág. 156 - Ética, Naturaleza y Sociedades)",
      "Productos hechos a mano en la comunidad (Pág. 166 - Ética, Naturaleza y Sociedades)",
      "Los perros en situación de calle en la comunidad (Pág. 174 - Ética, Naturaleza y Sociedades)",
      "Las autoridades de mi comunidad (Pág. 184 - Ética, Naturaleza y Sociedades)",
      "Los espacios de riesgo de mi comunidad (Pág. 194 - Ética, Naturaleza y Sociedades)",
      "Feria de la salud (Pág. 208 - De lo Humano y lo Comunitario)",
      "Nos reconocemos como parte de una comunidad (Pág. 218 - De lo Humano y lo Comunitario)",
      "Cazadores de emociones (Pág. 232 - De lo Humano y lo Comunitario)",
      "Todxs construimos la paz (Pág. 246 - De lo Humano y lo Comunitario)",
      "Mi comunidad a través del tiempo (Pág. 260 - De lo Humano y lo Comunitario)",
      "¡Expresamos nuestras ideas para ejercer nuestros derechos! (Pág. 277 - Ética y Derechos Humanos)"
    ],
    "Múltiples Lenguajes": [
      "Cómo leer este libro (Pág. 7)",
      "Iguales pero diferentes (Pág. 8 - Arte)",
      "Deportistas mexicanas destacadas (Pág. 14 - Cultura e Historia)",
      "Es vaquita, pero no hace “muuu” (Pág. 20 - Saberes y Biodiversidad)",
      "La vida de una monarca (Pág. 24 - Saberes)",
      "Retos extras del segundo grado (Pág. 27 - Matemáticas)",
      "Tateikie (Pág. 31 - Cultura y Pueblos Originarios)",
      "Naturaleza (Pág. 33 - Literatura)",
      "Análisis de la pintura de Román Andrade Llaguno (Pág. 34 - Arte)",
      "Xoloitzcuintli (Pág. 36 - Historia y Cultura)",
      "¿Les temes a los vampiros? (Pág. 38 - Saberes)",
      "Contribuyo al bienestar de los demás (Pág. 42 - De lo Humano y Ética)",
      "Día de playa (Pág. 44 - Literatura)",
      "El mole, nuestro sabor (Pág. 46 - Cultura y Tradición)",
      "Úrsula en las estrellas (Pág. 50 - Literatura)",
      "Derechos y necesidades (Pág. 52 - Ética)",
      "Araña (Pág. 53 - Literatura)",
      "Grupos animales (Pág. 54 - Saberes y Pensamiento Científico)",
      "El árbol del chicle (Pág. 56 - Historia y Naturaleza)",
      "¿Todos los 4 valen lo mismo? (Pág. 60 - Matemáticas)",
      "Jumiles en mi corazón (Pág. 64 - Cultura y Gastronomía)",
      "¡Yo estuve aquí! (Pág. 68 - Arte e Historia)",
      "¿Qué haré? (Pág. 72 - Literatura)",
      "Mi lugar y mi responsabilidad en el mundo (Pág. 74 - Ética y De lo Humano)",
      "Somos lo que comemos, somos hombres y mujeres de maíz (Pág. 76 - Cultura)",
      "In ejatal an idhid / El espíritu del maíz (Pág. 82 - Lenguas Originarias)",
      "Razas de maíz de México (Pág. 83 - Saberes y Biodiversidad)",
      "Música salvaje (Pág. 84 - Arte y Música)",
      "Sueño profundo (Pág. 88 - Literatura)",
      "Pesadilla (Pág. 89 - Literatura)",
      "¿Cómo hacer un mensaje secreto? (Pág. 90 - Lenguajes y Ciencia)",
      "Mi amigo pintor (Pág. 96 - Arte)",
      "AM (Pág. 99 - Literatura)",
      "Pareidolia (Pág. 100 - Arte y Percepción)",
      "Tres amigos (Pág. 104 - Literatura)",
      "Figuras en el cielo (Pág. 106 - Saberes y Astronomía)",
      "Un planeta en busca de empleo (Pág. 108 - Literatura)",
      "Texturas visuales frutas (Pág. 110 - Arte)",
      "Viejos, barbas y máscaras (Pág. 112 - Cultura y Danza Tradicional)",
      "Mi apariencia me protege (Pág. 116 - Saberes y Biodiversidad)",
      "Nocturno del viento (Pág. 120 - Literatura)",
      "Reconozco y respeto la identidad de los demás (Pág. 126 - De lo Humano)",
      "Como es un lado es el otro: la simetría (Pág. 128 - Matemáticas)",
      "La danza de los animales (Pág. 132 - Arte y Tradición)",
      "Sissa o el origen del ajedrez (Pág. 136 - Historia y Matemáticas)",
      "Pisotón con zapato de tacón (Pág. 142 - Literatura)",
      "Sonido de pastel de chocolate (Pág. 143 - Literatura)",
      "El palo de lluvia (Pág. 144 - Arte y Música)",
      "¿Qué ves cuando miras tu reflejo? (Pág. 146 - Saberes y Percepción)",
      "Ometéotl y los tezcatlipoca (Pág. 148 - Historia y Mitología)",
      "Papel picado (Pág. 150 - Arte Popular)",
      "¿Qué es para ti la fotografía? (Pág. 154 - Arte)",
      "¿Qué es lo que más te gustaría hacer si fueras…? (Pág. 160 - Lenguajes)",
      "Y tú, ¿lo dibujarías sin verlo? (Pág. 164 - Arte e Imaginación)",
      "Las gigantas (Pág. 168 - Literatura)",
      "Semillas (Pág. 172 - Saberes y Naturaleza)",
      "Árbol de la vida (Pág. 176 - Arte Popular y Tradición)",
      "La imprenta: fábrica de libros (Pág. 180 - Historia y Tecnología)",
      "Canción de un pirata (Pág. 186 - Literatura)",
      "Piratas y corsarios en México (Pág. 188 - Historia)",
      "El gusano musical (Pág. 190 - Arte y Música)",
      "La Mulata de Córdoba (Pág. 192 - Leyendas y Literatura)",
      "Naranjas y limas, limas y limones... (Pág. 196 - Literatura Tradicional)",
      "Lotería (Pág. 199 - Cultura y Juegos Tradicionales)",
      "Análisis de la pintura de Santiago Savi (Pág. 200 - Arte)",
      "El ki maya (Pág. 202 - Cultura e Historia)",
      "Cuando brilla la playa (Pág. 204 - Saberes y Bioluminiscencia)",
      "El mundo cabe en un carro (Pág. 206 - Literatura)",
      "El primer amanecer (Pág. 212 - Cultura y Mitos Originarios)",
      "Microbitos (Pág. 214 - Saberes)",
      "Texturas visuales verduras (Pág. 216 - Arte)",
      "¡Cuenta historias! (Pág. 218 - Lenguajes y Creatividad)",
      "El volcán más pequeño del mundo está en México (Pág. 220 - Geografía e Historia)",
      "Creatividad a pesar de la adversidad (Pág. 224 - De lo Humano y Arte)",
      "Ciudades de colibríes (Pág. 230 - Saberes y Biodiversidad)",
      "Huehuetlatolli o de la sabiduría de la palabra antigua (Pág. 232 - Filosofía y Tradición Nahua)",
      "Los géneros teatrales (Pág. 237 - Arte y Teatro)",
      "¿Por qué le llamamos tortilla a la tortilla? (Pág. 240 - Historia y Cultura)",
      "Las luciérnagas que embellecen a los árboles (Pág. 242 - Saberes)",
      "Yanga, un hombre libre (Pág. 244 - Historia y Afromexicanos)",
      "Sangre de tunas (Pág. 246 - Historia y Arte)",
      "Notas musicales y sus duraciones (Pág. 248 - Arte y Música)",
      "¡Expresamos nuestras ideas para ejercer nuestros derechos! (Pág. 255 - Ética y Derechos Humanos)"
    ],
    "Múltiples Lenguajes: Trazos y palabras": [
      "Mi nombre completo (Pág. 6)",
      "El valor de la familia (Pág. 8)",
      "Los nombres de mis familiares (Pág. 9)",
      "Mi árbol familiar (Pág. 10)",
      "¡Vamos a completar palabras! (Pág. 16)",
      "Lo que me gusta (Pág. 17)",
      "¡Juguemos a cantar! (Pág. 19)",
      "Los sentidos (Pág. 24)",
      "¿Suenan igual? (Pág. 25)",
      "Las letras que cambian (Pág. 29)",
      "Adivinanzas (Pág. 31)",
      "¡Buen viaje! (Pág. 32)",
      "¡Hagamos limonada! (Pág. 34)",
      "Mi receta favorita (Pág. 35)",
      "Les presento a mis amigos (Pág. 36)",
      "Mis amigos son así (Pág. 38)",
      "Rumbo a la biblioteca: del aula a la biblioteca y viceversa (Pág. 44)",
      "Palabras compuestas (Pág. 58)",
      "Biodiversidad en México (Pág. 60)",
      "Protección civil: Educación vial (Pág. 62)",
      "¡Ponle un toque más humano a tus mensajes! (Pág. 69)",
      "Qué dicen nuestros símbolos patrios: su historia y significado (Pág. 72)",
      "Recortables didácticos y alfabeto móvil (Pág. 81)"
    ],
    "Múltiples Lenguajes: Trazos y números": [
      "Los tejidos de mi país (Pág. 6)",
      "El día y la noche (Pág. 8)",
      "Los meses del año (Pág. 9)",
      "El calendario y nuestras festividades (Pág. 10)",
      "La suma y la resta (Pág. 22)",
      "Prepara recetas mexicanas (Pág. 23)",
      "Cuenta de uno en uno (Pág. 26)",
      "Cuenta de dos en dos (Pág. 27)",
      "Cuenta de tres en tres (Pág. 28)",
      "Cuenta de cuatro en cuatro (Pág. 29)",
      "Cuenta de cinco en cinco (Pág. 30)",
      "Cuenta de seis en seis (Pág. 31)",
      "Cuenta de siete en siete (Pág. 33)",
      "Cuenta de ocho en ocho (Pág. 34)",
      "Cuenta de nueve en nueve (Pág. 36)",
      "Cuenta de diez en diez (Pág. 38)",
      "Acomodar los juguetes (Pág. 40)",
      "Tabla de multiplicar de Pitágoras (Pág. 43)",
      "En un rectángulo (Pág. 44)",
      "Yo vivo en el planeta Tierra (Pág. 47)",
      "La centena (Pág. 48)",
      "Son iguales (Pág. 49)",
      "Las centenas (Pág. 51)",
      "Valor posicional (Pág. 56)",
      "El cubo, el prisma cuadrangular y el prisma rectangular (Pág. 63)",
      "El cubo de Sonobe (Pág. 64)",
      "Figuras geométricas (Pág. 66)",
      "Suma de unidades con acarreo (Pág. 70)",
      "Suma y resta de operaciones inversas (Pág. 72)",
      "Suma de decenas con acarreo (Pág. 75)",
      "Buscar el mismo valor (Pág. 79)",
      "Las frutas del mercado (Pág. 79)",
      "Suma de números de dos cifras sin acarreo (Pág. 81)",
      "¿Qué comemos? (Pág. 85)",
      "Suma y resta: ¡nos movemos en la recta! (Pág. 87)",
      "Vamos a medir (Pág. 90)",
      "Suma con acarreos en las unidades (Pág. 94)",
      "Suma con acarreos en las decenas (Pág. 96)",
      "Suma con acarreos (Pág. 98)",
      "Nuestras figuras (Pág. 100)",
      "Divisiones (Pág. 102)",
      "Los cuerpos geométricos (Pág. 109)",
      "Recortables didácticos de matemáticas (Pág. 113)"
    ],
    "Nuestros Saberes: Libro para alumnos, maestros y familia": [
      "El sistema óseo, muscular y articulaciones (Pág. 14)",
      "Estados de agregación del agua y ciclo hídrico (Pág. 26)",
      "El sistema solar, el sol y las fases lunares (Pág. 38)",
      "Suma y resta con algoritmo y valor posicional hasta 1000 (Pág. 50)",
      "Diversidad biocultural y pueblos indígenas de México (Pág. 62)",
      "Propiedades físicas de los materiales: Flexibilidad y dureza (Pág. 74)",
      "Medición de longitud, peso y capacidad con instrumentos (Pág. 86)",
      "Normas de seguridad en el hogar, la escuela y la vía pública (Pág. 98)",
      "Los derechos de las niñas y los niños a la salud y educación (Pág. 110)",
      "Cuidado de la fauna silvestre y áreas naturales (Pág. 122)",
      "El reloj analógico y digital: Horas y minutos (Pág. 134)",
      "Cuerpos geométricos: Caras, aristas y vértices (Pág. 146)",
    ],
  },

  // ==========================================
  // PRIMARIA 3º (FASE 4)
  // ==========================================
  "3º de primaria": {
    "Proyectos de Aula": [
      "Álbum de historias y memorias familiares (Pág. 18 - Lenguajes)",
      "¿Cómo viajan la luz y el sonido en el aula? (Pág. 36 - Saberes)",
      "El recetario colectivo de la lonchera saludable (Pág. 54 - De lo Humano)",
      "Maqueta del aparato digestivo y locomotor (Pág. 72 - Saberes)",
      "El noticiero escolar en vivo (Pág. 90 - Lenguajes)",
      "Fábrica de instrumentos musicales reciclados (Pág. 108 - Lenguajes)",
      "Termómetros caseros y dilatación térmica (Pág. 124 - Saberes)",
      "La asamblea del aula para resolver dilemas morales (Pág. 140 - Ética)",
      "Club de poetas y declamadores infantiles (Pág. 156 - Lenguajes)",
      "Las matemáticas en el presupuesto familiar (Pág. 170 - Saberes)",
      "Campaña contra la discriminación por género (Pág. 184 - Ética)",
      "Prevención del sobrepeso y actividad física (Pág. 198 - De lo Humano)",
      "Construcción de figuras geométricas con regla y compás (Pág. 212 - Saberes)",
      "Galería teatral sobre mitos y leyendas locales (Pág. 226 - Lenguajes)",
    ],
    "Proyectos Escolares": [
      "El huerto escolar sustentable de hortalizas (Pág. 16 - Saberes)",
      "Comité escolar de prevención de accidentes y sismos (Pág. 34 - Ética)",
      "Feria de juegos matemáticos y multiplicaciones (Pág. 52 - Saberes)",
      "La revista científica ilustrada de la escuela (Pág. 70 - Lenguajes)",
      "Campaña escolar por una convivencia sin violencia (Pág. 88 - De lo Humano)",
      "Instalación de captadores de rocío y lluvia (Pág. 104 - Saberes)",
      "Festival de leyendas y danzas regionales (Pág. 120 - Lenguajes)",
      "Brigada de cuidado dental y lavado de manos (Pág. 136 - De lo Humano)",
      "Periódico escolar mural interactivo (Pág. 152 - Lenguajes)",
      "Museo escolar de la biodiversidad local (Pág. 168 - Saberes)",
      "Olimpiada de fracciones y repartos equitativos (Pág. 184 - Saberes)",
      "El botiquín verde escolar: Plantas medicinales (Pág. 200 - Saberes)",
    ],
    "Proyectos Comunitarios": [
      "Diagnóstico y cuidado del agua potable comunitaria (Pág. 18 - Saberes)",
      "Campaña de separación de residuos y composta (Pág. 36 - Ética)",
      "Monografía viva: Oficios, costumbres y leyendas del barrio (Pág. 56 - Lenguajes)",
      "Red solidaria ante lluvias e inundaciones (Pág. 76 - Ética)",
      "Promoción del comercio local y productores comunitarios (Pág. 94 - De lo Humano)",
      "Campaña contra el maltrato animal en la colonia (Pág. 110 - Ética)",
      "Reforestación comunitaria con árboles nativos (Pág. 128 - Saberes)",
      "Rescate de la medicina tradicional y herbolaria (Pág. 146 - Saberes)",
      "Tianguis cultural de intercambio de libros (Pág. 164 - Lenguajes)",
      "Mapeo de la historia comunitaria en murales (Pág. 182 - Lenguajes)",
      "Cuidado y limpieza de ríos y arroyos locales (Pág. 200 - Ética)",
    ],
    "Múltiples Lenguajes": [
      "Cómo leer este libro (Pág. 7)",
      "¡Hola, soy un cactus! (Pág. 8 - Saberes y Naturaleza)",
      "¿A qué le tienes miedo? (Pág. 12 - Literatura)",
      "Yo puedo bucear (Pág. 16 - Saberes y Deporte)",
      "¿Hacemos papel reciclado en casa? (Pág. 18 - Arte y Medio Ambiente)",
      "Magia (Pág. 22 - Literatura)",
      "Sombrero (Pág. 23 - Literatura)",
      "El más grande de todos los animales (Pág. 24 - Saberes y Biodiversidad)",
      "El ki de Zamná (Pág. 28 - Cultura y Leyendas)",
      "La monarca de las mariposas (Pág. 32 - Saberes)",
      "Acertijos (Pág. 36 - Lenguajes e Ingenio)",
      "Ombligo (Pág. 39 - Literatura)",
      "Dos leyendas de la Gran Muralla china (Pág. 40 - Historia y Cultura)",
      "Somos naturaleza (Pág. 44 - Arte y Filosofía)",
      "Billetes (Pág. 48 - Historia y Economía)",
      "¿Lo ves como lo lees? (Pág. 52 - Arte y Percepción)",
      "Parado de cabeza (Pág. 56 - Literatura)",
      "Dormilón (Pág. 57 - Literatura)",
      "¿Qué es la música? (Pág. 58 - Arte y Música)",
      "El origen de las mariposas y la chaquira (Pág. 62 - Cultura Wixárika)",
      "Números egipcios y fracciones (Pág. 64 - Matemáticas e Historia)",
      "Vaquita marina (Pág. 66 - Saberes y Especies Protegidas)",
      "Promuevo la solidaridad y la igualdad (Pág. 70 - Ética y De lo Humano)",
      "Los fósiles (Pág. 72 - Saberes y Paleontología)",
      "Cuerpos vivos/no vivos (Pág. 76 - Saberes y Filosofía)",
      "La flor de nochebuena (Pág. 80 - Cultura y Botánica)",
      "Tus pulmones (Pág. 82 - Saberes y Salud)",
      "Afrodescendientes (Pág. 86 - Historia y Comunidad)",
      "Otros oficios (Pág. 90 - Sociedad y Trabajo)",
      "¡Mmm, qué rico! (Pág. 94 - Cultura y Gastronomía)",
      "Oruga (Pág. 96 - Literatura)",
      "Correr... (Pág. 97 - Literatura)",
      "Leonardo y las cabezas olmecas (Pág. 98 - Historia y Arte)",
      "La leyenda de las enchiladas potosinas (Pág. 102 - Gastronomía y Tradición)",
      "Madera dulce verdadera (Pág. 104 - Saberes)",
      "Dividiendo dibujamos facciones en las fracciones (Pág. 106 - Matemáticas)",
      "Multiplicando dibujamos un cuerpo proporcionado (Pág. 107 - Matemáticas y Arte)",
      "Colores en el cielo (Pág. 108 - Saberes y Óptica)",
      "El día que Nanahuatzin se convirtió en el sol (Pág. 112 - Mitos Prehispánicos)",
      "Calaveras y reinvenciones (Pág. 118 - Tradición y Literatura)",
      "¡A jugar! (Pág. 124 - De lo Humano y Recreación)",
      "Soy único y vivo con dignidad (Pág. 128 - Ética)",
      "La tuna (Pág. 130 - Saberes y Gastronomía)",
      "Lo único que quiero es ser una estrella (Pág. 134 - Literatura)",
      "Cómo llegó el conejo a la luna (Pág. 138 - Leyendas Prehispánicas)",
      "Bolas de fuego (Pág. 140 - Saberes y Física)",
      "Ideas en imágenes (Pág. 142 - Arte y Fotografía)",
      "Mary Cassatt (Pág. 144 - Arte y Pintura)",
      "Una historia de viruela, vacunas y… ¿vacas? (Pág. 150 - Historia y Medicina)",
      "Nubes (Pág. 156 - Saberes y Meteorología)",
      "Pastores de nubes (Pág. 160 - Literatura y Poesía)",
      "Tlacuilos: los escritores del México antiguo (Pág. 164 - Historia y Escritura)",
      "Bajo tierra (Pág. 168 - Saberes y Ecosistemas)",
      "Diferentes, pero con actitud (Pág. 172 - De lo Humano e Inclusión)",
      "Los derechos de las niñas y los niños (Pág. 174 - Ética y Derechos Humanos)",
      "Vivo en sociedad y cuido el medio ambiente (Pág. 178 - Ética y Ecología)",
      "El arriero y la tejedora (Pág. 180 - Literatura y Tradición)",
      "¡Llegó el carnaval! (Pág. 182 - Cultura y Fiesta Popular)",
      "El árbol más querido de México (Pág. 186 - Historia y Naturaleza)",
      "Mirna en el abismo (Pág. 190 - Literatura)",
      "Pinturas rupestres de Aguascalientes (Pág. 194 - Historia y Arte)",
      "El secreto de la hormiga (Pág. 198 - Leyendas)",
      "Coyolxauhqui (Pág. 202 - Historia y Mitología Mexica)",
      "Microbitos (Pág. 204 - Saberes y Microbiología)",
      "El traje del armadillo (Pág. 206 - Literatura)",
      "La protectora de las aguas (Pág. 207 - Literatura y Tradición)",
      "Hugo Brehme (Pág. 208 - Fotografía e Historia de México)",
      "Los sueños de Leoncito (Pág. 214 - Literatura)",
      "Lo que la pandemia nos dejó (Pág. 216 - Reflexión Social y Salud)",
      "La moraleja sobre la perseverancia de una carpa (Pág. 220 - Literatura)",
      "Artesanías mexicanas (Pág. 224 - Cultura y Arte Popular)",
      "Folclor (Pág. 228 - Cultura)",
      "Análisis de la pintura de Santiago Savi (Pág. 229 - Arte Contemporáneo)",
      "Cortitos (Pág. 230 - Literatura y Microficción)",
      "El vuelo del quetzal (Pág. 235 - Biodiversidad)",
      "Todos Santos (Pág. 236 - Tradición y Día de Muertos)",
      "Kapsis Estrella de mar (Pág. 240 - Saberes y Biología Marina)",
      "¿Palabras o dibujos? (Pág. 244 - Lenguajes y Semiótica)",
      "¡Expresamos nuestras ideas para ejercer nuestros derechos! (Pág. 255 - Ética y Derechos Humanos)"
    ],
    "Nuestros Saberes: Libro para alumnos, maestros y familia": [
      "Aparatos digestivo, circulatorio y respiratorio (Pág. 14)",
      "Fracciones equivalentes, medios, cuartos y octavos (Pág. 26)",
      "Masa, longitud y capacidad: Medición práctica (Pág. 38)",
      "Ecosistemas locales y cadenas alimentarias (Pág. 50)",
      "Instituciones públicas y derechos de la niñez (Pág. 62)",
      "Mezclas y sustancias en la cocina y la industria (Pág. 74)",
      "Figuras geométricas: Ángulos, vértices y simetría (Pág. 86)",
      "Movimiento de rotación y traslación de la Tierra (Pág. 98)",
      "Diversidad cultural y lenguas maternas de México (Pág. 110)",
      "Multiplicación y división como operaciones inversas (Pág. 122)",
      "Imanes, magnetismo y polos magnéticos (Pág. 134)",
      "Termómetros y transferencia de calor (Pág. 146)",
    ],
  },

  // ==========================================
  // PRIMARIA 4º (FASE 4)
  // ==========================================
  "4º de primaria": {
    "Proyectos de Aula": [
      "El viaje de la gota de agua: Ciclo y conservación (Pág. 20 - Saberes)",
      "Cuentos ilustrados por la igualdad de género (Pág. 38 - Lenguajes)",
      "Feria astronómica: La Tierra, la Luna y los eclipses (Pág. 58 - Saberes)",
      "Construcción de termómetros caseros y calor (Pág. 76 - Saberes)",
      "Creación de una obra de teatro comunitaria (Pág. 94 - Lenguajes)",
      "Debate: ¿Cómo influyen los anuncios publicitarios? (Pág. 112 - Lenguajes)",
      "Maqueta del sistema locomotor y cuidado de la postura (Pág. 128 - De lo Humano)",
      "Las fracciones en la cocina tradicional mexicana (Pág. 144 - Saberes)",
      "El cómic sobre la resolución pacífica de desacuerdos (Pág. 160 - Ética)",
      "Ecosistemas mexicanos y cadenas tróficas (Pág. 176 - Saberes)",
      "La cápsula informativa sobre los derechos de la infancia (Pág. 192 - Ética)",
      "Laboratorio de mezclas: Soluciones y suspensiones (Pág. 208 - Saberes)",
      "Antología de poemas y caligramas de la naturaleza (Pág. 224 - Lenguajes)",
    ],
    "Proyectos Escolares": [
      "Brigada escolar de protección civil y simulacros (Pág. 18 - Ética)",
      "El periódico escolar digital e impreso (Pág. 36 - Lenguajes)",
      "Laboratorio solar: Cocinas y calentadores solares (Pág. 56 - Saberes)",
      "Festival de danzas tradicionales de México (Pág. 76 - Lenguajes)",
      "Club escolar de lectura y debates literarios (Pág. 94 - Lenguajes)",
      "Auditoría ambiental escolar: Cuánta luz y agua usamos (Pág. 112 - Saberes)",
      "Feria de juegos matemáticos y cuerpos geométricos (Pág. 130 - Saberes)",
      "Campaña por una lonchera escolar libre de plásticos (Pág. 148 - Ética)",
      "Museo escolar de la historia de nuestra entidad (Pág. 166 - Ética)",
      "Instalación de jardines para mariposas y colibríes (Pág. 184 - Saberes)",
      "Torneo de ajedrez y pensamiento estratégico (Pág. 202 - De lo Humano)",
    ],
    "Proyectos Comunitarios": [
      "Defensa y protección de ríos y fuentes comunitarias (Pág. 18 - Ética)",
      "Tianguis agroecológico y consumo sustentable (Pág. 38 - De lo Humano)",
      "Rescate de la memoria histórica y cronistas del pueblo (Pág. 58 - Lenguajes)",
      "Campaña comunitaria contra el acoso y la discriminación (Pág. 78 - Ética)",
      "Cuidado de los bosques y selvas locales (Pág. 98 - Saberes)",
      "Mapeo comunitario de zonas de riesgo por sismos o ciclones (Pág. 118 - Ética)",
      "Rescate y valoración de las lenguas originarias locales (Pág. 138 - Lenguajes)",
      "Cooperativa vecinal para la reforestación urbana (Pág. 158 - Ética)",
      "La feria comunitaria del trueque y economía circular (Pág. 178 - De lo Humano)",
      "Diagnóstico sobre la disposición de basura electrónica (Pág. 198 - Ética)",
    ],
    "Cartografía de México y el mundo": [
      "Relieve, volcanes y principales sierras de México (Pág. 12)",
      "Ríos, lagos y vertientes hidrográficas nacionales (Pág. 24)",
      "Regiones naturales, climas y selvas mexicanas (Pág. 36)",
      "División política, fronteras y capitales de México (Pág. 48)",
      "Patrimonio cultural de la humanidad en territorio nacional (Pág. 60)",
      "Zonas sísmicas y volcánicas de México (Pág. 72)",
      "Población urbana y rural en las entidades federativas (Pág. 84)",
      "Actividades primarias: Agricultura, ganadería y pesca (Pág. 96)",
      "Espacios turísticos y vías de comunicación (Pág. 108)",
      "Áreas Naturales Protegidas y reservas de la biósfera (Pág. 120)",
    ],
    "Nuestros Saberes: México, grandeza y diversidad": [
      "Los primeros pobladores y civilizaciones mesoamericanas (Pág. 14)",
      "Culturas Olmeca, Teotihuacana, Maya y Mexica (Pág. 32)",
      "La caída de Tenochtitlan y el periodo virreinal (Pág. 52)",
      "La lucha popular por la Independencia de México (Pág. 74)",
      "Símbolos patrios y conformación de la nación mexicana (Pág. 96)",
      "Pueblos indígenas contemporáneos y sus cosmovisiones (Pág. 118)",
      "Las rutas comerciales virreinales: La Nao de China (Pág. 140)",
    ],
    "Múltiples Lenguajes": [
      "Los cenotes sagrados y ríos subterráneos de Yucatán (Pág. 12)",
      "Arte wixárika: Simbología en estambre y chaquira (Pág. 20)",
      "Especies endémicas de México en peligro de extinción (Pág. 28)",
      "Códices prehispánicos y sistemas de registro histórico (Pág. 36)",
      "La Guelaguetza: Fiesta de la hermandad oaxaqueña (Pág. 44)",
      "El jaguar: Rey de la selva maya (Pág. 52)",
      "La leyenda del callejón del beso y Guanajuato (Pág. 60)",
      "Arquitectura vernácula y casas de adobe (Pág. 68)",
      "Instrumentos ópticos: Microscopios y telescopios (Pág. 76)",
      "Mujeres destacadas en la ciencia mexicana (Pág. 84)",
    ],
    "Nuestros Saberes: Libro para alumnos, maestros y familia": [
      "Estructura de la materia y estados físicos (Pág. 14)",
      "Ecosistemas terrestres y acuáticos de México (Pág. 28)",
      "Operaciones con decimales y fracciones complejas (Pág. 42)",
      "Democracia participativa y leyes constitucionales (Pág. 56)",
      "Fuerza de gravedad y movimiento de los cuerpos (Pág. 70)",
      "Nutrición en plantas y animales: Fotosíntesis y digestión (Pág. 84)",
      "Cálculo de perímetros y áreas de cuadriláteros (Pág. 98)",
      "La atmósfera terrestre y fenómenos meteorológicos (Pág. 112)",
      "Derechos humanos universales y equidad de género (Pág. 126)",
    ],
  },

  // ==========================================
  // PRIMARIA 5º (FASE 5)
  // ==========================================
  "5º de primaria": {
    "Proyectos de Aula": [
      "Debate escolar sobre el cambio climático y energías limpias (Pág. 18 - Ética)",
      "Modelo tridimensional del sistema endocrino y reproductor (Pág. 38 - Saberes)",
      "Biografías ilustradas de científicas y científicos mexicanos (Pág. 58 - Lenguajes)",
      "Laboratorio de mezclas: Soluciones homogéneas y heterogéneas (Pág. 78 - Saberes)",
      "Revista digital sobre derechos humanos y no violencia (Pág. 98 - Ética)",
      "El boletín informativo sobre hábitos de vida saludable (Pág. 118 - De lo Humano)",
      "Ensayos argumentativos sobre el uso ético de la tecnología (Pág. 138 - Lenguajes)",
      "Circuitos eléctricos simples y conductores de electricidad (Pág. 156 - Saberes)",
      "Campaña para la prevención del acoso escolar y cyberbullying (Pág. 174 - De lo Humano)",
      "Antología poética con figuras retóricas y metáforas (Pág. 192 - Lenguajes)",
      "Cálculo de volúmenes de prismas cuadrangulares (Pág. 210 - Saberes)",
      "Simulador de juicio oral por delitos ambientales (Pág. 226 - Ética)",
    ],
    "Proyectos Escolares": [
      "Auditoría ecológica y reducción de huella de carbono escolar (Pág. 18 - Saberes)",
      "Círculo escolar de mediación pacífica de conflictos (Pág. 38 - Ética)",
      "La feria de la ciencia: Circuitos eléctricos y magnetismo (Pág. 58 - Saberes)",
      "Museo escolar de la biodiversidad mexicana (Pág. 78 - Saberes)",
      "Taller escolar de periodismo y radio comunitaria (Pág. 98 - Lenguajes)",
      "Campaña de ahorro energético e iluminación sustentable (Pág. 118 - Saberes)",
      "Festival de teatro sobre igualdad de género y no discriminación (Pág. 138 - Lenguajes)",
      "La brigada escolar de primeros auxilios y salud mental (Pág. 158 - De lo Humano)",
      "Instalación de biodigestores escolares demostrativos (Pág. 178 - Saberes)",
      "Olimpiada matemática de porcentajes y proporciones (Pág. 198 - Saberes)",
    ],
    "Proyectos Comunitarios": [
      "Diseño de sistemas de captación de agua pluvial comunitaria (Pág. 18 - Saberes)",
      "Campaña comunitaria contra la discriminación y exclusión (Pág. 38 - Ética)",
      "Herbario comunitario de plantas medicinales y saberes locales (Pág. 58 - Saberes)",
      "Cooperativa comunitaria de reciclaje y lombricomposta (Pág. 78 - Ética)",
      "Rescate y documentación de la historia oral del barrio (Pág. 98 - Lenguajes)",
      "Auditoría del transporte público y movilidad sustentable (Pág. 118 - Ética)",
      "Prevención de desastres por deslizamientos o inundaciones (Pág. 138 - Ética)",
      "Mural comunitario sobre la soberanía alimentaria (Pág. 158 - Lenguajes)",
      "Red vecinal de huertos urbanos en azoteas (Pág. 178 - Saberes)",
      "Feria comunitaria de oficios tradicionales en extinción (Pág. 198 - De lo Humano)",
    ],
    "Cartografía de México y el mundo": [
      "Tectónica de placas, cinturón de fuego y sismicidad global (Pág. 14)",
      "Cuencas hídricas continentales y escasez mundial de agua (Pág. 26)",
      "Zonas climáticas de la Tierra y biomas mundiales (Pág. 38)",
      "Flujos migratorios mundiales y diversidad poblacional (Pág. 50)",
      "Recursos minerales y energéticos en el mundo (Pág. 62)",
      "Espacios agrícolas, ganaderos y pesqueros en los continentes (Pág. 74)",
      "Desigualdades económicas y Producto Interno Bruto mundial (Pág. 86)",
      "Problemas ambientales globales: Deforestación y deshielo polar (Pág. 98)",
    ],
    "Nuestros Saberes: México, grandeza y diversidad": [
      "El México independiente y las intervenciones extranjeras (Pág. 16)",
      "Leyes de Reforma y la presidencia de Benito Juárez (Pág. 36)",
      "El Porfiriato, transformaciones y desigualdades sociales (Pág. 56)",
      "El estallido de la Revolución Mexicana de 1910 (Pág. 78)",
      "La Constitución de 1917 y los derechos laborales (Pág. 100)",
      "Cardenismo, reparto agrario y expropiación petrolera (Pág. 122)",
      "El movimiento estudiantil de 1968 y la lucha democrática (Pág. 144)",
    ],
    "Múltiples Lenguajes": [
      "Fotografía documental y testimonios de la vida cotidiana (Pág. 12)",
      "Misterios del fondo marino y fosas oceánicas (Pág. 22)",
      "Literatura fantástica y leyendas de la selva Lacandona (Pág. 32)",
      "Los inventos que cambiaron la historia de la humanidad (Pág. 42)",
      "El telescopio James Webb y los confines del universo (Pág. 52)",
      "Poesía náhuatl de Nezahualcóyotl (Pág. 62)",
      "El gran acuífero maya y los cenotes vírgenes (Pág. 72)",
      "Las mujeres matemáticas ocultas de la NASA (Pág. 82)",
      "El arte del grabado mexicano y José Guadalupe Posada (Pág. 92)",
      "Biodiversidad microscópica: Bacterias y tardígrados (Pág. 102)",
    ],
    "Nuestros Saberes: Libro para alumnos, maestros y familia": [
      "El sistema inmunológico y la nutrición balanceada (Pág. 14)",
      "Porcentajes, fracciones complejas y gráficas estadísticas (Pág. 28)",
      "La atmósfera, efecto invernadero y calentamiento global (Pág. 42)",
      "Mecanismos de participación ciudadana y derechos humanos (Pág. 56)",
      "Proporcionalidad directa y escalas en planos y mapas (Pág. 70)",
      "Fuerza, fricción y máquinas simples en la vida diaria (Pág. 84)",
      "El sistema nervioso central y periférico humano (Pág. 98)",
      "Biodiversidad de México y especies en peligro crítico (Pág. 112)",
      "Instituciones de justicia y mediación comunitaria (Pág. 126)",
    ],
  },

  // ==========================================
  // PRIMARIA 6º (FASE 5)
  // ==========================================
  "6º de primaria": {
    "Proyectos de Aula": [
      "Cápsula del tiempo: Autobiografía y proyecto de vida (Pág. 18 - Lenguajes)",
      "El universo: Telescopios espaciales y viajes a la Luna (Pág. 38 - Saberes)",
      "Ensayos argumentativos sobre bioética y clonación (Pág. 58 - Lenguajes)",
      "Investigación sobre salud mental y prevención de adicciones (Pág. 78 - De lo Humano)",
      "Antología de cuentos de misterio y ciencia ficción (Pág. 98 - Lenguajes)",
      "El debate formal sobre el impacto de la inteligencia artificial (Pág. 118 - Lenguajes)",
      "Maqueta del sistema solar y leyes del movimiento planetario (Pág. 138 - Saberes)",
      "La constitución ilustrada: Derechos y responsabilidades (Pág. 158 - Ética)",
      "Geometría en la arquitectura prehispánica y moderna (Pág. 176 - Saberes)",
      "Revista científica escolar sobre biotecnología y genética (Pág. 194 - Saberes)",
      "Campaña sobre educación integral en sexualidad (Pág. 212 - De lo Humano)",
      "El programa de radio podcast estudiantil (Pág. 228 - Lenguajes)",
    ],
    "Proyectos Escolares": [
      "Simulador de asamblea legislativa escolar democrática (Pág. 18 - Ética)",
      "Biodigestores y energías alternativas en la escuela (Pág. 38 - Saberes)",
      "Feria de innovaciones tecnológicas y robótica básica (Pág. 58 - Saberes)",
      "Festival escolar de artes escénicas y música popular (Pág. 78 - Lenguajes)",
      "Observatorio escolar de equidad y convivencia pacífica (Pág. 98 - Ética)",
      "Proyecto de captación masiva y purificación de agua escolar (Pág. 118 - Saberes)",
      "Periódico digital escolar de investigación y opinión (Pág. 138 - Lenguajes)",
      "Campaña para la prevención del consumo de vapeadores y alcohol (Pág. 158 - De lo Humano)",
      "Torneo de debates de oratoria y argumentación (Pág. 178 - Lenguajes)",
      "Diseño de una mini central meteorológica escolar (Pág. 198 - Saberes)",
    ],
    "Proyectos Comunitarios": [
      "Plan comunitario de acción ante el estrés hídrico (Pág. 18 - Saberes)",
      "Documental audiovisual de la historia y memoria del pueblo (Pág. 40 - Lenguajes)",
      "Cooperativa comunitaria sustentable de comercio justo (Pág. 62 - Ética)",
      "Brigada de reforestación con especies endémicas (Pág. 84 - Saberes)",
      "Diagnóstico sobre la disposición de residuos electrónicos (Pág. 106 - Ética)",
      "Defensa y rescate del patrimonio cultural y arqueológico local (Pág. 128 - Ética)",
      "Huerto comunitario medicinal y banco de semillas criollas (Pág. 150 - Saberes)",
      "Comité de mediación vecinal y cultura de paz (Pág. 172 - Ética)",
      "Red ciudadana para el cuidado de animales en abandono (Pág. 194 - Ética)",
    ],
    "Cartografía de México y el mundo": [
      "Geopolítica global, bloques económicos y tratados comerciales (Pág. 14)",
      "Indicadores de desarrollo humano y calidad de vida en el mundo (Pág. 28)",
      "Megaciudades, urbanización y retos ecológicos globales (Pág. 42)",
      "Deterioro ambiental, desertificación y pérdida de biodiversidad (Pág. 56)",
      "Rutas del comercio marítimo y aéreo internacional (Pág. 70)",
      "Conflictos territoriales y geopolítica del agua (Pág. 84)",
      "Patrimonio biocultural y pueblos originarios del mundo (Pág. 98)",
    ],
    "Nuestros Saberes: México, grandeza y diversidad": [
      "La Constitución de 1917 y los derechos sociales (Pág. 16)",
      "Movimientos sociales, magisteriales y estudiantiles del siglo XX (Pág. 38)",
      "La transición democrática y la construcción del México contemporáneo (Pág. 60)",
      "La diversidad étnica y lingüística como riqueza nacional (Pág. 82)",
      "México en el escenario global de las Naciones Unidas (Pág. 104)",
      "El muralismo mexicano: Rivera, Orozco y Siqueiros (Pág. 126)",
    ],
    "Múltiples Lenguajes": [
      "Crónicas de viaje por los desiertos y selvas del planeta (Pág. 12)",
      "Poesía contemporánea latinoamericana y lírica popular (Pág. 22)",
      "Grandes enigmas de la arqueología subacuática (Pág. 32)",
      "Arquitectura bioclimática y ciudades sustentables del futuro (Pág. 42)",
      "El arte abstracto y los grandes muralistas mexicanos (Pág. 52)",
      "Mitos de creación de los pueblos originarios de América (Pág. 62)",
      "La inteligencia artificial en la vida diaria: Retos y dilemas (Pág. 72)",
      "Relatos sobre la expedición al polo sur (Pág. 82)",
      "Música y matemáticas: El canon de Bach y la física del sonido (Pág. 92)",
    ],
    "Nuestros Saberes: Libro para alumnos, maestros y familia": [
      "Teoría de la evolución de las especies, fósiles y ADN (Pág. 14)",
      "El sistema inmunológico humano y el papel de las vacunas (Pág. 28)",
      "Volúmenes de prismas, pirámides, cilindros y conos (Pág. 42)",
      "Soberanía nacional, división de poderes y estado de derecho (Pág. 56)",
      "Probabilidad clásica, porcentajes e interés simple (Pág. 70)",
      "Ecosistemas del mundo y estrategias de conservación (Pág. 84)",
      "Salud mental, bienestar socioemocional y resiliencia (Pág. 98)",
      "Energía nuclear, eólica y geotérmica (Pág. 112)",
    ],
  },

  // ==========================================
  // SECUNDARIA 1º (FASE 6)
  // ==========================================
  "1º de secundaria": {
    "Lenguajes (Español, Artes, Inglés)": [
      "La narración de sucesos autobiográficos y crónicas personales (Pág. 14)",
      "Análisis crítico de notas periodísticas y textos de opinión (Pág. 30)",
      "Creación de poemas con recursos líricos: Metáfora, símil y personificación (Pág. 46)",
      "Manifestaciones artísticas y culturales de la comunidad local (Pág. 62)",
      "Lectura dramatizada y análisis de textos teatrales breves (Pág. 78)",
      "Textos de divulgación científica: Características y estructura (Pág. 94)",
      "Debate sobre la diversidad lingüística de México y el mundo (Pág. 110)",
      "English: Daily routines and personal introductions (Pág. 126)",
      "English: Describing family, school and hobbies (Pág. 142)",
      "Artes visuales: El color, la textura y la composición en el arte popular (Pág. 158)",
      "El ensayo literario breve sobre valores humanos (Pág. 174)",
    ],
    "Saberes y Pensamiento Científico: Matemáticas 1": [
      "Números positivos y negativos: Suma y resta en recta numérica (Pág. 14)",
      "Multiplicación y división con fracciones y números decimales (Pág. 32)",
      "Ecuaciones lineales de primer grado: Forma ax + b = c (Pág. 50)",
      "Perímetros y áreas de polígonos regulares y del círculo (Pág. 68)",
      "Cálculo de porcentajes, IVA y regla de tres simple (Pág. 86)",
      "Proporcionalidad directa y tablas de variación lineal (Pág. 104)",
      "Gráficas circulares y de barras: Interpretación de datos (Pág. 122)",
      "Probabilidad frecuencial y experimentos aleatorios sencillos (Pág. 140)",
      "Construcción de triángulos y cuadriláteros con compás (Pág. 158)",
    ],
    "Saberes y Pensamiento Científico: Ciencias 1 (Biología)": [
      "La célula como unidad estructural y funcional de los seres vivos (Pág. 14)",
      "Biodiversidad de México: Factores que la originan y la amenazan (Pág. 32)",
      "Nutrición autótrofa y heterótrofa en las cadenas tróficas (Pág. 52)",
      "Respiración aerobia y anaerobia en los organismos (Pág. 70)",
      "Salud sexual y reproductiva en la adolescencia (Pág. 88)",
      "Métodos anticonceptivos y prevención de ITS (Pág. 106)",
      "Manipulación genética, clonación y biotecnología moderna (Pág. 124)",
      "Evolución por selección natural de Charles Darwin (Pág. 142)",
      "Impacto ambiental del consumo humano en los ecosistemas (Pág. 160)",
    ],
    "Ética, Naturaleza y Sociedades: Geografía": [
      "El espacio geográfico y sus componentes naturales y sociales (Pág. 14)",
      "Dinámica interna de la Tierra: Tectónica de placas y vulcanismo (Pág. 32)",
      "Dinámica externa: Erosión, relieve y formación de suelos (Pág. 50)",
      "Distribución de climas, vegetación y fauna en los continentes (Pág. 68)",
      "Recursos hídricos continentales y oceánicos (Pág. 86)",
      "Crecimiento, composición y flujos migratorios de la población mundial (Pág. 104)",
      "Diversidad cultural y globalización en el siglo XXI (Pág. 122)",
      "Riesgos de desastre y medidas de protección civil y prevención (Pág. 140)",
    ],
    "Ética, Naturaleza y Sociedades: Historia 1": [
      "Los pueblos originarios de Mesoamérica, Aridoamérica y Oasisamérica (Pág. 14)",
      "La expedición de conquista y la caída de México-Tenochtitlan (Pág. 36)",
      "El virreinato de la Nueva España: Organización política y social (Pág. 58)",
      "Las Reformas Borbónicas y las tensiones coloniales (Pág. 80)",
      "El proceso de Independencia nacional de 1810 a 1821 (Pág. 102)",
      "Ideario político de Hidalgo, Morelos y Vicente Guerrero (Pág. 124)",
    ],
    "Ética, Naturaleza y Sociedades: Formación Cívica y Ética 1": [
      "Identidad personal, dignidad humana y proyecto de vida (Pág. 14)",
      "Los derechos humanos como conquistas históricas universales (Pág. 32)",
      "Cultura de paz y resolución pacífica de conflictos cotidianos (Pág. 50)",
      "Normas, leyes e instituciones democráticas en México (Pág. 68)",
      "Igualdad de género y rechazo frontal a toda forma de discriminación (Pág. 86)",
      "Participación ciudadana estudiantil en la escuela y comunidad (Pág. 104)",
    ],
    "De lo Humano y lo Comunitario (Tecnología, Ed. Física, Tutoría)": [
      "La técnica como satisfactor de necesidades e intereses humanos (Pág. 14)",
      "Materiales e insumos tecnológicos: Origen y transformación sustentable (Pág. 32)",
      "Habilidades motrices y deporte educativo inclusivo (Pág. 50)",
      "Autoconocimiento, regulación emocional y toma de decisiones éticas (Pág. 68)",
      "Prevención de adicciones y factores de riesgo en adolescentes (Pág. 86)",
      "Comunicación asertiva y relaciones interpersonales saludables (Pág. 104)",
    ],
    "Múltiples Lenguajes 1": [
      "Crónicas y testimonios sobre la juventud mexicana actual (Pág. 12)",
      "El arte urbano: Muralismo, grafiti y estética comunitaria (Pág. 24)",
      "Grandes discursos que cambiaron el rumbo de la historia (Pág. 36)",
      "Ciencia ficción: Inteligencia artificial, robots y sociedad (Pág. 48)",
      "Literatura epistolar: Cartas célebres de amor y rebelión (Pág. 60)",
      "Etnobotánica mexicana: Saberes ancestrales de las plantas (Pág. 72)",
    ],
    "Nuestro Libro de Proyectos 1": [
      "Proyecto Comunitario: Alerta ambiental por plásticos de un solo uso (Pág. 16)",
      "Proyecto STEAM: Estación meteorológica automatizada con sensores (Pág. 40)",
      "Proyecto AS: Campaña de lectura compartida en el centro de adultos mayores (Pág. 64)",
      "Proyecto ABP: Prevención del ciberacoso escolar y la violencia digital (Pág. 88)",
      "Proyecto Comunitario: Rescate de áreas verdes y huerto sustentable (Pág. 112)",
    ],
  },

  // ==========================================
  // SECUNDARIA 2º (FASE 6)
  // ==========================================
  "2º de secundaria": {
    "Lenguajes (Español, Artes, Inglés)": [
      "El ensayo literario y argumentativo: Tesis, argumentos y premisas (Pág. 14)",
      "Análisis crítico de campañas oficiales y mensajes publicitarios (Pág. 32)",
      "Lectura y análisis de obras dramáticas clásicas y contemporáneas (Pág. 50)",
      "Manifestaciones artísticas de los pueblos originarios de América (Pág. 68)",
      "Producción de historietas y cómics sobre dilemas sociales (Pág. 86)",
      "English: Describing past experiences, travel and cultural traditions (Pág. 104)",
      "English: Giving directions, ordering food and shopping (Pág. 122)",
      "Técnicas de teatro: Expresión corporal, dicción y montaje escénico (Pág. 140)",
      "El debate sobre el uso responsable de las redes sociales (Pág. 158)",
    ],
    "Saberes y Pensamiento Científico: Matemáticas 2": [
      "Sistemas de dos ecuaciones lineales con dos incógnitas (2x2): Métodos gráfico y algebraico (Pág. 14)",
      "Propiedades de la congruencia y semejanza de triángulos (Pág. 34)",
      "Teorema de Pitágoras y resolución de problemas cotidianos (Pág. 54)",
      "Cálculo de volumen de prismas y cilindros rectos (Pág. 74)",
      "Medidas de tendencia central: Media, mediana y moda con datos agrupados (Pág. 94)",
      "Multiplicación y división de potencias con base común (Pág. 114)",
      "Sucesiones numéricas y expresiones algebraicas cuadráticas (Pág. 134)",
      "Probabilidad de eventos independientes y compuestos (Pág. 154)",
    ],
    "Saberes y Pensamiento Científico: Ciencias 2 (Física)": [
      "El movimiento: Posición, trayectoria, rapidez, velocidad y aceleración (Pág. 14)",
      "Fuerzas y Leyes de Newton aplicadas a la vida cotidiana (Pág. 34)",
      "La energía mecánica: Energía cinética y potencial (Pág. 54)",
      "El calor y la temperatura: Escalas térmicas y transferencia de calor (Pág. 74)",
      "Estructura de la materia: Modelo cinético corpuscular de partículas (Pág. 94)",
      "Fenómenos electromagnéticos: Imanes, corrientes eléctricas y circuitos (Pág. 114)",
      "Ondas sonoras y lumínicas: Frecuencia, longitud y espectro electromagnético (Pág. 134)",
      "El origen del universo: Teoría del Big Bang y evolución cósmica (Pág. 154)",
    ],
    "Ética, Naturaleza y Sociedades: Historia 2": [
      "El México independiente: Primer imperio de Iturbide y constitución federal de 1824 (Pág. 14)",
      "Las intervenciones extranjeras: Guerra con Texas y con Estados Unidos en 1847 (Pág. 38)",
      "La Reforma liberal, las leyes juaristas y la Constitución de 1857 (Pág. 62)",
      "La invasión francesa y el Segundo Imperio de Maximiliano (Pág. 86)",
      "La República Restaurada con Juárez y Lerdo de Tejada (Pág. 110)",
    ],
    "Ética, Naturaleza y Sociedades: Formación Cívica y Ética 2": [
      "La libertad como derecho humano inalienable y sus límites éticos (Pág. 14)",
      "Cultura incluyente, rechazo a la xenofobia y a la discriminación (Pág. 34)",
      "Mecanismos de transparencia, acceso a la información y rendición de cuentas (Pág. 54)",
      "Derechos sexuales y reproductivos en la toma de decisiones adolescentes (Pág. 74)",
      "Justicia restaurativa vs. justicia retributiva en la sociedad (Pág. 94)",
      "Participación social juvenil en organizaciones comunitarias (Pág. 114)",
    ],
    "De lo Humano y lo Comunitario (Tecnología, Ed. Física, Tutoría)": [
      "Procesos tecnológicos sustentables e impacto socioambiental (Pág. 14)",
      "Innovación técnica y desarrollo tecnológico comunitario (Pág. 34)",
      "Capacidades físico-motrices: Fuerza, resistencia, velocidad y flexibilidad (Pág. 54)",
      "Inteligencia emocional, proyecto de vida y autogestión (Pág. 74)",
      "Prevención de violencia en el noviazgo y relaciones tóxicas (Pág. 94)",
      "Manejo del estrés y hábitos de autocuidado en adolescentes (Pág. 114)",
    ],
    "Múltiples Lenguajes 2": [
      "Ensayos sobre bioética, clonación y derechos de la naturaleza (Pág. 12)",
      "Fotoperiodismo y testimonio visual de los movimientos obreros (Pág. 26)",
      "Poesía de vanguardia y experimentación literaria en México (Pág. 40)",
      "La física detrás de los deportes extremos y el paracaidismo (Pág. 54)",
      "Músicas del mundo: Ritmos africanos, jazz y flamenco (Pág. 68)",
      "La arquitectura de las civilizaciones perdidas (Pág. 82)",
    ],
    "Nuestro Libro de Proyectos 2": [
      "Proyecto Comunitario: Huertos urbanos verticales y captación pluvial (Pág. 16)",
      "Proyecto STEAM: Eficiencia energética e iluminación solar en la escuela (Pág. 42)",
      "Proyecto AS: Mediación escolar entre pares para la resolución de conflictos (Pág. 68)",
      "Proyecto ABP: Campaña escolar sobre salud mental y resiliencia juvenil (Pág. 94)",
    ],
  },

  // ==========================================
  // SECUNDARIA 3º (FASE 6)
  // ==========================================
  "3º de secundaria": {
    "Lenguajes (Español, Artes, Inglés)": [
      "El informe de investigación científica y social (Pág. 14)",
      "El debate formal: Argumentación, contraargumentación y falacias (Pág. 32)",
      "Novela contemporánea latinoamericana y universal (Pág. 52)",
      "Intervención artística comunitaria y muralismo participativo (Pág. 70)",
      "Crítica literaria y reseñas de obras cinematográficas (Pág. 88)",
      "English: Future plans, aspirations and job interviews (Pág. 106)",
      "English: Environmental problems, technology and global citizenship (Pág. 124)",
      "Montaje de una obra de teatro completa con escenografía (Pág. 142)",
      "Antología de crónicas urbanas de la comunidad (Pág. 160)",
    ],
    "Saberes y Pensamiento Científico: Matemáticas 3": [
      "Ecuaciones cuadráticas completas e incompletas: Fórmula general (Pág. 14)",
      "Funciones lineales y cuadráticas: Tabulación y comportamiento gráfico (Pág. 34)",
      "Razones trigonométricas: Seno, coseno y tangente en triángulos rectángulos (Pág. 54)",
      "Teorema de Tales y criterios de semejanza de triángulos (Pág. 74)",
      "Cálculo de probabilidad en eventos mutuamente excluyentes y complementarios (Pág. 94)",
      "Factorización algebraica: Factor común, trinomios y diferencia de cuadrados (Pág. 114)",
      "Volumen de conos, pirámides y esferas (Pág. 134)",
      "Desviación media y análisis de dispersión de datos estadísticos (Pág. 154)",
    ],
    "Saberes y Pensamiento Científico: Ciencias 3 (Química)": [
      "Propiedades físicas y químicas de la materia en el entorno (Pág. 14)",
      "Mezclas homogéneas y heterogéneas: Métodos de separación físicos y químicos (Pág. 34)",
      "La tabla periódica: Estructura atómica, electrones de valencia y electronegatividad (Pág. 54)",
      "El enlace químico: Enlace iónico, covalente y metálico (Pág. 74)",
      "Reacciones químicas y la Ley de Conservación de la Masa de Lavoisier (Pág. 94)",
      "Ácidos y bases en la vida cotidiana: Escala de pH e indicadores caseros (Pág. 114)",
      "Reacciones de óxido-reducción (Redox) y aplicaciones industriales (Pág. 134)",
      "Química verde y sustentabilidad en los procesos de fabricación (Pág. 154)",
    ],
    "Ética, Naturaleza y Sociedades: Historia 3": [
      "El Porfiriato: Crecimiento económico, ferrocarriles y desigualdades agudas (Pág. 14)",
      "La Revolución Mexicana de 1910: Madero, Zapata, Villa y Carranza (Pág. 38)",
      "La Constitución de 1917 y sus artículos fundamentales: 3º, 27º y 123º (Pág. 62)",
      "El México posrevolucionario: Caudillismo, Guerra Cristera y consolidación (Pág. 86)",
      "El Cardenismo: Reparto agrario, nacionalización ferrocarrilera y petrolera (Pág. 110)",
      "El México contemporáneo: Neoliberalismo, tratados de libre comercio y alternancia (Pág. 134)",
    ],
    "Ética, Naturaleza y Sociedades: Formación Cívica y Ética 3": [
      "El Estado de derecho, la división de poderes y las garantías individuales (Pág. 14)",
      "Los derechos humanos como criterio rector para la acción de las autoridades (Pág. 34)",
      "Compromiso social y político de las juventudes en la vida democrática (Pág. 54)",
      "Vigilancia ciudadana, combate a la corrupción y contraloría social (Pág. 74)",
      "Cultura de la legalidad, justicia social y defensa de grupos vulnerables (Pág. 94)",
    ],
    "De lo Humano y lo Comunitario (Tecnología, Ed. Física, Tutoría)": [
      "Evaluación interna y externa de sistemas tecnológicos sustentables (Pág. 14)",
      "Emprendimiento comunitario sustentable y modelos de economía circular (Pág. 34)",
      "Liderazgo democrático, trabajo en equipo y deportes colectivos (Pág. 54)",
      "Proyecto de vida vocacional, elección de bachillerato y metas profesionales (Pág. 74)",
      "Salud mental, manejo de la ansiedad y proyecto vocacional (Pág. 94)",
    ],
    "Múltiples Lenguajes 3": [
      "Ensayos filosóficos sobre el sentido de la vida, la justicia y la libertad (Pág. 12)",
      "Grandes dilemas éticos de la inteligencia artificial y la robótica (Pág. 26)",
      "Crónicas periodísticas de las megaciudades latinoamericanas (Pág. 40)",
      "Los premios Nobel mexicanos: Alfonso García Robles, Octavio Paz y Mario Molina (Pág. 54)",
      "La física cuántica explicada a través del arte contemporáneo (Pág. 68)",
    ],
    "Nuestro Libro de Proyectos 3": [
      "Proyecto Comunitario: Tratamiento y recuperación de aguas residuales escolares (Pág. 16)",
      "Proyecto STEAM: Medidor digital de calidad del aire con microcontroladores (Pág. 44)",
      "Proyecto AS: Red comunitaria de apoyo y auxilio a grupos vulnerables (Pág. 72)",
      "Proyecto ABP: Feria vocacional y emprendimientos cooperativos sustentables (Pág. 100)",
    ],
  },

  // ==========================================
  // PREESCOLAR (FASE 2)
  // ==========================================
  "preescolar": {
    "Jardín de Niños: Libro para la educadora": [
      "Situación didáctica: El círculo mágico de las emociones y el diálogo",
      "Situación didáctica: Jugamos a la tiendita y contamos con monedas didácticas",
      "Situación didáctica: Cuidemos a los animalitos y las plantas de nuestro jardín",
      "Situación didáctica: Los sonidos misteriosos del cuerpo y del aula",
      "Situación didáctica: Rondas, cantos y bailes tradicionales de México",
      "Situación didáctica: Descubrimos figuras geométricas en los objetos del salón",
      "Situación didáctica: La tiendita de la salud y el lavado correcto de manos",
      "Situación didáctica: Huellas y sombras: Juegos con luz y siluetas",
      "Situación didáctica: Construimos torres y puentes con bloques de madera",
      "Situación didáctica: Los oficios de mi familia y de mi comunidad",
      "Situación didáctica: Cuentos gigantes ilustrados y adivinanzas con títeres",
      "Situación didáctica: Pintamos con los dedos y creamos colores nuevos",
    ],
    "Mi álbum de Preescolar": [
      "Lámina: ¿Cómo soy y qué me gusta? (Autorretrato e identidad)",
      "Lámina: Familias diversas y hogares amorosos",
      "Lámina: El mercado: Frutas, verduras, colores y pesaje",
      "Lámina: Paseo por la comunidad y medios de transporte",
      "Lámina: Bichos y plantas del jardín de niños",
      "Lámina: Sombras chinescas y figuras divertidas en movimiento",
      "Lámina: La fiesta patria y las tradiciones mexicanas",
      "Lámina: ¿Qué pasa cuando me enojo? (Regulación emocional)",
      "Lámina: Los animales acuáticos y terrestres de México",
      "Lámina: Juegos de patio: La rayuela, el avión y las rondas",
      "Lámina: Las cuatro estaciones y los cambios del clima",
      "Lámina: Mi álbum de recuerdos del ciclo escolar",
    ],
    "Láminas de diálogo y conversación": [
      "Lámina 1: Dialogamos sobre cómo resolver un enojo sin violencia",
      "Lámina 2: ¿Qué hacen las personas de mi colonia para cuidarnos?",
      "Lámina 3: Cuidado del agua en el lavado de manos y cepillado",
      "Lámina 4: Comer rico y saludable todos los días (Frutas y verduras)",
      "Lámina 5: La tiendita de la escuela: Contamos y clasificamos",
      "Lámina 6: Los animales de la granja y sus sonidos",
      "Lámina 7: Cruce seguro de calles y educación vial infantil",
    ],
    "Materiales didácticos y juegos interactivos": [
      "Juegos de construcción con bloques y patrones geométricos",
      "Rompecabezas de animales y secuencias temporales",
      "Modelado con masa sensorial y plastilina casera",
      "Cuentos gigantes ilustrados para cantar y narrar en grupo",
      "Tarjetas de emociones para el rincón de la calma",
      "Material manipulativo de conteo: Fichas, semillas y ábacos",
    ],
  },

  // ==========================================
  // EDUCACIÓN INICIAL (FASE 1)
  // ==========================================
  "inicial": {
    "Guía pedagógica para la atención integral a la primera infancia": [
      "El sostenimiento afectivo y el vínculo seguro con el cuidador",
      "La exploración libre y el movimiento autónomo en el espacio",
      "La conquista del lenguaje a través de arrullos y nanas",
      "El juego corporal, cosquillas y canciones de falda",
      "Ambientes seguros, cálidos y enriquecidos sensorialmente",
      "Alimentación perceptiva y lactancia materna amorosa",
      "El ritmo de sueño, descanso y relajación infantil",
    ],
    "Lecturas y arrullos para la primera infancia": [
      "Arrullo de la luna y las estrellas",
      "Nanas y canciones tradicionales en lenguas maternas",
      "Cuentos de cartón con texturas y sonidos suaves",
      "Poemas para los deditos de las manos y de los pies",
      "El libro de los animales y sus onomatopeyas",
      "Rimas de agua para la hora del baño",
    ],
    "Fichero de actividades lúdicas y motrices": [
      "Actividad motriz: Gateo sobre colchonetas y texturas",
      "Actividad sensorial: Cajas de tesoros con telas y maderas",
      "Actividad rítmica: Sonajas, maracas y tambores suaves",
      "Actividad de espejo: Descubriendo mi rostro y mi sonrisa",
      "Actividad de encaje y apilado con recipientes seguros",
    ],
  },

  // ==========================================
  // MULTIGRADO / CAM / TELESECUNDARIA
  // ==========================================
  "multigrado": {
    "Proyectos de Aula (Multigrado)": [
      "Nombrario y autobiografía comunitaria multigrado",
      "El huerto escolar diversificado: Siembra colectiva",
      "El noticiero rural comunitario por altavoz",
      "La tiendita comunitaria de matemáticas prácticas y trueque",
      "Cuidado del agua y rescate del río o manantial local",
      "Álbum colectivo de saberes tradicionales de los abuelos",
      "Teatro guiñol multigrado sobre cultura de paz",
      "Feria de ciencias adaptada a múltiples ritmos de aprendizaje",
    ],
    "Proyectos Escolares y Comunitarios": [
      "Diagnóstico participativo de las necesidades de la localidad rural",
      "Campaña comunitaria de reforestación con árboles frutales",
      "Elaboración de composta y abono orgánico para la comunidad",
      "Festival de leyendas, cantos y bailes intergeneracionales",
      "Comité escolar y comunitario de protección civil rural",
      "Biblioteca ambulante comunitaria en carretilla",
    ],
    "Múltiples Lenguajes (Inclusivo y adaptado)": [
      "Lecturas visuales con pictogramas y sistema Braille",
      "Relatos bilingües en lengua originaria y español",
      "Arte textil y bordados tradicionales de la región",
      "Cuentos con texturas táctiles y lenguaje sensorial",
      "El mural colectivo de las manos de la comunidad",
    ],
    "Nuestros Saberes: Guía integral docente": [
      "Estrategias de atención simultánea y diferenciada en multigrado",
      "El trabajo por proyectos integradores de campos formativos",
      "Ajustes razonables para la atención a la neurodiversidad (CAM)",
      "Evaluación formativa continua basada en rúbricas situadas",
      "Vinculación comunitaria y asambleas escolares participativas",
    ],
  },
};

/**
 * Obtiene las lecciones o proyectos concretos para un grado y libro de texto dados.
 */
export function getLeccionesPorLibro(grado: string, libro: string): string[] {
  const g = grado.toLowerCase();
  let gradoKey = "1º de primaria";

  if (g.includes("inicial") || g.includes("maternal")) {
    gradoKey = "inicial";
  } else if (g.includes("preescolar")) {
    gradoKey = "preescolar";
  } else if (g.includes("1º de primaria")) {
    gradoKey = "1º de primaria";
  } else if (g.includes("2º de primaria")) {
    gradoKey = "2º de primaria";
  } else if (g.includes("3º de primaria")) {
    gradoKey = "3º de primaria";
  } else if (g.includes("4º de primaria")) {
    gradoKey = "4º de primaria";
  } else if (g.includes("5º de primaria")) {
    gradoKey = "5º de primaria";
  } else if (g.includes("6º de primaria")) {
    gradoKey = "6º de primaria";
  } else if (g.includes("1º de secundaria")) {
    gradoKey = "1º de secundaria";
  } else if (g.includes("2º de secundaria")) {
    gradoKey = "2º de secundaria";
  } else if (g.includes("3º de secundaria")) {
    gradoKey = "3º de secundaria";
  } else if (g.includes("secundaria")) {
    gradoKey = "1º de secundaria";
  } else if (g.includes("multigrado") || g.includes("cam") || g.includes("indígena") || g.includes("telesecundaria")) {
    gradoKey = "multigrado";
  }

  const leccionesGrado = LECCIONES_LIBROS_NEM[gradoKey];
  if (leccionesGrado) {
    // Coincidencia exacta
    if (leccionesGrado[libro]) {
      return leccionesGrado[libro];
    }
    // Coincidencia parcial por nombre
    const libroLower = libro.toLowerCase();
    for (const [key, lecciones] of Object.entries(leccionesGrado)) {
      if (key.toLowerCase().includes(libroLower) || libroLower.includes(key.toLowerCase())) {
        return lecciones;
      }
    }
  }

  // Fallback con contenidos del programa
  return getContenidosPorLibro(grado, libro);
}




