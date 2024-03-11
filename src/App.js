import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CubeScene from './Pages/MainScene/CubeScene';
import CubeSceneWrapper from './Pages/MainScene/CubeSceneWrapper';
import NavbarWrapper from './Pages/Components/NavbarWrapper';
import './style/Navbar.scss'
import Contacts from './Pages/Contacts/Contacts';
import About from './Pages/About/About';
import ChewingMuscle from './Pages/Chewing/ChewingMuscle';

function App() {
    return (
        <Router>
            <NavbarWrapper />
            <Routes>
                <Route path="/" element={<CubeSceneWrapper />} />
                <Route path="/Chewing" element={<ChewingMuscle />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contacts" element={<Contacts />} />
                {/* Добавьте дополнительные маршруты здесь */}
            </Routes>
        </Router>
    );
}

export default App;
