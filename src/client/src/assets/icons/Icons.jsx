import React from 'react';
import IconsSVG from './iconsSprite.svg';
import BookmarkIconsSVG from './bookmarkIconsSprite.svg';
import CategoriesIconsSVG from './flagsIconsSprite.svg';
import {bookmarkIcons, flagsIcons, folderIcons} from "./index";

const Icons = ({name, color, width, height, size, className}) => {

    let source = null
    if (name in folderIcons) {
        source = IconsSVG
    } else if (name in bookmarkIcons) {
        source = BookmarkIconsSVG
    } else if (name in flagsIcons) {
        source = CategoriesIconsSVG
    }

    return (
        <svg className={`${className}`} /*fill={color}*/ /*stroke={color}*/ width={width}
             height={height}>>
            <use xlinkHref={`${source}#${name}`}/>
        </svg>
    );
};

export default Icons;