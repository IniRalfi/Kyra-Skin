"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  ingredients: any;
  suitableFor: any;
  isActive: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "Face Wash",
    price: "",
    stock: "0",
    description: "",
    image: "",
    ingredientsRaw: "",
    suitableForRaw: "1,2,3,4,5",
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.get<Product[]>("/admin/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const safeStrList = (val: any) => {
    try {
      const arr = typeof val === "string" ? JSON.parse(val) : val;
      if (Array.isArray(arr)) return arr.join(", ");
      return String(val);
    } catch {
      return String(val);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm({
      name: "",
      category: "Face Wash",
      price: "",
      stock: "0",
      description: "",
      image: "",
      ingredientsRaw: "",
      suitableForRaw: "1,2,3,4,5",
    });
  };

  const handleEdit = (p: Product) => {
    setIsAdding(true);
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      stock: String(p.stock),
      description: p.description || "",
      image: p.image || "",
      ingredientsRaw: safeStrList(p.ingredients),
      suitableForRaw: safeStrList(p.suitableFor),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ingredientArray = form.ingredientsRaw
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i);
      const suitableArray = form.suitableForRaw
        .split(",")
        .map((i) => Number(i.trim()))
        .filter((i) => !isNaN(i));

      const payload = {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        description: form.description,
        image: form.image,
        ingredients: ingredientArray,
        suitableFor: suitableArray,
      };

      if (editingId) {
        await api.put("/admin/products", { id: editingId, ...payload });
      } else {
        await api.post("/admin/products", payload);
      }

      handleCancel();
      fetchProducts();
    } catch (err) {
      alert("Sistem gagal memperbarui data inventaris.");
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const wani = window.confirm(
      `Apakah Anda yakin ingin menghapus produk "${name}" secara permanen?`,
    );
    if (wani) {
      try {
        await api.delete(`/admin/products?id=${id}`);
        fetchProducts();
      } catch (err) {
        alert("Gagal menghapus data produk.");
      }
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-[32px] border border-white/80 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] font-jakarta animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-[#e8779b] tracking-tight drop-shadow-sm">
            Inventaris Produk
          </h2>
          <p className="text-gray-500 font-medium text-sm mt-1.5">
            Kelola stok, harga, dan detail spesifikasi produk Kyra-Skin.
          </p>
        </div>
        <button
          onClick={isAdding ? handleCancel : () => setIsAdding(true)}
          className={`px-7 py-3.5 rounded-2xl text-white font-extrabold text-xs uppercase tracking-widest shadow-xl transition-all ${isAdding ? "bg-gray-400 hover:bg-gray-500" : "bg-[#111] hover:bg-black hover:scale-105"}`}
        >
          {isAdding ? "✕ Batalkan" : "＋ Tambah Produk"}
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 border border-white p-10 rounded-[32px] mb-12 shadow-sm animate-in zoom-in-95 duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <p className="text-[10px] font-black text-[#e8779b] uppercase tracking-[0.2em] pb-2 border-b border-pink-50">
                1. Informasi Dasar
              </p>
              <div>
                <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">
                  Nama Produk
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-pink-50 transition-all"
                  placeholder="Contoh: Gentle Night Cream"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">
                  Kategori
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-pink-50 transition-all cursor-pointer"
                >
                  <option value="Face Wash">Face Wash</option>
                  <option value="Toner">Toner</option>
                  <option value="Serum">Serum</option>
                  <option value="Moisturizer">Moisturizer</option>
                  <option value="Sunscreen">Sunscreen</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">
                    Harga Jual (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-pink-50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">
                    Stok Tersedia
                  </label>
                  <input
                    type="number"
                    required
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-pink-50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] pb-2 border-b border-blue-50">
                2. Media & Detail Teknis
              </p>
              <div>
                <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">
                  Foto Produk
                </label>
                <CldUploadWidget
                  uploadPreset="kyrasupreme"
                  onSuccess={(result: any) => setForm({ ...form, image: result.info.secure_url })}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 rounded-2xl px-5 py-3.5 text-xs font-bold hover:bg-white hover:border-[#e8779b] hover:text-[#e8779b] transition-all"
                    >
                      {form.image
                        ? "✅ Gambar Berhasil Diunggah"
                        : "📸 Klik untuk Unggah Foto Produk"}
                    </button>
                  )}
                </CldUploadWidget>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">
                  Kandungan Utama (Bahan)
                </label>
                <input
                  required
                  placeholder="Niacinamide, Retinol, Ceramide..."
                  value={form.ingredientsRaw}
                  onChange={(e) => setForm({ ...form, ingredientsRaw: e.target.value })}
                  className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-pink-50"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">
                  Kecocokan Tipe Kulit (1-5)
                </label>
                <input
                  required
                  placeholder="1, 2, 5"
                  value={form.suitableForRaw}
                  onChange={(e) => setForm({ ...form, suitableForRaw: e.target.value })}
                  className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-pink-50"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">
                Deskripsi Singkat Produk
              </label>
              <textarea
                value={form.description}
                rows={3}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-pink-50 resize-none transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#111] text-white px-8 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.3em] w-full hover:bg-[#e8779b] transition-all shadow-2xl active:scale-95"
          >
            {editingId ? "Simpan Perubahan Produk" : "Terbitkan Produk Baru"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20 opacity-30">
          <div className="w-10 h-10 border-4 border-[#e8779b] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-black text-[10px] tracking-[0.3em] uppercase text-[#e8779b]">
            Sinkronisasi Stok...
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-white">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 w-24">
                  Foto
                </th>
                <th className="pb-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                  Produk
                </th>
                <th className="pb-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                  Harga & Stok
                </th>
                <th className="pb-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                  Principal Ingredients
                </th>
                <th className="pb-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 text-right">
                  Tindakan
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-[#111] divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-white/40 transition-all group">
                  <td className="py-6 px-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={p.image || "/placeholder.jpg"}
                        alt={p.name}
                        fill
                        sizes="64px"
                        className="object-cover rounded-2xl border border-white shadow-sm"
                      />
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <p className="font-black text-[#111] text-base tracking-tight">{p.name}</p>
                    <span className="text-[9px] font-black text-[#e8779b] uppercase tracking-widest mt-1 bg-white px-2 py-0.5 rounded border border-pink-50 inline-block">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <p className="font-black text-[#111]">Rp {p.price.toLocaleString("id-ID")}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      Stok: {p.stock} Unit
                    </p>
                  </td>
                  <td className="py-6 px-4">
                    <p className="max-w-[200px] truncate font-medium text-xs text-gray-400 bg-gray-50/50 px-3 py-1.5 rounded-lg inline-block border border-gray-50 italic">
                      {safeStrList(p.ingredients)}
                    </p>
                  </td>
                  <td className="py-6 px-4 text-right whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-5 py-3 bg-white text-black border border-gray-100 rounded-2xl hover:bg-black hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-sm"
                    >
                      Ubah
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="px-5 py-3 bg-white text-red-400 border border-red-50 rounded-2xl hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
