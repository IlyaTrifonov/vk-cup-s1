import React, {useState} from 'react';
import CommonButton, {buttonTypes} from '../../UI/buttons/CommonButton';
import {uiIcons} from '../../../assets/icons';
import Portal from '../../Portal';
import ComposeLetterPopup from './ComposeLetterPopup';

const ComposeLetterButton = ({children}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <CommonButton type={buttonTypes.default}
                    icon={uiIcons.pencil}
                    className="sidebar-write-icon"
                    iconSize="16"
                    onClick={() => {
                      setIsOpen(true);
                    }}
      >
        {children}
      </CommonButton>
      {isOpen &&
        <Portal>
          <ComposeLetterPopup closePopup={() => setIsOpen(false)}/>
        </Portal>
      }
    </div>
  );
};

export default ComposeLetterButton;
