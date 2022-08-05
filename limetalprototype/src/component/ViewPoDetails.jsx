import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import viewQbPoDetailModalAtom from '../atoms/viewQbPoDetailsModalAtom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ViewPoDetails = (props) => {
  
  const [showModal,setShowModal]=useRecoilState(viewQbPoDetailModalAtom)
  const [poDetails,setPoDetails]=useState(null)
  const [popdf,setpopdf]=useState(null)
  const [email,setEmail]=useState()
 


 useEffect(()=>{
    fetChPoDetailsById()
 },[])

 const fetChPoDetailsById=async()=>{
    const quickbooksCredentials=localStorage.getItem('quickbooksCredentials')
    const res= await axios.post('http://localhost:4000/getPurchaseOrderById',{POId:props.selectedPoId,refreshToken:quickbooksCredentials})
    console.log(res.data.data) 
    if(res.status==200){
         setPoDetails(res.data.data)
     }
 }

const downloadPdf=async()=>{
    const quickbooksCredentials=localStorage.getItem('quickbooksCredentials')
    const res= await axios.post('http://localhost:4000/getPOpdf',  {POId:props.selectedPoId,refreshToken:quickbooksCredentials,
        headers: {
            'Content-Type': 'application/pdf',
          }})
    console.log(res.data) 
    setpopdf(res.data)
}


const sendEmail=async()=>{
    const quickbooksCredentials=localStorage.getItem('quickbooksCredentials')
    const res=await axios.post('http://localhost:4000/sendPO',{refreshToken:quickbooksCredentials,pOId:props.selectedPoId,email:email})
    if(res.status==200)
    {
     console.log("toasting")
     
         toast.success('Approval Email Sent Successfuly', {
           position: "top-center",
           autoClose: 2000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
         });
       }

else{
 
     toast.error('Error Occoured', {
       position: "top-center",
       autoClose: 2000,
       hideProgressBar: true,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
     });
  
}
}

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity pt-5" aria-hidden="true"></div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-7xl sm:w-full">
    <div className='flex bg-[#426b79] p-4 '>
                <div className='basis-2/3 justify-start'>
                <h3 className="text-xl leading -6 font-medium text-neutral-50 justify-center items-center"  id="modal-title">Purchase Order Details</h3>
                </div>
                
                <div className='basis-1/3'>
                    <div className='flex justify-end'>
                    <AiOutlineClose onClick={()=>{setShowModal(false)}} size={30} className='text-neutral-50 hover:cursor-pointer' />
                    </div>
                    </div>
               </div>
{poDetails?
     <div className=' p-4 text-xl '>
        <div className='flex  p-2 space-x-2'>
            <div className='flex basis-1/2 justify-start items-center space-x-2'>
                <div className='font-semibold text-[#32535f]  '>Id :</div>
                <div className='font-medium'>{poDetails.POId}</div>
            </div>
            <div className='flex basis-1/2  justify-end items-center space-x-2 '>
            <div className='font-semibold  text-[#32535f] '>Number :</div>
            <div className='font-medium'>{poDetails.PONumber}</div>
            </div>
        </div>
        <div className=' flex  items-center p-2 space-x-2'>
        <div className='font-semibold  text-[#32535f] '>Shipping Address :</div>
        <div className='font-medium'>{poDetails.ShipmentAddress}</div>
        </div>
        <div className=' flex  items-center p-2 space-x-2'>
        <div className='font-semibold  text-[#32535f] '>Vendor Name :</div>
        <div className='font-medium'>{poDetails.Vendor.name}</div>
        </div>
        <div className='flex  p-2 space-x-2'>
            <div className='flex basis-1/2  justify-start items-center space-x-2'>
                <div className='font-semibold text-[#32535f]  '>Creation Date :</div>
                <div className='font-medium'>{poDetails.creationDate}</div>
            </div>
            <div className='flex basis-1/2  justify-end items-center space-x-2'>
            <div className='font-semibold  text-[#32535f] '>Currency :</div>
            <div className='font-medium'>{poDetails.currency}</div>
            </div>
            
        </div>
        <div className=' flex  items-center p-2 space-x-2'>
        <div className='font-semibold  text-[#32535f] '>Product Details :</div>
        </div>
        <div className='flex'>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-[#7DAFC1] dark:bg-gray-700 dark:text-gray-400 shadow-md ">
            <tr>
                <th scope="col" className="px-6 py-3">
                 Num
                </th>
               
                <th scope="col" className="px-6 py-3">
                Name
                </th>

                <th scope="col" className=" px-6 py-3 ">
                   Status
                </th> 
                <th   scope="col" className="px-6 py-3">
                 Tax 
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Amount
                </th>
                <th scope="col" className="px-6 py-3">
                   Details
                </th>
            </tr>
        </thead>
        <tbody>
            {poDetails.POProducts.length!=0?
           poDetails.POProducts.map((product,index)=>
                (<>
                    <tr className={index %2 == 0 ? "bg-neutral-100 border-b text-neutral-800 ": "bg-[#7DAFC1] border-b text-neutral-800"} key={index} >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {product.LineNum}
                    </th>
                    {product.AccountBasedExpenseLineDetail?
                    <td className="px-6 py-4">
                        {product.AccountBasedExpenseLineDetail.AccountRef.name}
                    </td>:null
}
{product.ItemBasedExpenseLineDetail?
                    <td className="px-6 py-4">
                        {product.ItemBasedExpenseLineDetail.ItemRef.name}
                    </td>:null
}

{product.AccountBasedExpenseLineDetail?
                    <td className="px-6 py-4">
                        {product.AccountBasedExpenseLineDetail.BillableStatus}
                    </td>:null
}
{product.ItemBasedExpenseLineDetail?
                    <td className="px-6 py-4">
                        {product.ItemBasedExpenseLineDetail.BillableStatus}
                    </td>:null
}

                    {product.AccountBasedExpenseLineDetail?
                    <td className="px-6 py-4">
                      {product.AccountBasedExpenseLineDetail.TaxCodeRef.value}
                    </td>:null
}
{product.ItemBasedExpenseLineDetail?
                    <td className="px-6 py-4">
                      {product.ItemBasedExpenseLineDetail.TaxCodeRef.value}
                    </td>:null
}
                    <td className="px-6 py-4">
                       {product.Amount}
                    </td>
                    <td  className="px-6 py-4">
                    {product.DetailType}
                    </td>
                   
            
                </tr>
                </>
                
                        
                )
           )
         
          :null }
         
        </tbody>
    </table>
   
        </div>
        <hr className='h-4 mt-8'/>
        <div className=' flex justify-start  items-center p-2 space-x-2'>
                Approval
            </div>
            
        <div className='flex justify-start items-center p-2 space-x-2'>
        <input className="appearance-none block w-[80%] text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="approveremail" type="text" placeholder="Enter approver email id" onChange={(e)=>{setEmail(e.target.value)}} />
        <button onClick={()=>{sendEmail()}}  className='w-[20%] font-medium p-2 rounded-md bg-[#426b79] text-neutral-100 '>Send</button>
            </div>
           
        
     </div>
:null}
    </div>
  </div>
</div>
  )
}

export default ViewPoDetails;