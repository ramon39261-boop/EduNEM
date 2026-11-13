import React, { useState } from 'react';

export default function Ilustraciones() {
  const [descripcion, setDescripcion] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Ideas rápidas alineadas a temas escolares comunes
  const ideasRapidas = [
    "El ciclo del agua simplificado para niños",
    "Plato del Bien Comer con grupos de alimentos",
    "Partes de una planta con raíz, tallo, hojas y flor",
    "Sistema solar con los planetas alrededor del sol"
  ];

  const handleBuscar = async (e) => {
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
      {/* Columna Izquierda: Controles y Búsqueda */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            1. Describe el Recurso Visual Didáctico
          </h2>
          
          <form onSubmit={handleBuscar}>
            <textarea
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-700 h-32 resize-none text-sm"
              placeholder="Ej. Partes de una planta con raíz, tallo, hojas y flor..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />

            {/* Ideas rápidas */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Ideas rápidas:
              </span>
              <div className="flex flex-wrap gap-2">
                {ideasRapidas.map((idea, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setDescripcion(idea);
                    }}
                    className="text-xs bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors text-left"
                  >
                    + {idea}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading || !descripcion.trim()}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Buscando lámina educativa...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Buscar Recurso Visual
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Columna Derecha: El Lienzo Educativo */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[450px]">
        {imageUrl ? (
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Lámina lista para clase
              </span>
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-slate-600 hover:text-emerald-700 flex items-center gap-1 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar Imagen
              </a>
            </div>
            
            <div className="relative w-full h-[380px] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-2">
              <img
                src={imageUrl}
                alt="Recurso educativo EduNEM"
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-slate-700 mb-1">Lienzo Educativo EduNEM</h3>
            <p className="text-sm text-slate-400 max-w-xs">
              Escribe un tema o selecciona una idea rápida para mostrar la lámina didáctica en tiempo real.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
