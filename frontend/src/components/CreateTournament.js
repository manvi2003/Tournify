import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateTournament = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tournaments",
        { name, description, startDate }
      );
      console.log(response.data);

      setName("");
      setDescription("");
      setStartDate("");

      setSuccessMessage("Tournament created successfully!");
      setErrorMessage("");
      navigate("/home");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex items-start mt-20 justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-blue-100 border border-blue-400 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-400">New Tournament</h2>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Tournament Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-3 bg-blue-250 border-b-2 border-blue-400 placeholder-blue-400 text-xl"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 pt-3 pb-12 bg-blue-250 border-b-2 border-blue-400 placeholder-blue-400 text-xl"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Start Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-3 bg-blue-250 border-b-2 border-blue-400 placeholder-blue-400 text-xl"
              required
            />
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

export default CreateTournament;
