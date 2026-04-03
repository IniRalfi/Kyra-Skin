"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface UserProfile {
  age: number;
  gender: number;
  skinType: number;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  profile?: UserProfile | null;
}

const SKIN_TYPES = [
  { id: 1, label: "Kering 🏜️" },
  { id: 2, label: "Berminyak 💦" },
  { id: 3, label: "Sensitif 🌸" },
  { id: 4, label: "Kombinasi ⚖️" },
  { id: 5, label: "Normal ✨" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    age: 20,
    gender: 1,
    skinType: 5,
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.get<UserData[]>("/admin/users");
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddModal = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", password: "", role: "user", age: 20, gender: 1, skinType: 5 });
    setModalOpen(true);
  };

  const openEditModal = (user: UserData) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      age: user.profile?.age || 20,
      gender: user.profile?.gender || 1,
      skinType: user.profile?.skinType || 5,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await api.put("/admin/users", { id: editingUser.id, ...form });
      } else {
        await api.post("/admin/users", form);
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      alert(err.message || "Gagal memproses data.");
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const wani = window.confirm(`Yakin mau menghapus permanen sdr. "${name}" dari database?`);
    if (!wani) return;
    try {
      await api.delete(`/admin/users?id=${id}`);
      fetchUsers();
    } catch (err) {
      alert("Operasi pembersihan gagal.");
    }
  };

  return (
    <>
      <div className="bg-white/40 backdrop-blur-3xl rounded-[48px] border border-white/60 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.03)] font-jakarta min-h-[700px] animate-in fade-in zoom-in-95 duration-700 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-[#111] tracking-tighter flex items-center gap-3">
              Manajemen <span className="text-[#e8779b]">Pengguna</span>
            </h2>
            <p className="text-gray-400 font-bold text-xs mt-2 uppercase tracking-widest">
              Pusat Kendali Data & Otoritas User
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-[#111] text-white font-black px-8 py-4 rounded-3xl text-xs uppercase tracking-[0.2em] hover:bg-[#e8779b] transition-all hover:shadow-[0_15px_30px_rgba(232,119,155,0.3)] active:scale-95 flex items-center gap-2"
          >
            Tambah User Baru
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-32 opacity-30 text-center">
            <div className="w-10 h-10 border-4 border-[#e8779b] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-black text-[10px] tracking-[0.3em] uppercase">
              Sinkronisasi Basis Data...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                    #UID
                  </th>
                  <th className="pb-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                    Identitas
                  </th>
                  <th className="pb-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 text-center">
                    Bio-Profil
                  </th>
                  <th className="pb-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                    Peran
                  </th>
                  <th className="pb-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 text-right">
                    Kelola
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-[#111] divide-y divide-gray-50">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/40 transition-all group">
                    <td className="py-7 px-4 text-gray-300 font-black">#{u.id}</td>
                    <td className="py-7 px-4">
                      <p className="font-black text-base text-[#111] tracking-tight">{u.name}</p>
                      <p className="text-[11px] text-gray-400 font-bold">{u.email}</p>
                    </td>
                    <td className="py-7 px-4">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[9px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-widest">
                          {u.profile?.age || "?"} thn ·{" "}
                          {u.profile?.gender === 1 ? "Pria" : "Wanita"}
                        </span>
                        <span className="text-[10px] font-black text-[#e8779b] uppercase tracking-[0.2em]">
                          {SKIN_TYPES.find((s) => s.id === u.profile?.skinType)?.label ||
                            "Belum Terdata"}
                        </span>
                      </div>
                    </td>
                    <td className="py-7 px-4">
                      <span
                        className={`px-4 py-2 rounded-2xl text-[9px] font-black tracking-widest uppercase ${u.role === "admin" ? "bg-[#e8779b] text-white shadow-lg shadow-pink-100" : "bg-white text-gray-300 border border-gray-50"}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-7 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(u)}
                        className="px-5 py-3 bg-white text-[#111] border border-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all active:scale-95 text-xs font-black uppercase tracking-widest"
                      >
                        Ubah
                      </button>
                      <button
                        onClick={() => handleDelete(u.id, u.name)}
                        disabled={u.role === "admin"}
                        className="px-5 py-3 bg-white text-red-300 border border-red-50 rounded-2xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-95 text-xs font-black uppercase tracking-widest"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <p className="text-center py-20 font-black text-[10px] tracking-[0.3em] uppercase text-gray-300">
                Warga Belum Ditemukan.
              </p>
            )}
          </div>
        )}
      </div>

      {/* 💎 FIXED MODAL SYSTEM (PENYESUAIAN BAHASA INDONESIA PROFESIONAL) 💎 */}
      <AnimatePresence mode="wait">
        {modalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6 md:p-12 overflow-hidden pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-[#1a060d]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative bg-white rounded-[56px] p-8 md:p-14 w-full max-w-5xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white overflow-hidden max-h-[92vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-4xl font-black text-[#111] tracking-tighter">
                    {editingUser ? "Ubah Data Profil" : "Daftarkan User Baru"}
                  </h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-3">
                    Sistem Otoritas Keamanan Kyra-Skin
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl hover:bg-red-50 hover:text-red-500 transition-all active:scale-90 font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                    <span className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center text-xs font-black">
                      1
                    </span>
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#111]">
                      Kredensial Akun
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-300 mb-2 tracking-widest">
                        Nama Lengkap Identitas
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-gray-50/50 border border-transparent focus:border-gray-200 focus:bg-white rounded-3xl px-6 py-4 text-sm font-bold shadow-sm outline-none transition-all"
                        placeholder="Contoh: Budi Santoso"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-300 mb-2 tracking-widest">
                        Alamat Email Digital
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-gray-50/50 border border-transparent focus:border-gray-200 focus:bg-white rounded-3xl px-6 py-4 text-sm font-bold shadow-sm outline-none transition-all"
                        placeholder="name@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-300 mb-2 tracking-widest">
                        Kata Sandi Akses {editingUser && "(Kosongkan jika tetap)"}
                      </label>
                      <input
                        type="password"
                        required={!editingUser}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full bg-gray-50/50 border border-transparent focus:border-gray-200 focus:bg-white rounded-3xl px-6 py-4 text-sm font-bold shadow-sm outline-none transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-300 mb-2 tracking-widest">
                        Otoritas Peran
                      </label>
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full bg-gray-50/50 border border-transparent focus:border-gray-200 focus:bg-white rounded-3xl px-6 py-4 text-sm font-bold shadow-sm outline-none transition-all cursor-pointer"
                      >
                        <option value="user">User Biasa (Nasabah)</option>
                        <option value="admin">Sistem Admin (Pengawas)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                    <span className="w-8 h-8 rounded-full bg-[#e8779b] text-white flex items-center justify-center text-xs font-black">
                      2
                    </span>
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#e8779b]">
                      Profil Biologis
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-300 mb-2 tracking-widest">
                        Usia User
                      </label>
                      <input
                        required
                        type="number"
                        min={10}
                        max={100}
                        value={form.age}
                        onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                        className="w-full bg-gray-50/50 border border-transparent focus:border-gray-200 focus:bg-white rounded-3xl px-6 py-4 text-sm font-bold shadow-sm outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-300 mb-2 tracking-widest">
                        Jenis Kelamin
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setForm({ ...form, gender: g })}
                            className={`py-4 rounded-2xl text-[10px] font-black transition-all border-2 ${form.gender === g ? "bg-[#111] border-[#111] text-white shadow-xl" : "bg-white border-gray-50 text-gray-400"}`}
                          >
                            {g === 1 ? "PRIA" : "WANITA"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-300 mb-4 tracking-widest text-center">
                      Klasifikasi Tipe Kulit
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {SKIN_TYPES.map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setForm({ ...form, skinType: st.id })}
                          className={`py-5 rounded-3xl text-[9px] font-black border-2 transition-all flex flex-col items-center gap-2 ${form.skinType === st.id ? "bg-[#e8779b] border-[#e8779b] text-white shadow-[0_10px_20px_rgba(232,119,155,0.15)]" : "bg-white border-gray-50 text-gray-400 hover:border-gray-100"}`}
                        >
                          <span className="text-xl">{st.label.split(" ")[1]}</span>
                          <span className="uppercase tracking-widest">
                            {st.label.split(" ")[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#fdf2f5] p-8 rounded-[40px] border border-pink-100 mt-4">
                    <p className="text-[10px] font-bold text-[#e8779b] uppercase tracking-[0.2em] leading-loose text-center">
                      Analisis: Presisi data biometrik sangat menentukan akurasi rekomendasi AI
                      Kyra-Skin.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-col md:flex-row gap-4 mt-8 pt-12 border-t border-gray-50">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-5 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] text-gray-400 bg-gray-50 hover:bg-gray-100 transition-all active:scale-95 text-center"
                  >
                    Batalkan Operasi
                  </button>
                  <button
                    type="submit"
                    className="flex-[3] py-5 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] text-white bg-[#111] hover:bg-black transition-all shadow-[0_25px_50px_rgba(34,11,25,0.2)] active:scale-95"
                  >
                    Simpan & Konfirmasi Perubahan →
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
