"use client"

import { useState } from "react";

interface SearchProps {
  onSearch: (filters: Record<string, string>) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [filters, setFilters] = useState({
    marca: "",
    region: "",
    tipoCarroceria: "",
    precioMax: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters); // Enviamos los filtros al componente padre
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-md flex flex-wrap gap-4"
    >
      {/* Marca */}
      <div className="flex flex-col">
        <label htmlFor="marca" className="text-gray-700 font-medium">
          Marca
        </label>
        <input
          type="text"
          id="marca"
          name="marca"
          value={filters.marca}
          onChange={handleChange}
          placeholder="Ej. Toyota"
          className="border rounded-md p-2"
        />
      </div>

      {/* Región */}
      <div className="flex flex-col">
        <label htmlFor="region" className="text-gray-700 font-medium">
          Región
        </label>
        <input
          type="text"
          id="region"
          name="region"
          value={filters.region}
          onChange={handleChange}
          placeholder="Ej. Metropolitana"
          className="border rounded-md p-2"
        />
      </div>

      {/* Tipo de carrocería */}
      <div className="flex flex-col">
        <label htmlFor="tipoCarroceria" className="text-gray-700 font-medium">
          Tipo de Carrocería
        </label>
        <input
          type="text"
          id="tipoCarroceria"
          name="tipoCarroceria"
          value={filters.tipoCarroceria}
          onChange={handleChange}
          placeholder="Ej. SUV"
          className="border rounded-md p-2"
        />
      </div>

      {/* Precio máximo */}
      <div className="flex flex-col">
        <label htmlFor="precioMax" className="text-gray-700 font-medium">
          Precio Máximo
        </label>
        <input
          type="number"
          id="precioMax"
          name="precioMax"
          value={filters.precioMax}
          onChange={handleChange}
          placeholder="Ej. 20000000"
          className="border rounded-md p-2"
        />
      </div>

      {/* Botón de búsqueda */}
      <div className="flex items-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
