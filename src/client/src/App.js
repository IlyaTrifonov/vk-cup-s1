import './styles/style.sass'
import React from "react";
import LargeSidebar from "./components/sidebar/LargeSidebar";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

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
            <div className="portal-overlay" id="portal-overlay"/>
        </div>

    );
}

export default App;
