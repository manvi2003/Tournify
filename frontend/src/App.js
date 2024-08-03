import "./App.css";
import "./index.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import CreateTeam from "./components/CreateTeam";
import CreateTournament from "./components/CreateTournament";
import Home from "./components/Home";
import Topbar from "./components/Topbar";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Topbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Add more routes as needed */}
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/create-tournament" element={<CreateTournament />} />
          <Route path="/tournament/:name/*" element={<Details />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
