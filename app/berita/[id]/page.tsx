import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DetailBerita({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  // 1. Ambil data berita utama
  const { data: berita, error } = await supabase
    .from('berita')
    .select('*')
    .eq('id', id)
    .single();

  // 2. Ambil 3 berita terbaru lainnya untuk navigasi (Pagination)
  const { data: beritaLain } = await supabase
    .from('berita')
    .select('*')
    .neq('id', id) // Jangan tampilkan berita yang sedang dibaca
    .order('tanggal', { ascending: false })
    .limit(3);

  if (error || !berita) {
    notFound();
  }

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen selection:bg-emerald-500 selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Tombol Kembali Atas */}
          <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-all group font-bold">
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Beranda
          </Link>

          {/* Konten Berita Utama */}
          <header className="mb-10">
            <p className="text-emerald-600 font-black text-xs mb-4 uppercase tracking-[0.3em]">
              KABAR DESA • {new Date(berita.tanggal).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tighter">
              {berita.judul}
            </h1>
            <div className="w-24 h-2 bg-emerald-500 rounded-full mb-8 shadow-sm shadow-emerald-500/20"></div>
          </header>

          <div className="glass-card rounded-[3rem] overflow-hidden mb-12 border border-slate-200 shadow-lg shadow-slate-200/50">
            <img
              src={berita.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'}
              className="w-full h-auto max-h-[600px] object-cover"
              alt={berita.judul}
            />
          </div>

          <article className="glass-card bg-white/60 p-8 md:p-14 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden mb-20">
            {/* Ornamen blur untuk mempercantik latar artikel */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/40 rounded-full blur-[80px] -z-10"></div>
            <div className="text-slate-700 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
              {berita.konten}
            </div>
          </article>

          {/* --- BAGIAN NAVIGASI / PAGINATION BERITA LAIN --- */}
          <div className="pt-10 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic uppercase tracking-tighter">Berita Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {beritaLain?.map((item) => (
                <Link href={`/berita/${item.id}`} key={item.id} className="group">
                  <div className="glass-card p-4 rounded-[2rem] h-full bg-white/50 hover:bg-white transition-all border border-slate-200 group-hover:border-emerald-300 group-hover:shadow-xl group-hover:shadow-emerald-900/5 group-hover:-translate-y-1">
                    <div className="h-32 w-full rounded-2xl overflow-hidden mb-4 bg-slate-200">
                      <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt={item.judul} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {item.judul}
                    </h3>
                    <p className="text-[10px] font-bold text-emerald-600/70 mt-3 uppercase tracking-wider">
                      {new Date(item.tanggal).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Tombol Kembali Utama (Sangat Jelas) */}
            <div className="text-center mt-16">
              <Link href="/" className="inline-block bg-slate-900 border border-slate-800 text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-slate-900/20 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-emerald-600/30 transition-all uppercase text-xs tracking-[0.2em] transform hover:-translate-y-1">
                Kembali ke Halaman Utama
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-500 text-xs bg-slate-100 border-t border-slate-200">
        © 2026 Pemerintah Desa Kemang Tanduk.
      </footer>
    </div>
  );
}