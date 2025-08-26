import React from 'react';
import '../css/PlanetCard.css'; 
import world from '../assets/world_01.png';
import planet01 from '../assets/planet_01.png';
import planet02 from '../assets/planet_02.jpg';

const planetImages = {
    "Tatooine": world,
    "Alderaan": planet01,
    "Yavin IV": planet02,
    // "Hoth": "https://i.imgur.com/8Qh1n1r.png",
    // "Dagobah": "https://i.imgur.com/a5n9m8d.png",
    // "Bespin": "https://i.imgur.com/G5y7x51.png",
    // "Endor": "https://i.imgur.com/w23f06w.png",
    // "Naboo": "https://i.imgur.com/D4s6s1r.png",
    // "Coruscant": "https://i.imgur.com/F0r1g3t.png",
    // "Kamino": "https://i.imgur.com/L79pLqZ.png",
};

const PlanetCard = ({ planet }) => {
    const imageUrl = planetImages[planet.name] || world; 

    return (
        <div className="planet-card">
            <div className="planet-image-container">
                <img 
                    src={imageUrl} 
                    alt={`${planet.name} planet`} 
                    className="planet-spin" 
                />
            </div>
            <h3>{planet.name}</h3>
            <p><strong>Terrain:</strong> {planet.terrain}</p>
        </div>
    );
};

export default PlanetCard;