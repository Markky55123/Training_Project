// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import SkeletonLoader from './SkeletonLoader';
import PlanetCard from './PlanetCard'; 

const Home = () => {
    const [allPlanets, setAllPlanets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 6; 

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const url = `https://www.swapi.tech/api/planets?page=1&limit=82`;

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data from SWAPI.tech');
                }
                return res.json();
            })
            .then(data => {
                if (data && Array.isArray(data.results)) {
                    const detailedFetches = data.results.map(char => 
                        fetch(char.url)
                            .then(res => res.json())
                            .then(detailData => detailData.result.properties)
                            .catch(err => {
                                console.error(`Failed to fetch detail for ${char.name}:`, err);
                                return null; 
                            })
                    );

                    Promise.all(detailedFetches)
                        .then(detailedCharacters => {
                            setAllPlanets(detailedCharacters.filter(Boolean)); 
                            setIsLoading(false);
                        });

                } else {
                    throw new Error('Invalid data format from API');
                }
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []); 

    const filteredPlanets = allPlanets.filter(planet => 
        planet && planet.name && planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastPlanet = currentPage * charactersPerPage;
    const indexOfFirstPlanet = indexOfLastPlanet - charactersPerPage;
    const currentPlanets = filteredPlanets.slice(indexOfFirstPlanet, indexOfLastPlanet);

    const totalPages = Math.ceil(filteredPlanets.length / charactersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCardClick = (planetId) => {
        console.log(`Clicked on planet with ID: ${planetId}`);
    };

    if (isLoading) {
        return (
            <div className="star-wars-container">
                <SkeletonLoader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="star-wars-container">
                <p className="no-data-message">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="star-wars-container">
            <h1 className="star-wars-heading">Star Wars Universe</h1>
            <div className="controls-wrapper">
                <div className="search-container">
                    <label htmlFor="search-input">Search Planets:</label>
                    <input
                        id="search-input"
                        type="text"
                        placeholder="e.g., Tatooine"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); 
                        }}
                    />
                </div>
                <div className="pagination-container">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
            {currentPlanets.length > 0 ? (
                <div className="character-cards-grid">
                    {currentPlanets.map((planet, index) => (
                        <PlanetCard
                            key={index}
                            planet={planet}
                        />
                    ))}
                </div>
            ) : (
                <p className="no-data-message">No planets found. May the Force be with you!</p>
            )}
        </div>
    );
};

export default Home;