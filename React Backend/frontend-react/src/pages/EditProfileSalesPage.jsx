import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Tambah useParams
import { FiLock, FiSave } from "react-icons/fi";
import TopBarUser from "../components/TopBarUser";
import api from "../utils/api";
import { toast } from "react-toastify";

export default function EditProfileSalesPage() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSelfEdit, setIsSelfEdit] = useState(false); 


  useEffect(() => {
    const loadData = async () => {
    
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

      if (id) {

        setIsSelfEdit(false);
        try {
          const res = await api.get(`/sales/${id}`);
          const salesData = res.data.data;
          setNama(salesData.nama);
          setEmail(salesData.email);
        } catch (err) {
          toast.error("Gagal mengambil data sales");
          navigate("/admin/manage-sales");
        }
      } else {
    
        setIsSelfEdit(true);
        setNama(storedUser.nama || "");
        setEmail(storedUser.email || "");
      }
    };
    loadData();
  }, [id, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!nama || !email) {
      toast.error("Nama dan email wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const targetId = id ? id : storedUser.id_user;


      await api.put(`/sales/${targetId}`, { nama, email });

      toast.success("Profil berhasil diperbarui.");

      if (isSelfEdit) {
        const updatedUser = { ...storedUser, nama, email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
 
      setTimeout(() => {
        if (id) {
          navigate("/admin/manage-sales");
        } else {
          navigate("/sales/profile");
        }
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menyimpan profil.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordLink = async () => {
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Link reset password telah dikirim ke email.");
    } catch (err) {
      toast.error("Gagal mengirim link reset password.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">

      <TopBarUser title="Edit Profile" />

      <main className="flex-1 px-8 py-6 bg-white">
        <form onSubmit={handleSave} className="max-w-5xl mx-auto">
          
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
                className="w-full px-4 py-3 rounded-md border border-gray-400 text-gray-900 focus:outline-none focus:border-[#0058D2] focus:ring-1 focus:ring-[#0058D2] text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-xs font-bold text-gray-400 mb-2">
                Password
              </label>
              <button
                type="button"
                onClick={handleResetPasswordLink}
                className="w-full border border-[#0058D2] rounded-md px-4 py-3 flex items-center text-sm font-bold text-[#0058D2] hover:bg-blue-50 transition-colors"
              >
                <FiLock className="mr-2" size={18} />
                Dapatkan Link untuk Reset Password
              </button>
            </div>
          </div>
          <button type="submit" className="hidden" />
          
        </form>
      </main>
      <div className="bg-white border-t border-gray-200 p-6 mt-auto">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-[#0058D2] hover:bg-[#0046a8] text-white py-3 rounded-md text-sm font-bold flex items-center justify-center transition-colors disabled:opacity-70 shadow-sm"
          >
            <FiSave className="mr-2" size={18} />
            {loading ? "Menyimpan..." : "Simpan Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}