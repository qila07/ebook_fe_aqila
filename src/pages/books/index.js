import { useEffect, useState } from "react";
import Link from "next/link";
import { getBooks } from "../../../lib/api/books";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

    async function fetchData() {
      try {
        const data = await getBooks();
        setBooks(data.data);
        setFilteredBooks(data.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Apply both category filter and search filter
    let result = books;
    
    // Apply category filter
    if (selectedCategory !== "semua") {
      result = result.filter((b) => b.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query)
      );
    }
    
    setFilteredBooks(result);
  }, [selectedCategory, searchQuery, books]);

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`/api/books/${id}`, { 
        method: "DELETE" 
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus buku");
      }

      setBooks(books.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menghapus buku. Cek console untuk detail.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

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

        {/* Kanan: Search + Username */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari buku atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent w-64 shadow-sm"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {user && (
            <div className="relative">
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
        </div>
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

        {filteredBooks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">Tidak ada buku yang ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBooks?.map((b) => (
              <div
                key={b.id}
                className="bg-yellow-200/20 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-4">
                  <Link
                    href={`/books/${b.id}`}
                    className="text-lg font-semibold text-blue-900 hover:underline block mb-2"
                  >
                    {b.title}
                  </Link>
                  <p className="text-sm text-gray-700 mb-4 capitalize">{b.category} oleh {b.author}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Link href={`/books/add?id=${b.id}`}>
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
        )}
      </div>
    </div>
  );
}