import React, {useContext, useEffect, useRef, useState} from 'react';
import './ComposeLetterPopup.sass';
import ClosePopupButton from '../../UI/PopupControls/ClosePopupButton';
import Button, {buttonTypes} from '../../UI/buttons/Button/Button';
import ChooseAttach from './ChooseAttach';
import {uiIcons} from '../../../assets/icons';
import Icons from '../../../assets/icons/Icons';
import WysiwygEditor from './editor/WysiwygEditor';
import {initialComposeLetterState, isValidEmail, MailContext} from '../../../context/MailContext';
import SmallPopup from './SmallPopup/SmallPopup';

const ComposeLetterPopup = ({closePopup}) => {

  const {composeLetter, setComposeLetter, sendLetter} = useContext(MailContext);

  const [inputRecipient, setInputRecipient] = useState('');

  const subjectHandler = (event) => {
    setComposeLetter({...composeLetter, subject: event.target.value});
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedRecipient = inputRecipient.trim();
    if (trimmedRecipient) {
      setComposeLetter({...composeLetter, recipients: [...composeLetter.recipients, {email: trimmedRecipient}]});
    }
    setInputRecipient('');
  };

  const handleDelete = (index) => {
    setComposeLetter({...composeLetter, recipients: composeLetter.recipients.filter((_, i) => i !== index)});
  };

  const firstInputRef = useRef(null);

  const cancelButtonHandler = () => {
    closePopup();
    setComposeLetter(initialComposeLetterState);
  };

  const [popup, setPopup] = useState(null);

  const sendButtonHandler = () => {
    if (composeLetter.recipients.some((recipient) => !isValidEmail(recipient.email))
      || composeLetter.recipients.length < 1) {
      setPopup({
        errorTitle: 'Присутствуют некорректные адреса',
        errorMessage: 'Исправьте и попробуйте отправить заново',
        buttonText: 'Исправить письмо',
      });
      return;
    }
    if (composeLetter.subject.trim().length < 1) {
      setPopup({
        errorTitle: 'Отсутствует тема',
        errorMessage: 'Исправьте и попробуйте отправить заново',
        buttonText: 'Исправить письмо',
      });
      return;
    }
    // TODO Отправляем
    sendLetter();
    closePopup();
  };

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
    <div className="compose-letter-popup__background" onMouseDown={closePopup} /*onClick={closePopup}*/>
      <div className="compose-letter-popup__container"
           onMouseDown={(e) => e.stopPropagation()}
        /*onClick={(e) => e.stopPropagation()}*/>
        <ClosePopupButton closePopup={closePopup}/>

        <div className="popup__scroll-view">

          <form onSubmit={handleSubmit}>
            <label className="popup__scroll-view__head" htmlFor="head">
              <span className="head__label">Кому</span>
              <div className="head__recipients">
                {composeLetter.recipients.map((recipient, index) => (
                  <div className={`head__recipients__item ${!isValidEmail(recipient.email) && 'invalid-email'}`}
                       key={index}>
                    <span className="head__recipients__item__text">{recipient.email}</span>
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
            <input type="text"
                   id="subject"
                   className="popup__scroll-view__input"
                   value={composeLetter.subject}
                   onChange={subjectHandler}/>
          </label>

          <div className="popup__scroll-view__attach">
            <ChooseAttach/>
          </div>

          <WysiwygEditor/>

        </div>

        <div className="popup__footer">
          <div className="popup__footer__buttons">
            <Button type={buttonTypes.accent}
                    onClick={sendButtonHandler}>
              Отправить
            </Button>
            <Button type={buttonTypes.secondary} onClick={cancelButtonHandler}>
              Отменить
            </Button>
          </div>
        </div>
      </div>
      {popup &&
        <SmallPopup closePopup={() => setPopup(null)} popup={popup}/>
      }
    </div>
  );
};

export default ComposeLetterPopup;
