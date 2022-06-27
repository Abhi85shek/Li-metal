import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../logo.png";
const Navbar = () => {
  return (
    <div>
        <nav className="bg-slate-400 border-vlack-200 px-2 sm:px-4 py-2.5 text-white">
        <div className="flex flex-wrap justify-between items-center mx-auto">
        <a href="#" className="flex">
            <img src={logo} alt="Logo" />
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white"></span>
        </a> 
    <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li>
          <Link to="/">Home</Link>
        </li>
         <li>
          <Link to="/supplier">Suppliers</Link>
        </li>
        <li>
          <Link to="/createOrder">Create Order</Link>
        </li> 
        <li>
          <Link to="/allProducts">All Products</Link>
        </li>
        <li>
          <Link to="/signout">Sign Out</Link>
        </li>
      </ul>
    </div>
    </div>
  </nav>
    </div>
  )
}

export default Navbar