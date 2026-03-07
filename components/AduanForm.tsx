'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AduanForm() {
  const [form, setForm] = useState({ nama: '', pesan: '' });
  
  const send = async (e: any) => {
    e.preventDefault();
    await supabase.from('aduan').insert([form]);
    alert('Aduan terkirim!');
    setForm({ nama: '', pesan: '' });
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
      <button className="bg-emerald-600 text-white w-full py-4 rounded-xl font-bold hover:bg-emerald-700 hover:shadow-lg transition-all">Kirim Aspirasi</button>
    </form>
  );
}