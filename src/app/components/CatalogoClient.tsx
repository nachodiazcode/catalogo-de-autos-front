"use client";

import {  useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Search from "../components/Search";
import router from "next/router";

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
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAutos = async () => {
      // Leer parámetros de búsqueda de la URL
      const queryParams = searchParams.toString();

      try {
        const response = await fetch(
          `http://146.190.52.199:8080/api/autos${queryParams ? `?${queryParams}` : ""}`
        );

        if (response.ok) {
          const data = await response.json();
          setAutos(data); // Actualizar la lista de autos
        } else {
          console.error("Error al obtener los autos filtrados");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchAutos();
  }, [searchParams]); // Ejecutar cada vez que cambien los parámetros de búsqueda

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-gray-800">
      {/* Buscador */}
      <Search />

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
          <p className="text-center text-gray-600 col-span-full">
            No se encontraron autos con los filtros seleccionados.
          </p>
        )}
      </div>
    </main>
  );
}
