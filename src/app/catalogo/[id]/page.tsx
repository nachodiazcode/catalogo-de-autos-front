import Image from "next/image";
import Link from "next/link";

// Definición de la interfaz para los datos de un auto
interface Auto {
  _id: string;
  marca: string;
  region: string;
  tipoCarroceria: string;
  precio: number;
  imagen: string;
}

// Componente para la página de detalle del auto
export default async function AutoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Resolviendo la promesa de `params` para obtener el ID
  const resolvedParams = await params;

  try {
    // Realizamos la solicitud para obtener los datos del auto
    const response = await fetch(
      `http://146.190.52.199:8080/api/autos/${resolvedParams.id}`
    );

    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("No se encontraron datos para este auto.");
    }

    const auto: Auto = await response.json();

    // Renderizamos la página con los datos del auto
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-gray-800">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Columna de la imagen */}
            <div>
              <Image
                src={auto.imagen}
                alt={`Imagen del auto ${auto.marca}`}
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Columna de los detalles */}
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
  } catch (error) {
    console.error("Error cargando los datos del auto:", error);

    // Renderizamos una página de error amigable
    return (
      <main className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold text-red-600">
            No se pudo cargar la información del auto.
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Por favor, intenta nuevamente más tarde.
          </p>
          <Link
            href="/catalogo"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }
}

// Generar las rutas estáticas para el catálogo
export async function generateStaticParams() {
  try {
    const response = await fetch("http://146.190.52.199:8080/api/autos");

    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error al obtener la lista de autos.");
    }

    const autos: Auto[] = await response.json();

    // Mapeamos los autos para generar las rutas dinámicas
    return autos.map((auto) => ({
      id: auto._id,
    }));
  } catch (error) {
    console.error("Error generando rutas estáticas:", error);

    // Si ocurre un error, no generamos rutas
    return [];
  }
}
