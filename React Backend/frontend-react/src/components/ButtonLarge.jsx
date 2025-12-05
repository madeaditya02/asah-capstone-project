import React from "react";

function ButtonLarge({ label, isSecondary, isSubmit, isWarning, onClick }) {
    return (
        <button onClick={onClick} type={isSubmit ? "submit" : "button"} 
            className={"cursor-pointer text-sm font-medium rounded-md w-full p-3 " + 
                (isSecondary 
                    ? (isWarning 
                        ? "text-error border border-error bg-white-to-error-hover"
                        : "text-primary-500  border border-primary-500 bg-white-to-primary-500-hover") 
                    : (isWarning 
                        ? "bg-error bg-error-hover text-white"
                        : "bg-primary-500 bg-primary-500-to-primary-700-hover text-white"
                    )
                )
            }
        >
            {label}
        </button>
    );
}

export default ButtonLarge;