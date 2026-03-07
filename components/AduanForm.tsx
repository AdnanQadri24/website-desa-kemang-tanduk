'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AduanForm() {
  const [form, setForm] = useState({ nama: '', pesan: '' });
  const [loading, setLoading] = useState(false);
  
  const send = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Tangkap response dari Supabase (termasuk error-nya)
    const { error } = await supabase.from('aduan').insert([form]);
    
    // 2. Cek apakah ada error
    if (error) {
      alert('Gagal mengirim aduan: ' + error.message);
      console.error(error);
    } else {
      alert('Aspirasi Anda berhasil terkirim!');
      setForm({ nama: '', pesan: '' });
    }
    
    setLoading(false);
  };
  
  return (
    <form onSubmit={send} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4">
      <input 
        className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" 
        placeholder="Nama Lengkap" 
        value={form.nama} 
        onChange={e => setForm({ ...form, nama: e.target.value })} 
        required 
      />
      <textarea 
        className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all min-h-[120px]" 
        placeholder="Tuliskan isi aspirasi atau keluhan Anda..." 
        value={form.pesan} 
        onChange={e => setForm({ ...form, pesan: e.target.value })} 
        required 
      />
      <button 
        type="submit"
        disabled={loading}
        className="bg-emerald-600 text-white w-full py-4 rounded-xl font-bold hover:bg-emerald-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Mengirim Pesan...' : 'Kirim Aspirasi'}
      </button>
    </form>
  );
}