import React from 'react';
import {flagsIcons, folderIcons} from "../../assets/icons";
import Icons from "../../assets/icons/Icons";
import './SettingsMenuSidebar.sass';

const SettingsMenuSidebar = () => {
    return (
        <div className="settings-menu-sidebar">
            <div className="settings-menu-sidebar__header"></div>
            <div className="settings-menu-sidebar__content">
                <div className="settings-menu-sidebar__button">
                    <div className="settings-menu-sidebar__button__container">
                        <div className="settings-menu-sidebar__button__text">
                            Внешний вид
                        </div>
                    </div>
                </div>
                <div className="settings-menu-sidebar__button">
                    <div className="settings-menu-sidebar__button__container">
                        <div className="settings-menu-sidebar__button__text">
                            Язык: русский
                        </div>
                        <Icons
                            name={flagsIcons.ru_flag}
                            width='15'
                            height='12'
                            className='settings-menu-sidebar__button__flag-icon'
                        />
                    </div>
                </div>
            </div>
            <div className="settings-menu-sidebar__footer"></div>
        </div>
    );
};

export default SettingsMenuSidebar;