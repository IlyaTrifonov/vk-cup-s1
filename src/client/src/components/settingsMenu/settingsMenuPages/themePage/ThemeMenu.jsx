import React, {useContext, useState} from 'react';
import './ThemeMenu.sass';
import {ReactComponent as Logo} from "../../../../assets/svg/logo.svg";
import AnimeThemePreview from "../../../../assets/pictures/anime_theme_preview.png";
import ThemeMenuItem from "./ThemeMenuItem";
import {themeColors} from "./ThemeColors";
import {ThemeContext, defaultThemes} from "../../../../context/ThemeContext";

const ThemeMenu = () => {

    const {theme, setTheme} = useContext(ThemeContext)

    const [activeTheme, setActiveTheme] = useState(null)

    return (
        <div className="settings-menu__theme-menu">
            <div className="menu-title">
                Настройки внешнего вида вашей почты и темы оформления
            </div>
            <div className="colors">
                {Object.entries(themeColors).map(
                    ([key, color], index) =>
                        <ThemeMenuItem backgroundColor={color}
                                       key={index}
                                       active={key === activeTheme}
                                       onClick={() => {
                                           console.log('Нажата', color)
                                           setActiveTheme(key)
                                       }}
                        />
                )}
            </div>
            <div className="themes">
                <ThemeMenuItem backgroundColor="#000000"
                               active={'dark' === activeTheme}
                               onClick={() => {
                                   setActiveTheme('dark')
                                   setTheme(defaultThemes.dark)
                               }}>
                    <Logo fill="#FFFFFF"/>
                </ThemeMenuItem>
                <ThemeMenuItem backgroundColor="#FFFFFF"
                               active={'light' === activeTheme}
                               onClick={() => {
                                   setActiveTheme('light')
                                   setTheme(defaultThemes.light)
                               }}>
                    <Logo fill="#005FF9"/>
                </ThemeMenuItem>
                <ThemeMenuItem active={'anime' === activeTheme}
                               onClick={() => {
                                   setActiveTheme('anime')
                                   console.log('Нажали аниме')
                               }}>
                    <img src={AnimeThemePreview} alt=""/>
                </ThemeMenuItem>
            </div>

        </div>
    );
};

export default ThemeMenu;