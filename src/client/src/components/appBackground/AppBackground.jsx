import React, {useContext} from 'react';
import './AppBackground.sass';
import {animeColor, ThemeContext} from '../../context/ThemeContext';
import ServerStaticsService from '../../api/ServerStaticsService';

/**
 * Компонент фона всего приложения.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const AppBackground = ({children}) => {

	const {themeObj} = useContext(ThemeContext);
	let background = {};
	if (themeObj.color === animeColor) {
		const picUrl = ServerStaticsService.animeBackgroundImage;
		background = {
			background: `linear-gradient(180deg, rgba(117, 0, 69, 0.64) 0%, rgba(0, 9, 83, 0.64) 100%), url(${picUrl}), #FFFFFF`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover'
		};
	}

	return (
		<div className="app-background-element" style={background}>
			{children}
		</div>
	);
};

export default AppBackground;
