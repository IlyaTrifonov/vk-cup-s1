import React, {useContext} from 'react';
import Icons from "../../../assets/icons/Icons";
import {uiIcons} from "../../../assets/icons";
import {MailContext} from "../../../context/MailContext";

const FilterDropdownItem = ({filter}) => {

    const {setFilterByName} = useContext(MailContext);

    const [filterKey, {value, icon, name}] = filter;

    const clickHandler = (event) => {
        // event.stopPropagation();
        setFilterByName(filterKey)
    }

    return (
        <div className="filter-item"
             onClick={(event) => clickHandler(event)}>
            <div className="filter-item__check">
                {value &&
                    <Icons
                        name={uiIcons.done_sign}
                        width='16'
                        height='16'
                        className='filter-item__check__check'/>
                }
            </div>
            {icon &&
                <div className="filter-item__icon">
                    <Icons name={icon}
                           width="16"
                           height="16"
                           className={`filter-item__icon__${filterKey}`}/>
                </div>
            }
            <div className="filter-item__text">
                {name}
            </div>
        </div>
    );
};

export default FilterDropdownItem;