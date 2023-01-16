import React, {useContext} from 'react';
import './Sidebar.sass';
import {folderIcons} from "../../assets/icons";
import SidebarItem from "./SidebarItem";
import Button, {buttonTypes} from "../UI/buttons/Button";
import {folders} from "../../api/FoldersService";
import SidebarFolder from "./sidebarFolder/SidebarFolder";
import {LanguageContext} from "../../context/LanguageContext";


/**
 * Компонент сайдбара почты. Используется для отображения папок в ящике, кнопки написания письма и кнопки настроек.
 * Адаптивен к ширине экрана.
 * @param setSettingsIsOpen
 * @returns {JSX.Element}
 * @constructor
 */
const Sidebar = ({setSettingsIsOpen}) => {

    const {language} = useContext(LanguageContext)

    return (
        <div className="large-sidebar">
            <div className="sidebar-header">
                <Button type={buttonTypes.default}
                        icon={folderIcons.pencil}
                        className="sidebar-write-icon" iconSize="16">
                    {language.letterList.sidebar.writeLetterButtonName}
                </Button>
            </div>
            <div className="sidebar-scrollable-container">
                <Button type={buttonTypes.burger}
                        icon={folderIcons.burger_menu}
                        className="sidebar-burger-icon"
                        iconSize="20"/>
                <div className="sidebar-folders-container">
                    {Object.entries(folders).map(([key, value]) =>
                        <SidebarFolder folder={value} key={key}/>
                    )}
                </div>
                <hr className="sidebar-divider"/>
                <Button icon={folderIcons.new_folder} type={buttonTypes.flat} iconSize='16'>
                    {language.letterList.sidebar.newFolderButtonName}
                </Button>
            </div>
            <div className="sidebar-bottom-menu">
                <SidebarItem icon={folderIcons.gear}
                             onClick={(e) => {
                                 e.stopPropagation()
                                 setSettingsIsOpen(true)
                             }}>
                    {language.letterList.sidebar.settingsButtonName}
                </SidebarItem>
            </div>
        </div>
    );
};

export default Sidebar;