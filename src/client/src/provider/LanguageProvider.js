import React, {useEffect, useState} from 'react';
import {LanguageContext, languages} from "../context/LanguageContext";
import {ruLang} from "../translations/ru";
import {enLang} from "../translations/en";


const getLanguage = (lang) => {

    let resultLang = ruLang;

    if (lang) {
        if (lang === languages.en)
            resultLang = enLang
        return resultLang
    }

    const localStorageLang = window?.localStorage?.getItem('language');
    if (Object.values(languages).includes(localStorageLang)) {
        if (localStorageLang === languages.en)
            resultLang = enLang
    }

    return resultLang;
}

const LanguageProvider = ({children}) => {

    const [language, setLanguage] = useState(getLanguage())

    const changeLanguage = (language) => {
        if (Object.values(languages).includes(language)) {
            setLanguage(getLanguage(language));
        } else {
            setLanguage(getLanguage(languages.ru))
        }
    }

    useEffect(() => {
        localStorage.setItem('language', language.languageName)
    }, [language])

    return (
        <LanguageContext.Provider value={{language, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;