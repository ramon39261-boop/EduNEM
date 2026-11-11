/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Layout, 
  Image as ImageIcon, 
  Download, 
  FileText, 
  Plus, 
  ChevronRight, 
  Sparkles, 
  Loader2,
  Home,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { cn } from './lib/utils';
import { 
  generarPlaneacion, 
  generarProyecto, 
  generarIlustracion 
} from './services/geminiService';
import { 
  Planeacion, 
  Proyecto, 
  CampoFormativo, 
  EjeArticulador, 
  Metodologia 
} from './types';
import { 
  getContenidosNEM, 
  getProblematicasNEM, 
  getLibrosTextoNEM, 
  getContenidosPorLibro, 
  getCampoFromLibro,
  getLeccionesPorLibro 
} from './data/nemCurriculum';
import { 
  exportarPlaneacionWord, 
  exportarProyectoWord 
} from './lib/exportUtils';

const CAMPOS_FORMATIVOS: CampoFormativo[] = [
  "Lenguajes",
  "Saberes y Pensamiento Científico",
  "Ética, Naturaleza y Sociedades",
  "De lo Humano y lo Comunitario"
];

const EJES_ARTICULADORES: EjeArticulador[] = [
  "Inclusión",
  "Pensamiento Crítico",
  "Interculturalidad Crítica",
  "Igualdad de Género",
  "Vida Saludable",
  "Apropiación de las culturas a través de la lectura y la escritura",
  "Artes y Experiencias Estéticas"
];

const METODOLOGIAS: Metodologia[] = [
  "Aprendizaje Basado en Proyectos Comunitarios (ABPC)",
  "Aprendizaje Basado en Indagación (STEAM)",
  "Aprendizaje Basado en Problemas (ABP)",
  "Aprendizaje Servicio (AS)"
];

const GRADOS_ESCOLARES = [
  {
    fase: "Fase 3 - Primaria (1º y 2º)",
    grados: [
      "1º de Primaria",
      "2º de Primaria",
    ],
  },
  {
    fase: "Fase 4 - Primaria (3º y 4º)",
    grados: [
      "3º de Primaria",
      "4º de Primaria",
    ],
  },
  {
    fase: "Fase 5 - Primaria (5º y 6º)",
    grados: [
      "5º de Primaria",
      "6º de Primaria",
    ],
  },
];

type View = 'home' | 'planeacion' | 'proyecto' | 'ilustracion';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView setView={setCurrentView} />;
      case 'planeacion': return <PlaneacionView />;
      case 'proyecto': return <ProyectoView />;
      case 'ilustracion': return <IlustracionView />;
      default: return <HomeView setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-nem-cream">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <BookOpen className="text-nem-green" />
          <span className="font-serif text-xl font-bold">EduNEM</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-0 z-50 md:relative md:z-0 transform transition-transform duration-300 ease-in-out bg-white border-r border-slate-200 w-64 p-6 flex flex-col gap-8",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="hidden md:flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-nem-green rounded-xl flex items-center justify-center text-white">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold leading-none">EduNEM</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Ciclo 2025-2026</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <NavItem 
            active={currentView === 'home'} 
            onClick={() => { setCurrentView('home'); setIsSidebarOpen(false); }} 
            icon={<Home size={20} />} 
            label="Inicio" 
          />
          <NavItem 
            active={currentView === 'planeacion'} 
            onClick={() => { setCurrentView('planeacion'); setIsSidebarOpen(false); }} 
            icon={<FileText size={20} />} 
            label="Planeaciones" 
          />
          <NavItem 
            active={currentView === 'proyecto'} 
            onClick={() => { setCurrentView('proyecto'); setIsSidebarOpen(false); }} 
            icon={<Layout size={20} />} 
            label="Proyectos" 
          />
          <NavItem 
            active={currentView === 'ilustracion'} 
            onClick={() => { setCurrentView('ilustracion'); setIsSidebarOpen(false); }} 
            icon={<ImageIcon size={20} />} 
            label="Ilustraciones" 
          />
        </nav>

        <div className="mt-auto p-4 bg-nem-cream rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-500 italic font-serif">"La educación es el arma más poderosa para cambiar el mundo."</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-6xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left",
        active 
          ? "bg-nem-green text-white shadow-lg shadow-nem-green/20" 
          : "text-slate-500 hover:bg-slate-50"
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function HomeView({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="space-y-12 py-8">
      <header className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-serif font-bold text-slate-900"
        >
          Transforma tu labor <span className="italic text-nem-green underline decoration-nem-gold/30">docente</span>
        </motion.h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          EduNEM es tu asistente inteligente diseñado para la Nueva Escuela Mexicana. 
          Optimiza tus tiempos administrativos y enfócate en lo que realmente importa: tus alumnos.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<FileText className="text-blue-500" />}
          title="Planeaciones Didácticas"
          description="Genera secuencias completas con Campos Formativos y PDA del ciclo 2025-2026."
          onClick={() => setView('planeacion')}
          color="bg-blue-50"
        />
        <FeatureCard 
          icon={<Layout className="text-purple-500" />}
          title="Proyectos Escolares"
          description="Diseña proyectos sociocríticos basados en problemáticas reales de tu comunidad."
          onClick={() => setView('proyecto')}
          color="bg-purple-50"
        />
        <FeatureCard 
          icon={<ImageIcon className="text-orange-500" />}
          title="Ilustraciones Educativas"
          description="Crea recursos visuales personalizados y limpios para tus clases con IA."
          onClick={() => setView('ilustracion')}
          color="bg-orange-50"
        />
      </div>

      <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h3 className="text-3xl font-serif font-bold">¿Por qué usar EduNEM?</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 className="text-nem-green" size={18} />
              <span>Alineación total con los programas NEM 2025-2026.</span>
            </li>
            <li className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 className="text-nem-green" size={18} />
              <span>Metodologías sociocríticas integradas (STEAM, ABP, AS).</span>
            </li>
            <li className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 className="text-nem-green" size={18} />
              <span>Exportación fácil a formatos editables.</span>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 aspect-video bg-nem-green/10 rounded-3xl flex items-center justify-center">
          <Sparkles className="text-nem-green animate-pulse" size={48} />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, onClick, color }: { icon: React.ReactNode, title: string, description: string, onClick: () => void, color: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-8 text-left glass-card hover:translate-y-[-8px] transition-all group",
        color
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{description}</p>
      <div className="flex items-center text-nem-green font-bold text-xs uppercase tracking-widest">
        Comenzar <ChevronRight size={16} />
      </div>
    </button>
  );
}

function LoadingCard({
  title,
  steps,
  seconds,
  onCancel,
}: {
  title: string;
  steps: string[];
  seconds: number;
  onCancel: () => void;
}) {
  const currentStep = steps[Math.min(Math.floor(seconds / 2.5), steps.length - 1)];

  return (
    <div className="h-full min-h-[420px] glass-card flex flex-col items-center justify-center p-8 text-center bg-white/95 shadow-sm">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-nem-green/20 border-t-nem-green animate-spin" />
        <Sparkles className="text-nem-green absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" size={24} />
      </div>

      <h3 className="text-2xl font-serif font-bold text-nem-green mb-2">{title}</h3>
      <p className="text-sm font-medium text-slate-700 min-h-[24px] max-w-sm transition-all duration-300">
        {currentStep}
      </p>

      <div className="w-56 bg-slate-100 rounded-full h-1.5 my-4 overflow-hidden">
        <div
          className="bg-nem-green h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(15 + seconds * 14, 94)}%` }}
        />
      </div>

      <span className="text-xs text-slate-400 font-mono mb-6">
        Tiempo transcurrido: {seconds}s
      </span>

      <button
        type="button"
        onClick={onCancel}
        className="text-xs font-medium text-slate-500 hover:text-red-600 px-4 py-2 rounded-xl border border-slate-200 hover:border-red-200 transition-colors"
      >
        Cancelar operación
      </button>
    </div>
  );
}

function PlaneacionView() {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Planeacion | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [formData, setFormData] = useState(() => {
    const gradoInicial = '1º de Primaria';
    const librosIniciales = getLibrosTextoNEM(gradoInicial);
    const libroInicial = librosIniciales[0] || 'Proyectos de Aula';
    const lecciones = getLeccionesPorLibro(gradoInicial, libroInicial);
    return {
      leccion: lecciones[0] || 'Nombrario del grupo (Pág. 18)',
      grado: gradoInicial,
      libroTexto: libroInicial,
      ejes: [] as EjeArticulador[]
    };
  });

  const librosDisponibles = getLibrosTextoNEM(formData.grado);
  const leccionesSugeridas = getLeccionesPorLibro(formData.grado, formData.libroTexto);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setSeconds(0);
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleCancel = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setLoading(false);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.leccion.trim()) return;

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const campoVinculado = getCampoFromLibro(formData.libroTexto);
      const prompt = `Genera una planeación didáctica detallada para el ciclo escolar 2025-2026 de la Nueva Escuela Mexicana (NEM).
      Grado Escolar: ${formData.grado}
      Libro de Texto SEP: ${formData.libroTexto}
      Lección del Libro: ${formData.leccion}
      Campo Formativo Vinculado: ${campoVinculado}
      Ejes Articuladores: ${formData.ejes.join(', ')}
      Incluye: Título creativo, vinculación explícita con la lección "${formData.leccion}" del libro oficial "${formData.libroTexto}", PDA específico del programa de estudios 2025-2026, secuencia didáctica completa (Inicio, Desarrollo, Cierre) con actividades didácticas concretas y tiempos sugeridos, evaluación formativa y recursos necesarios.`;
      
      const data = await generarPlaneacion(prompt, controller.signal);
      setResult({
        ...data,
        libroTexto: data.libroTexto || formData.libroTexto,
        campoFormativo: data.campoFormativo || campoVinculado
      });
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || "Ocurrió un error inesperado al generar la planeación.");
        console.error(err);
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const downloadDoc = () => {
    if (!result) return;
    exportarPlaneacionWord(result, {
      leccion: formData.leccion,
      libroTexto: formData.libroTexto,
    });
  };

  const steps = [
    "Alineando con el Plan y Programas de Estudio NEM 2025-2026...",
    "Vinculando con la lección del Libro de Texto Gratuito...",
    "Definiendo Procesos de Desarrollo de Aprendizaje (PDA)...",
    "Estructurando momentos: Inicio, Desarrollo y Cierre...",
    "Generando criterios de evaluación formativa y recursos...",
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-serif font-bold">Generador de Planeaciones</h2>
        <p className="text-slate-500">Crea secuencias didácticas alineadas a las lecciones de los libros de texto de la NEM en segundos.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleGenerate} className="glass-card p-8 space-y-6 h-fit">
          {/* 1. Selección de Grado Escolar y Libro de Texto SEP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-400">1. Grado Escolar</label>
              <select 
                className="nem-input cursor-pointer bg-white"
                value={formData.grado}
                onChange={e => {
                  const nuevoGrado = e.target.value;
                  const nuevosLibros = getLibrosTextoNEM(nuevoGrado);
                  const nuevoLibro = nuevosLibros[0] || 'Proyectos de Aula';
                  const nuevasLecciones = getLeccionesPorLibro(nuevoGrado, nuevoLibro);
                  setFormData({
                    ...formData,
                    grado: nuevoGrado,
                    libroTexto: nuevoLibro,
                    leccion: nuevasLecciones[0] || formData.leccion
                  });
                }}
              >
                {GRADOS_ESCOLARES.map((grupo) => (
                  <optgroup key={grupo.fase} label={grupo.fase}>
                    {grupo.grados.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  2. Libro de Texto SEP
                </label>
                <span className="text-[10px] font-bold text-nem-green bg-nem-green/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <BookOpen size={10} /> Oficial
                </span>
              </div>
              <select 
                className="nem-input cursor-pointer bg-white font-medium text-sm"
                value={formData.libroTexto}
                onChange={e => {
                  const nuevoLibro = e.target.value;
                  const nuevasLecciones = getLeccionesPorLibro(formData.grado, nuevoLibro);
                  setFormData({
                    ...formData,
                    libroTexto: nuevoLibro,
                    leccion: nuevasLecciones[0] || formData.leccion
                  });
                }}
              >
                {librosDisponibles.map(libro => (
                  <option key={libro} value={libro}>
                    📖 {libro}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Menú Desplegable Dinámico con las Lecciones del Libro Seleccionado */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-400">
                3. Lección del Libro
              </label>
              <span className="text-[11px] font-semibold text-nem-green bg-nem-green/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                <BookOpen size={11} /> Lecciones Oficiales
              </span>
            </div>

            {/* Menú Desplegable con las lecciones oficiales del libro elegido */}
            <select
              className="nem-input cursor-pointer bg-white text-sm"
              value={leccionesSugeridas.includes(formData.leccion) ? formData.leccion : '__custom__'}
              onChange={e => {
                if (e.target.value !== '__custom__') {
                  setFormData({...formData, leccion: e.target.value});
                }
              }}
            >
              <option value="" disabled>-- Selecciona una lección del libro --</option>
              {leccionesSugeridas.map((lec) => (
                <option key={lec} value={lec}>
                  {lec}
                </option>
              ))}
              <option value="__custom__">✏️ Escribir otra lección o página personalizada...</option>
            </select>

            {/* Campo editable para ajustar o escribir libremente */}
            <textarea 
              required
              rows={2}
              className="nem-input text-sm resize-none mt-2" 
              placeholder="Selecciona una lección del menú desplegable o escribe una lección/página específica..." 
              value={formData.leccion}
              onChange={e => setFormData({...formData, leccion: e.target.value})}
            />

            {/* Píldoras de sugerencias rápidas */}
            <div className="pt-1">
              <p className="text-[11px] text-slate-400 mb-1.5 font-medium">Lecciones sugeridas de {formData.libroTexto}:</p>
              <div className="flex flex-wrap gap-1.5">
                {leccionesSugeridas.slice(0, 4).map((lec) => (
                  <button
                    key={lec}
                    type="button"
                    onClick={() => setFormData({...formData, leccion: lec})}
                    className={cn(
                      "text-[11px] px-2.5 py-1 rounded-lg border text-left transition-all",
                      formData.leccion === lec
                        ? "bg-nem-green text-white border-nem-green shadow-sm font-medium"
                        : "bg-white border-slate-200 text-slate-600 hover:border-nem-green/50 hover:bg-slate-50"
                    )}
                  >
                    • {lec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Ejes Articuladores (Selecciona varios)</label>
            <div className="flex flex-wrap gap-2">
              {EJES_ARTICULADORES.map(eje => (
                <button
                  key={eje}
                  type="button"
                  onClick={() => {
                    const newEjes = formData.ejes.includes(eje) 
                      ? formData.ejes.filter(e => e !== eje)
                      : [...formData.ejes, eje];
                    setFormData({...formData, ejes: newEjes});
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                    formData.ejes.includes(eje) 
                      ? "bg-nem-green text-white border-nem-green shadow-sm" 
                      : "bg-white text-slate-500 border-slate-200 hover:border-nem-green/50"
                  )}
                >
                  {eje}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="nem-button w-full flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            {loading ? `Generando planeación (${seconds}s)...` : "Generar Planeación"}
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2">
              <div className="flex gap-2 text-red-700 text-sm font-medium items-start">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p className="flex-1">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="text-xs text-red-700 hover:text-red-900 font-bold underline flex items-center gap-1 mt-1"
              >
                <RotateCcw size={12} /> Reintentar ahora
              </button>
            </div>
          )}
        </form>

        <div className="space-y-6">
          {loading ? (
            <LoadingCard
              title="Elaborando Secuencia Didáctica"
              steps={steps}
              seconds={seconds}
              onCancel={handleCancel}
            />
          ) : result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 space-y-6 bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-nem-green">{result.titulo}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-nem-green/10 text-nem-green">
                      {result.grado}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1">
                      <BookOpen size={12} /> {result.libroTexto || 'Libro de Texto SEP'}
                    </span>
                    {formData.leccion && (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/50">
                        📌 {formData.leccion}
                      </span>
                    )}
                    {result.campoFormativo && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {result.campoFormativo}
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={downloadDoc}
                  type="button"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-nem-green text-white hover:bg-nem-green/90 transition-all shadow-sm shrink-0"
                  title="Descargar documento idéntico para Microsoft Word"
                >
                  <Download size={15} />
                  <span>Descargar Word (.doc)</span>
                </button>
              </div>

              <div className="space-y-4">
                <Section title="PDA (Proceso de Desarrollo de Aprendizaje)" content={result.pda} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Section title="Inicio" content={result.inicio} />
                  <Section title="Desarrollo" content={result.desarrollo} />
                  <Section title="Cierre" content={result.cierre} />
                </div>
                <Section title="Evaluación Formativa" content={result.evaluacion} />
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Recursos</h4>
                  <div className="flex flex-wrap gap-2">
                    {(result.recursos || []).map((r, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-600">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[420px] glass-card flex flex-col items-center justify-center text-slate-300 p-8 text-center">
              <FileText size={64} className="mb-4 opacity-20" />
              <p className="font-serif text-xl text-slate-600">Tu planeación aparecerá aquí</p>
              <p className="text-sm text-slate-400 max-w-xs mt-1">Completa el formulario y deja que la IA trabaje por ti.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string, content: string }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">{title}</h4>
      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{content || 'En desarrollo'}</p>
    </div>
  );
}

function ProyectoView() {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Proyecto | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [formData, setFormData] = useState(() => {
    const gradoInicial = '1º de Primaria';
    const sugeridas = getProblematicasNEM(gradoInicial);
    return {
      problematica: sugeridas[0] || 'Exceso de basura plástica y envolturas a la hora del recreo escolar',
      metodologia: METODOLOGIAS[0],
      grado: gradoInicial
    };
  });

  const problematicasSugeridas = getProblematicasNEM(formData.grado);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setSeconds(0);
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleCancel = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setLoading(false);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.problematica.trim()) return;

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const prompt = `Diseña un proyecto escolar sociocrítico para la Nueva Escuela Mexicana (NEM) ciclo 2025-2026.
      Problemática: ${formData.problematica}
      Metodología: ${formData.metodologia}
      Grado: ${formData.grado}
      Incluye: Nombre creativo del proyecto, propósito, fases detalladas según la metodología elegida y producto final.`;
      
      const data = await generarProyecto(prompt, controller.signal);
      setResult(data);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || "Ocurrió un error inesperado al diseñar el proyecto.");
        console.error(err);
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const downloadDoc = () => {
    if (!result) return;
    exportarProyectoWord(result, {
      grado: formData.grado,
    });
  };

  const steps = [
    "Analizando problemática real de la comunidad escolar...",
    "Articulando las fases de la metodología sociocrítica elegida...",
    "Formulando actividades colaborativas y momentos de indagación...",
    "Definiendo el producto final y estrategias de evaluación...",
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-serif font-bold">Diseñador de Proyectos</h2>
        <p className="text-slate-500">Proyectos sociocríticos basados en la realidad de tu comunidad.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleGenerate} className="glass-card p-8 space-y-6 h-fit">
          {/* Grado y Metodología en primer lugar */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-400">1. Grado Escolar</label>
              <select 
                className="nem-input cursor-pointer bg-white"
                value={formData.grado}
                onChange={e => {
                  const nuevoGrado = e.target.value;
                  const nuevasProblemas = getProblematicasNEM(nuevoGrado);
                  setFormData({
                    ...formData, 
                    grado: nuevoGrado,
                    problematica: nuevasProblemas[0] || formData.problematica
                  });
                }}
              >
                {GRADOS_ESCOLARES.map((grupo) => (
                  <optgroup key={grupo.fase} label={grupo.fase}>
                    {grupo.grados.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-400">2. Metodología</label>
              <select 
                className="nem-input cursor-pointer bg-white"
                value={formData.metodologia}
                onChange={e => setFormData({...formData, metodologia: e.target.value as Metodologia})}
              >
                {METODOLOGIAS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* Problemática contextual con selector dinámico */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-400">
                3. Problemática de la Comunidad
              </label>
              <span className="text-[11px] font-semibold text-nem-green bg-nem-green/10 px-2 py-0.5 rounded-md">
                NEM 2025-2026
              </span>
            </div>

            {/* Menú Desplegable con problemáticas sugeridas por grado */}
            <select
              className="nem-input cursor-pointer bg-white text-sm"
              value={problematicasSugeridas.includes(formData.problematica) ? formData.problematica : '__custom__'}
              onChange={e => {
                if (e.target.value !== '__custom__') {
                  setFormData({...formData, problematica: e.target.value});
                }
              }}
            >
              <option value="" disabled>-- Selecciona una problemática común del grado --</option>
              {problematicasSugeridas.map((prob) => (
                <option key={prob} value={prob}>
                  {prob}
                </option>
              ))}
              <option value="__custom__">✏️ Escribir otra problemática comunitaria personalizada...</option>
            </select>

            <textarea 
              required
              rows={2}
              className="nem-input text-sm resize-none mt-2" 
              placeholder="Elige una problemática de la lista o escribe una situación específica de tu comunidad..." 
              value={formData.problematica}
              onChange={e => setFormData({...formData, problematica: e.target.value})}
            />

            {/* Píldoras de sugerencias rápidas */}
            <div className="pt-1">
              <p className="text-[11px] text-slate-400 mb-1.5 font-medium">Sugerencias para {formData.grado}:</p>
              <div className="flex flex-wrap gap-1.5">
                {problematicasSugeridas.slice(0, 3).map((prob) => (
                  <button
                    key={prob}
                    type="button"
                    onClick={() => setFormData({...formData, problematica: prob})}
                    className={cn(
                      "text-[11px] px-2.5 py-1 rounded-lg border text-left transition-all",
                      formData.problematica === prob
                        ? "bg-nem-green text-white border-nem-green shadow-sm font-medium"
                        : "bg-white border-slate-200 text-slate-600 hover:border-nem-green/50 hover:bg-slate-50"
                    )}
                  >
                    • {prob}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="nem-button w-full flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            {loading ? `Diseñando proyecto (${seconds}s)...` : "Diseñar Proyecto"}
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2">
              <div className="flex gap-2 text-red-700 text-sm font-medium items-start">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p className="flex-1">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="text-xs text-red-700 hover:text-red-900 font-bold underline flex items-center gap-1 mt-1"
              >
                <RotateCcw size={12} /> Reintentar ahora
              </button>
            </div>
          )}
        </form>

        <div className="space-y-6">
          {loading ? (
            <LoadingCard
              title="Diseñando Proyecto Sociocrítico"
              steps={steps}
              seconds={seconds}
              onCancel={handleCancel}
            />
          ) : result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 space-y-6 bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-nem-green">{result.nombre}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-nem-green/10 text-nem-green">
                      {formData.grado}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {result.metodologia}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={downloadDoc}
                  type="button"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-nem-green text-white hover:bg-nem-green/90 transition-all shadow-sm shrink-0"
                  title="Descargar documento idéntico para Microsoft Word"
                >
                  <Download size={15} />
                  <span>Descargar Word (.doc)</span>
                </button>
              </div>

              <div className="space-y-4">
                <Section title="Propósito" content={result.proposito} />
                <div className="space-y-6">
                  {(result.fases || []).map((fase, i) => (
                    <div key={i} className="p-4 bg-nem-cream/50 rounded-2xl border border-nem-green/10">
                      <h4 className="text-sm font-bold text-nem-green mb-2">{fase.nombre}</h4>
                      <ul className="space-y-1">
                        {(fase.actividades || []).map((act, j) => (
                          <li key={j} className="text-xs text-slate-600 flex gap-2">
                            <span className="text-nem-green">•</span> {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Section title="Producto Final" content={result.productoFinal} />
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[420px] glass-card flex flex-col items-center justify-center text-slate-300 p-8 text-center">
              <Layout size={64} className="mb-4 opacity-20" />
              <p className="font-serif text-xl text-slate-600">Tu proyecto aparecerá aquí</p>
              <p className="text-sm text-slate-400 max-w-xs mt-1">Define la problemática y elige una metodología para comenzar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function IlustracionView() {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setSeconds(0);
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleCancel = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setLoading(false);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const url = await generarIlustracion(prompt, controller.signal);
      setImage(url);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || "Ocurrió un error inesperado al generar la ilustración.");
        console.error(err);
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const downloadImage = () => {
    if (!image) return;
    const isSvg = image.startsWith('data:image/svg+xml');
    const extension = isSvg ? 'svg' : 'png';
    const link = document.createElement('a');
    link.href = image;
    link.download = `Ilustracion_EduNEM_${Date.now()}.${extension}`;
    link.click();
  };

  const steps = [
    "Interpretando el concepto pedagógico para el aula...",
    "Generando trazado limpio y colorido sin texto...",
    "Optimizando contraste y legibilidad para los estudiantes...",
    "Finalizando recurso didáctico de alta definición...",
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-serif font-bold">Creador de Ilustraciones</h2>
        <p className="text-slate-500">Recursos visuales didácticos sin texto y con estilo limpio.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleGenerate} className="glass-card p-8 space-y-6 h-fit">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Descripción del Recurso</label>
            <textarea 
              required
              rows={4}
              className="nem-input resize-none" 
              placeholder="Ej. Un ciclo del agua simplificado para niños de primaria, una célula vegetal con sus partes principales, plato del bien comer..." 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-2xl flex gap-3 text-blue-700 text-sm">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p>La IA generará una ilustración limpia y sin texto, permitiendo que tus alumnos puedan rotular las partes manualmente en clase.</p>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="nem-button w-full flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            {loading ? `Dibujando recurso (${seconds}s)...` : "Generar Ilustración"}
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2">
              <div className="flex gap-2 text-red-700 text-sm font-medium items-start">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p className="flex-1">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="text-xs text-red-700 hover:text-red-900 font-bold underline flex items-center gap-1 mt-1"
              >
                <RotateCcw size={12} /> Reintentar ahora
              </button>
            </div>
          )}
        </form>

        <div className="space-y-6">
          {loading ? (
            <LoadingCard
              title="Dibujando Recurso Visual"
              steps={steps}
              seconds={seconds}
              onCancel={handleCancel}
            />
          ) : image ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-4 space-y-4 bg-white"
            >
              <div className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center bg-white p-2">
                <img src={image} alt="Ilustración didáctica generada" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={downloadImage}
                    className="bg-white text-nem-green p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
                    title="Descargar ilustración"
                  >
                    <Download size={32} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center px-2">
                <p className="text-xs text-slate-500 italic">Haz clic en la imagen o en el botón para descargar en alta calidad.</p>
                <button
                  onClick={downloadImage}
                  className="text-xs font-semibold text-nem-green hover:underline flex items-center gap-1"
                >
                  <Download size={14} /> Descargar
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[420px] glass-card flex flex-col items-center justify-center text-slate-300 p-8 text-center">
              <ImageIcon size={64} className="mb-4 opacity-20" />
              <p className="font-serif text-xl text-slate-600">Tu ilustración aparecerá aquí</p>
              <p className="text-sm text-slate-400 max-w-xs mt-1">Describe lo que necesitas y la IA creará el recurso visual para tu clase.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
