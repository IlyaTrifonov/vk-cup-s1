import React, {useContext, useState} from 'react';
import {LanguageContext, languages} from "../../../../context/LanguageContext";
import './LanguageMenu.sass';
import {flagsIcons} from "../../../../assets/icons";
import Icons from "../../../../assets/icons/Icons";

/**
 * Страница настроек языка в почте. Оборачивается в SettingsMenuMain для отображения.
 * @returns {JSX.Element}
 * @constructor
 */
const LanguageMenu = () => {

    const {language, changeLanguage} = useContext(LanguageContext)

    const [currentLang, setCurrentLang] = useState(language.languageName);



    return (
        <div className="settings-menu__language-menu">
            <div className="menu-title">
                {language.settings.languageMenu.menuTitle}
            </div>
            <div className="languages-selector">
                <div className="lang-selector__selector"
                     onClick={() => {
                         setCurrentLang(languages.ru)
                     }}>
                    <div className={`radio-icon ${currentLang === languages.ru && 'active'}`}/>
                    <input type="radio"
                           id={languages.ru}
                           name="languages-selector"
                           value={languages.ru}
                           checked={currentLang === languages.ru}
                           readOnly/>
                    <label htmlFor={languages.ru}>
                        <Icons
                            name={flagsIcons.ru_flag}
                            width='15'
                            height='12'
                            className='lang-selector__selector__flag-icon'
                        />
                        <span>Русский</span>
                    </label>
                </div>
                <div className="lang-selector__selector"
                     onClick={() => {
                         setCurrentLang(languages.en)
                     }}>
                    <div className={`radio-icon ${currentLang === languages.en && 'active'}`}/>
                    <input type="radio"
                           id={languages.en}
                           name="languages-selector"
                           value={languages.en}
                           checked={currentLang === languages.en}
                           readOnly/>
                    <label htmlFor={languages.en}>
                        <Icons
                            name={flagsIcons.us_flag}
                            width='15'
                            height='12'
                            className='lang-selector__selector__flag-icon'
                        />
                        <span>English</span>
                    </label>
                </div>
            </div>
            <div className="confirm-button__container">
                <button className="confirm-button__button"
                        onClick={() => {
                            changeLanguage(currentLang)
                        }}>
                    {language.settings.languageMenu.selectLanguageButtonName}
                </button>
            </div>
        </div>
    );
};

export default LanguageMenu;