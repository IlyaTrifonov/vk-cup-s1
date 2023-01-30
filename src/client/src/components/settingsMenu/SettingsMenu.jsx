import React, {useContext, useEffect, useState} from 'react';
import './SettingsMenu.sass';
import {SettingsContext} from '../../context/SettingsContext';
import SettingsMenuSidebar from './settingsMenuSidebar/SettingsMenuSidebar';
import SettingsMenuMain from './settingsMenuMain/SettingsMenuMain';
import {menuPages} from './MenuPages';
import ClosePopupButton from '../UI/PopupControls/ClosePopupButton';

/**
 * Компонент меню настроек почты. Является контейнером для всех компонентов настроек.
 * @returns {JSX.Element}
 * @constructor
 */
const SettingsMenu = () => {

  const {settingsIsOpen, setSettingsIsOpen} = useContext(SettingsContext);

  const [currentPage, setCurrentPage] = useState(menuPages.appearance);

  const closeSettingsMenu = () => {
    document.removeEventListener('click', closeSettingsMenu);
    setSettingsIsOpen(false);
  };

  useEffect(() => {
    if (settingsIsOpen) {
      document.addEventListener('click', closeSettingsMenu);
    }
  }, [settingsIsOpen]);

  return (
    <div className={`settings-menu ${settingsIsOpen && 'open-settings-menu'}`}
         onClick={(e) => e.stopPropagation()}>
      <div className="settings-menu-container">
        <ClosePopupButton closePopup={() => setSettingsIsOpen(false)}/>
        <SettingsMenuSidebar currentPage={currentPage}
                             setCurrentPage={setCurrentPage}/>
        <SettingsMenuMain currentPage={currentPage}/>
      </div>
    </div>
  );
};

export default SettingsMenu;
