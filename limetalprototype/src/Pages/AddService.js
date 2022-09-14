import React,{useState} from 'react'
import AddServicesForm from '../component/AddServicesForm';
import AddServiceTable from '../component/AddServiceTable';
import Navbar from '../component/Navbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import editModalAtom from '../atoms/editModelState';
import serviceDetailsAtom from '../atoms/ServiceState';
import axios from 'axios';
import DeleteModal from '../component/DeleteModal';
import CreateOrder from './CreateOrder';
const AddService = () => {

  const serviceList = useRecoilValue(serviceDetailsAtom);
  const [serviceModalState,setServiceModalState] = useRecoilState(editModalAtom);
  const [quickBookURLcode,setquickbooksAuthCode]=useState()
  const [supplierNumber,setSupplierNumber]=useState("")
  const [supplierName,setSupplierName]=useState("")
  const [supplierQbId,setSupplierQbId]=useState()
  const [customerId,setCustomerId]=useState("")
  const [customerName,setCustomerName]=useState("")
  const [totalAmount,setTotalAmount] =useState(0);
  const [customerCurrency,setCustomerCurrency]=useState("")


  const connectQuickbooks=async()=>{
    const result = await axios.get('http://localhost:4000/quickBookAuthorizationUrl');
    console.log(result)
  }


  const connectwithquickbooks=async()=>{
    await quicksConnect()
    
}


const quicksConnect=async()=>{
console.log("quickbooks auth")
const response = await axios.get(`http://localhost:4000/quickBookAuthorizationUrl`);
if(response.status === 200){
    const quickBookAuthUrl = response.data.data;
    //check logined status in quick book
    window.location.replace(quickBookAuthUrl)   
    const aurthorizedURLcode = window.location.href 
    localStorage.setItem('quickbooksAuthCode',aurthorizedURLcode)
    setquickbooksAuthCode(aurthorizedURLcode) 
    await quickbooksSignIn()
}
}

const quickbooksSignIn=async()=>{
console.log("inside signin")
let splitedList1 = localStorage.getItem('quickbooksAuthCode').split("&");
let code = splitedList1[0].split("=")[1];
let state = splitedList1[1].split("=")[1];
let realmId = splitedList1[2].split("=")[1];
console.log(code+" "+state +" " + realmId)
const res= await axios.get(`http://localhost:4000/quickBookToken/${code}/${state}/${realmId}`)
console.log(res.data)
if(res.status==200)
{
localStorage.setItem('quickbooksCredentials',res.data)
}
console.log(localStorage.getItem('quickbooksCredentials'))

}

  return (
    <>  
    <div className='flex flex-col p-2 justify-center items-center pt-5 font-raleway mt-5 '>
        <h1 className='font-bold text-2xl'>Create Purchase Order</h1>
        <AddServicesForm supplierNumber={supplierNumber} 
        setSupplierNumber={setSupplierNumber} 
        supplierName={supplierName} 
        setSupplierName={setSupplierName} 
        supplierQbId={supplierQbId}  
        setSupplierQbId={setSupplierQbId}
        customerId={customerId}
        setCustomerId={setCustomerId}
        customerName={customerName}
        setCustomerName={setCustomerName}
        customerCurrency={customerCurrency}
        setCustomerCurrency={setCustomerCurrency}
        />
     { serviceList.length > 0 && serviceModalState && <AddServiceTable customerCurrency={customerCurrency}  /> }
     <div className='flex w-[100%] h-auto  p-4 justify-center items-center mt-2'>
      <CreateOrder 
      supplierNumber={supplierNumber} 
      supplierName={supplierName}
       supplierQbId={supplierQbId}
        customerId={customerId}
         customerName={customerName}
          customerCurrency={customerCurrency}/>
     </div>
    </div>
    </>
  )
}
export default AddService;