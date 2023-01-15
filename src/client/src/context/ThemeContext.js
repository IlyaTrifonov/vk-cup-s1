import React from 'react'

export const defaultThemes = {
    dark: 'dark',
    light: 'light',
    // anime: 'anime'
}

export const coloredThemesBase = 'base';

export const animeColor = 'Anime';

export const accents = {
    dark: 'dark',
    light: 'light'
}

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
    AntiFlashWhite: 'AntiFlashWhite'
}

export const defaultThemeObjLight = {
    theme: defaultThemes.light,
    accent: '',
    color: ''
}

export const defaultThemeObjDark = {
    theme: defaultThemes.dark,
    accent: '',
    color: ''
}

export const ThemeContext = React.createContext({})