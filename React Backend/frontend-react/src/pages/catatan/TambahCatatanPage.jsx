import React, { useState } from 'react';
import Container from '../../components/Container';
import ContainerFooter from '../../components/ContainerFooter';
import ButtonLarge from '../../components/ButtonLarge';
import { HiOutlineTrash } from 'react-icons/hi';
import { HiMiniPlay } from "react-icons/hi2";
import SectionCard from '../../components/SectionCard';
import DisplayInput from '../../components/DisplayInput';
import TabelDaftarCatatan from '../../components/TabelDaftarCatatan';
import ButtonSmall from '../../components/ButtonSmall';
import InputDropDown from '../../components/InputDropDown';
import { FaSave } from 'react-icons/fa';


function TambahCatatanPage() {
    const durasi = "00:00:00";
    const lastSave = "6 menit";
    const dataPribadiNasabah = {
        id_nasabah: "ADHAJDGAD",
        nama_nasabah: "Budi Wara",
        pekerjaan: "Wiraswasta",
        pendidikan_terakhir: "SMA",
        status_pernikahan: "Belum Menikah",
        usia: 18,
        pinjaman_kpr: false,
        pinjaman_pribadi: true,
        nomor_telepon: "081123456789"
    }

    const dataPenilaianNasabah = {
        probability: 0.23,
        prioritas: "Prioritas Tinggi",
        faktor_pengaruh: [
            "Status Pernikahan", "Pendiidkan Terakhir", "Pekerjaan"
        ]
    }

    const statusTerakhir = "Belum Dihubungi";

    const riwayatDihubungiNasabah = {
        hari_terakhir_dihubungi: null,
        total_dihubungi_periode_sebelumnya: 0,
        hasil_campaign_Sebelumnya: "Tidak Ada"
    }

    const dataCatatan = [
    {
        id_catatan: "CAT001",
        deskripsi_catatan: "Nasabah dihubungi untuk konfirmasi data pribadi",
        waktu_dihubungi: "2025-12-01 09:15:00",
        durasi: "10:10:01",
        id_user: 1,
        id_status: "ST001",
        nama_status: "Tidak Tertarik"
    },
    {
        id_catatan: "CAT002",
        deskripsi_catatan: "Follow up terkait pengajuan kredit",
        waktu_dihubungi: "2025-12-01 11:30:00",
        durasi: "00:20:00",
        id_user: 2,
        id_status: "ST002",
        nama_status: "Ragu-Ragu"
    },
    {
        id_catatan: "CAT003",
        deskripsi_catatan: "Nasabah belum bisa dihubungi, nomor tidak aktif",
        waktu_dihubungi: "2025-12-02 14:00:00",
        durasi: null,
        id_user: 1,
        id_status: "ST003",
        nama_status: "Tidak Diangkat"
    },
    {
        id_catatan: "CAT004",
        deskripsi_catatan: "Memberikan informasi produk tabungan baru",
        waktu_dihubungi: "2025-12-02 16:45:00",
        durasi: "00:15:00",
        id_user: 3,
        id_status: "ST001",
        nama_status: "Ragu-Ragu"
    },
    {
        id_catatan: "CAT005",
        deskripsi_catatan: "Nasabah meminta waktu untuk mempertimbangkan penawaran",
        waktu_dihubungi: "2025-12-03 10:00:00",
        durasi: "00:12:00",
        id_user: 2,
        id_status: "ST002",
        nama_status: "Sukses"
    }
    ];

    const optionsStatus = [
    {
        name: "Belum Dihubungi",
        value: "status-1-belum-dihubungi"
    },
    {
        name: "Tidak Diangkat",
        value: "status-2-tidak-diangkat"
    },
    {
        name: "Ragu-Ragu",
        value: "status-3-ragu"
    },
    {
        name: "Sukses",
        value: "status-4-sukses"
    },
    {
        name: "Tidak Tertarik",
        value: "status-5-tidak-tertarik"
    },
    {
        name: "Nomor Salah",
        value: "status-6-nomor-salah"
    },
    {
        name: "Sedang Dihubungi",
        value: "status-7-sedang-dihubungi"
    }
    ];

    const [status, setStatus] = useState(null);

    return (
        <>
            <Container isDashboard={false} pageName={"Tambah Catatan"}>
                <div className='pb-32 grid grid-cols-2 gap-8 w-full'>
                    <div className='flex flex-col gap-6'>
                        <SectionCard sectionTitle={"Informasi Pribadi"}>
                            <DisplayInput label={"Nama"} value={dataPribadiNasabah.nama_nasabah}/>
                            <DisplayInput label={"Usia"} value={dataPribadiNasabah.usia + " Tahun"}/>
                            <DisplayInput label={"Kontak"} value={dataPribadiNasabah.nomor_telepon} showCopyBtn={true}/>
                            <div className='grid grid-cols-3 gap-1'>
                                <DisplayInput label={"Pekerjaan"} value={dataPribadiNasabah.pekerjaan}/>
                                <DisplayInput label={"Pendidikan Terakhir"} value={dataPribadiNasabah.pendidikan_terakhir}/>
                                <DisplayInput label={"Status Pernikahan"} value={dataPribadiNasabah.status_pernikahan}/>
                            </div>
                            <div className='grid grid-cols-2 gap-1'>
                                <DisplayInput label={"Kepemilikan Pinjaman KPR"} value={(dataPribadiNasabah.pinjaman_kpr ? "" : "Tidak ") + "Memiliki Pinjaman KPR"}/>
                                <DisplayInput label={"Kepemilikan Pinjaman Pribadi"} value={(dataPribadiNasabah.pinjaman_pribadi ? "" : "Tidak ") + "Memiliki Pinjaman Pribadi"}/>
                            </div>
                        </SectionCard>
                        <SectionCard sectionTitle={"Ringkasan Penilaian Nasabah"}>
                            <div className='grid grid-cols-3'>
                                <DisplayInput label={"Skor"} value={dataPenilaianNasabah.probability}/>
                                <DisplayInput label={"Prioritas"} value={dataPenilaianNasabah.prioritas}/>
                                <DisplayInput label={"Status"} value={statusTerakhir}/>
                            </div>
                            <DisplayInput label={"Top 3 Faktor Pengaruh Penilaian Nasabah"} value={
                                <div className='flex gap-2'>
                                    {
                                        dataPenilaianNasabah.faktor_pengaruh.map(faktor => {
                                            return <div className='mt-2 py-1.5 px-3 rounded-4xl border-2 text-center w-fit text-sm text-primary-500 border-primary-500 bg-primary-500-transparant'>{faktor}</div>
                                        })
                                    }
                                </div>
                            }/>
                        </SectionCard>
                        <SectionCard sectionTitle={"Riwayat Campaign"}>
                            <DisplayInput label={"Terakhir Dihubungi Campaign Saat Ini"} value={riwayatDihubungiNasabah.hari_terakhir_dihubungi === null ? "- (Belum Dihubungi)" : riwayatDihubungiNasabah.hari_terakhir_dihubungi}/>
                            <DisplayInput label={"Total Dihubungi Campaign Sebelumnya"} value={riwayatDihubungiNasabah.total_dihubungi_periode_sebelumnya}/>
                            <DisplayInput label={"Kesuksesan Campaign Sebelumnya"} value={riwayatDihubungiNasabah.hasil_campaign_Sebelumnya === null ? "- (Belum Dihubungi)" : riwayatDihubungiNasabah.hasil_campaign_Sebelumnya}/>
                        </SectionCard>
                        <SectionCard sectionTitle={"Daftar Catatan Sales"} showFilterMenu={true}>
                            {
                                dataCatatan !== null
                                ? <TabelDaftarCatatan dataCatatan={dataCatatan} isLite={true}/>
                                : <p className='font-semibold text-gray-400'>Belum Ada Catatan.</p>
                            }
                        </SectionCard>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <SectionCard>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-2'>
                                    <p className='font-semibold'>Durasi:</p>
                                    <p>{durasi}</p>
                                </div>
                                <ButtonSmall label={
                                    <div className='flex items-center gap-2 px-3'>
                                        <HiMiniPlay/>
                                        <p>Mulai Timer</p>
                                    </div>
                                }/>
                            </div>
                        </SectionCard>
                        <SectionCard>
                            <div className='flex gap-2 items-center'>
                                <p className='font-semibold'>Status:</p>
                                <InputDropDown value={status} onChange={(e) => setStatus(e.target.value)} labelFor={"status"} placeholder={"Pilih Status"} options={optionsStatus}/>
                            </div>
                        </SectionCard>
                        <SectionCard sectionTitle={"Catatan Anda"} rightMsg={"Tersimpan " + lastSave + " lalu"}>
                            <textarea placeholder='Ketik catatan anda...' className='flex-1 p-4 border rounded-md field-sizing-content'></textarea>
                            <ButtonLarge isSecondary={true} label={
                                <div className='flex gap-2 justify-center items-center'>
                                    <span><FaSave/></span>
                                    <p>Simpan Sementara</p>
                                </div>
                            }/>
                        </SectionCard>
                    </div>
                </div>
            </Container>
            <ContainerFooter>
                <ButtonLarge isWarning={true} isSecondary={true} label={
                    <div className='flex gap-2 justify-center items-center'>
                        <span><HiOutlineTrash/></span>
                        <p>Buang Catatan</p>
                    </div>
                }/>
                <ButtonLarge label={
                    <div className='flex gap-2 justify-center items-center'>
                        <span><FaSave/></span>
                        <p>Simpan Catatan</p>
                    </div>
                }/>
            </ContainerFooter>
        </>
    );
}

export default TambahCatatanPage;