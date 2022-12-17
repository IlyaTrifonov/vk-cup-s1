import React from 'react';
import './ButtonOLD.css';

const ButtonOLD = ({children, ...props}) => {
    return (
        <button {...props} className="button">{children}</button>
    );
};

export default ButtonOLD;