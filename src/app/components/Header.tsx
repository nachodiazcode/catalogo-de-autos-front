export function Header() {
    return (
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="text-2xl font-bold">
              <a href="/" className="hover:text-blue-300 transition">
                 AutoCatálogo
              </a>
            </div>
  
            {/* Navegación */}
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-lg font-medium hover:text-blue-300 transition">Inicio</a>
              <a href="/catalogo" className="text-lg font-medium hover:text-blue-300 transition">Catálogo</a>
              <a href="/contacto" className="text-lg font-medium hover:text-blue-300 transition">Contacto</a>
            </nav>
  
            {/* Menú móvil */}
            <div className="md:hidden">
              <button className="text-2xl focus:outline-none">☰</button>
            </div>
          </div>
        </div>
      </header>
    );
  }
  