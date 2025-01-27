"use client";

import { useSearchParams, useRouter } from "next/navigation";

interface SearchProps {
  onSearchComplete?: (query: URLSearchParams) => void; // Callback opcional
}

export default function Search({ onSearchComplete }: SearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Manejar el envío del formulario
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const filters = new URLSearchParams();

    formData.forEach((value, key) => {
      if (value) filters.append(key, value.toString());
    });

    // Redirigir con los nuevos filtros
    router.push(`/catalogo?${filters.toString()}`);

    // Ejecutar el callback si se proporciona
    if (onSearchComplete) {
      onSearchComplete(filters);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-4xl mx-auto mb-6 p-4 bg-white rounded-lg shadow-md flex flex-wrap gap-4"
    >
      {/* Campo de Marca */}
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
        />
      </div>

      {/* Campo de Región */}
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
        />
      </div>

      {/* Campo de Tipo de Carrocería */}
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
        />
      </div>

      {/* Campo de Precio Máximo */}
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
        />
      </div>

      {/* Botón de Búsqueda */}
      <div className="flex items-end w-full">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition w-full"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
