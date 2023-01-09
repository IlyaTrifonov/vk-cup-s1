import React, {useEffect, useMemo, useRef} from "react";
// import classes from './AttachDropdown.module.css';

const AttachDropdown = ({children, coords, updateTooltipCoords, closeTooltip}) => {
    // const elem = useRef()
    // console.log(coords)

    const parent = document.getElementById('letter-list-id')
    useEffect(() => {
        window.addEventListener("resize", updateTooltipCoords);
        parent.addEventListener("scroll", closeTooltip)
        return () => {
            window.removeEventListener("resize", updateTooltipCoords)
            parent.removeEventListener("scroll", closeTooltip)
        };
    }, []);

/*
    const handleMouseClick = (e) => {
        if (e.target !== elem) {
            closeTooltip()
        }
    }
*/


    return (
        <div
            style={{...coords}}
            className={`my-tooltip `}
            // id={`${classes.my_attachM}`}
            // ref={elem}
        >
            {children}
        </div>
    );
};

export default AttachDropdown;