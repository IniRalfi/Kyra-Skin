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

  // Status Lemari Laci Buka Tutup Mode Edit/Tambah
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "Face Wash",
    price: "",
    stock: "0",
    description: "",
    image: "", // <-- Tambah stock
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

  // Pelatuk Tombol Batal Keluar Mode Edit & Delete
  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm({
      name: "",
      category: "Face Wash",
      price: "",
      stock: "0", // <---- SELIPKAN PEMBERSIH STOK INI DI SINI!
      description: "",
      image: "",
      ingredientsRaw: "",
      suitableForRaw: "1,2,3,4,5",
    });
  };

  // Pelatuk Tombol Edit (Sedot Data Tabel menuju Atas Form)
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
    // Scroll memanjakan mata boss supaya mulus geser ke puncak panel
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pipa Saluran Penyelamatan Form (Simpan/Timpa Data)
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
        await api.put("/admin/products", { id: editingId, ...payload }); // Jalur revisi (EDIT)
      } else {
        await api.post("/admin/products", payload); // Jalur publikasi asli (ADD)
      }

      handleCancel();
      fetchProducts();
    } catch (err) {
      alert("Aduh, gagal menyimpan resep skincare ke server database.");
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const wani = window.confirm(
      `Yakin mau menarik dan membuang permanen sisa ampas ramuan "${name}"?`,
    );
    if (wani) {
      try {
        await api.delete(`/admin/products?id=${id}`);
        fetchProducts();
      } catch (err) {
        alert("Gagal membakar produk skincare.");
      }
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-[32px] border border-white/80 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] font-jakarta animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-[#e8779b] tracking-tight drop-shadow-sm">
            Katalog Skincare
          </h2>
          <p className="text-gray-500 font-medium text-sm mt-1.5">
            Meja racikan etalase dan gudang pamer senjata utamamu.
          </p>
        </div>
        <button
          onClick={isAdding ? handleCancel : () => setIsAdding(true)}
          className={`px-6 py-3.5 rounded-full text-white font-extrabold text-sm shadow-xl transition-all ${isAdding ? "bg-gray-400 hover:bg-gray-500" : "bg-[#111] hover:bg-black hover:scale-105"}`}
        >
          {isAdding ? "❌ Tutup Panel Kaca" : "✨ + Tambah Ramuan"}
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 border border-white p-8 rounded-[28px] mb-8 shadow-sm animate-in zoom-in-95 duration-200"
        >
          <div className="grid grid-cols-2 gap-5 mb-6">
            <div>
              <label className="text-xs font-extrabold text-gray-500 mb-2 block uppercase tracking-widest">
                Nama Panggilan
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/60 border border-[#f5d0dd] rounded-xl px-4 py-3.5 text-sm font-bold text-[#111] outline-none focus:ring-2 focus:ring-[#e8779b]/50"
              />
            </div>
            <div>
              <label className="text-xs font-extrabold text-gray-500 mb-2 block uppercase tracking-widest">
                URL Gambar Sampul
              </label>
              <CldUploadWidget
                uploadPreset="kyrasupreme" // Ingat, tulisan ini harus sama persis dengan nama preset Unsigned kamu di web Cloudinary!
                onSuccess={(result: any) => {
                  // Menerima kado link gambar asli dari awan, lalu menyedotnya ke form
                  setForm({ ...form, image: result.info.secure_url });
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full bg-white border-2 border-dashed border-[#f5d0dd] text-[#e8779b] rounded-xl px-4 py-3.5 text-sm font-bold text-center hover:bg-[#ffeef3] hover:border-[#e8779b] shadow-[inset_0_2px_10px_rgba(232,119,155,0.05)] transition-all"
                  >
                    {form.image
                      ? "✅ File Foto Sudah Dipeluk Form (Klik Untuk Menukar Benda)"
                      : "📸 Klik Untuk Menyisipkan File Foto Skincare"}
                  </button>
                )}
              </CldUploadWidget>
            </div>
            <div>
              <label className="text-xs font-extrabold text-gray-500 mb-2 block uppercase tracking-widest">
                Kategori Kasta
              </label>
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-white/60 border border-[#f5d0dd] rounded-xl px-4 py-3.5 text-sm font-bold text-[#111] outline-none focus:ring-2 focus:ring-[#e8779b]/50 cursor-pointer"
              >
                <option value="Face Wash">Face Wash</option>
                <option value="Toner">Toner</option>
                <option value="Serum">Serum</option>
                <option value="Moisturizer">Moisturizer</option>
                <option value="Sunscreen">Sunscreen</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-extrabold text-gray-500 mb-2 block uppercase tracking-widest">
                Mahar Jual (Rp)
              </label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-white/60 border border-[#f5d0dd] rounded-xl px-4 py-3.5 text-sm font-bold text-[#111] outline-none focus:ring-2 focus:ring-[#e8779b]/50"
              />
            </div>
            <div>
              <label className="text-xs font-extrabold text-gray-500 mb-2 block uppercase tracking-widest">
                Stok Gudang Fisik (Pcs)
              </label>
              <input
                type="number"
                required
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full bg-white/60 border border-[#f5d0dd] rounded-xl px-4 py-3.5 text-sm font-bold text-[#111] outline-none focus:ring-2 focus:ring-[#e8779b]/50"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-extrabold text-gray-500 mb-2 block uppercase tracking-widest">
                Senjata Ramuan Aktif (Pisahkan dg Koma)
              </label>
              <input
                required
                placeholder="Niacinamide, Retinol, Ekstrak Buaya"
                value={form.ingredientsRaw}
                onChange={(e) => setForm({ ...form, ingredientsRaw: e.target.value })}
                className="w-full bg-white/60 border border-[#f5d0dd] rounded-xl px-4 py-3.5 text-sm font-bold text-[#111] outline-none focus:ring-2 focus:ring-[#e8779b]/50"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-extrabold text-gray-500 mb-2 block uppercase tracking-widest">
                Kecocokan Tarung Mangsa (1:Kering, 2:Minyak, 3:Sensitif, 4:Kombinasi, 5:Normal)
              </label>
              <input
                required
                placeholder="1,2,3,4,5"
                value={form.suitableForRaw}
                onChange={(e) => setForm({ ...form, suitableForRaw: e.target.value })}
                className="w-full bg-white/60 border border-[#f5d0dd] rounded-xl px-4 py-3.5 text-sm font-bold text-[#111] outline-none focus:ring-2 focus:ring-[#e8779b]/50"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-extrabold text-gray-500 mb-2 block uppercase tracking-widest">
                Petuah Kegunaan Singkat
              </label>
              <textarea
                value={form.description}
                rows={2}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-white/60 border border-[#f5d0dd] rounded-xl px-4 py-3.5 text-sm font-bold text-[#111] outline-none focus:ring-2 focus:ring-[#e8779b]/50 resize-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#e8779b] text-white px-6 py-4 rounded-xl font-extrabold text-sm w-full hover:bg-pink-500 transition-all shadow-lg shadow-pink-200 active:scale-[0.99] uppercase tracking-widest"
          >
            {editingId ? "✨ Selesai Merevisi Ramuan" : "🚀 Simpan & Luncurkan Etalase"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-[#e8779b] font-bold tracking-widest uppercase text-sm animate-pulse">
            Memeriksa tumpukan stok brankas...
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-[#f5d0dd]">
                <th className="pb-4 px-3 text-xs font-extrabold uppercase tracking-widest text-[#e8779b]/60 w-16">
                  Wujud
                </th>
                <th className="pb-4 px-3 text-xs font-extrabold uppercase tracking-widest text-[#e8779b]/60">
                  ID Panggil
                </th>
                <th className="pb-4 px-3 text-xs font-extrabold uppercase tracking-widest text-[#e8779b]/60">
                  Nilai Jual
                </th>
                <th className="pb-4 px-3 text-xs font-extrabold uppercase tracking-widest text-[#e8779b]/60">
                  Ramuan Esensial Khusus
                </th>
                <th className="pb-4 px-3 text-xs font-extrabold uppercase tracking-widest text-[#e8779b]/60 text-right">
                  Modifikasi Paksa
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-extrabold text-[#111] divide-y divide-[#f5d0dd]/30">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-white/40 transition-colors group">
                  <td className="py-5 px-3">
                    {p.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <div className="relative w-14 h-14">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="56px"
                          className="object-cover rounded-xl border border-[#f5d0dd] shadow-[0_2px_10px_rgba(232,119,155,0.1)] transform group-hover:scale-105 transition-all"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-[#f5d0dd]/40 flex items-center justify-center text-xl shadow-inner">
                        🧴
                      </div>
                    )}
                  </td>
                  <td className="py-5 px-3">
                    <p className="text-base">{p.name}</p>
                    <p className="text-[10px] text-[#e8779b] font-black uppercase tracking-widest mt-1.5 bg-white px-2.5 py-1 rounded-md inline-block border border-[#f5d0dd]/50 shadow-[0_2px_4px_rgba(232,119,155,0.05)]">
                      {p.category}
                    </p>
                  </td>
                  <td className="py-5 px-3 text-base">
                    <p className="text-[#e8779b] font-black tracking-tight">
                      Rp {p.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 hover:text-[#e8779b]">
                      Sisa Stok: {p.stock} Pcs
                    </p>
                  </td>
                  <td className="py-5 px-3">
                    <p className="max-w-[250px] truncate font-medium text-xs text-gray-500 leading-relaxed border border-[#f5d0dd]/50 bg-white/50 rounded-lg p-2 inline-block">
                      {safeStrList(p.ingredients)}
                    </p>
                  </td>
                  <td className="py-5 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-4 py-2.5 mr-2 bg-white text-[#5c8bdf] border border-blue-100 rounded-xl hover:bg-[#5c8bdf] hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="px-4 py-2.5 bg-white text-red-500 border border-red-100 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      🗑️ Binasa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <p className="text-center py-16 font-bold text-gray-400">
              Etalasemu masih sekosong debu.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
