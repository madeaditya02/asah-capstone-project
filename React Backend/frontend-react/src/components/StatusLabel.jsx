import React from "react";

function StatusLabel({ namaStatus }) {
    return (
        <div 
            className={
                "py-1.5 rounded-4xl border-2 text-center w-40 text-sm "
                + (namaStatus==="Belum Dihubungi" ? "text-primary-700 border-primary-700 bg-primary-700-transparant"
                    : (namaStatus==="Tidak Diangkat" ? "text-primary-500 border-primary-500 bg-primary-500-transparant"
                        : (namaStatus==="Ragu-Ragu" ? "text-warning border-warning bg-warning-transparant"
                            : (namaStatus==="Sukses" ? "text-success border-success bg-success-transparant"
                                : (namaStatus==="Tidak Tertarik" ? "text-error bg-error-transparant"
                                    : "text-black-status border-black-status bg-black-status-transparant"
                                )
                            )
                        )
                    )
                )
            }
        >
            <p>{namaStatus}</p>
        </div>
    );
}

export default StatusLabel;