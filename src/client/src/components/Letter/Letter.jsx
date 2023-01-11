import React, {useEffect, useState} from 'react';
import './Letter.sass'
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import MailService from "../../api/MailService";
import ReadMark from "../LetterItem/ReadMark";
import UserAvatar from "../LetterItem/UserAvatar";
import {getDateString} from "../dateParse";
import {flags} from "../LetterItem/flags";
import Icons from "../../assets/icons/Icons";

const Letter = ({/*folder*/}) => {
    // const [selectedFolder, setSelectedFolder] = useState(folder)

    const params = useParams()

    const [letter, setLetter] = useState(null)

    const [fetchLetters, isLettersLoading, lettersError] = useFetching(async (id) => {
        const response = await MailService.getLetterById(id);
        const data = await response.json();
        setLetter(data)
    })

    // Тому кто это смотрит: обычно я так не делаю, но тут уже не было времени
    // Прости, если тебе больно смотреть на такое соединение строк
    let users = "Кому: "
    if (letter) {
        letter.to.forEach(user => users += `${user.name} ${user.surname}, `)
    }
    users = users.slice(0, -2) + '.'

    useEffect(() => {
        fetchLetters(params.id)
    }, [])


    let isDoc = false
    let isDocArray = false
    if (letter) {
        isDoc = !!letter.doc
        isDocArray = isDoc ? Array.isArray(letter.doc) : false
    }
    console.log('isDoc', isDoc, 'isDocArray', isDocArray)

    return (
        /*
                <div className="content">
                    <LargeSidebar selectedFolder={selectedFolder}
                                  setSelectedFolder={setSelectedFolder}/>
        */
        letter && <div className="letter">
            <div className="letter__header">
                <h2 className="letter__tittle">{letter.title}</h2>
                {letter.flag ?
                    <div className="letter__flag">
                        <Icons name={flags[letter.flag]}
                               width="16"
                               height="16"
                               className="secondary-data__flag-icon"/>
                        <div className="letter__flag__text">
                            {letter.flag}
                        </div>
                    </div>
                    :
                    <div className="letter__flag">
                        <div className="letter__flag__text">
                            Письмо без категории
                        </div>
                    </div>
                }

            </div>
            <div className="letter__head">
                <ReadMark isRead={letter.read}/>
                <div className="letter__info">
                    <UserAvatar avatar={letter.author.avatar}/>
                    <div className="letter__info__info">
                        <div className="letter__info__info__tittle">
                            <div className="name">{letter.author.name} {letter.author.surname}</div>
                            <div className="time">{getDateString(letter.date)}</div>
                        </div>
                        <div className="letter__info__info__users">
                            <span className="users">{users}</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="attaches">
                {isDoc ?
                    isDocArray ?
                        letter.doc.forEach(doc =>
                            <img className="attach__img" src={doc.img} alt="Вложение"/>
                        )
                        : <img className="attach__img" src={letter.doc.img} alt="Вложение"/>
                    : null
                }
            </div>
            <div className="text">
                <div className="text__text">
                    {letter.text}
                </div>
            </div>
        </div>

        // </div>
    );
};

export default Letter;