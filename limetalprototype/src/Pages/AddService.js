import React from 'react'
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

  const connectQuickbooks=async()=>{
    const result = await axios.get('http://localhost:4000/quickBookAuthorizationUrl');
    console.log(result)
  }

  return (
    <>  
    <div className='flex flex-col justify-center items-center pt-5 font-raleway '>
        <h1>AddService</h1>
        <AddServicesForm />
        <div className='flex justify-center items-center mt-8'>
        <button onClick={()=>{connectQuickbooks()}} type="submit" class="text-white w-full bg-[#426b79] hover:bg-[#305460] focus:bg-[#2c4b58] font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Quickbooks Connect</button>
        </div>
     { serviceList.length > 0 && serviceModalState && <AddServiceTable /> }
    </div>
    </>
  )
}
export default AddService;