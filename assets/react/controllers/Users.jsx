
import React, { useState, useEffect } from 'react';
import '../../styles/users.css'

export default function Users() {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [currentSearchTerm, setCurrentSearchTerm] = useState('');

    const handleSearch = async () => {
        try {

            const currentTerm = searchTerm;

            //Endpoint call to search the users
            const response = await fetch(`/api/sales_team/search?search=${searchTerm}`);
            const data = await response.json();

            //Overkill logic to ensure endpoint results are handled in all cases.
            if (typeof data === 'object' && !Array.isArray(data)) {
                const dataArray = Object.values(data);
                setSearchResult(dataArray);
            } else if (Array.isArray(data)) {
                setSearchResult(data);
            } else {
                console.error('Invalid data format received from the server:', data);
            }

            setCurrentSearchTerm(currentTerm);

        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };  

    useEffect(() => {
        //Call handleSearch when component mounts, so user can see all users instantly.
        handleSearch();
    }, []);

    return (
        <div className="container">
            <h1>Sales Team</h1>

            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name"
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="results">
                {searchResult.length === 0 ? (
                    <div>No members found by the name of "{currentSearchTerm}".</div>
                ) : (
                    searchResult.map((member) => (
                        <div key={member.id} className="member-card">
                            <h3>{member.name}</h3>
                            <p>Quotes: {member.quotes}</p>
                            <p>Orders: {member.orders}</p>
                            {/* Can add/remove more information if needed. I wasn't sure which information was considered sensitive as I don't understand what a few of the variables represented in the mock data. */}
                            {/* HONOURABLE MENTION: I don't advocate for sending complete user data to frontend from any endpoint. ONLY what's needed. However since idk what some of the variables represent and this is a demo, meh :) */}
                            {/* HONOURABLE MENTION 2: I don't typically comment like this!!! This is only to explain the design choice. */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}