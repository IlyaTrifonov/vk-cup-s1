import React from 'react';
import './AppBackground.sass';

const AppBackground = ({children}) => {
    return (
        <div className="app-background-element">
            {children}
        </div>
    );
};

export default AppBackground;