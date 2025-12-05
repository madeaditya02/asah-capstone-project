import React, { useRef, useState } from 'react';
import Container from '../../components/Container';
import SectionCard from '../../components/SectionCard';
import ContainerFooter from '../../components/ContainerFooter';
import ButtonLarge from '../../components/ButtonLarge';
import DisplayInput from '../../components/DisplayInput';
import StatusLabel from '../../components/StatusLabel';
import { FaSave } from "react-icons/fa";
import InputDropDown from '../../components/InputDropDown';
import dayjs from 'dayjs';

function EditCatatanPage() {
    // const navigate = useNavigate();
    // const { nasabahId, catatanId } = useParams();
    const dataCatatan = 
    {
        id_catatan: "CAT001",
        deskripsi_catatan: "Nasabah dihubungi untuk konfirmasi data pribadi",
        waktu_dihubungi: "2025-12-01 09:15:00",
        durasi: "10:10:01",
        id_user: 1,
        user: {
            nama: "Budi Wati"
        },
        id_status: "status-5-tidak-tertarik",
        nama_status: "Tidak Tertarik",
        updated_at: "2025-12-01 09:15:00",
    };

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

    const deskripsiRef = useRef(dataCatatan.deskripsi_catatan);
    const [jam, menit, detik] = dataCatatan.durasi.split(":").map(Number);
    const jamRef = useRef(jam);
    const menitRef = useRef(menit);
    const detikRef = useRef(detik);

    const [status, setStatus] = useState(dataCatatan.id_status);

    dayjs.locale("id");

    return (
        <>
            <Container isDashboard={false} pageName={"Edit Catatan"}>
                <div className='pb-32 gap-8 flex flex-col'>
                    <SectionCard sectionTitle={"Informasi Pribadi"}>
                        <div className='grid grid-cols-[22%_1fr_1fr] gap-1'>
                            <DisplayInput label={"Nama"} value={dataPribadiNasabah.nama_nasabah}/>
                            <DisplayInput label={"Usia"} value={dataPribadiNasabah.usia + " Tahun"}/>
                            <DisplayInput label={"Kontak"} value={dataPribadiNasabah.nomor_telepon} showCopyBtn={true}/>
                        </div>
                        <div className='grid grid-cols-[22%_1fr_1fr] gap-1'>
                            <DisplayInput label={"Tanggal Dihubungi"} value={dayjs(dataCatatan.waktu_dihubungi).format("dddd, DD MMMM YYYY")}/>
                            <DisplayInput label={"Durasi"} value={
                                <div className="flex gap-2 items-center">
                                    <input defaultValue={jam} ref={jamRef} type="number" min="0" placeholder="Jam" className="w-16 p-1 border rounded"/>
                                    <label htmlFor="jam">jam</label>
                                    <input defaultValue={menit} ref={menitRef} type="number" min="0" max="59" placeholder="Menit" className="w-16 p-1 border rounded"/>
                                    <label htmlFor="menit">menit</label>
                                    <input defaultValue={detik} ref={detikRef} type="number" min="0" max="59" placeholder="Detik" className="w-16 p-1 border rounded"/>
                                    <label htmlFor="detik">detik</label>
                                </div>
                            }/>
                            <DisplayInput label={"Status"} value={
                                <InputDropDown labelFor={"status"} placeholder={"Pilih Status"} options={optionsStatus} value={status} onChange={(e) => setStatus(e.target.value)}/>
                            }/>
                        </div>
                    </SectionCard>
                    <SectionCard sectionTitle={"Catatan Anda"}>
                        <textarea defaultValue={dataCatatan.deskripsi_catatan} ref={deskripsiRef} className='flex-1 p-4 border rounded-md field-sizing-content'></textarea>
                    </SectionCard>
                </div>
            </Container>
            <ContainerFooter>
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

export default EditCatatanPage;