import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BookListUser() {
  const [books, setBooks] = useState([]);
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

    async function fetchData() {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        setBooks(data.data || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchData();
  }, []);

  // Filter buku berdasarkan kategori dan searchQuery
  const filteredBooks = books.filter((b) => {
    const matchCategory = selectedCategory === "semua" || b.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchSearch =
      b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  const categories = ["novel", "webtoon", "dongeng"];

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="bg-white shadow-2xl px-6 py-8 flex flex-wrap items-center justify-between z-50 relative">
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
                      selectedCategory === cat ? "bg-blue-100 font-semibold" : "hover:bg-blue-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* About */}
          <a
            href="/about"
            className="flex items-center gap-1 text-blue-700 font-medium px-4 py-2 rounded-full hover:bg-blue-50 transition-all duration-200 border border-blue-100 shadow-sm"
          >
            About
          </a>
        </div>

        {/* Search Bar dan Username */}
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
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">Daftar Buku</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks?.map((b) => (
            <div
              key={b.id}
              className="bg-yellow-200/20 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">{b.title}</h2>
                <p className="text-sm text-gray-700 mb-1 capitalize">
                  {b.category} oleh {b.author}
                </p>
              </div>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">Buku tidak ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
}
