import React, {useEffect} from 'react';
import './FilterDropdown.sass'
import Icons from "../../../assets/icons/Icons";
import {bookmarkIcons, flagsIcons} from "../../../assets/icons";

/**
 * Компонент дропдауна фильтров. Используется для выбора фильтрации.
 * На данный момент функционал неполный.
 * @param coords
 * @param updateDropdownCoords
 * @param closeDropdown
 * @returns {JSX.Element}
 * @constructor
 */
const FilterDropdown = ({
                            coords,
                            updateDropdownCoords, closeDropdown
                        }) => {

    useEffect(() => {
        window.addEventListener("resize", updateDropdownCoords);
        return () => {
            window.removeEventListener("resize", updateDropdownCoords)
        };
    }, []);

    return (
        <div style={{...coords}} className="filter-dropdown">
            <div className="filter-item no-icon">
                <div className="filter-item__text">
                    Все письма
                </div>
            </div>
            <div className="filter-item">
                <div className="filter-item__icon">
                    <div className="filter-flag__unread"></div>
                </div>
                <div className="filter-item__text">
                    Непрочитанные
                </div>
            </div>
            <div className="filter-item">
                <div className="filter-item__icon">
                    <Icons name={bookmarkIcons.bookmark}
                           width="16"
                           height="16"
                           className="filter-flag__bookmark"/>
                </div>
                <div className="filter-item__text">
                    С флажком
                </div>
            </div>
            <div className="filter-item">
                <div className="filter-item__icon">
                    <Icons name={flagsIcons.attach}
                           width="16"
                           height="16"
                           className="filter-flag__attach"/>
                </div>
                <div className="filter-item__text">
                    С вложениями
                </div>
            </div>
        </div>
    );
};

export default FilterDropdown;