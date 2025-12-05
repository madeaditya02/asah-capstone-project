import React from "react";

import dayjs from "dayjs";
import "dayjs/locale/id";
import StatusLabel from "./StatusLabel";
import { formatDurasi } from "../utils";
import { HiMenuAlt2, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";

dayjs.locale("id");

function TabelDaftarCatatan({ dataCatatan, isLite }) {
    const navigate = useNavigate();
    const { nasabahId } = useParams();
    
    return (
        <div>
            <div className="flex gap-8 mb-4 text-sm text-gray-400">
                <div className="w-full">
                    <p>Tanggal</p>
                </div>
                <div className="w-full">
                    <p>Status</p>
                </div>
                {
                    isLite 
                    ? null
                    : <>
                        <div className={"w-full"}>
                            <p>Durasi</p>
                        </div>
                        <div className={"w-100"}>
                            <p>Aksi</p>
                        </div>
                    </>
                }
                <div className="w-140">
                    <p>Detail</p>
                </div>
            </div>
            {
                dataCatatan.map((catatan, index) => {
                    return (
                        <div key={catatan.id_catatan}>
                            <div className="flex gap-6 items-center">
                                <div className="w-full">
                                    <p>{dayjs(catatan.waktu_dihubungi).format("dddd, DD MMMM YYYY")}</p>
                                </div>
                                <div className="w-full">
                                    <StatusLabel namaStatus={catatan.nama_status}/>
                                </div>
                                {
                                    isLite
                                    ? null
                                    : <>
                                        <div className="w-full">
                                            <p>{catatan.durasi !== null ? formatDurasi(catatan.durasi) : "0 detik"}</p>
                                        </div>
                                        <div className="w-100 flex gap-2">
                                            <div className="border-2 rounded-lg p-2 border-error text-error bg-white-to-error-hover">
                                                <HiOutlineTrash/>
                                            </div>
                                            <div className="border-2 rounded-lg p-2 border-primary-500 text-primary-500 bg-white-to-primary-500-hover" 
                                                onClick={() => navigate(`/nasabah/${nasabahId}/catatan/${catatan.id_catatan}/edit`)}
                                            >
                                                <HiOutlinePencil/>
                                            </div>
                                        </div>
                                    </>
                                }
                                <Link to={catatan.id_catatan} className="w-140 flex items-center text-primary-500 text-primary-500-to-primary-700-hover gap-2">
                                    <HiMenuAlt2/>
                                    <p>Lihat Catatan</p>
                                </Link>
                            </div>
                            { index !== dataCatatan.length - 1 ? <hr className="my-3 opacity-20"></hr> : null}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default TabelDaftarCatatan