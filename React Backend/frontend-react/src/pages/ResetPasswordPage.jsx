import React, { useState } from "react";
import api from "../utils/api";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Password tidak cocok.");
      return;
    }

    try {
      await api.post("/auth/reset-password", { token, newPassword: password });
      setMessage("Password berhasil diubah.");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengubah password.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md text-center">

        <h1 className="text-[32px] font-semibold text-[#0A3A80] mb-3">
          Reset Password
        </h1>

        <p className="text-gray-600 text-[15px] mb-10 leading-relaxed">
          Masukkan password baru Anda.
        </p>

        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="text-left mb-6">
          <label className="text-gray-700 text-[14px]">Password</label>
          <div className="relative mt-1">
            <input
              type={showPass1 ? "text" : "password"}
              placeholder="Minimal 8 karakter"
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#F3F7FF] text-[15px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPass1(!showPass1)}
            >
              {showPass1 ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>

        <div className="text-left mb-8">
          <label className="text-gray-700 text-[14px]">Konfirmasi Password</label>
          <div className="relative mt-1">
            <input
              type={showPass2 ? "text" : "password"}
              placeholder="Minimal 8 karakter"
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#F3F7FF] text-[15px]"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPass2(!showPass2)}
            >
              {showPass2 ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>

        <button
          className="w-full bg-[#0058D2] text-white py-2 rounded-md text-[16px] font-medium"
        >
          Konfirmasi
        </button>


      </form>
    </div>
  );
}
