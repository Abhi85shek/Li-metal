import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import viewQbPoDetailModalAtom from '../atoms/viewQbPoDetailsModalAtom';
import { Link } from 'react-router-dom';


const ViewPoDetails = (props) => {
  
  const [showModal,setShowModal]=useRecoilState(viewQbPoDetailModalAtom)
  const [poDetails,setPoDetails]=useState(null)
  const [popdf,setpopdf]=useState(null)
 


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
                    <td className="px-6 py-4">
                        {product.AccountBasedExpenseLineDetail.AccountRef.name}
                    </td>
                    <td className="px-6 py-4">
                        {product.BillableStatus}
                    </td>
                    <td className="px-6 py-4">
                      {product.AccountBasedExpenseLineDetail.TaxCodeRef.value}
                    </td>
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
        <div className=' flex justify-center  items-center p-2 space-x-2'>
     
        {/* <button onClick={()=>{
            downloadPdf()
        }} className='font-semibold p-2 rounded-md bg-blue-600 text-neutral-100 '>Download</button> */}
        
        </div>
     </div>
:null}
    </div>
  </div>
</div>
  )
}

export default ViewPoDetails;