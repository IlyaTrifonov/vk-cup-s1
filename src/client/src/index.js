import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from "./provider/ThemeProvider";
import SettingsMenu from "./components/settingsMenu/SettingsMenu";
import BackgroundWithProvider from "./components/background/BackgroundWithProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
        <BackgroundWithProvider>
            <App/>
            <SettingsMenu/>
        </BackgroundWithProvider>
    </ThemeProvider>
);
