import React, {useState} from 'react';
import './BackgroundWithProvider.sass';
import {SettingsContext} from "../../context/SettingsContext";

const BackgroundWithProvider = ({children}) => {

    const [settingsIsOpen, setSettingsIsOpen] = useState(false);

    return (
        <SettingsContext.Provider value={{settingsIsOpen, setSettingsIsOpen}}>
            <div className="app-background-element">
                {children}
            </div>
        </SettingsContext.Provider>
    );
};

export default BackgroundWithProvider;