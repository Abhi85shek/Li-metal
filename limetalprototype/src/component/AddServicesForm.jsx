import React,{useState} from 'react';
import { useRecoilState } from 'recoil';
import serviceDetailsAtom from '../atoms/ServiceState';
import editModalAtom from '../atoms/editModelState';
import { v4 as uuidv4 } from 'uuid';
const AddServicesForm = () => {

  // Get Recoil State
  const [serviceModalState,setServiceModalState] = useRecoilState(editModalAtom);
  const [serviceDetails,setServiceDetails] =useRecoilState(serviceDetailsAtom);
  const [service,setService] = useState("");
  const [description,setDescription] = useState("");
  const [quantity,setQuantity] = useState("");
  const [tax,setTax] = useState("");
  const [rate,setRate] =useState("");
  const [totalAmount,setTotalAmount] =useState(0);
  const serviceHandler =(e)=>{
    setService(e.target.value);
  }
  
  const descriptionHandler= (e)=>{
    setDescription(e.target.value);
  };

  const quantityHandler =(e)=>{
    setQuantity(e.target.value);
  };

  const rateHandler =(e)=>{
    setRate(e.target.value);
  };

  const taxHandler =(e)=>{
    if(e.target.checked)
      {
        setTax("HST ON");
      }
      else
      {
        setTax("HST OFF");
      }
    
  };

  const addServiceHandler=(e)=>{

    e.preventDefault();
    setServiceDetails((oldVinDetails)=>[
      ...oldVinDetails,
      {
        id:uuidv4(),
        serviceName:service,
        description:description,
        quantity:quantity,
        rate:rate,
        tax:tax,
        totalAmount:quantity* rate
       }
     
 ]);
    setServiceModalState(true);
    setService("");
    setQuantity("");
    setDescription("");
    setRate("");
  };
  
  return (
    <form className="w-full max-w-lg">
    <div className="w-full mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="service">
        Service Name
      </label>
      <input className="appearance-none block w-full text-gray-700 border border-gray-700 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="service" type="text" value={service} placeholder="Electrolyzer Development" onChange={serviceHandler} />   
    </div>
   <div className="w-full ">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
        Description
      </label>
      <textarea className='form-control block w-full px-3 py-1.5 border-gray-700 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' id="description" placeholder='Description' value={description} onChange={descriptionHandler}></textarea>
    </div>
   <div className="flex flex-wrap -mx-3 mb-6 mt-4">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="quantity">
        Quantity
      </label>
      <input className="appearance-none block w-full text-gray-700 border border-gray-700 rounded py-2 px-4 mb-3 leading-tight focus:outline-none " id="quantity" type="number" placeholder="10" onChange={quantityHandler} value={quantity}/>
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="rate">
        Rate
      </label>
      <input className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="rate" type="number" placeholder="600" onChange={rateHandler} value={rate}/>
    </div>
    </div>
    <div className="form-check">
      <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value={tax} id="tax" onChange={taxHandler}/>
      <label className="form-check-label inline-block text-gray-800" htmlFor="tax">
        TAX
      </label>
    </div>
    <div className='flex space-x-10 justify-center mt-2'>
       
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={addServiceHandler}>Add New Service</button>
    </div>
</form>
)
}

export default AddServicesForm;