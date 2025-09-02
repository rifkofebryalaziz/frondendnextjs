import Link from "next/link";

export default function Home() {
  const links = [
    { 
      href: "/calculator", 
      label: "Calculator",
      description: "1-digit calculator with +/- operations"
    },
    { 
      href: "/tugas2", 
      label: "Form",
      description: "CRUD form with save, edit & delete features"
    },
    { 
      href: "/api/products", 
      label: "Get API Products",
      description: "Products from our own API"
    },
    { 
      href: "/products", 
      label: "Get API Products",
      description: "Products from dummyjson/products API"
    },
    { 
      href: "/api/products/1", 
      label: "Product Detail",
      description: "Detail from our API"
    },
    { 
      href: "/products?id=1", 
      label: "Product Detail",
      description: "Detail from dummyjson/products API"
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Dashboard
          </h1>
          <p className="text-gray-600 text-lg mb-2">Daftar Tugas</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        {/* Info Box */}
        <div className="bg-white/70 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Catatan</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Untuk products, tersedia dua versi: menggunakan API custom yang kita buat sendiri 
                dan API external dari dummyjson/products.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {link.label}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300">
                    {link.description}
                  </p>
                </div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </main>
  );
}