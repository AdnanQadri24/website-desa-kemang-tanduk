import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function ArsipBerita({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sParams = await searchParams;
  const currentPage = Math.max(1, parseInt(sParams.page || "1")); // Pastikan minimal halaman 1
  const itemsPerPage = 6;

  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { data: berita, count } = await supabase
    .from("berita")
    .select("*", { count: "exact" })
    .order("tanggal", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / itemsPerPage);

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen selection:bg-emerald-500 selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <Link
          href="/"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-all group font-bold"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">
            ←
          </span>{" "}
          Beranda
        </Link>
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 text-center relative z-10">
            <h1 className="text-5xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
              Arsip Kabar Desa
            </h1>
            <p className="text-slate-600">
              Menampilkan seluruh informasi dan kegiatan Desa Makmur
            </p>
          </header>

          {/* KONDISI JIKA BERITA KOSONG */}
          {berita?.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 shadow-sm rounded-[3rem]">
              <p className="text-slate-500 italic">
                Belum ada berita di halaman ini.
              </p>
              <Link
                href="/berita"
                className="text-emerald-600 font-bold mt-4 inline-block hover:underline"
              >
                Kembali ke halaman 1
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
              {berita?.map((b: any) => (
                <Link href={`/berita/${b.id}`} key={b.id} className="group">
                  <div className="glass-card rounded-[2rem] overflow-hidden hover:bg-white transition-all h-full flex flex-col border border-slate-200 group-hover:border-emerald-300 group-hover:shadow-xl group-hover:shadow-emerald-900/5 group-hover:-translate-y-1">
                    <div className="h-52 overflow-hidden bg-slate-200">
                      <img
                        src={
                          b.image_url ||
                          "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                        alt={b.judul}
                      />
                    </div>
                    <div className="p-8 flex-grow bg-white/50 group-hover:bg-white transition-colors">
                      <p className="text-emerald-600 text-[10px] font-bold mb-3 uppercase tracking-widest">
                        {new Date(b.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                        {b.judul}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                        {b.konten}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* NAVIGASI PAGINASI */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 md:gap-4">
              <Link
                href={`?page=${currentPage - 1}`}
                className={`px-4 md:px-6 py-2 rounded-xl font-bold transition-all border ${
                  currentPage <= 1
                    ? "pointer-events-none opacity-40 border-slate-200 text-slate-400 bg-slate-50"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 shadow-sm"
                }`}
              >
                ← <span className="hidden md:inline">Prev</span>
              </Link>

              <div className="flex gap-1 md:gap-2">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Logika agar tombol angka tidak terlalu banyak jika halaman sudah puluhan
                  if (totalPages > 5 && Math.abs(pageNum - currentPage) > 2)
                    return null;

                  return (
                    <Link
                      key={i}
                      href={`?page=${pageNum}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all border ${
                        currentPage === pageNum
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>

              <Link
                href={`?page=${currentPage + 1}`}
                className={`px-4 md:px-6 py-2 rounded-xl font-bold transition-all border ${
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-40 border-slate-200 text-slate-400 bg-slate-50"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 shadow-sm"
                }`}
              >
                <span className="hidden md:inline">Next</span> →
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="py-12 text-center text-slate-500 text-xs bg-slate-100 border-t border-slate-200">
        © 2026 Pemerintah Desa Kemang Tanduk.
      </footer>
    </div>
  );
}
