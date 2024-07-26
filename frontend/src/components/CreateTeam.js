import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTeam = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [captain, setCaptain] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState(['']);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tournaments');
        setTournaments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTournaments();
  }, []);

  const handleMemberChange = (index, event) => {
    const newMembers = [...members];
    newMembers[index] = event.target.value;
    setMembers(newMembers);
  };

  const handleAddMember = () => {
    setMembers([...members, '']);
  };

  const handleRemoveMember = (index) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/teams', {
        name,
        college,
        captain,
        mobile,
        email,
        members,
        tournamentId: selectedTournament
      });

      console.log(response.data);
      // Clear the form fields
      setName('');
      setCollege('');
      setCaptain('');
      setMembers(['']);
      setMobile('');
      setEmail('');
      // Set success message
      setSuccessMessage('Team added successfully!');
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      setSuccessMessage(''); // Clear any previous success messages
    }
  };

  return (
    <div>
      <h2>Add Team</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tournament</label>
          <select value={selectedTournament} onChange={(e) => setSelectedTournament(e.target.value)} required>
            <option value="">Select Tournament</option>
            {tournaments.map((tournament) => (
              <option key={tournament._id} value={tournament._id}>{tournament.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Team Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Captain</label>
          <input type="text" value={captain} onChange={(e) => setCaptain(e.target.value)} required />
        </div>
        <div>
          <label>Members</label>
          {members.map((member, index) => (
            <div key={index}>
              <input
                type="text"
                value={member}
                onChange={(e) => handleMemberChange(index, e)}
                required
              />
              {index > 0 && <button type="button" onClick={() => handleRemoveMember(index)}>Remove</button>}
            </div>
          ))}
          <button type="button" onClick={handleAddMember}>Add Member</button>
        </div>
        <div>
          <label>Mobile</label>
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>
        <div>
          <label>College</label>
          <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} required />
        </div>
        <div>
          <label>Email ID</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Add Team</button>
      </form>
      <button onClick={() => window.location.href = '/'} style={{ marginTop: '20px' }}>Back to Home</button>
    </div>
  );
};

export default CreateTeam;