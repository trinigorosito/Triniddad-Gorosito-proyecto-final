'use client';

import { useEffect, useState } from 'react';
import NovedadItem from '@/componentes/novedadItem';

export default function Novedades() {
  const [novedades, setNovedades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarNovedades = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/novedades');
        if (!res.ok) throw new Error('No se pudo obtener la cartelera');
        const data = await res.json();
        setNovedades(data);
      } catch (err) {
        console.error('Error al pedir datos:', err);
        setError('Ocurrió un error al cargar las obras. Por favor intenta más tarde.');
      } finally {
        setCargando(false);
      }
    };

    cargarNovedades();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Temporada Actual
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Cartelera de Obras
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Descubre las últimas producciones, funciones y novedades teatrales disponibles.
          </p>
          <div className="mt-4 mx-auto w-16 h-1 bg-indigo-600 rounded-full"></div>
        </header>

        {cargando && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
                <div className="h-52 bg-slate-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !cargando && (
          <div className="max-w-md mx-auto text-center p-6 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {!cargando && !error && novedades.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 max-w-lg mx-auto">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-slate-700">Sin obras disponibles</h3>
            <p className="mt-1 text-sm text-slate-500">Pronto anunciaremos nuevas funciones en cartelera.</p>
          </div>
        )}

        {!cargando && !error && novedades.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {novedades.map((item) => (
              <NovedadItem
                key={item.id}
                title={item.titulo}
                subtitle={item.subtitulo}
                body={item.cuerpo}
                imagen={item.imagen}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}