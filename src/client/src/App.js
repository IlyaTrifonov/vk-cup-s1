import './styles/style.sass'
import LargeSidebar from "./components/sidebar/LargeSidebar";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {SettingsContext} from "./context/SettingsContext";
import {useContext} from "react";

function App() {

    const {settingsIsOpen, setSettingsIsOpen} = useContext(SettingsContext);

    return (
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
    );
}

export default App;
