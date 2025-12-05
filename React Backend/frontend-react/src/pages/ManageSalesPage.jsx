import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { 
  FiSearch, FiCopy, FiEdit3, FiTrash2, FiLogOut 
} from "react-icons/fi";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar"; 

export default function ManageSalesPage() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletePopup, setDeletePopup] = useState(null);
  const [currentUser, setCurrentUser] = useState({ nama: "Admin", email: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStored = JSON.parse(localStorage.getItem("user"));
        if (userStored) setCurrentUser(userStored);

        const res = await api.get("/sales");
        setSales(res.data.data || []);
      } catch (err) {
        toast.error("Gagal memuat data sales");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const filteredSales = sales.filter(
    (s) =>
      s.nama.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    toast.success("Email disalin!", { autoClose: 1000, hideProgressBar: true });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/sales/${deletePopup}`);
      toast.success("Akun sales berhasil dihapus");
      setSales(sales.filter((s) => s.id_user !== deletePopup));
      setDeletePopup(null);
    } catch (err) {
      toast.error("Gagal menghapus akun");
    }
  };

  if (loading) return <div className="p-10 text-center">Memuat data...</div>;

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <Sidebar />
      <div className="flex-1 p-8 bg-white overflow-y-auto h-screen">
        
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-[28px] font-bold text-[#003B73]">
            Manajemen Akun
          </h1>

          <div className="bg-[#F8F9FD] px-4 py-2 rounded-lg border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0058D2] flex items-center justify-center text-white font-bold text-lg">
              {currentUser.nama.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800">{currentUser.nama}</span>
              <span className="text-xs text-gray-500">{currentUser.email}</span>
            </div>
            <button onClick={handleLogout} className="ml-3 text-red-500 hover:bg-red-50 p-1 rounded transition-colors" title="Logout">
               <FiLogOut size={18} />
            </button>
          </div>
        </div>

        <div className="mb-6 border-b border-gray-100 pb-6">
          <h2 className="text-2xl text-gray-900">
            Selamat datang, <span className="font-bold">{currentUser.nama}</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Berikut daftar nasabah yang perlu Anda hubungi
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
          
          <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-[#0058D2] font-bold text-lg">
              Daftar Sales ({filteredSales.length})
            </h3>
            <button
              onClick={() => navigate("/sales/add")}
              className="bg-[#0058D2] hover:bg-[#0046a8] text-white px-5 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm"
            >
              + Tambah Akun Sales
            </button>
          </div>

          <div className="px-6 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari nasabah"
                className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-400 text-gray-700 focus:outline-none focus:border-[#0058D2] focus:ring-1 focus:ring-[#0058D2]"
                onChange={(e) => setSearch(e.target.value)}
              />
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-black text-xl font-bold" />
            </div>
          </div>

          <div className="p-6 pt-2">
            <div className="grid grid-cols-12 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
              <div className="col-span-4 pl-2">Nama</div>
              <div className="col-span-6">Email</div>
              <div className="col-span-2 text-right pr-2">Aksi</div>
            </div>

            <div className="flex flex-col">
              {filteredSales.length > 0 ? (
                filteredSales.map((item) => (
                  <div 
                    key={item.id_user} 
                    className="grid grid-cols-12 py-4 border-b border-gray-200 items-center last:border-b-0" 
                  >
                    <div className="col-span-4 pl-2 text-sm font-medium text-gray-900">
                      {item.nama}
                    </div>

                    <div className="col-span-6 flex items-center gap-2 text-sm text-gray-900">
                      {item.email}
                      <button 
                        onClick={() => handleCopy(item.email)}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                        title="Salin Email"
                      >
                        <FiCopy size={16} />
                      </button>
                    </div>

                    <div className="col-span-2 flex justify-end gap-3 pr-2">
                      <button
                        onClick={() => setDeletePopup(item.id_user)}
                        className="w-8 h-8 flex items-center justify-center border border-red-400 rounded text-red-500 hover:bg-red-50 transition-colors"
                        title="Hapus"
                      >
                        <FiTrash2 size={16} />
                      </button>

                      <button
                        onClick={() => navigate(`/sales/${item.id_user}/edit`)}
                        className="w-8 h-8 flex items-center justify-center border border-[#0058D2] rounded text-[#0058D2] hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <FiEdit3 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500 text-sm border-t border-gray-200">
                  Tidak ada akun ditemukan.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- POPUP DELETE --- */}
      {deletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl relative animate-fadeIn">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800 uppercase tracking-wide">
              Hapus Akun?
            </h3>
            <p className="text-gray-600 text-sm text-center mb-8 leading-relaxed">
              Apakah Anda yakin ingin menghapus data ini?<br/>
            
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeletePopup(null)}
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