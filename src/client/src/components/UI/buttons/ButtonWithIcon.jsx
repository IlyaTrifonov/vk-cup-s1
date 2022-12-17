import React from 'react';
import Icons from "../../../assets/icons/Icons";

const ButtonWithIcon = ({children, className, icon, iconSize, ...props}) => {
    return (
        <button className="button-with-icon" {...props}>
            <Icons
                name={icon}
                width={iconSize}
                height={iconSize}
                className={className ? className : 's_icon'}
            />
            {children}
        </button>
    );
};

export default ButtonWithIcon;