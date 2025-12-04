import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. REQUEST INTERCEPTOR (Kirim Token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. RESPONSE INTERCEPTOR (Cek Token Basi) --- TAMBAHKAN INI
api.interceptors.response.use(
  (response) => {
    return response; // Kalau sukses, loloskan saja
  },
  (error) => {
    // Kalau errornya 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.log("Token kadaluwarsa, logout otomatis...");
      
      // Hapus data lama
      localStorage.clear();
      
      // Paksa pindah ke halaman login
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

export default api;