import React from 'react';
import Icons from "../../assets/icons/Icons";
import './SidebarItem.sass'

const SidebarItem = ({children, icon, className, onClick, selectedFolder, folderName, ...props}) => {
    const active = selectedFolder ? selectedFolder === folderName ? 'active' : '' : ''
    // console.log('Информация из', folderName, 'Активный', selectedFolder)
    // console.log('Активный', className)
    return (
        <button className={`sidebar-item ${active}`} onClick={onClick}>
            <Icons
                name={icon}
                width='20'
                height='20'
                className={className ? className : 's_icon'}
            />
            <span className="sidebar-item__text">{children}</span>
        </button>
    );
};

export default SidebarItem;