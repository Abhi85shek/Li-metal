import React,{useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ViewPoDetails from './ViewPoDetails';
import { useRecoilState } from 'recoil';
import orderDetailsModalVisibleAtom from '../atoms/orderDetailsModalVisibleAtom';
import ViewOrderDetailsModal from './ViewOrderDetailsModal';
import {AiFillFilter} from "react-icons/ai"


const ViewAllSuperAdminOrders = () => {

    
    const [allOrdersList,SetallOrdersList] = useState([]);
    const [showModal,setShowModal] = useRecoilState(orderDetailsModalVisibleAtom); 
    const [selectedOrderId,setselectedOrderId]=useState(0)
    const [selectedOrder,setSelectedOrder]=useState(null)
    const [totalRecords,setTotalRecords] = useState(0);
    let [currentPage,setCurrentPage] = useState(0);
    let [searchProduct, setsearchProduct]=useState("")
    let [isTypeFilterVisible,setTypeFilterVisible]=useState(false)
      const currentCount =10;
    let totalNumberOfPages;
    let [isStageFilterVisible,setStageFilterVisible]=useState(false)
    let [filtersArray,setFiltersArray]=useState([])
    const filterRef=useRef([])
    let types=[{id:0,name:'Approval Pending'},{id:1,name:'Semi-Approved'},{id:2,name:'Approved'},{id:3,name:'QB created'},{id:4,name:'Rejected'}]
    

    const getAllOrders = async ()=>{

        const result = await axios.get(`http://localhost:4000/getallPo/${currentPage}/${currentCount}`,{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        console.log(result)
        SetallOrdersList(result.data.data.cur_records);
        setTotalRecords(result.data.data.total_count)
       

    };
    
    const applyFilters=async()=>{

      console.log(filtersArray)
    
      let filterString=""
      let newfilterString=""
      if(filtersArray.length==1){
          newfilterString="\'"+filtersArray[0]+"\'"
      }
      else{
      for(let filter of filtersArray)
      {
          filterString+="\'"+filter+"\',"
          newfilterString=filterString.substring(0,filterString.length-1)
      }
  }
      console.log(newfilterString)
      // const result = await axios.post(`http://localhost:4000/filterServices/${currentPage}/${currentCount}`, {category:'Type',filter:newfilterString},{

      //     headers:{
  
      //       Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
  
      //     }
  
      //   });
      // setAllProducts(result.data.data.cur_records);
      // setTotalRecords(result.data.data.total_count);
      // setStageFilterVisible(false)
  
  }

    const  updateFiltersArray=(type)=>{
      for (let value of filtersArray){
      if(value==type){
          console.log("here")
          setFiltersArray(filtersArray.filter(item => item !== type))
          return
      }
  }
          console.log("i am here")
          setFiltersArray(arr=>[...arr,type])
          console.log(filtersArray)
        }

    const sendToQuickBooks=async(po)=>{

        let orderObj={
            "DocNumber":po.docNumber,
            "TotalAmt":parseInt(po.totalAmount),
            "Line":JSON.parse(po.line),
            "APAccountRef":{
                "name": po.apAccountRefname,
                "value": po.apAccountRefValue
            },
            "VendorRef":{
                "name":po.vendorRefname,                
            "value":po.vendorRefValue           
            },
            "ShipTo":{
                "name": po.shipToName,
                "value": po.shipToValue
            }
        }
        console.log(po)
        let quickbooksCredentials=localStorage.getItem('quickbooksCredentials')
        const res=await axios.post(`http://localhost:4000/createPO`,{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            },data:orderObj,refreshToken:quickbooksCredentials,poId:po.id,vendorId:po.vendorId
          })
          console.log(res)
          if(res.status==200||res.status==201)
          {
            setTimeout(()=>{
                toast.success('Order Successfullly stored', {
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

    const previousPageHandler =()=>{
      if(currentPage>0)
        {
            setCurrentPage(--currentPage);
        }
        else{
          setCurrentPage(0);
        }
     
      if(filtersArray.length>0)
      {
        applyFilters()
      }
      else{
        getAllOrders();}
   
};
    
      
  

  const nextPageHandler = ()=>{
    setCurrentPage(++currentPage);
     
       
          if(filtersArray.length>0)
          {
            applyFilters()
          }
          else{
            getAllOrders();}
       
    };
   


    useEffect(()=>{
        console.log("useeffect")
        getAllOrders()
       
    },[])

  
  return (
    <>
    {showModal  && <ViewOrderDetailsModal selectedOrder={selectedOrder} admin={true} sendToQuickBooks={sendToQuickBooks} />}
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
                <span className='flex flex-row flex-1 space-x-2 items-center'>
                   Stage 
                    <AiFillFilter onClick={()=>{setStageFilterVisible(!isStageFilterVisible)}} size={12} className="ml-2 hover:cursor-pointer"/>
                    </span>
                {isStageFilterVisible?
                    <div className='h-15 w-42 bg-white outline-2 border-2 outline-slate-600 absolute'> 
                      { types.map((type,i)=>{
                        return(
                            <div className='p-1 h-7 items-center normal-case font-medium hover:cursor-pointer hover:bg-[#6BA4B8] hover:text-white'>
                                <input type="checkbox" className='checkbox' ref={el => filterRef.current[i] = el}  id={type.id} name={type.id} onClick={()=>updateFiltersArray(type.id)} value={type.id}/>
                                        <label className='mt-[-5px]' > {type.name}</label>
                                </div>
                        )
                       })
                    }
                    <div className='flex flex-row p-2'>
                    <button type='button' onClick={applyFilters} className={'w-15 rounded inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white-500 bg-green-400'} >
                        
                            Apply</button>
                            <button type='button' onClick={()=>{return}} className={'w-15 rounded inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white-500 bg-blue-400'} >
                        
                            Reset</button>
                            </div>
                    </div>:null
}
                    
                </th>
                <th scope="col" className="px-6 py-3">
                    Info
                </th>
               {localStorage.getItem('quickbooksCredentials')!=null?
                <th scope="col" className="px-6 py-3">
                    Action 
                </th>:null
}
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
                   
                  {localStorage.getItem('quickbooksCredentials')!=null?
                   <td><button disabled={po.overallStatus!=2} onClick={()=>{sendToQuickBooks(po)}} className="p-2 font-bold text-base rounded-lg bg-green-400 text-neutral-800 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-500">
                        QB Create
                       </button>
                    </td> :null
}               
            
                </tr>
                </>
                
                        
                )
           )
         
          :null }
         
        </tbody>
    </table>

    <div className='inline-block py-2 min-w-full sm:px-6 flex lg:px-8 '>
        <p>Page {currentPage+1}/{totalNumberOfPages}</p>
    </div>
    <div class="flex flex-col items-center">
                 <span class="text-sm text-gray-700 dark:text-gray-400 mt-">
                    Showing <span class="font-semibold text-gray-900 dark:text-white">{(currentPage*10)+1}</span> to <span class="font-semibold text-gray-900 dark:text-white">{currentPage*10 + 10 > totalRecords ? (currentPage*10 + 10)-(currentPage*10 + 10 - totalRecords) :currentPage*10 + 10  }</span> of <span class="font-semibold text-gray-900 dark:text-white">{totalRecords}</span> Entries
                </span>
   
    <div className='inline-block py-6 min-w-full sm:px-6 flex lg:px-8 text-center space-x-5 justify-center'>
                   
                      <button type='button' onClick={previousPageHandler} className={currentPage == 0 ? 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white-500 bg-gray-400 rounded-lg border border-gray-300 opacity-70 cursor-no-drop dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:text-white'
      : 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} disabled={currentPage == 0  ||(searchProduct.length>0 && totalRecords<10 )? true : false}>
                        <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                            Previous</button>
                      <button type='button' onClick={nextPageHandler} 
                      className={currentPage+1 == totalNumberOfPages ? 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white-500 bg-gray-400 rounded-lg border border-gray-300 opacity-70 cursor-no-drop dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:text-white'
                      : 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} disabled={currentPage+1 == totalNumberOfPages ||(searchProduct.length>0 && totalRecords<10 ) ?true :false}>
                          Next
                        <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                       </button>

    </div>
</div>
</div>
    </>
  )
}

export default ViewAllSuperAdminOrders