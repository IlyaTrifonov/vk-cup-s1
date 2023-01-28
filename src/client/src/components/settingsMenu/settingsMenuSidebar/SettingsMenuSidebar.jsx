import React, {useContext} from 'react';
import {uiIcons} from '../../../assets/icons';
import Icons from '../../../assets/icons/Icons';
import './SettingsMenuSidebar.sass';
import {menuPages} from '../MenuPages';
import {LanguageContext, languages} from '../../../context/LanguageContext';

/**
 * Компонент сайдбара меню настроек почты. Отображает доступные категории настроек.
 * В данной реализации компоненты меню захардкожены потому что каждый тип компонента используется всего
 * один раз и ради этого нет смысла создавать отдельный компонент.
 * @param currentPage
 * @param setCurrentPage
 * @returns {JSX.Element}
 * @constructor
 */
const SettingsMenuSidebar = ({currentPage, setCurrentPage}) => {

  const {language} = useContext(LanguageContext);

  const activeAppearance = currentPage === menuPages.appearance ? 'active' : '';
  const activeLanguage = currentPage === menuPages.language ? 'active' : '';

  return (
    <div className="settings-menu-sidebar">
      <div className="settings-menu-sidebar__header"></div>
      <div className="settings-menu-sidebar__content">
        <div className={`settings-menu-sidebar__button ${activeAppearance}`}
             onClick={() => {
               setCurrentPage(menuPages.appearance);
             }}>
          <div className="settings-menu-sidebar__button__container">
            <div className="settings-menu-sidebar__button__text">
              {language.settings.sidebar.appearanceButtonName}
            </div>
          </div>
        </div>
        <div className={`settings-menu-sidebar__button ${activeLanguage}`}
             onClick={() => {
               setCurrentPage(menuPages.language);
             }}>
          <div className="settings-menu-sidebar__button__container">
            <div className="settings-menu-sidebar__button__text">
              {language.settings.sidebar.languageButtonName}
            </div>
            {language.languageName === languages.ru &&
              <Icons
                name={uiIcons.ru_flag}
                width="15"
                height="12"
                className="settings-menu-sidebar__button__flag-icon"
              />
            }
            {language.languageName === languages.en &&
              <Icons
                name={uiIcons.us_flag}
                width="15"
                height="12"
                className="settings-menu-sidebar__button__flag-icon"
              />
            }
          </div>
        </div>
      </div>
      <div className="settings-menu-sidebar__footer"></div>
    </div>
  );
};

export default SettingsMenuSidebar;
