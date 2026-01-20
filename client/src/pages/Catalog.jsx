import { useState, useEffect } from "react";
import VehicleCard from "../components/VehicleCard";
import API_ENDPOINTS from "../config";

export default function Catalog() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  // Filtros
  const [selectedBrand, setSelectedBrand] = useState("todos");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedFuel, setSelectedFuel] = useState("todos");
  const [selectedTransmission, setSelectedTransmission] = useState("todos");
  const [selectedTraction, setSelectedTraction] = useState("todos");
  const [sortBy, setSortBy] = useState("name");

  // Obtener vehículos (ahora publicaciones) del backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.PUBLICATIONS);
        if (!response.ok) {
          throw new Error("Error al obtener las publicaciones");
        }
        const data = await response.json();
        
        // Mapear la estructura nueva a la vieja para compatibilidad
        // La API devuelve: { id, title, price, description, category, specs: { brand, model... } }
        // Flatten specs para que el código existente funcione (v.brand, v.model)
        const mappedData = data.map(item => ({
             ...item,
             ...item.specs, // Flatten specs
             // Asegurar título si brand/model no existen en specs (casos nuevos)
             brand: item.specs?.brand || (item.title ? item.title.split(' ')[0] : 'Varios'), 
             model: item.specs?.model || (item.title ? item.title.substring(item.title.indexOf(' ')+1) : ''),
        }));

        setVehicles(mappedData);
        // Calcular rango de precios máximo
        const maxPrice = mappedData.length > 0 ? Math.max(...mappedData.map((v) => Number(v.price))) : 100000;
        setPriceRange([0, maxPrice]);
        setFilteredVehicles(mappedData);
        setError(null);
      } catch (err) {
        console.error("Error:", err);
        setError(
          "No pudimos cargar el catálogo. Por favor, intenta más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Calcular opciones disponibles dinámicamente
  const getAvailableBrands = () => {
    let filtered = vehicles;
    if (selectedFuel !== "todos")
      filtered = filtered.filter((v) => v.combustible === selectedFuel);
    if (selectedTransmission !== "todos")
      filtered = filtered.filter((v) => v.transmision === selectedTransmission);
    if (selectedTraction !== "todos")
      filtered = filtered.filter((v) => v.traccion === selectedTraction);
    filtered = filtered.filter(
      (v) => v.price >= priceRange[0] && v.price <= priceRange[1]
    );
    return ["todos", ...new Set(filtered.map((v) => v.brand).filter(Boolean))].sort();
  };

  const getAvailableFuels = () => {
    let filtered = vehicles;
    if (selectedBrand !== "todos")
      filtered = filtered.filter((v) => v.brand === selectedBrand);
    if (selectedTransmission !== "todos")
      filtered = filtered.filter((v) => v.transmision === selectedTransmission);
    if (selectedTraction !== "todos")
      filtered = filtered.filter((v) => v.traccion === selectedTraction);
    filtered = filtered.filter(
      (v) => v.price >= priceRange[0] && v.price <= priceRange[1]
    );
    return ["todos", ...new Set(filtered.map((v) => v.combustible).filter(Boolean))].sort();
  };

  const getAvailableTransmissions = () => {
    let filtered = vehicles;
    if (selectedBrand !== "todos")
      filtered = filtered.filter((v) => v.brand === selectedBrand);
    if (selectedFuel !== "todos")
      filtered = filtered.filter((v) => v.combustible === selectedFuel);
    if (selectedTraction !== "todos")
      filtered = filtered.filter((v) => v.traccion === selectedTraction);
    filtered = filtered.filter(
      (v) => v.price >= priceRange[0] && v.price <= priceRange[1]
    );
    return ["todos", ...new Set(filtered.map((v) => v.transmision).filter(Boolean))].sort();
  };

  const getAvailableTractions = () => {
    let filtered = vehicles;
    if (selectedBrand !== "todos")
      filtered = filtered.filter((v) => v.brand === selectedBrand);
    if (selectedFuel !== "todos")
      filtered = filtered.filter((v) => v.combustible === selectedFuel);
    if (selectedTransmission !== "todos")
      filtered = filtered.filter((v) => v.transmision === selectedTransmission);
    filtered = filtered.filter(
      (v) => v.price >= priceRange[0] && v.price <= priceRange[1]
    );
    return ["todos", ...new Set(filtered.map((v) => v.traccion).filter(Boolean))].sort();
  };

  const getMaxPrice = () => {
    let filtered = vehicles;
    if (selectedBrand !== "todos")
      filtered = filtered.filter((v) => v.brand === selectedBrand);
    if (selectedFuel !== "todos")
      filtered = filtered.filter((v) => v.combustible === selectedFuel);
    if (selectedTransmission !== "todos")
      filtered = filtered.filter((v) => v.transmision === selectedTransmission);
    if (selectedTraction !== "todos")
      filtered = filtered.filter((v) => v.traccion === selectedTraction);
    return filtered.length > 0
      ? Math.max(...filtered.map((v) => Number(v.price)))
      : 100000;
  };

  const brands = getAvailableBrands();
  const fuels = getAvailableFuels();
  const transmissions = getAvailableTransmissions();
  const tractions = getAvailableTractions();
  const maxPrice = getMaxPrice();

  // Filtrar y ordenar vehículos
  useEffect(() => {
    let filtered = vehicles;

    // Filtrar por marca
    if (selectedBrand !== "todos") {
      filtered = filtered.filter((v) => v.brand === selectedBrand);
    }

    // Filtrar por rango de precio
    filtered = filtered.filter(
      (v) => v.price >= priceRange[0] && v.price <= priceRange[1]
    );

    // Filtrar por combustible
    if (selectedFuel !== "todos") {
      filtered = filtered.filter((v) => v.combustible === selectedFuel);
    }

    // Filtrar por transmisión
    if (selectedTransmission !== "todos") {
      filtered = filtered.filter((v) => v.transmision === selectedTransmission);
    }

    // Filtrar por tracción
    if (selectedTraction !== "todos") {
      filtered = filtered.filter((v) => v.traccion === selectedTraction);
    }

    // Ordenar
    if (sortBy === "precio-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "precio-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "año") {
      filtered.sort((a, b) => b.year - a.year);
    } else {
      // nombre (alfabético)
      filtered.sort((a, b) =>
        `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)
      );
    }

    setFilteredVehicles(filtered);
  }, [
    vehicles,
    selectedBrand,
    priceRange,
    selectedFuel,
    selectedTransmission,
    selectedTraction,
    sortBy,
  ]);

  // Función para limpiar filtros
  const clearFilters = () => {
    setSelectedBrand("todos");
    setSelectedFuel("todos");
    setSelectedTransmission("todos");
    setSelectedTraction("todos");
    setSortBy("name");
    if (vehicles.length > 0) {
      const maxPrice = Math.max(...vehicles.map((v) => Number(v.price)));
      setPriceRange([0, maxPrice]);
    }
  };

  // Estados para modales móviles
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2 lg:mb-4">
            Catálogo
          </h1>
          <p className="text-lg lg:text-xl text-slate-400">
            Disponibles: <span className="font-bold text-blue-400">{vehicles.length}</span>{" "}
            publicaciones
          </p>
        </div>

        {/* Botones Móviles (Sticky) */}
        {!loading && vehicles.length > 0 && (
          <div className="lg:hidden sticky top-4 z-40 bg-slate-900/95 backdrop-blur-sm shadow-md rounded-lg p-2 mb-6 flex gap-2 border border-slate-700">
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition border border-slate-700"
            >
              <span className="text-xl">🌪️</span> Filtrar
            </button>
            <button 
              onClick={() => setShowMobileSort(true)}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition border border-slate-700"
            >
              <span className="text-xl">⇅</span> Ordenar
            </button>
          </div>
        )}

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR FILTROS (Desktop) */}
          {!loading && vehicles.length > 0 && (
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-4 bg-slate-800 border border-slate-700 shadow-sm rounded-xl p-6 space-y-6">
                <FiltersContent 
                  brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}
                  maxPrice={maxPrice} priceRange={priceRange} setPriceRange={setPriceRange}
                  fuels={fuels} selectedFuel={selectedFuel} setSelectedFuel={setSelectedFuel}
                  transmissions={transmissions} selectedTransmission={selectedTransmission} setSelectedTransmission={setSelectedTransmission}
                  tractions={tractions} selectedTraction={selectedTraction} setSelectedTraction={setSelectedTraction}
                  sortBy={sortBy} setSortBy={setSortBy}
                  clearFilters={clearFilters}
                  filteredCount={filteredVehicles.length}
                  totalCount={vehicles.length}
                />
              </div>
            </div>
          )}

          {/* PRODUCTOS - Columna Derecha */}
          <div className="lg:col-span-3">
            {loading ? (
              // Loading State
              <div className="flex justify-center items-center min-h-96">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-slate-400 text-lg">Cargando catálogo...</p>
                </div>
              </div>
            ) : error ? (
              // Error State
              <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-red-400 mb-2">
                  Error al cargar
                </h2>
                <p className="text-red-300 mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Reintentar
                </button>
              </div>
            ) : filteredVehicles.length === 0 ? (
              // Empty State
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Sin resultados
                </h2>
                <p className="text-slate-400 mb-6">
                  No encontramos items que coincidan con tus filtros.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Ver Todo
                </button>
              </div>
            ) : (
              // Grid de Vehículos
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL MÓVIL: FILTROS */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 transition-opacity backdrop-blur-sm">
          <div className="bg-slate-900 w-full h-[90vh] sm:h-auto sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl animate-slide-up border-t border-slate-700 sm:border">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800">
              <h2 className="text-lg font-bold text-white">Filtros</h2>
              <button onClick={() => setShowMobileFilters(false)} className="text-slate-400 hover:text-white p-2">✕</button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
               <FiltersContent 
                  brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}
                  maxPrice={maxPrice} priceRange={priceRange} setPriceRange={setPriceRange}
                  fuels={fuels} selectedFuel={selectedFuel} setSelectedFuel={setSelectedFuel}
                  transmissions={transmissions} selectedTransmission={selectedTransmission} setSelectedTransmission={setSelectedTransmission}
                  tractions={tractions} selectedTraction={selectedTraction} setSelectedTraction={setSelectedTraction}
                  // Sort no se muestra aquí en móvil
                  sortBy={null} setSortBy={null}
                  clearFilters={clearFilters}
                  filteredCount={filteredVehicles.length}
                  totalCount={vehicles.length}
                  isMobile={true}
                />
            </div>
            <div className="p-4 border-t border-slate-800 bg-slate-800">
               <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-500 transition"
               >
                 Ver {filteredVehicles.length} resultados
               </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MÓVIL: ORDENAR */}
      {showMobileSort && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 transition-opacity backdrop-blur-sm">
          <div className="bg-slate-900 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-slide-up border-t border-slate-700 sm:border">
             <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800">
              <h2 className="text-lg font-bold text-white">Ordenar por</h2>
              <button onClick={() => setShowMobileSort(false)} className="text-slate-400 hover:text-white p-2">✕</button>
            </div>
            <div className="p-4 space-y-2">
              {[
                { val: 'name', label: 'Nombre (A-Z)' },
                { val: 'precio-asc', label: 'Precio: Menor a Mayor' },
                { val: 'precio-desc', label: 'Precio: Mayor a Menor' },
                { val: 'año', label: 'Año: Más Nuevo' }
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => { setSortBy(opt.val); setShowMobileSort(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex justify-between items-center ${sortBy === opt.val ? 'bg-blue-600/20 text-blue-400 font-bold' : 'hover:bg-slate-800 text-slate-300'}`}
                >
                  {opt.label}
                  {sortBy === opt.val && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente reutilizable para el contenido de los filtros
const FiltersContent = ({ 
  brands, selectedBrand, setSelectedBrand,
  maxPrice, priceRange, setPriceRange,
  fuels, selectedFuel, setSelectedFuel,
  transmissions, selectedTransmission, setSelectedTransmission,
  tractions, selectedTraction, setSelectedTraction,
  sortBy, setSortBy,
  clearFilters,
  filteredCount, totalCount,
  isMobile = false
}) => (
  <>
    {!isMobile && (
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          Filtros
        </h2>
      </div>
    )}

    {/* Filtro por Marca */}
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-3">
        Marca
      </label>
      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50"
      >
        {brands.map((brand) => (
          <option key={brand} value={brand} className="bg-slate-800">
            {brand === "todos" ? "Todas las marcas" : brand}
          </option>
        ))}
      </select>
    </div>

    {/* Filtro por Precio */}
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-3">
        Precio Máximo
      </label>
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], parseInt(e.target.value)])
          }
          className="w-full accent-blue-500 bg-slate-700"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>${priceRange[0].toLocaleString()}</span>
          <span className="text-blue-400 font-bold">${priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>

    {/* Filtros dinámicos */}
    {fuels.length > 0 && (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-3">
        Combustible
      </label>
      <select
        value={selectedFuel}
        onChange={(e) => setSelectedFuel(e.target.value)}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50"
      >
        {fuels.map((fuel) => (
          <option key={fuel} value={fuel} className="bg-slate-800">
            {fuel === "todos" ? "Todos los tipos" : fuel}
          </option>
        ))}
      </select>
    </div>
    )}

    {transmissions.length > 0 && (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-3">
        Transmisión
      </label>
      <select
        value={selectedTransmission}
        onChange={(e) => setSelectedTransmission(e.target.value)}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50"
      >
        {transmissions.map((trans) => (
          <option key={trans} value={trans} className="bg-slate-800">
            {trans === "todos" ? "Todas las transmisiones" : trans}
          </option>
        ))}
      </select>
    </div>
    )}

    {tractions.length > 0 && (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-3">
        Tracción
      </label>
      <select
        value={selectedTraction}
        onChange={(e) => setSelectedTraction(e.target.value)}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50"
      >
        {tractions.map((traction) => (
          <option key={traction} value={traction} className="bg-slate-800">
            {traction === "todos"
              ? "Todas las tracciones"
              : traction}
          </option>
        ))}
      </select>
    </div>
    )}

    {/* Ordenamiento (Solo Desktop) */}
    {sortBy && (
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3">
          Ordenar por
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50"
        >
          <option value="name" className="bg-slate-800">Nombre (A-Z)</option>
          <option value="precio-asc" className="bg-slate-800">Precio ($ ↑)</option>
          <option value="precio-desc" className="bg-slate-800">Precio ($ ↓)</option>
          <option value="año" className="bg-slate-800">Año (Más Nuevo)</option>
        </select>
      </div>
    )}

    {/* Botón Limpiar */}
    <button
      onClick={clearFilters}
      className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-600 transition duration-300 text-sm border border-slate-600"
    >
      Limpiar Filtros
    </button>

    {/* Contador */}
    <div className="border-t border-slate-700 pt-4 text-xs text-slate-400">
      <p>
        Mostrando <span className="font-bold text-blue-400">{filteredCount}</span> de{" "}
        <span className="font-bold text-blue-400">{totalCount}</span> items
      </p>
    </div>
  </>
);
