import React from 'react';
import './LetterItem.sass';
import ReadMark from "./ReadMark";
import ItemFlag from "./ItemFlag";
import Icons from "../../assets/icons/Icons";
import {flagsIcons} from "../../assets/icons";
import {flags} from "./flags";

const LetterItem = ({letter}) => {

    const avatar = letter.author.avatar || null;
    let flag = letter['flag'] || null;
    if (flag === 'Путешевствия') flag = 'Путешествия' // Какие данные дали, так и адаптируемся)))
    const doc = letter.doc || null;
    // console.log(letter['flagss'])
    // console.log(flag)
    // console.log('Путешествия')
    // console.log(flag === 'Путешествия')
    // console.log('flag:', flags[flag])

    var options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }

    const getDateString = (date) => {
        const nowDate = new Date()
        const letterDate = new Date(date)
        const months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Ноябрь',
            'Декабрь',
        ]

        if (nowDate.toLocaleDateString() === letterDate.toLocaleDateString()) {
            return letterDate.toLocaleTimeString().slice(0, -3);
        }
        if (nowDate.getFullYear() === letterDate.getFullYear()) {
            return `${letterDate.getDay() + 1} ${months[letterDate.getMonth()].slice(0, 3).toLowerCase()}`
        } else {
            const date = letterDate.toLocaleDateString()
            // return letterDate.toLocaleDateString()
            return `${date.slice(0,6)}${date.slice(-2,)}`
        }
    }

    // console.log(letter.date)
    // const nowDate = new Date()
    // const letterDate = new Date(letter.date)
    // console.log(letterDate)
    // console.log(getDateString(letterDate))
    // console.log(letterDate.toLocaleDateString())
    // console.log(letterDate.toLocaleTimeString())
    // console.log()
    // console.log(nowDate.toLocaleDateString())
    // const today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()).valueOf()
    // const letterDateRAW = new Date(letter.date)
    // const letterDay = new Date(letterDateRAW.getFullYear(), letterDateRAW.getMonth(), letterDateRAW.getDate()).valueOf()
    // console.log()


    // console.log('doc:', doc)

    // const flagIcon = flags.;
    // if (!flag) {
    //     flags
    // }
    // const avatar = null;

    // console.log(letter.avatarsdsd)

    return (
        <div className="letter-item">
            <ReadMark isRead={letter.read}/>
            {/*<div className="read_mark">*</div>*/}
            {/*<User author={letter.author}/>*/}
            <div className="user-avatar">
                {avatar ?
                    <img className="user-avatar__avatar" src={avatar} alt="Аватар"/>
                    : null
                }
            </div>
            <div className="select-letter">
                <input className="select-letter__checkbox" type="checkbox"/>
            </div>

            <div className="letter-container">
                <div className="letter-content">
                    <div className="correspondent">
                        {/*<span>Математика для олимпиад по программированию</span>*/}
                        <span
                            className={`correspondent-name-surname ${letter.read ? "" : "unread"}`}>{letter.author.name} {letter.author.surname}</span>
                    </div>

                    <ItemFlag bookmark={letter.bookmark} important={letter.important}/>

                    <div className="letter-fragment">
                        <span className={`tittle ${letter.read ? "" : "unread"}`}>{letter.title}</span>
                        {/*<span className="tittle">Тайтл</span>*/}
                        {/*для олимпиад открывает двери для каждого желающего писать это чудо.*/}
                        <span className="text">{letter.text}</span>
                        {/*<span className="text">s</span>*/}
                    </div>
                    <div className="secondary-data">
                        {flag ?
                            <Icons name={flags[flag]}
                                   width="20"
                                   height="20"
                                   className="secondary-data__flag-icon"/>
                            : null
                        }
                        {doc ?
                            <Icons name={flagsIcons.attach}
                                   width="20"
                                   height="20"
                                   className="secondary-data__flag-icon attachment"/>
                            : null
                        }
                    </div>
                    <div className="item-date">{getDateString(letter.date)}</div>
                </div>
            </div>


            {/*
            <div className="user">

                <div className="avatar">
                </div>

                <div className="name">
                    <span>{letter.author.name} {letter.author.surname}</span>
                </div>
            </div>
*/}
            {/*
            <div className="icon"></div>
            <div className="message-and-icons">
                <div className="message">
                    <div className="text">
                        <div className="theme"></div>
                        <div className="message"></div>
                    </div>
                </div>
                <div className="right">
                    <div className="icons"></div>
                    <div className="date"></div>
                </div>
            </div>
            <div className="border"></div>
*/}
        </div>
    );
};

export default LetterItem;