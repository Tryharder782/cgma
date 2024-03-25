import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CubeScene from './Pages/MainScene/CubeScene';
import CubeSceneWrapper from './Pages/MainScene/CubeSceneWrapper';
import NavbarWrapper from './Pages/Components/NavbarWrapper';
import './style/Navbar.scss'
import Contacts from './Pages/Contacts/Contacts';
import About from './Pages/About/About';
import ChewingMuscle from './Pages/Chewing/ChewingMuscle';
import { SceneProvider } from './Pages/MainScene/Scenecontext';
import Registration from './Pages/Registration/Registration';

function App() {
    return (
        <SceneProvider>
        <Router>
            <NavbarWrapper />
            <Routes>
                <Route path="/Main" element={<CubeSceneWrapper />} />
                <Route path="/Chewing" element={<ChewingMuscle />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contacts" element={<Contacts />} />
                <Route path="/Registration" element={<Registration />} />
                {/* Добавьте дополнительные маршруты здесь */}
            </Routes>
        </Router>
        </SceneProvider>
    );
}

export default App;
