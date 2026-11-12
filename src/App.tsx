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
  Wand2,
  Sun,
  Moon,
  Eye,
  LayoutGrid,
  Printer
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
                badge="IA"
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
            Automatiza tus planeaciones didácticas vinculadas a los libros SEP, estructura proyectos sociocríticos y crea láminas educativas listas para el aula.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('planeacion')}
              className="nem-button flex items-center gap-2"
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
            tag="Visuales sin texto"
            title="Ilustraciones Educativas"
            description="Genera esquemas y dibujos didácticos limpios para que tus alumnos los puedan rotular y colorear en clase."
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
                      ? "bg-nem-green/10 dark:bg-emerald-500/20 text-nem-green dark:text-emerald-300 border-nem-green/30 dark:border-emerald-500/40 font-semibold"
                      : "bg-white dark:bg-nem-dark/70 border-slate-200 dark:border-emerald-900/50 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                  )}
                >
                  {lec}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100 dark:border-emerald-900/40" />

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="w-5 h-5 rounded-full bg-nem-green dark:bg-emerald-600 text-white flex items-center justify-center text-[11px]">3</span>
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
                        ? "bg-nem-green dark:bg-emerald-600 text-white border-nem-green dark:border-emerald-500 shadow-xs" 
                        : "bg-white dark:bg-nem-dark/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-emerald-900/50 hover:border-nem-green/40 dark:hover:border-emerald-500/40"
                    )}
                  >
                    {eje}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="nem-button w-full flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
            <span>{loading ? `Generando (${seconds}s)...` : "Generar Planeación"}</span>
          </motion.button>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 rounded-2xl space-y-2">
              <div className="flex gap-2 text-red-700 dark:text-red-300 text-xs font-medium items-start">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p className="flex-1">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="text-xs text-red-700 dark:text-red-300 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} /> Reintentar
              </button>
            </div>
          )}
        </motion.form>

        {/* Vista Previa / Resultado */}
        <motion.div variants={staggerItem} className="lg:col-span-7">
          {loading ? (
            <LoadingCard
              title="Elaborando Secuencia Didáctica"
              steps={steps}
              seconds={seconds}
              onCancel={handleCancel}
            />
          ) : result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card glow-border overflow-hidden"
            >
              {/* Sticky Action & View Bar */}
              <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 bg-slate-50/90 dark:bg-[#0E1916]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-emerald-900/40">
                <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-nem-dark p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setViewMode('cards')}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                      viewMode === 'cards' 
                        ? "bg-white dark:bg-nem-dark-card text-slate-900 dark:text-white shadow-xs" 
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                    )}
                  >
                    <LayoutGrid size={13} />
                    <span>Tarjetas</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('document')}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                      viewMode === 'document' 
                        ? "bg-white dark:bg-nem-dark-card text-slate-900 dark:text-white shadow-xs" 
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                    )}
                  >
                    <Eye size={13} />
                    <span>Hoja Ejecutiva</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-emerald-800/60 bg-white dark:bg-nem-dark-card text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span>{copied ? "Copiado" : "Copiar"}</span>
                  </button>
                  <button 
                    onClick={downloadDoc}
                    type="button"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-nem-green dark:bg-emerald-600 text-white hover:brightness-110 transition-all shadow-xs cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Word (.doc)</span>
                  </button>
                </div>
              </div>

              {/* Contenido del Resultado */}
              {viewMode === 'cards' ? (
                <div className="p-6 md:p-8 space-y-6">
                  <div className="space-y-3 pb-5 border-b border-slate-100 dark:border-emerald-900/40">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/15 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 size={12} /> Secuencia Didáctica Generada
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                      {result.titulo}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-nem-green/10 dark:bg-emerald-500/20 text-nem-green dark:text-emerald-300">
                        {result.grado}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 flex items-center gap-1">
                        <BookOpen size={12} /> {result.libroTexto || 'Libro SEP'}
                      </span>
                      {result.campoFormativo && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {result.campoFormativo}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-nem-cream dark:bg-nem-dark/70 border border-slate-200/60 dark:border-emerald-900/40">
                      <Section title="Proceso de Desarrollo de Aprendizaje (PDA)" content={result.pda} />
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Momentos de la Clase</h4>
                      <div className="space-y-3">
                        <MomentCard badge="1" title="Inicio" content={result.inicio} accent="border-l-emerald-500" />
                        <MomentCard badge="2" title="Desarrollo" content={result.desarrollo} accent="border-l-nem-green dark:border-l-teal-400" />
                        <MomentCard badge="3" title="Cierre" content={result.cierre} accent="border-l-nem-gold" />
                      </div>
                    </div>

                    <Section title="Evaluación Formativa" content={result.evaluacion} />

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-emerald-900/40">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recursos y Materiales</h4>
                      <div className="flex flex-wrap gap-2">
                        {(result.recursos || []).map((r, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-nem-dark rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 border border-transparent dark:border-emerald-900/40">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Vista Hoja Ejecutiva (Papel editorial limpio) */
                <div className="p-4 sm:p-8 bg-slate-100/70 dark:bg-nem-dark/80">
                  <div className="bg-white text-slate-900 rounded-2xl shadow-md border border-slate-200 p-8 sm:p-10 space-y-6 max-w-2xl mx-auto">
                    <div className="border-b-2 border-nem-green pb-4 flex justify-between items-start gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-nem-green">Planeación Didáctica • NEM 2025-2026</p>
                        <h3 className="text-xl font-extrabold text-slate-900 mt-1">{result.titulo}</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Imprimir vista"
                      >
                        <Printer size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <div><strong className="text-slate-500">Grado:</strong> {result.grado}</div>
                      <div><strong className="text-slate-500">Libro SEP:</strong> {result.libroTexto}</div>
                      <div className="col-span-2"><strong className="text-slate-500">Campo Formativo:</strong> {result.campoFormativo}</div>
                    </div>

                    <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                      <div>
                        <h4 className="font-bold text-xs uppercase text-nem-green mb-1">PDA</h4>
                        <p className="whitespace-pre-line">{result.pda}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase text-nem-green mb-1">1. Inicio</h4>
                        <p className="whitespace-pre-line">{result.inicio}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase text-nem-green mb-1">2. Desarrollo</h4>
                        <p className="whitespace-pre-line">{result.desarrollo}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase text-nem-green mb-1">3. Cierre</h4>
                        <p className="whitespace-pre-line">{result.cierre}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase text-nem-green mb-1">Evaluación Formativa</h4>
                        <p className="whitespace-pre-line">{result.evaluacion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <EmptyPreview 
              icon={<FileText size={32} className="text-nem-green dark:text-emerald-400" />}
              title="Vista previa de tu planeación"
              description="Selecciona el grado, el libro de texto y la lección en el panel izquierdo para generar tu secuencia didáctica."
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function MomentCard({ badge, title, content, accent }: { badge: string; title: string; content: string; accent: string }) {
  return (
    <div className={cn("p-4 rounded-2xl bg-slate-50/80 dark:bg-nem-dark/60 border border-slate-200/60 dark:border-emerald-900/40 border-l-4 space-y-1.5", accent)}>
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-md bg-white dark:bg-nem-dark-card border border-slate-200 dark:border-emerald-800/60 text-xs font-bold text-slate-700 dark:text-emerald-300 flex items-center justify-center">
          {badge}
        </span>
        <h5 className="font-bold text-sm text-slate-900 dark:text-white">{title}</h5>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{content || 'En desarrollo'}</p>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="space-y-1.5">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</h4>
      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">{content || 'En desarrollo'}</p>
    </div>
  );
}

function EmptyPreview({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="h-full min-h-[480px] glass-card flex flex-col items-center justify-center p-10 text-center border-dashed">
      <div className="w-16 h-16 rounded-2xl bg-nem-green/10 dark:bg-emerald-500/15 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-1.5 leading-relaxed">{description}</p>
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
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.header variants={staggerItem} className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-emerald-900/40">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-nem-green dark:text-emerald-400">Aprendizaje Sociocrítico</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Diseñador de Proyectos</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Basados en problemáticas reales de tu comunidad</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <motion.form variants={staggerItem} onSubmit={handleGenerate} className="lg:col-span-5 glass-card p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="w-5 h-5 rounded-full bg-nem-green dark:bg-emerald-600 text-white flex items-center justify-center text-[11px]">1</span>
              <span>Grado y Metodología</span>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Grado Escolar</label>
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
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Metodología Sociocrítica</label>
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

          <hr className="border-slate-100 dark:border-emerald-900/40" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="w-5 h-5 rounded-full bg-nem-green dark:bg-emerald-600 text-white flex items-center justify-center text-[11px]">2</span>
                <span>Problemática Comunitaria</span>
              </div>
              <span className="text-[10px] font-bold text-nem-green dark:text-emerald-300 bg-nem-green/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full">
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

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="nem-button w-full flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
            <span>{loading ? `Diseñando (${seconds}s)...` : "Diseñar Proyecto"}</span>
          </motion.button>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 rounded-2xl space-y-2">
              <div className="flex gap-2 text-red-700 dark:text-red-300 text-xs font-medium items-start">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p className="flex-1">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="text-xs text-red-700 dark:text-red-300 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} /> Reintentar
              </button>
            </div>
          )}
        </motion.form>

        <motion.div variants={staggerItem} className="lg:col-span-7">
          {loading ? (
            <LoadingCard
              title="Diseñando Proyecto Sociocrítico"
              steps={steps}
              seconds={seconds}
              onCancel={handleCancel}
            />
          ) : result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card glow-border overflow-hidden"
            >
              {/* Sticky Action Bar */}
              <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 px-6 py-3.5 bg-slate-50/90 dark:bg-[#0E1916]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-emerald-900/40">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/15 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Proyecto estructurado
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-emerald-800/60 bg-white dark:bg-nem-dark-card text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span>{copied ? "Copiado" : "Copiar"}</span>
                  </button>
                  <button 
                    onClick={downloadDoc}
                    type="button"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-nem-green dark:bg-emerald-600 text-white hover:brightness-110 transition-all shadow-xs cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Word (.doc)</span>
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-3 pb-5 border-b border-slate-100 dark:border-emerald-900/40">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">{result.nombre}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-nem-green/10 dark:bg-emerald-500/20 text-nem-green dark:text-emerald-300">
                      {formData.grado}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300">
                      {result.metodologia}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-nem-cream dark:bg-nem-dark/70 border border-slate-200/60 dark:border-emerald-900/40">
                    <Section title="Propósito Formativo" content={result.proposito} />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Fases del Proyecto</h4>
                    <div className="space-y-3">
                      {(result.fases || []).map((fase, i) => (
                        <div key={i} className="p-4 bg-slate-50/80 dark:bg-nem-dark/60 rounded-2xl border border-slate-200/60 dark:border-emerald-900/40 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-nem-green dark:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            <h5 className="text-sm font-bold text-slate-900 dark:text-white">{fase.nombre}</h5>
                          </div>
                          <ul className="space-y-1.5 pl-8">
                            {(fase.actividades || []).map((act, j) => (
                              <li key={j} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed list-disc">
                                {act}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40">
                    <Section title="Producto Final Esperado" content={result.productoFinal} />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <EmptyPreview 
              icon={<Layout size={32} className="text-nem-green dark:text-emerald-400" />}
              title="Vista previa de tu proyecto"
              description="Define el grado, la metodología sociocrítica y la problemática comunitaria para estructurar las fases del proyecto."
            />
          )}
        </motion.div>
      </div>
    </motion.div>
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
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.header variants={staggerItem} className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-emerald-900/40">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-nem-green dark:text-emerald-400">Material Didáctico Visual</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Creador de Ilustraciones</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Láminas educativas limpias y sin etiquetas</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <motion.form variants={staggerItem} onSubmit={handleGenerate} className="lg:col-span-5 glass-card p-6 space-y-6">
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
                    className="text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-emerald-900/50 bg-white dark:bg-nem-dark/70 text-slate-600 dark:text-slate-300 hover:border-nem-green/50 dark:hover:border-emerald-500/50 hover:text-nem-green dark:hover:text-emerald-300 transition-colors text-left cursor-pointer"
                  >
                    + {ej}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-sky-50/80 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-800/40 rounded-2xl flex gap-3 text-sky-800 dark:text-sky-300 text-xs leading-relaxed">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-sky-600 dark:text-sky-400" />
            <p>Las ilustraciones se generan <strong>sin texto</strong> para que puedas imprimirlas y pedir a tus alumnos que identifiquen y escriban sus partes.</p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="nem-button w-full flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
            <span>{loading ? `Dibujando (${seconds}s)...` : "Generar Ilustración"}</span>
          </motion.button>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 rounded-2xl space-y-2">
              <div className="flex gap-2 text-red-700 dark:text-red-300 text-xs font-medium items-start">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p className="flex-1">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="text-xs text-red-700 dark:text-red-300 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} /> Reintentar
              </button>
            </div>
          )}
        </motion.form>

        <motion.div variants={staggerItem} className="lg:col-span-7">
          {loading ? (
            <LoadingCard
              title="Dibujando Recurso Visual"
              steps={steps}
              seconds={seconds}
              onCancel={handleCancel}
            />
          ) : image ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card glow-border overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50/90 dark:bg-[#0E1916]/90 border-b border-slate-200/80 dark:border-emerald-900/40">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/15 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Lámina lista para descargar
                </span>
                <button
                  onClick={downloadImage}
                  type="button"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-nem-green dark:bg-emerald-600 text-white hover:brightness-110 transition-all shadow-xs cursor-pointer"
                >
                  <Download size={14} />
                  <span>Descargar Imagen</span>
                </button>
              </div>

              <div className="p-6">
                <div className="relative group aspect-square max-h-[480px] mx-auto rounded-2xl overflow-hidden border border-slate-200/80 dark:border-emerald-900/40 flex items-center justify-center bg-white p-4">
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
              icon={<ImageIcon size={32} className="text-nem-green dark:text-emerald-400" />}
              title="Lienzo de ilustración"
              description="Describe el esquema, diagrama o dibujo que necesitas para tu clase y se mostrará aquí listo para descargar."
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
