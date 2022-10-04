import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import completeOrderModalVisibleAtom from '../atoms/completeOrderModalVisibleAtom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const CompleteOrderModal = (props) => {
  
    const [showModal,setShowModal] = useRecoilState(completeOrderModalVisibleAtom); 
    const [primaryApprovers,setPrimaryApprovers]=useState([])
    const [secondaryApprovers,setSecondaryApprovers]=useState([])
    const [primaryApprover,setPrimaryApprover]=useState("")
    const [secondaryApprover,setSecondaryApprover]=useState("")

   useEffect(()=>{
    getAllPrimaryApprovers();
    getAllSecondaryApprovers();
   },[])

   const getAllPrimaryApprovers = async()=>{
    const res = await axios.get("http://localhost:4000/getPrimaryApprovers");
      console.log(res.data.data)
      setPrimaryApprovers(res.data.data); 
  }; 
  const getAllSecondaryApprovers = async()=>{
    const res = await axios.get("http://localhost:4000/getApprovers");
      console.log(res.data.data)
      setSecondaryApprovers(res.data.data); 
  }; 

  const primaryApproverHandler=(e)=>{
    props.setPrimaryApprover(e)
  }
  
  const secondaryApproverHandler=(e)=>{
    props.setSecondaryApprover(e)
  }
  

  return (
    <> 
    
       <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className="relative inline-block align-middle  rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-[80%]">
      <div className="bg-[#6BA4B8] px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
        <div className="sm:items-start">
          <div className="mt-3 text-center  sm:mt-0 sm:ml-4 sm:text-left">
          <div className='flex bg-[#426b79] p-4 '>
                <div className='basis-2/3 justify-start'>
                <h3 className="text-xl leading -6 font-medium text-neutral-50 justify-center items-center"  id="modal-title">Complete Order</h3>
                </div>
                
                <div className='basis-1/3'>
                    
                    </div>
               </div>
           <div className='flex flex-row justify-center items center pt-4 w-full'>
            <div className='flex flex-col justify-center items-center'>
            {primaryApprovers.length>0?
    <div className='pt-2 flex flex-row justify-center items-center'>
        <label htmlFor="approvers" className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-400"></label>
            <select id="approvers"  onChange={(e)=>{primaryApproverHandler(e.target.value)}} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select Primary Approver</option>
                    {
                         primaryApprovers.map((approver)=>( 
                            <option value={approver.id} key={approver.id}>{approver.name}</option>
                        )
                        )
                    }
            </select>
        </div>:null
}
{secondaryApprovers.length>0?
    <div className='pt-2 flex flex-row justify-center items-center w-[80%]'>
        <label htmlFor="approvers" className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-400"></label>
            <select id="approvers"  onChange={(e)=>{secondaryApproverHandler(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select Secondary Approver</option>
                    {
                         secondaryApprovers.map((approver)=>( 
                            <option value={approver.id} key={approver.id}>{approver.name}</option>
                        )
                        )
                    }
            </select>
        </div>:null
}
            </div>

           </div>
          </div>
        </div>
      </div>
      <div className="bg-[#6BA4B8] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        {/* <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">Invite</button> */}
        <button type="button" onClick={()=>{setShowModal(false)}} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>
       
      </div>
    </div>
    
  </div>
  
</div>
</>
  )
}

export default CompleteOrderModal;