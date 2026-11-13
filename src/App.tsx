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
  Copy,
  Check,
  GraduationCap,
  Layers,
  Sun,
  Moon,
  Palette
} from 'lucide-react';
import { cn } from './lib/utils';
import { 
  generarPlaneacion, 
  generarProyecto 
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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 26 } }
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('edunem-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('edunem-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('edunem-theme', 'light');
    }
  }, [darkMode]);

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
    <div className="min-h-screen flex flex-col md:flex-row bg-nem-cream dark:bg-nem-dark text-slate-800 dark:text-slate-100 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-nem-green/[0.06] dark:bg-emerald-500/[0.07] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-nem-gold/[0.05] dark:bg-amber-500/[0.04] blur-3xl" />
      </div>

      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3.5 bg-white/85 dark:bg-nem-dark-card/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-emerald-900/40">
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2.5 text-left"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-nem-green to-nem-green-light dark:from-emerald-500 dark:to-teal-600 rounded-xl flex items-center justify-center text-white shadow-sm">
            <BookOpen size={18} />
          </div>
          <div>
            <span className="font-serif text-lg font-extrabold text-slate-900 dark:text-white block leading-none">EduNEM</span>
            <span className="text-[10px] font-bold text-nem-gold uppercase tracking-wider">2025 – 2026</span>
          </div>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-900/30 transition-colors"
            aria-label="Cambiar tema"
          >
            {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-900/30 transition-colors"
            aria-label="Abrir menú"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 md:sticky md:top-0 md:h-screen transform transition-transform duration-300 ease-out bg-white/95 dark:bg-nem-dark-card/95 backdrop-blur-xl border-r border-slate-200/80 dark:border-emerald-900/40 w-72 p-6 flex flex-col justify-between shrink-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => { setCurrentView('home'); setIsSidebarOpen(false); }}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-nem-green to-nem-green-light dark:from-emerald-500 dark:to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-nem-green/20 dark:shadow-emerald-950/60 group-hover:scale-105 transition-transform">
                <BookOpen size={22} />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-extrabold text-slate-900 dark:text-white leading-none">EduNEM</h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-emerald-300/60 font-bold">Ciclo 2025-2026</p>
                </div>
              </div>
            </button>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-1.5">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Espacio de Trabajo
            </p>
            <nav className="flex flex-col gap-1.5">
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
                badge="Buscador"
              />
            </nav>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-slate-200/80 dark:border-emerald-900/50 bg-slate-50/80 dark:bg-nem-dark/70 hover:bg-slate-100 dark:hover:bg-emerald-950/50 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-nem-green" />}
              <span>{darkMode ? "Modo Claro" : "Modo Nocturno"}</span>
            </span>
            <span className={cn(
              "w-9 h-5 rounded-full p-0.5 transition-colors flex items-center",
              darkMode ? "bg-emerald-600 justify-end" : "bg-slate-300 justify-start"
            )}>
              <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </span>
          </button>

          <div className="p-4 bg-nem-cream/80 dark:bg-nem-dark/60 rounded-2xl border border-slate-200/60 dark:border-emerald-900/40 space-y-1.5">
            <div className="flex items-center gap-2 text-nem-green dark:text-emerald-400 font-bold text-xs">
              <GraduationCap size={16} />
              <span>Nueva Escuela Mexicana</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Libros de Texto Gratuitos y Programas Sintéticos vigentes.
            </p>
          </div>
        </div>
      </aside>

      <main className="relative z-10 flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
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
          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-emerald-900/25 hover:text-slate-900 dark:hover:text-white"
      )}
    >
      {active && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute inset-0 bg-gradient-to-r from-nem-green to-nem-green-light dark:from-emerald-600 dark:to-teal-600 rounded-2xl shadow-md shadow-nem-green/20 dark:shadow-emerald-950/50"
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
            : "bg-slate-100 dark:bg-emerald-950/80 text-slate-500 dark:text-emerald-300"
        )}>
          {badge}
        </span>
      )}
    </button>
  );
}

function HomeView({ setView }: { setView: (v: View) => void }) {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-10 py-2 md:py-4"
    >
      <motion.header 
        variants={staggerItem}
        className="glass-card glow-border p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-white via-white to-nem-green/[0.05] dark:from-nem-dark-card dark:via-nem-dark-card dark:to-emerald-900/20"
      >
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nem-green/10 dark:bg-emerald-500/15 text-nem-green dark:text-emerald-300 text-xs font-bold border border-nem-green/15 dark:border-emerald-500/20">
            <Sparkles size={14} className="text-nem-gold" />
            <span>Asistente Pedagógico Inteligente • Primaria 1º a 6º</span>
          </div>
           
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-slate-900 dark:text-white leading-[1.15]">
            Diseña tus clases de la{" "}
            <span className="bg-gradient-to-r from-nem-green to-emerald-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
              Nueva Escuela Mexicana
            </span>{" "}
            en minutos
          </h2>
           
          <p className="text-slate-500 dark:text-slate-300/80 text-base md:text-lg leading-relaxed max-w-2xl">
            Automatiza tus planeaciones didácticas vinculadas a los libros SEP, estructura proyectos sociocríticos y busca láminas educativas listas para el aula.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('planeacion')}
              className="nem-button flex items-center gap-2 cursor-pointer"
            >
              <FileText size={18} />
              <span>Crear Planeación Didáctica</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('proyecto')}
              className="px-5 py-3.5 rounded-xl border border-slate-200 dark:border-emerald-800/60 bg-white dark:bg-nem-dark/80 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-emerald-950/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Layout size={18} className="text-nem-green dark:text-emerald-400" />
              <span>Diseñar Proyecto</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <motion.div variants={staggerItem} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Herramientas Docentes</h3>
          <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">Selecciona un módulo para comenzar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard 
            icon={<FileText className="text-emerald-600 dark:text-emerald-400" size={24} />}
            iconBg="bg-emerald-50 dark:bg-emerald-500/15"
            tag="Libros SEP"
            title="Planeaciones Didácticas"
            description="Secuencias completas con PDA, Inicio, Desarrollo, Cierre y evaluación formativa vinculadas a cada lección."
            onClick={() => setView('planeacion')}
          />
          <FeatureCard 
            icon={<Layout className="text-amber-600 dark:text-amber-400" size={24} />}
            iconBg="bg-amber-50 dark:bg-amber-500/15"
            tag="Metodologías NEM"
            title="Proyectos Escolares"
            description="Diseña proyectos sociocríticos (ABPC, STEAM, ABP, AS) partiendo de problemáticas reales de tu comunidad."
            onClick={() => setView('proyecto')}
          />
          <FeatureCard 
            icon={<ImageIcon className="text-sky-600 dark:text-sky-400" size={24} />}
            iconBg="bg-sky-50 dark:bg-sky-500/15"
            tag="Recursos Visuales"
            title="Láminas Educativas"
            description="Busca esquemas, diagramas y recursos visuales institucionales para tus clases en tiempo real."
            onClick={() => setView('ilustracion')}
          />
        </div>
      </motion.div>
    </motion.div>
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
    <motion.button 
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="group glass-card glow-border p-7 text-left hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-emerald-950/50 hover:border-nem-green/40 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", iconBg)}>
            {icon}
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-emerald-950 text-slate-500 dark:text-emerald-300">
            {tag}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-nem-green dark:group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>
      <div className="flex items-center text-nem-green dark:text-emerald-400 font-bold text-xs uppercase tracking-wider gap-1 group-hover:translate-x-1 transition-transform">
        <span>Abrir herramienta</span>
        <ChevronRight size={15} />
      </div>
    </motion.button>
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
    <div className="h-full min-h-[480px] glass-card glow-border flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-nem-green/15 dark:border-emerald-500/20 border-t-nem-green dark:border-t-emerald-400 animate-spin" />
        <Sparkles className="text-nem-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" size={22} />
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-300 min-h-[24px] max-w-sm transition-all duration-300">
        {currentStep}
      </p>

      <div className="w-60 bg-slate-100 dark:bg-nem-dark rounded-full h-1.5 my-5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-nem-green to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(15 + seconds * 14, 94)}%` }}
        />
      </div>

      <span className="text-xs text-slate-400 font-mono mb-6">
        Procesando • {seconds}s
      </span>

      <button
        type="button"
        onClick={onCancel}
        className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800/50 transition-colors cursor-pointer"
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
  const [viewMode, setViewMode] = useState<'cards' | 'document'>('cards');
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
      Ejes Articuladores: ${formData.ejes.join(', ')}`;
       
      const data = await generarPlaneacion(prompt, controller.signal);
      setResult({
        ...data,
        libroTexto: data.libroTexto || formData.libroTexto,
        campoFormativo: data.campoFormativo || campoVinculado
      });
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || "Ocurrió un error inesperado al generar la planeación.");
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const downloadDoc = () => {
    if (!result) return;
    exportarPlaneacionWord(result, { leccion: formData.leccion, libroTexto: formData.libroTexto });
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `${result.titulo}\nGrado: ${result.grado} | Libro: ${result.libroTexto}\n\nPDA:\n${result.pda}\n\nINICIO:\n${result.inicio}\n\nDESARROLLO:\n${result.desarrollo}\n\nCIERRE:\n${result.cierre}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    "Alineando con el Plan y Programas de Estudio NEM 2025-2026...",
    "Vinculando con la lección del Libro de Texto Gratuito...",
    "Definiendo Procesos de Desarrollo de Aprendizaje (PDA)...",
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.header variants={staggerItem} className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-emerald-900/40">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-nem-green dark:text-emerald-400">Módulo Curricular</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Generador de Planeaciones</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Secuencias didácticas alineadas a los libros SEP</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <motion.form variants={staggerItem} onSubmit={handleGenerate} className="lg:col-span-5 glass-card p-6 space-y-6">
          <div className="space-y-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Grado Escolar</label>
            <select 
              className="nem-input cursor-pointer"
              value={formData.grado}
              onChange={e => {
                const nuevoGrado = e.target.value;
                const nuevosLibros = getLibrosTextoNEM(nuevoGrado);
                const nuevoLibro = nuevosLibros[0] || 'Proyectos de Aula';
                const nuevasLecciones = getLeccionesPorLibro(nuevoGrado, nuevoLibro);
                setFormData({ ...formData, grado: nuevoGrado, libroTexto: nuevoLibro, leccion: nuevasLecciones[0] || formData.leccion });
              }}
            >
              {GRADOS_ESCOLARES.map((grupo) => (
                <optgroup key={grupo.fase} label={grupo.fase}>
                  {grupo.grados.map((g) => (<option key={g} value={g}>{g}</option>))}
                </optgroup>
              ))}
            </select>

            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Libro de Texto SEP</label>
            <select 
              className="nem-input cursor-pointer font-medium"
              value={formData.libroTexto}
              onChange={e => {
                const nuevoLibro = e.target.value;
                const nuevasLecciones = getLeccionesPorLibro(formData.grado, nuevoLibro);
                setFormData({ ...formData, libroTexto: nuevoLibro, leccion: nuevasLecciones[0] || formData.leccion });
              }}
            >
              {librosDisponibles.map(libro => (<option key={libro} value={libro}>{libro}</option>))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Lección del Libro</label>
            <select
              className="nem-input cursor-pointer"
              value={leccionesSugeridas.includes(formData.leccion) ? formData.leccion : '__custom__'}
              onChange={e => {
                if (e.target.value !== '__custom__') setFormData({...formData, leccion: e.target.value});
              }}
            >
              {leccionesSugeridas.map((lec) => (<option key={lec} value={lec}>{lec}</option>))}
              <option value="__custom__">✏️ Escribir lección personalizada...</option>
            </select>
          </div>

          {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl">{error}</div>}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !formData.leccion.trim()}
            className="nem-button w-full flex items-center justify-center gap-2 py-4 text-sm font-bold shadow-lg"
          >
            <Sparkles size={18} />
            <span>Generar Planeación Didáctica</span>
          </motion.button>
        </motion.form>

        <div className="lg:col-span-7 space-y-4">
          {loading ? (
            <LoadingCard title="Generando Planeación Didáctica SEP" steps={steps} seconds={seconds} onCancel={handleCancel} />
          ) : result ? (
            <motion.div variants={staggerItem} className="glass-card glow-border p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-xs font-bold text-nem-green">{result.grado}</span>
                <div className="flex gap-2">
                  <button onClick={handleCopy} className="p-2 border rounded-xl"><Copy size={17} /></button>
                  <button onClick={downloadDoc} className="nem-button py-2 px-4 text-xs flex items-center gap-1.5"><Download size={15} /> Word</button>
                </div>
              </div>
              <h3 className="text-2xl font-serif font-extrabold">{result.titulo}</h3>
              <p className="text-sm">{result.pda}</p>
            </motion.div>
          ) : (
            <div className="h-[480px] glass-card flex flex-col items-center justify-center p-8 text-center">
              <FileText size={30} className="text-nem-green mb-4" />
              <h3 className="text-lg font-bold">Listo para planear</h3>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProyectoView() {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Proyecto | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [formData, setFormData] = useState({
    grado: '3º de Primaria',
    metodologia: METODOLOGIAS[0],
    problematica: '',
    ejes: [] as EjeArticulador[]
  });

  const problematicasSugeridas = getProblematicasNEM(formData.grado);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.problematica.trim()) return;

    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);

    try {
      const prompt = `Diseña un Proyecto Sociocrítico para ${formData.grado} usando ${formData.metodologia} sobre: ${formData.problematica}`;
      const data = await generarProyecto(prompt, controller.signal);
      setResult(data);
    } catch (err: any) {
      if (err.name !== 'AbortError') setError("Error al generar proyecto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-extrabold">Diseñador de Proyectos</h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        <form onSubmit={handleGenerate} className="lg:col-span-5 glass-card p-6 space-y-4">
          <label className="text-xs font-semibold">Problemática Comunitaria</label>
          <textarea
            className="w-full p-4 border rounded-2xl h-28 text-sm"
            value={formData.problematica}
            onChange={e => setFormData({...formData, problematica: e.target.value})}
            placeholder="Describe la situación real..."
          />
          <div className="space-y-1">
            {problematicasSugeridas.map((prob, idx) => (
              <button key={idx} type="button" onClick={() => setFormData({...formData, problematica: prob})} className="w-full text-left text-xs bg-slate-50 p-2 rounded-xl truncate">
                💡 {prob}
              </button>
            ))}
          </div>
          <button type="submit" disabled={loading || !formData.problematica.trim()} className="w-full py-3 bg-amber-600 text-white font-bold rounded-2xl">
            Diseñar Proyecto
          </button>
        </form>
        <div className="lg:col-span-7">
          {result ? (
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-xl font-bold">{result.titulo}</h3>
              <p className="text-xs">{result.proposito}</p>
            </div>
          ) : (
            <div className="h-[480px] glass-card flex items-center justify-center text-slate-400">Selecciona o escribe una problemática</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function IlustracionView() {
  const [descripcion, setDescripcion] = useState('');
  const [estilo, setEstilo] = useState<'color' | 'bn'>('color');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuscar = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!descripcion.trim()) return;

    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const response = await fetch('/api/ilustracion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descripcion, estilo }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al buscar recurso.');
      setImageUrl(data.imageUrl);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.header variants={staggerItem} className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-emerald-900/40">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">Recursos Visuales</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Buscador de Láminas Educativas</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Diagramas y esquemas didácticos institucionales</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <motion.div variants={staggerItem} className="lg:col-span-5 glass-card p-6 space-y-6">
          <form onSubmit={handleBuscar} className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white">1. Describe el Recurso Visual Didáctico</h2>
            <textarea
              className="w-full p-4 border border-slate-200 dark:border-emerald-900/60 rounded-2xl bg-white dark:bg-nem-dark focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-700 dark:text-slate-200 h-28 resize-none text-sm"
              placeholder="Ej. El ciclo del agua simplificado para niños..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />

            {/* Selector de Estilo (Color / Blanco y Negro) */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Palette size={14} />
                <span>Estilo de impresión / visualización:</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEstilo('color')}
                  className={cn(
                    "py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2",
                    estilo === 'color'
                      ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                      : "bg-slate-50 dark:bg-nem-dark border-slate-200 dark:border-emerald-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                  )}
                >
                  🎨 A Color
                </button>
                <button
                  type="button"
                  onClick={() => setEstilo('bn')}
                  className={cn(
                    "py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2",
                    estilo === 'bn'
                      ? "bg-slate-900 text-white border-slate-900 dark:bg-emerald-600 shadow-sm"
                      : "bg-slate-50 dark:bg-nem-dark border-slate-200 dark:border-emerald-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                  )}
                >
                  ⬛ Blanco y Negro
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Ideas rápidas:</span>
              <div className="flex flex-wrap gap-2">
                {EJEMPLOS_ILUSTRACION.map((idea, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setDescripcion(idea)}
                    className="text-xs bg-slate-50 dark:bg-nem-dark/75 hover:bg-sky-50 dark:hover:bg-emerald-900/30 text-slate-600 dark:text-slate-300 border px-3 py-1.5 rounded-xl text-left cursor-pointer"
                  >
                    + {idea}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl">{error}</div>}

            <button
              type="submit"
              disabled={loading || !descripcion.trim()}
              className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-2xl shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                  <span>Generando lámina educativa...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" />
                  <span>Buscar Recurso Visual</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div variants={staggerItem} className="lg:col-span-7 glass-card p-6 flex flex-col items-center justify-center min-h-[500px]">
          {imageUrl ? (
            <div className="w-full flex flex-col items-center space-y-4">
              <div className="w-full flex justify-between items-center">
                <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/15 px-3 py-1 rounded-full border">
                  Lámina lista para clase ({estilo === 'bn' ? 'Blanco y Negro' : 'A Color'})
                </span>
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-sky-700 flex items-center gap-1.5 bg-slate-50 dark:bg-nem-dark px-3.5 py-2 rounded-xl border"
                >
                  <Download size={15} />
                  <span>Descargar Imagen</span>
                </a>
              </div>
              
              <div className="relative w-full h-[400px] bg-slate-50 dark:bg-nem-dark/80 border rounded-2xl overflow-hidden flex items-center justify-center p-2">
                <img
                  src={imageUrl}
                  alt="Recurso educativo EduNEM"
                  className="max-h-full max-w-full object-contain rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000";
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="text-center p-8 space-y-3">
              <div className="w-16 h-16 bg-sky-50 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <ImageIcon size={30} />
              </div>
              <h3 className="text-base font-semibold text-slate-700 dark:text-white">Lienzo Educativo EduNEM</h3>
              <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                Selecciona si la quieres a color o en blanco y negro para imprimir, y pulsa buscar.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
