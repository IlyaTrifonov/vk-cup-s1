import React, {useEffect, useState} from 'react';

const ReadMark = ({isRead}) => {
    const [isLetterRead, setIsLetterRead] = useState(isRead || false)

/*
    useEffect(() => {
        console.log(`Теперь: ${isLetterRead}`)
    }, [isLetterRead])
*/

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