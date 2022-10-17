import axios from 'axios';
import React from 'react';

import { useRecoilState } from 'recoil';
import orderDetailsModalVisibleAtom from '../atoms/orderDetailsModalVisibleAtom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewServicesTable from './ViewServicesTable';
import { AiOutlineClose } from 'react-icons/ai';
import moment from 'moment'


const ViewOrderDetailsModal = (props) => {
  
    const [showModal,setShowModal] = useRecoilState(orderDetailsModalVisibleAtom); 
    const selectedOrder=props.selectedOrder
    console.log(props.selectedOrder)

    const approveOrder =async()=>{
        await props.approveOrder()
    }

    const handleSubmit=async()=>{
      if(props.admin){
      await  props.sendToQuickBooks()
      }
      else{
      await  approveOrder()
      }

    }
    const parseDate=(date)=>{
      var t = "2010-06-09 13:12:01".split(/[- :]/);

// Apply each element to the Date function
var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

console.log(d);
    }
 
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity pt-5" aria-hidden="true"></div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-7xl sm:w-full">
    <div className='flex bg-[#426b79] p-4 '>
                <div className='basis-2/3 justify-start'>
                <h3 className="text-xl leading -6 font-medium text-neutral-50 justify-center items-center"  id="modal-title">View Order Details</h3>
                </div>
                
                <div className='basis-1/3'>
                    <div className='flex justify-end'>
                    <AiOutlineClose onClick={()=>{console.log("close");setShowModal(false)}} size={30} className='text-neutral-50 hover:cursor-pointer' />
                    </div>
                    </div>
               </div>
    
    <div className='m-2 flex flex-row justify-center items-center'>
      <div className='basis-full'>
      <div className='p-2 flex flex-row justify-center items-center w-[100%]'>
          <div className='p-2 basis-1/2 flex flex-row'>
           <b>Customer Name : </b> &nbsp;&nbsp; {selectedOrder.customerName} &nbsp; <b>{props.customerCurrency}</b>
          </div>
          <div className='p-2 basis-1/2 flex flex-row justify-end'>
            <div className='float-right'>
           <b>Date: </b> {selectedOrder.creationDate}
           </div>
          </div>
          </div>
           <div className='p-2 flex flex-row justify-center items-center w-[100%]'>
          <div className='p-2 basis-full flex flex-row'>
           <b>Supplier Name : </b> &nbsp;&nbsp; {selectedOrder.supplierName} &nbsp; <b>{props.customerCurrency}</b>
          </div>
         
          </div>
        <div className='rounded-md shadow-lg bg-[#426b79] p-1'>
        <ViewServicesTable line={JSON.parse(selectedOrder.line)} />
        </div>
        <div className='basis-full w-[100%] h-50 '>
        <div className='p-2 flex flex-row justify-center items-center w-[100%]'>
          <div className='p-2 basis-1/2 flex flex-row'>
           <b>Total : </b> &nbsp;&nbsp; {selectedOrder.totalAmount} &nbsp; <b>{props.customerCurrency}</b>
          </div>
          <div className='p-2 basis-1/2 flex flex-row justify-end'>
            <div className='float-right'>
           <b>Partial PO Number : </b> {selectedOrder.docNumber}
           </div>
          </div>
          </div>
     
<div className='p-2 flex flex-row justify-center items-center w-[100%] space-x-2'>
<button onClick={handleSubmit} className="text-white bg-[#426b79] hover:bg-[#223c45] p-2 rounded-md ">
  {props.admin==true?`QB Create`:`Approve`}</button>
  <button onClick={()=>{return}} className="text-white bg-[#a83743] hover:bg-[#672e2b] p-2 rounded-md ">
 Reject</button>

  </div>
        </div>
      </div>
    </div>
      
    </div>
  </div>
</div>
  )
}

export default ViewOrderDetailsModal;