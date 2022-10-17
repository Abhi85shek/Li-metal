import React,{useEffect, useRef, useState} from 'react';
import axios from 'axios';
import ViewPoDetails from './ViewPoDetails';
import { useRecoilState } from 'recoil';
import orderDetailsModalVisibleAtom from '../atoms/orderDetailsModalVisibleAtom';
import ViewOrderDetailsModal from './ViewOrderDetailsModal';


const AllOrders = () => {

    
    const [allOrdersList,SetallOrdersList] = useState([]);
    const [showModal,setShowModal] = useRecoilState(orderDetailsModalVisibleAtom); 
    const [selectedOrderId,setselectedOrderId]=useState(0)
    const [selectedOrder,setSelectedOrder]=useState(null)
    

    const getAllOrders = async ()=>{

        const result = await axios.post(`http://localhost:4000/getAllApproversPo`,{primaryApproversId : localStorage.getItem('uid')},{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        console.log(result)
        SetallOrdersList(result.data.data);
       

    };
    
    const approveOrder=async(po)=>{
       const selectedOrder=po
        const orderObj={}
            orderObj.id=selectedOrder.id
            orderObj.overallStatus=selectedOrder.overallStatus
            orderObj.primaryApproved=selectedOrder.primaryApproved
            orderObj.secondaryApproved=selectedOrder.secondaryApproved
            orderObj.primaryApproversId=selectedOrder.primaryApproversId
            orderObj.secondaryApproversId=selectedOrder.secondaryApproversId
            orderObj.action="Approved"
            orderObj.uid=localStorage.getItem('uid')
            console.log(orderObj)
            const result = await axios.post(`http://localhost:4000/approvepo`,{poId:selectedOrder.id},{

                headers:{
        
                  Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
        
                }
        
              });
            if(result.status === 200)
            {
                setTimeout(()=>{
                    window.location.reload();
                    // toast.success('Order Successfullly stored', {
                    //   position: "top-center",
                    //   autoClose: 2000,
                    //   hideProgressBar: true,
                    //   closeOnClick: true,
                    //   pauseOnHover: true,
                    //   draggable: true,
                    //   progress: undefined,
                    // });
                  },0);
            }
        
    }

    



    useEffect(()=>{
        console.log("useeffect")
        getAllOrders()
       
    },[])

  
  return (
    <>
    {showModal  && <ViewOrderDetailsModal selectedOrder={selectedOrder} approveOrder={approveOrder} approver={true}/>}
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
                    { po.overallStatus==0||po.overallStatus==1?
                    <td>
                        <button onClick={()=>{approveOrder(po)}}  className="p-2 font-bold text-base rounded-lg bg-green-400 text-neutral-800 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-500">
                     { po.overallStatus==0 ||po.overallStatus==1 && po.secondaryApprover==localStorage.getItem('uid')? `Approve`:`Approved`}
                       </button>
                    </td>:
                    po.overallStatus==2?
                    <td>
                   <button disabled  className="p-2 font-bold text-base rounded-lg bg-green-400 text-neutral-800 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-500">
                    Approved
                       </button>
                </td>:
                po.overallStatus==3?
                 <td>
                <button disabled  className="p-2 font-bold text-base rounded-lg bg-green-400 text-neutral-800 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-500">
                    QB Created
                       </button>
             </td>:
             po.overallStatus==4?
             <td>
           <button disabled  className="p-2 font-bold text-base rounded-lg bg-green-400 text-neutral-800 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-500">
                    Rejected
                       </button>
          </td>:   
         null  
                        
                    }

                    {/* <td>
                    {
                        
                    }    
                    <button onClick={()=>{approveOrder(po)}} disabled={(po.overallStatus==2||po.overallStatus==3||po.overallStatus==4)||(po.overallStatus==1 && po.secondaryApprover!=localStorage.getItem('uid') )} className="p-2 font-bold text-base rounded-lg bg-green-400 text-neutral-800 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-500">
                     { po.overallStatus==0 ||po.overallStatus==1 && po.secondaryApprover==localStorage.getItem('uid')? `Approve`:`Approved`}
                       </button>
                    </td> */}
                   
            
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

export default AllOrders