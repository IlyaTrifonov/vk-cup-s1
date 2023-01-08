import React from 'react';
import './Sidebar.sass';
import {folderIcons} from "../../assets/icons";
import {ThemeContext, themes} from "../../context/ThemeContext";
import SidebarItem from "./SidebarItem";
import Button from "../UI/buttons/Button";
import {buttonTypes} from "../UI/buttons";
import {folders} from "./folders";
import SidebarFolder from "./sidebarFolder/SidebarFolder";

const LargeSidebar = ({/*selectedFolder, setSelectedFolder*/ ...props}) => {
    // const router = useNavigate()
    // console.log(selectedFolder)

    /*
        const getFolderRoute = (folderName) => {

        }
    */

    return (
        <ThemeContext.Consumer>
            {({theme, setTheme}) => (
                <div className="large-sidebar">
                    <div className="sidebar-header">
                        <Button type={buttonTypes.default}>Написать письмо</Button>
                    </div>
                    <div className="sidebar-scrollable-container">
                        <div className="sidebar-folders-container">
                            {/*
                            {folders.map((item, index) =>
                                <SidebarItem selectedFolder={selectedFolder}
                                             folderName={item.name}
                                             onClick={() => {
                                                 setSelectedFolder(item.name)
                                                 router(item.route)
                                             }}
                                             key={item.name}
                                             icon={item.icon}>
                                    {item.name}
                                </SidebarItem >
                            )}
*/}
                            {/*
                            {folders.map((item, index) =>
                                <SidebarFolder icon={item.icon} route={item.route} key={index}>
                                    {item.name}
                                </SidebarFolder>
                            )}
*/}
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
                        <SidebarItem icon={folderIcons.theme_palette}
                                     className='theme_palette'
                                     onClick={() => {
                                         if (theme === themes.light) setTheme(themes.dark)
                                         if (theme === themes.dark) setTheme(themes.light)
                                     }}>
                            {theme === themes.light ? "Тема: светлая" : "Тема: тёмная"}
                        </SidebarItem>
                    </div>
                </div>
            )}
        </ThemeContext.Consumer>
    );
};

export default LargeSidebar;