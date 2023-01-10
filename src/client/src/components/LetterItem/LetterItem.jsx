import React, {useState} from 'react';
import './LetterItem.sass';
import ReadMark from "./ReadMark";
import ItemFlag from "./ItemFlag";
import Icons from "../../assets/icons/Icons";
import {flags} from "./flags";
import UserAvatar from "./UserAvatar";
import SelectLetter from "./SelectLetter";
import {useNavigate} from "react-router-dom";
import {getDateString} from "../dateParse";
import ItemAttach from "./attach/ItemAttach";

const LetterItem = ({letter}) => {

    const [isCheckedLetter, setIsCheckedLetter] = useState(false)
    const router = useNavigate()

    return (
        <div className={`letter-item ${isCheckedLetter ? 'checked-letter' : ''}`}
             onClick={() => router(`/letter/${letter.id}`)}
        >
            <ReadMark isRead={letter.read}/>
            <UserAvatar avatar={letter.author.avatar} isHidden={isCheckedLetter}/>
            <SelectLetter isCheckedLetter={isCheckedLetter} setIsCheckedLetter={setIsCheckedLetter}/>

            <div className="letter-container">
                <div className="letter-content">
                    <div className="correspondent">
                        <span className={`correspondent-name-surname ${letter.read ? "" : "unread"}`}>
                            {letter.author.name} {letter.author.surname}
                        </span>
                    </div>

                    <ItemFlag bookmark={letter.bookmark} important={letter.important}/>

                    <div className="letter-fragment">
                        <span className={`tittle ${letter.read ? "" : "unread"}`}>{letter.title}</span>
                        <span className="text">{letter.text}</span>
                    </div>
                    <div className="secondary-data">
                        {letter.flag &&
                            <Icons name={flags[letter.flag]}
                                   width="20"
                                   height="20"
                                   className="secondary-data__flag-icon"/>
                        }
                        {letter.doc && <ItemAttach letterID={letter.id} letterDoc={letter.doc}/>}
                    </div>
                    <div className="item-date">{getDateString(letter.date)}</div>
                </div>
            </div>
            <div className="delimiter">
                <div className="delimiter__lane"></div>
            </div>
        </div>
    );
};

export default LetterItem;