import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Auth pages
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Sales pages
import AddSalesPage from "./pages/AddSalesPage";
import ProfileSalesPage from "./pages/ProfileSalesPage";
import EditProfileSalesPage from "./pages/EditProfileSalesPage";

// Admin pages
import ProfileAdminPage from "./pages/ProfileAdminPage";
import EditProfileAdminPage from "./pages/EditProfileAdminPage";
import ManageSalesPage from "./pages/ManageSalesPage";

import DaftarCatatanPage from "./pages/catatan/DaftarCatatanPage";
import TambahCatatanPage from "./pages/catatan/TambahCatatanPage";
import DetailCatatanPage from "./pages/catatan/DetailCatatanPage";
import EditCatatanPage from "./pages/catatan/EditCatatanPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* AUTH */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* SALES */}
          <Route path="/sales/add" element={<AddSalesPage />} />
          
          {/* Profil Sales*/}
          <Route path="/sales/profile" element={<ProfileSalesPage />} />
          <Route path="/sales/profile/edit" element={<EditProfileSalesPage />} />
          <Route path="/sales/:id/edit" element={<EditProfileSalesPage />} />


          {/* ADMIN */}
          <Route path="/admin/profile" element={<ProfileAdminPage />} />
          <Route path="/admin/profile/edit" element={<EditProfileAdminPage />} />
          <Route path="/admin/manage-sales" element={<ManageSalesPage />} />

          {/* Default redirect ke login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Catch all  */}
          <Route path="*" element={<Navigate to="/login" replace />} />

          {/* ROUTE CATATAN */}
          <Route path='/nasabah/:nasabahId/catatan' element={<DaftarCatatanPage/>}/>
          <Route path='/nasabah/:nasabahId/catatan/tambah' element={<TambahCatatanPage/>}/>
          <Route path='/nasabah/:nasabahId/catatan/:catatanId' element={<DetailCatatanPage/>}/>
          <Route path='/nasabah/:nasabahId/catatan/:catatanId/edit' element={<EditCatatanPage/>}/>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}