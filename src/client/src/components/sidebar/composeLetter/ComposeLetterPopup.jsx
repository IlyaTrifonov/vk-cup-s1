import React, {useEffect, useRef} from 'react';
import './ComposeLetterPopup.sass';
import ClosePopupButton from '../../UI/PopupControls/ClosePopupButton';
import Button, {buttonTypes} from '../../UI/buttons/Button/Button';
import {uiIcons} from '../../../assets/icons';

const ComposeLetterPopup = ({closePopup}) => {

  const firstInputRef = useRef(null);

  useEffect(() => {
    /**
     * Такая установка таймаута понадобилась, чтобы поместить вызов функции
     * установку фокуса в нижнюю часть стека вызовов JavaScript, давая браузеру
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

          <label className="popup__scroll-view__head" htmlFor="head">
            <span className="head__label">Кому</span>
            <input type="text" id="head" ref={firstInputRef}/>
          </label>

          <label className="popup__scroll-view__subject" htmlFor="subject">
            <span className="subject__label">Тема</span>
            <input type="text" id="subject"/>
          </label>

          <div className="popup__scroll-view__attach">
            <Button type={buttonTypes.tertiary} icon={uiIcons.attach} size="20">
              Прикрепить файл
            </Button>
          </div>

          <div className="popup__scroll-view__editor">
            <div className="editor__toolbar">тут типо тулбар редактора</div>
            <div className="editor__editable"
                 contentEditable
                 suppressContentEditableWarning>
              а тут типо редактор уже
            </div>
          </div>

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
