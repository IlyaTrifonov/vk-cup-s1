import React from 'react';
import './SettingsMenuMain.sass';
import {menuPages} from "../MenuPages";
import ThemeMenu from "../settingsMenuPages/themePage/ThemeMenu";
import LanguageMenu from "../settingsMenuPages/languagePage/LanguageMenu";

const SettingsMenuMain = ({currentPage}) => {
    switch (currentPage) {
        case menuPages.appearance:
            return (
                <div className="settings-menu-main">
                    <ThemeMenu/>
                </div>
            )
        case menuPages.language:
            return (
                <div className="settings-menu-main">
                    <LanguageMenu/>
                </div>
            )
    }
    return (
        <div className="settings-menu-main">
            Нет такого меню
        </div>
    );
};

export default SettingsMenuMain;