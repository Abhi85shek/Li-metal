import React,{useEffect} from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import logo from "../logo.png";
import { useContext } from 'react';
import { AuthContext } from '../shared/context/auth-context';
import {BiUser} from 'react-icons/bi'
import {SiQuickbooks} from 'react-icons/si'
import axios from 'axios';
import { useState } from 'react';
import { TEST_HOME_PAGE } from '../config/basic';
import qbConnectModalVisible from '../atoms/qbConnectModalVisible';
import { useRecoilState } from 'recoil';
import QuickbooksAuthModal from './QuickbooksAuthModal';

const Navbar = () => {
  const auth=useContext(AuthContext)
  const [quickBookURLcode,setquickbooksAuthCode]=useState()
  const [qbConnectvisible,setqbConnectModalVisible]=useState(false)
const [viewQbMenu,setViewQbMenu ]=useState(false)
let viewAdminMenu=localStorage.getItem('uType')==='admin'?true:false
console.log(viewAdminMenu)
const [viewOrdersMenu,setViewOrdersMenu]=useState(false)
const [toggleAdminMenu,setToggleAdminMenu]=useState(false)

  const navigate=useNavigate()
  const signOutHandler = ()=>{
    auth.logout();
    navigate("/", { replace: true });
  };


  const connectwithquickbooks=async()=>{
    const response = await axios.get(`http://localhost:4000/quickBookAuthorizationUrl`,{

      headers:{

        Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`

      }

    });
    if(response.status === 200){
      const quickBookAuthUrl = response.data.data;
      //check logined status in quick book
      window.location.replace(quickBookAuthUrl)  
      localStorage.setItem('qbConnectVisible','1')  
      
  }
        
  }


  useEffect(()=>{
    setInterval(()=> {localStorage.removeItem('quickbooksCredentials')
  console.log('removed')}, 3600000);
  },[])



  useEffect(()=>{
   if(localStorage.getItem('quickbooksCredentials')===null && localStorage.getItem('qbConnectVisible')==='2')
    {
      // localStorage.removeItem('qbConnectVisible')
      window.location.reload()
    }
  },[localStorage.getItem('quickbooksCredentials')])

const quicksConnect=async()=>{
  console.log("quickbooks auth")
  const response = await axios.get(`http://localhost:4000/quickBookAuthorizationUrl`,{

    headers:{

      Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`

    }

  });
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
  console.log(code+" "+state +" "+realmId)
 const res= await axios.get(`http://localhost:4000/quickBookToken/${code}/${state}/${realmId}`,{

  headers:{

    Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`

  }

})
 console.log(res.data)
 if(res.status==200)
 {
  localStorage.setItem('quickbooksCredentials',res.data.data)
  localStorage.setItem('qbConnectVisible','2')
  window.location.reload()
 }
 console.log(localStorage.getItem('quickbooksCredentials'))

}

const disconnectQuickbooks=()=>{
  localStorage.removeItem('qbConnectVisible')
  localStorage.removeItem('quickbooksAuthCode')
  localStorage.removeItem('quickbooksCredentials')
  window.location.reload()
  window.location.href=TEST_HOME_PAGE

}



  return (
    <div>
      {/* {localStorage.getItem('qbConnectVisible')=='1'?<QuickbooksAuthModal/>:null} */}
        <nav className="bg-[#6BA4B8] border-vlack-200 px-2 sm:pl-4 py-2.5 text-white pr-8">
        <div className="flex flex-wrap justify-between items-center mx-auto">
        <a href="#" className="flex">
           <Link to ="/home"> <img src={logo} alt="Logo" /></Link>
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white"></span>
        </a> 
    <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium items-center">
      <li>
          {localStorage.getItem('qbConnectVisible')==null || (localStorage.getItem('qbConnectVisible')=='1' && window.location.href.split('?').length!=2 ) ?
          <div  onClick={()=>{connectwithquickbooks()}}className='flex justufy-center hover:cursor-pointer items-center space-x-2 p-2 rounded-md bg-neutral-100 text-[#4d7e90] font-bold'>
            <SiQuickbooks size={24}/>
          <button  >Quickbooks Connect</button>
          </div>:null
          }
        </li>
        <li>
          {localStorage.getItem('qbConnectVisible')=='1' && window.location.href.split('?').length==2?
          <div onClick={()=>{quickbooksSignIn()}} className='hover:cursor-pointer flex justufy-center items-center space-x-2 p-2 rounded-md bg-neutral-100 text-[#4d7e90] font-bold'>
            <SiQuickbooks size={24}/>
           <button  >Authorize QB</button>
          </div>:null
          }
        </li>
        <li>
          {
             localStorage.getItem('qbConnectVisible')==='2'?
           <div className='flex justufy-center items-center space-x-2 p-2 rounded-md bg-green-500 text-neutral-100 font-bold'>
            <SiQuickbooks size={24}/>
            <button disabled>Connected</button>
            </div>:null
            }
          
        </li>
        <li className='flex flex-row space-x-2 gap-2'>
          <BiUser size={20}/>{auth.userName}
        </li>
       
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {viewAdminMenu?
            <li>
            
             <div onClick={()=>{setToggleAdminMenu(!toggleAdminMenu);setViewQbMenu(false);setViewOrdersMenu(false)}} className='justufy-center hover:cursor-pointer items-center space-x-2 p-2 rounded-md text-neutral-100 font-bold'>
            Admin
            {toggleAdminMenu?
            <div className='flex-col z-50 absolute bg-[#6BA4B8] text-neutral-100 space-y-2 p-2'>
             <Link to="/viewadminallorders"> <div className='mt-4' >View All</div></Link>
            
              {/* <Link to="/createorder"> <div className='mt-4' >Create</div></Link> */}
              
            </div>
:null}
    
           
            </div>
            </li>
              :null}
        <li>
           <div onClick={()=>{setViewOrdersMenu(!viewOrdersMenu);setViewQbMenu(false);setToggleAdminMenu(false)}} className='justufy-center hover:cursor-pointer items-center space-x-2 p-2 rounded-md text-neutral-100 font-bold'>
            Orders
           
            {viewOrdersMenu?
            <div className='flex-col z-50 absolute bg-[#6BA4B8] text-neutral-100 space-y-2 p-2'>
             <Link to="/viewallorders"> <div className='mt-4' >All Orders</div></Link>
              <hr/>
              <Link to="/createorder"> <div className='mt-4' >Create</div></Link>
              
            </div>
:null}
    
           
            </div>
            </li>   
         <li>
          <Link to="/allSuppliers">Suppliers</Link>
        </li>
        <li>
          <Link to="/allProducts">All Products</Link>
        </li>
        {
             localStorage.getItem('qbConnectVisible')==='2'?
           <div onClick={()=>{setViewQbMenu(!viewQbMenu);setViewOrdersMenu(false);setToggleAdminMenu(false)}} className='justufy-center hover:cursor-pointer items-center space-x-2 p-2 rounded-md text-neutral-100 font-bold'>
            Quickbooks
           
            {viewQbMenu?
            <div className='flex-col z-40 absolute bg-[#6BA4B8] text-neutral-100 space-y-2 p-2'>
             <Link to="/viewallqbpo"> <div className='mt-4' >View all POs</div></Link>
              <hr/>
              <div onClick={()=>{disconnectQuickbooks()}} className='mt-4' >Disconnect X</div>
            </div>:null}
            </div>:null
            }
        
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