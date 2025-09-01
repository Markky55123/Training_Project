import React, { useState, useEffect } from 'react';
import "../../css/Home.css"; 

const Home = () => {
    const [allCharacters, setAllCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const charactersPerPage = 6; 

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const url = `https://www.swapi.tech/api/people?page=1&limit=82`;

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
                            setAllCharacters(detailedCharacters.filter(Boolean)); 
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

    const filteredCharacters = allCharacters.filter(char => 
        char && char.name && char.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

    const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);

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

    const handleCardClick = (characterId) => {
        console.log(`Clicked on character with ID: ${characterId}`);
    };

    if (isLoading) {
        return (
            <div className="star-wars-container">
                <p className="no-data-message">Loading characters... May the Force be with you.</p>
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
                    <label htmlFor="search-input">Search Characters:</label>
                    <input
                        id="search-input"
                        type="text"
                        placeholder="e.g., Luke Skywalker"
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
            {currentCharacters.length > 0 ? (
                <div className="character-cards-grid">
                    {currentCharacters.map((char, index) => (
                        <div
                            key={index}
                            className="character-card"
                            onClick={() => setOpenModal(true)}
                        >
                            <h3>{char.name}</h3>
                            <p><strong>Gender:</strong> {char.gender}</p>
                            {/* <p><strong>Homeworld:</strong> {char.homeworld}</p> */}
                            <p><strong>Skin Color:</strong> {char.skin_color}</p>
                            <p><strong>Hair Color:</strong> {char.hair_color}</p>
                            {/* <p><strong>Species:</strong> {char.species && char.species.length > 0 ? char.species[0] : 'N/A'}</p> */}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-data-message">No characters found. May the Force be with you!</p>
            )}
            {/* {openModal (
                
                )
            } */}
        </div>
    );
};

export default Home;