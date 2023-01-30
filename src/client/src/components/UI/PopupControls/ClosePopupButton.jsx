import React from 'react';
import Icons from '../../../assets/icons/Icons';
import {uiIcons} from '../../../assets/icons';
import './ClosePopupButton.sass';

const ClosePopupButton = ({closePopup}) => {
  return (
    <div className="popup__controls">
      <div className="popup__controls__control"
           onClick={closePopup}>
        <Icons name={uiIcons.cross}
               width="16"
               height="16"
               className="s_icon"/>
      </div>
    </div>
  );
};

export default ClosePopupButton;
