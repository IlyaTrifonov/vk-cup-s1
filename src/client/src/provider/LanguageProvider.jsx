import React, {useEffect, useState} from 'react';
import {LanguageContext, languages} from '../context/LanguageContext';
import {useFetchTranslations} from '../hooks/useFetchTranslations';


const getLanguageName = (lang) => {
	if (languages[lang]) {
		return languages[lang];
	}
	if (window && window.localStorage) {
		const localStorageLang = window.localStorage.getItem('language');
		if (languages[localStorageLang]) {
			return localStorageLang;
		}
	}
	return languages.ru;
};

/**
 * Компонент провайдера языка всей почты. Сохраняет данные о выбранном языке в localStorage и достаёт их оттуда
 * при повторном открытии страницы.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const LanguageProvider = ({children}) => {

	const [languageName, setLanguageName] = useState(getLanguageName());
	const language = useFetchTranslations(languageName);

	const changeLanguage = (langName) => {
		setLanguageName(languages[langName] || languages.ru);
	};

	useEffect(() => {
		localStorage.setItem('language', language.languageName);
	}, [language]);

	return (
		<LanguageContext.Provider value={{language, changeLanguage}}>
			{children}
		</LanguageContext.Provider>
	);
};

export default LanguageProvider;
