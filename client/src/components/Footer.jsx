export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              Sobre Nosotros
            </h3>
            <p className="text-gray-400">
              Tu portal confiable para encontrar el auto de tus sueños con las
              mejores marcas del mercado.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/catalogo" className="hover:text-blue-400 transition">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/contacto" className="hover:text-blue-400 transition">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contacto</h3>
            <p className="text-gray-400">
              📧 info@autocatalog.com
              <br />
              📱 +1 (555) 123-4567
              <br />
              📍 123 Auto Street, Ciudad
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} AutoCatalog. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
