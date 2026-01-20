import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 font-bold text-2xl text-white hover:text-blue-400 transition"
          >
            {/* <img src="/logo.png" alt="Logo" className="h-12 w-12 object-cover rounded-full" /> */}
            <span className="text-white tracking-wide">AUTO<span className="text-blue-500">PRIME</span></span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-slate-300 font-medium hover:text-white transition duration-300"
            >
              Inicio
            </Link>
            <Link
              to="/catalogo"
              className="text-slate-300 font-medium hover:text-white transition duration-300"
            >
              Catálogo
            </Link>


            {/* Botones de autenticación */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-slate-300 font-medium">{user?.name}</span>
                <Link
                  to="/admin"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium transition shadow-sm border border-blue-500"
                >
                  Panel Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-medium transition shadow-sm"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium transition shadow-sm border border-blue-500"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Menu Mobile */}
          <button
            className="md:hidden text-slate-300 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-slate-800 bg-slate-900">
            <Link
              to="/"
              className="block py-3 text-slate-300 font-medium hover:text-white transition px-6 text-lg"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/catalogo"
              className="block py-3 text-slate-300 font-medium hover:text-white transition px-6 text-lg"
              onClick={() => setIsOpen(false)}
            >
              Catálogo
            </Link>


            {/* Botones mobile */}
            {isAuthenticated ? (
              <div className="space-y-2 pt-4 border-t border-slate-800 px-4">
                <p className="py-2 text-slate-300 font-medium">
                  Hola, {user?.name}
                </p>
                <Link
                  to="/admin"
                  className="block py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium text-center transition"
                  onClick={() => setIsOpen(false)}
                >
                  Panel Admin
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded font-medium transition"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="block py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium text-center transition mb-2 mx-4 text-lg"
                onClick={() => setIsOpen(false)}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
