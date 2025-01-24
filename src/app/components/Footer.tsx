export function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-center md:text-left mb-4 md:mb-0">
              &copy; 2025 AutoCatálogo. Todos los derechos reservados.
            </p>
  
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition">Facebook</a>
              <a href="#" className="hover:text-blue-400 transition">Twitter</a>
              <a href="#" className="hover:text-pink-500 transition">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  