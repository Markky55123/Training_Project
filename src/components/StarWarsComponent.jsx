import React, { useState, useEffect } from 'react';
import '../css/StarWarsComponent.css';

function StarWarsComponent() {
    const [allStarships, setAllStarships] = useState(null);
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [headers, setHeaders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const endpoint = 'starships';

    useEffect(() => {
        const fetchAllData = async () => {
            // setLoading(true);
            try {
                const listResponse = await fetch(`https://swapi.tech/api/${endpoint}?page=${currentPage}&limit=10`);
                if (!listResponse.ok) {
                    throw new Error('Network response for list was not ok');
                }
                const listResult = await listResponse.json();
                
                const starshipList = listResult.results;

                const detailedStarships = await Promise.all(
                    starshipList.map(async (item) => {
                        const detailResponse = await fetch(item.url);
                        if (!detailResponse.ok) {
                            throw new Error(`Network response for ${item.name} was not ok`);
                        }
                        const detailResult = await detailResponse.json();
                        return {
                            uid: item.uid,
                            ...detailResult.result.properties
                        };
                    })
                );

                if (detailedStarships.length > 0) {
                    const firstItem = detailedStarships[0];
                    const keysToExclude = ['uid', 'url', 'pilots', 'films', 'created', 'edited'];
                    const allKeys = Object.keys(firstItem).filter(key => !keysToExclude.includes(key));
                    setHeaders(allKeys);
                } else {
                    setHeaders([]);
                }
                
                setAllStarships(detailedStarships);
                console.log('Fetching data for page:', detailedStarships);

            } catch (err) {
                setError(err);
            // } finally {
            //     setLoading(false);
            }
        };

        fetchAllData();
    }, [currentPage]);

    useEffect(() => {
        if (allStarships) {
            const filteredStarships = allStarships.filter(item => {
                const passengers = parseInt(item.passengers, 10);
                const searchNumber = parseInt(searchTerm, 10);
                if (!isNaN(searchNumber)) {
                    return passengers >= searchNumber;
                }
                return true;
            });
            setData(filteredStarships);
        }
    }, [allStarships, searchTerm]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(1, prevPage - 1));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="star-wars-container">
            <h2 className="star-wars-heading">Star Wars Starships (Page {currentPage})</h2>
            <div className="search-container">
                <label htmlFor="searchFilter">Filter by Min. Passengers: </label>
                <input
                    id="searchFilter"
                    type="number"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter min passengers"
                />
            </div>
            {data && Array.isArray(data) && headers.length > 0 ? (
                <div className="table-container">
                    <table className="star-wars-table">
                        <thead>
                            <tr>
                                {headers.map(header => (
                                    <th key={header}>
                                        {header.replace(/_/g, ' ').toUpperCase()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.uid}>
                                    {headers.map(header => (
                                        <td key={`${item.uid}-${header}`}>
                                            {item[header]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="no-data-message">No starships found matching your criteria.</p>
            )}
            <div className="pagination-container">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default StarWarsComponent;