import { books } from '../../../../data';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(books);
    } else if (req.method === 'POST') {
        const { title, author, cover, category } = req.body;
        const newBook = { id: Date.now(), title, author, cover, category};
        books.push(newBook);

        const filepath = path.join(process.cwd(), 'data.js');
        const updatedData = `let books = ${JSON.stringify(books, null, 2)};\nmodule.exports = { books };`;
        fs.writeFileSync(filepath, updatedData, 'utf8');

        res.status(201).json(newBook);
    } 
}