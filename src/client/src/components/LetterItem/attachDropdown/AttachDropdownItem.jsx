import React, {useEffect, useRef, useState} from 'react';
import Portal from "../attach/Portal";

const AttachDropdownItem = ({attach, newCoords, updateCoords}) => {

    const itemRef = useRef()

    // const [coords, setCoords] = useState({});
    const [isPreviewShown, setIsPreviewShown] = useState(false);

/*
    const updateItemCoords = (ref) => {
        // console.log('Обновление координат')
        const rect = ref.getBoundingClientRect();
        setCoords({
            left: rect.x,
            top: rect.y + rect.height / 2
        });
    };

    useEffect(() => {
        if (itemRef.current)
            updateItemCoords(itemRef.current)
    }, [isPreviewShown])
*/

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
        return () => {
            // console.log('REF Размонтированиe', !!itemRef.current)
        }
    },[itemRef])

    return (
        <div ref={itemRef}
             className="attach-dropdown-overlay__item"
             // id="attach-dropdown-overlay__item__preview__ID"
        >
            <div className="attach-dropdown-overlay__item__icon">
                <img src={attach.url} alt=""/>
            </div>
            <div className="attach-dropdown-overlay__item__text">
                <span>{`${attach.name} ${attach.size}`}</span>
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