import React, {useEffect} from "react";

const AttachDropdown = ({children, coords, updateTooltipCoords, closeTooltip}) => {

    const parent = document.getElementById('letter-list-id')
    useEffect(() => {
        window.addEventListener("resize", updateTooltipCoords);
        parent.addEventListener("scroll", closeTooltip)
        return () => {
            window.removeEventListener("resize", updateTooltipCoords)
            parent.removeEventListener("scroll", closeTooltip)
        };
    }, []);

    return (
        <div
            style={{...coords}}
            className={`my-tooltip `}
        >
            {children}
        </div>
    );
};

export default AttachDropdown;