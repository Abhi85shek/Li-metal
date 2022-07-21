import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import addNewSupplierModalAtom from '../atoms/addNewSupplierModalAtom';
import { Formik, Form, Field } from 'formik';



const AddSupplier = () => {
  
  const [showModal,setShowModal]=useRecoilState(addNewSupplierModalAtom)


   const addSupplierHandler= async (values)=>{

        // e.preventDefault();

        let supplierDetails={
            supplierName:values.supplierName,
            company:values.company,
            streetAddress:values.streetAddress,
            city:values.city,
            province:values.province,
            country:values.country,
            postalCode:values.postalCode,
            taxSlip:values.taxSlip,
            phone:values.phone,
            email:values.email,
            openBalance:values.openBalance,
            supplierNumber:values.supplierNumber,
            currency:values.currency
        }


        const result = await axios.post('http://localhost:4000/createSupplier',{supplierDetails:supplierDetails});
        setShowModal(false);
        alert(result.data.message);
   };

   const validateField=value=> {
    let error;
    if (!value) {
      error = 'This is a required field';
    }
    return error;
  }


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
            <Formik
       initialValues={{
        supplierName:'',
        company:'',
        streetAddress:'',
        city:'',
        province:'',
        country:'',
        postalCode:'',
        taxSlip:'',
        phone:'',
        email:'',
        openBalance:'',
        supplierNumber:'',
        currency:''

       }}
      onSubmit={addSupplierHandler}
       >
         {({ errors, touched, isValidating }) => (
                <Form className="w-[100%]">
                    <div className='flex space-x-2 mt-8  '>
                        <div className='basis-1/2'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Supplier Name</label>
                        <Field type="text" id="supplierName" validate={validateField} name="supplierName" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.supplierName && touched.supplierName && <div className='text-red-700'>{errors.supplierName}</div>}
                        </div>
                        <div className='basis-1/2'>
                        <label htmlFor='company' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Company Name</label>
                        <Field type="text" id="company" validate={validateField} name="company" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.company && touched.company && <div className='text-red-700'>{errors.company}</div>}
                        </div>
                    </div>
                    <div className='flex-col mt-4'>
                    <label htmlFor='streetAddress' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Street Address</label>
                        <Field type="text" id="streetAddress" validate={validateField} name="streetAddress"className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.streetAddress && touched.streetAddress && <div className='text-red-700'>{errors.streetAddress}</div>}
                    </div>
                    <div className='flex space-x-2 mt-4'>
                    <div className='basis-1/3'>
                        <label htmlFor='city' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>City</label>
                        <Field type="text" id="city" validate={validateField} name="city" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.city && touched.city && <div className='text-red-700'>{errors.city}</div>}
                        </div>
                        <div className='basis-1/3'>
                        <label htmlFor='province' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Province</label>
                        <Field type="text" id="province" validate={validateField} name="province" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.province && touched.province && <div className='text-red-700'>{errors.province}</div>}
                        </div>
                        <div className='basis-1/3'>
                        <label htmlFor='country' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Country</label>
                        <Field type="text" id="country" validate={validateField} name="country" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.country && touched.country && <div className='text-red-700'>{errors.country}</div>}
                        </div>
                    </div>
                    <div className='flex space-x-2 mt-4  '>
                        <div className='basis-1/2'>
                        <label htmlFor='postalCode' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Postal Code</label>
                        <Field type="text" id="postalCode" validate={validateField} name="postalCode" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.postalCode && touched.postalCode && <div className='text-red-700'>{errors.postalCode}</div>}
                        </div>
                        <div className='basis-1/2'>
                        <label htmlFor='taxSlip' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Tax Slip</label>
                        <Field type="text" id="taxSlip" validate={validateField} name="taxSlip" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.taxSlip && touched.taxSlip && <div className='text-red-700'>{errors.taxSlip}</div>}
                        </div>
                    </div>

                    <div className='flex space-x-2 mt-4  '>
                        <div className='basis-1/2'>
                        <label htmlFor='phone' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Phone</label>
                        <Field type="text" id="phone" validate={validateField} name="phone" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.phone && touched.phone && <div className='text-red-700'>{errors.phone}</div>}
                        </div>
                        <div className='basis-1/2'>
                        <label htmlFor='email' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Email</label>
                        <Field type="email" id="email" validate={validateField} name="email" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.email && touched.email && <div className='text-red-700'>{errors.email}</div>}
                        </div>
                    </div>

                    <div className='flex space-x-2 mt-4  '>
                        <div className='basis-1/3'>
                        <label htmlFor='openBalance' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Open Balance</label>
                        <Field type="text" id="openBalance" validate={validateField} name="openBalance" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.openBalance && touched.openBalance && <div className='text-red-700'>{errors.openBalance}</div>}
                        </div>
                        <div className='basis-1/3'>
                        <label htmlFor='supplierNumber' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Supplier Number</label>
                        <Field type="text" id="supplierNumber" validate={validateField} name="supplierNumber" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.supplierNumber && touched.supplierNumber && <div className='text-red-700'>{errors.supplierNumber}</div>}
                        </div>
                        <div className='basis-1/3'>
                        <label htmlFor='currency' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Currency</label>
                        <div className='flex shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                        <Field as="select" id="currency" validate={validateField} name="currency" className="justify-start basis-full outline-none border-none active:outline-none hover:outline-none focus:outline-none">
                        <option>USD $</option>
                        <option>CAD $</option>
                        <option>EUR €</option>
                        <option>RUP ₹</option>
                       <option>YEN ¥</option>
                        </Field>
                       
                        </div>
                        {errors.currency && touched.currency && <div className='text-red-700'>{errors.currency}</div>}
                        </div>
                       

                    </div>
                    

                    
                    <div className='flex m-4 mt-8 justify-center items-center'>
                        <button disabled={isValidating} type="submit" class="text-white w-full bg-[#426b79] hover:bg-[#305460] focus:bg-[#2c4b58] font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Create Supplier</button>
                    </div>
                </Form> 
         )} 
                </Formik>                
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