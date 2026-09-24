'use client';

import { useState } from 'react';

export default function ContactoPage() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-xl">
      <h2 className="text-3xl font-bold tracking-tight text-amber-500 mb-2 text-center">
        Contactanos
      </h2>
      <p className="text-sm text-zinc-400 mb-6 text-center">
          Si queres publicar tu obra de teatro completa estos datos!
      </p>

      {enviado ? (
        <div className="rounded-lg bg-emerald-950/60 border border-emerald-600/50 p-4 text-center text-emerald-400">
          ¡Gracias por tu mensaje! Te responderemos a la brevedad.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-zinc-300 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              placeholder="Tu nombre completo"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>
             <div>
            <label htmlFor="nombreDeLaObra" className="block text-sm font-medium text-zinc-300 mb-1">
              Nombre de la obra
            </label>
            <input
              type="text"
              id="nombreDeLaObra"
              name="nombreDeLaObra"
              required
              placeholder="El nombre de la obra"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="tu@email.com"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="mensaje" className="block text-sm font-medium text-zinc-300 mb-1">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              required
              placeholder="Escribinos una pequeña sinopsis y mandanos el flayer"
              className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-amber-500 py-2.5 font-semibold text-zinc-950 transition-colors hover:bg-amber-400 cursor-pointer"
          >
            Enviar Mensaje
          </button>
        </form>
      )}
    </div>
  );
}