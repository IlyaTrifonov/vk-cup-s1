import React from 'react';
import IconsSVG from './iconsSprite.svg';
import BookmarkIconsSVG from './bookmarkIconsSprite.svg';
import CategoriesIconsSVG from './flagsIconsSprite.svg';
import {bookmarkIcons, flagsIcons, folderIcons} from "./index";

const Icons = ({name, color, width, height, size, className}) => {
    // icon icon-${name}

    let source = null
    if (name in folderIcons) {
        source = IconsSVG
    } else if (name in bookmarkIcons) {
        source = BookmarkIconsSVG
    } else if (name in flagsIcons) {
        source = CategoriesIconsSVG
    }

    // const iconCollections = [folderIcons, bookmarkIcons];
    // iconCollections.forEach(collection => {
    //     if (name in collection)
    //         source =
    // })
    // switch (name) {
    //     case in folderIcons:
    //         source = IconsSVG;
    //         break;
    //     case (name in bookmarkIcons):
    //         source = BookmarkIconsSVG
    //         break;
    // }

    return (
        <svg className={`${className}`} /*fill={color}*/ /*stroke={color}*/ width={width}
             height={height}>>
            <use xlinkHref={`${source}#${name}`}/>
{/*
            {name in folderIcons ?
                // <use xlinkHref={`${IconsSVG}#${name}`}/>
                <use xlinkHref={`${source}#${name}`}/>
                :
                name in bookmarkIcons ?
                    <use xlinkHref={`${BookmarkIconsSVG}#${name}`}/>
                    : null
            }
*/}
        </svg>
    );
};

export default Icons;