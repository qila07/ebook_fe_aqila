// import {
//     books
//   } from '../../../../data';
//   import fs from 'fs';
//   import path from 'path';
  
  // export default function handler(req, res) {
  //   const {
  //     id
  //   } = req.query;
  //   const bookId = parseInt(id, 10);
  //   const bookIndex = books.findIndex((book) => book.id === bookId);
  
  //   if (req.method === 'GET') {
  //     if (bookIndex === -1) {
  //       return res.status(404).json({
  //         message: 'Book not found'
  //       });
  //     }
  //     res.status(200).json(books[bookIndex]);
  //   } else if (req.method === 'PUT') {
  //     if (bookIndex === -1) {
  //       return res.status(404).json({
  //         message: 'Book not found'
  //       });
  //     }
  
  //     const { title, author } = req.body;
  //     books[bookIndex] = {
  //       ...books[bookIndex],
  //       title,
  //       author
  //     };
  
  //     // Update data.js file
  //     const filePath = path.join(process.cwd(), 'data.js');
  //     const updatedData = let books = ${JSON.stringify(books, null, 2)};\nmodule.exports = { books };;
  //     fs.writeFileSync(filePath, updatedData, 'utf8');
  
  //     res.status(200).json(books[bookIndex]);
  //   } else if (req.method === 'DELETE') {
  //     if (bookIndex === -1) {
  //       return res.status(404).json({ message: 'Book not found' });
  //     }
  
  //     // Remove the book from the array
  //     books.splice(bookIndex, 1);
  
  //     // Update data.js file
  //     const filePath = path.join(process.cwd(), 'data.js');
  //     const updatedData = let books = ${JSON.stringify(books, null, 2)};\nmodule.exports = { books };;
  //     fs.writeFileSync(filePath, updatedData, 'utf8');
  
  //     res.status(200).json({ message: 'Book deleted successfully' });
  //   } else {
  //     res.setHeader('Allow', ['GET', 'PUT']);
  //     res.status(405).end(Method ${req.method} Not Allowed);
  //   }
  // }

  const BACKEND_URL = 'http://localhost:5000'

  export default async function handler(req, res) {
    const {method, query: {id}} = req;
    switch (method) {
        case 'GET': {
            const fetchRes = await fetch(`${BACKEND_URL}/books/${id}`);
            const data = await fetchRes.json();
            return res.status (fetchRes.status).json(data);
        }

        case 'PUT': {
          const { title, author, category } = req.body;
          const fetchRes = await fetch(`${BACKEND_URL}/books/${id}`, {
            method: 'PUT',  // Ganti dari 'POST' jadi 'PUT'
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, category }),
          });
          const data = await fetchRes.json();
          return res.status(fetchRes.status).json(data);
        }

        case 'DELETE': {
          const fetchRes = await fetch(`${BACKEND_URL}/books/${id}`, {
            method: 'DELETE',
          });

          if (fetchRes.status === 204) {
            return res.status(204).end();
          }

          const data = await fetchRes.json();
          return res.status(fetchRes.status).json(data);
        }

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            return res.status(405).json({message: 'Method Not Allowed'});
    }
  }