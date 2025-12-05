import React, { useState } from "react";
import api from "../utils/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage("Tautan reset kata sandi telah dikirim.");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengirim permintaan.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md text-center">

        {/* TITLE */}
        <h1 className="text-[32px] font-semibold text-[#0A3A80] mb-3">
          Lupa Password?
        </h1>

        <p className="text-gray-600 text-[15px] mb-10 leading-relaxed">
          Masukkan Email untuk Mengatur Ulang<br />Password Anda
        </p>

        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* EMAIL */}
        <div className="text-left mb-8">
          <label className="text-gray-700 text-[14px]">Email</label>
          <input
            type="email"
            placeholder="example@domain.com"
            className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 bg-[#F3F7FF] text-[15px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          className="w-full bg-[#0058D2] text-white py-2 rounded-md text-[16px] font-medium"
        >
          Kirim
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 mt-14">
         
        </p>
      </form>
    </div>
  );
}
