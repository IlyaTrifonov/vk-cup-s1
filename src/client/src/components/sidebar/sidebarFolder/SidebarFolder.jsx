import React from 'react';
import Icons from "../../../assets/icons/Icons";
import {NavLink} from "react-router-dom";
import './SidebarFolder.sass'

const SidebarFolder = ({
                           className, // TODO оптимизировать
                           children, icon, route,
                           ...props
                       }) => {
    return (
        <NavLink className={({isActive}) =>
            isActive ? "sidebar-folder active" : "sidebar-folder"}
                 to={route}>
            <Icons
                name={icon}
                width="20"
                height="20"
                className="sidebar-folder__icon"
            />
            <span className="sidebar-folder__text">{children}</span>
        </NavLink>
    );
}

export default SidebarFolder;