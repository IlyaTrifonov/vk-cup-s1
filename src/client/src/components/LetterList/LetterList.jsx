import React, {useContext, useEffect, useRef, useState} from 'react';
import LetterItem from "../LetterItem/LetterItem";
import {MailContext} from "../../context/MailContext";


/**
 * Компонент списка писем. Используется для отображения списка писем в папках.
 * @param folder
 * @returns {JSX.Element}
 * @constructor
 */
const LetterList = ({folder}) => {

    const {letters, getLetters, filters, limit, isNoMoreLetters} = useContext(MailContext);
    const letterListRef = useRef(null);

    useEffect(() => {
        if (letterListRef) {
            letterListRef.current.scrollTo(0, 0);
        }
        getLetters(folder);
    }, [folder, filters])

    const observer = useRef(null);
    const observerItemRef = useRef(null);

    useEffect(() => {
        if (letters) {
            if (observer.current) {
                observer.current.disconnect();
                console.log("Обсервер удалён");
            }
            if (!isNoMoreLetters) {
                observer.current = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        console.log('Запрашиваем ещё...');
                        getLetters(folder);
                    }
                });

                if (observerItemRef.current) {
                    observer.current.observe(observerItemRef.current);
                }
                console.log("Обсервер установлен");
            }
        }
    }, [letters])

    const observerIndex = letters.length > 3 ? letters.length - 3 : letters.length - 1;

    return (
        <div className="letter-list" ref={letterListRef}>
            <div className="letter-list__header"></div>
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
        </div>
    );
};

export default LetterList;