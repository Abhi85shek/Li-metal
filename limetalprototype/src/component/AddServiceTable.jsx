import React,{useState} from 'react';
import { useRecoilValue,useRecoilState } from 'recoil';
import serviceDetailsAtom from '../atoms/ServiceState';
import deleteModalAtom from '../atoms/deleteModalAtom';
import confirmModalAtom from '../atoms/confirmModalAtom';
import { v4 as uuidv4 } from "uuid";
import DeleteModal from './DeleteModal';
const AddServiceTable = () => {

  const [showModal,setShowModal] = useRecoilState(deleteModalAtom);
  const [confirmModal,setConfirmModal] = useRecoilState(confirmModalAtom);
  const [selectedService,setSelectedService] = useState(null);
  // const[servicesList,setservicesList] = useRecoilState(serviceDetailsAtom);

    const serviceDetails = useRecoilValue(serviceDetailsAtom);
    const editHandler =(service)=>{
      setShowModal(true);
      setSelectedService(service);
      console.log(selectedService);
    };


  return (
    <>
    {showModal ? <DeleteModal service={selectedService}/>: " "}
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
                      {list.totalAmount}
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
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 mr-2 mb-2 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Procced to PO Generation</button>
            </>
  )
}

export default AddServiceTable