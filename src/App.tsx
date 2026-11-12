function IlustracionView() {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [estilo, setEstilo] = useState('escolar');
  const [pasos, setPasos] = useState(4);
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
      const url = await generarIlustracion(prompt, estilo, pasos, controller.signal);
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
    const link = document.createElement('a');
    link.href = image;
    link.download = `Ilustracion_EduNEM_${Date.now()}.jpg`;
    link.click();
  };

  const steps = [
    "Conectando con Cloudflare Workers AI (Flux.1)...",
    "Renderizando detalles pedagógicos y estilo visual...",
    "Optimizando contraste y legibilidad para los estudiantes...",
    "Finalizando recurso didáctico de alta definición...",
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.header variants={staggerItem} className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-emerald-900/40">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-nem-green dark:text-emerald-400">Cloudflare Workers AI</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Creador Avanzado de Ilustraciones</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Láminas educativas con Flux.1-schnell</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <motion.form variants={staggerItem} onSubmit={handleGenerate} className="lg:col-span-5 glass-card p-6 space-y-5">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              1. Describe el recurso visual
            </label>
            <textarea 
              required
              rows={3}
              className="nem-input resize-none" 
              placeholder="Ej. Un ciclo del agua simplificado para niños de primaria..." 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />

            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-400">Ideas rápidas:</p>
              <div className="flex flex-wrap gap-1.5">
                {EJEMPLOS_ILUSTRACION.map((ej) => (
                  <button
                    key={ej}
                    type="button"
                    onClick={() => setPrompt(ej)}
                    className="text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-emerald-900/50 bg-white dark:bg-nem-dark/70 text-slate-600 dark:text-slate-300 hover:border-nem-green/50 dark:hover:border-emerald-500/50 transition-colors text-left cursor-pointer truncate max-w-[240px]"
                  >
                    + {ej}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-emerald-900/40" />

          {/* Opciones Avanzadas de Cloudflare */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>2. Opciones de Estilo y Calidad</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Estilo Visual</label>
              <select
                className="nem-input cursor-pointer"
                value={estilo}
                onChange={e => setEstilo(e.target.value)}
              >
                <option value="escolar">🎨 Ilustración Escolar a Color (Vectorial amigable)</option>
                <option value="cientifico">🔬 Diagrama Científico / Técnico</option>
                <option value="acuarela">🖌️ Acuarela Educativa (Suave y artística)</option>
                <option value="lineart">✏️ Para Colorear (Líneas en blanco y negro)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Pasos de Renderizado (Cloudflare Flux.1)</label>
                <span className="font-mono font-bold text-nem-green dark:text-emerald-400">{pasos} pasos</span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="8" 
                step="1"
                value={pasos} 
                onChange={e => setPasos(parseInt(e.target.value, 10))}
                className="w-full accent-nem-green dark:accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Más rápido (2)</span>
                <span>Equilibrado (4)</span>
                <span>Mayor detalle (8)</span>
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="nem-button w-full flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
            <span>{loading ? `Generando con Cloudflare (${seconds}s)...` : "Generar con Cloudflare AI"}</span>
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
              title="Generando Ilustración con Cloudflare"
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
                  <CheckCircle2 size={14} /> Flux.1-schnell completado
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
                    alt="Ilustración didáctica generada por Cloudflare" 
                    className="w-full h-full object-contain rounded-xl" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <EmptyPreview 
              icon={<ImageIcon size={32} className="text-nem-green dark:text-emerald-400" />}
              title="Lienzo Cloudflare AI"
              description="Selecciona un estilo visual, ajusta los pasos de renderizado y genera tu lámina educativa sin texto."
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
