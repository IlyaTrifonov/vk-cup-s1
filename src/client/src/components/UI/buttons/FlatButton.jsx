import React from 'react';
import './ButtonOLD.css'
import Icons from "../../../assets/icons/Icons";

const FlatButton = ({icon, children}) => {
    return (
        <div className="flat_button">
            <Icons
                name={icon}
                color='#333333'
                width='16'
                height='16'
                className='icon'
            />
            {/*<img src={icon} alt=""/>*/}
            {children}
        </div>
    );
};

export default FlatButton;