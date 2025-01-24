import Image from "next/image";
import Link from "next/link";
import Search from "../../components/Search"; // Importamos el componente

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
  const resolvedParams = await params;

  const handleSearch = async (filters: Record<string, string>) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`http://146.190.52.199:8080/api/autos?${query}`);

    if (response.ok) {
      const autos: Auto[] = await response.json();
      console.log("Resultados:", autos);
    } else {
      console.error("Error al filtrar los autos");
    }
  };

  try {
    const response = await fetch(
      `http://146.190.52.199:8080/api/autos/detalle/${resolvedParams.id}`
    );

    if (!response.ok) {
      throw new Error("No se encontraron datos para este auto.");
    }

    const auto: Auto = await response.json();

    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-gray-800">
        {/* Usamos el componente de búsqueda */}
        <Search onSearch={handleSearch} />

        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <Image
                src={auto.imagen}
                alt={`Imagen del auto ${auto.marca}`}
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
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
