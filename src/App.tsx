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
  Moon
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
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-nem-green/[0.06] dark:bg-emerald-500/[0.07] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-nem-gold/[0.05] dark:bg-amber-500/[0.04] blur-3xl" />
      </div>

      {/* Mobile Header */}
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

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 md:sticky md:top-0 md:h-screen transform transition-transform duration-300 ease-out bg-white/95 dark:bg-nem-dark-card/95 backdrop-blur-xl border-r border-slate-200/80 dark:border-emerald-900/40 w-72 p-6 flex flex-col justify-between shrink-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="space-y-8">
          {/* Logo */}
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

          {/* Navigation */}
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

        {/* Bottom Controls */}
        <div className="space-y-3">
          {/* Theme Toggle */}
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

          {/* Footer Card */}
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

      {/* Main Content */}
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
      {/* Hero Section */}
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

      {/* Feature Cards */}
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

      {/* Benefits Strip */}
      <motion.div 
        variants={staggerItem}
        className="glass-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-emerald-900/40"
      >
        <div className="flex items-start gap-3.5 pt-2 md:pt-0">
          <div className="p-2.5 rounded-xl bg-nem-green/10 dark:bg-emerald-500/15 text-nem-green dark:text-emerald-400 shrink-0 mt-0.5">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Catálogo Oficial 2025-2026</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Lecciones indexadas por grado y libro de texto gratuito de la SEP.</p>
          </div>
        </div>
        <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-6">
          <div className="p-2.5 rounded-xl bg-nem-green/10 dark:bg-emerald-500/15 text-nem-green dark:text-emerald-400 shrink-0 mt-0.5">
            <Layers size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Enfoque Sociocrítico</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Articulación automática con los 7 Ejes Articuladores y Campos Formativos.</p>
          </div>
        </div>
        <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-6">
          <div className="p-2.5 rounded-xl bg-nem-green/10 dark:bg-emerald-500/15 text-nem-green dark:text-emerald-400 shrink-0 mt-0.5">
            <Download size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Listo para Imprimir o Editar</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Exportación directa a Microsoft Word (.doc) con formato institucional limpio.</p>
          </div>
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
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.header variants={staggerItem} className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-emerald-900/40">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-nem-green dark:text-emerald-400">Módulo Curricular</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Generador de Planeaciones</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Secuencias didácticas alineadas a los libros SEP</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Formulario */}
        <motion.form variants={staggerItem} onSubmit={handleGenerate} className="lg:col-span-5 glass-card p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="w-5 h-5 rounded-full bg-nem-green dark:bg-emerald-600 text-white flex items-center justify-center text-[11px]">1</span>
              <span>Contexto Escolar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Grado Escolar</label>
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
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Libro de Texto SEP</label>
                  <span className="text-[10px] font-bold text-nem-green dark:text-emerald-300 bg-nem-green/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full">
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

          <hr className="border-slate-100 dark:border-emerald-900/40" />

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="w-5 h-5 rounded-full bg-nem-green dark:bg-emerald-600 text-white flex items-center justify-center text-[11px]">2</span>
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
              <option value="__custom__">✏️ Escribir lección personalizada...</option>
            </select>

            {(!leccionesSugeridas.includes(formData.leccion) || formData.leccion === '') && (
              <input
                type="text"
                className="nem-input mt-2"
                placeholder="Ej. Mi comunidad escolar y sus costumbres..."
                value={formData.leccion}
                onChange={e => setFormData({...formData, leccion: e.target.value})}
              />
            )}
          </div>

          <hr className="border-slate-100 dark:border-emerald-900/40" />

          {/* Ejes Articuladores opcionales */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Ejes Articuladores (Opcional)
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1">
              {EJES_ARTICULADORES.map((eje) => {
                const selected = formData.ejes.includes(eje);
                return (
                  <button
                    key={eje}
                    type="button"
                    onClick={() => {
                      if (selected) {
                        setFormData({...formData, ejes: formData.ejes.filter(x => x !== eje)});
                      } else {
                        setFormData({...formData, ejes: [...formData.ejes, eje]});
                      }
                    }}
                    className={cn(
                      "text-[11px] font-medium px-3 py-1.5 rounded-xl border transition-all cursor-pointer",
                      selected
                        ? "bg-nem-green dark:bg-emerald-600 text-white border-nem-green dark:border-emerald-600 shadow-xs"
                        : "bg-slate-50 dark:bg-nem-dark border-slate-200 dark:border-emerald-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-900/30"
                    )}
                  >
                    {eje} {selected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-start gap-3">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">{error}</p>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !formData.leccion.trim()}
            className="nem-button w-full flex items-center justify-center gap-2 py-4 text-sm font-bold shadow-lg shadow-nem-green/20 dark:shadow-emerald-950/60 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Sparkles size={18} />
            <span>Generar Planeación Didáctica</span>
          </motion.button>
        </motion.form>

        {/* Panel de Resultados o Estado Inicial */}
        <div className="lg:col-span-7 space-y-4">
          {loading ? (
            <LoadingCard
              title="Generando Planeación Didáctica SEP"
              steps={steps}
              seconds={seconds}
              onCancel={handleCancel}
            />
          ) : result ? (
            <motion.div variants={staggerItem} className="glass-card glow-border p-6 md:p-8 space-y-6">
              {/* Top Bar actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-nem-green dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-500/30">
                    {result.grado}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {result.campoFormativo}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex bg-slate-100 dark:bg-nem-dark p-1 rounded-xl border border-slate-200 dark:border-emerald-900/40">
                    <button
                      onClick={() => setViewMode('cards')}
                      className={cn("px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer", viewMode === 'cards' ? "bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xs" : "text-slate-500")}
                    >
                      Secciones
                    </button>
                    <button
                      onClick={() => setViewMode('document')}
                      className={cn("px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer", viewMode === 'document' ? "bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xs" : "text-slate-500")}
                    >
                      Documento Completo
                    </button>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-emerald-800/60 bg-white dark:bg-nem-dark hover:bg-slate-50 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    title="Copiar contenido"
                  >
                    {copied ? <Check size={17} className="text-emerald-600" /> : <Copy size={17} />}
                  </button>

                  <button
                    onClick={downloadDoc}
                    className="nem-button flex items-center gap-2 py-2.5 px-4 text-xs font-bold shadow-md cursor-pointer"
                  >
                    <Download size={15} />
                    <span>Descargar Word</span>
                  </button>
                </div>
              </div>

              {/* Título y detalles */}
              <div className="space-y-3">
                <h3 className="text-2xl font-serif font-extrabold text-slate-900 dark:text-white">
                  {result.titulo}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">📖 {result.libroTexto}</span>
                  <span>•</span>
                  <span>Lección: {formData.leccion}</span>
                </div>
              </div>

              {/* Ejes Articuladores badge list */}
              {result.ejesArticuladores && result.ejesArticuladores.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {result.ejesArticuladores.map((eje, idx) => (
                    <span key={idx} className="text-[11px] font-medium bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-200/70 dark:border-amber-500/30 px-2.5 py-1 rounded-lg">
                      ✨ {eje}
                    </span>
                  ))}
                </div>
              )}

              {/* Contenido según vista */}
              {viewMode === 'cards' ? (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-nem-dark/70 border border-slate-200/80 dark:border-emerald-900/40 space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-nem-green dark:text-emerald-400 flex items-center gap-2">
                      <GraduationCap size={16} />
                      <span>Proceso de Desarrollo de Aprendizaje (PDA)</span>
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      {result.pda}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-nem-dark/50 border border-slate-200/80 dark:border-emerald-900/40 space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">1. Inicio</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{result.inicio}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white dark:bg-nem-dark/50 border border-slate-200/80 dark:border-emerald-900/40 space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-nem-green dark:text-emerald-400">2. Desarrollo</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{result.desarrollo}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white dark:bg-nem-dark/50 border border-slate-200/80 dark:border-emerald-900/40 space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">3. Cierre</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{result.cierre}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-nem-dark/70 border border-slate-200/80 dark:border-emerald-900/40 space-y-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Evaluación Formativa</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{result.evaluacion}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-nem-dark/70 border border-slate-200/80 dark:border-emerald-900/40 space-y-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Recursos Didácticos</h4>
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        {result.recursos.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-nem-dark/80 border border-slate-200 dark:border-emerald-900/40 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-4 max-h-[500px] overflow-y-auto whitespace-pre-line leading-relaxed">
                  <div>
                    <strong className="text-nem-green">TÍTULO:</strong> {result.titulo}
                  </div>
                  <div>
                    <strong className="text-nem-green">GRADO Y CAMPO:</strong> {result.grado} | {result.campoFormativo}
                  </div>
                  <div>
                    <strong className="text-nem-green">LIBRO Y LECCIÓN:</strong> {result.libroTexto} - {formData.leccion}
                  </div>
                  <div>
                    <strong className="text-nem-green">PDA:</strong> {result.pda}
                  </div>
                  <div>
                    <strong className="text-nem-green">INICIO:</strong> {result.inicio}
                  </div>
                  <div>
                    <strong className="text-nem-green">DESARROLLO:</strong> {result.desarrollo}
                  </div>
                  <div>
                    <strong className="text-nem-green">CIERRE:</strong> {result.cierre}
                  </div>
                  <div>
                    <strong className="text-nem-green">EVALUACIÓN:</strong> {result.evaluacion}
                  </div>
                  <div>
                    <strong className="text-nem-green">RECURSOS:</strong> {result.recursos.join(', ')}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div variants={staggerItem} className="h-full min-h-[480px] glass-card glow-border flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 text-nem-green dark:text-emerald-400 flex items-center justify-center mb-4 shadow-sm">
                <FileText size={30} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Listo para planear</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
                Selecciona tu grado, libro SEP y lección en el panel izquierdo para generar una planeación didáctica rigurosa.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-nem-green dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-4 py-2 rounded-xl">
                <Sparkles size={14} />
                <span>Vinculación oficial SEP 2025-2026</span>
              </div>
            </motion.div>
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
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const [formData, setFormData] = useState({
    grado: '3º de Primaria',
    metodologia: METODOLOGIAS[0],
    problematica: '',
    ejes: [] as EjeArticulador[]
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
      const prompt = `Diseña un Proyecto Sociocrítico detallado para el ciclo escolar 2025-2026 de la Nueva Escuela Mexicana (NEM).
      Grado Escolar: ${formData.grado}
      Metodología NEM: ${formData.metodologia}
      Problemática o Situación Comunidad: ${formData.problematica}
      Ejes Articuladores: ${formData.ejes.join(', ')}
      Estructura requerida en JSON:
      - titulo (string)
      - grado (string)
      - metodologia (string)
      - proposito (string)
      - campoFormativo (string)
      - fases (array de objetos con { nombre, descripcion, actividades: string[] })
      - productoFinal (string)
      - sugerenciasEvaluacion (string)`;

      const data = await generarProyecto(prompt, controller.signal);
      setResult(data);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || "Ocurrió un error al generar el proyecto.");
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
      problematica: formData.problematica,
    });
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `${result.titulo}\nMetodología: ${result.metodologia}\n\nPROPÓSITO:\n${result.proposito}\n\nPRODUCTO FINAL:\n${result.productoFinal}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    "Analizando contexto y problemática sociocomunitaria...",
    "Seleccionando fases metodológicas de la NEM (ABPC/STEAM/ABP/AS)...",
    "Diseñando experiencias de aprendizaje situadas...",
    "Vinculando con los Ejes Articuladores y Campos Formativos...",
    "Estructurando el producto final y evaluación formativa...",
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.header variants={staggerItem} className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-emerald-900/40">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Metodologías NEM</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Diseñador de Proyectos</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Proyectos comunitarios y sociocríticos</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Formulario */}
        <motion.form variants={staggerItem} onSubmit={handleGenerate} className="lg:col-span-5 glass-card p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[11px]">1</span>
              <span>Parámetros Metodológicos</span>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Grado Escolar</label>
                <select
                  className="nem-input cursor-pointer"
                  value={formData.grado}
                  onChange={e => setFormData({...formData, grado: e.target.value})}
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
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Metodología NEM</label>
                <select
                  className="nem-input cursor-pointer"
                  value={formData.metodologia}
                  onChange={e => setFormData({...formData, metodologia: e.target.value as Metodologia})}
                >
                  {METODOLOGIAS.map((met) => (
                    <option key={met} value={met}>{met}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-emerald-900/40" />

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[11px]">2</span>
              <span>Problemática Comunitaria</span>
            </div>

            <textarea
              className="w-full p-4 border border-slate-200 dark:border-emerald-900/60 rounded-2xl bg-white dark:bg-nem-dark focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-700 dark:text-slate-200 h-28 resize-none text-sm"
              placeholder="Describe la situación real de la comunidad o selecciona una idea rápida abajo..."
              value={formData.problematica}
              onChange={e => setFormData({...formData, problematica: e.target.value})}
            />

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Problemáticas sugeridas:</span>
              <div className="space-y-1.5">
                {problematicasSugeridas.map((prob, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({...formData, problematica: prob})}
                    className="w-full text-left text-xs bg-slate-50 dark:bg-nem-dark/70 hover:bg-amber-50 dark:hover:bg-emerald-900/30 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-emerald-950 p-2.5 rounded-xl transition-colors line-clamp-1 cursor-pointer"
                  >
                    💡 {prob}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-start gap-3">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">{error}</p>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !formData.problematica.trim()}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Sparkles size={18} />
            <span>Diseñar Proyecto Sociocrítico</span>
          </motion.button>
        </motion.form>

        {/* Panel de Resultados */}
        <div className="lg:col-span-7 space-y-4">
          {loading ? (
            <LoadingCard
              title="Diseñando Proyecto Sociocrítico NEM"
              steps={steps}
              seconds={seconds}
              onCancel={handleCancel}
            />
          ) : result ? (
            <motion.div variants={staggerItem} className="glass-card glow-border p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-200/70 dark:border-amber-500/30">
                    {result.grado}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[240px]">
                    {result.metodologia}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-emerald-800/60 bg-white dark:bg-nem-dark hover:bg-slate-50 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    title="Copiar contenido"
                  >
                    {copied ? <Check size={17} className="text-emerald-600" /> : <Copy size={17} />}
                  </button>

                  <button
                    onClick={downloadDoc}
                    className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download size={15} />
                    <span>Descargar Word</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-serif font-extrabold text-slate-900 dark:text-white">
                  {result.titulo}
                </h3>
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20 space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">Propósito del Proyecto</h4>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.proposito}</p>
                </div>
              </div>

              {/* Fases del proyecto */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Fases del Proyecto</h4>
                {result.fases.map((fase, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-nem-dark/60 border border-slate-200 dark:border-emerald-900/40 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white">{fase.nombre}</h5>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{fase.descripcion}</p>
                    {fase.actividades && fase.actividades.length > 0 && (
                      <ul className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-emerald-900/30">
                        {fase.actividades.map((act, i) => (
                          <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                            <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-nem-dark/80 border border-slate-200 dark:border-emerald-900/40 space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Producto Final</h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{result.productoFinal}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-nem-dark/80 border border-slate-200 dark:border-emerald-900/40 space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Evaluación Formativa</h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{result.sugerenciasEvaluacion}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div variants={staggerItem} className="h-full min-h-[480px] glass-card glow-border flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 shadow-sm">
                <Layout size={30} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Diseño de Proyectos NEM</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
                Selecciona la metodología y plantea la problemática comunitaria para estructurar un proyecto sociocrítico completo.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/15 px-4 py-2 rounded-xl">
                <Sparkles size={14} />
                <span>ABPC, STEAM, ABP y AS</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function IlustracionView() {
  const [descripcion, setDescripcion] = useState('');
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descripcion }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al buscar el recurso.');
      }

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
        {/* Formulario */}
        <motion.div variants={staggerItem} className="lg:col-span-5 glass-card p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              1. Describe el Recurso Visual Didáctico
            </h2>
            
            <form onSubmit={handleBuscar} className="space-y-4">
              <textarea
                className="w-full p-4 border border-slate-200 dark:border-emerald-900/60 rounded-2xl bg-white dark:bg-nem-dark focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-700 dark:text-slate-200 h-32 resize-none text-sm"
                placeholder="Ej. Partes de una planta con raíz, tallo, hojas y flor..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              {/* Ideas rápidas */}
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Ideas rápidas:
                </span>
                <div className="flex flex-wrap gap-2">
                  {EJEMPLOS_ILUSTRACION.map((idea, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setDescripcion(idea)}
                      className="text-xs bg-slate-50 dark:bg-nem-dark/70 hover:bg-sky-50 dark:hover:bg-emerald-900/30 hover:text-sky-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-emerald-950 px-3 py-1.5 rounded-xl transition-colors text-left cursor-pointer"
                    >
                      + {idea}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                  <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !descripcion.trim()}
                className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-2xl shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                    <span>Buscando lámina educativa...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5" />
                    <span>Buscar Recurso Visual</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Columna Derecha: El Lienzo Educativo */}
        <motion.div variants={staggerItem} className="lg:col-span-7 glass-card p-6 flex flex-col items-center justify-center min-h-[500px]">
          {imageUrl ? (
            <div className="w-full flex flex-col items-center space-y-4">
              <div className="w-full flex justify-between items-center">
                <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/15 px-3 py-1 rounded-full border border-sky-100 dark:border-sky-500/30">
                  Lámina lista para clase
                </span>
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400 flex items-center gap-1.5 bg-slate-50 dark:bg-nem-dark hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-emerald-900/60 transition-colors"
                >
                  <Download size={15} />
                  <span>Descargar Imagen</span>
                </a>
              </div>
              
              <div className="relative w-full h-[400px] bg-slate-50 dark:bg-nem-dark/80 border border-slate-200 dark:border-emerald-900/60 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                <img
                  src={imageUrl}
                  alt="Recurso educativo EduNEM"
                  className="max-h-full max-w-full object-contain rounded-xl"
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
                Escribe un tema o selecciona una idea rápida para mostrar la lámina didáctica en tiempo real.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
