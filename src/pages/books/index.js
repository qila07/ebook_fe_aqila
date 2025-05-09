import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
      router.push("/login");
      return;
    }

    setUser(userData);

    if (userData.role === "user") {
      router.push("/books/user");
      return;
    }

    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const deleteBook = async (id) => {
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    setBooks(books.filter((b) => b.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const filteredBooks =
    selectedCategory === "semua"
      ? books
      : books.filter((b) => b.category === selectedCategory);

  const categories = ["novel", "webtoon", "dongeng"];

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
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowUserDropdown(false);
              }}
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
                  className="block w-full text-left px-4 py-2 hover:bg-blue-50 transition "
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
                    selectedCategory === cat ? "bg-blue-100 font-semibold" : "hover:bg-blue-50"
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

        <div className="flex justify-end mb-6">
          <Link
            href="/books/add"
            className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-800 hover:from-green-700 hover:to-green-500 transition duration-800 text-white font-semibold py-2 px-4 rounded shadow"
          >
            <span className="text-xl mr-2">＋</span> Tambah Buku
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map((b) => (
            <div
              key={b.id}
              className="bg-yellow-500/20 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={b.cover || "/covers/default.jpg"}
                alt={`Cover of ${b.title}`}
                width={400}
                height={500}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <Link
                  href={`/books/${b.id}`}
                  className="text-lg font-semibold text-blue-900 hover:underline block mb-2"
                >
                  {b.title}
                </Link>
                <p className="text-sm text-gray-700 mb-4 capitalize">{b.category} oleh {b.author}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Link href={`/books/${b.id}`}>
                    <button className="bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-900 hover:to-blue-500 transition duration-500 text-white px-4 py-2 rounded">
                      Edit Buku
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteBook(b.id)}
                    className="bg-gradient-to-r from-red-500 to-red-900 hover:from-red-900 hover:to-red-500 transition duration-500 text-white px-4 py-2 rounded"
                  >
                    Hapus Buku
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
