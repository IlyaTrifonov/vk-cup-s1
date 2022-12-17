import React from 'react';
import Icons from "../../../assets/icons/Icons";
import './Button.sass'

const Button = ({children, className, icon, iconSize, type, ...props}) => {

    const buttonType = type ? type : 'default'

    return (
        <button className={`button ${buttonType}`} {...props}>
            {
                icon ?
                    <Icons
                        name={icon}
                        width={iconSize ? iconSize : '20'}
                        height={iconSize ? iconSize : '20'}
                        className={className ? className : 'button__icon'}
                    />
                    :
                    null
            }
            {children}
        </button>
    );
};

export default Button;