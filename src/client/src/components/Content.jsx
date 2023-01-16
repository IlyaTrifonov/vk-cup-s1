import React, {useState} from 'react';
import Sidebar from "./sidebar/Sidebar";
import LetterList from "./LetterList/LetterList";

const Content = ({folder}) => {
    // const [selectedFolder, setSelectedFolder] = useState(folders[0].name ? folders[0].name : null)
    const [selectedFolder, setSelectedFolder] = useState(folder)

    return (
        <div className="content">
            <Sidebar selectedFolder={selectedFolder}
                     setSelectedFolder={setSelectedFolder}/>
            <LetterList folder={selectedFolder}/>
        </div>
    );
};

export default Content;