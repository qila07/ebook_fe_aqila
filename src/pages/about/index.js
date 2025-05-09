import Link from 'next/link';
import { useEffect, useRef } from "react";
import { books } from "../../../data"; // pastikan path ini sesuai ya sayang

export default function About() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (scroll) {
        if (scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth) {
          scroll.scrollLeft = 0; // reset ke awal
        } else {
          scroll.scrollLeft += 1; // geser pelan ke kanan
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl">
        {/* Tombol kembali */}
        <div className="mb-6">
          <Link href="/books">
            <span className="text-blue-700 hover:underline cursor-pointer text-lg">
              ← Kembali ke Dashboard
            </span>
          </Link>
        </div>

        {/* SLIDER */}
        <div className="py-10 px-4 overflow-hidden">
          <h2 className="text-4xl text-center font-bold text-blue-900 mb-6">
            E-Book News
          </h2>
          <div className="relative w-full">
            <div className="flex animate-slide-loop space-x-4 w-max">
              {[...books, ...books].map((book, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 h-48 rounded-lg shadow-md"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ABOUT US */}
        <div className="bg-white p-10 rounded-3xl shadow-xl">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-6">
            Tentang Website ini
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Perkenalkan saya Aqila dari 11 sija 1 yang telah membuat website ini. Website e-book ini adalah website menggunakan NEXT.js dan Tailwind CSS untuk memperindah tampilannya dan membuatnya lebih menarik. Website ini adalah website e-book sederhana yang saya buat untuk memenuhi tugas.<br/>
            Terimakasih
          </p>
        </div>
      </div>
    </div>
  );
}
