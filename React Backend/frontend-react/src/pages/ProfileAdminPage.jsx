import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiLock } from "react-icons/fi";
import TopBarUser from "../components/TopBarUser";

export default function ProfileAdminPage() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = useMemo(
    () => (storedUser ? JSON.parse(storedUser) : {}),
    [storedUser]
  );

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col font-sans">

      <TopBarUser title="Profile" />
      <main className="flex-1 w-full px-8 py-6">
        
        <div className="max-w-5xl mx-auto">
          
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
        
        <div className="max-w-5xl mx-auto flex gap-4">
          
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="w-1/2 border border-[#0058D2] text-[#0058D2] py-3 rounded-md text-sm font-bold flex items-center justify-center hover:bg-blue-50 transition-colors"
          >
            <FiLock className="mr-2" size={18} />
            Ubah Password
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/profile/edit")}
            className="w-1/2 bg-[#0058D2] hover:bg-[#0046a8] text-white py-3 rounded-md text-sm font-bold flex items-center justify-center transition-colors shadow-sm"
          >
            <FiEdit2 className="mr-2" size={18} />
            Edit Profile
          </button>

        </div>
      </div>

    </div>
  );
}