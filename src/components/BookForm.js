import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function BookForm({ onSubmit, initialData }) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData?.title || '');
    const [author, setAuthor] = useState(initialData?.author || '');
    // const [coverFile, setCoverFile] = useState(null);
    const [category, setCategory] = useState(initialData?.category || '');

    const categories = [
        "novel",
        "dongeng",
        "webtoon"
    ];

    useEffect(() => {
        setTitle(initialData?.title || '');
        setAuthor(initialData?.author || '');
        setCategory(initialData?.category || '');
    }, [initialData]);

// Di komponen BookForm atau AddBook
const handleSubmit = async (bookData) => {
  try {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: bookData.title,
        author: bookData.author,
        category: bookData.category,
        // Field tambahan jika ada
        // year: bookData.year || null,
        // description: bookData.description || null
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to add book');
    }

    // Redirect setelah sukses
    router.push('/books');
  } catch (error) {
    console.error('Submission Error:', error);
    alert(`Error: ${error.message}`);
  }
};

    
    return (
    <div className="flex items-center justify-center min-h-screen px-5">
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl  mt-10 bg-gray-400/10 backdrop-blur-md p-6 rounded-lg shadow-2xl space-y-6"
        >
            <h1 className="text-4xl font-bold text-blue-900 text-center">
                Form Buku
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
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* <div>
                <label htmlFor="cover" className="block mb-1 font-bold text-blue-900">
                    Cover
                </label>
                <input
                    type="file"
                    id="cover"
                    accept="image/*"
                    onChange={(e) => setCoverFile(e.target.files[0])}
                    className="w-full px-4 py-2 text-black rounded border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div> */}

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-900 hover:to-blue-500 transition duration-500 text-white font-semibold py-2 px-4 rounded"
            >
                Simpan Buku
            </button>
        </form>
    </div>
    );
}
