import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Teams = () => {
  const { name } = useParams();
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tournaments/name/${name}`
        );
        const tournamentId = response.data._id;
        const teamResponse = await axios.get(
          `http://localhost:5000/api/tournaments/${tournamentId}/teams`
        );
        setTeams(teamResponse.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [name]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 mx-14">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search teams..."
          className="w-3/4 mt-2 px-4 py-2 border bg-blue-100 border-gray-300 rounded-lg"
        />
        <Link to="/create-team">
          <button className="px-6 py-2 ml-16 bg-blue-400 text-xl font-semibold text-white rounded-lg hover:bg-blue-300">
            CREATE TEAM
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200 mx-14 mt-10">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border-b border-gray-200">Team Name</th>
            <th className="py-2 px-4 border-b border-gray-200">College</th>
            <th className="py-2 px-4 border-b border-gray-200">Captain</th>
            <th className="py-2 px-4 border-b border-gray-200">Mobile</th>
            <th className="py-2 px-4 border-b border-gray-200">Email ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Members</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredTeams.map((team) => (
            <tr key={team._id}>
              <td className="py-2 px-4 border-b border-gray-200">{team.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{team.college}</td>
              <td className="py-2 px-4 border-b border-gray-200">{team.captain}</td>
              <td className="py-2 px-4 border-b border-gray-200">{team.mobile}</td>
              <td className="py-2 px-4 border-b border-gray-200">{team.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">{team.members.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;