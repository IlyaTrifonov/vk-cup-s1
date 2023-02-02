import React, {useEffect, useRef, useState} from 'react';
import './ComposeLetterPopup.sass';
import ClosePopupButton from '../../UI/PopupControls/ClosePopupButton';
import Button, {buttonTypes} from '../../UI/buttons/Button/Button';
import ChooseAttach from './ChooseAttach';
import {uiIcons} from '../../../assets/icons';
import Icons from '../../../assets/icons/Icons';
import WysiwygEditor from './editor/WysiwygEditor';

const ComposeLetterPopup = ({closePopup}) => {

  const [inputRecipient, setInputRecipient] = useState('');
  const [recipients, setRecipients] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedRecipient = inputRecipient.trim();
    if (trimmedRecipient) {
      setRecipients([...recipients, trimmedRecipient]);
    }
    setInputRecipient('');
  };

  const handleDelete = (index) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const firstInputRef = useRef(null);

  useEffect(() => {
    /**
     * Такая установка таймаута понадобилась, чтобы поместить вызов функции
     * установки фокуса в нижнюю часть стека вызовов JavaScript, давая браузеру
     * возможность завершить визуализацию интерфейса и обновить DOM.
     * Это связано с тем, что React не гарантирует что обновления будут
     * полностью завершены синхронно.
     */
    setTimeout(() => {
      firstInputRef.current.focus();
    }, 0);
  }, []);

  return (
    <div className="compose-letter-popup__background" onClick={closePopup}>
      <div className="compose-letter-popup__container"
           onClick={(e) => e.stopPropagation()}>
        <ClosePopupButton closePopup={closePopup}/>

        <div className="popup__scroll-view">

          <form onSubmit={handleSubmit}>
            <label className="popup__scroll-view__head" htmlFor="head">
              <span className="head__label">Кому</span>
              <div className="head__recipients">
                {recipients.map((recipient, index) => (
                  <div className={`head__recipients__item ${!isValidEmail(recipient) && 'invalid-email'}`}
                       key={index}>
                    <span className="head__recipients__item__text">{recipient}</span>
                    <button className="head__recipients__item__deleteButton"
                            type="button"
                            onClick={() => handleDelete(index)}>
                      <Icons name={uiIcons.small_cross}
                             width="20"
                             height="20"
                             className="head__recipients__item__deleteButton__icon"/>
                    </button>
                  </div>
                ))}
                <input type="text"
                       id="head"
                       ref={firstInputRef}
                       className="popup__scroll-view__input"
                       value={inputRecipient}
                       onBlur={handleSubmit}
                       onChange={(e) => setInputRecipient(e.target.value)}/>
              </div>
            </label>
          </form>

          <label className="popup__scroll-view__subject" htmlFor="subject">
            <span className="subject__label">Тема</span>
            <input type="text" id="subject" className="popup__scroll-view__input"/>
          </label>

          <div className="popup__scroll-view__attach">
            <ChooseAttach/>
          </div>

          <WysiwygEditor/>

        </div>

        <div className="popup__footer">
          <div className="popup__footer__buttons">
            <Button type={buttonTypes.accent}
                    onClick={() =>
                      console.log('Отправляем письмо')
                    }>
              Отправить
            </Button>
            <Button type={buttonTypes.secondary} onClick={closePopup}>
              Отменить
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComposeLetterPopup;
