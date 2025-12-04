import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../utils/api"; 
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
     
      const res = await api.post("/auth/login", { email, password });

      console.log("Respon Login:", res); 

      const responseData = res.data.data || res.data;

      if (responseData && responseData.accessToken) {
       
        localStorage.setItem("accessToken", responseData.accessToken);
        localStorage.setItem("refreshToken", responseData.refreshToken);
        localStorage.setItem("user", JSON.stringify(responseData.user));

        console.log("Login sukses! Peran user:", responseData.user.peran);

      
        const userRole = responseData.user.peran ? responseData.user.peran.toLowerCase() : "";

        if (userRole === "admin") {
        
          navigate("/admin/manage-sales");
        } else if (userRole === "sales") {
        
          navigate("/sales/add");
        } else {
          
          navigate("/admin/profile");
        }

      } else {
        throw new Error("Token tidak diterima dari server.");
      }

    } catch (err) {
      console.error("Login Gagal:", err);
      setError(
        err.response?.data?.message || 
        "Email atau password salah. Silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">

      <form onSubmit={handleLogin} className="w-full max-w-md text-center px-4">


        <h1 className="text-[32px] font-semibold text-[#0A3A80] mb-3">
          Selamat Datang
        </h1>

        <p className="text-gray-600 text-[15px] mb-10 leading-relaxed">
          Isi data login dengan benar untuk mengakses<br />dashboard Anda.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm text-left">
            {error}
          </div>
        )}

        <div className="text-left mb-6">
          <label className="text-gray-700 text-[14px] font-medium">Email</label>
          <input
            type="email"
            placeholder="example@domain.com"
            className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 bg-[#F3F7FF] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0A3A80]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="text-left mb-2">
          <label className="text-gray-700 text-[14px] font-medium">Password</label>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Minimal 8 karakter"
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#F3F7FF] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0A3A80]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-[#0A3A80]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>
        <div className="text-right mb-8">
          <a href="/forgot-password" className="text-[#0A3A80] text-[13px] hover:underline">
            Lupa Password?
          </a>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-md text-[16px] font-medium text-white transition-colors ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0058D2] hover:bg-[#0046a8]"
          }`}
        >
          {isLoading ? "Memproses..." : "Sign In"}
        </button>
        <p className="text-xs text-gray-500 mt-14">
          © 2025 TIM CAPSTONE - A25-CSD82
        </p>
      </form>
    </div>
  );
}