// import { books } from '../../../../data';
// import fs from 'fs';
// import path from 'path';
// import fetch from 'node-fetch'; //gatau ini apa

// export default function handler(req, res) {
//     if (req.method === 'GET') {
//         res.status(200).json(books);
//     } else if (req.method === 'POST') {
//         const { title, author } = req.body;
//         const newBook = { id: Date.now(), title, author };
//         books.push(newBook);

//         const filepath = path.join(process.cwd(), 'data.js');
//         const updatedData = let books = ${JSON.stringify(books, null, 2)};\nmodule.exports = { books };;
//         fs.writeFileSync(filepath, updatedData, 'utf8');

//         res.status(201).json(newBook);
//     } 
// }

// const BACKEND_URL = 'http://localhost:5000'

// export default async function handler(req, res) {
//     const {method, query: {id}} = req;
//     switch (method) {
//         case 'GET': {
//             const fetchRes = await fetch(`${BACKEND_URL}/books`);
//             const data = await fetchRes.json();
//             return res.status (fetchRes.status).json(data);
//         }

//         case 'POST': {
//             const {title, author, category} = req.body;
//             console.log(title, author, category);
//             const fetchRes = await fetch(`${BACKEND_URL}/books`, {
//                 method: 'POST',
//                  headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ 
//                 title: title, 
//                 author: author, 
//                 category: category
//             })
//         });
//         const data = await fetchRes.json();
//         return res.status (fetchRes.status).json(data);
//         }

//         default:
//             res.setHeader('Allow', ['GET', 'POST']);
//             return res.status(405).json({message: 'Method Not Allowed'});
//     }
// }

const BACKEND_URL = 'http://localhost:5000'

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        const response = await fetch(`${BACKEND_URL}/books`);
        const data = await response.json();
        return res.status(response.status).json(data);
      }

      case 'POST': {
        // Pastikan format data sesuai dengan validasi AdonisJS
        const payload = {
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
          // Tambahkan field lain sesuai validasi di createBookSchema
        };

        const response = await fetch(`${BACKEND_URL}/books`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            // Jika butuh auth, tambahkan header Authorization
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (!response.ok) {
          // Forward error message dari AdonisJS
          return res.status(response.status).json(data);
        }

        return res.status(201).json(data);
      }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}