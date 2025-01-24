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

export default async function AutoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Resolver los parámetros dinámicos
  const resolvedParams = await params;

  // Obtener los datos del auto desde la API
  const response = await fetch(
    `http://146.190.52.199:8080/api/autos/${resolvedParams.id}`
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener los datos del auto.");
  }

  const auto: Auto = await response.json();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-gray-800">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Columna de imagen */}
          <div>
            <Image
              src={auto.imagen}
              alt={`Imagen del auto ${auto.marca}`}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Columna de detalles */}
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {auto.marca}
            </h1>
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
      {/* Botón para volver al catálogo */}
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

// Generar las rutas estáticas para el catálogo
export async function generateStaticParams() {
  const response = await fetch("http://146.190.52.199:8080/api/autos");

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de autos.");
  }

  const autos: Auto[] = await response.json();

  return autos.map((auto) => ({
    id: auto._id,
  }));
}
