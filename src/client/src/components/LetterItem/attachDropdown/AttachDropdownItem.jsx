import React, {useEffect, useRef, useState} from 'react';
import Portal from "../../Portal";
import AttachmentService from "../../../api/AttachmentService";

/**
 * Компонент списка AttachDropdown. Отображает данные вложения. При наведении открывает предпросмотр вложения.
 * @param attach
 * @param newCoords
 * @param updateCoords
 * @returns {JSX.Element}
 * @constructor
 */
const AttachDropdownItem = ({attach, newCoords, updateCoords}) => {

    const itemRef = useRef()

    const [isPreviewShown, setIsPreviewShown] = useState(false);

    useEffect(() => {
        updateCoords()
    }, [isPreviewShown])

    useEffect(() => {
        setTimeout(() => {
            if (itemRef.current) {
                itemRef.current.addEventListener('mouseover', () => setIsPreviewShown(true))
                itemRef.current.addEventListener('mouseout', () => setIsPreviewShown(false))
                // console.log('!!! Слушатели установлены')
            }
        }, 100);
    }, [itemRef])

    return (
        <div ref={itemRef}
             className="attach-dropdown-overlay__item"
        >
            <div className="attach-dropdown-overlay__item__icon">
                <img src={attach.url} alt=""/>
            </div>
            <div className="attach-dropdown-overlay__item__text">
                <span>{`${attach.name} ${AttachmentService.getHumanFileSize(Number.parseInt(attach.size))}`}</span>
            </div>
            <Portal>
                <div style={{...newCoords}}
                     className={`attach-dropdown-overlay__item__preview ${isPreviewShown && "show-preview"}`}
                >
                    <img src={attach.url} alt=""/>
                </div>
            </Portal>
        </div>
    );
};

export default AttachDropdownItem;