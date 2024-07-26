import React from "react";
import { Link } from "react-router-dom";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { ImEnter } from "react-icons/im";

const LandingPage = () => {
  return (
    <div>
      <div className="flex flex-row">
        <img src="../assets/home.png" className="w-1/2 my-10 ml-12" />
        <div className="font-bold text-7xl mt-20 ml-8">
          Plan your next tournament with Tournify
          <div className="flex flex-row mt-16">
            <TbRosetteDiscountCheckFilled size={40} color="3EA5D1" />
            <div className="text-lg m-1">Quick and easy match scheduler</div>
          </div>
          <div className="flex flex-row mt-4 mb-8">
            <TbRosetteDiscountCheckFilled size={40} color="3EA5D1" />
            <div className="text-lg m-1">Quick and easy</div>
          </div>
          <Link to="/home">
            <button 
                className="cursor-pointer w-60 h-14 rounded-lg bg-blue-400 justify-between py-2 px-4 text-lg font-semibold uppercase text-white hover:bg-blue-300 hover:text-black"
            >
                <div className="flex flex-row place-items-between ml-2 mt-1">
                Explore Tournify
                <ImEnter className="ml-3 my-2" />
                </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
