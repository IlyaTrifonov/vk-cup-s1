import React from 'react';
import './AppBackground.sass';

/**
 * Компонент фона всего приложения.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const AppBackground = ({children}) => {
    return (
        <div className="app-background-element">
            {children}
        </div>
    );
};

export default AppBackground;