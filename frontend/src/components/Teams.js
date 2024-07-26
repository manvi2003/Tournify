import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Teams = () => {
  const { name } = useParams();
  const [teams, setTeams] = useState([]);

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

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team._id} className="mb-2">
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;