import React, {useContext} from 'react';
import './ThemeMenu.sass';
import {ReactComponent as Logo} from "../../../../assets/svg/logo.svg";
import AnimeThemePreview from "../../../../assets/pictures/anime_theme_preview.png";
import ThemeMenuItem from "./ThemeMenuItem";
import {accents, defaultThemes, ThemeContext} from "../../../../context/ThemeContext";
import {darkThemeColors, lightThemeColors} from "./ThemeColors";

const ThemeMenu = () => {

    const {themeObj} = useContext(ThemeContext)

    return (
        <div className="settings-menu__theme-menu">
            <div className="menu-title">
                Настройки внешнего вида вашей почты и темы оформления
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
                <ThemeMenuItem theme={defaultThemes.anime}
                               themeObj={themeObj}
                >
                    <img src={AnimeThemePreview} alt=""/>
                </ThemeMenuItem>
            </div>
        </div>
    );
};

export default ThemeMenu;