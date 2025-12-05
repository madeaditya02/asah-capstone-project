import React from "react";
import { HiOutlineAdjustments } from "react-icons/hi";
import FilterCatatan from "./FilterCatatan";

function SectionCard({ sectionTitle, showFilterMenu, rightMsg, btmMsg, children }) {
    return (
        <section className={"border border-gray-600 p-8 rounded-xl flex flex-col bg-white" + (sectionTitle ? " gap-5" : "")}>
            <div className="font-semibold text-primary-500 text-xl flex items-center gap-3">
                <div>
                    <h2 className="text-nowrap">{sectionTitle}</h2>
                    {btmMsg ? <p className="text-sm text-gray-400 font-medium mt-2 text-nowrap">{ btmMsg }</p> : null}
                </div>
                {
                    showFilterMenu ?
                    <FilterCatatan/>
                    :
                    null
                }
                {
                    rightMsg 
                    ? <p className="text-sm text-gray-400 font-medium w-full text-right">{rightMsg}</p>
                    : null
                }
            </div>
            {children}
        </section>
    );
}

export default SectionCard;