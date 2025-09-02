import React, { useEffect } from 'react'

function Vehicles() {

    const [allVehicles, setAllVehicles] = ([]);
    const [currentPage, setCurrentPage] = useState(1);
    cont  [isLoading, setIsLoading] = (true);
    const [error, setError] = useState(null);
 

 useEffect(() => {
         setIsLoading(true);
         const url = `https://www.swapi.tech/api/vehicles?page=1&limit=82`;

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
                             setAllVehicles(detailedCharacters.filter(Boolean)); 
                             setIsLoading(false);
                         });
                    
                         console.log('Vehicles Data in Here!',detailedFetches)
 
                 } else {
                     throw new Error('Invalid data format from API');
                 }
             })
             .catch(err => {
                 setError(err.message);
                 setIsLoading(false);
             });
     }, []); 

  return (
    <div className="star-wars-container">
         <h2 className="star-wars-heading">Star Wars Vehicles (Page {currentPage})</h2>
    </div>
  )
}

export default Vehicles