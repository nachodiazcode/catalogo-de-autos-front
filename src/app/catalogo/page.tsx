"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Auto {
  _id: string;
  marca: string;
  region: string;
  tipoCarroceria: string;
  precio: number;
  imagen: string;
}

interface CatalogoClientProps {
  initialAutos: Auto[]; // Define el tipo de `initialAutos`
}

export default function CatalogoClient({ initialAutos }: CatalogoClientProps) {
  const [autos, setAutos] = useState<Auto[]>(initialAutos);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAutos = async () => {
      const queryParams = searchParams.toString();

      try {
        const response = await fetch(
          `http://146.190.52.199:8080/api/autos${queryParams ? `?${queryParams}` : ""}`
        );

        if (response.ok) {
          const data = await response.json();
          setAutos(data);
        } else {
          console.error("Error al obtener los autos filtrados");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchAutos();
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-gray-800">
      {autos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {autos.map((auto) => (
            <div key={auto._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={auto.imagen} alt={auto.marca} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{auto.marca}</h2>
                <p>{auto.region}</p>
                <p>{auto.tipoCarroceria}</p>
                <p>${auto.precio.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No se encontraron autos</p>
      )}
    </main>
  );
}
