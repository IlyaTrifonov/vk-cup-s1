import React from 'react';
import './SettingsMenuMain.sass';
import {menuPages} from '../MenuPages';
import ThemeMenu from '../settingsMenuPages/themePage/ThemeMenu';
import LanguageMenu from '../settingsMenuPages/languagePage/LanguageMenu';

/**
 * Компонент-обёртка меню определённой настройки почты. Располагается справа от сайдбара настроек.
 * @param currentPage
 * @returns {JSX.Element}
 * @constructor
 */
const SettingsMenuMain = ({currentPage}) => {
  switch (currentPage) {
  case menuPages.appearance:
    return (
      <div className="settings-menu-main">
        <ThemeMenu/>
      </div>
    );
  case menuPages.language:
    return (
      <div className="settings-menu-main">
        <LanguageMenu/>
      </div>
    );
  default:
    return (
      <div className="settings-menu-main">
        Нет такого меню
      </div>
    );
  }
};

export default SettingsMenuMain;
