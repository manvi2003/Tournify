import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Fixture = () => {
  const { name } = useParams();
  const [numTeams, setNumTeams] = useState(
    parseInt(localStorage.getItem("numTeams")) || 0
  );
  const [teams, setTeams] = useState([]);
  const [fixture, setFixture] = useState(
    JSON.parse(localStorage.getItem("fixture")) || []
  );
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    localStorage.setItem("numTeams", numTeams);
  }, [numTeams]);

  useEffect(() => {
    localStorage.setItem("fixture", JSON.stringify(fixture));
  }, [fixture]);

  const handleNumTeamsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumTeams(value);
    generateFixture(value);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generateFixture = (num) => {
    if (teams.length < num) {
      setErrorMessage("Not enough teams to generate the fixture.");
      setFixture([]);
      return;
    }

    setErrorMessage(""); // Clear any previous error messages

    const shuffledTeams = shuffleArray([...teams]);
    const matches = [];

    for (let i = 0; i < num / 2; i++) {
      matches.push([shuffledTeams[i * 2], shuffledTeams[i * 2 + 1]]);
    }

    setFixture(matches);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Fixture</h2>
      <div className="mb-4">
        <label htmlFor="numTeams" className="mr-2">Number of Teams:</label>
        <select
          id="numTeams"
          value={numTeams}
          onChange={handleNumTeamsChange}
          className="px-4 py-2 border bg-blue-100 border-gray-300 rounded-lg"
        >
          <option value={0}>Select number of teams</option>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
        </select>
      </div>
      {errorMessage && (
        <div className="mb-4 text-red-500">{errorMessage}</div>
      )}
      <div>
        {fixture.length > 0 && (
          <div>
            {fixture.map((match, index) => (
              <div key={index} className="mb-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-lg font-semibold">Match {index + 1}</p>
                  <p>
                    {match[0] ? match[0].name : "TBD"} vs {match[1] ? match[1].name : "TBD"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fixture;