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
  ChevronRight, 
  Sparkles, 
  Loader2,
  Home,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Copy,
  Check,
  GraduationCap,
  Layers,
  Wand2
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
  EjeArticulador, 
  Metodologia 
} from './types';
import { 
  getProblematicasNEM, 
  getLibrosTextoNEM, 
  getCampoFromLibro,
  getLeccionesPorLibro 
} from './data/nemCurriculum';
import { 
  exportarPlaneacionWord, 
  exportarProyectoWord 
} from './lib/exportUtils';

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
    grados: ["1º de Primaria", "2º de Primaria"],
  },
  {
    fase: "Fase 4 - Primaria (3º y 4º)",
    grados: ["3º de Primaria", "4º de Primaria"],
  },
  {
    fase: "Fase 5 - Primaria (5º y 6º)",
    grados: ["5º de Primaria", "6º de Primaria"],
  },
];

const EJEMPLOS_ILUSTRACION = [
  "El ciclo del agua simplificado para niños de primaria",
  "Plato del Bien Comer con grupos de alimentos",
  "Partes de una planta con raíz, tallo, hojas y flor",
  "Sistema solar con los planetas alrededor del sol"
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
    <div className="min-h-screen flex flex-col md:flex-row bg-nem-cream text-slate-800">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3.5 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2.5 text-left"
        >
          <div className="w-9 h-9 bg-nem-green rounded-xl flex items-center justify-center text-white shadow-xs">
            <BookOpen size={18} />
          </div>
          <div>
            <span className="font-serif text-lg font-extrabold text-slate-900 block leading-none">EduNEM</span>
            <span className="text-[10px] font-semibold text-nem-gold uppercase tracking-wider">2025 – 2026</span>
          </div>
        </button>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Abrir menú"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-xs md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 md:sticky md:top-0 md:h-screen transform transition-transform duration-300 ease-out bg-white border-r border-slate-200/80 w-72 p-6 flex flex-col justify-between shrink-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => { setCurrentView('home'); setIsSidebarOpen(false); }}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-11 h-11 bg-nem-green rounded-2xl flex items-center justify-center text-white shadow-md shadow-nem-green/15 group-hover:scale-105 transition-transform">
                <BookOpen size={22} />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-extrabold text-slate-900 leading-none">EduNEM</h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Ciclo 2025-2026</p>
                </div>
              </div>
            </button>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <div className="space-y-1.5">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Espacio de Trabajo
            </p>
            <nav className="flex flex-col gap-1">
              <NavItem 
                active={currentView === 'home'} 
                onClick={() => { setCurrentView('home'); setIsSidebarOpen(false); }} 
                icon={<Home size={19} />} 
                label="Inicio" 
              />
              <NavItem 
                active={currentView === 'planeacion'} 
                onClick={() => { setCurrentView('planeacion'); setIsSidebarOpen(false); }} 
                icon={<FileText size={19} />} 
                label="Planeaciones" 
                badge="SEP"
              />
              <NavItem 
                active={currentView === 'proyecto'} 
                onClick={() => { setCurrentView('proyecto'); setIsSidebarOpen(false); }} 
                icon={<Layout size={19} />} 
                label="Proyectos" 
              />
              <NavItem 
                active={currentView === 'ilustracion'} 
                onClick={() => { setCurrentView('ilustracion'); setIsSidebarOpen(false); }} 
                icon={<ImageIcon size={19} />} 
                label="Ilustraciones" 
                badge="IA"
              />
            </nav>
          </div>
        </div>

        {/* Footer Card */}
        <div className="p-4 bg-nem-cream rounded-2xl border border-slate-200/60 space-y-2">
          <div className="flex items-center gap-2 text-nem-green font-bold text-xs">
            <GraduationCap size={16} />
            <span>Nueva Escuela Mexicana</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Alineado a los Libros de Texto Gratuitos y Programas Sintéticos vigentes.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ 
  active, 
  onClick, 
  icon, 
  label,
  badge
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all text-left font-medium text-sm cursor-pointer",
        active 
          ? "text-white" 
          : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
      )}
    >
      {active && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute inset-0 bg-nem-green rounded-2xl shadow-md shadow-nem-green/20"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </span>
      {badge && (
        <span className={cn(
          "relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-full",
          active 
            ? "bg-white/20 text-white" 
            : "bg-slate-100 text-slate-500"
        )}>
          {badge}
        </span>
      )}
    </button>
  );
}

function HomeView({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="space-y-10 py-2 md:py-6">
      {/* Hero Section */}
      <header className="glass-card p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-white via-white to-nem-green/[0.04]">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-nem-green/10 text-nem-green text-xs font-bold">
            <Sparkles size={14} className="text-nem-gold" />
            <span>Asistente Pedagógico Inteligente • Primaria 1º a 6º</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-slate-900 leading-[1.15]">
            Diseña tus clases de la <span className="text-nem-green">Nueva Escuela Mexicana</span> en minutos
          </h2>
          
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl">
            Automatiza tus planeaciones didácticas vinculadas a los libros SEP, estructura proyectos sociocríticos y crea láminas educativas listas para el aula.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setView('planeacion')}
              className="nem-button flex items-center gap-2"
            >
              <FileText size={18} />
              <span>Crear Planeación Didáctica</span>
            </button>
            <button
              onClick={() => setView('proyecto')}
              className="px-5 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Layout size={18} className="text-nem-green" />
              <span>Diseñar Proyecto</span>
            </button>
          </div>
        </div>
      </header>

      {/* Feature Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Herramientas Docentes</h3>
          <span className="text-xs text-slate-400 font-medium">Selecciona un módulo para comenzar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard 
            icon={<FileText className="text-emerald-600" size={24} />}
            iconBg="bg-emerald-50"
            tag="Libros SEP"
            title="Planeaciones Didácticas"
            description="Secuencias completas con PDA, Inicio, Desarrollo, Cierre y evaluación formativa vinculadas a cada lección."
            onClick={() => setView('planeacion')}
          />
          <FeatureCard 
            icon={<Layout className="text-amber-600" size={24} />}
            iconBg="bg-amber-50"
            tag="Metodologías NEM"
            title="Proyectos Escolares"
            description="Diseña proyectos sociocríticos (ABPC, STEAM, ABP, AS) partiendo de problemáticas reales de tu comunidad."
            onClick={() => setView('proyecto')}
          />
          <FeatureCard 
            icon={<ImageIcon className="text-sky-600" size={24} />}
            iconBg="bg-sky-50"
            tag="Visuales sin texto"
            title="Ilustraciones Educativas"
            description="Genera esquemas y dibujos didácticos limpios para que tus alumnos los puedan rotular y colorear en clase."
            onClick={() => setView('ilustracion')}
          />
        </div>
      </div>

      {/* Benefits Strip */}
      <div className="glass-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        <div className="flex items-start gap-3.5 pt-2 md:pt-0">
          <div className="p-2 rounded-xl bg-nem-green/10 text-nem-green shrink-0 mt-0.5">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Catálogo Oficial 2025-2026</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Lecciones indexadas por grado y libro de texto gratuito de la SEP.</p>
          </div>
        </div>
        <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-6">
          <div className="p-2 rounded-xl bg-nem-green/10 text-nem-green shrink-0 mt-0.5">
            <Layers size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Enfoque Sociocrítico</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Articulación automática con los 7 Ejes Articuladores y Campos Formativos.</p>
          </div>
        </div>
        <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-6">
          <div className="p-2 rounded-xl bg-nem-green/10 text-nem-green shrink-0 mt-0.5">
            <Download size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Listo para Imprimir o Editar</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Exportación directa a Microsoft Word (.doc) con formato institucional limpio.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  iconBg,
  tag,
  title, 
  description, 
  onClick 
}: { 
  icon: React.ReactNode; 
  iconBg: string;
  tag: string;
  title: string; 
  description: string; 
  onClick: () => void; 
}) {
  return (
    <button 
      onClick={onClick}
      className="group bg-white rounded-3xl p-7 text-left border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-slate-200/50 hover:border-nem-green/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", iconBg)}>
            {icon}
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
            {tag}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-nem-green transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>
      <div className="flex items-center text-nem-green font-bold text-xs uppercase tracking-wider gap-1 group-hover:translate-x-1 transition-transform">
        <span>Abrir herramienta</span>
        <ChevronRight size={15} />
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
    <div className="h-full min-h-[460px] glass-card flex flex-col items-center justify-center p-8 text-center bg-white">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-nem-green/15 border-t-nem-green animate-spin" />
        <Sparkles className="text-nem-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" size={22} />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm font-medium text-slate-500 min-h-[24px] max-w-sm transition-all duration-300">
        {currentStep}
      </p>

      <div className="w-60 bg-slate-100 rounded-full h-1.5 my-5 overflow-hidden">
        <div
          className="bg-nem-green h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(15 + seconds * 14, 94)}%` }}
        />
      </div>

      <span className="text-xs text-slate-400 font-mono mb-6">
        Procesando • {seconds}s
      </span>

      <button
        type="button"
        onClick={onCancel}
        className="text-xs font-semibold text-slate-500 hover:text-red-600 px-4 py-2 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50/50 transition-colors cursor-pointer"
      >
        Cancelar generación
      </button>
    </div>
  );
}

function PlaneacionView() {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Planeacion | null>(null);
  const [copied, setCopied] = useState(false);
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

  const handleCopy = () => {
    if (!result) return;
    const text = `${result.titulo}\nGrado: ${result.grado} | Libro: ${result.libroTexto}\n\nPDA:\n${result.pda}\n\nINICIO:\n${result.inicio}\n\nDESARROLLO:\n${result.desarrollo}\n\nCIERRE:\n${result.cierre}\n\nEVALUACIÓN:\n${result.evaluacion}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    "Alineando con el Plan y Programas de Estudio NEM 2025-2026...",
    "Vinculando con la lección del Libro de Texto Gratuito...",
    "Definiendo Procesos de Desarrollo de Aprendizaje (PDA)...",
    "Estructurando momentos: Inicio, Desarrollo y Cierre...",
    "Generando criterios de evaluación formativa y recursos...",
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-slate-200/70">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-nem-green">Módulo Curricular</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-0.5">Generador de Planeaciones</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500">Secuencias didácticas alineadas a los libros SEP</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Formulario (5 columnas) */}
        <form onSubmit={handleGenerate} className="lg:col-span-5 glass-card p-6 space-y-6">
          {/* Bloque 1: Grado y Libro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="w-5 h-5 rounded-full bg-nem-green text-white flex items-center justify-center text-[11px]">1</span>
              <span>Contexto Escolar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Grado Escolar</label>
                <select 
                  className="nem-input cursor-pointer"
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
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-700">Libro de Texto SEP</label>
                  <span className="text-[10px] font-bold text-nem-green bg-nem-green/10 px-2 py-0.5 rounded-full">
                    Oficial
                  </span>
                </div>
                <select 
                  className="nem-input cursor-pointer font-medium"
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
                    <option key={libro} value={libro}>{libro}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Bloque 2: Lección */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="w-5 h-5 rounded-full bg-nem-green text-white flex items-center justify-center text-[11px]">2</span>
              <span>Lección o Proyecto del Libro</span>
            </div>

            <select
              className="nem-input cursor-pointer"
              value={leccionesSugeridas.includes(formData.leccion) ? formData.leccion : '__custom__'}
              onChange={e => {
                if (e.target.value !== '__custom__') {
                  setFormData({...formData, leccion: e.target.value});
                }
              }}
            >
              <option value="" disabled>-- Selecciona una lección --</option>
              {leccionesSugeridas.map((lec) => (
                <option key={lec} value={lec}>{lec}</option>
              ))}
              <option value="__custom__">✏️ Escribir otra lección personalizada...</option>
            </select>

            <textarea 
              required
              rows={2}
              className="nem-input resize-none" 
              placeholder="Ej. Nombrario del grupo (Pág. 18)..." 
              value={formData.leccion}
              onChange={e => setFormData({...formData, leccion: e.target.value})}
            />

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {leccionesSugeridas.slice(0, 3).map((lec) => (
                <button
                  key={lec}
                  type="button"
                  onClick={() => setFormData({...formData, leccion: lec})}
                  className={cn(
                    "text-[11px] px-2.5 py-1 rounded-lg border text-left transition-all cursor-pointer truncate max-w-full",
                    formData.leccion === lec
                      ? "bg-nem-green/10 text-nem-green border-nem-green/30 font-semibold"
                      : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                  )}
                >
                  {lec}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Bloque 3: Ejes Articuladores */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="w-5 h-5 rounded-full bg-nem-green text-white flex items-center justify-center text-[11px]">3</span>
                <span>Ejes Articuladores</span>
              </div>
              <span className="text-[11px] text-slate-400">{formData.ejes.length} seleccionados</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {EJES_ARTICULADORES.map(eje => {
                const selected = formData.ejes.includes(eje);
                return (
                  <button
                    key={eje}
                    type="button"
                    onClick={() => {
                      const newEjes = selected
                        ? formData.ejes.filter(e => e !== eje)
                        : [...formData.ejes, eje];
                      setFormData({...formData, ejes: newEjes});
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-medium transition-all border cursor-pointer",
                      selected 
                        ? "bg-nem-green text-white border-nem-green shadow-xs" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-nem-green/40 hover:bg-slate-50"
                    )}
                  >
                    {eje}
                  </button>
                );
              })}
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="nem-button w-full flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
            <span>{loading ? `Generando (${seconds}s)...` : "Generar Planeación"}</span>
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2">
              <div className="flex gap-2 text-red-700 text-xs font-medium items-start">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p className="flex-1">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="text-xs text-red-700 hover:text-red-900 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} /> Reintentar
              </button>
            </div>
          )}
        </form>

        {/* Vista Previa / Resultado (7 columnas) */}
        <div className="lg:col-span-7">
          {loading ? (
            <LoadingCard
              title="Elaborando Secuencia Didáctica"
              steps={steps}
              seconds={seconds}
              onCancel={handleCancel}
            />
          ) : result ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card overflow-hidden bg-white"
            >
              {/* Sticky Action Bar */}
              <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 px-6 py-3.5 bg-slate-50/95 backdrop-blur-xs border-b border-slate-200/80">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Planeación lista
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? "Copiado" : "Copiar"}</span>
                  </button>
                  <button 
                    onClick={downloadDoc}
                    type="button"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-nem-green text-white hover:bg-nem-green-light transition-all shadow-xs cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Word (.doc)</span>
                  </button>
                </div>
              </div>

              {/* Documento */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <h3 className="text-2xl font-extrabold text-slate-900 leading-snug">
                    {result.titulo}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-nem-green/10 text-nem-green">
                      {result.grado}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 flex items-center gap-1">
                      <BookOpen size={12} /> {result.libroTexto || 'Libro SEP'}
                    </span>
                    {result.campoFormativo && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                        {result.campoFormativo}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-nem-cream border border-slate-200/60">
                    <Section title="Proceso de Desarrollo de Aprendizaje (PDA)" content={result.pda} />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Secuencia Didáctica</h4>
                    <div className="space-y-3">
                      <MomentCard badge="1" title="Inicio" content={result.inicio} accent="border-l-emerald-500" />
                      <MomentCard badge="2" title="Desarrollo" content={result.desarrollo} accent="border-l-nem-green" />
                      <MomentCard badge="3" title="Cierre" content={result.cierre} accent="border-l-nem-gold" />
                    </div>
                  </div>

                  <Section title="Evaluación Formativa" content={result.evaluacion} />

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recursos y Materiales</h4>
                    <div className="flex flex-wrap gap-2">
                      {(result.recursos || []).map((r, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <EmptyPreview 
              icon={<FileText size={32} className="text-nem-green" />}
              title="Vista previa de tu planeación"
              description="Selecciona el grado, el libro de texto y la lección en el panel izquierdo para generar tu secuencia didáctica."
            />
          )}
        </div>
      </div>
    </div>
  );
}

function MomentCard({ badge, title, content, accent }: { badge: string; title: string; content: string; accent: string }) {
  return (
    <div className={cn("p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 border-l-4 space-y-1.5", accent)}>
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center">
          {badge}
        </span>
        <h5 className="font-bold text-sm text-slate-900">{title}</h5>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{content || 'En desarrollo'}</p>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="space-y-1.5">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</h4>
      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{content || 'En desarrollo'}</p>
    </div>
  );
}

function EmptyPreview({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="h-full min-h-[460px] glass-card flex flex-col items-center justify-center p-10 text-center bg-white/60 border-dashed">
      <div className="w-16 h-16 rounded-2xl bg-nem-green/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mt-1.5 leading-relaxed">{description}</p>
    </div>
  );
}

function ProyectoView() {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Proyecto | null>(null);
  const [copied, setCopied] = useState(false);
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

  const handleCopy = () => {
    if (!result) return;
    const fasesText = (result.fases || [])
      .map(f => `${f.nombre}:\n${(f.actividades || []).map(a => `- ${a}`).join('\n')}`)
      .join('\n\n');
    const text = `${result.nombre}\nMetodología: ${result.metodologia}\n\nPropósito:\n${result.proposito}\n\n${fasesText}\n\nProducto Final:\n${result.productoFinal}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    "Analizando problemática real de la comunidad escolar...",
    "Articulando las fases de la metodología sociocrítica elegida...",
    "Formulando actividades colaborativas y momentos de indagación...",
    "Definiendo el producto final y estrategias de evaluación...",
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-slate-200/70">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-nem-green">Aprendizaje Sociocrítico</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-0.5">Diseñador de Proyectos</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500">Basados en problemáticas reales de tu comunidad</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <form onSubmit={handleGenerate} className="lg:col-span-5 glass-card p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="w-5 h-5 rounded-full bg-nem-green text-white flex items-center justify-center text-[11px]">1</span>
              <span>Grado y Metodología</span>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Grado Escolar</label>
                <select 
                  className="nem-input cursor-pointer"
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
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Metodología Sociocrítica</label>
                <select 
                  className="nem-input cursor-pointer"
                  value={formData.metodologia}
                  onChange={e => setFormData({...formData, metodologia: e.target.value as Metodologia})}
                >
                  {METODOLOGIAS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="w-5 h-5 rounded-full bg-nem-green text-white flex items-center justify-center text-[11px]">2</span>
                <span>Problemática Comunitaria</span>
              </div>
              <span className="text-[10px] font-bold text-nem-green bg-nem-green/10 px-2 py-0.5 rounded-full">
                Sugeridas
              </span>
            </div>

            <select
              className="nem-input cursor-pointer"
              value={problematicasSugeridas.includes(formData.problematica) ? formData.problematica : '__custom__'}
              onChange={e => {
                if (e.target.value !== '__custom__') {
                  setFormData({...formData, problematica: e.target.value});
                }
              }}
            >
              <option value="" disabled>-- Selecciona una problemática --</option>
              {problematicasSugeridas.map((prob) => (
                <option key={prob} value={prob}>{prob}</option>
              ))}
              <option value="__custom__">✏️ Escribir otra problemática personalizada...</option>
            </select>

            <textarea 
              required
              rows={3}
              className="nem-input resize-none" 
              placeholder="Describe la situación o problemática a resolver en tu escuela o comunidad..." 
              value={formData.problematica}
              onChange={e => setFormData({...formData, problematica: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="nem-button w-full flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
            <span>{loading ? `Diseñando (${seconds}s)...` : "Diseñar Proyecto"}</span>
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2">
              <div className="flex gap-2 text-red-700 text-xs font-medium items-start">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p className="flex-1">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="text-xs text-red-700 hover:text-red-900 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} /> Reintentar
              </button>
            </div>
          )}
        </form>

        <div className="lg:col-span-7">
          {loading ? (
            <LoadingCard
              title="Diseñando Proyecto Sociocrítico"
              steps={steps}
              seconds={seconds}
              onCancel={handleCancel}
            />
          ) : result ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card overflow-hidden bg-white"
            >
              {/* Sticky Action Bar */}
              <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 px-6 py-3.5 bg-slate-50/95 backdrop-blur-xs border-b border-slate-200/80">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Proyecto estructurado
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? "Copiado" : "Copiar"}</span>
                  </button>
                  <button 
                    onClick={downloadDoc}
                    type="button"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-nem-green text-white hover:bg-nem-green-light transition-all shadow-xs cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Word (.doc)</span>
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <h3 className="text-2xl font-extrabold text-slate-900 leading-snug">{result.nombre}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-nem-green/10 text-nem-green">
                      {formData.grado}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800">
                      {result.metodologia}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-nem-cream border border-slate-200/60">
                    <Section title="Propósito Formativo" content={result.proposito} />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Fases del Proyecto</h4>
                    <div className="space-y-3">
                      {(result.fases || []).map((fase, i) => (
                        <div key={i} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/60 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-nem-green text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            <h5 className="text-sm font-bold text-slate-900">{fase.nombre}</h5>
                          </div>
                          <ul className="space-y-1.5 pl-8">
                            {(fase.actividades || []).map((act, j) => (
                              <li key={j} className="text-xs sm:text-sm text-slate-600 leading-relaxed list-disc">
                                {act}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
                    <Section title="Producto Final Esperado" content={result.productoFinal} />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <EmptyPreview 
              icon={<Layout size={32} className="text-nem-green" />}
              title="Vista previa de tu proyecto"
              description="Define el grado, la metodología sociocrítica y la problemática comunitaria para estructurar las fases del proyecto."
            />
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
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-slate-200/70">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-nem-green">Material Didáctico Visual</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-0.5">Creador de Ilustraciones</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500">Láminas educativas limpias y sin etiquetas</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <form onSubmit={handleGenerate} className="lg:col-span-5 glass-card p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Describe el recurso visual
            </label>
            <textarea 
              required
              rows={4}
              className="nem-input resize-none" 
              placeholder="Ej. Un ciclo del agua simplificado para niños de primaria, una célula vegetal con sus partes principales..." 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />

            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold text-slate-400">Ideas rápidas (haz clic para usar):</p>
              <div className="flex flex-wrap gap-1.5">
                {EJEMPLOS_ILUSTRACION.map((ej) => (
                  <button
                    key={ej}
                    type="button"
                    onClick={() => setPrompt(ej)}
                    className="text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-nem-green/50 hover:text-nem-green transition-colors text-left cursor-pointer"
                  >
                    + {ej}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-sky-50/80 border border-sky-100 rounded-2xl flex gap-3 text-sky-800 text-xs leading-relaxed">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-sky-600" />
            <p>Las ilustraciones se generan <strong>sin texto</strong> para que puedas imprimirlas y pedir a tus alumnos que identifiquen y escriban sus partes.</p>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="nem-button w-full flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
            <span>{loading ? `Dibujando (${seconds}s)...` : "Generar Ilustración"}</span>
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2">
              <div className="flex gap-2 text-red-700 text-xs font-medium items-start">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p className="flex-1">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="text-xs text-red-700 hover:text-red-900 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} /> Reintentar
              </button>
            </div>
          )}
        </form>

        <div className="lg:col-span-7">
          {loading ? (
            <LoadingCard
              title="Dibujando Recurso Visual"
              steps={steps}
              seconds={seconds}
              onCancel={handleCancel}
            />
          ) : image ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card overflow-hidden bg-white"
            >
              <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-b border-slate-200/80">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Lámina lista para descargar
                </span>
                <button
                  onClick={downloadImage}
                  type="button"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-nem-green text-white hover:bg-nem-green-light transition-all shadow-xs cursor-pointer"
                >
                  <Download size={14} />
                  <span>Descargar Imagen</span>
                </button>
              </div>

              <div className="p-6">
                <div className="relative group aspect-square max-h-[480px] mx-auto rounded-2xl overflow-hidden border border-slate-200/80 flex items-center justify-center bg-slate-50/50 p-4">
                  <img 
                    src={image} 
                    alt="Ilustración didáctica generada" 
                    className="w-full h-full object-contain rounded-xl" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <EmptyPreview 
              icon={<ImageIcon size={32} className="text-nem-green" />}
              title="Lienzo de ilustración"
              description="Describe el esquema, diagrama o dibujo que necesitas para tu clase y se mostrará aquí listo para descargar."
            />
          )}
        </div>
      </div>
    </div>
  );
}
