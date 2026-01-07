import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Contenido Text */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Encuentra tu próximo auto
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Explora nuestro catálogo de vehículos de las mejores marcas del
                mercado. Financiamiento flexible y atención personalizada para
                ayudarte a elegir el auto perfecto.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/catalogo"
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all duration-300 text-center shadow-md"
                >
                  Ver Catálogo
                </Link>
                <a
                  href="https://api.whatsapp.com/send/?phone=543465668393&text=Holaa+Quiero+hacer+una+consulta&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all duration-300 text-center"
                >
                  Contactar Asesor
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-gray-900">500+</p>
                  <p className="text-gray-600">Vehículos</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">50+</p>
                  <p className="text-gray-600">Marcas</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">10k+</p>
                  <p className="text-gray-600">Clientes</p>
                </div>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                  alt="Auto de lujo"
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-600">
              Somos líderes en la venta de vehículos con excelencia en servicio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-blue-600">✓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Gran Variedad
              </h3>
              <p className="text-gray-600">
                Selecciona entre las mejores marcas y modelos de vehículos
                nuevos y usados.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-blue-600">💳</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Financiamiento
              </h3>
              <p className="text-gray-600">
                Opciones de financiamiento flexible adaptadas a tu presupuesto.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-blue-600">🛡️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Garantía y Soporte
              </h3>
              <p className="text-gray-600">
                Garantía comprensiva y equipo de soporte disponible para ti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para encontrar tu auto?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Navega por nuestro amplio catálogo y encuentra el vehículo perfecto
            para ti hoy mismo.
          </p>
          <Link
            to="/catalogo"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg"
          >
            Explorar Catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}
