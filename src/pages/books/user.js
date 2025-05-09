import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BookListUser() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      router.push("/login");
      return;
    }

    setUser(userData);

    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const categories = ["novel", "webtoon", "dongeng"];

  const filteredBooks =
    selectedCategory === "semua"
      ? books
      : books.filter((b) => b.category === selectedCategory);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="bg-white shadow-2xl px-6 py-8 flex flex-wrap items-center justify-between z-50 relative">
        {/* Kiri: Logo + Kategori */}
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-blue-800">e-book</h1>

          {/* Dropdown Kategori */}
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-1 text-blue-700 font-medium px-4 py-2 rounded-full hover:bg-blue-50 transition-all duration-200 border border-blue-100 shadow-sm"
            >
              Kategori <span className="text-xs">▼</span>
            </button>

            {showCategoryDropdown && (
              <div className="absolute mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg w-44 z-30 overflow-hidden animate-fadeIn">
                <button
                  onClick={() => {
                    setSelectedCategory("semua");
                    setShowCategoryDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-50 transition"
                >
                  Semua
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategoryDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 transition ${
                      selectedCategory === cat
                        ? "bg-blue-100 font-semibold"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Menu About */}
          <a
            href="/about"
            className="flex items-center gap-1 text-blue-700 font-medium px-4 py-2 rounded-full hover:bg-blue-50 transition-all duration-200 border border-blue-100 shadow-sm"
          >
            About
          </a>
        </div>

        {/* Kanan: Username */}
        {user && (
          <div className="relative mt-3 md:mt-0">
            <button
              onClick={() => {
                setShowUserDropdown(!showUserDropdown);
                setShowCategoryDropdown(false);
              }}
              className="flex items-center gap-1 text-blue-700 font-medium px-4 py-2 rounded-full hover:bg-blue-50 transition-all duration-200 border border-blue-100 shadow-sm"
            >
              {user.username} <span className="text-xs">▼</span>
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-40 z-30 overflow-hidden animate-fadeIn">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* DAFTAR BUKU */}
      <div className="max-w-6xl mx-auto mt-5 px-4 py-6">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">
          Daftar Buku
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={b.cover || "/covers/default.jpg"}
                alt={`Cover of ${b.title}`}
                width={400}
                height={500}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">
                  {b.title}
                </h2>
                <p className="text-sm text-gray-700 mb-1 capitalize">{b.category} oleh {b.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
