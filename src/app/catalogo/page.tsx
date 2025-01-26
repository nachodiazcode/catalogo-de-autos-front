"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Auto {
  _id: string;
  marca: string;
  region: string;
  tipoCarroceria: string;
  precio: number;
  imagen: string;
}

export default function Catalogo({ autos }: { autos: Auto[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const filters: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (value) {
        filters[key] = value.toString();
      }
    });

    // Convertimos los filtros en query parameters y navegamos a la misma página con los filtros aplicados
    const queryString = new URLSearchParams(filters).toString();
    router.push(`/catalogo?${queryString}`);
  };

  // Leer los filtros de los query parameters
  const filteredAutos = autos.filter((auto) => {
    const marca = searchParams.get("marca") || "";
    const region = searchParams.get("region") || "";
    const tipoCarroceria = searchParams.get("tipoCarroceria") || "";
    const precioMax = parseInt(searchParams.get("precioMax") || "0", 10);

    return (
      (!marca || auto.marca.toLowerCase().includes(marca.toLowerCase())) &&
      (!region || auto.region.toLowerCase().includes(region.toLowerCase())) &&
      (!tipoCarroceria ||
        auto.tipoCarroceria.toLowerCase().includes(tipoCarroceria.toLowerCase())) &&
      (!precioMax || auto.precio <= precioMax)
    );
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-gray-800">
      {/* Formulario de búsqueda */}
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

      {/* Lista de autos filtrados */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAutos.map((auto) => (
          <div
            key={auto._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
            onClick={() => router.push(`/catalogo/${auto._id}`)}
          >
            <div className="h-48 relative">
              <Image
                src={auto.imagen}
                alt={`Imagen del auto ${auto.marca}`}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-900">{auto.marca}</h2>
              <p className="text-gray-600">
                <strong>Región:</strong> {auto.region}
              </p>
              <p className="text-gray-600">
                <strong>Tipo:</strong> {auto.tipoCarroceria}
              </p>
              <p className="text-gray-900 font-semibold mt-2">
                ${auto.precio.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
