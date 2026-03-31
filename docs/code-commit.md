## 🛠 Panduan Pesan Commit (Conventional Commits)

Proyek ini mengikuti standar [Conventional Commits](https://conventionalcommits.org).

### Format Dasar

`type(scope): deskripsi singkat`

| Type         | Keterangan                           | Contoh                                   |
| :----------- | :----------------------------------- | :--------------------------------------- |
| **feat**     | Menambahkan fitur baru.              | `feat(cart): tambah fitur tambah produk` |
| **fix**      | Memperbaiki bug/kesalahan logika.    | `fix(login): perbaiki validasi email`    |
| **docs**     | Perubahan pada dokumentasi.          | `docs: update panduan instalasi`         |
| **style**    | Perubahan format (spasi, indentasi). | `style: rapikan indentasi dashboard`     |
| **refactor** | Perbaikan struktur kode.             | `refactor: optimasi query database`      |
| **perf**     | Meningkatkan performa.               | `perf: percepat loading gambar`          |
| **test**     | Menambah/memperbaiki unit test.      | `test: tambah test fitur auth`           |
| **build**    | Perubahan sistem build/library.      | `build: tambahkan library axios`         |
| **ci**       | Perubahan konfigurasi CI/CD.         | `ci: update workflow deployment`         |
| **chore**    | Maintenance/update library.          | `chore: update versi dependensi`         |
| **revert**   | Membatalkan commit sebelumnya.       | `revert: feat(cart): hapus fitur`        |

### 💡 Aturan Penulisan

1. **Gunakan Huruf Kecil:** Awali tipe dan deskripsi dengan huruf kecil.
2. **Kalimat Perintah (Imperative):** Gunakan kata kerja perintah (contoh: `tambah`, bukan `menambahkan`).
3. **Singkat & Jelas:** Maksimal 50-70 karakter untuk baris pertama.
4. **Scope (Opsional):** Tambahkan konteks dalam kurung seperti `(auth)` atau `(api)`.
5. **Body:** Jika butuh penjelasan panjang, beri jarak satu baris kosong setelah header.
