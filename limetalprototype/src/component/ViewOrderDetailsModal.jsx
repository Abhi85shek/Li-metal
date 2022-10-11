import axios from 'axios';
import React from 'react';

import { useRecoilState } from 'recoil';
import orderDetailsModalVisibleAtom from '../atoms/orderDetailsModalVisibleAtom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewServicesTable from './ViewServicesTable';
import { AiOutlineClose } from 'react-icons/ai';


const ViewOrderDetailsModal = (props) => {
  
    const [showModal,setShowModal] = useRecoilState(orderDetailsModalVisibleAtom); 
    const selectedOrder=props.selectedOrder
    console.log(props.selectedOrder)

    const approveOrder =async()=>{
        await props.approveOrder()
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
        <div className='rounded-md shadow-lg bg-[#426b79] p-1'>
        <ViewServicesTable line={JSON.parse(selectedOrder.line)} />
        </div>
        <div className='basis-full w-[100%] h-50 '>
        <div className='p-2 flex flex-row justify-center items-center w-[100%]'>
          <div className='p-2 basis-1/2 flex flex-row'>
           <b>Total : </b> &nbsp;&nbsp; {selectedOrder.TotalAmt} &nbsp; <b>{props.customerCurrency}</b>
          </div>
          <div className='p-2 basis-1/2 flex flex-row justify-end'>
            <div className='float-right'>
           <b>Partial PO Number : </b> {selectedOrder.DocNumber}
           </div>
          </div>
          </div>
     
<div className='p-2 flex flex-row justify-center items-center w-[100%]'>
<button className="text-white bg-[#426b79] hover:bg-[#223c45] p-2 rounded-md ">Approve</button>
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