import React from 'react';
import FolderIconsSVG from './folderIconsSprite.svg';
import BookmarkIconsSVG from './bookmarkIconsSprite.svg';
import CategoriesIconsSVG from './flagsIconsSprite.svg';
import UiIconsSVG from './uiIconsSprite.svg';
import {bookmarkIcons, categoryIcons, folderIcons, uiIcons} from './index';

const Icons = ({name, color, width, height, size, className}) => {

  let source = null;
  if (name in folderIcons) {
    source = FolderIconsSVG;
  } else if (name in bookmarkIcons) {
    source = BookmarkIconsSVG;
  } else if (name in categoryIcons) {
    source = CategoriesIconsSVG;
  } else if (name in uiIcons) {
    source = UiIconsSVG;
  }

  return (
    <svg className={`${className}`} /*fill={color}*/ /*stroke={color}*/ width={width} height={height}>
      <use xlinkHref={`${source}#${name}`}/>
    </svg>
  );
};

export default Icons;
