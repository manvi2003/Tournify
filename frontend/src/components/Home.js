import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from '../Urls';

const Home = () => {
  const [tournaments, setTournaments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/tournaments`
        );
        setTournaments(response.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center m-10 ">
        <input
          type="text"
          className="w-3/4 p-2 border bg-blue-200 border-gray-300 rounded-lg"
          placeholder="Search for an existing tournament..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Link to="/create-tournament">
          <button className="cursor-pointer float-right m-5 mr-7 w-60 h-12 rounded-lg bg-blue-400 justify-between py-2 px-4 text-lg font-semibold uppercase text-white hover:bg-blue-300 hover:text-black">
            Create Tournament
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
        {filteredTournaments.map((tournament) => (
          <div
            key={tournament._id}
            className="p-4 bg-blue-200 shadow-lg rounded-lg"
          >
            <Link to={`/tournament/${tournament.name}/details`}>
              <h3 className="text-xl font-semibold text-center text-blue-400 mb-2">
                {tournament.name}
              </h3>
              <p className="text-gray-600 text-center">
                {tournament.description}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
