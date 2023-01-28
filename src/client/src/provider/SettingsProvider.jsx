import React, {useState} from 'react';
import {SettingsContext} from '../context/SettingsContext';

/**
 * Компонент провайдера статуса открытия настроек. Необходим для масштабирования интерфейса.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const SettingsProvider = ({children}) => {

	const [settingsIsOpen, setSettingsIsOpen] = useState(false);

	return (
		<SettingsContext.Provider value={{settingsIsOpen, setSettingsIsOpen}}>
			{children}
		</SettingsContext.Provider>
	);
};

export default SettingsProvider;
