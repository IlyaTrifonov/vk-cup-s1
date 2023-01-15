import React, {useEffect, useState} from 'react';
import LetterItem from "../LetterItem/LetterItem";
import {useFetching} from "../../hooks/useFetching";
import MailService from "../../api/MailService";


const LetterList = ({folder}) => {

    const [myLetters, setMyLetters] = useState([])
    const [fetchLetters, isLettersLoading, lettersError] = useFetching(async () => {
        const response = await MailService.getLettersFromFolder(folder, 500, 0);
        const data = await response.json();
        setMyLetters(data)
    })

    const thisComponent = document.getElementById('letter-list-id');

    useEffect(() => {
        if (thisComponent) {
            thisComponent.scrollTo(0, 0);
            // console.log('rerendering letter list');
        }
        fetchLetters()
    }, [folder])

    /*
        if (isLettersLoading || isLetterLoading) {
            return (
                <span>Грузится</span>
            )
        }
    */

    return (
        <div className="letter-list" id="letter-list-id">
            <div className="letter-list__header"></div>
            <div className="letter-list__list">
                {myLetters ?
                    myLetters.map((letter, index) =>
                        <LetterItem letter={letter} key={index}/>
                    ) : null
                }
            </div>
        </div>
    );
};

export default LetterList;