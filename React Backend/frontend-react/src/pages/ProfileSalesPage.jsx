import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiEdit2 } from "react-icons/fi"; 
import TopBarUser from "../components/TopBarUser";
import api from "../utils/api";
import { toast } from "react-toastify";

export default function ProfileSalesPage() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = useMemo(
    () => (storedUser ? JSON.parse(storedUser) : {}),
    [storedUser]
  );

  const [deletePopup, setDeletePopup] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/profile/${user.id_user}`);
      
      toast.success("Akun berhasil dihapus");
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus akun.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col font-sans">
      <TopBarUser title="Profile" />

      <main className="flex-1 w-full px-8 py-6">
        <div className="max-w-4xl mx-auto">

          <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-sm min-h-[200px]">
            <h3 className="text-[#0058D2] font-bold text-sm mb-8">
              Informasi Pribadi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         
              <div>
                <p className="text-gray-400 text-xs font-bold mb-2">Nama</p>
                <p className="text-gray-900 text-base font-medium">
                  {user.nama || "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold mb-2">Email</p>
                <p className="text-gray-900 text-base font-medium">
                  {user.email || "-"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <div className="bg-white border-t border-gray-200 p-6 w-full mt-auto">
        <div className="max-w-4xl mx-auto flex gap-4">
          
          <button
            type="button"
            onClick={() => setDeletePopup(true)}
            className="w-1/2 border border-red-500 text-red-500 py-3 rounded-md text-sm font-bold flex items-center justify-center hover:bg-red-50 transition-colors"
          >
            <FiTrash2 className="mr-2" size={18} />
            Hapus Akun
          </button>

          <button
            type="button"
            onClick={() => navigate("/sales/profile/edit")}
            className="w-1/2 bg-[#0058D2] hover:bg-[#0046a8] text-white py-3 rounded-md text-sm font-bold flex items-center justify-center transition-colors shadow-sm"
          >
            <FiEdit2 className="mr-2" size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      {deletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl relative animate-fadeIn">
            
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800 uppercase tracking-wide">
              Hapus Akun?
            </h3>
            
            <p className="text-gray-600 text-sm text-center mb-8 leading-relaxed">
              Yakin ingin menghapus akun ini?<br/>
              Tindakan ini tidak dapat dibatalkan.
            </p>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeletePopup(false)}
                className="px-6 py-2 rounded shadow-sm bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium transition-colors uppercase tracking-wider"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 rounded shadow-sm bg-[#0058D2] text-white hover:bg-[#0046a8] text-sm font-medium transition-colors uppercase tracking-wider"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}