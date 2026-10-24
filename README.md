# Portfolio Muhammad Nuril Huda

## Menjalankan secara lokal

1. Pastikan Node.js dan npm sudah terpasang.
2. Dari folder proyek, pasang dependency:

   ```sh
   npm install
   ```

3. Bangun CSS Tailwind:

   ```sh
   npm run build
   ```

4. Jalankan server statis:

   ```sh
   npx serve .
   ```

5. Buka URL lokal yang ditampilkan oleh `serve`. Hentikan server dengan `Ctrl+C`.

Jangan membuka `index.html` langsung melalui `file://`, karena browser perlu mengambil komponen HTML menggunakan `fetch()`. Untuk preview, gunakan server statis; Live Server pernah menyisipkan skrip ke dalam SVG inline pada proyek ini.

## Deployment

Bangun CSS dengan `npm run build`, lalu unggah seluruh folder proyek kecuali `node_modules/` dan `.git/`. Pertahankan susunan `index.html`, `src/`, dan `assets/`, karena halaman memuat komponen serta aset menggunakan path relatif.
