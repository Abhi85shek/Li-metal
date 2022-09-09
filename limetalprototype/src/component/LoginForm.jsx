import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import { useContext } from "react";
import initalUserDetailsAtom from "../atoms/intialUserDetails";
import userRoleAtom from "../atoms/userRole";
import loggedInUserAtom from "../atoms/loggedInUser";
import { useRecoilState } from "recoil";
import firstTimeRegisterAtom from '../atoms/firstTimeRegister';
import logo from '../../src/logo.png'
import { TEST_HOME_PAGE } from "../config/basic";

// Toastify

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {

    const [firstTimeRegisterVisible,setFirstTimeRegisterVisible] = useRecoilState(firstTimeRegisterAtom);
    // LoggedIn User Details like Username

    const[loggedUser,setLoggedUser] = useRecoilState(loggedInUserAtom);

    // User Details From Hubspot To Atom

    const[initUserDetails,setInitUserDetails] = useRecoilState(initalUserDetailsAtom);

    const [userRole,setUserRole] = useRecoilState(userRoleAtom);

  const auth = useContext(AuthContext);
 
  const navigate = useNavigate();

  // State Managed for the Login Data
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  // Ref for the User Input Values
  const emailHandler=(event)=>{
      setEmail(event.target.value);
  };

  const passwordHandler =(event)=>{
      setPassword(event.target.value);
  };


  // Get Data by Email
  const getDataByEmail = async(email)=>{

   const res = await axios.post("http://localhost:8000/users/getdatabyemail",{email:email},{
      headers:{
        Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    }
    });
    
    if(res.status === "200")
    {
      setInitUserDetails(res.data);
      setFirstTimeRegisterVisible(true);
    }
    else
    {
      toast.error(res.data.message,{
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  // Functionality After User Click Submit
    const loginHandler = async (event)=>{
    event.preventDefault();
    const response = await axios.post("http://localhost:4000/users/login",{email,password});
    
    if(response.data.userValid)
    {

            
     
      
      auth.login(response.data.userId,response.data.token,response.data.userType,response.data.userEmail,response.data.userName);
      // Recoil State Set
     

      localStorage.setItem('userType',JSON.stringify({userRole:response.data.userType,userName:response.data.userName}));
      setUserRole(JSON.parse(localStorage.getItem('userType')).userRole);
      setLoggedUser(response.data.userName);
 
      
        setTimeout(()=>{
          toast.success('Login Successfull', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },0);
      


          
          // }

      

      auth.isLoggedIn=true
      navigate("/home");
      
     
    }

    else 
    {
          auth.logout();
          toast.error("Please Check your credientials",{
            position: "top-center",
          });
    }
  };
  return (
        <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className="w-[35%]  space-y-8 p-10 bg-clip-padding bg-opacity-80 backdrop-blur-sm rounded-2xl bg-white/30">
        <div>
            <h2 className="mt-6 text-center text-4xl font-extrabold text-[#335663] leading-normal">Li-Metal PO Management</h2>
           <div className="flex flex-row justify-center items-center pt-8">
            <img src={logo}/>
            </div>
        </div>
            <form className="mt-8 space-y-6" method="POST" onSubmit={loginHandler}>
            <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
        <div className='mb-8'>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email-address" name="email" value={email} onChange={emailHandler} type="email" required className="appearance-none rounded-lg h-12 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="flex content-center"><input id="password" onChange={passwordHandler} value={password} name="password" type="password" required 
          className="appearance-none h-12 rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" /></div>
          
        </div>
      </div>
      <div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border-2 tracking-wider
        border-transparent text-md font-bold rounded-md text-neutral-100  bg-[#335663]  uppercase
        hover:bg-[#213a43] focus:outline-none focus:ring-2 focus:ring-offset-2 
       ">
          Sign in
        </button>
       
      </div>
    </form>
    </div>
    <ToastContainer autoClose={5000}/>
    </div>
  )
}

export default LoginForm;