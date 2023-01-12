import './styles/style.sass'
// import React from "react";
import LargeSidebar from "./components/sidebar/LargeSidebar";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {SettingsContext} from "./context/SettingsContext";

function App() {
    return (
        <SettingsContext.Consumer>
            {({settingsIsOpen, setSettingsIsOpen}) => (
                <div className={`App ${settingsIsOpen && 'app-minimized'}`}>
                    <BrowserRouter>
                        <Navbar/>
                        <div className="content">
                            <LargeSidebar setSettingsIsOpen={setSettingsIsOpen}/>
                            <AppRouter/>
                        </div>
                    </BrowserRouter>
                    <div className="portal-overlay" id="portal-overlay"/>
                </div>
            )}
        </SettingsContext.Consumer>
    );
}

export default App;
