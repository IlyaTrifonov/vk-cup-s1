import React from 'react';

export const languages = {
  ru: 'ru',
  en: 'en',
};

/**
 * Контекст для хранения данных о выбранном языке.
 * @type {React.Context<{}>}
 */
export const LanguageContext = React.createContext({});
