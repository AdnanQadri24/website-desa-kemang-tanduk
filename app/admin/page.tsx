'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [data, setData] = useState({ berita: [], agenda: [], aduan: [], struktur: [] });

  const [formBerita, setFormBerita] = useState({ judul: '', konten: '', image_url: '' });
  const [formAgenda, setFormAgenda] = useState({ nama_kegiatan: '', lokasi: '', waktu: '' });
  const [formStruktur, setFormStruktur] = useState({ nama: '', jabatan: '', image_url: '' });

  useEffect(() => { ambilSemuaData(); }, []);

  const ambilSemuaData = async () => {
    const { data: b } = await supabase.from('berita').select('*').order('tanggal', { ascending: false });
    const { data: a } = await supabase.from('agenda').select('*').order('waktu', { ascending: true });
    const { data: s } = await supabase.from('struktur').select('*').order('urutan', { ascending: true });
    const { data: adu } = await supabase.from('aduan').select('*').order('created_at', { ascending: false });
    setData({ berita: b || [], agenda: a || [], aduan: adu || [], struktur: s || [] });
  };

  const handleSimpan = async (table: string, payload: any, setForm: any, initialForm: any) => {
    setLoading(true);
    const { error } = await supabase.from(table).insert([payload]);
    if (error) setMessage('Gagal: ' + error.message);
    else {
      setMessage('Data berhasil ditambahkan!');
      setForm(initialForm);
      ambilSemuaData();
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleHapus = async (table: string, id: string) => {
    if (!confirm('Yakin ingin menghapus data ini selamanya?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) alert(error.message);
    else ambilSemuaData();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Panel Admin Desa</h1>
            <p className="text-emerald-600 font-mono text-xs mt-1">Sistem Manajemen Informasi Desa Terintegrasi</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="bg-slate-100 border border-slate-200 px-6 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all text-sm font-bold text-slate-600">Preview Web</Link>
            <button onClick={() => { document.cookie = "admin_access=; max-age=0; path=/"; window.location.href = '/'; }} className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl font-bold text-sm transition-all">Logout</button>
          </div>
        </header>

        {message && <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-center font-bold animate-pulse">{message}</div>}

        {/* INPUT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Tambah Berita */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h2 className="text-sm font-black mb-6 text-emerald-600 uppercase tracking-widest">Tambah Berita</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Judul Berita" className="w-full bg-slate-50 p-4 rounded-xl outline-none border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" value={formBerita.judul} onChange={e => setFormBerita({ ...formBerita, judul: e.target.value })} />
              <textarea placeholder="Isi Berita" className="w-full bg-slate-50 p-4 rounded-xl outline-none border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" rows={3} value={formBerita.konten} onChange={e => setFormBerita({ ...formBerita, konten: e.target.value })} />
              <input type="text" placeholder="Link Gambar (URL)" className="w-full bg-slate-50 p-4 rounded-xl outline-none border border-slate-200 focus:border-emerald-500" value={formBerita.image_url} onChange={e => setFormBerita({ ...formBerita, image_url: e.target.value })} />
              <button onClick={() => handleSimpan('berita', formBerita, setFormBerita, { judul: '', konten: '', image_url: '' })} className="w-full bg-emerald-600 p-4 rounded-xl font-bold text-white uppercase tracking-widest hover:bg-emerald-700 transition-all">Publish Berita</button>
            </div>
          </section>

          {/* Tambah Agenda */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h2 className="text-sm font-black mb-6 text-blue-600 uppercase tracking-widest">Tambah Agenda</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Nama Kegiatan" className="w-full bg-slate-50 p-4 rounded-xl outline-none border border-slate-200 focus:border-blue-500" value={formAgenda.nama_kegiatan} onChange={e => setFormAgenda({ ...formAgenda, nama_kegiatan: e.target.value })} />
              <input type="text" placeholder="Lokasi" className="w-full bg-slate-50 p-4 rounded-xl outline-none border border-slate-200 focus:border-blue-500" value={formAgenda.lokasi} onChange={e => setFormAgenda({ ...formAgenda, lokasi: e.target.value })} />
              <input type="datetime-local" className="w-full bg-slate-50 p-4 rounded-xl outline-none border border-slate-200 focus:border-blue-500 text-slate-700" value={formAgenda.waktu} onChange={e => setFormAgenda({ ...formAgenda, waktu: e.target.value })} />
              <button onClick={() => handleSimpan('agenda', formAgenda, setFormAgenda, { nama_kegiatan: '', lokasi: '', waktu: '' })} className="w-full bg-blue-600 p-4 rounded-xl font-bold text-white uppercase tracking-widest hover:bg-blue-700 transition-all">Simpan Agenda</button>
            </div>
          </section>

          {/* Tambah Struktur */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h2 className="text-sm font-black mb-6 text-amber-500 uppercase tracking-widest">Tambah Perangkat</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Nama Lengkap" className="w-full bg-slate-50 p-4 rounded-xl outline-none border border-slate-200 focus:border-amber-500" value={formStruktur.nama} onChange={e => setFormStruktur({ ...formStruktur, nama: e.target.value })} />
              <input type="text" placeholder="Jabatan" className="w-full bg-slate-50 p-4 rounded-xl outline-none border border-slate-200 focus:border-amber-500" value={formStruktur.jabatan} onChange={e => setFormStruktur({ ...formStruktur, jabatan: e.target.value })} />
              <input type="text" placeholder="Link Foto (URL)" className="w-full bg-slate-50 p-4 rounded-xl outline-none border border-slate-200 focus:border-amber-500" value={formStruktur.image_url} onChange={e => setFormStruktur({ ...formStruktur, image_url: e.target.value })} />
              <button onClick={() => handleSimpan('struktur', formStruktur, setFormStruktur, { nama: '', jabatan: '', image_url: '' })} className="w-full bg-amber-500 p-4 rounded-xl font-bold text-white uppercase tracking-widest hover:bg-amber-600 transition-all">Simpan Perangkat</button>
            </div>
          </section>
        </div>

        {/* DATA MANAGEMENT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-10">
            {/* KELOLA BERITA */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black mb-6 flex items-center gap-3 text-emerald-600">📂 KELOLA BERITA</h2>
              <div className="space-y-3 h-64 overflow-y-auto pr-3 custom-scrollbar">
                {data.berita.map((b: any) => (
                  <div key={b.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="truncate text-sm font-bold text-slate-700">{b.judul}</span>
                    <button onClick={() => handleHapus('berita', b.id)} className="bg-red-50 text-red-500 px-3 py-1 rounded-lg text-[10px] font-black hover:bg-red-500 hover:text-white transition-all">HAPUS</button>
                  </div>
                ))}
              </div>
            </div>

            {/* KELOLA STRUKTUR */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black mb-6 flex items-center gap-3 text-amber-500">👥 KELOLA STRUKTUR</h2>
              <div className="space-y-3 h-64 overflow-y-auto pr-3 custom-scrollbar">
                {data.struktur.map((s: any) => (
                  <div key={s.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-200">
                        <img src={s.image_url || `https://ui-avatars.com/api/?name=${s.nama}`} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">{s.nama}</span>
                        <span className="text-[10px] text-slate-500 uppercase">{s.jabatan}</span>
                      </div>
                    </div>
                    <button onClick={() => handleHapus('struktur', s.id)} className="bg-red-50 text-red-500 px-3 py-1 rounded-lg text-[10px] font-black hover:bg-red-500 hover:text-white transition-all">HAPUS</button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* KELOLA AGENDA */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black mb-6 text-blue-600">📅 KELOLA AGENDA</h2>
              <div className="h-48 overflow-y-auto space-y-3 pr-3 custom-scrollbar">
                {data.agenda.map((a: any) => (
                  <div key={a.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-700 truncate pr-4">{a.nama_kegiatan}</span>
                    <button onClick={() => handleHapus('agenda', a.id)} className="text-red-500 font-black text-[10px] hover:underline">HAPUS</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOTAK ADUAN */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h2 className="text-lg font-black mb-6 flex items-center gap-3 text-red-500">🚨 ADUAN WARGA</h2>
            <div className="space-y-4 h-[1000px] lg:h-[1100px] overflow-y-auto pr-3 custom-scrollbar">
              {data.aduan.map((ad: any) => (
                <div key={ad.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group relative hover:border-red-200 hover:shadow-md transition-all">
                  <button onClick={() => handleHapus('aduan', ad.id)} className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all text-[10px] font-bold hover:bg-red-500 hover:text-white">HAPUS PESAN</button>
                  <p className="font-black text-slate-800 text-sm mb-3">{ad.nama}</p>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-slate-600 text-sm leading-relaxed italic">"{ad.pesan}"</p>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 text-right font-mono">{new Date(ad.created_at).toLocaleString('id-ID')}</p>
                </div>
              ))}
              {data.aduan.length === 0 && <p className="text-center text-slate-400 py-20 italic">Belum ada aspirasi warga yang masuk.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}