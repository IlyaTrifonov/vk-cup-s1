import React, {useState} from 'react';
import {MailContext} from "../context/MailContext";
import {useFetching} from "../hooks/useFetching";
import MailService from "../api/MailService";

const MailProvider = ({children}) => {

    const [letters, setLetters] = useState([])

    const [filter, setFilter] = useState({
        isUnread: false,
        isFlagged: false,
        isWithAttachment: false
    })

    const [fetchLetters, isLettersLoading, lettersError] = useFetching(async (folder) => {
        const response = await MailService.getLettersFromFolder(folder, 1500, 0);
        const data = await response.json();
        setLetters(data)
    })

    const getLetters = (folder) => {
        fetchLetters(folder)
    }


    return (
        <MailContext.Provider value={{letters, getLetters}}>
            {children}
        </MailContext.Provider>
    );
};

export default MailProvider;