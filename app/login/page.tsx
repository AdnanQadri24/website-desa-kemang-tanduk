'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Cek apakah password sama dengan yang ada di ENV
    // (Dalam Next.js, kita bisa kirim via cookie sederhana)
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      // Set cookie berlaku selama 1 hari
      document.cookie = "admin_access=true; path=/; max-age=86400";
      router.push('/admin');
    } else {
      setError('Password salah, silakan hubungi admin IT desa.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="glass-card p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Login Admin Desa</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Masukkan Password"
            className="w-full bg-slate-900 border border-white/10 p-3 rounded-lg text-white outline-none focus:border-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full bg-emerald-500 py-3 rounded-lg font-bold hover:bg-emerald-600 transition-all text-white">
            Masuk ke Panel
          </button>
        </form>
      </div>
    </div>
  );
}