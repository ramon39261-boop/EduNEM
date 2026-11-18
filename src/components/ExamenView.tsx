
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  GraduationCap,
  FileText,
  Sparkles,
  Loader2,
  Download,
  CheckCircle2,
  AlertCircle,
  ClipboardList,
  Eye,
  EyeOff,
  RefreshCw,
} from 'lucide-react';

import { getContenidosNEM } from '../data/nemCurriculum';
import { getPDA } from '../data/pdaNEM';
import { generarExamen } from '../services/geminiService';
import { exportarExamenWord } from '../lib/exportUtils';

import {
  CampoFormativo,
  TipoReactivo,
  ConfiguracionExamen,
  Examen,
  PreguntaExamen,
} from '../types';

const GRADOS = ['1°', '2°', '3°', '4°', '5°', '6°'];

const CAMPOS: CampoFormativo[] = [
  'Lenguajes',
  'Saberes y Pensamiento Científico',
  'Ética, Naturaleza y Sociedades',
  'De lo Humano y lo Comunitario',
];

const TIPOS: { valor: TipoReactivo; nombre: string; descripcion: string }[] = [
  {
    valor: 'opcion_multiple',
    nombre: 'Opción múltiple',
    descripcion: 'Preguntas con varias opciones de respuesta.',
  },
  {
    valor: 'verdadero_falso',
    nombre: 'Verdadero o falso',
    descripcion: 'Afirmaciones que el alumno debe evaluar.',
  },
  {
    valor: 'relacionar_columnas',
    nombre: 'Relacionar columnas',
    descripcion: 'Relacionar conceptos con sus descripciones.',
  },
  {
    valor: 'respuesta_abierta',
    nombre: 'Respuesta abierta',
    descripcion: 'Preguntas para responder con palabras propias.',
  },
];

const DIFICULTADES = [
  { valor: 'basica', nombre: 'Básica' },
  { valor: 'intermedia', nombre: 'Intermedia' },
  { valor: 'avanzada', nombre: 'Avanzada' },
  { valor: 'mixta', nombre: 'Mixta' },
] as const;

const inputClass =
  'w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-600';

const labelClass =
  'block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2';

function Panel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function TituloSeccion({
  icono,
  titulo,
  descripcion,
}: {
  icono: React.ReactNode;
  titulo: string;
  descripcion?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="rounded-xl bg-emerald-100 dark:bg-emerald-900/40 p-2.5 text-emerald-800 dark:text-emerald-300">
        {icono}
      </div>
      <div>
        <h2 className="font-bold text-slate-800 dark:text-slate-100">
          {titulo}
        </h2>
        {descripcion && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {descripcion}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ExamenView() {
  const [grado, setGrado] = useState('1°');
  const [campoFormativo, setCampoFormativo] =
    useState<CampoFormativo>('Lenguajes');

  const [contenido, setContenido] = useState('');
  const [pda, setPda] = useState('');

  const [cantidadPreguntas, setCantidadPreguntas] = useState(10);

  const [tiposReactivos, setTiposReactivos] = useState<TipoReactivo[]>([
    'opcion_multiple',
  ]);

  const [dificultad, setDificultad] =
    useState<ConfiguracionExamen['dificultad']>('mixta');

  const [examen, setExamen] = useState<Examen | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mostrarDocente, setMostrarDocente] = useState(false);

  const contenidos = useMemo(() => {
    try {
      const resultado = getContenidosNEM(grado, campoFormativo);
      return Array.isArray(resultado) ? resultado : [];
    } catch {
      return [];
    }
  }, [grado, campoFormativo]);

  const procesos = useMemo(() => {
    try {
      const resultado = getPDA(grado, campoFormativo);
      return Array.isArray(resultado) ? resultado : [];
    } catch {
      return [];
    }
  }, [grado, campoFormativo]);

  useEffect(() => {
    setContenido(contenidos[0] || '');
    setPda(procesos[0] || '');
  }, [contenidos, procesos]);

  const cambiarTipo = (tipo: TipoReactivo) => {
    setTiposReactivos((actuales) => {
      if (actuales.includes(tipo)) {
        return actuales.filter((item) => item !== tipo);
      }
      return [...actuales, tipo];
    });
  };

  const generar = async () => {
    setError('');
    setExamen(null);
    setMostrarDocente(false);

    if (!contenido) {
      setError('No hay contenidos disponibles para esta selección.');
      return;
    }

    if (!pda) {
      setError('No hay procesos de desarrollo de aprendizaje disponibles.');
      return;
    }

    if (tiposReactivos.length === 0) {
      setError('Selecciona al menos un tipo de reactivo.');
      return;
    }

    const configuracion: ConfiguracionExamen = {
      grado,
      campoFormativo,
      contenido,
      pda,
      cantidadPreguntas,
      tiposReactivos,
      dificultad,
    };

    setCargando(true);

    try {
      const resultado = await generarExamen(configuracion);
      setExamen(resultado);
    } catch (err: any) {
      setError(err.message || 'No fue posible generar el examen.');
    } finally {
      setCargando(false);
    }
  };

  const reiniciar = () => {
    setExamen(null);
    setError('');
    setMostrarDocente(false);
  };

  const exportarWord = () => {
    if (!examen) return;

    try {
      exportarExamenWord(examen);
    } catch {
      setError('No fue posible exportar el examen a Word.');
    }
  };

  const renderPregunta = (pregunta: PreguntaExamen) => {
    return (
      <div
        key={pregunta.numero}
        className="border-b border-slate-200 dark:border-slate-700 py-5 last:border-0"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
            {pregunta.numero}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
              {pregunta.enunciado}
            </p>

            {pregunta.tipo === 'opcion_multiple' && (
              <div className="mt-3 space-y-2">
                {(pregunta.opciones || []).map((opcion, indice) => (
                  <div
                    key={indice}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {String.fromCharCode(65 + indice)}.
                    </span>
                    <span>{opcion}</span>
                  </div>
                ))}
              </div>
            )}

            {pregunta.tipo === 'verdadero_falso' && (
              <div className="mt-3 flex gap-6 text-sm text-slate-600 dark:text-slate-300">
                <span>○ Verdadero</span>
                <span>○ Falso</span>
              </div>
            )}

            {pregunta.tipo === 'relacionar_columnas' && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="font-semibold text-xs text-slate-500 mb-2">
                    COLUMNA A
                  </p>
                  {(pregunta.columnaA || []).map((item, i) => (
                    <p key={i} className="text-sm mb-2 text-slate-700 dark:text-slate-300">
                      {i + 1}. {item}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-xs text-slate-500 mb-2">
                    COLUMNA B
                  </p>
                  {(pregunta.columnaB || []).map((item, i) => (
                    <p key={i} className="text-sm mb-2 text-slate-700 dark:text-slate-300">
                      {String.fromCharCode(65 + i)}. {item}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {pregunta.tipo === 'respuesta_abierta' && (
              <div className="mt-4 space-y-5">
                <div className="border-b border-slate-300 dark:border-slate-600 h-5" />
                <div className="border-b border-slate-300 dark:border-slate-600 h-5" />
                <div className="border-b border-slate-300 dark:border-slate-600 h-5" />
              </div>
            )}

            <p className="text-xs text-slate-400 mt-3">
              Valor: {pregunta.valor} {pregunta.valor === 1 ? 'punto' : 'puntos'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 mb-2">
            <GraduationCap size={22} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Herramienta docente NEM
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            Generador de Exámenes
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Crea evaluaciones para los seis grados de educación primaria.
          </p>
        </div>
      </motion.div>

      {!examen && (
        <Panel className="p-5 md:p-7">
          <TituloSeccion
            icono={<BookOpen size={21} />}
            titulo="Configuración del examen"
            descripcion="Selecciona los elementos curriculares que deseas evaluar."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Grado escolar</label>
              <select
                className={inputClass}
                value={grado}
                onChange={(e) => setGrado(e.target.value)}
              >
                {GRADOS.map((item) => (
                  <option key={item} value={item}>
                    {item} de primaria
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Campo formativo</label>
              <select
                className={inputClass}
                value={campoFormativo}
                onChange={(e) =>
                  setCampoFormativo(e.target.value as CampoFormativo)
                }
              >
                {CAMPOS.map((campo) => (
                  <option key={campo} value={campo}>
                    {campo}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Contenido curricular</label>
              <select
                className={inputClass}
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
              >
                {contenidos.length === 0 && (
                  <option value="">No hay contenidos disponibles</option>
                )}
                {contenidos.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {contenidos.length === 0 && (
                <p className="text-xs text-amber-600 mt-2">
                  No se encontraron contenidos para esta selección.
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Proceso de Desarrollo de Aprendizaje (PDA)
              </label>
              <select
                className={inputClass}
                value={pda}
                onChange={(e) => setPda(e.target.value)}
              >
                {procesos.length === 0 && (
                  <option value="">No hay PDA disponibles</option>
                )}
                {procesos.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {procesos.length === 0 && (
                <p className="text-xs text-amber-600 mt-2">
                  No se encontraron PDA para esta selección.
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 my-7" />

          <TituloSeccion
            icono={<ClipboardList size={21} />}
            titulo="Características de la evaluación"
            descripcion="Personaliza el tipo y la cantidad de preguntas."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                Cantidad de preguntas: {cantidadPreguntas}
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={cantidadPreguntas}
                onChange={(e) => setCantidadPreguntas(Number(e.target.value))}
                className="w-full accent-emerald-700 mt-2"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>5 preguntas</span>
                <span>30 preguntas</span>
              </div>
            </div>

            <div>
              <label className={labelClass}>Nivel de dificultad</label>
              <select
                className={inputClass}
                value={dificultad}
                onChange={(e) =>
                  setDificultad(
                    e.target.value as ConfiguracionExamen['dificultad']
                  )
                }
              >
                {DIFICULTADES.map((item) => (
                  <option key={item.valor} value={item.valor}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className={labelClass}>Tipos de reactivos</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIPOS.map((tipo) => {
                const seleccionado = tiposReactivos.includes(tipo.valor);

                return (
                  <button
                    type="button"
                    key={tipo.valor}
                    onClick={() => cambiarTipo(tipo.valor)}
                    className={`text-left rounded-xl border p-4 transition-all ${
                      seleccionado
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          seleccionado
                            ? 'bg-emerald-700 border-emerald-700 text-white'
                            : 'border-slate-400'
                        }`}
                      >
                        {seleccionado && <CheckCircle2 size={14} />}
                      </div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {tipo.nombre}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 ml-7">
                      {tipo.descripcion}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 flex gap-2 text-sm text-red-700 dark:text-red-300">
              <AlertCircle size={19} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={generar}
            disabled={cargando || !contenido || !pda || tiposReactivos.length === 0}
            className="w-full mt-7 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 flex items-center justify-center gap-3 transition-colors"
          >
            {cargando ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generando examen...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generar examen con IA
              </>
            )}
          </button>

          {cargando && (
            <p className="text-center text-xs text-slate-500 mt-3">
              Estamos preparando las preguntas y la clave para el docente. Esto puede tardar un poco.
            </p>
          )}
        </Panel>
      )}

      {examen && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          <Panel className="p-5 md:p-7">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 mb-2">
                  <CheckCircle2 size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Examen generado
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {examen.titulo}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={reiniciar}
                  className="rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <RefreshCw size={16} />
                  Nuevo examen
                </button>

                <button
                  type="button"
                  onClick={exportarWord}
                  className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 text-sm font-semibold flex items-center gap-2"
                >
                  <Download size={17} />
                  Descargar Word
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                ['Grado', examen.grado],
                ['Campo formativo', examen.campoFormativo],
                ['Preguntas', String(examen.preguntas.length)],
                ['Puntaje total', `${examen.puntajeTotal} puntos`],
              ].map(([etiqueta, valor]) => (
                <div
                  key={etiqueta}
                  className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3"
                >
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {etiqueta}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">
                    {valor}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Contenido curricular
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-200">
                {examen.contenido}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-4 mb-2">
                PDA
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-200">
                {examen.pda}
              </p>
            </div>

            <div className="mb-7">
              <h3 className="font-bold text-slate-800 dark:text-white mb-3">
                Datos del alumno
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-slate-700 dark:text-slate-200">
                <div className="border-b border-slate-400 pb-2">
                  Nombre: 
                </div>
                <div className="border-b border-slate-400 pb-2">
                  Fecha:
                </div>
                <div className="border-b border-slate-400 pb-2">
                  Escuela:
                </div>
                <div className="border-b border-slate-400 pb-2">
                  Grupo:
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-4 mb-6">
              <p className="font-bold text-emerald-900 dark:text-emerald-200 text-sm mb-1">
                Instrucciones
              </p>
              <p className="text-sm text-emerald-900 dark:text-emerald-100">
                {examen.instrucciones}
              </p>
            </div>

            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">
              Preguntas
            </h3>
            {examen.preguntas.map(renderPregunta)}
          </Panel>

          <Panel className="p-5 md:p-7">
            <button
              type="button"
              onClick={() => setMostrarDocente(!mostrarDocente)}
              className="w-full flex items-center justify-between gap-3 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 dark:bg-amber-900/30 p-2.5 text-amber-800 dark:text-amber-300">
                  <FileText size={21} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">
                    Material exclusivo para el docente
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Clave de respuestas, criterios y recomendaciones.
                  </p>
                </div>
              </div>
              {mostrarDocente ? (
                <EyeOff size={20} className="text-slate-500" />
              ) : (
                <Eye size={20} className="text-slate-500" />
              )}
            </button>

            {mostrarDocente && (
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-3">
                    Clave de respuestas
                  </h4>
                  <div className="space-y-2">
                    {examen.claveRespuestas.map((respuesta, index) => (
                      <div
                        key={index}
                        className="rounded-lg bg-slate-50 dark:bg-slate-800 p-3 text-sm text-slate-700 dark:text-slate-200"
                      >
                        {respuesta}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-3">
                    Criterios de evaluación
                  </h4>
                  <div className="space-y-3">
                    {examen.criteriosEvaluacion.map((criterio, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-slate-200 dark:border-slate-700 p-4"
                      >
                        <div className="flex justify-between gap-3">
                          <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                            {criterio.criterio}
                          </p>
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                            {criterio.puntaje} pts.
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                          {criterio.descripcion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-4">
                  <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-2">
                    Recomendaciones para el docente
                  </h4>
                  <p className="text-sm text-amber-900 dark:text-amber-100">
                    {examen.recomendacionesDocente}
                  </p>
                </div>
              </div>
            )}
          </Panel>

          {error && (
            <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 flex gap-2 text-sm text-red-700 dark:text-red-300">
              <AlertCircle size={19} />
              {error}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
