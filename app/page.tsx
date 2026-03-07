import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import AduanForm from "@/components/AduanForm";
import Link from "next/link";

export default async function Home() {
  const { data: berita } = await supabase.from("berita").select("*").order("tanggal", { ascending: false }).limit(3);
  const { data: agenda } = await supabase.from("agenda").select("*").order("waktu", { ascending: true }).limit(4);
  const { data: struktur } = await supabase.from("struktur").select("*").order("urutan", { ascending: true });

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen selection:bg-emerald-500 selection:text-white font-sans">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 bg-slate-50">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
        
        <div className="relative z-10 text-center max-w-4xl mt-16">
          <span className="text-emerald-700 font-bold tracking-[0.3em] uppercase text-xs mb-6 inline-block bg-emerald-100 px-5 py-2.5 rounded-full border border-emerald-200/50">
            Portal Resmi Pemerintah Desa
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-tight mb-8 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-emerald-700">
              Kemang Tanduk
            </span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Membangun masa depan desa yang mandiri melalui transparansi dan
            teknologi digital yang inklusif untuk seluruh warga.
          </p>
        </div>
      </section>

      {/* 2. STRUKTUR PERANGKAT DESA */}
      <section id="struktur" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Perangkat Desa</h2>
            <p className="text-slate-500 mt-4 text-lg">Kenali lebih dekat aparatur yang siap melayani Anda.</p>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-6 pb-8 snap-x snap-mandatory no-scrollbar">
            {struktur?.map((s: any) => (
              <div key={s.id} className="min-w-[260px] md:min-w-full snap-center bg-white rounded-[2.5rem] p-8 text-center border border-slate-100 shadow-sm hover:border-emerald-200 transition-all group hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-slate-50 group-hover:ring-emerald-100 transition-all">
                  <img src={s.image_url || `https://ui-avatars.com/api/?name=${s.nama}&background=10b981&color=fff`} className="w-full h-full object-cover" alt={s.nama} />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-1 truncate">{s.nama}</h3>
                <p className="text-emerald-600 text-sm font-bold tracking-wide uppercase">{s.jabatan}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. KABAR DESA */}
      <section id="berita" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 relative">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-amber-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Kabar Terbaru</h2>
            <p className="text-slate-500 mt-4 text-lg">Informasi terkini mengenai program dan kegiatan desa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {berita?.map((b: any) => (
              <Link href={`/berita/${b.id}`} key={b.id} className="group">
                <div className="bg-white rounded-[2rem] overflow-hidden transition-all h-full border border-slate-100 shadow-sm group-hover:shadow-2xl group-hover:shadow-emerald-900/5 group-hover:border-emerald-200 group-hover:-translate-y-2 flex flex-col">
                  <div className="h-56 overflow-hidden bg-slate-200">
                    <img src={b.image_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={b.judul} />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-emerald-600 text-[10px] font-black uppercase mb-3 tracking-widest">{new Date(b.tanggal).toLocaleDateString("id-ID")}</p>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-emerald-600 transition-colors">{b.judul}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">{b.konten}</p>
                    <span className="text-emerald-600 text-xs font-bold flex items-center gap-2 group-hover:gap-3 transition-all">BACA SELENGKAPNYA <span aria-hidden="true">→</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/berita" className="inline-block bg-white border border-slate-200 text-slate-700 px-10 py-4 rounded-full font-bold shadow-sm hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all">
              Lihat Semua Arsip Berita
            </Link>
          </div>
        </div>
      </section>

      {/* 4. AGENDA */}
      <section id="kalender" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-purple-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Agenda Desa</h2>
            <p className="text-slate-500 mt-4 text-lg">Jadwal kegiatan dan pertemuan warga mendatang.</p>
          </div>
          
          <div className="space-y-6">
            {agenda?.map((a: any) => (
              <div key={a.id} className="bg-white p-6 rounded-3xl flex items-center gap-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all hover:-translate-y-1">
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-black px-6 py-4 rounded-2xl text-center min-w-[80px]">
                  <span className="text-3xl block leading-none">{new Date(a.waktu).getDate()}</span>
                  <span className="text-[10px] uppercase mt-1 block">{new Date(a.waktu).toLocaleString('id-ID', { month: 'short' })}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xl mb-1">{a.nama_kegiatan}</h4>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.02.01.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                    {a.lokasi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ADUAN */}
      <section id="aduan" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-rose-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Kotak Aspirasi</h2>
          <p className="text-slate-600 mb-12 text-lg">Suara Anda penting. Sampaikan keluhan atau saran untuk kemajuan desa secara langsung dan aman.</p>
          <div className="text-left">
            <AduanForm />
          </div>
        </div>
      </section>

      {/* 6. LOKASI DESA (MAP BARU DENGAN SECTION KHUSUS) */}
      <section id="lokasi" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-sky-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Lokasi Desa</h2>
            <p className="text-slate-500 mt-4 text-lg">Kunjungi pusat administrasi dan pelayanan kami.</p>
          </div>
          
          <div className="w-full h-[450px] rounded-[3rem] overflow-hidden border border-slate-200 shadow-lg">
            {/* Saya tambahkan parameter peta agar menunjuk ke Kemang Tanduk (Jika perlu diganti koordinatnya bisa diatur di src iframe ini) */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d262.5013965700584!2d104.18600811404579!3d-3.5010881003531544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3a2e70bc68724d%3A0x78fbf66f82786335!2sKantor%20Desa%20Kemang%20Tanduk!5e1!3m2!1sid!2sid!4v1772858739058!5m2!1sid!2sid" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy">
            </iframe>
          </div>
        </div>
      </section>

      {/* 7. HUBUNGI ADMIN */}
      <section id="kontak" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-emerald-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Ada Pertanyaan ?</h2>
          <p className="text-slate-600 mb-10 text-lg leading-relaxed">
            Admin Desa Kemang Tanduk siap membantu Anda pada jam kerja untuk keperluan administrasi, pengurusan surat, maupun informasi mendesak lainnya.
          </p>
          <a 
            href="https://wa.me/6283177152410?text=Halo%20Admin%20Desa%20Kemang%20Tanduk,%20saya%20ingin%20bertanya..." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-3 bg-emerald-600 text-white px-10 py-5 rounded-full font-bold shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-emerald-700/30 transition-all transform hover:-translate-y-1 text-lg"
          >
            Chat Admin via WhatsApp
          </a>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-500 text-sm bg-white border-t border-slate-200">
        <p className="font-bold text-slate-700 mb-2">Desa Kemang Tanduk</p>
        © 2026 Pemerintah Desa Kemang Tanduk.
      </footer>
    </div>
  );
}