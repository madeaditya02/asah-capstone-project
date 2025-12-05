import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import TopBarUser from "../components/TopBarUser";
import api from "../utils/api";
import { toast } from "react-toastify";

export default function EditProfileAdminPage() {
  const navigate = useNavigate();
  
 
  const storedUser = localStorage.getItem("user");
  const user = useMemo(
    () => (storedUser ? JSON.parse(storedUser) : {}),
    [storedUser]
  );

  const [nama, setNama] = useState(user.nama || "");
  const [email, setEmail] = useState(user.email || "");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.id_user) {
          const res = await api.get(`/profile/${user.id_user}`);
          const data = res.data.data;
          setNama(data.nama);
          setEmail(data.email);
        }
      } catch (err) {
        
        console.error("Gagal ambil data profile terbaru");
      }
    };
    fetchData();
  }, [user.id_user]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!nama || !email) {
      toast.error("Nama dan email wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      
      await api.put(`/profile/${user.id_user}`, { nama, email });

   
      const newUser = { ...user, nama, email };
      localStorage.setItem("user", JSON.stringify(newUser));

      toast.success("Profil berhasil diperbarui.");
      
      
      setTimeout(() => navigate("/admin/profile"), 1000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menyimpan profil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col font-sans">
      {/* HEADER */}
      <TopBarUser title="Edit Profile" />

      {/* KONTEN UTAMA */}
      <main className="flex-1 w-full px-8 py-6">
        
        {/* Container Form */}
        <form onSubmit={handleSave} className="max-w-5xl mx-auto">
          
          {/* CARD FORM */}
          <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-sm">
            
            <h3 className="text-[#0058D2] font-bold text-sm mb-6">
              Informasi Pribadi
            </h3>

            {/* Nama */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-400 mb-2">
                Nama
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-md border border-gray-400 text-gray-900 focus:outline-none focus:border-[#0058D2] focus:ring-1 focus:ring-[#0058D2] text-sm"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-2">
              <label className="block text-xs font-bold text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-md border border-gray-400 text-gray-900 focus:outline-none focus:border-[#0058D2] focus:ring-1 focus:ring-[#0058D2] text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="hidden" />
        </form>
      </main>

      {/* FOOTER BAR */}
      <div className="bg-white border-t border-gray-200 p-6 w-full mt-auto">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-[#0058D2] hover:bg-[#0047aa] text-white py-3 rounded-md text-sm font-bold flex items-center justify-center disabled:opacity-70 shadow-sm transition-colors"
          >
            <FiSave className="mr-2" size={18} />
            {loading ? "Menyimpan..." : "Simpan Profile"}
          </button>
        </div>
      </div>

    </div>
  );
}