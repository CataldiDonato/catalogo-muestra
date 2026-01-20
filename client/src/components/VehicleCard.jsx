import { useNavigate, Link } from "react-router-dom";
import { formatPrice } from "../utils/formatters";

export default function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  // Obtener imagen de portada o primera imagen disponible
  const getCoverImage = () => {
    if (vehicle.images && Array.isArray(vehicle.images)) {
      const coverImage = vehicle.images.find((img) => img.is_cover);
      if (coverImage) return coverImage.image_path;
      if (vehicle.images.length > 0) return vehicle.images[0].image_path;
    }
    return vehicle.image_url;
  };

  const coverImage = getCoverImage();

  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col h-full border border-slate-700 group">
      {/* Imagen con Aspect Ratio controlado */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-900">
        <Link to={`/catalogo/${vehicle.id}`} className="block h-full">
          <img
            src={coverImage}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {/* Overlay gradiente suave */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {vehicle.year && (
            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md border border-slate-700">
              {vehicle.year}
            </span>
          )}
          {vehicle.category && (
            <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              {vehicle.category}
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-blue-500 text-xs font-bold tracking-wider uppercase mt-1">
             {vehicle.motor || 'Motor pendiente'}
          </p>
        </div>

        {/* Info Rápida */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
             <p className="text-[10px] text-slate-500 uppercase font-bold">Recorrido</p>
             <p className="text-xs text-slate-300 font-semibold">{vehicle.km ? `${vehicle.km} km` : '0 km'}</p>
          </div>
          <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
             <p className="text-[10px] text-slate-500 uppercase font-bold">Transmisión</p>
             <p className="text-xs text-slate-300 font-semibold">{vehicle.transmision || 'N/A'}</p>
          </div>
        </div>

        {/* Precio */}
        <div className="mb-4">
          <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {formatPrice(vehicle.price, vehicle.currency)}
          </p>
        </div>

        <div className="mt-auto pt-2">
          <Link
            to={`/catalogo/${vehicle.id}`}
            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-blue-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-[0.98]"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>);
}
