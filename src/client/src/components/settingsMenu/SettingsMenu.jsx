import React, {useContext, useEffect, useState} from 'react';
import './SettingsMenu.sass';
import {SettingsContext} from '../../context/SettingsContext';
import Icons from '../../assets/icons/Icons';
import {uiIcons} from '../../assets/icons';
import SettingsMenuSidebar from './settingsMenuSidebar/SettingsMenuSidebar';
import SettingsMenuMain from './settingsMenuMain/SettingsMenuMain';
import {menuPages} from './MenuPages';

/**
 * Компонент меню настроек почты. Является контейнером для всех компонентов настроек.
 * @returns {JSX.Element}
 * @constructor
 */
const SettingsMenu = () => {

	const {settingsIsOpen, setSettingsIsOpen} = useContext(SettingsContext);

	const [currentPage, setCurrentPage] = useState(menuPages.appearance);

	const closeSettingsMenu = () => {
		document.removeEventListener('click', closeSettingsMenu);
		setSettingsIsOpen(false);
	};

	useEffect(() => {
		if (settingsIsOpen) {
			document.addEventListener('click', closeSettingsMenu);
		}
	}, [settingsIsOpen]);

	return (
		<div className={`settings-menu ${settingsIsOpen && 'open-settings-menu'}`}
			 onClick={(e) => e.stopPropagation()}>
			<div className="settings-menu-container">
				<div className="settings-menu__controls">
					<div className="settings-menu__controls__control"
						 onClick={() => setSettingsIsOpen(false)}>
						<Icons
							name={uiIcons.cross}
							width="16"
							height="16"
							className="s_icon"
						/>
					</div>
				</div>
				<SettingsMenuSidebar currentPage={currentPage}
									 setCurrentPage={setCurrentPage}/>
				<SettingsMenuMain currentPage={currentPage}/>
			</div>
		</div>
	);
};

export default SettingsMenu;
