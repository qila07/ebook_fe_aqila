/*import Navbar from '../components/navbar';
export default function Home() {
  return (
  <>
  <Navbar />
  <h1>Kelas Industri</h1>
  </>
  ) 
}*/

// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return null; // gak render apa-apa, langsung redirect
}

