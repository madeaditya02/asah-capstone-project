import React from "react";

function InputDropDown({labelName, labelFor, placeholder, options, value, onChange}) {
    return (
        <div className="flex flex-col font-medium text-black text-sm w-full">
            <label htmlFor={labelFor} className="text-gray-400">{labelName}</label>
            <select 
                id={labelFor} 
                name={labelFor} 
                value={value || ""} 
                className="border border-primary-700 text-primary-700 rounded p-2"
                onChange={onChange}
            >
                <option value={""} disabled>{placeholder}</option>
                {
                    options.map((option) => {
                        return <option key={option.value} value={option.value} className="text-black">{option.name}</option>
                    })
                }
            </select>
        </div>
    );
}

export default InputDropDown;