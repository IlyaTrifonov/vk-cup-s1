import React, {useContext} from 'react';
import {flagsIcons} from "../../../../assets/icons";
import Icons from "../../../../assets/icons/Icons";
import {coloredThemesBase, ThemeContext} from "../../../../context/ThemeContext";

const ThemeMenuItem = ({
                           children, backgroundColor,
                           theme = coloredThemesBase,
                           accent = '',
                           color = '',
                           themeObj
                       }) => {

    const {setTheme} = useContext(ThemeContext)

    const isActive = JSON.stringify({theme, accent, color}) === JSON.stringify(themeObj);

    return (
        <div className="theme-menu-item-container">
            <div className="theme-menu-item"
                 style={{backgroundColor: backgroundColor}}
                 onClick={() => {
                     setTheme(theme, accent, color)
                 }}>
                {children}
                {isActive &&
                    <div className="selected-mark">
                        <Icons
                            name={flagsIcons.done_sign}
                            width='40'
                            height='40'
                            className='selected-mark__mark'
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default ThemeMenuItem;