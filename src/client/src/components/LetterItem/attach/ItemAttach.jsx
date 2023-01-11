import React, {createRef, useMemo, useState} from 'react';
import {flagsIcons} from "../../../assets/icons";
import Icons from "../../../assets/icons/Icons";
import './ItemAttach.sass';
import Portal from "./Portal";
import AttachDropdown from "../attachDropdown/AttachDropdown";
import {useFetching} from "../../../hooks/useFetching";
import AttachmentService from "../../../api/AttachmentService";

/**
 * Компонент иконки-кнопки для отображения вложений письма в списке писем.
 *
 * При клике открывает оверлей со списком вложений в письмо.
 * @param {object} letterDoc - массив вложений или вложение
 * @returns {JSX.Element}
 * @constructor
 */
const ItemAttach = ({letterDoc}) => {

    const [coords, setCoords] = useState({});
    const [isOn, setOn] = useState(false);
    const iconRef = createRef();
    const [elem, setElem] = useState(null);

    const [attachments, setAttachments] = useState(null)
    const [attachDoc, isAttachDocLoading, attachDocError] = useFetching(async (myDoc) => {
        const attachParams = await AttachmentService.getAttachesParams(myDoc);
        setAttachments(attachParams)
    })

    const updateDropdownCoords = (ref) => {
        console.log('Обновление координат')
        const rect = ref.getBoundingClientRect();
        setCoords({
            left: rect.x,
            top: rect.y + rect.height / 2
        });
    };

    const attachIconArr = document.getElementsByClassName('attach-item');
    const onClick = (e) => {
        // setOn(!isOn)
        if (!(/*e.target.contains(elem) ||*/ elem.contains(e.target))) {
            setOn(!isOn)
            console.log('Скрываем поповер')
            // console.log(e.target.contains(elem), elem.contains(e.target))
        } /*else {
            // setOn(!isOn)
            console.log(e.target.contains(elem), elem.contains(e.target))
            console.log('Клик не в элемент')
        }*/
        document.removeEventListener('click', onClick);
        Object.entries(attachIconArr)
            .map(([k, v]) => {
                v.removeEventListener('click', onClick)
            })
        // console.log('DEBUG Все слушатели удалены')
    };

    useMemo(() => {
        if (isOn) {
            attachDoc(letterDoc.img)
            document.addEventListener('click', onClick);
            Object.entries(attachIconArr)
                .map(([k, v]) => {
                    v.addEventListener('click', onClick)
                })
            // console.log('DEBUG Все слушатели установлены')
        }
    }, [attachIconArr, isOn]);

    const onItemAttachClick = (event) => {
        event.stopPropagation();
        if (!isOn) {
            updateDropdownCoords(iconRef.current)
            setElem(event.target)
            console.log('Показываем поповер')
        } else {
            console.log('Скрываем поповер')
        }
        setOn(!isOn)
    };

    return (
        <div className="attach-item" ref={iconRef}>
            <div className={`attach-item__icon ${isOn && "active"}`}
                 onClick={(event) =>
                     onItemAttachClick(event)
                 }>
                <Icons name={flagsIcons.attach}
                       width="20"
                       height="20"
                       className="attach-item__icon__icon"/>
            </div>
            {isOn &&
                <Portal>
                    <AttachDropdown attachments={attachments}
                                    coords={coords}
                                    updateDropdownCoords={() =>
                                        updateDropdownCoords(iconRef.current)
                                    }
                                    closeDropdown={() => setOn(!isOn)}
                    />
                </Portal>
            }
        </div>
    );
};

export default ItemAttach;