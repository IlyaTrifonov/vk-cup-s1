import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from "./provider/ThemeProvider";
import SettingsMenu from "./components/settingsMenu/SettingsMenu";
import AppBackground from "./components/appBackground/AppBackground";
import SettingsProvider from "./provider/SettingsProvider";
import LanguageProvider from "./provider/LanguageProvider";
import MailProvider from "./provider/MailProvider";

/**
 * Главный рут-контейнер всего приложения.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LanguageProvider>
        <ThemeProvider>
            <SettingsProvider>
                <MailProvider>
                    <AppBackground>
                        <App/>
                        <div className="portal-overlay" id="portal-overlay"/>
                        <SettingsMenu/>
                    </AppBackground>
                </MailProvider>
            </SettingsProvider>
        </ThemeProvider>
    </LanguageProvider>
);
