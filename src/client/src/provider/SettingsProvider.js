import React, {useState} from 'react';
import {SettingsContext} from "../context/SettingsContext";

const SettingsProvider = ({children}) => {

    const [settingsIsOpen, setSettingsIsOpen] = useState(false);

    return (
        <SettingsContext.Provider value={{settingsIsOpen, setSettingsIsOpen}}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;