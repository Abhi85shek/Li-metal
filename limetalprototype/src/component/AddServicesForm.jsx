import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import serviceDetailsAtom from '../atoms/ServiceState';
import editModalAtom from '../atoms/editModelState';
import { v4 as uuidv4 } from 'uuid';
import selectedSupplierAtom from '../atoms/selectedSupplierAtom';
import supplierOrderCountAtom from '../atoms/supplierOrderCountAtom';

const AddServicesForm = (props) => {

  const [serviceModalState,setServiceModalState] = useRecoilState(editModalAtom);
  const [serviceDetails,setServiceDetails] =useRecoilState(serviceDetailsAtom);
  const [supplier,setSelectedSupplier]=useState(selectedSupplierAtom)
  const [supplierOrderCount,setSupplierOrderCount]=useState(supplierOrderCountAtom)
  const [allProducts,setAllProducts] = useState([]);
  const [taxList,setTaxList]=useState([])
  const [service,setService] = useState("");
  const [description,setDescription] = useState("");
  const [quantity,setQuantity] = useState("");
  const [tax,setTax] = useState("");
  const [rate,setRate] =useState("");
  const [suppliers,setAllSuppliers]=useState([])
  const [totalAmount,setTotalAmount] =useState(0);
  

  const getAllProducts = async()=>{
      const result = await axios.get("http://localhost:4000/allProductsActive");
      setAllProducts(result.data); 

      
  }; 

  const getAllSuppliers = async()=>{
    const res = await axios.get("http://localhost:4000/getSuppliers");
      console.log(res.data.data)
    setAllSuppliers(res.data.data); 
    
}; 

const getAllTaxes=async()=>{

  const res = await axios.get("http://localhost:4000/taxDetails");
  console.log(res.data.data)
setTaxList(res.data.data); 
}
  
const handleSupplierChange=(val)=>{
  let arr=val.split('-')
  let supplierNum=arr[1]
  console.log(supplierNum)
  props.setSupplierNumber(supplierNum)
  // setSelectedSupplier(supplierNum)
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
  useEffect(()=>{
    getAllProducts();
    getAllSuppliers();
    getAllTaxes()
  },[]);

  return (
    <form className="w-full max-w-lg">
        <div className='pt-5'>
      {suppliers.length>0?
      <>    
          <label htmlFor="supplierNum" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Suppliers</label>
            <select id="supplierNumber"  onChange={(e)=>{console.log(e.target.value);handleSupplierChange(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select a Supplier</option>
                    {
                         suppliers.map((cuurentsuppliers,id)=>( 
                            <option value={cuurentsuppliers.qbId+'-'+cuurentsuppliers.supplierNumber+'-'+cuurentsuppliers.poCount} key={id}>{cuurentsuppliers.name}</option>
                        )
                        )
                    }
            </select>
            </>
            :null
            }
        </div>

        
        <hr className='h-4  mt-8'/>

    <div className='pt-5'>
        <label htmlFor="costCenter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Service</label>
            <select id="costCenter"  onChange={(e)=>{setService(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a Service</option>
                    {
                         allProducts.map((product)=>( 
                            <option value={product.qbId} key={product.id}>{product.serviceName}</option>
                        )
                        )
                    }
            </select>
        </div>
      
   <div className="w-full mt-4">
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
    <div className='pt-2'>
        <label htmlFor="costCenter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Tax</label>
            <select id="costCenter"  onChange={(e)=>{setService(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a Tax</option>
                    {
                         taxList.map((tax)=>( 
                            <option value={tax.id} key={tax.id}>{tax.name}</option>
                        )
                        )
                    }
            </select>
        </div>
    <div className='flex space-x-10 justify-center mt-4'>
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={addServiceHandler}>Add New Service</button>
    </div>
</form>
)
}

export default AddServicesForm;