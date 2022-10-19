import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import addProductModalAtom from '../atoms/addProductModalAtom';
const AddProductModal = () => {
  
    const [showModal,setShowModal] = useRecoilState(addProductModalAtom);
    const [productName,setProductName] = useState("");
    const [description,setDescription] = useState("");
    const [unitCost, setUnitCost] = useState(0);
    const [type,setType] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accounts, setAccounts] = useState([]);
    const typeList = ['Non-Inventory']


    const fetchAccounts = async ()=>{
      const accounts = await axios.get('http://localhost:4000/getAllAccounts',{

        headers:{

          Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`

        }

      });
      // console.log(accounts.data.data);
      setAccounts(accounts.data.data)
    }

   const addProductHandler= async (e)=>{
        e.preventDefault();
        const productDetails = {
          productName:productName,
          productDescription:description,
          unitCost:unitCost,
          type:type,
          accountNumber:accountNumber
        }
        console.log(productDetails)
      await axios.post('http://localhost:4000/createProduct', {

          headers:{
  
            Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
  
          }
  
        },{productDetails: productDetails});
        setShowModal(false);
        alert(result.data.message);
   };

   useEffect(() => {
    fetchAccounts()
  }, []);


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Add Product Details</h3>
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
                        <input type="number" min={1} id="unitCost" value={unitCost} placeholder='Enter Unit Cost'  onChange={(e)=>{setUnitCost(e.target.value)}} className='shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    <div className=''>
                        <label htmlFor='productName' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Type</label>
                        <select id="productName"value={type} onChange={(e)=>{setType(e.target.value)}} className='shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'>
                          <option>Select Product Type</option>
                          {typeList.map((l, i) => <option key={i} value={l} >{l}</option>)}
                        </select>
                    </div>
                    <div className=''>
                        <label htmlFor='accountNumber' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Type</label>
                        <select id="accountNumber"value={accountNumber} onChange={(e)=>{setAccountNumber(e.target.value)}} className='shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'>
                          <option>Select Account Number</option>
                          {accounts.map((a, i) => <option key={i} value={a.accountNumber} >{a.accountNumber}</option>)}
                        </select>
                    </div>
                    <div className='flex'>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
                    </div>
                </form>                  
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        {/* <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">Invite</button> */}
        <button type="button" onClick={()=>{setShowModal(false)}} classname="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddProductModal;