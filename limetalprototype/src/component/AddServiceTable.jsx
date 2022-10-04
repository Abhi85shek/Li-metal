import React,{useState} from 'react';
import { useRecoilValue,useRecoilState } from 'recoil';
import serviceDetailsAtom from '../atoms/ServiceState';
import deleteModalAtom from '../atoms/deleteModalAtom';
import confirmModalAtom from '../atoms/confirmModalAtom';
import { v4 as uuidv4 } from "uuid";
import DeleteModal from './DeleteModal';
import axios from 'axios';
import { useEffect } from 'react';
const AddServiceTable = (props) => {

  const [showModal,setShowModal] = useRecoilState(deleteModalAtom);
  const [confirmModal,setConfirmModal] = useRecoilState(confirmModalAtom);
  const [selectedService,setSelectedService] = useState(null);
  const [totalAmount,setTotalAmount]=useState(0)
 const [allApprovers,setAllApprovers]=useState([])
 const [primaryApprover,setPrimaryApprover]=useState("")
  const [secondaryApprover,setSecondaryApprover]=useState("")

    const serviceDetails = useRecoilValue(serviceDetailsAtom);
    const editHandler =(service)=>{
      setShowModal(true);
      setSelectedService(service);
      
    };


useEffect(()=>{
  getAllApprovers();
  console.log("effect")
  let total=0
  for(let service of serviceDetails)
  {
    total+=service.totalAmount
  }
  setTotalAmount(total)
},[props.serviceCount])

const getAllApprovers = async()=>{
  const res = await axios.get("http://localhost:4000/getApprovers");
    console.log(res.data.data)
    setAllApprovers(res.data.data); 
}; 

const primaryApproverHandler=(e)=>{
  props.setPrimaryApprover(e)
}

const secondaryApproverHandler=(e)=>{
  props.setSecondaryApprover(e)
}


    return (
    <>
    {showModal&& serviceDetails.length>0 ? <DeleteModal service={selectedService}/>: " "}
    <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-white border-b">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Service Name
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Description
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Quantity
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Rate 
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Tax
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Amount
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {  serviceDetails.length > 0   &&
                serviceDetails.map((list)=>(
                  <tr className="bg-gray-100 border-b" key={list.id}>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {list.serviceName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {list.description}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {list.quantity}
                      </td>    
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {list.rate}
                      </td> 
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                       {list.tax}
                      </td> 
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {list.totalAmount} {props.customerCurrency}
                      </td> 
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <p className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={()=>{editHandler(list);}}>Delete</p>
                      </td>          
                </tr>
                ))
              }
            </tbody>
            </table>
           
            </div>
            </div>
            </div>
            </div>
            {totalAmount>0?
            <div className='flex flex-row justify-center items-center'>
             <b> Total Amount:</b> {totalAmount}
            </div>:null}

            {allApprovers.length>0?
    <div className='pt-2 flex flex-row justify-center items-center w-[80%]'>
        <label htmlFor="approvers" className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-400"></label>
            <select id="approvers"  onChange={(e)=>{primaryApproverHandler(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select Primary Approver</option>
                    {
                         allApprovers.map((approver)=>( 
                            <option value={approver.id} key={approver.id}>{approver.name}</option>
                        )
                        )
                    }
            </select>
        </div>:null
}

{totalAmount>5000 && allApprovers.length>0?
        <div className='pt-2 flex flex-row justify-center items-center w-[80%]'>
        <label htmlFor="approvers" className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-400"></label>
            <select id="approvers"  onChange={(e)=>{secondaryApproverHandler(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select Secondary Approver</option>
                    {
                         allApprovers.map((approver)=>( 
                            <option value={approver.id} key={approver.id}>{approver.name}</option>
                        )
                        )
                    }
            </select>
        </div>:null
}

            {/* <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 mr-2 mb-2 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Procced to PO Generation</button> */}
            </>
  )
}

export default AddServiceTable