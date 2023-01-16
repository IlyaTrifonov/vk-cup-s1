import React, {useContext} from 'react';
import Icons from "../../../assets/icons/Icons";
import {NavLink} from "react-router-dom";
import './SidebarFolder.sass'
import {LanguageContext} from "../../../context/LanguageContext";


/**
 * Компонент папки сайдбара. Используется для отображения папок ящика. Отображает текущую папку.
 * @param folder
 * @returns {JSX.Element}
 * @constructor
 */
const SidebarFolder = ({folder}) => {

    const {language} = useContext(LanguageContext)

    return (
        <NavLink className={({isActive}) =>
            isActive ? "sidebar-folder active" : "sidebar-folder"}
                 to={folder.path}>
            <Icons
                name={folder.icon}
                width="20"
                height="20"
                className="sidebar-folder__icon"
            />
            <span className="sidebar-folder__text">{language.letterList.sidebar[folder.name]}</span>
        </NavLink>
    );
}

export default SidebarFolder;