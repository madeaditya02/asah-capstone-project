import React from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiLogOut } from "react-icons/fi";

export default function TopBarUser({ title, onBack }) {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};

  const initials = user.nama
    ? user.nama
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "NA";

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="border-b border-gray-200 px-10 py-4 flex items-center justify-between bg-white">
     
      <button
        type="button"
        onClick={handleBack}
        className="flex items-center text-[#0A3A80] text-[22px] font-semibold"
      >
        <FiChevronLeft className="mr-3" size={22} />
        {title}
      </button>

      {/* User badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm px-4 py-2">
          <div className="w-9 h-9 rounded-full bg-[#0058D2] flex items-center justify-center text-white text-sm font-semibold">
            {initials}
          </div>
          <div className="leading-tight text-left">
            <p className="text-[14px] font-semibold text-gray-900">
              {user.nama || "User"}
            </p>
            <p className="text-[12px] text-gray-500">
              {user.email || "user@example.com"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-2 text-[#0058D2] hover:text-[#003f9b]"
            title="Logout"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
