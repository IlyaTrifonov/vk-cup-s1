import React, {useEffect, useState} from 'react';
import LetterItem from "../LetterItem/LetterItem";
import {useFetching} from "../../hooks/useFetching";
import MailService from "../../api/MailService";

const LetterList = () => {

    // const testLetter = fuckThis()
    // console.log(testLetter)

    const [testLetter, setTestLetter] = useState(null)
    const [fetchLetter, isLetterLoading, letterError] = useFetching(async () => {
        const response = await MailService.getOneLetterT();
        const data = await response.json();
        console.log(data);
        setTestLetter(data)
    })

    const [testSomeLetters, setTestSomeLetters] = useState([])
    const [fetchLetters, isLettersLoading, lettersError] = useFetching(async () => {
        const response = await MailService.getSomeLetters();
        const data = await response.json();
        console.log(data);
        setTestSomeLetters(data)
    })


    useEffect(() => {
        // fetchLetter()
        fetchLetters()
        // console.warn(testLetter)
    }, [])

    // if (isLettersLoading || isLetterLoading) {
    //     return (
    //         <span>Грузится</span>
    //     )
    // }

    return (
        <div className="letter-list">
            {testSomeLetters ?
                testSomeLetters.slice(0, 20).map((letter, index) =>
                    <LetterItem letter={letter} key={index}/>
                ) : null
            }

            {/*{testSomeLetters.map((letter, index) => {*/}
            {/*        // <LetterItem letter={letter}/>*/}
            {/*    })*/}
            {/*}*/}


{/*
            {testLetter ?
                <LetterItem letter={testLetter}/>
                :
                <span>Грузится</span>
            }
*/}


        </div>
    );
};

export default LetterList;