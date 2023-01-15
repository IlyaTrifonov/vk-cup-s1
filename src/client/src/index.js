import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from "./provider/ThemeProvider";
import SettingsMenu from "./components/settingsMenu/SettingsMenu";
import AppBackground from "./components/appBackground/AppBackground";
import SettingsProvider from "./provider/SettingsProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
        <SettingsProvider>
            <AppBackground>
                <App/>
                <div className="portal-overlay" id="portal-overlay"/>
                <SettingsMenu/>
            </AppBackground>
        </SettingsProvider>
    </ThemeProvider>
);
