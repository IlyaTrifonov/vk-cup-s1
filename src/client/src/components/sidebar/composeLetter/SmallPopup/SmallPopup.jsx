import React from 'react';
import './SmallPopup.sass';
import Button, {buttonTypes} from '../../../UI/buttons/Button/Button';
import ClosePopupButton from '../../../UI/PopupControls/ClosePopupButton';

const SmallPopup = ({closePopup, popup}) => {
  return (
    <div className="small-popup" onMouseDown={(e) => e.stopPropagation()}>
      <div className="small-popup__container">
        <ClosePopupButton closePopup={closePopup}/>
        <div className="small-popup__title">
          {popup.errorTitle}
        </div>
        <div className="small-popup__message">
          {popup.errorMessage}
        </div>
        <Button type={buttonTypes.accent} onClick={closePopup}>
          {popup.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SmallPopup;
