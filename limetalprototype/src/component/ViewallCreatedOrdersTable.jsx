import React,{useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import orderDetailsModalVisibleAtom from '../atoms/orderDetailsModalVisibleAtom';
import ViewOrderDetailsModal from './ViewOrderDetailsModal';


const ViewAllCreatedOrdersTable = () => {

    
    const [allOrdersList,SetallOrdersList] = useState([]);
    const [showModal,setShowModal] = useRecoilState(orderDetailsModalVisibleAtom); 
    const [selectedOrderId,setselectedOrderId]=useState(0)
    const [selectedOrder,setSelectedOrder]=useState(null)
    

    const getAllOrders = async ()=>{

        const result = await axios.post(`http://localhost:4000/getorderofuser`,{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            },
            userId:localStorage.getItem('uid')
          });
        console.log(result)
        SetallOrdersList(result.data.data);
       

    };
    
   
    const deleteOrder=async(id)=>{
        const result = await axios.get(`http://localhost:4000/deletepo/${id}`,{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
          if(result.status==201||result.status==200)
       {
        console.log("toasting")
        
            toast.success('Order Deleted Successfuly', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            await getAllOrders();
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
 

    useEffect(()=>{
        console.log("useeffect")
        getAllOrders()
       
    },[])

  
  return (
    <>
    {showModal  && <ViewOrderDetailsModal selectedOrder={selectedOrder} viewSelfOrder={true} deleteOrder={deleteOrder}/>}
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-6 mt-4">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-[#7DAFC1] dark:bg-gray-700 dark:text-gray-400 shadow-md ">
            <tr>
                
                <th scope="col" className="px-6 py-3">
                PO Number
                </th>
                <th   scope="col" className="px-6 py-3">
                 Vendor Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Amount 
                </th>
                <th scope="col" className="px-6 py-3">
                    Stage
                </th>
                <th scope="col" className="px-6 py-3">
                    Info
                </th>
         
                <th scope="col" className="px-6 py-3">
                    Action 
                </th>

            </tr>
        </thead>
        <tbody>
            {allOrdersList.length!=0?
           allOrdersList.map((po,index)=>
        

                (<>
                    <tr className={index %2 == 0 ? "bg-neutral-100 border-b text-neutral-800 ": "bg-[#7DAFC1] border-b text-neutral-800"} key={index} >
            
                    <td className="px-6 py-4">
                        {po.docNumber}
                    </td>
                    <td className="px-6 py-4">
                      {po.supplierName}
                    </td>
                    <td className="px-6 py-4">
                       {po.totalAmount}
                    </td>
                   
                    { po.overallStatus==0?
                    <td>
                        Approval Pending
                    </td>:
                    po.overallStatus==1?
                    <td>
                        Semi Approved
                    </td>:
                    po.overallStatus==2?
                     <td>
                    Approved
                 </td>:
                 po.overallStatus==3?
                 <td>
                 QB created
              </td>:   
               <td>
              Rejected
            </td>    
                    }
                        
                    
                    <td onClick={()=>{setShowModal(true);setSelectedOrder(po)}} className="px-6 py-4 font-light underline hover:cursor-pointer">
                       View
                    </td>
                   
                 
                   <td><button disabled={po.overallStatus==3} onClick={()=>{deleteOrder(po.id)}} className="p-2 font-bold text-base rounded-lg bg-red-400 text-neutral-700 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-400">
                        Delete
                       </button>
                    </td>              
            
                </tr>
                </>
                
                        
                )
           )
         
          :null }
         
        </tbody>
    </table>

   
</div>
    </>
  )
}

export default ViewAllCreatedOrdersTable