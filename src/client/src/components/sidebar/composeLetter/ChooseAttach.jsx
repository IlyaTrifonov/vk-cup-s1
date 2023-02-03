import React, {useContext} from 'react';
import Button, {buttonTypes} from '../../UI/buttons/Button/Button';
import {uiIcons} from '../../../assets/icons';
import './ChooseAttach.sass';
import Icons from '../../../assets/icons/Icons';
import AttachmentService from '../../../api/AttachmentService';
import {MailContext} from '../../../context/MailContext';
import {LanguageContext} from '../../../context/LanguageContext';

const ChooseAttach = () => {

  const {composeLetter, setComposeLetter} = useContext(MailContext);
  const {language} = useContext(LanguageContext);

  const variants = [
    language.letterCompose.attaches.file,
    language.letterCompose.attaches.files,
    language.letterCompose.attaches.files2,
  ];
  const chooseWordForm = (number) => {
    if (language.languageName === 'ru') {
      const cases = [2, 0, 1, 1, 1, 2];
      const index = (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5];
      return variants[index];
    } else {
      if (number > 1) {
        return language.letterCompose.attaches.files;
      } else {
        return language.letterCompose.attaches.file;
      }
    }
  };

  const handleInputChange = (e) => {
    const acceptedFiles = Array.from(e.target.files).filter((file) =>
      /\.(jpe?g|png)$/i.test(file.name)
    );
    setComposeLetter({...composeLetter, attachments: [...composeLetter.attachments, ...acceptedFiles]});
  };

  const handleDeselect = (index) => {
    const newComposeAttachments = [...composeLetter.attachments];
    newComposeAttachments.splice(index, 1);
    setComposeLetter({...composeLetter, attachments: newComposeAttachments});
  };

  const handleDeleteAll = () => {
    setComposeLetter({...composeLetter, attachments: []});
  };

  return (
    <div className="choose-attach-button">
      <Button type={buttonTypes.tertiary}
              icon={uiIcons.attach}
              size="20"
              onClick={() => document.getElementById('file-input').click()}>
        {language.letterCompose.attachFileButtonName}
      </Button>
      <input type="file"
             id="file-input"
             multiple
             accept=".jpg,.jpeg,.png"
             onChange={(e) => handleInputChange(e)}/>

      <div className="attach-preview">
        <div className="attach-preview__thumbnails">
          {composeLetter.attachments.map((image, index) => (
            <div key={index} className="thumbnail__item">
              <div className="thumbnail__item__item-container">
                <img src={URL.createObjectURL(image)}
                     alt=""
                     className="thumbnail__item__item"
                     draggable={false}/>
                <div className="thumbnail__item__item-info">
                  {AttachmentService.getHumanFileSize(image.size)}
                </div>
              </div>
              <button type="button"
                      onClick={() => handleDeselect(index)}
                      className="thumbnail__item__deselect">
                <Icons name={uiIcons.small_cross}
                       width="20"
                       height="20"
                       className="thumbnail__item__deselect__icon"/>
              </button>
            </div>
          ))}
        </div>

        {composeLetter.attachments.length > 0 && (
          <div className="attach-preview__info">
            <span>{composeLetter.attachments.length} {chooseWordForm(composeLetter.attachments.length)}, </span>
            <span>({AttachmentService.getHumanFileSize(composeLetter.attachments.reduce((acc, curr) => acc + curr.size, 0))}) </span>
            <span onClick={handleDeleteAll}
                  className="attach-preview__info__delete-button">
              {language.letterCompose.deleteAllButtonName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseAttach;
