import React, {useEffect} from "react";
import AttachDropdownItem from "./AttachDropdownItem";
import './AttachDropdown.sass';

const AttachDropdown = ({
                            attachments,
                            coords,
                            updateDropdownCoords, closeDropdown
                        }) => {
    const parentContainer = document.getElementById('letter-list-id')
    useEffect(() => {
        window.addEventListener("resize", updateDropdownCoords);
        parentContainer.addEventListener("scroll", closeDropdown)
        return () => {
            window.removeEventListener("resize", updateDropdownCoords)
            parentContainer.removeEventListener("scroll", closeDropdown)
        };
    }, []);

    return (
        <div
            style={{...coords}}
            className="attach-dropdown-overlay"
        >
            {attachments && attachments.map((attach, index) =>
                <AttachDropdownItem attach={attach} key={index}/>
            )}
        </div>
    );
};

export default AttachDropdown;