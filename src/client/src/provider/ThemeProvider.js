import React from 'react'
import {
    accents,
    animeColor,
    coloredThemesBase,
    colors,
    defaultThemeObjDark,
    defaultThemeObjLight,
    defaultThemes,
    ThemeContext
} from '../context/ThemeContext'


const getThemeObj = () => {
    const themeObj = window?.localStorage?.getItem('themeObj')
    if (themeObj) {
        let parsedThemeObj = {}
        try {
            parsedThemeObj = JSON.parse(themeObj)
            if (Object.values(defaultThemes).includes(parsedThemeObj.theme) &&
                parsedThemeObj.accent === '' &&
                parsedThemeObj.color === '')
                return parsedThemeObj
            if (parsedThemeObj.theme === coloredThemesBase &&
                Object.values(accents).includes(parsedThemeObj.accent) &&
                (Object.values(colors).includes(parsedThemeObj.color)) ||
                parsedThemeObj.color === animeColor)
                return parsedThemeObj
        } catch (e) {
            return defaultThemeObjLight
        }
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMedia.matches) return defaultThemeObjDark

    return defaultThemeObjLight
}

/**
 * Провайдер темы почты. Управляет темами и отправляет данные о теме компонентам.
 * Сохраняет выбранную тему в localStorage и достаёт её оттуда при повторном открытии страницы.
 * При первом открытии сайта определяется тема установленная в системе (тёмная/светлая).
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const ThemeProvider = ({children}) => {

    const [themeObj, setThemeObj] = React.useState(getThemeObj)

    const setTheme = (theme, accent = '', color = '') => {
        if (theme === coloredThemesBase &&
            (accent === '' || color === '')) {
            setThemeObj(defaultThemeObjLight)
            return
        }
        setThemeObj({
            theme: theme,
            accent: accent,
            color: color
        })
    }

    React.useEffect(() => {
        document.documentElement.dataset.theme = themeObj.theme
        document.documentElement.dataset.accent = themeObj.accent
        document.documentElement.dataset.color = themeObj.color
        localStorage.setItem('themeObj', JSON.stringify(themeObj))
    }, [themeObj])

    return (
        <ThemeContext.Provider value={{themeObj, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider