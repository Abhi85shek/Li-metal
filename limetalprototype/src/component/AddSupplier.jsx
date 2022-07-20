import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import addNewSupplierModalAtom from '../atoms/addNewSupplierModalAtom';

const AddSupplier = () => {
  
    const [showModal,setShowModal] = useRecoilState(addNewSupplierModalAtom);
    const [supplierName,setSupplierName] = useState("");
    const [company,setCompany] = useState("");
    const [streetAddress,setStreetAddress]=useState("");
    const [city,setCity]=useState("");
    const [province,setProvince]=useState("");
    const [country,setCountry] = useState("");
    const [postalCode,setPostalCode]=useState("")
    const [taxSlip,setTaxSlip]=useState("")
    const [phone,setPhone]=useState("")
    const [email,setEmail]=useState("")
    const [attachments,setAttachments]=useState("")
    const [openBalance, setOpenBalance]=useState("")
    const [supplierNumber,setSupplierNumber]=useState("")
    const [currency,setCurrency]=useState("")


   const addSupplierHandler= async (e)=>{
        e.preventDefault();

        let supplierDetails={
            supplierName:supplierName,
            company:company,
            streetAddress:streetAddress,
            city:city,
            province:province,
            country:country,
            postalCode:postalCode,
            taxSlip:taxSlip,
            phone:phone,
            email:email,
            openBalance:openBalance,
            supplierNumber:supplierNumber,
            currency:currency
        }


        const result = await axios.post('http://localhost:4000/createSupplier',{supplierDetails:supplierDetails});
        setShowModal(false);
        alert(result.data.message);
   };


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity pt-5" aria-hidden="true"></div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-7xl sm:w-full">
    <div className='flex bg-[#426b79] p-4 '>
                <div className='basis-2/3 justify-start'>
                <h3 className="text-xl leading -6 font-medium text-neutral-50 justify-center items-center"  id="modal-title">Add Supplier Details</h3>
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
                <form onSubmit={addSupplierHandler} className="w-[100%]">
                    <div className='flex space-x-2 mt-8  '>
                        <div className='basis-1/2'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Supplier Name</label>
                        <input type="text" id="supplier" value={supplierName} onChange={(e)=>{setSupplierName(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className='basis-1/2'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Company Name</label>
                        <input type="text" id="supplier" value={company} onChange={(e)=>{setCompany(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>
                    <div className='flex-col mt-4'>
                    <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Street Address</label>
                        <input type="text" id="supplier" value={streetAddress} onChange={(e)=>{setStreetAddress(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className='flex space-x-2 mt-4'>
                    <div className='basis-1/3'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>City</label>
                        <input type="text" id="supplier" value={city} onChange={(e)=>{setCity(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className='basis-1/3'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Province</label>
                        <input type="text" id="supplier" value={province} onChange={(e)=>{setProvince(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className='basis-1/3'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Country</label>
                        <input type="text" id="supplier" value={country} onChange={(e)=>{setCountry(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>
                    <div className='flex space-x-2 mt-4  '>
                        <div className='basis-1/2'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Postal Code</label>
                        <input type="text" id="supplier" value={postalCode} onChange={(e)=>{setPostalCode(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className='basis-1/2'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Tax Slip</label>
                        <input type="text" id="supplier" value={taxSlip} onChange={(e)=>{setTaxSlip(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>

                    <div className='flex space-x-2 mt-4  '>
                        <div className='basis-1/2'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Phone</label>
                        <input type="text" id="supplier" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className='basis-1/2'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Email</label>
                        <input type="text" id="supplier" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>

                    <div className='flex space-x-2 mt-4  '>
                        <div className='basis-1/3'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Supplier Number</label>
                        <input type="text" id="supplier" value={supplierNumber} onChange={(e)=>{setSupplierNumber(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className='basis-1/3'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Open Balance</label>
                        <input type="text" id="supplier" value={openBalance} onChange={(e)=>{setOpenBalance(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className='basis-1/3'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Currency</label>
                        <input type="text" id="supplier" value={currency} onChange={(e)=>{setCurrency(e.target.value)}} className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                       

                    </div>
                    

                    
                    <div className='flex m-4 mt-8 justify-center items-center'>
                        <button type="submit" class="text-white w-full bg-[#426b79] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Create</button>
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

export default AddSupplier;