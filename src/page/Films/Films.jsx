import React, { useState, useEffect } from 'react';

export default function Films() {
  const [allFilms, setAllFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const filmsResponse = await fetch('https://www.swapi.tech/api/films');
        if (!filmsResponse.ok) {
          throw new Error('Network response for films was not ok');
        }
        const filmsResult = await filmsResponse.json();
        const filmsArray = filmsResult.result;

        const detailedFilms = filmsArray.map(item => ({
            uid: item.uid,
            ...item.properties,
        }));
        
        setAllFilms(detailedFilms);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) {
    return <p className="loading-message">Loading films...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error.message}</p>;
  }
  
  return (
    <div>
      {allFilms.length > 0 ? (
        <div className="table-container">
          <table className="star-wars-table">
            <thead>
              <tr>
                {Object.keys(allFilms[0]).map((header) => (
                  <th key={header}>{header.replace(/_/g, ' ').toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFilms.map((item) => (
                <tr key={item.uid}>
                  {Object.keys(allFilms[0]).map((header) => (
                    <td key={`${item.uid}-${header}`}>{item[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data-message">No films found.</p>
      )}
    </div>
  );
}