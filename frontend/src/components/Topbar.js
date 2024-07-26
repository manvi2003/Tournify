import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_white.png';
// import { MdOutlineSupportAgent } from "react-icons/md";

const Topbar = () => {
  return (
    <div className="top-bar text-white">
        <Link to="/">
            <div className="ml-1 my-2 place-content-start w-10 h-10">
            <img src={logo} alt="Logo" />
            </div>
        </Link>
        <div className='mx-5 my-2 font-bold text-3xl'>Tournify</div>
        {/* <div>
        <MdOutlineSupportAgent size={30} className='mr-3 place-items-end' />
        </div>
        <div className='place-items-end'>Support</div> */}
    </div>
  )
}

export default Topbar;