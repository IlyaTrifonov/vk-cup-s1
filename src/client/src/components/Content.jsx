import React, {useState} from 'react';
import LargeSidebar from "./sidebar/LargeSidebar";
import LetterList from "./LetterList/LetterList";

const Content = ({folder}) => {
    // const [selectedFolder, setSelectedFolder] = useState(folders[0].name ? folders[0].name : null)
    const [selectedFolder, setSelectedFolder] = useState(folder)

    return (
        <div className="content">
            <LargeSidebar selectedFolder={selectedFolder}
                          setSelectedFolder={setSelectedFolder}/>
            <LetterList folder={selectedFolder}/>
        </div>
    );
};

export default Content;