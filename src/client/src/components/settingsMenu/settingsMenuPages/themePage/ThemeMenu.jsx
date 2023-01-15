import React, {useContext} from 'react';
import './ThemeMenu.sass';
import {ReactComponent as Logo} from "../../../../assets/svg/logo.svg";
import AnimeThemePreview from "../../../../assets/pictures/anime_theme_preview.png";
import ThemeMenuItem from "./ThemeMenuItem";
import {accents, animeColor, defaultThemes, ThemeContext} from "../../../../context/ThemeContext";
import {darkThemeColors, lightThemeColors} from "./ThemeColors";
import {LanguageContext} from "../../../../context/LanguageContext";

const ThemeMenu = () => {

    const {themeObj} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    return (
        <div className="settings-menu__theme-menu">
            <div className="menu-title">
                {language.settings.appearanceMenu.menuTitle}
            </div>
            <div className="colors">
                {Object.entries(darkThemeColors).map(
                    ([key, color]) =>
                        <ThemeMenuItem backgroundColor={color}
                                       key={key}
                                       color={key}
                                       accent={accents.light}
                                       themeObj={themeObj}
                        />
                )}
                {Object.entries(lightThemeColors).map(
                    ([key, color]) =>
                        <ThemeMenuItem backgroundColor={color}
                                       key={key}
                                       color={key}
                                       accent={accents.dark}
                                       themeObj={themeObj}
                        />
                )}
            </div>
            <div className="themes">
                <ThemeMenuItem backgroundColor="#000000"
                               theme={defaultThemes.dark}
                               themeObj={themeObj}
                >
                    <Logo fill="#FFFFFF"/>
                </ThemeMenuItem>
                <ThemeMenuItem backgroundColor="#FFFFFF"
                               theme={defaultThemes.light}
                               themeObj={themeObj}
                >
                    <Logo fill="#005FF9"/>
                </ThemeMenuItem>
                <ThemeMenuItem color={animeColor}
                               accent={accents.light}
                               themeObj={themeObj}
                >
                    <img src={AnimeThemePreview} alt=""/>
                </ThemeMenuItem>
            </div>
        </div>
    );
};

export default ThemeMenu;