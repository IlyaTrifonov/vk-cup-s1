import React from 'react'
import {
    accents,
    coloredThemesBase,
    colors,
    defaultThemeObjDark,
    defaultThemeObjLight,
    defaultThemes,
    ThemeContext
} from '../context/ThemeContext'

const getTheme = () => {
    const theme = `${window?.localStorage?.getItem('theme')}`
    if (Object.values(defaultThemes).includes(theme)) return theme

/*
    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (userMedia.matches) return defaultThemes.light
*/

    const userMediaD = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMediaD.matches) return defaultThemes.dark

    return defaultThemes.light
}

const getThemeObj = () => {
    const themeObj = window?.localStorage?.getItem('themeObj')
    if (themeObj) {
        let parsedThemeObj = {}
        try {
            parsedThemeObj = JSON.parse(themeObj)
            if (Object.values(defaultThemes).includes(parsedThemeObj.theme)
                && parsedThemeObj.accent === ''
                && parsedThemeObj.color === '')
                return parsedThemeObj
            if (parsedThemeObj.theme === coloredThemesBase
                && Object.values(accents).includes(parsedThemeObj.accent)
                && Object.values(colors).includes(parsedThemeObj.color))
                return parsedThemeObj
        } catch (e) {
            return defaultThemeObjLight
        }
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMedia.matches) return defaultThemeObjDark

    return defaultThemeObjLight
}

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = React.useState(getTheme)

    const [themeObj, setThemeObj] = React.useState(getThemeObj)


/*
    const myTheme = {
        theme: "base",
        accent: "dark",
        color: "red",
    }
*/

    /*
        how to switch colored theme

        theme to base

        accent
    */

    React.useEffect(() => {
        document.documentElement.dataset.theme = themeObj.theme
        document.documentElement.dataset.themeObjT = themeObj.theme
        document.documentElement.dataset.themeObjA = themeObj.accent
        document.documentElement.dataset.themeObjC = themeObj.color
        localStorage.setItem('theme', theme)
        localStorage.setItem('themeObj', JSON.stringify(themeObj))
    }, [theme, themeObj])

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider