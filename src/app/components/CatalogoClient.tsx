"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Search from "../components/Search";

interface Auto {
  _id: string;
  marca: string;
  region: string;
  tipoCarroceria: string;
  precio: number;
  imagen: string;
}

interface CatalogoClientProps {
  initialAutos: Auto[];
}

export default function CatalogoClient({ initialAutos }: CatalogoClientProps) {
  const [autos, setAutos] = useState(initialAutos);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchAutos = async () => {
        const queryParams = searchParams.toString();
      
        try {
          const response = await fetch(
            `http://146.190.52.199:8080/api/autos${queryParams ? `?${queryParams}` : ""}`
          );
      
          if (!response.ok) {
            throw new Error("Error al obtener los datos de la API");
          }
      
          const data = await response.json();
          console.log("Datos obtenidos:", data); // <-- Registra los datos en la consola
          setAutos(data);
          setError(null);
        } catch (err) {
          console.error("Error de conexión:", err);
          setError("No se pudo cargar el catálogo de autos. Intenta nuevamente más tarde.");
        }
      };

    fetchAutos();
  }, [searchParams]); // Ejecutar cada vez que cambien los parámetros de búsqueda

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-gray-800">
      {/* Buscador */}
      <Search />

      {/* Mensaje de error */}
      {error && (
        <div className="max-w-4xl mx-auto bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Lista de autos */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {autos.length > 0 ? (
          autos.map((auto) => (
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
          ))
        ) : (
          !error && ( // Mostrar este mensaje solo si no hay un error
            <p className="text-center text-gray-600 col-span-full">
              No se encontraron autos que coincidan con los filtros seleccionados.
            </p>
          )
        )}
      </div>
    </main>
  );
}
