import React,{useEffect} from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import logo from "../logo.png";
import { useContext } from 'react';
import { AuthContext } from '../shared/context/auth-context';
import {BiUser} from 'react-icons/bi'
import axios from 'axios';
import { useState } from 'react';
import qbConnectModalVisible from '../atoms/qbConnectModalVisible';
import { useRecoilState } from 'recoil';
import QuickbooksAuthModal from './QuickbooksAuthModal';

const Navbar = () => {
  const auth=useContext(AuthContext)
  const [quickBookURLcode,setquickbooksAuthCode]=useState()
  const [qbConnectvisible,setqbConnectModalVisible]=useState(false)
  const navigate=useNavigate()
  const signOutHandler = ()=>{
    auth.logout();
    navigate("/", { replace: true });
  };

  const connectwithquickbooks=async()=>{
    const response = await axios.get(`http://localhost:4000/quickBookAuthorizationUrl`);
    if(response.status === 200){
      const quickBookAuthUrl = response.data.data;
      //check logined status in quick book
      window.location.replace(quickBookAuthUrl)  
      localStorage.setItem('qbConnectVisible','1')  
      
  }
      
    //   let splitedList1 = localStorage.getItem('quickbooksAuthCode').split("&");
    //   let code = splitedList1[0].split("=")[1];
    //   let state = splitedList1[1].split("=")[1];
    //   let realmId = splitedList1[2].split("=")[1];
    //   console.log(code+" "+state +" " + realmId)
    //  const res= await axios.get(`http://localhost:4000/quickBookToken/${code}/${state}/${realmId}`)
    //  console.log(res.data)
    //  if(res.status==200)
    //  {
    //   localStorage.setItem('quickbooksCredentials',res.data)
    //  }

      
  }


const quicksConnect=async()=>{
  console.log("quickbooks auth")
  const response = await axios.get(`http://localhost:4000/quickBookAuthorizationUrl`);
  if(response.status === 200){
      const quickBookAuthUrl = response.data.data;
      //check logined status in quick book
      window.location.replace(quickBookAuthUrl)     
  }
}

const quickbooksSignIn=async()=>{
  const aurthorizedURLcode = window.location.href
      console.log(aurthorizedURLcode)  
      localStorage.setItem('quickbooksAuthCode',aurthorizedURLcode)
      setquickbooksAuthCode(aurthorizedURLcode)
  console.log("inside signin")
  let splitedList1 = localStorage.getItem('quickbooksAuthCode').split("&");
  let code = splitedList1[0].split("=")[1];
  let state = splitedList1[1].split("=")[1];
  let realmId = splitedList1[2].split("=")[1];
  console.log(code+" "+state +" " + realmId)
 const res= await axios.get(`http://localhost:4000/quickBookToken/${code}/${state}/${realmId}`)
 console.log(res.data)
 if(res.status==200)
 {
  localStorage.setItem('quickbooksCredentials',res.data)
  localStorage.setItem('qbConnectVisible','2')
  window.location.reload()
 }
 console.log(localStorage.getItem('quickbooksCredentials'))

}



  return (
    <div>
      {/* {localStorage.getItem('qbConnectVisible')=='1'?<QuickbooksAuthModal/>:null} */}
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
          {localStorage.getItem('qbConnectVisible')==null?
          <button onClick={()=>{connectwithquickbooks()}}>Quickbooks Connect</button>:null
          }
        </li>
        <li>
          {localStorage.getItem('qbConnectVisible')=='1'?
          <button onClick={()=>{quickbooksSignIn()}}>Authorize QB</button>:null
          }
        </li>
        <li>
          {localStorage.getItem('qbConnectVisible')==='2'?
            <button disabled>Connected</button>:null
          }
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
          <Link to="/addService">Service</Link>
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