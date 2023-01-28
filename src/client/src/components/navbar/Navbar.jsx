import React, {useContext} from 'react';
import './Navbar.sass';
import {ReactComponent as Logo} from '../../assets/svg/logo.svg';
import FilterButton from './FilterButton';
import {useMatch, useNavigate} from 'react-router-dom';
import Icons from '../../assets/icons/Icons';
import {uiIcons} from '../../assets/icons';
import {LanguageContext} from '../../context/LanguageContext';

/**
 * Компонент навбара. Отображает навбар :)
 * @returns {JSX.Element}
 * @constructor
 */
const Navbar = () => {

	const {language} = useContext(LanguageContext);
	const match = useMatch('/letter/:id');
	const navigate = useNavigate();

	return (
		<div className="navbar">
			<div className="navbar-container">
				{match ?
					<div className="go-back-button"
						 onClick={() => navigate(-1)}>
						<Icons name={uiIcons.chevron_left}
							   width="20"
							   height="20"
							   className="go-back-button__icon"/>
						<span className="go-back-button__text">
							{language.letterPage.goBackButtonName}
						</span>
					</div>
					:
					<div className="navbar__logo" onClick={() => navigate('/')}>
						<Logo/>
					</div>
				}
				{!match && <FilterButton/>}
			</div>
		</div>
	);
};

export default Navbar;
