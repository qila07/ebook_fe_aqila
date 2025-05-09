import { useState, useEffect } from "react";

export default function BookForm ({ onSubmit, initialData}){
    const [title, setTitle] = useState(initialData?.title || '');
    const [author, setAuthor] = useState(initialData?.author || '');

    useEffect( () => {
        setTitle(initialData?.title);
        setAuthor(initialData?.author);
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, author });
    };

    return [
        <form onSubmit= {handleSubmit}
        className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md space-y-6">
            <h1 className="text-4xl font-bold text-blue-900 text-center">
                Form Buku
            </h1>

            <div>
                <label htmlFor="title" className="block mb-1 font-bold text-blue-900">
                        Judul Buku
                </label>

                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Judul..." 
                 className="w-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 required/>
            </div>

            <div>
                <label htmlFor="author" className="block mb-1 font-bold text-blue-900">
                    Penulis
                </label>

                <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Masukkan Nama Penulis..." 
                 className="w-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 required/>
            </div>
            
            
            <button type="submit" 
            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-4 rounded">
                Simpan Buku
            </button>
        </form>
    ]
}