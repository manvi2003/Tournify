import React, { useState } from 'react';
import axios from 'axios';

const GenerateFixtures = ({ tournamentId }) => {
    const [venue, setVenue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/tournaments/${tournamentId}/fixtures`, { venue })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Venue"
                onChange={(e) => setVenue(e.target.value)}
                value={venue}
                required
            />
            <button type="submit">Generate Fixtures</button>
        </form>
    );
}

export default GenerateFixtures;
