'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Ganti ini dengan URL asli dari ImageKit Anda
  const URL_IMAGEKIT = "https://ik.imagekit.io/denun/LOGO-KOTA-PRABUMULIH.png";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white py-2 fixed w-full z-40 top-0 start-0 transition-all duration-300 ${isScrolled ? 'py-2 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200' : 'bg-transparent pt-4'} `}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-3">
          
          <div className="relative w-10 h-10"> 
            <Image 
              src={URL_IMAGEKIT}
              alt="Logo Desa Makmur"
              fill
              className="object-contain"
              priority
            />
          </div>

          <span className={`self-center text-xl font-bold ${isScrolled ? 'text-slate-900' : 'text-slate-800'}`}>
            Desa Kemang Tanduk
          </span>
        </Link>
      </div>
    </nav>
  );
}