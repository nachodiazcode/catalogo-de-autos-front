"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 opacity-20 blur-3xl"></div>

      {/* Contenido principal */}
      <div className="z-10 text-center p-8">
        {/* Título con padding extra */}
        <h1
          className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 leading-snug"
          style={{
            WebkitTextStroke: "1px transparent",
          }}
        >
          Catálogo de Autos
        </h1>

        {/* Descripción */}
        <p className="mt-2 text-lg text-gray-300 max-w-2xl mx-auto">
          Descubre la selección más exclusiva de vehículos a precios increíbles.
          Explora nuestra colección y encuentra el auto perfecto para ti.
        </p>

        {/* Botón con hover */}
        <div className="mt-8">
          <Link
            href="/catalogo"
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg hover:from-blue-500 hover:to-purple-500 transition"
          >
            Ver Catálogo
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-400 text-sm">
        <p>Creado con ❤️ para automovilistas</p>
      </footer>
    </main>
  );
}
