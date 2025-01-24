"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Auto {
  _id: string;
  marca: string;
  region: string;
  tipoCarroceria: string;
  precio: number;
  imagen: string;
}

export default async function AutoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Resolver `params` como promesa
  const [auto, setAuto] = useState<Auto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAuto = async () => {
      try {
        const response = await fetch(
          `http://146.190.52.199:8080/api/autos/detalle/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setAuto(data);
        } else {
          setError("No se pudo obtener los detalles del auto.");
        }
      } catch (error) {
        setError("Error al conectar con la API.");
        console.error("Error al conectar con la API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuto();
  }, [id]);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800">
        <p className="text-xl font-semibold">Cargando detalles del auto...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-600">{error}</p>
          <button
            onClick={() => router.push("/catalogo")}
            className="mt-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition"
          >
            Volver al catálogo
          </button>
        </div>
      </main>
    );
  }

  if (!auto) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800">
        <div className="text-center">
          <p className="text-xl font-semibold">Auto no encontrado.</p>
          <button
            onClick={() => router.push("/catalogo")}
            className="mt-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition"
          >
            Volver al catálogo
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-gray-800">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Columna de la imagen */}
          <div>
            <Image
              src={auto.imagen}
              alt={`Imagen del auto ${auto.marca} en la región ${auto.region}`}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Columna de los detalles */}
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{auto.marca}</h1>
            <p className="text-gray-600 text-lg mb-4">
              <strong>Región:</strong> {auto.region}
            </p>
            <p className="text-gray-600 text-lg mb-4">
              <strong>Tipo de Carrocería:</strong> {auto.tipoCarroceria}
            </p>
            <p className="text-gray-900 text-2xl font-semibold">
              <strong>Precio:</strong> ${auto.precio.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {/* Botón de regreso */}
      <div className="text-center mt-6">
        <button
          onClick={() => router.push("/catalogo")}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition"
        >
          Volver al catálogo
        </button>
      </div>
    </main>
  );
}
