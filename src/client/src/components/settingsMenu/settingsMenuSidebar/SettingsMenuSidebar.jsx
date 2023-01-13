import React from 'react';
import {flagsIcons} from "../../../assets/icons";
import Icons from "../../../assets/icons/Icons";
import './SettingsMenuSidebar.sass';
import {menuPages} from "../MenuPages";

const SettingsMenuSidebar = ({currentPage, setCurrentPage}) => {

    const activeAppearance = currentPage === menuPages.appearance ? 'active' : '';
    const activeLanguage = currentPage === menuPages.language ? 'active' : '';

    return (
        <div className="settings-menu-sidebar">
            <div className="settings-menu-sidebar__header"></div>
            <div className="settings-menu-sidebar__content">
                <div className={`settings-menu-sidebar__button ${activeAppearance}`}
                     onClick={() => {
                         setCurrentPage(menuPages.appearance)
                     }}>
                    <div className="settings-menu-sidebar__button__container">
                        <div className="settings-menu-sidebar__button__text">
                            Внешний вид
                        </div>
                    </div>
                </div>
                <div className={`settings-menu-sidebar__button ${activeLanguage}`}
                     onClick={() => {
                         setCurrentPage(menuPages.language)
                     }}>
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