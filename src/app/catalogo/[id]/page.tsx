import Image from "next/image";
import Link from "next/link";

interface Auto {
  _id: string;
  marca: string;
  region: string;
  tipoCarroceria: string;
  precio: number;
  imagen: string;
}

export default async function AutoDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const response = await fetch(`http://146.190.52.199:8080/api/autos/${resolvedParams.id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch the auto data.");
  }
  const auto: Auto = await response.json();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-gray-800">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <Image
              src={auto.imagen}
              alt={`Imagen del auto ${auto.marca} en la región ${auto.region}`}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
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
      <div className="text-center mt-6">
        <Link
          href="/catalogo"
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition inline-block"
        >
          Volver al catálogo
        </Link>
      </div>
    </main>
  );
}
