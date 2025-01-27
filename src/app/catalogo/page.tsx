import CatalogoClient from "../components/CatalogoClient";

export default async function CatalogoPage() {
  // Fetch inicial de los datos desde la API
  const response = await fetch("http://146.190.52.199:8080/api/autos", {
    cache: "no-store", // Evitar el cache para obtener siempre datos frescos
  });

  if (!response.ok) {
    throw new Error("Error al obtener los autos");
  }

  const autos = await response.json();

  // Renderizar el componente cliente con los datos iniciales
  return <CatalogoClient initialAutos={autos} />;
}
