import React from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import logo from "../logo.png";
import { useContext } from 'react';
import { AuthContext } from '../shared/context/auth-context';
import {BiUser} from 'react-icons/bi'
const Navbar = () => {
  const auth=useContext(AuthContext)
  const navigate=useNavigate()
  const signOutHandler = ()=>{
    auth.logout();
    navigate("/", { replace: true });
  };

  return (
    <div>
        <nav className="bg-[#6BA4B8] border-vlack-200 px-2 sm:pl-4 py-2.5 text-white pr-8">
        <div className="flex flex-wrap justify-between items-center mx-auto">
        <a href="#" className="flex">
           <Link to ="/"> <img src={logo} alt="Logo" /></Link>
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white"></span>
        </a> 
    <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li className='flex flex-row space-x-2 gap-2'>
          <BiUser size={20}/>{auth.userName}
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
         <li>
          <Link to="/allSuppliers">Suppliers</Link>
        </li>
        <li>
          <Link to="/createOrder">Create Order</Link>
        </li> 
        <li>
          <Link to="/allProducts">All Products</Link>
        </li>
        <li>
          <Link to="/login" onClick={signOutHandler}>Sign Out</Link>
        </li>
      </ul>
    </div>
    </div>
  </nav>
    </div>
  )
}

export default Navbar