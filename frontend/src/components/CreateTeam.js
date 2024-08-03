import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from '../Urls';

const CreateTeam = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [captain, setCaptain] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/tournaments`
        );
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
    setMembers([...members, ""]);
  };

  const handleRemoveMember = (index) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/teams`, {
        name,
        college,
        captain,
        mobile,
        email,
        members,
        tournamentId: selectedTournament,
      });

      console.log(response.data);
      // Clear the form fields
      setName("");
      setCollege("");
      setCaptain("");
      setMembers([""]);
      setMobile("");
      setEmail("");
      // Set success message
      setSuccessMessage("Team added successfully!");
      setErrorMessage(""); // Clear any previous error messages
      navigate(`/tournament/${tournaments.find(t => t._id === selectedTournament).name}/teams`);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="flex items-start mt-14 justify-center min-h-screen">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-blue-100 border border-blue-400 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-400">New Team</h2>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                value={selectedTournament}
                onChange={(e) => setSelectedTournament(e.target.value)}
                className="w-full px-3 py-3 text-blue-400 bg-blue-250 border-b-2 border-blue-400 placeholder-blue-400 text-xl"
                required
              >
                <option value="">Select Tournament</option>
                {tournaments.map((tournament) => (
                  <option key={tournament._id} value={tournament._id}>
                    {tournament.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Team Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-3 bg-blue-250 border-b-2 border-blue-400 placeholder-blue-400 text-xl"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="College"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3 py-3 bg-blue-250 border-b-2 border-blue-400 placeholder-blue-400 text-xl"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Captain"
                value={captain}
                onChange={(e) => setCaptain(e.target.value)}
                className="w-full px-3 py-3 bg-blue-250 border-b-2 border-blue-400 placeholder-blue-400 text-xl"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-3 bg-blue-250 border-b-2 border-blue-400 placeholder-blue-400 text-xl"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 bg-blue-250 border-b-2 border-blue-400 placeholder-blue-400 text-xl"
                required
              />
            </div>
          </div>
          <div>
            {members.map((member, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Member"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e)}
                  className="w-full px-3 py-3 bg-blue-250 border-b-2 border-blue-400 placeholder-blue-400 text-xl"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="ml-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMember}
              className="mt-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300"
            >
              Add Member
            </button>
          </div>
          <div className="flex flex-row">
            <Link to="/home">
              <button className="w-40 py-2 mt-4 ml-5 text-lg font-semibold text-white uppercase bg-blue-400 rounded-lg hover:bg-blue-300 hover:text-gray-600">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="w-40 py-2 mt-4 ml-5 text-lg font-semibold text-white uppercase bg-blue-400 rounded-lg hover:bg-blue-300 hover:text-gray-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;