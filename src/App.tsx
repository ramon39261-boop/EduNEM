function IlustracionView() {
  const [descripcion, setDescripcion] = useState('');
  const [estilo, setEstilo] = useState<'color' | 'bn'>('color');
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [seleccionada, setSeleccionada] = useState('');
  const [enlaces, setEnlaces] = useState<{ google: string; pinterest: string; educima: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuscar = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!descripcion.trim()) return;

    setLoading(true);
    setError('');
    setImagenes([]);
    setSeleccionada('');

    try {
      const response = await fetch('/api/ilustracion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descripcion, estilo }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al buscar recurso.');

      setEnlaces(data.enlaces || null);

      if (data.images && data.images.length > 0) {
        setImagenes(data.images);
        setSeleccionada(data.images[0]);
      } else {
        setError('No hubo coincidencia directa en el visor rápido. Usa los botones de Google Imágenes o Pinterest de abajo para ver cientos de fichas.');
      }
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const queryDirecta = estilo === 'bn'
    ? `${descripcion || 'ciclo del agua'} dibujo para colorear blanco y negro`
    : `${descripcion || 'ciclo del agua'} lamina educativa primaria`;

  const urlGoogleDirecta = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(queryDirecta)}`;
  const urlPinterestDirecta = `https://www.pinterest.com.mx/search/pins/?q=${encodeURIComponent(queryDirecta)}`;
  const urlEducimaDirecta = `https://www.educima.com/dibujos-para-colorear-busqueda.php?q=${encodeURIComponent(descripcion || 'agua')}`;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.header variants={staggerItem} className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-emerald-900/40">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">Recursos Visuales</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Buscador de Láminas Educativas</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Resultados instantáneos y enlaces a fichas escolares</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Panel Izquierdo */}
        <motion.div variants={staggerItem} className="lg:col-span-5 glass-card p-6 space-y-6">
          <form onSubmit={handleBuscar} className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white">1. Describe el Recurso Visual Didáctico</h2>
            <textarea
              className="w-full p-4 border border-slate-200 dark:border-emerald-900/60 rounded-2xl bg-white dark:bg-nem-dark focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-700 dark:text-slate-200 h-24 resize-none text-sm"
              placeholder="Ej. Partes de una planta, ciclo del agua, sistema solar..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />

            {/* Selector de Estilo */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Palette size={14} />
                <span>Estilo de visualización / impresión:</span>
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

            {error && <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 text-xs rounded-xl">{error}</div>}

            <button
              type="submit"
              disabled={loading || !descripcion.trim()}
              className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-2xl shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                  <span>Buscando láminas...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" />
                  <span>Buscar Láminas al Instante</span>
                </>
              )}
            </button>

            {/* Enlaces directos a bancos educativos externos */}
            <div className="pt-3 border-t border-slate-100 dark:border-emerald-900/40 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Abrir búsqueda completa en bancos educativos:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <a
                  href={enlaces?.google || urlGoogleDirecta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2.5 rounded-xl border border-slate-200 dark:border-emerald-900/60 bg-white dark:bg-nem-dark hover:bg-sky-50 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1 transition-colors text-center"
                >
                  <span>🔍 Google Imágenes</span>
                </a>
                <a
                  href={enlaces?.pinterest || urlPinterestDirecta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2.5 rounded-xl border border-slate-200 dark:border-emerald-900/60 bg-white dark:bg-nem-dark hover:bg-red-50 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1 transition-colors text-center"
                >
                  <span>📌 Pinterest</span>
                </a>
                <a
                  href={enlaces?.educima || urlEducimaDirecta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2.5 rounded-xl border border-slate-200 dark:border-emerald-900/60 bg-white dark:bg-nem-dark hover:bg-emerald-50 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1 transition-colors text-center"
                >
                  <span>🖍️ Dibujos Colorear</span>
                </a>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Panel Derecho: Resultados Instantáneos */}
        <motion.div variants={staggerItem} className="lg:col-span-7 glass-card p-6 flex flex-col justify-between min-h-[500px] space-y-5">
          {seleccionada ? (
            <>
              <div className="w-full flex justify-between items-center">
                <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/15 px-3 py-1 rounded-full border">
                  Vista previa ({estilo === 'bn' ? 'Blanco y Negro para imprimir' : 'A Color'})
                </span>
                <a
                  href={seleccionada}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-sky-700 flex items-center gap-1.5 bg-slate-50 dark:bg-nem-dark px-3.5 py-2 rounded-xl border"
                >
                  <Download size={15} />
                  <span>Abrir / Descargar</span>
                </a>
              </div>

              <div className="relative w-full h-[320px] bg-white border rounded-2xl overflow-hidden flex items-center justify-center p-3">
                <img
                  src={seleccionada}
                  alt={descripcion}
                  className={cn(
                    "max-h-full max-w-full object-contain rounded-xl transition-all duration-300",
                    estilo === 'bn' && "grayscale contrast-150 brightness-105"
                  )}
                />
              </div>

              {imagenes.length > 1 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-emerald-900/40">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Selecciona otra lámina encontrada ({imagenes.length}):
                  </span>
                  <div className="grid grid-cols-4 gap-2.5">
                    {imagenes.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSeleccionada(imgUrl)}
                        className={cn(
                          "h-20 bg-white border-2 rounded-xl overflow-hidden p-1 flex items-center justify-center transition-all cursor-pointer",
                          seleccionada === imgUrl
                            ? "border-sky-600 ring-2 ring-sky-500/30"
                            : "border-slate-200 hover:border-sky-400 opacity-80 hover:opacity-100"
                        )}
                      >
                        <img
                          src={imgUrl}
                          alt={`Opción ${idx + 1}`}
                          className={cn(
                            "max-h-full max-w-full object-contain",
                            estilo === 'bn' && "grayscale contrast-150"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="my-auto text-center p-8 space-y-3">
              <div className="w-16 h-16 bg-sky-50 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <ImageIcon size={30} />
              </div>
              <h3 className="text-base font-semibold text-slate-700 dark:text-white">Lienzo Educativo EduNEM</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                Busca al instante ilustraciones reales sin esperas o abre directamente las fichas en <strong>Google Imágenes</strong>, <strong>Pinterest</strong> o <strong>Educima</strong>.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
