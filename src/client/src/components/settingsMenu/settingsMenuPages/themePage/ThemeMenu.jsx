import React, {useContext} from 'react';
import './ThemeMenu.sass';
import {ReactComponent as Logo} from "../../../../assets/svg/logo.svg";
import AnimeThemePreview from "../../../../assets/pictures/anime_theme_preview.png";
import ThemeMenuItem from "./ThemeMenuItem";
import {themeColors} from "./ThemeColors";
import {ThemeContext, themes} from "../../../../context/ThemeContext";

const ThemeMenu = () => {

    const {theme, setTheme} = useContext(ThemeContext)

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
                                       onClick={() => {
                                           console.log('Нажата', color)
                                       }}
                        />
                )}
            </div>
            <div className="themes">
                <ThemeMenuItem backgroundColor="#000000"
                               onClick={() => {
                                   setTheme(themes.dark)
                               }}>
                    <Logo fill="#FFFFFF"/>
                </ThemeMenuItem>
                <ThemeMenuItem backgroundColor="#FFFFFF"
                               onClick={() => {
                                   setTheme(themes.light)
                               }}>
                    <Logo fill="#005FF9"/>
                </ThemeMenuItem>
                <ThemeMenuItem onClick={() => console.log('Нажали аниме')}>
                    <img src={AnimeThemePreview} alt=""/>
                </ThemeMenuItem>
            </div>

        </div>
    );
};

export default ThemeMenu;