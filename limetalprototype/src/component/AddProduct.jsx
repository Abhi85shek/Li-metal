import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import addProductModalAtom from '../atoms/addProductModalAtom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  
    const [showModal,setShowModal] = useRecoilState(addProductModalAtom);
    const [productName,setProductName] = useState("");
    const [description,setDescription] = useState("");
    const [unitCost, setUnitCost] = useState("");
    const [type,setType] = useState("");
    const [accountIndex, setAccountIndex] = useState("");
    const [accounts, setAccounts] = useState([]);
    const typeList = ['Non-Inventory']


    const fetchAccounts = async ()=>{
      const accounts = await axios.get('http://localhost:4000/getAllAccounts');
      console.log(accounts.data.data);
      setAccounts(accounts.data.data)
    }

   const addProductHandler= async ()=>{
        const productDetails = {
          productName:productName,
          productDescription:description,
          unitCost:unitCost,
          type:type,
          accountDetails: {
            name: accounts[accountIndex]['name'],
            qbId: accounts[accountIndex]['qbid']
          }
        }
        console.log(productDetails)
        const result = await axios.post('http://localhost:4000/createProduct', {productDetails: productDetails});
        if(result.status==200)
       {
        console.log("toasting")
        
            toast.success('Product added successfully', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
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
        setShowModal(false);
   };

   useEffect(() => {
    fetchAccounts()
  }, []);


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto px-96" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity pt-5" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-7xl sm:w-full">
                <div className='flex bg-[#426b79] p-4 '>
                    <div className='basis-2/3 justify-start'>
                        <h3 className="text-xl leading -6 font-medium text-neutral-50 justify-center items-center"  id="modal-title">Add Product Details</h3>
                    </div>
                    
                    <div className='basis-1/3'>
                        <div className='flex justify-end'>
                            <AiOutlineClose onClick={()=>{setShowModal(false)}} size={30} className='text-neutral-50 hover:cursor-pointer' />
                        </div>
                    </div>
                </div>
                <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <div className="mt-3 w-[100%]">
                            <form onSubmit={addProductHandler} className="w-[100%]">
                                <div className=''>
                                    <label htmlFor='productName' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Product Name</label>
                                    <input type="text" id="productName" placeholder='Enter Product Name' value={productName} onChange={(e)=>{setProductName(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                </div>
                                <div className="w-full mt-4">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                            Description
                                    </label>
                                    <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className='mb-3 form-control block w-full px-3 py-1.5 border-gray-700 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' id="description" placeholder='Description'></textarea>
                                </div>
                                <div className=''>
                                    <label htmlFor='unitCost' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Unit Cost</label>
                                    <input type="text" id="unitCost" value={unitCost} placeholder='Enter Unit Cost'  onChange={(e)=>{setUnitCost(e.target.value)}} className='shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'/>
                                </div>
                                <div className=''>
                                    <label htmlFor='productName' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Type</label>
                                    <select id="productName"value={type} onChange={(e)=>{setType(e.target.value)}} className='shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'>
                                    <option>Select Product Type</option>
                                    {typeList.map((l, i) => <option key={i} value={l} >{l}</option>)}
                                    </select>
                                </div>
                                <div className=''>
                                    <label htmlFor='accountName' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Type</label>
                                    <select id="accountName" onChange={(e)=>{setAccountIndex(e.target.value)}} className='shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'>
                                    <option>Select Account</option>
                                    {accounts.map((a, i) => <option key={i} value={i} >{a.name}</option>)}
                                    </select>
                                </div>
                                <div className='flex m-4 mt-8 justify-center items-center'>
                                        <button class="text-white w-full bg-[#426b79] hover:bg-[#305460] focus:bg-[#2c4b58] font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2  focus:outline-none " onClick={() => addProductHandler()}>Create Product</button>
                                </div>
                            </form>           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )         
}

export default AddProduct;


