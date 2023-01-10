import React, {createRef, useMemo, useState} from 'react';
import {flagsIcons} from "../../../assets/icons";
import Icons from "../../../assets/icons/Icons";
import './ItemAttach.sass';
import Portal from "./Portal";
import AttachDropdown from "./AttachDropdown";
import classes from "./AttachDropdown.module.css";
import {useFetching} from "../../../hooks/useFetching";
import AttachmentService from "../../../api/AttachmentService";

/**
 * Компонент иконки-кнопки для отображения вложений письма в списке писем.
 *
 * При клике открывает оверлей со списком вложений в письмо.
 * @param {number} letterID - идентификатор письма
 * @param {object[], object} letterDoc - массив вложений или вложение
 * @returns {JSX.Element}
 * @constructor
 */
const ItemAttach = ({letterID, letterDoc}) => {

    const [docs, setDocs] = useState(null);
    const [coords, setCoords] = useState({});
    const [isOn, setOn] = useState(false);
    const iconRef = createRef();
    const [elem, setElem] = useState(null);

    const [attachDoc, isAttachDocLoading, attachDocError] = useFetching(async (letterDocX) => {
        const attachParams = await AttachmentService.getAttachParams(letterDocX.img);
        console.log(attachParams)
        setDocs(attachParams)
    })

    const updateTooltipCoords = (ref) => {
        console.log('Обновление координат')
        const rect = ref.getBoundingClientRect();
        setCoords({
            left: rect.x,
            top: rect.y + rect.height / 2
        });
    };

    const attachIconArr = document.getElementsByClassName('attach-item');
    const onClick = (e) => {
        if (!(e.target.contains(elem) || elem.contains(e.target))) {
            setOn(!isOn)
            console.log('Скрываем поповер')
        }
        document.removeEventListener('click', onClick);
        Object.entries(attachIconArr)
            .map(([k, v]) => {
                v.removeEventListener('click', onClick)
            })
        // console.log('DEBUG Все слушатели удалены')
    }
    useMemo(() => {
        if (isOn) {
            document.addEventListener('click', onClick);
            Object.entries(attachIconArr)
                .map(([k, v]) => {
                    v.addEventListener('click', onClick)
                })
            // console.log('DEBUG Все слушатели установлены')
        }
    }, [attachIconArr, isOn])

    return (
        <div className="attach-item" ref={iconRef} id={classes.my_attachM}>
            <div className="attach-item__icon"
                 onClick={(event) => {
                     event.stopPropagation();
                     if (!isOn) {
                         attachDoc(letterDoc)
                         updateTooltipCoords(iconRef.current)
                         setElem(event.target)
                         console.log('Показываем поповер')
                     } else {
                         console.log('Скрываем поповер')
                     }
                     setOn(!isOn)
                 }}>
                <Icons name={flagsIcons.attach}
                       width="20"
                       height="20"
                       className="attach-item__icon__icon"/>
            </div>
            {isOn &&
                <Portal>
                    <AttachDropdown coords={coords}
                                    updateTooltipCoords={() =>
                                        updateTooltipCoords(iconRef.current)
                                    }
                                    closeTooltip={() => setOn(!isOn)}
                    >
                        {docs ?
                            `${docs.name} ${docs.size}`
                            : 'Загрузка...'
                        }
                    </AttachDropdown>
                </Portal>
            }
        </div>
    );
};

export default ItemAttach;