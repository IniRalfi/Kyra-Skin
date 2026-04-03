"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil serok semua data dari pipa awan
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

  // Eksekusi buang penghuni
  const handleDelete = async (id: number, name: string) => {
    const wani = window.confirm(`Yakin mau menendang sdr. "${name}" dari planet Kyra-Skin?`);
    if (!wani) return;

    try {
      await api.delete(`/admin/users?id=${id}`);
      fetchUsers(); // Refresh tabel setelah dipenggal
    } catch (err) {
      alert("Yah, gagal membasmi user tersebut.");
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-[32px] border border-white/80 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] font-jakarta animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-[#e8779b] tracking-tight drop-shadow-sm">
            Manajemen Pengguna
          </h2>
          <p className="text-gray-500 font-medium text-sm mt-1.5">
            Pantau, analisis, dan basmi user yang melanggar SOP Toko.
          </p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-2xl text-sm font-extrabold text-[#e8779b] shadow-[0_4px_12px_rgba(232,119,155,0.1)] border border-[#FAD9E6]">
          🔥 Total: {users.length} Akun
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-[#e8779b] font-bold tracking-widest uppercase text-sm animate-pulse">
            Menyedot Basis Data...
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#f5d0dd]">
                <th className="pb-4 px-2 text-xs font-extrabold uppercase tracking-widest text-[#e8779b]/60">
                  UID
                </th>
                <th className="pb-4 px-2 text-xs font-extrabold uppercase tracking-widest text-[#e8779b]/60">
                  Nasabah
                </th>
                <th className="pb-4 px-2 text-xs font-extrabold uppercase tracking-widest text-[#e8779b]/60">
                  Surel Pribadi
                </th>
                <th className="pb-4 px-2 text-xs font-extrabold uppercase tracking-widest text-[#e8779b]/60">
                  Peran
                </th>
                <th className="pb-4 px-2 text-xs font-extrabold uppercase tracking-widest text-[#e8779b]/60 text-right">
                  Amuk Massa
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-extrabold text-[#111] divide-y divide-[#f5d0dd]/30">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/40 transition-colors group">
                  <td className="py-5 px-2 text-gray-400 font-bold">#{u.id}</td>
                  <td className="py-5 px-2">{u.name}</td>
                  <td className="py-5 px-2 text-gray-500 font-semibold">{u.email}</td>
                  <td className="py-5 px-2">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-[10px] tracking-widest uppercase shadow-sm ${u.role === "admin" ? "bg-[#e8779b] text-white" : "bg-white text-gray-400 border border-gray-100"}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-5 px-2 text-right">
                    <button
                      onClick={() => handleDelete(u.id, u.name)}
                      disabled={u.role === "admin"}
                      className="px-4 py-2 bg-white text-red-500 border border-red-100 rounded-xl hover:bg-red-500 hover:text-white hover:border-transparent transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm active:scale-95"
                    >
                      Ban
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center py-10 font-bold text-gray-400">
              Database masih sekosong hatiku.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
