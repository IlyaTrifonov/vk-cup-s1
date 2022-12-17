import React from 'react';
import Icons from "../../assets/icons/Icons";
// import Icons from "../../assets/icons2";
// import './SidebarOLD.css';

const SidebarItemOLD = ({icon, iconName, onClick, children, text, className, ...props}) => {

    return (
        <div className="sidebar_item" onClick={onClick}>
            <div className="item_container">
                <Icons
                    name={icon}
                    // color='#333333'
                    width='20'
                    height='20'
                    className={className ? className : 's_icon'}
                />
                <span>{text}</span>
            </div>
        </div>
    );
};

export default SidebarItemOLD;