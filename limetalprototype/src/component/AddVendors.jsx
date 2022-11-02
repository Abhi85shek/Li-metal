import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import addNewVendorModalAtom from '../atoms/addNewVendorModalAtom';
import { Formik, Form, Field ,useFormikContext} from 'formik';
import CurrencyList from 'currency-list'
import { useEffect } from 'react';
import { Country, State, City }  from 'country-state-city';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AutoSubmitToken = () => {
  // Grab values and submitForm from context
  const { values, submitForm } = useFormikContext();
  React.useEffect(() => {
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
  //  console.log(values)
  }, [values]);
  return null;
};

const AddVendors = () => {
  
  const [showModal,setShowModal]=useRecoilState(addNewVendorModalAtom)
  const [allCurrencies,setAllCurrencies]=useState([])
  const [countries,setAllCountries]=useState(['USA-US', 'Canada-CA'])
  const [states,setAllStates]=useState([])
  const [cities,setAllCities]=useState([])
  const [selectedCountry,setSelectedCountry]=useState("")
  const [city,setSelectedCity]=useState("")
  const [selectedState,setSelectedState]=useState("")
 


//   useEffect(()=>{
//     let curl=CurrencyList.getAll('en_US')
//     let countryList=Country.getAllCountries()
//     setAllCountries(countryList)
//     console.log(countryList)
//     let templist=Object.values(curl)
//     console.log(templist)
//     setAllCurrencies(templist)
//     console.log(allCurrencies)
// },[])

const handleOnChange = (event) => {
 if(event.target.id=="country")
 {
  console.log(event.target.value)
  let countryName=event.target.value.split('-')[1]
  console.log(countryName)
  setSelectedCountry(countryName)
 }
 if(event.target.id=="province")
 {
  console.log(event.target.value)
  let stateName=event.target.value.split('-')[1]
  console.log(stateName)
  setSelectedState(stateName)
};
}
useEffect(()=>{
  if(selectedCountry.length>0){
  setAllCities([])
  let statesList=State.getStatesOfCountry(selectedCountry)
  console.log(statesList)
  setAllStates(statesList)
  }
},[selectedCountry])

useEffect(()=>{
  let cityList
  if(selectedState.length>0){
  if(selectedCountry=='GB')
  {
    cityList=states    
  }
  else{
  cityList=City.getCitiesOfState(selectedCountry,selectedState)
  }
  console.log(cityList)
  setAllCities(cityList)
  }
},[selectedState])

   const addSupplierHandler= async (values)=>{

        // e.preventDefault();
        let refreshToken = localStorage.getItem('quickbooksCredentials')
        let vendorDetails={
            vendorName: values.vendorName,
            familyName: values.familyName,
            phone: values.phone,
            email: values.email,
            companyName: values.companyName,
            taxIdentifier: values.taxIdentifier,
            accountNumber: values.accountNumber,
            addressLineOne: values.addressLineOne,
            addressLineTwo: values.addressLineTwo,
            addressLineThree: values.addressLineThree,
            country: values.country.split('-')[0],
            province: values.province,
            city: values.city,
            postalCode: values.postalCode,
            countrySubDivisionCode: values.country.split('-')[1],
            supplierNumber:values.supplierNumber
        }
    console.log(vendorDetails, refreshToken)

        await axios.post('http://localhost:4000/createVendor',{vendorDetails: vendorDetails, refreshToken: refreshToken},{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          }).then(res=>{console.log(res); 
            toast.success('Vendor succesfully added', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });}).catch(err=>{console.log(err);
            if(err.response?.status==404){
              toast.error('Not Found', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
            }
           else if(err.response?.status==500){
            toast.error('Internal Server Error', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            }
            else if(err.response?.status==401){
              toast.error('You are not authorized', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
        
            }});
            setShowModal(false);
       
}
      
        
 

   const validateField=value=> {
    let error;
    if (!value) {
      error = 'This is a required field';
    }
    return error;
  }

  const validateDropdownField=value=> {
    let error;
    if (!value || value==1) {
      error = 'Please select an option';
    }
    return error;
  }

  const validatePhoneNumber=value=> {
    let error;
    if (!value) {
      error = 'This is a required field';
    }
    else if(!/^[0-9]*$/.test(value)){
      error = 'Invalid phone Number';
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
                        <h3 className="text-xl leading -6 font-medium text-neutral-50 justify-center items-center"  id="modal-title">Add Vendor Details</h3>
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
                                vendorName:'',
                                familyName:'',
                                phone:'',
                                email:'',
                                companyName:'',
                                taxIdentifier:'',
                                accountNumber:'',
                                addressLineOne:'',
                                addressLineTwo:'',
                                addressLineThree:'',
                                country:'',
                                province:'',
                                city:'',
                                postalCode:'',
                                countrySubDivisionCode:'',
                                suppplierNumber:''
                            }}
                            onSubmit={addSupplierHandler}
                        >
                            {({ errors, touched, isValidating }) => (
                                <Form onChange={handleOnChange} className="w-[100%]">
                                    <div className='flex space-x-2 mt-8  '>
                                        <div className='basis-1/2'>
                                            <label htmlFor='vendorName' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Full Name</label>
                                            <Field placeholder="Enter Full Name" type="text" id="vendorName" validate={validateField} name="vendorName" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                            {errors.vendorName && touched.vendorName && <div className='text-red-700'>{errors.vendorName}</div>}
                                        </div>
                                        <div className='basis-1/2'>
                                            <label htmlFor='familyName' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Family Name</label>
                                            <Field placeholder="Enter Family Name" type="text" id="familyName" validate={validateField} name="familyName" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                            {errors.familyName && touched.familyName && <div className='text-red-700'>{errors.familyName}</div>}
                                        </div>
                                    </div>

                                    <div className='flex space-x-2 mt-4  '>
                                        <div className='basis-1/2'>
                                        <label htmlFor='phone' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Phone</label>
                                        <Field placeholder="Enter Vendor Phone Number" type="text" id="phone" validate={validatePhoneNumber} name="phone" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                        {errors.phone && touched.phone && <div className='text-red-700'>{errors.phone}</div>}
                                        </div>
                                        <div className='basis-1/2'>
                                        <label htmlFor='email' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Email</label>
                                        <Field placeholder="Enter Vendor Email" type="email" id="email" validate={validateField} name="email" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                        {errors.email && touched.email && <div className='text-red-700'>{errors.email}</div>}
                                        </div>
                                    </div>

                                    <div className='flex space-x-2 mt-4  '>
                                        <div className='basis-1/3'>
                                            <label htmlFor='companyName' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Company Name</label>
                                            <Field placeholder="Enter Company Name" type="text" id="companyName" validate={validateField} name="companyName" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                            {errors.companyName && touched.companyName && <div className='text-red-700'>{errors.companyName}</div>}
                                        </div>
                                        <div className='basis-1/3'>
                                            <label htmlFor='taxIdentifier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Tax Identifier</label>
                                            <Field placeholder="Enter Tax Identifier" type="number" id="taxIdentifier" validate={validateField} name="taxIdentifier" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                            {errors.taxIdentifier && touched.taxIdentifier && <div className='text-red-700'>{errors.taxIdentifier}</div>}
                                        </div>
                                        <div className='basis-1/3'>
                                            <label htmlFor='accountNumber' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Account Number</label>
                                            <Field placeholder="Enter Account Number" type="text" id="accountNumber" validate={validateField} name="accountNumber" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                            {errors.accountNumber && touched.accountNumber && <div className='text-red-700'>{errors.accountNumber}</div>}
                                        </div>
                                    </div>

                                    <div className='flex-col mt-4'>
                                        <label htmlFor='' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Billing Address</label>
                                        <Field placeholder="Address Line 1" type="text" id="addressLineOne" validate={validateField} name="addressLineOne"className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                        {errors.addressLineOne && touched.addressLineOne && <div className='text-red-700'>{errors.addressLineOne}</div>}
                                        <label htmlFor='' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'></label>
                                        <Field placeholder="Address Line 2" type="text" id="addressLineTwo" validate={validateField} name="addressLineTwo"className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                        {errors.addressLineTwo && touched.addressLineTwo && <div className='text-red-700'>{errors.addressLineTwo}</div>}
                                        <label htmlFor='' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'></label>
                                        <Field placeholder="Address Line 3" type="text" id="addressLineThree" validate={validateField} name="addressLineThree"className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                        {errors.addressLineThree && touched.addressLineThree && <div className='text-red-700'>{errors.addressLineThree}</div>}
                                    </div>
                                    <div className='flex space-x-2 mt-4'>
                                        <div className='basis-1/3'>
                                            <label htmlFor='country' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Country</label>
                                            <div className='flex shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                            <Field  as="select" id="country" validate={validateDropdownField} name="country" className="justify-start basis-full outline-none border-none active:outline-none hover:outline-none focus:outline-none">
                                                <option className='text-neutral-400 hover:bg-none' value={1}>Select Country</option>
                                                {countries.length>0?
                                                    countries.map((country)=>
                                                        (                          
                                                            <option value={country}> {country.split('-')[0]} </option>
                                                        )
                                                    ) : <>  </>
                                                }
                                            </Field>
                                        </div>
                                        {errors.country && touched.country && <div className='text-red-700'>{errors.country}</div>}
                                    </div>
                                        <div className='basis-1/3'>
                                            <label htmlFor='province' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>State/Province</label>
                                            <div className='flex shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                <Field as="select" id="province" validate={validateDropdownField} name="province" className="justify-start basis-full outline-none border-none active:outline-none hover:outline-none focus:outline-none">
                                                    <option className='text-neutral-400 hover:bg-none' value={1}>Select State</option>
                                                    {states.length>0?
                                                        states.map((mystate)=>
                                                            (                          
                                                            <option value={mystate.name+'-'+mystate.isoCode}> {mystate.name} </option>
                                                            )
                                                        ) : <>  </>
                                                    }
                                                </Field>
                                            </div>
                                            {errors.province && touched.province && <div className='text-red-700'>{errors.province}</div>}
                                        </div>
                                        <div className='basis-1/3'>
                                            <label htmlFor='city' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>City</label>
                                            <div className='flex shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                <Field  as="select" id="city" validate={validateDropdownField} name="city" className="justify-start basis-full outline-none border-none active:outline-none hover:outline-none focus:outline-none">
                                                    <option  className='text-neutral-400 hover:bg-none' value={1}>Select City</option>
                                                    {cities.length>0?
                                                        cities.map((city)=>
                                                            (                          
                                                                <option value={city.name}> {city.name} </option>
                                                            )
                                                        ) : <></>
                                                    }
                                                </Field>
                                            </div>
                                            {errors.city && touched.city && <div className='text-red-700'>{errors.city}</div>}
                                        </div>    
                                    </div>

                                    <div className='flex space-x-2 mt-4  '>
                                        <div className='basis-1/2'>
                                            <label htmlFor='postalCode' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Postal Code/Zip Code</label>
                                            <Field placeholder="Enter Supplier Postal Code" type="text" id="postalCode" validate={validateField} name="postalCode" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                            {errors.postalCode && touched.postalCode && <div className='text-red-700'>{errors.postalCode}</div>}
                                        </div>
                                        <div className='basis-1/2'>
                                            <label htmlFor='supplierNumber' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Supplier Number</label>
                                            <Field placeholder="Enter Supplier Number " type="text" id="supplierNumber" validate={validateField} name="supplierNumber" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                            {errors.supplierNumber && touched.supplierNumber && <div className='text-red-700'>{errors.supplierNumber}</div>}
                                        </div>
                                        {/* <div className='basis-1/2'>
                                            <label htmlFor='countrySubDivisionCode' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Country Sub-division Code</label>
                                            <Field  placeholder="Enter Country Sub-division Code" type="text" id="countrySubDivisionCode" validate={validateField} name="countrySubDivisionCode" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                            {errors.countrySubDivisionCode && touched.countrySubDivisionCode && <div className='text-red-700'>{errors.countrySubDivisionCode}</div>}
                                        </div> */}
                                    </div>
                    
                                    <div className='flex m-4 mt-8 justify-center items-center'>
                                        <button disabled={isValidating} type="submit" class="text-white w-full bg-[#426b79] hover:bg-[#305460] focus:bg-[#2c4b58] font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Create Vendor</button>
                                    </div>
                                    <AutoSubmitToken/>
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

export default AddVendors;