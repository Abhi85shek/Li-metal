import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import completeOrderModalVisibleAtom from '../atoms/completeOrderModalVisibleAtom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import AddServiceTable from './AddServiceTable';
import { AiOutlineClose } from 'react-icons/ai';
import serviceDetailsAtom from '../atoms/ServiceState';
import { useRecoilValue } from 'recoil';
import moment from 'moment';

const CompleteOrderModal = (props) => {
  
    const [showModal,setShowModal] = useRecoilState(completeOrderModalVisibleAtom); 
    const [primaryApprovers,setPrimaryApprovers]=useState([])
    const [secondaryApprovers,setSecondaryApprovers]=useState([])
    const [primaryApprover,setPrimaryApprover]=useState(0)
    const [secondaryApprover,setSecondaryApprover]=useState(0)
    const serviceDetails = useRecoilValue(serviceDetailsAtom);
    const [totalAmount,setTotalAmount]=useState(0)
    

   useEffect(()=>{
    getAllPrimaryApprovers();
    getAllSecondaryApprovers();
   },[])

   const getAllPrimaryApprovers = async()=>{
    const res = await axios.get("http://localhost:4000/getApprovers",{

      headers:{

        Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`

      }

    });
      console.log(res.data.data)
      setPrimaryApprovers(res.data.data); 
  }; 
  const getAllSecondaryApprovers = async()=>{
    const res = await axios.get("http://localhost:4000/getsecondaryapprovers",{

      headers:{

        Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`

      }

    });
      console.log(res.data.data)
      setSecondaryApprovers(res.data.data); 
  }; 

  const primaryApproverHandler=(e)=>{
    setPrimaryApprover(e)
  }
  
  const secondaryApproverHandler=(e)=>{
    setSecondaryApprover(e)
  }

  // API function to store the Pi in the Local Database

  const createOrderHandler = async(orderObj)=>{
  await axios.post("http://localhost:4000/storelocal",{orderObj:orderObj},{

      headers:{

        Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`

      }

    }).then(res=>{console.log(res);return res}).catch(err=>{console.log(err);return null});
    
    
  };

  useEffect(()=>{
   
    console.log("effect")
    console.log(props.orderObj)
    let total=0
    for(let service of serviceDetails)
    {
      total+=service.totalAmount
    }
    setTotalAmount(total)
    
  },[])

  const createOrderSubmit=async()=>{
    if(primaryApprover==localStorage.getItem('uid')||secondaryApprover==localStorage.getItem('uid'))
    {
      setTimeout(()=>{
        toast.error('Creator cannot be approver', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },0);
    return
    }
    let totalApprovers=secondaryApprover==0?1:2
    if(primaryApprover==0||(totalAmount>5000 && secondaryApprover==0)){
      setTimeout(()=>{
        toast.error('Select Approvers', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },0);
    return
    }
    if(primaryApprover==secondaryApprover){
      setTimeout(()=>{
        toast.error('Both Approvers cannot be the same', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },0);
      return
    }

    let orderObj=props.orderObj
    orderObj.primaryApprover=primaryApprover
    orderObj.secondaryApprover=secondaryApprover
    orderObj.totalApprovers=totalApprovers
    orderObj.userId=localStorage.getItem('uid')
   
 
  
   await axios.post("http://localhost:4000/storelocal",{orderObj:orderObj},{

    headers:{

      // Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`

    }

  }).then(res=>{console.log(res); 
    toast.success('Order Successfullly stored', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });}).catch(err=>{console.log(err);
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

    }

    })
    



    //   }
    //   else
    //   {
    //     setTimeout(()=>{
    //       toast.error('Error Occoured', {
    //         position: "top-center",
    //         autoClose: 2000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //     },0);
    //   }
    console.log(orderObj);
  
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity pt-5" aria-hidden="true"></div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-7xl sm:w-full">
    <div className='flex bg-[#426b79] p-4 '>
                <div className='basis-2/3 justify-start'>
                <h3 className="text-xl leading -6 font-medium text-neutral-50 justify-center items-center"  id="modal-title">Review Order</h3>
                </div>
                
                <div className='basis-1/3'>
                    <div className='flex justify-end'>
                    <AiOutlineClose onClick={()=>{setShowModal(false)}} size={30} className='text-neutral-50 hover:cursor-pointer' />
                    </div>
                    </div>
               </div>
    
    <div className='m-2 flex flex-row justify-center items-center'>
      <div className='basis-full'>
      <div className='p-2 flex flex-row justify-center items-center w-[100%]'>
          <div className='p-2 basis-1/2 flex flex-row'>
           <b>Customer Name : </b> &nbsp;&nbsp; {props.orderObj.customerName} &nbsp; <b>{props.customerCurrency}</b>
          </div>
          <div className='p-2 basis-1/2 flex flex-row justify-end'>
            <div className='float-right'>
           <b>Date: </b> {moment().format('MM/DD/YYYY HH:mm')}
           </div>
          </div>
          </div>
           <div className='p-2 flex flex-row justify-center items-center w-[100%]'>
          <div className='p-2 basis-full flex flex-row'>
           <b>Supplier Name : </b> &nbsp;&nbsp; {props.orderObj.supplierName} &nbsp; <b>{props.customerCurrency}</b>
          </div>
         
          </div>
        <div className='rounded-md shadow-lg bg-[#426b79] p-1'>
        <AddServiceTable isReadOnly={true}/>
        </div>
        <div className='basis-full w-[100%] h-50 '>
        <div className='p-2 flex flex-row justify-center items-center w-[100%]'>
          <div className='p-2 basis-1/2 flex flex-row'>
           <b>Total : </b> &nbsp;&nbsp; {props.orderObj.TotalAmt} &nbsp; <b>{props.customerCurrency}</b>
          </div>
          <div className='p-2 basis-1/2 flex flex-row justify-end'>
            <div className='float-right'>
           <b>Partial PO Number : </b> {props.orderObj.DocNumber}
           </div>
          </div>
          </div>
        {primaryApprovers.length>0?
    <div className='p-2 flex flex-row justify-center items-center w-[100%]'>
        <label htmlFor="approvers" className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-400"></label>
            <select id="approvers"  onChange={(e)=>{primaryApproverHandler(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected value={0}>Select Primary Approver</option>
                    {
                         primaryApprovers.map((approver)=>( 
                            <option value={approver.id} key={approver.id}>{approver.fullName}</option>
                        )
                        )
                    }
            </select>
        </div>:null
}
{secondaryApprovers.length>0 && totalAmount>5000 ?
    <div className='p-2 flex flex-row justify-center items-center w-[100%]'>
        <label htmlFor="approvers" className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-400"></label>
            <select id="approvers"  onChange={(e)=>{secondaryApproverHandler(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected value={0}>Select Secondary Approver</option>
                    {
                         secondaryApprovers.map((approver)=>( 
                            <option value={approver.id} key={approver.id}>{approver.fullName}</option>
                        )
                        )
                    }
            </select>
        </div>:null
}
<div className='p-2 flex flex-row justify-center items-center w-[100%]'>
<button className="text-white bg-[#426b79] hover:bg-[#223c45] p-2 rounded-md " onClick={createOrderSubmit}>Create Order</button>
  </div>
        </div>
      </div>
    </div>
      
    </div>
  </div>
</div>
  )
}

export default CompleteOrderModal;