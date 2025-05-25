export async function getBooks() {
    const res = await fetch('/api/books')
    if (!res.ok) throw new Error('Gagal mengambil buku')
    return res.json()
}

// export async function getBook(id) {
//     const res = await fetch('/api/books')
//     if (!res.ok) throw new Error('Buku tidak ditemukan')
//     return res.json()
// }

export async function createBook(title, author, category) {
    const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, category }),
    })
    if (!res.ok) throw new Error('Gagal menambahkan buku')
    return res.json()
}

export async function updateBook(id, title, author, category) {
    const res = await fetch('/api/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, category }),
    })
    if (!res.ok) throw new Error('Gagal memperbarui buku')
    return res.json()
}

export async function deleteBook(id) {
    const res = await fetch('/api/books', {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error('Gagal menghapus buku')
    return res.json()
}