import React, {useContext} from 'react';
import {LanguageContext} from "../../../../context/LanguageContext";

const LanguageMenu = () => {

    const {language} = useContext(LanguageContext)

    return (
        <div>
            <div>{language.settings.languageMenu.menuTitle}</div>
        </div>
    );
};

export default LanguageMenu;