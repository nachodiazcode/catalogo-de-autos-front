"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Auto {
  _id: string;
  marca: string;
  region: string;
  tipoCarroceria: string;
  precio: number;
  imagen: string;
}

// Función para normalizar texto (quitar mayúsculas, tildes y caracteres especiales)
const normalizeText = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD") // Descompone caracteres como tildes
    .replace(/[\u0300-\u036f]/g, ""); // Elimina marcas diacríticas (tildes)

export default function Catalogo() {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    marca: "",
    region: "",
    tipoCarroceria: "",
    precio: "",
  });

  const fetchAutos = async (query = "") => {
    try {
      setLoading(true);
      const response = await fetch(`http://146.190.52.199:8080/api/autos/buscar?${query}`);
      const data = await response.json();
      setAutos(data);
    } catch (error) {
      console.error("Error al obtener los autos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutos();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = Object.entries(filters)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(normalizeText(value))}`) // Normaliza valores
      .join("&");
    fetchAutos(query);
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <p className="text-xl font-semibold">Cargando autos...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-white mb-6">
          Catálogo de Autos
        </h1>

        <form onSubmit={handleSearch} className="mb-8 flex flex-wrap items-center gap-4">
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={filters.marca}
            onChange={handleFilterChange}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400 focus:text-blue-900"
          />
          <input
            type="text"
            name="region"
            placeholder="Región"
            value={filters.region}
            onChange={handleFilterChange}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400 focus:text-blue-900"
          />
          <select
            name="tipoCarroceria"
            value={filters.tipoCarroceria}
            onChange={handleFilterChange}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400 focus:text-blue-900"
          >
            <option value="">Tipo de Carrocería</option>
            <option value="SUV">SUV</option>
            <option value="Sedán">Sedán</option>
            <option value="Pickup">Pickup</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Coupé">Coupé</option>
            <option value="Convertible">Convertible</option>
            <option value="Compacto">Compacto</option>
            <option value="Eléctrico">Eléctrico</option>
          </select>
          <input
            type="number"
            name="precio"
            placeholder="Precio máximo"
            value={filters.precio}
            onChange={handleFilterChange}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400 focus:text-blue-900"
            min="0"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Buscar
          </button>
        </form>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {autos.length > 0 ? (
            autos.map((auto) => (
              <Link
                href={`/catalogo/${auto._id}`}
                key={auto._id}
                className="block bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow break-inside-avoid"
              >
                <Image
                  src={auto.imagen}
                  alt={`Imagen de ${auto.marca}`}
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">{auto.marca}</h2>
                  <p className="text-gray-600">{auto.region}</p>
                  <p className="text-gray-500">{auto.tipoCarroceria}</p>
                  <p className="text-gray-900 font-semibold mt-2">
                    ${auto.precio.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-white text-xl font-semibold">
              No se encontraron autos que coincidan con los filtros aplicados.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
