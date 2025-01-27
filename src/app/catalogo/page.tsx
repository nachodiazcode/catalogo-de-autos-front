"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface Auto {
  _id: string;
  marca: string;
  region: string;
  tipoCarroceria: string;
  precio: number;
  imagen: string;
}

export default function CatalogoClient({ autos }: { autos: Auto[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filters = new URLSearchParams();

    formData.forEach((value, key) => {
      if (value) filters.append(key, value.toString());
    });

    router.push(`/catalogo?${filters.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-gray-800">
      {/* Buscador */}
      <form
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto mb-6 p-4 bg-white rounded-lg shadow-md flex flex-wrap gap-4"
      >
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
        <div className="flex items-end w-full">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition w-full"
          >
            Buscar
          </button>
        </div>
      </form>

      {/* Lista de autos */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {autos.map((auto) => (
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
