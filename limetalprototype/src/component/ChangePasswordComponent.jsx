import React,{useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function ChangePasswordComponent(props) {

    const updateUserPassword=async(id)=>{
        const result = await axios.post(`http://localhost:4000/users/changepassword`,{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            },userId:localStorage.getItem('uid'),password:newPassword
    
          });
          if(result.status==201||result.status==200)
       {
        console.log("toasting")
        
            toast.success('Password Changed Successfuly', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          
          }
   
else{
    setTimeout(()=>{
        toast.error('Error Occoured', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },0);
}
    }

const [newPassword,setNewPassword]=useState("")

    return (
        <div className='flex flex-row justify-center items-center m-4'>
            <div className='flex flex-col space-y-4 space-x-4 gap-2 '>
                    <div className=''>
                        <label htmlFor='newPwd' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Enter New Password</label>
                        <input type="text" id="newPwd" value={newPassword} placeholder='Enter New Password'  onChange={(e)=>{setNewPassword(e.target.value)}} className='shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    <div className='p-2 flex flex-row justify-center items-center w-[100%]'>
<button className="text-white bg-[#426b79] hover:bg-[#223c45] p-2 rounded-md " onClick={updateUserPassword}>Update Password</button>
  </div>
            </div>
            
        </div>
    );
}

export default ChangePasswordComponent;