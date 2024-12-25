import "./App.css";
import "./index.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateTeam from "./components/CreateTeam";
import CreateTournament from "./components/CreateTournament";
import Home from "./components/Home";
import Topbar from "./components/Topbar";
import LandingPage from "./components/LandingPage";

const Details = lazy(() => import("./components/Details"));

function App() {
  return (
    <Router>
      <div className="App">
        <Topbar />
        <Suspense
          fallback={<div className="text-base font-bold m-10">Loading...</div>}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Add more routes as needed */}
            <Route path="/create-team" element={<CreateTeam />} />
            <Route path="/create-tournament" element={<CreateTournament />} />
            <Route path="/tournament/:name/*" element={<Details />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
