import React, { useState, useEffect } from "react";
import { useParams, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../CustomCalendar.css";
import { MdOutlineCalendarMonth, MdOutlineDescription } from "react-icons/md";
import image from '../assets/group.png';
import Sidebar from "./Sidebar";
import Teams from "./Teams";
import Fixture from "./Fixture";

const TournamentDetail = () => {
  const { name } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [tournament, setTournament] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tournaments/name/${name}`
        );
        setTournament(response.data);
      } catch (error) {
        console.error("Error fetching tournament details:", error);
      }
    };

    fetchTournament();
  }, [name]);

  if (!tournament) {
    return <div>Loading...</div>;
  }

  const startDate = new Date(tournament.startDate);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/tournament/${name}/${tab}`);
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <img
          src={image}
          alt={tournament.name}
          className="w-full h-48 object-cover"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-7xl font-semibold text-white">
          {tournament.name}
        </h1>
      </div>
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabClick={handleTabClick} />
        <div className="w-3/4 p-5">
          <Routes>
            <Route
              path="/details"
              element={
                <div className="mx-24 m-14 ">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2">
                      <div className="flex flex-row text-3xl font-semibold text-blue-400 mb-2">
                        <MdOutlineDescription size={30} className="mr-2" />
                        Description
                      </div>
                      <p className="text-xl ml-3">{tournament.description}</p>
                    </div>
                    <div className="w-full md:w-1/2 ml-32">
                      <div className="flex flex-row text-3xl font-semibold text-blue-400 mb-2">
                        <MdOutlineCalendarMonth size={30} className="mr-2" />
                        Start Date
                      </div>
                      <div className="calendar-container mt-4 ml-3">
                        <Calendar
                          value={startDate}
                          tileClassName={({ date, view }) => {
                            if (
                              view === "month" &&
                              date.getTime() === startDate.getTime()
                            ) {
                              return "highlight";
                            }
                          }}
                          className="custom-calendar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/teams" element={<Teams />} />
            <Route path="/fixture" element={<Fixture />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;
