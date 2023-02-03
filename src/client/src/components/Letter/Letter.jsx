import React, {useContext, useEffect, useState} from 'react';
import './Letter.sass';
import {useParams} from 'react-router-dom';
import {useFetching} from '../../hooks/useFetching';
import MailService from '../../api/MailService';
import ReadMark from '../LetterItem/ReadMark';
import UserAvatar from '../LetterItem/UserAvatar';
import {getDateString} from '../dateParse';
import {flags} from '../LetterItem/flags';
import Icons from '../../assets/icons/Icons';
import {LanguageContext} from '../../context/LanguageContext';
import ItemFlag from '../LetterItem/ItemFlag';
import AttachmentService from '../../api/AttachmentService';
import LetterAttachments from './letterAttach/LetterAttachments';

/**
 * Компонент страницы письма.
 * @returns {unknown}
 * @constructor
 */
const Letter = () => {

  const {language} = useContext(LanguageContext);

  const params = useParams();

  const [letter, setLetter] = useState(null);
  const [attachments, setAttachments] = useState(null);

  const [fetchLetter, isLetterLoading, letterError] = useFetching(async (id) => {
    const response = await MailService.getLetterById(id);
    const data = await response.json();
    setLetter(data);
    if (data.doc?.img) {
      const attachParams = await AttachmentService.getAttachesParams(data.doc.img);
      setAttachments(attachParams);
    }
  });

  let users = language.letterPage.letterToWord;
  if (letter) {
    users += letter.to.map(user => user.name && user.surname ? `${user.name} ${user.surname}` : user.email).join(', ') + '.';
  }

  useEffect(() => {
    fetchLetter(params.id);
  }, []);

  return (
    letter &&
    <div className="letter">
      <div className="letter-container">

        <div className="letter__header">
          <h2 className="letter__tittle">{letter.title}</h2>
          {letter.flag ?
            <div className="letter__flag">
              <Icons name={flags[letter.flag].icon}
                     width="16"
                     height="16"
                     className="secondary-data__flag-icon"/>
              <div className="letter__flag__text">
                {language.common.letterCategories[flags[letter.flag].name]}
              </div>
            </div>
            :
            <div className="letter__flag">
              <div className="letter__flag__text">
                {language.common.letterCategories.noCategory}
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
                <ItemFlag bookmark={letter.bookmark} important={letter.important}/>
              </div>
              <div className="letter__info__info__users">
                <span className="users">{users}</span>
              </div>
            </div>
          </div>
        </div>

        {attachments &&
          <LetterAttachments attachments={attachments}/>
        }

        <div className="text">
          <div className="text__text" dangerouslySetInnerHTML={{__html: letter.text}}>
            {/*{letter.text}*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Letter;
