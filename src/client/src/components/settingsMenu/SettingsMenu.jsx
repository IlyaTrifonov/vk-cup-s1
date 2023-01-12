// import React from 'react';
import './SettingsMenu.sass';
// import {SettingsContext} from "./context/SettingsContext";
import React from "react";
import {SettingsContext} from "../../context/SettingsContext";
import Icons from "../../assets/icons/Icons";
import {folderIcons} from "../../assets/icons";
import SettingsMenuSidebar from "./SettingsMenuSidebar";

const SettingsMenu = () => {
    return (
        <SettingsContext.Consumer>
            {({settingsIsOpen, setSettingsIsOpen}) => (
                <div className={`settings-menu ${settingsIsOpen && "open-settings-menu"}`}>
                    <div className="settings-menu-container">
                        <div className="settings-menu__controls">
                            <div className="settings-menu__controls__control"
                                 onClick={() => {
                                     console.log('Выход нажат')
                                     setSettingsIsOpen(false)
                                 }}>
                                <Icons
                                    name={folderIcons.cross}
                                    width='16'
                                    height='16'
                                    className='s_icon'
                                />
                            </div>
                        </div>
                        <SettingsMenuSidebar/>


                    </div>
                </div>
            )}
        </SettingsContext.Consumer>
    );
};

export default SettingsMenu;