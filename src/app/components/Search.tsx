"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitar el envío predeterminado del formulario

    const formData = new FormData(e.currentTarget);
    const filters = new URLSearchParams();

    // Recolectar los valores de los campos del formulario
    formData.forEach((value, key) => {
      if (value) filters.append(key, value.toString());
    });

    // Validar si hay filtros aplicados antes de redirigir
    if (filters.toString()) {
      router.push(`/catalogo?${filters.toString()}`);
    } else {
      alert("Por favor, ingresa al menos un filtro para buscar.");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-4xl mx-auto mb-6 p-4 bg-white rounded-lg shadow-md flex flex-wrap gap-4"
    >
      {/* Campo para Marca */}
      <div className="flex flex-col w-full sm:w-1/2">
        <label htmlFor="marca" className="text-gray-700 font-medium">
          Marca
        </label>
        <input
          type="text"
          id="marca"
          name="marca"
          defaultValue={searchParams.get("marca") || ""}
          className="border rounded-md p-2"
          placeholder="Ej. Toyota"
          aria-label="Filtro por marca"
        />
      </div>

      {/* Campo para Región */}
      <div className="flex flex-col w-full sm:w-1/2">
        <label htmlFor="region" className="text-gray-700 font-medium">
          Región
        </label>
        <input
          type="text"
          id="region"
          name="region"
          defaultValue={searchParams.get("region") || ""}
          className="border rounded-md p-2"
          placeholder="Ej. Metropolitana"
          aria-label="Filtro por región"
        />
      </div>

      {/* Campo para Tipo de Carrocería */}
      <div className="flex flex-col w-full sm:w-1/2">
        <label htmlFor="tipoCarroceria" className="text-gray-700 font-medium">
          Tipo de Carrocería
        </label>
        <input
          type="text"
          id="tipoCarroceria"
          name="tipoCarroceria"
          defaultValue={searchParams.get("tipoCarroceria") || ""}
          className="border rounded-md p-2"
          placeholder="Ej. SUV"
          aria-label="Filtro por tipo de carrocería"
        />
      </div>

      {/* Campo para Precio Máximo */}
      <div className="flex flex-col w-full sm:w-1/2">
        <label htmlFor="precioMax" className="text-gray-700 font-medium">
          Precio Máximo
        </label>
        <input
          type="number"
          id="precioMax"
          name="precioMax"
          defaultValue={searchParams.get("precioMax") || ""}
          className="border rounded-md p-2"
          placeholder="Ej. 20000000"
          aria-label="Filtro por precio máximo"
          min="0"
        />
      </div>

      {/* Botón para Buscar */}
      <div className="flex items-end w-full">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition w-full"
          aria-label="Buscar autos con los filtros seleccionados"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
