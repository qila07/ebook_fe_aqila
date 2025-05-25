import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AddBook() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const categories = ["novel", "dongeng", "webtoon"];

  useEffect(() => {
    if (id) {
      setEditMode(true);
      fetch(`/api/books/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Buku tidak ditemukan");
          return res.json();
        })
        .then((data) => {
          setTitle(data.title || "");
          setAuthor(data.author || "");
          setCategory(data.category || "");
        })
        .catch((err) => {
          alert(err.message);
          router.push("/books"); // Kalau gagal ambil data, balik ke list buku
        });
    } else {
      // Reset form kalau tidak edit
      setEditMode(false);
      setTitle("");
      setAuthor("");
      setCategory("");
    }
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { title, author, category };

    try {
      const response = await fetch(id ? `/api/books/${id}` : "/api/books", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || "Gagal menyimpan data");
      }

      alert(`Buku berhasil di${editMode ? "ubah" : "tambah"}!`);
      router.push("/books"); // Balik ke halaman index buku
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mt-10 bg-gray-400/10 backdrop-blur-md p-6 rounded-lg shadow-2xl space-y-6"
      >
        <h1 className="text-4xl font-bold text-blue-900 text-center">
          {id ? "Edit Buku" : "Tambah Buku"}
        </h1>

        <div>
          <label htmlFor="title" className="block mb-1 font-bold text-blue-900">
            Judul Buku
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan Judul..."
            className="w-full px-4 py-2 text-black rounded border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block mb-1 font-bold text-blue-900">
            Penulis
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Masukkan Nama Penulis..."
            className="w-full px-4 py-2 text-black rounded border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 font-bold text-blue-900">
            Kategori
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 text-black rounded border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-900 hover:to-blue-500 transition duration-500 text-white font-semibold py-2 px-4 rounded"
        >
          {loading ? "Menyimpan..." : id ? "Simpan Perubahan" : "Tambah Buku"}
        </button>
      </form>
    </div>
  );
}
