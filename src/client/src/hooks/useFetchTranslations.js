import {useState} from 'react';

import ru from '../translations/ru.json';
import en from '../translations/en.json';

const availableLanguages = {
	ru,
	en,
};


export const useFetchTranslations = (language) => {
	const [translations, setTranslations] = useState(null);

	/*
		useEffect(() => {
			async function fetchTranslations() {
				const response = await fetch(`http://yourserver.com/translations/${language}.json`);
				const data = await response.json();
				setTranslations(data);
			}
			fetchTranslations();
		}, [language]);
	*/
	// console.log('Фетч языка', language)
	// console.log(typeof availableLanguages[language])

	return availableLanguages[language];

	// return translations;
};
