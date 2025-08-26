import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Card from './components/Card'
import CardEmployee from './components/EmployeeCard'
import { system } from './config/config'
import StarWarsComponent from './components/StarWarsComponent'
import Home from './components/Home'
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
            </Routes>
        </Router>
    );
}

export default App
