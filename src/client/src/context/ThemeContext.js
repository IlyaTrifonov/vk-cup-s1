import React from 'react';

// Стандартные темы почты
export const defaultThemes = {
	dark: 'dark',
	light: 'light',
};

// База для отображения цветных тем
export const coloredThemesBase = 'base';

// Тема с аниме
export const animeColor = 'Anime';

// Цветовые акценты, используемые вместе с базой
export const accents = {
	dark: 'dark',
	light: 'light',
};

// Доступные цвета для универсальной темизации почты.
export const colors = {
	DarkLava: 'DarkLava',
	Arsenic: 'Arsenic',
	JapaneseViolet: 'JapaneseViolet',
	Jacarta: 'Jacarta',
	VioletBlue: 'VioletBlue',
	ParadisePink: 'ParadisePink',
	CoralRed: 'CoralRed',
	MayGreen: 'MayGreen',

	MiddleBlueGreen: 'MiddleBlueGreen',
	WhiteCoffee: 'WhiteCoffee',
	BlanchedAlmond: 'BlanchedAlmond',
	Eggshell: 'Eggshell',
	Water: 'Water',
	LavenderBlue: 'LavenderBlue',
	AzureishWhite: 'AzureishWhite',
	AntiFlashWhite: 'AntiFlashWhite',
};

// Светлая тема
export const defaultThemeObjLight = {
	theme: defaultThemes.light,
	accent: '',
	color: '',
};

// Тёмная тема
export const defaultThemeObjDark = {
	theme: defaultThemes.dark,
	accent: '',
	color: '',
};

/**
 * Контекст для хранения данных о теме.
 * @type {React.Context<{}>}
 */
export const ThemeContext = React.createContext({});
