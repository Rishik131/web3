import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import React from 'react';
import logo from '../../../images/images/logo.png';



const Navbar = () => {
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" />
      </div>
      <ul className="text-white md:flex hiddent list-none flex-row justify-between items-center flex-initial">

      </ul>
    </nav>
  )
}

export default Navbar;