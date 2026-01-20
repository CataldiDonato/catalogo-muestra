import { Link } from "react-router-dom";
import whatsappIcon from "../images/whatsappblanco.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section - Generic Premium Car Style */}
      <section
        className="relative w-full h-screen flex items-center justify-center"
        style={{
          // Using a generic unsplash car image or keeping the previous one if it works, 
          // but for this task I'll assume we want a dark, sleek background.
          // Since I can't easily fetch a NEW authentic image without internet, 
          // I will use a dark gradient or try to use an existing one if suitable, 
          // or just a placeholder style that looks good.
          // Let's assume we use a dark gradient overlay heavily.
          backgroundImage: "url('/port.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay dark glass effect */}
        <div className="absolute inset-0 bg-slate-900/80 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 text-sm font-bold tracking-widest mb-6 uppercase backdrop-blur-sm">
            Premium Auto Collection
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Descubre tu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Próximo Vehículo.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
            Elegancia, rendimiento y confianza. Explora nuestra selección exclusiva de automóviles verificados y listos para rodar.
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/catalogo"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transform hover:-translate-y-1"
            >
              Ver Catálogo
            </Link>
            <a
              href="https://api.whatsapp.com/send/?phone=543465123456&text=Hola,+quisiera+consultar+sobre+un+vehículo&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 opacity-80" /> 
              Contactar
            </a>
          </div>
        </div>
      </section>

      {/* Features / Categories Simplified */}
      <section className="py-24 bg-slate-900">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Brindamos una experiencia de compra transparente y segura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-blue-900/50 rounded-xl flex items-center justify-center text-2xl mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                ✨
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Calidad Certificada
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Cada unidad es inspeccionada rigurosamente para asegurar su estado y funcionamiento óptimo.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-blue-900/50 rounded-xl flex items-center justify-center text-2xl mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                🤝
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Trato Directo
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Sin intermediarios innecesarios. Negociación transparente y asesoramiento personalizado.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-blue-900/50 rounded-xl flex items-center justify-center text-2xl mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                📄
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Gestoría Integral
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Te acompañamos en todo el proceso de transferencia y documentación de tu nuevo vehículo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="py-20 border-y border-slate-800 bg-slate-950">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <div className="text-4xl font-bold text-blue-500 mb-2">+100</div>
                    <div className="text-slate-400 text-sm uppercase tracking-wider">Vehículos Vendidos</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-blue-500 mb-2">10</div>
                    <div className="text-slate-400 text-sm uppercase tracking-wider">Años de Experiencia</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-blue-500 mb-2">100%</div>
                    <div className="text-slate-400 text-sm uppercase tracking-wider">Transparencia</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-blue-500 mb-2">24/7</div>
                    <div className="text-slate-400 text-sm uppercase tracking-wider">Soporte</div>
                </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5"></div>
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para encontrar tu auto ideal?
          </h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            No pierdas más tiempo buscando. Tenemos lo que necesitas al mejor precio del mercado.
          </p>
          <Link
            to="/catalogo"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all duration-300 shadow-xl shadow-blue-600/30"
          >
            Ver Inventario Completo
          </Link>
        </div>
      </section>

      {/* Contact Section Relocated */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-800 rounded-3xl overflow-hidden shadow-2xl p-2 border border-slate-700">
             {/* Info */}
             <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-8">Contáctanos</h3>
                
                <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-slate-700 rounded-lg text-blue-400">📍</div>
                        <div>
                            <h4 className="font-bold text-white mb-1">Ubicación</h4>
                            <p className="text-slate-400">Caseros, Provincia de Santa Fe</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                         <div className="p-3 bg-slate-700 rounded-lg text-blue-400">✉️</div>
                        <div>
                            <h4 className="font-bold text-white mb-1">Email</h4>
                            <p className="text-slate-400">contacto@autoprime.com</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-slate-700 rounded-lg text-blue-400">📱</div>
                        <div>
                            <h4 className="font-bold text-white mb-1">Teléfono</h4>
                            <p className="text-slate-400">+54 3465 123456</p>
                        </div>
                    </div>
                </div>
             </div>

             {/* Map */}
             <div className="h-64 md:h-auto rounded-2xl overflow-hidden">
                <iframe 
                  src="https://maps.google.com/maps?q=Caseros%2C+Santa+Fe%2C+Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
