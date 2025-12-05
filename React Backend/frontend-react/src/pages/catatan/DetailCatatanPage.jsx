import React from 'react';
import Container from '../../components/Container';
import SectionCard from '../../components/SectionCard';
import ContainerFooter from '../../components/ContainerFooter';
import ButtonLarge from '../../components/ButtonLarge';
import { useNavigate, useParams } from 'react-router-dom';
import DisplayInput from '../../components/DisplayInput';
import StatusLabel from '../../components/StatusLabel';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import dayjs from 'dayjs';

function DetailCatatanPage() {
    const navigate = useNavigate();
    const { nasabahId, catatanId } = useParams();
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
        id_status: "ST001",
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

    dayjs.locale('id');

    return (
        <>
            <Container isDashboard={false} pageName={"Detail Catatan"}>
                <div className='pb-32 gap-8 flex flex-col'>
                    <SectionCard sectionTitle={"Informasi Pribadi"}>
                        <div className='grid grid-cols-3 gap-8'>
                            <DisplayInput label={"Nama"} value={dataPribadiNasabah.nama_nasabah}/>
                            <DisplayInput label={"Usia"} value={dataPribadiNasabah.usia + " Tahun"}/>
                            <DisplayInput label={"Kontak"} value={dataPribadiNasabah.nomor_telepon} showCopyBtn={true}/>
                        </div>
                        <div className='grid grid-cols-3 gap-8'>
                            <DisplayInput label={"Tanggal Dihubungi"} value={dayjs(dataCatatan.waktu_dihubungi).format("dddd, DD MMMM YYYY")}/>
                            <DisplayInput label={"Durasi"} value={dataCatatan.durasi}/>
                            <DisplayInput label={"Status"} value={<StatusLabel namaStatus={dataCatatan.nama_status}/>}/>
                        </div>
                    </SectionCard>
                    <SectionCard sectionTitle={"Catatan Anda"} rightMsg={"Diperbarui pada: " + dayjs(dataCatatan.updated_at).format("dddd, DD MMMM YYYY (hh:mm)") + " WITA"} btmMsg={"Dibuat oleh: " + dataCatatan.user?.nama}>
                        <p className='flex-1 p-4 border rounded-md field-sizing-content'>{dataCatatan.deskripsi_catatan}</p>
                    </SectionCard>
                </div>
            </Container>
            <ContainerFooter>
                <ButtonLarge isWarning={true} isSecondary={true} label={
                    <div className='flex gap-2 justify-center items-center'>
                        <span><HiOutlineTrash/></span>
                        <p>Buang Catatan</p>
                    </div>
                }/>
                <ButtonLarge onClick={() => navigate(`/nasabah/${nasabahId}/catatan/${catatanId}/edit`)} label={
                    <div className='flex gap-2 justify-center items-center'>
                        <span><HiOutlinePencil/></span>
                        <p>Edit Catatan</p>
                    </div>
                }/>
            </ContainerFooter>
        </>
    );
}

export default DetailCatatanPage;