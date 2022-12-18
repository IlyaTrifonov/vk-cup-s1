// import './styles/App.css';
import './styles/style.sass'
import React, {useState} from "react";
import LargeSidebar from "./components/sidebar/LargeSidebar";
import Navbar from "./components/navbar/Navbar";
import LetterList from "./components/LetterList/LetterList";
import {folders} from "./components/sidebar/folders";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

export const ThemeContext = React.createContext(null);

function App() {
    // const [theme, setTheme] = useState("light");


    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
{/*
                <div className="content">
                    <LargeSidebar selectedFolder={selectedFolder}
                                  setSelectedFolder={setSelectedFolder}/>
                    <AppRouter/>
                </div>
*/}
            </BrowserRouter>
        </div>

    );
}

export default App;
