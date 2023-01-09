import React, {createRef, useMemo, useState} from 'react';
import {flagsIcons} from "../../../assets/icons";
import Icons from "../../../assets/icons/Icons";
import './ItemAttach.sass';
import Portal from "./Portal";
import AttachDropdown from "./AttachDropdown";
import classes from "./AttachDropdown.module.css";


const ItemAttach = ({letterID}) => {
    /*
        const rootEl = useRef(null);
        useEffect(() => {
            if (isShownDropdown) {
                const onClick = e => rootEl.current.contains(e.target) || setIsShownDropdown(false);
                document.addEventListener('click', onClick);
                return () => document.removeEventListener('click', onClick);
            }
        }, [isShownDropdown]);
    */
    /*
        const portalRootElement = document.getElementById("portal-overlay");

        const myDropdown = useMemo(() => document.createElement("div"))
        const myDropdown = document.createElement("div")
        myDropdown.innerText = letter;
    */
    /*
        useEffect(() => {
            portalRootElement.appendChild(myDropdown);
            console.log("Вмонтировался дропдаун")
            return () => {
                portalRootElement.removeChild(myDropdown);
                console.log("Размонтировался дропдаун")
            }
        }, [])
    */

    const [coords, setCoords] = useState({});
    const [isOn, setOn] = useState(false);
    const iconRef = createRef()

    const [elem, setElem] = useState(null)

    /*
        const clickHandler = (target) => {
            // event.stopPropagation();
            console.log('Кликнул')

            const rect = target.getBoundingClientRect();
            setCoords({
                left: rect.x /!*+ rect.width / 2*!/,
                top: rect.y /!*+ window.scrollY*!/
            });
            setOn(!isOn);

            // portalRootElement.appendChild(myDropdown);
            // console.log("Вмонтировался дропдаун", letter)
        }
    */

    // const myID = classes.my_attachM

    const updateTooltipCoords = (ref) => {
        console.log('Обновление координат')
        const rect = ref.getBoundingClientRect();
        setCoords({
            left: rect.x,
            top: rect.y + rect.height / 2
        });
    };

    // const elem = document.getElementById(myID)
    const attachIconArr = document.getElementsByClassName('attach-item');
    // console.log(attachIconArr)
    const onClick = (e) => {
        // console.log(e.target)
        // console.log(elem)
        // console.warn("Кликнутые равны", e.target.contains(elem), elem.contains(e.target))
        // if (e.target !== elem) {
        // setOn(!isOn)

        if (!(e.target.contains(elem) || elem.contains(e.target))) {
            // console.log('клик вне компонента');
            setOn(!isOn)
            console.log('Скрываем поповер')


        } else {
            // console.log('клик в компонент')
            // setOn(!isOn)
        }
        document.removeEventListener('click', onClick);
        Object.entries(attachIconArr)
            // .filter(([k, v]) => elem.contains(v))
            .map(([k, v]) => {
                v.removeEventListener('click', onClick)
            })
        console.log('DEBUG Все слушатели удалены')
    }
    useMemo(() => {
        // console.log('Зависимости обновились')
        if (isOn) {
            // console.log('Модалка включена', isOn)
            document.addEventListener('click', onClick);
            Object.entries(attachIconArr)
                // .filter(([k, v]) => v !== elem)
                // .filter(([k, v]) => elem.contains(v))
                .map(([k, v]) => {
                    // if (v !== elem)
                    v.addEventListener('click', onClick)
                })
            console.log('DEBUG Все слушатели установлены')
        } /*else {
            document.removeEventListener('click', onClick);
            Object.entries(attachIconArr).map(([k, v]) => {
                v.removeEventListener('click', onClick)
            })
            console.log('DEBUG Все слушатели удалены')
        }*/ else {
            // console.log('Модалка выключена', isOn)
        }
    }, [attachIconArr, isOn])
    /*
        useEffect(() => {
            if (!isOn)
                return () => {
                    document.removeEventListener('click', onClick);
                    Object.entries(attachIconArr).map(([k, v]) => {
                        v.removeEventListener('click', onClick)
                    })
                    console.log('DEBUG Все слушатели удалены')
                }
        }, [isOn])
    */


    return (
        <div className="attach-item" ref={iconRef} id={classes.my_attachM}>
            <div className="attach-item__icon"
                 onClick={(event) => {
                     event.stopPropagation();
                     if (!isOn) {
                         updateTooltipCoords(iconRef.current)
                         setElem(event.target)
                         // setElem(iconRef)
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
                        {letterID}
                    </AttachDropdown>
                </Portal>
            }
            {/*
            <div className={`attach-item__attaches-dropdown ${isShownDropdown && "shown-dropdown"}`}>
                <ul>
                    <li>Вложение 1</li>
                    <li>Вложение 2</li>
                </ul>
            </div>
*/}
        </div>
    );
};

export default ItemAttach;