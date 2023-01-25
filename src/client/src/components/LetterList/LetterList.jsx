import React, {useContext, useEffect, useRef} from 'react';
import LetterItem from "../LetterItem/LetterItem";
import {MailContext} from "../../context/MailContext";
import {LanguageContext} from "../../context/LanguageContext";
import Icons from "../../assets/icons/Icons";
import {uiIcons} from "../../assets/icons";


/**
 * Компонент списка писем. Используется для отображения списка писем в папках.
 * @param folder
 * @returns {JSX.Element}
 * @constructor
 */
const LetterList = ({folder}) => {

    const {language} = useContext(LanguageContext)
    const {letters, getLetters, filters, isNoMoreLetters, isLettersLoading} = useContext(MailContext);
    const letterListRef = useRef(null);

    useEffect(() => {
        if (letterListRef) {
            letterListRef.current.scrollTo(0, 0);
        }
        getLetters(folder, true);
    }, [folder, filters])

    const observer = useRef(null);
    const observerItemRef = useRef(null);

    useEffect(() => {
        if (letters) {
            if (observer.current) {
                observer.current.disconnect();
                // console.log("Обсервер удалён");
            }
            if (!isNoMoreLetters) {
                observer.current = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        // console.log('Запрашиваем ещё...');
                        getLetters(folder, false);
                    }
                });

                if (observerItemRef.current) {
                    observer.current.observe(observerItemRef.current);
                }
                // console.log("Обсервер установлен");
            }
        }
    }, [letters])

    const observerIndex = letters.length > 3 ? letters.length - 3 : letters.length - 1;

    return (
        <div className="letter-list" ref={letterListRef}>
            <div className="letter-list__header"/>
            <div className="letter-list__list">
                {letters ?
                    letters.map((letter, index) =>
                        <LetterItem
                            letter={letter}
                            key={letter.id}
                            ref={index === observerIndex ? observerItemRef : null}
                        />
                    ) : null
                }
            </div>
            {!letters.length && !isLettersLoading &&
                <div className="empty-letter-list">
                    <div className="empty-letter-list-image">
                        <Icons
                            name={uiIcons.empty_search_list}
                            width='100'
                            height='100'
                            className="empty-letter-list-image-svg"
                        />
                        <div className="empty-letter-list-image-png"/>
                    </div>
                    <div className="empty-letter-list-text">
                        {language.letterList.emptyLetterListErrorMessage}
                    </div>
                </div>
            }
        </div>
    );
};

export default LetterList;