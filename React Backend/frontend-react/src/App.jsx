import React from "react";
import { Routes, Route } from 'react-router-dom';
import DaftarCatatanPage from "./pages/catatan/DaftarCatatanPage";
import TambahCatatanPage from "./pages/catatan/TambahCatatanPage";
import DetailCatatanPage from "./pages/catatan/DetailCatatanPage";
import EditCatatanPage from "./pages/catatan/EditCatatanPage";

export default function App() {
  return (
    <Routes>
      <Route path='/nasabah/:nasabahId/catatan' element={<DaftarCatatanPage/>}/>
      <Route path='/nasabah/:nasabahId/catatan/tambah' element={<TambahCatatanPage/>}/>
      <Route path='/nasabah/:nasabahId/catatan/:catatanId' element={<DetailCatatanPage/>}/>
      <Route path='/nasabah/:nasabahId/catatan/:catatanId/edit' element={<EditCatatanPage/>}/>
    </Routes>
  );
}
