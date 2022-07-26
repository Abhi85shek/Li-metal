import React,{useState} from 'react'
import AddServicesForm from '../component/AddServicesForm';
import AddServiceTable from '../component/AddServiceTable';
import Navbar from '../component/Navbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import editModalAtom from '../atoms/editModelState';
import serviceDetailsAtom from '../atoms/ServiceState';
import axios from 'axios';
import DeleteModal from '../component/DeleteModal';
const AddService = () => {

  const serviceList = useRecoilValue(serviceDetailsAtom);
  const [serviceModalState,setServiceModalState] = useRecoilState(editModalAtom);
  const [quickBookURLcode,setquickbooksAuthCode]=useState()


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
    <div className='flex flex-col justify-center items-center pt-5 font-raleway '>
        <h1>AddService</h1>
        <AddServicesForm />
        <div className='flex justify-center items-center mt-8'>
        <button onClick={()=>{connectwithquickbooks()}} type="submit" class="text-white w-full bg-[#426b79] hover:bg-[#305460] focus:bg-[#2c4b58] font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Quickbooks Connect</button>
        </div>
     { serviceList.length > 0 && serviceModalState && <AddServiceTable /> }
    </div>
    </>
  )
}
export default AddService;