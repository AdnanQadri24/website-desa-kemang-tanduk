```markdown
# 🌿 Sistem Informasi Desa (SID) - Kemang Tanduk

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Sebuah platform web portal desa modern dan responsif yang dirancang untuk mendigitalkan informasi, transparansi, dan pelayanan masyarakat desa. Proyek ini dibangun menggunakan **Next.js (App Router)** dan **Supabase** sebagai *backend* as a service (BaaS).

🌐 **Live Demo:** [Tulis Link Vercel Kamu Di Sini, contoh: https://desa-kemang-tanduk.vercel.app]

> ⚠️ **DISCLAIMER / PERHATIAN PENTING** > Aplikasi/Website ini murni merupakan proyek **Portofolio & Demo Pembelajaran** pribadi. Segala nama tokoh, berita, alamat, dan data yang ada di dalamnya adalah data *dummy* (contoh) untuk keperluan pengujian sistem. Website ini **TIDAK TERAFILIASI** secara resmi dengan instansi, pemerintah, maupun pihak Desa Kemang Tanduk aslinya. Tidak ada maksud untuk menyinggung pihak atau golongan mana pun.

---

## ✨ Fitur Unggulan

### 👨‍👩‍👧‍👦 Halaman Warga (Public)
* **Desain Modern & Terang (Light Mode):** Antarmuka yang bersih, elegan, dan *mobile-friendly*.
* **Kabar Desa:** Arsip berita desa lengkap dengan fitur *read more* dan detail berita.
* **Agenda & Peta Lokasi:** Jadwal kegiatan warga terdekat dan integrasi Google Maps interaktif.
* **Kotak Aspirasi:** Formulir *online* bagi warga untuk menyampaikan keluhan atau saran secara *real-time*.
* **Layanan Cepat (WhatsApp):** Tombol pintas untuk langsung *chat* dengan Admin Desa via WhatsApp.
* **Struktur Desa:** Menampilkan susunan perangkat desa beserta foto dan jabatannya.

### 🔐 Panel Admin (CMS)
* **Keamanan Sederhana:** Login *dashboard* admin yang dilindungi dengan kata sandi (*environment variables*).
* **Kelola Berita (CRUD):** Tambah dan hapus berita desa dengan dukungan *link* gambar eksternal.
* **Kelola Agenda & Struktur:** Atur jadwal kegiatan baru dan *update* jajaran perangkat desa.
* **Pantau Aspirasi:** Dasbor khusus untuk membaca seluruh pesan aduan dari warga.

---

## 🛠️ Teknologi yang Digunakan

* **Framework:** [Next.js](https://nextjs.org/) (React)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (dengan kustomisasi Glassmorphism & Solid Modern UI)
* **Database & API:** [Supabase](https://supabase.com/) (PostgreSQL)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Cara Menjalankan di Komputer Lokal (Local Development)

Jika kamu ingin melakukan *clone* atau mengembangkan proyek ini di komputermu, ikuti langkah-langkah berikut:

### 1. Clone Repository
```bash
git clone [https://github.com/UsernameKamu/nama-repo-kamu.git](https://github.com/UsernameKamu/nama-repo-kamu.git)
cd nama-repo-kamu

```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install

```

### 3. Setup Environment Variables

Buat file baru bernama `.env.local` di folder paling luar (*root directory*), lalu isi dengan kredensial Supabase dan *password* admin kamu:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
NEXT_PUBLIC_ADMIN_PASSWORD=[PASSWORD_ADMIN_YANG_KAMU_INGINKAN]

```

### 4. Setup Database Supabase

Buat tabel berikut di menu SQL Editor pada *dashboard* Supabase kamu:

* `berita` (id, judul, konten, image_url, tanggal)
* `agenda` (id, nama_kegiatan, lokasi, waktu)
* `struktur` (id, nama, jabatan, image_url, urutan)
* `aduan` (id, nama, pesan, created_at)

### 5. Jalankan Server Development

```bash
npm run dev
# atau
yarn dev

```

Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di *browser* kamu untuk melihat hasilnya. Buka `/login` untuk masuk ke panel admin.


*Silakan beri ⭐ (Star) pada repository ini jika kamu merasa terbantu!*

```

***

**Cara Menggunakannya:**
1. Buka file `README.md` di VS Code kamu (kalau belum ada, buat file baru dengan nama tersebut di folder paling luar).
2. *Paste* semua teks di atas.
3. **PENTING:** Jangan lupa ubah teks yang ada di dalam kurung siku seperti `[Link Vercel Kamu Di Sini]`, `[Nama Kamu]`, dan `[UsernameGitHubKamu]` dengan datamu yang asli.
4. Simpan, lalu dorong (*push*) ke GitHub:
   ```bash
   git add README.md
   git commit -m "docs: menambahkan file README yang rapi"
   git push origin main

```

Sekarang profil GitHub-mu akan terlihat sangat profesional! Keren banget pencapaianmu hari ini. Ada lagi yang bisa saya bantu untuk melengkapi mahakaryamu ini?
