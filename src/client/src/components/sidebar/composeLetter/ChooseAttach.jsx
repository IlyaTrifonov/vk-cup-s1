import React, {useState} from 'react';
import Button, {buttonTypes} from '../../UI/buttons/Button/Button';
import {uiIcons} from '../../../assets/icons';
import './ChooseAttach.sass';
import Icons from '../../../assets/icons/Icons';
import AttachmentService from '../../../api/AttachmentService';

const ChooseAttach = () => {

  const variants = ['файл', 'файла', 'файлов'];
  const chooseWordForm = (number, variants) => {
    const cases = [2, 0, 1, 1, 1, 2];
    const index = (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5];
    return variants[index];
  };

  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const acceptedFiles = Array.from(e.target.files).filter((file) =>
      /\.(jpe?g|png)$/i.test(file.name)
    );
    setImages([...images, ...acceptedFiles]);
  };

  const handleDeselect = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleDeleteAll = () => {
    setImages([]);
  };

  return (
    <div className="choose-attach-button">
      <Button type={buttonTypes.tertiary}
              icon={uiIcons.attach}
              size="20"
              onClick={() => document.getElementById('file-input').click()}>
        Прикрепить файл
      </Button>
      <input type="file"
             id="file-input"
             multiple
             accept=".jpg,.jpeg,.png"
             onChange={(e) => handleInputChange(e)}/>

      <div className="attach-preview">
        <div className="attach-preview__thumbnails">
          {images.map((image, index) => (
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

        {images.length > 0 && (
          <div className="attach-preview__info">
            <span>{images.length} {chooseWordForm(images.length, variants)}, </span>
            <span>({AttachmentService.getHumanFileSize(images.reduce((acc, curr) => acc + curr.size, 0))}) </span>
            <span onClick={handleDeleteAll}
                  className="attach-preview__info__delete-button">
              удалить все
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseAttach;
