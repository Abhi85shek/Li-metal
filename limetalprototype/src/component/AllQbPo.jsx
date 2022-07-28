import React,{useEffect, useRef, useState} from 'react';
import axios from 'axios';

import ViewPoDetails from './ViewPoDetails';
import { useRecoilState } from 'recoil';
import viewQbPoDetailModalAtom from '../atoms/viewQbPoDetailsModalAtom';


const AllQbPo = () => {

    
    const [allQbpolist,SetAllQbpolist] = useState([]);
    const [poDetailsVisible,setPoDetailsVisible ]=useRecoilState(viewQbPoDetailModalAtom)
    const [selectedPoId,setSelectedPoId]=useState(0)
    

    const getAllQbPoList = async ()=>{
        const quickbooksCredentials=localStorage.getItem('quickbooksCredentials')

        const result = await axios.post(`http://localhost:4000/getAllPurchaseOrder`,{refreshToken:quickbooksCredentials});
        console.log(result)
        SetAllQbpolist(result.data.data);
       

    };



    useEffect(()=>{
        console.log("useeffect")
        getAllQbPoList()
       
    },[])

  
  return (
    <>
    {poDetailsVisible&& <ViewPoDetails selectedPoId={selectedPoId}/>}
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-6 mt-4">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-[#7DAFC1] dark:bg-gray-700 dark:text-gray-400 shadow-md ">
            <tr>
                <th scope="col" className="px-6 py-3">
                 Id
                </th>
                <th scope="col" className="px-6 py-3">
                PO Number
                </th>
                <th scope="col" className=" px-6 py-3 ">
                   Creation Date
                </th> 
                <th   scope="col" className="px-6 py-3">
                 Vendor Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Amount
                </th>
                <th scope="col" className="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {allQbpolist.length!=0?
           allQbpolist.map((po,index)=>
                (<>
                    <tr className={index %2 == 0 ? "bg-neutral-100 border-b text-neutral-800 ": "bg-[#7DAFC1] border-b text-neutral-800"} key={index} >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {po.pOId}
                    </th>
                    <td className="px-6 py-4">
                        {po.pONumber}
                    </td>
                    <td className="px-6 py-4">
                        {po.creationDate}
                    </td>
                    <td className="px-6 py-4">
                      {po.vendorName}
                    </td>
                    <td className="px-6 py-4">
                       {po.totalAmount}
                    </td>
                    <td onClick={()=>{setPoDetailsVisible(true);setSelectedPoId(po.pOId)}} className="px-6 py-4 font-light underline hover:cursor-pointer">
                       Info
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

export default AllQbPo