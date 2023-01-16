import React, {useEffect, useState} from 'react';

/**
 * Компонент метки прочитывания письма. Используется в компоненте списка писем для отображения статуса прочитывания.
 * @param isRead
 * @returns {JSX.Element}
 * @constructor
 */
const ReadMark = ({isRead}) => {
    const [isLetterRead, setIsLetterRead] = useState(isRead || false)

    return (
        <div className="read-mark"
             onClick={(event) => {
                 event.stopPropagation()
                 setIsLetterRead(!isLetterRead)
             }}>
            <input checked={!isLetterRead}
                   readOnly
                   className="read-mark__checkbox"
                   type="checkbox"/>
            <div className="read-mark__mark"/>
        </div>
    );
};

export default ReadMark;