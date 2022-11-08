import React,{useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { useRecoilState,useRecoilValue} from 'recoil';
import { BsSearch } from "react-icons/bs";
import editSupplierModalAtom from '../atoms/EditSupplierModalAtom';
import EditSupplierModal from './EditSupplierModal';
import AddSupplier from './AddSupplier';

const AllSuppliers = () => {

    
    const [allSuppliers,setallSuppliers] = useState([]);
    const [totalRecords,setTotalRecords] = useState(0);
    let [currentPage,setCurrentPage] = useState(0);
    let [searchSupplier, setsearchSupplier]=useState("")
    let [selctedSupplerNumber,setSelectedSupplierNumber]=useState()
    let [selectedSupplier,setselectedSupplier]=useState([])
    const [showEditModal,setShowEditModal]=useRecoilState(editSupplierModalAtom)
    const filterRef=useRef([])
    const currentCount =10;
    let totalNumberOfPages;

    const getAllSuppliers = async ()=>{

        const result = await axios.get(`http://localhost:4000/allSuppliers/${currentPage}/${currentCount}`,{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        setallSuppliers(result.data.data.cur_records);
        setTotalRecords(result.data.data.total_count);

    };

    const getSupplierByNameForFirstSearch = async ()=>{
        setCurrentPage(0)
        const result = await axios.post(`http://localhost:4000/searchSupplier/${0}/${currentCount}`, {supplierName:searchSupplier},{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        setallSuppliers(result.data.data.cur_records);
        setTotalRecords(result.data.data.total_count);
    };

    const getSuppliersByName = async ()=>{
        const result = await axios.post(`http://localhost:4000/searchSupplier/${currentPage}/${currentCount}`, {supplierName:searchSupplier},{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        setallSuppliers(result.data.data.cur_records);
        setTotalRecords(result.data.data.total_count);
    };

    const previousPageHandler =()=>{
        if(currentPage>0)
        {
            setCurrentPage(--currentPage);
        }

        if(searchSupplier.length>0 ){
           
          
                getSuppliersByName()
            
        }
        else{
         
              getAllSuppliers();
         
      };
        
    };

    


    useEffect(()=>{
        console.log("searching all suppliers")
        if(searchSupplier.length==0){
           
                getAllSuppliers()
            
        }
        else{
         
            getSupplierByNameForFirstSearch()
        }
    },[searchSupplier])

    const nextPageHandler = ()=>{
        setCurrentPage(++currentPage);
        if(searchSupplier.length>0)
        {
        
                getSuppliersByName()
            
        }
        else{
          
            getAllSuppliers();
       
    };
    }

    totalNumberOfPages = Math.ceil(totalRecords/10);
  return (
    <>
  { showEditModal ? <EditSupplierModal selectedSupplier={selectedSupplier} /> : null}
    <div className='w-full px-40 py-2 '>
        <div className='w-full flex border-[#6BA4B8] border-2 border- h-14 rounded-md pl-4 '>
        <BsSearch size={28} className='mt-3 text-slate-400 text-xl'/>
        <input placeholder='Start typing to search a supplier....' className='w-full text-xl text-slate-400 px-4 focus:outline-none  ' onChange={(val)=>{setsearchSupplier(val.target.value)}}/>
        </div>
    </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-6 mt-4">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-[#7DAFC1] dark:bg-gray-700 dark:text-gray-400 shadow-md ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>

                <th scope="col" className=" px-6 py-3 ">
                   Address
                </th> 
                <th   scope="col" className="px-6 py-3">
                   Country
                </th>
                <th scope="col" className="px-6 py-3">
                    Currency
                </th>
                {/* <th scope="col" className="px-6 py-3">
                    Edit
                </th>
                <th scope="col" className="px-6 py-3">
                    Order
                </th> */}
            </tr>
        </thead>
        <tbody>
           { allSuppliers.map((supplier,index)=>
                (
                    <tr className={index %2 == 0 ? "bg-neutral-100 border-b text-neutral-800 ": "bg-[#7DAFC1] border-b text-neutral-800"} key={supplier.id} >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {supplier.name}
                    </th>
                    <td className="px-6 py-4">
                        {supplier.streetAddress}
                    </td>
                    <td className="px-6 py-4">
                      {supplier.country}
                    </td>
                    <td className="px-6 py-4">
                       {supplier.currency}
                    </td>
                    {/* <td onClick={()=>{setShowEditModal(true);setselectedSupplier(supplier)}} className="px-6 py-4">
                        <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Edit</p>
                    </td>
                    <td onClick={()=>{setSelectedSupplierNumber(supplier.supplierNumber)}} className="px-6 py-4">
                        <button className={index%2==0?"  text-[#3C86A1] p-2 text-[1.1vw] rounded font-md hover:underline cursor-pointer border-2 border-[#3C86A1]" :"text-neutral-100 text-[1.1vw] rounded border-[#3C86A1] border-2 p-2 font-md hover:underline cursor-pointer "}>Create</button>
                    </td> */}
                </tr>
                )
           )
           }
        </tbody>
    </table>
    <div className='py-2 min-w-full sm:px-6 flex lg:px-8 '>
        <p>Page {currentPage+1}/{totalNumberOfPages}</p>
    </div>
    <div class="flex flex-col items-center">
                 <span class="text-sm text-gray-700 dark:text-gray-400 mt-">
                    Showing <span class="font-semibold text-gray-900 dark:text-white">{(currentPage*10)+1}</span> to <span class="font-semibold text-gray-900 dark:text-white">{currentPage*10 + 10 > totalRecords ? (currentPage*10 + 10)-(currentPage*10 + 10 - totalRecords) :currentPage*10 + 10  }</span> of <span class="font-semibold text-gray-900 dark:text-white">{totalRecords}</span> Entries
                </span>
   
    <div className=' py-6 min-w-full sm:px-6 flex lg:px-8 text-center space-x-5 justify-center'>
                   
                      <button type='button' onClick={previousPageHandler} className={currentPage == 0 ? 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white-500 bg-gray-400 rounded-lg border border-gray-300 opacity-70 cursor-no-drop dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:text-white'
      : 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} disabled={currentPage == 0  ||(searchSupplier.length>0 && totalRecords<10 )? true : false}>
                        <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                            Previous</button>
                      <button type='button' onClick={nextPageHandler} 
                      className={currentPage+1 == totalNumberOfPages ? 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white-500 bg-gray-400 rounded-lg border border-gray-300 opacity-70 cursor-no-drop dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:text-white'
                      : 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} disabled={currentPage+1 == totalNumberOfPages ||(searchSupplier.length>0 && totalRecords<10 ) ?true :false}>
                          Next
                        <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                       </button>

    </div>
</div>

</div>
    </>
  )
}

export default AllSuppliers