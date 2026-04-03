"use client";

import { AppNavbar } from "@/components/ui/AppNavbar";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SKIN_LABELS: Record<number, string> = {
  1: "Kering 🏜️",
  2: "Berminyak 💦",
  3: "Sensitif 🌸",
  4: "Kombinasi ⚖️",
  5: "Normal ✨",
};
const GENDER_LABELS: Record<number, string> = { 1: "Pria 👨", 2: "Wanita 👩" };

interface AllergyCase {
  id: number;
  reaction_details: string;
  status: string;
  created_at: string;
  product: { name: string; category: string };
}

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const profile = user?.profile;

  const [editing, setEditing] = useState(false);
  const [allergies, setAllergies] = useState<AllergyCase[]>([]);
  const [form, setForm] = useState({
    age: profile?.age ?? "",
    gender: profile?.gender ?? 0,
    skin_type: profile?.skinType ?? 0,
    skin_concerns: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get<AllergyCase[]>("/allergies").then(setAllergies).catch(console.error);
    if (profile) {
      setForm({
        age: profile.age,
        gender: profile.gender,
        skin_type: profile.skinType, // <-- Ubah di sini (pakai T besar untuk profilnya)
        skin_concerns: "",
      });
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/profile", { ...form, age: Number(form.age) });
      await refreshUser();
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full bg-white/60 border border-white rounded-2xl px-4 py-3 text-sm font-medium text-[#111] outline-none focus:ring-2 focus:ring-[#F5D0DD] transition-all";

  return (
    <div className="min-h-screen">
      <AppNavbar />
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-3xl font-extrabold text-[#111] tracking-tight mb-8">Profilku</h1>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-xl rounded-[28px] p-7 border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.05)] mb-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5D0DD] to-[#E6DDF8] flex items-center justify-center text-3xl">
              🌸
            </div>
            <div>
              <p className="font-extrabold text-[#111] text-lg">{user?.name}</p>
              <p className="text-sm text-gray-500 font-medium">{user?.email}</p>
              <span className="inline-block mt-1 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#E6DDF8] text-purple-600">
                {user?.role}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Skin Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/60 backdrop-blur-xl rounded-[28px] p-7 border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.05)] mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-extrabold text-[#111] text-lg">Profil Kulit</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="text-sm font-bold text-[#e8779b] hover:underline"
            >
              {editing ? "Batal" : "✏️ Edit"}
            </button>
          </div>

          {saved && (
            <div className="bg-[#C1D7D0]/40 text-[#3a7a6e] text-sm font-bold rounded-2xl px-4 py-3 mb-5">
              ✓ Profil berhasil diperbarui!
            </div>
          )}

          {!editing ? (
            profile ? (
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Usia", value: `${profile.age} tahun` },
                  { label: "Gender", value: GENDER_LABELS[profile.gender] ?? "-" },
                  { label: "Tipe Kulit", value: SKIN_LABELS[profile.skinType] ?? "-" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/50 rounded-2xl p-4 border border-white/70">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                      {label}
                    </p>
                    <p className="font-extrabold text-[#111] text-sm">{value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 font-medium text-sm">
                Profil kulit belum diisi.
                <button onClick={() => setEditing(true)} className="text-[#e8779b] font-bold ml-1">
                  Isi sekarang
                </button>
              </p>
            )
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1.5 block">Usia</label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={form.age}
                    onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1.5 block">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm((f) => ({ ...f, gender: Number(e.target.value) }))}
                    className={inputClass}
                  >
                    <option value={0}>Pilih...</option>
                    <option value={1}>Pria 👨</option>
                    <option value={2}>Wanita 👩</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1.5 block">Tipe Kulit</label>
                <select
                  value={form.skin_type}
                  onChange={(e) => setForm((f) => ({ ...f, skin_type: Number(e.target.value) }))}
                  className={inputClass}
                >
                  <option value={0}>Pilih...</option>
                  {Object.entries(SKIN_LABELS).map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#111] text-white font-bold py-3.5 rounded-full text-sm hover:bg-black transition-all active:scale-95 shadow-xl disabled:opacity-60"
              >
                {saving ? "Menyimpan..." : "Simpan Perubahan →"}
              </button>
            </form>
          )}
        </motion.div>

        {/* Allergy History */}
        {allergies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-xl rounded-[28px] p-7 border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.05)]"
          >
            <h2 className="font-extrabold text-[#111] text-lg mb-5">🛡️ Riwayat Reaksi Alergi</h2>
            <div className="space-y-3">
              {allergies.map((a) => (
                <div key={a.id} className="bg-white/50 rounded-2xl p-4 border border-white/70">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="font-extrabold text-sm text-[#111]">{a.product?.name}</p>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${a.status === "verified_by_ai" ? "bg-[#C1D7D0]/40 text-[#3a7a6e]" : "bg-yellow-50 text-yellow-600"}`}
                    >
                      {a.status === "verified_by_ai" ? "✓ Terverifikasi" : "⏳ Ditinjau"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{a.reaction_details}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
