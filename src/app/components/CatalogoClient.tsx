"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Auto {
  _id: string;
  marca: string;
  region: string;
  tipoCarroceria: string;
  precio: number;
  imagen: string;
}

export default function CatalogoClient() {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAutos = async () => {
        const queryParams = searchParams.toString();
        console.log("Query Params enviados a la API:", queryParams);
      
        try {
          const response = await fetch(
            `http://146.190.52.199:8080/api/autos/buscar${queryParams ? `?${queryParams}` : ""}`
          );
          console.log("Respuesta completa de la API:", response);
      
          if (!response.ok) {
            throw new Error("Error al obtener los datos de la API");
          }
      
          const data = await response.json();
          console.log("Datos obtenidos de la API:", data);
      
          setAutos(data);
        } catch (err) {
          console.error("Error de conexión:", err);
          setError("No se pudieron cargar los autos.");
        }
      };

    fetchAutos();
  }, [searchParams]); // Ejecuta la lógica cada vez que cambien los filtros en la URL

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      {error && <p className="text-red-500 text-center">{error}</p>}

      {autos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {autos.map((auto) => (
            <div key={auto._id} className="bg-white rounded shadow p-4">
              <h2>{auto.marca}</h2>
              <p>{auto.region}</p>
              <p>{auto.tipoCarroceria}</p>
              <p>${auto.precio.toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No se encontraron autos.</p>
      )}
    </main>
  );
}
