import React from 'react';
import Icons from "../../assets/icons/Icons";
import {flagsIcons} from "../../assets/icons";

const SelectLetter = ({isCheckedLetter, setIsCheckedLetter}) => {
    return (
        <div className={`select-letter ${isCheckedLetter && 'show-select-letter'}`}
             onClick={(event) => {
                 event.stopPropagation()
                 setIsCheckedLetter(!isCheckedLetter)
             }}>
            <input className="select-letter__checkbox"
                   type="checkbox"
                   checked={isCheckedLetter}
                   readOnly/>
            <div className="select-letter__checkbox__checkbox">
                <Icons name={flagsIcons.checkbox_check_mark}
                       width="8"
                       height="6"
                       className="select-letter__checkbox__checkbox__checkmark"/>
            </div>
        </div>
    );
};

export default SelectLetter;