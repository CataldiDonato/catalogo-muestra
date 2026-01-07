import { useNavigate } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.price);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Imagen */}
      <div className="relative overflow-hidden h-56 bg-gray-200">
        <img
          src={vehicle.image_url}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/500x400?text=Auto+No+Disponible";
          }}
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          {vehicle.year}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {vehicle.brand}
        </h3>
        <p className="text-lg text-gray-700 font-semibold mb-3">
          {vehicle.model}
        </p>

        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
          {vehicle.description}
        </p>

        <div className="border-t border-gray-200 pt-4 mt-auto">
          <p className="text-3xl font-bold text-blue-600">{formattedPrice}</p>
        </div>

        <button
          onClick={() => navigate(`/catalogo/${vehicle.id}`)}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
}
