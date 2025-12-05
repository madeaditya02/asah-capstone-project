import React from "react";

function ContainerFooter( { children }) {
    return (
        <footer className="fixed bottom-0 p-8 border border-gray-200 bg-white w-full flex gap-8">
            {children}
        </footer>
    );
}

export default ContainerFooter