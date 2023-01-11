import React from 'react';

const AttachDropdownItem = ({attach}) => {
    return (
        <div className="attach-dropdown-overlay__item">
            <div className="attach-dropdown-overlay__item__icon">
                <img src={attach.url} alt=""/>
            </div>
            <div className="attach-dropdown-overlay__item__text">
                <span>{`${attach.name} ${attach.size}`}</span>
            </div>
        </div>
    );
};

export default AttachDropdownItem;