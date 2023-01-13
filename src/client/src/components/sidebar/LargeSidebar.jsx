import React, {useContext} from 'react';
import './Sidebar.sass';
import {folderIcons} from "../../assets/icons";
import {ThemeContext, themes} from "../../context/ThemeContext";
import SidebarItem from "./SidebarItem";
import Button from "../UI/buttons/Button";
import {buttonTypes} from "../UI/buttons";
import {folders} from "../../api/FoldersService";
import SidebarFolder from "./sidebarFolder/SidebarFolder";


const LargeSidebar = ({setSettingsIsOpen}) => {

    // const {theme, setTheme} = useContext(ThemeContext)

    return (
        <div className="large-sidebar">
            <div className="sidebar-header">
                <Button type={buttonTypes.default}>Написать письмо</Button>
            </div>
            <div className="sidebar-scrollable-container">
                <div className="sidebar-folders-container">
                    {Object.entries(folders).map(([key, value]) =>
                        <SidebarFolder icon={value.icon} route={value.path} key={key}>
                            {value.name}
                        </SidebarFolder>
                    )}
                </div>
                <hr className="sidebar-divider"/>
                <Button icon={folderIcons.new_folder} type={buttonTypes.flat} iconSize='16'>Новая папка</Button>
            </div>
            <div className="sidebar-bottom-menu">
{/*
                <SidebarItem icon={folderIcons.theme_palette}
                             className='theme_palette'
                             onClick={() => {
                                 if (theme === themes.light) setTheme(themes.dark)
                                 if (theme === themes.dark) setTheme(themes.light)
                             }}>
                    {theme === themes.light ? "Тема: светлая" : "Тема: тёмная"}
                </SidebarItem>
*/}
                <SidebarItem icon={folderIcons.gear}
                             onClick={(e) => {
                                 e.stopPropagation()
                                 setSettingsIsOpen(true)
                             }}>
                    Настройки
                </SidebarItem>
            </div>
        </div>
    );
};

export default LargeSidebar;