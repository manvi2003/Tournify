// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBack, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineGroups } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";

const Sidebar = ({ activeTab, onTabClick }) => {
  return (
    <div className="w-1/6 bg-blue-100 pt-6 min-h-screen flex flex-col items-center">
      <Link to="/home">
        <button className="w-48 py-2 mb-4 text-xl font-semibold text-white uppercase bg-blue-400 rounded-lg hover:bg-blue-300 hover:text-gray-600">
          <div className="flex flex-row mx-10">
            <IoArrowBack className="my-1 mx-2" size={20} />
            Back
          </div>
        </button>
      </Link>
      <ul className="mt-8">
        <li>
          <div
            onClick={() => onTabClick("details")}
            className={`w-60 py-2 mb-4 cursor-pointer text-xl font-semibold text-center ${
              activeTab === "details"
                ? "bg-[#C0E2E7]"
                : "text-blue-400 hover:bg-blue-200 hover:text-gray-600"
            }`}
          >
            <div className="flex flex-row mx-16">
              <IoSettingsOutline className="my-1 mx-2" size={20} />
              Details
            </div>
          </div>
        </li>
        <li>
          <div
            onClick={() => onTabClick("teams")}
            className={`w-full py-2 mb-4 cursor-pointer text-xl font-semibold text-center ${
              activeTab === "teams"
                ? "bg-[#C0E2E7]"
                : "text-blue-400 hover:bg-blue-200 hover:text-gray-600"
            }`}
          >
            <div className="flex flex-row mx-16">
              <MdOutlineGroups className="my-1 mx-2" size={20} />
              Teams
            </div>
          </div>
        </li>
        <li>
          <div
            onClick={() => onTabClick("fixture")}
            className={`w-full py-2 mb-4 cursor-pointer text-xl font-semibold text-center ${
              activeTab === "fixture"
                ? "bg-[#C0E2E7]"
                : "text-blue-400 hover:bg-blue-200 hover:text-gray-600"
            }`}
          >
            <div className="flex flex-row mx-16">
              <GrSchedules className="my-1 mx-2" size={20} />
              Fixture
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;