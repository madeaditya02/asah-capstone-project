import React, { useState } from "react";
import { FiSave } from "react-icons/fi";
import TopBarUser from "../components/TopBarUser";
import api from "../utils/api";
import { toast } from "react-toastify";

function generatePassword(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pass = "";
  for (let i = 0; i < length; i += 1) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }
  return pass;
}

export default function AddSalesPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGeneratePassword = () => {
    const pw = generatePassword();
    setPassword(pw);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama || !email || !password) {
      toast.error("Semua field wajib diisi.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password minimal 8 karakter.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/sales", { nama, email, password });
      
      toast.success("Akun sales berhasil dibuat.");
      setNama("");
      setEmail("");
      setPassword("");
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal membuat akun sales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col font-sans">
      
      <TopBarUser title="Tambah Akun" />
      <main className="flex-1 w-full px-8 py-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-sm">
            
            <h3 className="text-[#0058D2] font-bold text-sm mb-6">
              Informasi Pribadi
            </h3>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-400 mb-2">
                Nama
              </label>
              <input
                type="text"
                placeholder="Nama Sales"
                className="w-full px-4 py-3 rounded-md border border-gray-400 text-gray-900 focus:outline-none focus:border-[#0058D2] focus:ring-1 focus:ring-[#0058D2] text-sm"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="example@domain.com"
                className="w-full px-4 py-3 rounded-md border border-gray-400 text-gray-900 focus:outline-none focus:border-[#0058D2] focus:ring-1 focus:ring-[#0058D2] text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
           
            <div className="mb-2">
              <label className="block text-xs font-bold text-gray-400 mb-2">
                Password
              </label>
              <div className="relative w-full">
                
                <input
                  type="text"
                  placeholder="Minimal 8 Karakter"
                 
                  className="w-full pl-4 pr-36 py-3 rounded-md border border-gray-400 text-gray-900 focus:outline-none focus:border-[#0058D2] focus:ring-1 focus:ring-[#0058D2] text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

               
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#0058D2] hover:text-[#003f9b] transition-colors"
                >
                  Buat Otomatis
                </button>

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER BAR */}
      <div className="bg-white border-t border-gray-300 p-6 w-full mt-auto">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#0058D2] hover:bg-[#0047aa] text-white py-3 rounded-md text-sm font-bold flex items-center justify-center disabled:opacity-70 shadow-sm transition-colors"
          >
            <FiSave className="mr-2" size={18} />
            {loading ? "Membuat Akun..." : "Buat Akun"}
          </button>
        </div>
      </div>

    </div>
  );
}