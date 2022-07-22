import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { Formik, Form, Field ,useFormikContext} from 'formik';
import CurrencyList from 'currency-list'
import { useEffect } from 'react';
import { Country, State, City }  from 'country-state-city';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import editSupplierModalAtom from '../atoms/EditSupplierModalAtom';



const EditSupplierModal = (props) => {
  
  const [showModal,setShowModal]=useRecoilState(editSupplierModalAtom)
  const [allCurrencies,setAllCurrencies]=useState([])
  const [countries,setAllCountries]=useState([])
  const [states,setAllStates]=useState([])
  const [cities,setAllCities]=useState([])
  const [selectedCountry,setSelectedCountry]=useState("")
  const [city,setSelectedCity]=useState("")
  const [selectedState,setSelectedState]=useState("")
  const [currentCountryCode,setCurrentCountryCode]=useState('')
 


  useEffect(()=>{
    console.log(props.selectedSupplier)
    let cityList
    let stateList
    let curl=CurrencyList.getAll('en_US')
    let countryList=Country.getAllCountries()
    if(props.selectedSupplier.Country!='xyzn' && props.selectedSupplier.Country!=null){
    setSelectedCountry(props.selectedSupplier.Country.split('-')[1])
    }
    if(props.selectedSupplier.Province!=null && props.selectedSupplier.Province!='xyzn'){
    setSelectedState(props.selectedSupplier.Province.split('-')[1])
    }
    if(props.selectedSupplier.Country!='xyzn' && props.selectedSupplier.Country!=null){
    stateList=State.getStatesOfCountry(props.selectedSupplier.Country.split('-')[1])
    }
    else{
        stateList=[]
    }
   if(props.selectedSupplier.Country!=null && props.selectedSupplier.Country!='xyzn'  && props.selectedSupplier.Country.split('-')[1]=='GB'){
        cityList=stateList
   }
   else{
    if(props.selectedSupplier.Province!=null && props.selectedSupplier.Province!='xyzn'){
   cityList=City.getCitiesOfState(props.selectedSupplier.Country.split('-')[1],props.selectedSupplier.Province.split('-')[1])
    }
    else{
        cityList=[]
    }
   }
   console.log(cityList)
   setAllCities(cityList)
   setAllStates(stateList)
    setAllCountries(countryList)
    console.log(countryList)
    let templist=Object.values(curl)
    console.log(templist)
    setAllCurrencies(templist)
    console.log(allCurrencies)
    
},[])

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

   const editSupplierHandler= async (values)=>{

        // e.preventDefault();

        let supplierDetails={
            supplierName:values.supplierName,
            company:values.company,
            streetAddress:values.streetAddress,
            city:values.city,
            Province:values.province,
            country:values.country,
            postalCode:values.postalCode,
            taxSlip:values.taxSlip,
            phone:values.phone,
            email:values.email,
            openBalance:values.openBalance,
            supplierNumber:values.supplierNumber,
            currency:values.currency
        }


        const result = await axios.post(`http://localhost:4000/editSupplier/${props.selectedSupplier.id}`,{supplierDetails:supplierDetails});
        if(result.status==201)
       {
        console.log("toasting")
        
            toast.success('Supplier edited successfully', {
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
                <h3 className="text-xl leading -6 font-medium text-neutral-50 justify-center items-center"  id="modal-title">Edit Supplier Details</h3>
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
        supplierName:props.selectedSupplier.supplier,
        company:props.selectedSupplier.company,
        streetAddress:props.selectedSupplier.streetAddress,
        city:props.selectedSupplier.city,
        province:props.selectedSupplier.Province,
        country:props.selectedSupplier.Country,
        postalCode:props.selectedSupplier.postalCode,
        taxSlip:props.selectedSupplier.taxSlip,
        phone:props.selectedSupplier.phone,
        email:props.selectedSupplier.email,
        openBalance:props.selectedSupplier.openBalance,
        supplierNumber:props.selectedSupplier.supplierNumber,
        currency:props.selectedSupplier.currency

       }}
      onSubmit={editSupplierHandler}
       >
         {({ errors, touched, isValidating }) => (
                <Form onChange={handleOnChange} className="w-[100%]">
                    <div className='flex space-x-2 mt-8  '>
                        <div className='basis-1/2'>
                        <label htmlFor='supplier' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Supplier Name</label>
                        <Field placeholder="Enter Supplier Name" type="text" id="supplierName" validate={validateField} name="supplierName" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.supplierName && touched.supplierName && <div className='text-red-700'>{errors.supplierName}</div>}
                        </div>
                        <div className='basis-1/2'>
                        <label htmlFor='company' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Company Name</label>
                        <Field placeholder="Enter Supplier Company" type="text" id="company" validate={validateField} name="company" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.company && touched.company && <div className='text-red-700'>{errors.company}</div>}
                        </div>
                    </div>
                    <div className='flex-col mt-4'>
                    <label htmlFor='streetAddress' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Street Address</label>
                        <Field placeholder="Enter Supplier Address" type="text" id="streetAddress" validate={validateField} name="streetAddress"className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.streetAddress && touched.streetAddress && <div className='text-red-700'>{errors.streetAddress}</div>}
                    </div>
                    <div className='flex space-x-2 mt-4'>
                    <div className='basis-1/3'>
                        <label htmlFor='country' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Country</label>
                        <div className='flex shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                        <Field placeholder={props.selectedSupplier.Country} as="select" id="country" validate={validateDropdownField} name="country" className="justify-start basis-full outline-none border-none active:outline-none hover:outline-none focus:outline-none">
                        <option  className='text-neutral-400 hover:bg-none' value={1}>Select Country</option>
                        {countries.length>0?
                        countries.map((country)=>
                        (                          
                                     <option value={country.name+'-'+country.isoCode}> {country.name} </option>
                        )
                        )
                        
                        
            :
                     <>  
                       
                       </>

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
                        )
                        
                        
            :
                     <>  
                       
                       </>

                      }
                      </Field>
                      </div>
                        
                        
                        {errors.province && touched.province && <div className='text-red-700'>{errors.province}</div>}
                        </div>

                    <div className='basis-1/3'>
                        <label htmlFor='city' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>City</label>
                        <div className='flex shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                        <Field placeholder={props.selectedSupplier.city}  as="select" id="city" validate={validateDropdownField} name="city" className="justify-start basis-full outline-none border-none active:outline-none hover:outline-none focus:outline-none">
                        <option   className='text-neutral-400 hover:bg-none' value={1}>Select City</option>
                        {cities.length>0?
                        cities.map((city)=>
                        (                          
                                     <option value={city.name}>{city.name} </option>
                        )
                        )
                        
                        
            :
                     <>  
                       
                       </>

                      }
                      </Field>
                      </div>
                        {errors.city && touched.city && <div className='text-red-700'>{errors.city}</div>}
                        </div>
                       
                        
                    </div>
                    <div className='flex space-x-2 mt-4  '>
                        <div className='basis-1/2'>
                        <label htmlFor='postalCode' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Postal Code</label>
                        <Field placeholder="Enter Supplier Postal Code" type="text" id="postalCode" validate={validateField} name="postalCode" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.postalCode && touched.postalCode && <div className='text-red-700'>{errors.postalCode}</div>}
                        </div>
                        <div className='basis-1/2'>
                        <label htmlFor='taxSlip' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Tax Slip</label>
                        <Field  placeholder="Enter Supplier Tax  Slip" type="text" id="taxSlip" validate={validateField} name="taxSlip" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.taxSlip && touched.taxSlip && <div className='text-red-700'>{errors.taxSlip}</div>}
                        </div>
                    </div>

                    <div className='flex space-x-2 mt-4  '>
                        <div className='basis-1/2'>
                        <label htmlFor='phone' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Phone</label>
                        <Field placeholder="Enter Supplier Phone Number" type="text" id="phone" validate={validatePhoneNumber} name="phone" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.phone && touched.phone && <div className='text-red-700'>{errors.phone}</div>}
                        </div>
                        <div className='basis-1/2'>
                        <label htmlFor='email' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Email</label>
                        <Field placeholder="Enter Supplier Email" type="email" id="email" validate={validateField} name="email" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.email && touched.email && <div className='text-red-700'>{errors.email}</div>}
                        </div>
                    </div>

                    <div className='flex space-x-2 mt-4  '>
                        <div className='basis-1/3'>
                        <label htmlFor='openBalance' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Open Balance</label>
                        <Field placeholder="Enter Supplier Open Balance" type="text" id="openBalance" validate={validateField} name="openBalance" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.openBalance && touched.openBalance && <div className='text-red-700'>{errors.openBalance}</div>}
                        </div>
                        <div className='basis-1/3'>
                        <label htmlFor='supplierNumber' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Supplier Number</label>
                        <Field placeholder="Enter Supplier Number" type="text" id="supplierNumber" validate={validateField} name="supplierNumber" className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.supplierNumber && touched.supplierNumber && <div className='text-red-700'>{errors.supplierNumber}</div>}
                        </div>
                        <div className='basis-1/3'>
                        <label htmlFor='currency' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Currency</label>
                        <div className='flex shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                        <Field defaultValue={1} placeholder="Select Currency" as="select" id="currency" validate={validateDropdownField} name="currency" className="justify-start basis-full outline-none border-none active:outline-none hover:outline-none focus:outline-none">
                        <option className='text-neutral-400 hover:bg-none' value={1}>Select Currency</option>
                        {allCurrencies.length>0?
                        allCurrencies.map((current)=>
                        (                          
                                     <option value={current.code}>{current.code}-{current.symbol} -({current.name} )</option>
                        )
                        )
                        
                        
            :
                     <>  
                     
                       </>
                      }
                        </Field>
                       
                        </div>
                        {errors.currency && touched.currency && <div className='text-red-700'>{errors.currency}</div>}
                        </div>
                       

                    </div>
                    

                    
                    <div className='flex m-4 mt-8 justify-center items-center'>
                        <button disabled={isValidating} type="submit" class="text-white w-full bg-[#426b79] hover:bg-[#305460] focus:bg-[#2c4b58] font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Submit Supplier</button>
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

export default EditSupplierModal;