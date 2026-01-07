import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 font-bold text-2xl text-gray-900 hover:text-blue-600 transition"
          >
            <span className="text-blue-600">●</span>
            <span>AutoCatalog</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-blue-600 transition duration-300"
            >
              Inicio
            </Link>
            <Link
              to="/catalogo"
              className="text-gray-700 font-medium hover:text-blue-600 transition duration-300"
            >
              Catálogo
            </Link>
            <Link
              to="/contacto"
              className="text-gray-700 font-medium hover:text-blue-600 transition duration-300"
            >
              Contacto
            </Link>

            {/* Botones de autenticación */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">{user.name}</span>
                <Link
                  to="/admin"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition"
                >
                  Panel Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Menu Mobile */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200">
            <Link
              to="/"
              className="block py-2 text-gray-700 font-medium hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/catalogo"
              className="block py-2 text-gray-700 font-medium hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Catálogo
            </Link>
            <Link
              to="/contacto"
              className="block py-2 text-gray-700 font-medium hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>

            {/* Botones mobile */}
            {user ? (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <p className="py-2 text-gray-700 font-medium">
                  Hola, {user.name}
                </p>
                <Link
                  to="/admin"
                  className="block py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium text-center transition"
                  onClick={() => setIsOpen(false)}
                >
                  Panel Admin
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="block py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-center transition"
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
