"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Search from "../components/Search"; // Asegúrate de usar la ruta correcta

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-gray-800">
      {/* Buscador */}
      <Search />

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
