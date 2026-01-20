export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white mt-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              <span className="text-blue-500">AUTO</span>PRIME
            </h3>
            <p className="text-slate-400">
              La mejor selección de vehículos premium y utilitarios. 
              Calidad y confianza en cada kilómetro.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/catalogo" className="hover:text-blue-400 transition">
                  Catálogo Completo
                </a>
              </li>

            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contacto</h3>
            <p className="text-slate-400">
              📧 contacto@autoprime.com
              <br />
              📱 +54 3465 123456
              <br />
              📍 Concesionaria Central
            </p>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-8 text-center text-slate-600 text-sm">
          <p>
            &copy; {currentYear} AutoPrime. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
