import React from 'react';
import './Navbar.sass'
import {ReactComponent as Logo} from "../../assets/svg/logo.svg";
import FilterButton from "./FilterButton";

/**
 * Компонент навбара. Отображает навбар :)
 * @returns {JSX.Element}
 * @constructor
 */
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-container">
                <a className="navbar__logo" href="/">
                    <Logo/>
                </a>
                <FilterButton/>
            </div>
        </div>
    );
};

export default Navbar;