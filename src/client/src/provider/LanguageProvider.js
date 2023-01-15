import React, {useEffect, useState} from 'react';
import {LanguageContext, languages} from "../context/LanguageContext";
import {textKeys} from "../translations";
import {ruLang} from "../translations/ru";


const getLanguage = (lang) => {
    // TODO Функционал временный для отладки
    console.log('Вы выбрали язык:', lang);
    return ruLang;
    // return textKeys;
}

const LanguageProvider = ({children}) => {

    const [language, setLanguage] = useState(getLanguage(languages.ru))

/*
    useEffect(() => {
        // console.log(language)
        // console.log(languages.ru)
    }, [language])
*/

    return (
        <LanguageContext.Provider value={{language}}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;