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

export function App() {
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
          className="flex items-center gap-2.5 text-left cursor-pointer"
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
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-900/30 transition-colors cursor-pointer"
            aria-label="Cambiar tema"
          >
            {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-900/30 transition-colors cursor-pointer"
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
              className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
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

export default App;

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
          ? "
