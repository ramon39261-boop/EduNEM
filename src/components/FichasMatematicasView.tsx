
import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  BookOpen,
  FileDown,
  Sparkles,
  Loader2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  ClipboardList
} from 'lucide-react';

import {
  ConfiguracionFichasMatematicas,
  FichaMatematica
} from '../types';

import { generarFichasMatematicas } from '../services/geminiService';
import { exportarFichasMatematicasWord } from '../lib/exportUtils';

const grados = [
  '1.º de primaria',
  '2.º de primaria',
  '3.º de primaria',
  '4.º de primaria',
  '5.º de primaria',
  '6.º de primaria'
];

const temas = [
  'Suma y resta',
  'Multiplicación y división',
  'Fracciones',
  'Geometría',
  'Medición',
  'Patrones numéricos',
  'Problemas matemáticos',
  'Números y operaciones',
  'Mixto'
] as const;

const dificultades = [
  { value: 'basica', label: 'Básica', description: 'Ejercicios para reforzar conocimientos fundamentales.' },
  { value: 'intermedia', label: 'Intermedia', description: 'Ejercicios que requieren aplicar conocimientos.' },
  { value: 'avanzada', label: 'Avanzada', description: 'Retos de razonamiento y mayor complejidad.' },
  { value: 'mixta', label: 'Mixta', description: 'Combinación de diferentes niveles.' }
] as const;

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100';

const labelClass =
  'mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200';

export default function FichasMatematicasView() {
  const [grado, setGrado] = useState('1.º de primaria');
  const [tema, setTema] = useState<ConfiguracionFichasMatematicas['tema']>('Suma y resta');
  const [subtema, setSubtema] = useState('');
  const [cantidad, setCantidad] = useState(10);
  const [dificultad, setDificultad] =
    useState<ConfiguracionFichasMatematicas['dificultad']>('intermedia');
  const [instruccionesAdicionales, setInstruccionesAdicionales] = useState('');

  const [ficha, setFicha] = useState<FichaMatematica | null>(null);
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState('');

  const handleGenerar = async () => {
    setGenerando(true);
    setError('');
    setFicha(null);

    const configuracion: ConfiguracionFichasMatematicas = {
      grado,
      tema,
      subtema: subtema.trim() || undefined,
      cantidadEjercicios: cantidad,
      dificultad,
      instruccionesAdicionales: instruccionesAdicionales.trim() || undefined
    };

    try {
      const resultado = await generarFichasMatematicas(configuracion);
      setFicha(resultado);
    } catch (err: any) {
      setError(
        err?.message ||
        'No fue posible generar la ficha. Por favor intenta nuevamente.'
      );
    } finally {
      setGenerando(false);
    }
  };

  const handleDescargar = () => {
    if (!ficha) return;

    try {
      exportarFichasMatematicasWord(ficha);
    } catch {
      setError('No fue posible descargar el documento Word.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">

      {/* ENCABEZADO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-600 p-6 text-white shadow-lg md:p-8">
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <Sparkles size={14} />
              HERRAMIENTA EDUCATIVA NEM
            </div>

            <h1 className="text-2xl font-bold md:text-3xl">
              Fichas de Matemáticas
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-emerald-50 md:text-base">
              Genera actividades matemáticas para estudiantes de primero a
              sexto de primaria, con ejercicios y respuestas para el docente.
            </p>
          </div>

          <div className="hidden h-24 w-24 items-center justify-center rounded-3xl bg-white/10 md:flex">
            <Calculator size={54} strokeWidth={1.5} />
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-16 -right-10 h-52 w-52 rounded-full border-[25px] border-white/5" />
      </div>

      {/* FORMULARIO */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-3">

          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <ClipboardList size={21} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 dark:text-white">
                Configurar ficha
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personaliza las actividades que necesitas.
              </p>
            </div>
          </div>

          {/* GRADO */}
          <div>
            <label className={labelClass}>
              <GraduationCap size={16} className="mr-1 inline" />
              Grado escolar
            </label>

            <select
              className={inputClass}
              value={grado}
              onChange={(e) => setGrado(e.target.value)}
            >
              {grados.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* TEMA */}
          <div>
            <label className={labelClass}>
              <BookOpen size={16} className="mr-1 inline" />
              Tema matemático
            </label>

            <select
              className={inputClass}
              value={tema}
              onChange={(e) =>
                setTema(e.target.value as ConfiguracionFichasMatematicas['tema'])
              }
            >
              {temas.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* SUBTEMA */}
          <div>
            <label className={labelClass}>
              Subtema (opcional)
            </label>

            <input
              type="text"
              className={inputClass}
              placeholder="Ej. Sumas llevando, tablas del 5, medios y cuartos..."
              value={subtema}
              onChange={(e) => setSubtema(e.target.value)}
              maxLength={150}
            />
          </div>

          {/* CANTIDAD */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className={labelClass + ' mb-0'}>
                Cantidad de ejercicios
              </label>
              <span className="rounded-lg bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                {cantidad} ejercicios
              </span>
            </div>

            <input
              type="range"
              min={5}
              max={20}
              step={1}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />

            <div className="flex justify-between text-xs text-slate-400">
              <span>5 ejercicios</span>
              <span>20 ejercicios</span>
            </div>
          </div>

          {/* DIFICULTAD */}
          <div>
            <label className={labelClass}>
              Nivel de dificultad
            </label>

            <div className="grid grid-cols-2 gap-2">
              {dificultades.map((d) => (
                <button
                  type="button"
                  key={d.value}
                  onClick={() =>
                    setDificultad(d.value as ConfiguracionFichasMatematicas['dificultad'])
                  }
                  className={`rounded-xl border p-3 text-left transition ${
                    dificultad === d.value
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100 dark:border-emerald-500 dark:bg-emerald-900/30 dark:ring-emerald-900'
                      : 'border-slate-200 bg-white hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-800'
                  }`}
                >
                  <span className="block text-sm font-bold text-slate-800 dark:text-white">
                    {d.label}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {d.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* INDICACIONES */}
          <div>
            <label className={labelClass}>
              Indicaciones adicionales (opcional)
            </label>

            <textarea
              className={inputClass + ' min-h-24 resize-y'}
              placeholder="Ej. Utilizar ejemplos de la vida cotidiana, incluir problemas con dinero mexicano..."
              value={instruccionesAdicionales}
              onChange={(e) => setInstruccionesAdicionales(e.target.value)}
              maxLength={1000}
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* BOTÓN GENERAR */}
          <button
            type="button"
            onClick={handleGenerar}
            disabled={generando}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white shadow-md transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {generando ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generando ficha...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Generar ficha de matemáticas
              </>
            )}
          </button>

          {generando && (
            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              Agnes AI está preparando los ejercicios y verificando las respuestas.
            </p>
          )}
        </div>

        {/* PANEL INFORMATIVO */}
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 font-bold text-slate-800 dark:text-white">
              ¿Qué incluye tu ficha?
            </h3>

            <div className="space-y-4">
              {[
                'Actividades adecuadas al grado escolar.',
                'Ejercicios de acuerdo con el tema seleccionado.',
                'Espacios para desarrollar procedimientos.',
                'Clave de respuestas para el docente.',
                'Recomendaciones para trabajar en clase.'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <div className="mb-2 flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
              <FileDown size={20} />
              <h3 className="font-bold">Documento Word</h3>
            </div>

            <p className="text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-200/80">
              Descarga tu ficha en formato Word editable. Podrás modificar
              textos, instrucciones y ejercicios antes de imprimirla.
            </p>
          </div>
        </div>
      </div>

      {/* RESULTADO */}
      {ficha && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm dark:border-emerald-900 dark:bg-slate-900"
        >
          <div className="flex flex-col gap-3 border-b border-slate-100 bg-emerald-50 p-5 dark:border-slate-800 dark:bg-emerald-950/30 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 size={18} />
                <span className="text-xs font-bold uppercase tracking-wide">
                  Ficha generada correctamente
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                {ficha.titulo}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {ficha.grado} · {ficha.tema}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleGenerar}
                disabled={generando}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <RefreshCw size={16} />
                Nueva ficha
              </button>

              <button
                type="button"
                onClick={handleDescargar}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                <FileDown size={17} />
                Descargar Word
              </button>
            </div>
          </div>

          <div className="space-y-5 p-5 md:p-7">

            {ficha.objetivo && (
              <div className="rounded-xl border-l-4 border-emerald-600 bg-slate-50 p-4 dark:bg-slate-800/70">
                <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  Propósito de aprendizaje
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  {ficha.objetivo}
                </p>
              </div>
            )}

            <div>
              <h3 className="mb-2 font-bold text-slate-800 dark:text-white">
                Instrucciones
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {ficha.instrucciones}
              </p>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Ejercicios
                </h3>
                <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {ficha.ejercicios.length} actividades
                </span>
              </div>

              <div className="space-y-4">
                {ficha.ejercicios.map((ejercicio, index) => (
                  <div
                    key={`${ejercicio.numero}-${index}`}
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                        {ejercicio.numero || index + 1}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
                          {ejercicio.enunciado}
                        </p>

                        {ejercicio.opciones && ejercicio.opciones.length > 0 && (
                          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {ejercicio.opciones.map((opcion, i) => (
                              <div
                                key={i}
                                className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                              >
                                <strong>{String.fromCharCode(65 + i)}.</strong> {opcion}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 space-y-3">
                          {Array.from({
                            length: Math.max(
                              1,
                              Math.min(5, Number(ejercicio.espacioRespuesta) || 2)
                            )
                          }).map((_, i) => (
                            <div
                              key={i}
                              className="h-5 border-b border-dashed border-slate-300 dark:border-slate-600"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {ficha.recomendacionesDocente && (
              <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-950/30">
                <h3 className="mb-2 text-sm font-bold text-amber-800 dark:text-amber-300">
                  Recomendaciones para el docente
                </h3>
                <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                  {ficha.recomendacionesDocente}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                La clave de respuestas se incluye en una sección independiente del documento Word.
              </p>
              <button
                type="button"
                onClick={handleDescargar}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                <FileDown size={18} />
                Descargar ficha en Word
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
