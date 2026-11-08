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
