import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo-container">
                <Link to="/" className="navbar-brand">
                    Star Wars !!
                </Link>
            </div>
            <ul className="navbar-links">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/starships" className="navbar-link">Starships</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/planets" className="navbar-link">Planets</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/films" className="navbar-link">films</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;