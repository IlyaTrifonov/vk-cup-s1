import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from "./provider/ThemeProvider";
import SettingsMenu from "./components/settingsMenu/SettingsMenu";
import AppBackground from "./components/appBackground/AppBackground";
import SettingsProvider from "./provider/SettingsProvider";
import LanguageProvider from "./provider/LanguageProvider";

/**
 * Главный рут-контейнер всего приложения.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LanguageProvider>
        <ThemeProvider>
            <SettingsProvider>
                <AppBackground>
                    <App/>
                    <div className="portal-overlay" id="portal-overlay"/>
                    <SettingsMenu/>
                </AppBackground>
            </SettingsProvider>
        </ThemeProvider>
    </LanguageProvider>
);
