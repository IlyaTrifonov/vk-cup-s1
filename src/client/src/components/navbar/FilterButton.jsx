import React, {createRef, useMemo, useState} from 'react';
import Icons from "../../assets/icons/Icons";
import {bookmarkIcons, flagsIcons} from "../../assets/icons";
import Portal from "../LetterItem/attach/Portal";
import FilterDropdown from "./filterDropdown/FilterDropdown";

const FilterButton = () => {

    const [isOpen, setIsOpen] = useState(false)

    const filterRef = createRef();

    const [filter, setFilter] = useState({
        isUnread: false,
        isFlagged: false,
        isWithAttachment: false
    })

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
            {filter.isWithAttachment &&
                <div className="filter-flag">
                    <Icons name={flagsIcons.attach}
                           width="16"
                           height="16"
                           className="filter-flag__attach"/>
                </div>
            }
            {filter.isFlagged &&
                <div className="filter-flag">
                    <Icons name={bookmarkIcons.bookmark}
                           width="16"
                           height="16"
                           className="filter-flag__bookmark"/>
                </div>
            }
            {filter.isUnread &&
                <div className="filter-flag">
                    <div className="filter-flag__unread">Н</div>
                </div>
            }
            Фильтр
            <Icons name={flagsIcons.chevron_down}
                   width="20"
                   height="20"
                   className="sidebar-folder__icon"
            />
            {isOpen &&
                <Portal>
                    <FilterDropdown coords={coords}
                                    filter={filter}
                                    setFilter={setFilter}
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