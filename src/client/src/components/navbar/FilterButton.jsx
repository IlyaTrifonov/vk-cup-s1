import React, {createRef, useContext, useMemo, useState} from 'react';
import Icons from "../../assets/icons/Icons";
import {uiIcons} from "../../assets/icons";
import Portal from "../Portal";
import FilterDropdown from "./filterDropdown/FilterDropdown";
import {LanguageContext} from "../../context/LanguageContext";
import {MailContext, noFilterKey} from "../../context/MailContext";

/**
 * Компонент кнопки фильтров. Открывает список фильтров в компоненте FilterDropdown.
 * @returns {JSX.Element}
 * @constructor
 */
const FilterButton = () => {

    const {language} = useContext(LanguageContext);
    const {filters, filterButtonName} = useContext(MailContext);

    const filterRef = createRef();
    const [isOpen, setIsOpen] = useState(false)
    const [coords, setCoords] = useState({});

    const updateDropdownCoords = (ref) => {
        // console.log('Обновление координат')
        const rect = ref.getBoundingClientRect();
        setCoords({
            left: rect.x + rect.width,
            top: rect.y + rect.height
        });
    };

    const onFilterButtonClick = (event) => {
        event.stopPropagation();
        if (!isOpen) {
            updateDropdownCoords(filterRef.current)
            document.removeEventListener('click', onClick);
        }
        setIsOpen(!isOpen)
    };

    const onClick = () => {
        setIsOpen(!isOpen)
        document.removeEventListener('click', onClick);
        // console.log('слушатели удалены')
    };

    useMemo(() => {
        if (isOpen) {
            document.addEventListener('click', onClick);
            // console.log('слушатели установлены')
        }
    }, [isOpen]);

    return (
        <div className="filter-button"
             ref={filterRef}
             onClick={(event) => {
                 onFilterButtonClick(event)
             }}>
            {Object.entries(filters).map(([filterKey, params]) =>
                params.value && filterKey !== noFilterKey &&
                <div className="filter-flag" key={filterKey}>
                    <Icons name={params.icon}
                           width="16"
                           height="16"
                           className={`filter-flag__icon__${filterKey}`}/>
                </div>
            )}
            <div className="filter-button__text">
                {/*{language.letterList.filter.filterButtonName}*/}
                {filterButtonName}
            </div>
            <Icons name={uiIcons.chevron_down}
                   width="20"
                   height="20"
                   className="sidebar-folder__icon"
            />
            {isOpen &&
                <Portal>
                    <FilterDropdown coords={coords}
                                    filters={filters}
                                    updateDropdownCoords={() =>
                                        updateDropdownCoords(filterRef.current)
                                    }
                                    closeDropdown={() => setIsOpen(!isOpen)}
                    />
                </Portal>
            }
        </div>
    );
};

export default FilterButton;