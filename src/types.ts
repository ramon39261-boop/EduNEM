
export type CampoFormativo =
  | "Lenguajes"
  | "Saberes y Pensamiento Científico"
  | "Ética, Naturaleza y Sociedades"
  | "De lo Humano y lo Comunitario";

export type EjeArticulador =
  | "Inclusión"
  | "Pensamiento Crítico"
  | "Interculturalidad Crítica"
  | "Igualdad de Género"
  | "Vida Saludable"
  | "Apropiación de las culturas a través de la lectura y la escritura"
  | "Artes y Experiencias Estéticas";

export type Metodologia =
  | "Aprendizaje Basado en Proyectos Comunitarios (ABPC)"
  | "Aprendizaje Basado en Indagación (STEAM)"
  | "Aprendizaje Basado en Problemas (ABP)"
  | "Aprendizaje Servicio (AS)";

export interface Planeacion {
  titulo: string;
  grado: string;
  libroTexto?: string;
  campoFormativo?: CampoFormativo | string;
  ejesArticuladores: EjeArticulador[];
  pda: string;
  inicio: string;
  desarrollo: string;
  cierre: string;
  evaluacion: string;
  recursos: string[];
}

export interface Proyecto {
  nombre: string;
  problematica: string;
  metodologia: Metodologia;
  proposito: string;
  fases: {
    nombre: string;
    actividades: string[];
  }[];
  productoFinal: string;
}

// ==========================================
// TIPOS PARA EL GENERADOR DE EXÁMENES NEM
// ==========================================

export type TipoReactivo =
  | "opcion_multiple"
  | "verdadero_falso"
  | "relacionar_columnas"
  | "respuesta_abierta";

export interface PreguntaExamen {
  numero: number;
  tipo: TipoReactivo;
  enunciado: string;
  opciones?: string[];
  respuestaCorrecta?: string;
  respuestaEsperada?: string;
  columnaA?: string[];
  columnaB?: string[];
  relacionCorrecta?: string[];
  valor: number;
}

export interface CriterioEvaluacion {
  criterio: string;
  descripcion: string;
  puntaje: number;
}

export interface Examen {
  titulo: string;
  grado: string;
  campoFormativo: CampoFormativo;
  contenido: string;
  pda: string;
  instrucciones: string;
  preguntas: PreguntaExamen[];
  puntajeTotal: number;
  criteriosEvaluacion: CriterioEvaluacion[];
  claveRespuestas: string[];
  recomendacionesDocente: string;
}

export interface ConfiguracionExamen {
  grado: string;
  campoFormativo: CampoFormativo;
  contenido: string;
  pda: string;
  cantidadPreguntas: number;
  tiposReactivos: TipoReactivo[];
  dificultad: "basica" | "intermedia" | "avanzada" | "mixta";
}

