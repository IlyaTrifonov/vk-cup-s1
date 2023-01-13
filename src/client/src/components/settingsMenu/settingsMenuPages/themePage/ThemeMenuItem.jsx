import React from 'react';
import {flagsIcons} from "../../../../assets/icons";
import Icons from "../../../../assets/icons/Icons";

const ThemeMenuItem = ({children, backgroundColor, onClick}) => {

    const isActive = false


    return (
        <div className="theme-menu-item-container">
            <div className="theme-menu-item"
                 style={{backgroundColor: backgroundColor}}
                 onClick={onClick}>
                {children}

                <div className="selected-mark">
                    <Icons
                        name={flagsIcons.done_sign}
                        width='40'
                        height='40'
                        className='selected-mark__mark'
                    />
                </div>

            </div>
        </div>
    );
};

export default ThemeMenuItem;