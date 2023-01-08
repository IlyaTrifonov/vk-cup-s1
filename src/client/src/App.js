// import './styles/App.css';
import './styles/style.sass'
import React from "react";
import LargeSidebar from "./components/sidebar/LargeSidebar";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

export const ThemeContext = React.createContext(null);

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <div className="content">
                    <LargeSidebar/>
                    <AppRouter/>
                </div>
            </BrowserRouter>
        </div>

    );
}

export default App;
