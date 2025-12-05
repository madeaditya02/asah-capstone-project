import React from "react";

function ButtonSmall({ label, isSecondary, isSubmit, onClick }) {
    return (
        <button onClick={onClick} type={isSubmit ? "submit" : "button"} className={"cursor-pointer text-sm font-medium rounded-lg " + (isSecondary ? "text-primary-500 text-primary-500-to-primary-700-hover" : "p-2 bg-primary-500 bg-primary-500-to-primary-700-hover text-white")}>
            {label}
        </button>
    );
}

export default ButtonSmall;