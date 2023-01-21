import React, {useContext, useEffect} from 'react';
import LetterItem from "../LetterItem/LetterItem";
import {MailContext} from "../../context/MailContext";


/**
 * Компонент списка писем. Используется для отображения списка писем в папках.
 * @param folder
 * @returns {JSX.Element}
 * @constructor
 */
const LetterList = ({folder}) => {

    const {letters, getLetters, filters} = useContext(MailContext);

    const thisComponent = document.getElementById('letter-list-id');

    useEffect(() => {
        if (thisComponent) {
            thisComponent.scrollTo(0, 0);
        }
        getLetters(folder)
    }, [folder, filters])


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