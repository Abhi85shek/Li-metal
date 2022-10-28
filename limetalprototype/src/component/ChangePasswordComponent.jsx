import React,{useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../shared/context/auth-context';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { useContext } from 'react';

function ChangePasswordComponent(props) {
  const auth=useContext(AuthContext)
  const navigate=useNavigate()
  const signOutHandler = ()=>{
    auth.logout();
    navigate("/login", { replace: true });
  };


    const updateUserPassword=async(id)=>{
       await axios.post(`http://localhost:4000/users/changepassword`,{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            },userId:localStorage.getItem('uid'),password:newPassword
    
          }).then(res=>{console.log(res); 
            toast.success('Password succesfully changed', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(()=>{signOutHandler()},1000)
        }).catch(err=>{console.log(err);
            if(err.response?.status==404){
              toast.error('Not Found', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
            }
           else if(err.response?.status==500){
            toast.error('Internal Server Error', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            }
            else if(err.response?.status==401){
              toast.error('You are not authorized', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
        
            }});
      
    }

const fetchUsers=async()=>{
  try{
  await axios.get('http://localhost:4000/users/test').then(res=>{console.log(res)}).
   catch(err=>{
    alert(err.message)
  })

// console.log(res)
// console.log('result')
//   if(res && res.data.data.length>0)
//   {
//     alert('success')
//   }
//   else{
// alert('faliure')
//   }
//   }catch(err)
//   {
//     console.log(err)
}catch(e){return}}

const [newPassword,setNewPassword]=useState("")

    return (
        <div className='flex flex-row justify-center items-center m-4 '>
            <div className='flex flex-col space-y-4 w-[60%] space-x-4 gap-2  '>
                    <div className=''>
                        <label htmlFor='newPwd' className='flex justify-center items-center  uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2'></label>
                        <input type="text" id="newPwd" value={newPassword} placeholder='Enter New Password'  onChange={(e)=>{setNewPassword(e.target.value)}} className='h-20 text-2xl shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    <div className='p-2 flex flex-row justify-center items-center w-[100%]'>
<button className="text-white bg-[#36b45a] hover:bg-[#2c8e48] p-2 rounded-md text-xl" onClick={updateUserPassword}>Update Password</button>

  </div>
            </div>
            
        </div>
    );
}

export default ChangePasswordComponent;