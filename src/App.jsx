import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Card from './components/Card'
import CardEmployee from './components/EmployeeCard'
import { system } from './config/config'
import StarWarsComponent from './page/Starship/StarWarsComponent.jsx'
import Home from './page/Home/Home.jsx'
import Films from './page/Films/Films.jsx'
import Navbar from './components/Navbar'
import Planets from './components/Planet'

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/starships" element={<StarWarsComponent/>} />
                <Route path="/planets" element={<Planets/>} />
                <Route path="/Films" element={<Films/>} />
            </Routes>
        </Router>
    );
}

export default App
