import './styles/style.sass'
import Sidebar from "./components/sidebar/Sidebar";
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
                    <Sidebar setSettingsIsOpen={setSettingsIsOpen}/>
                    <AppRouter/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
