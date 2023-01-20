import React, {useContext, useEffect, useState} from 'react';
import LetterItem from "../LetterItem/LetterItem";
import {useFetching} from "../../hooks/useFetching";
import MailService from "../../api/MailService";
import {MailContext} from "../../context/MailContext";


/**
 * Компонент списка писем. Используется для отображения списка писем в папках.
 * @param folder
 * @returns {JSX.Element}
 * @constructor
 */
const LetterList = ({folder}) => {

    const {letters, getLetters} = useContext(MailContext);

    const thisComponent = document.getElementById('letter-list-id');

    useEffect(() => {
        if (thisComponent) {
            thisComponent.scrollTo(0, 0);
        }
        getLetters(folder)
    }, [folder])


    return (
        <div className="letter-list" id="letter-list-id">
            <div className="letter-list__header"></div>
            <div className="letter-list__list">
                {letters ?
                    letters.map((letter, index) =>
                        <LetterItem letter={letter} key={index}/>
                    ) : null
                }
            </div>
        </div>
    );
};

export default LetterList;