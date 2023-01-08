import React, {useEffect, useState} from 'react';
import Icons from "../../assets/icons/Icons";
import {bookmarkIcons} from "../../assets/icons";

const ItemFlag = ({bookmark, important}) => {
    const [isBookmark, setIsBookmark] = useState(bookmark || false)
    const [isImportant, setIsImportant] = useState(important || false)

    // useEffect(() => {
    //     console.log('isBookmark:', isBookmark)
    // }, [isBookmark])

    return (
        <div className="item-flag"
             onClick={(event) => {
                 event.stopPropagation()
                 setIsBookmark(!isBookmark)
             }}>
            <input type="checkbox"
                   checked={isBookmark}
                   readOnly
                   className="item-flag__checkbox"/>
            <div className="item-flag__flag">
                {isBookmark ?
                    <Icons name={bookmarkIcons.bookmark}
                           width="20"
                           height="20"
                           className="item-flag__flag--flagged"/>
                    : isImportant ?
                        <Icons name={bookmarkIcons.important_mark}
                               width="20"
                               height="20"
                               className="item-flag__flag--important"/>
                        : null
                }
                {!isBookmark ?
                    <Icons name={bookmarkIcons.bookmark_outline}
                           width="20"
                           height="20"
                           className="item-flag__flag--not-flagged"/>
                    : null
                }



                {/*
                <Icons name={bookmarkIcons.important_mark}
                       width="20"
                       height="20"
                       className="item-flag__flag--important"/>
*/}

                {/*
                {isBookmark ?
                    <Icons name={bookmarkIcons.bookmark}
                           width="20"
                           height="20"
                           className="item-flag__flag--flagged"/>
                    : isImportant ?
                        <Icons name={bookmarkIcons.important_mark}
                               width="20"
                               height="20"
                               className="item-flag__flag--important"/>
                        :
                        <Icons name={bookmarkIcons.bookmark_outline}
                               width="20"
                               height="20"
                               className="item-flag__flag--not-flagged"/>
                }
*/}
            </div>
        </div>
    );
};

export default ItemFlag;