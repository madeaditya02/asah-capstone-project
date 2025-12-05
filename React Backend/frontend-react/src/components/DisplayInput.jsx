import React from "react";
import CopyItem from "./CopyItem";

function DisplayInput({ label, value, showCopyBtn }) {
    return (
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <div className="mt-2 flex items-center gap-2">
                {value}
                {
                    showCopyBtn
                    ? <CopyItem value={value}/>
                    : null
                }
            </div>
        </div>
    );
}

export default DisplayInput;