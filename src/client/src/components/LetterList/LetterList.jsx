import React, {useEffect, useState} from 'react';
import LetterItem from "../LetterItem/LetterItem";
import {useFetching} from "../../hooks/useFetching";
import MailService from "../../api/MailService";

const LetterList = ({folder}) => {
    console.log('Загружаем леттер лист', folder)

/*
    // const testLetter = fuckThis()
    // console.log(testLetter)

/!*
    const [testLetter, setTestLetter] = useState(null)
    const [fetchLetter, isLetterLoading, letterError] = useFetching(async () => {
        const response = await MailService.getOneLetterT();
        const data = await response.json();
        console.log(data);
        setTestLetter(data)
    })
*!/

/!*
    const [testSomeLetters, setTestSomeLetters] = useState([])
    const [fetchLetters, isLettersLoading, lettersError] = useFetching(async () => {
        const response = await MailService.getSomeLetters();
        const data = await response.json();
        // console.log(data);
        setTestSomeLetters(data)
    })
*!/
*/

    const [myLetters, setMyLetters] = useState([])
    const [fetchLettersX, isLettersLoadingX, lettersErrorX] = useFetching(async () => {
        const response = await MailService.getLettersFromFolder(folder, 500, 0);
        const data = await response.json();
        setMyLetters(data)
    })

    useEffect(() => {
        fetchLettersX()
    }, [folder])

    // if (isLettersLoading || isLetterLoading) {
    //     return (
    //         <span>Грузится</span>
    //     )
    // }

    return (
        <div className="letter-list">
            {myLetters ?
                myLetters.map((letter, index) =>
                    <LetterItem letter={letter} key={index}/>
                ) : null
            }
        </div>
    );
};

export default LetterList;