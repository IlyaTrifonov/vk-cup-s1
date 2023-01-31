import React from 'react';
import Icons from '../../../../assets/icons/Icons';
import './Button.sass';

export const buttonTypes = {
  primary: 'primary',
  accent: 'accent',
  secondary: 'secondary',
  tertiary: 'tertiary',
  tertiaryTransparent: 'tertiaryTransparent',
};

const Button = ({children, icon, type, size, onClick}) => {

  const buttonType = type in buttonTypes ? type : buttonTypes.primary;

  return (
    <button className={`button ${buttonType}`} onClick={onClick}>
      {icon &&
        <Icons
          name={icon}
          width={size}
          height={size}
          className="button__icon"
        />
      }
      <span className="button__text">{children}</span>
    </button>
  );
};

export default Button;
