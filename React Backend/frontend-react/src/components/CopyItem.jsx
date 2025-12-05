import React from "react";
import { TbCopy } from "react-icons/tb";

function CopyItem({ value }) {
    return (
        <span className="cursor-pointer text-grey-click-to-primary-500" onClick={() => navigator.clipboard.writeText(value)}>
            <TbCopy/>
        </span>
    );
}

export default CopyItem;