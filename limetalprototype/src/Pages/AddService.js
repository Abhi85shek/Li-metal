import React from 'react'
import AddServicesForm from '../component/AddServicesForm';
import AddServiceTable from '../component/AddServiceTable';
import Navbar from '../component/Navbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import editModalAtom from '../atoms/editModelState';
import serviceDetailsAtom from '../atoms/ServiceState';
import DeleteModal from '../component/DeleteModal';
const AddService = () => {

  const serviceList = useRecoilValue(serviceDetailsAtom);
  const [serviceModalState,setServiceModalState] = useRecoilState(editModalAtom);

  return (
    <>  
    <Navbar />
    <div className='flex flex-col justify-center items-center pt-5 font-raleway '>
        <h1>AddService</h1>
        <AddServicesForm />
     { serviceList.length > 0 && serviceModalState && <AddServiceTable /> }

    </div>
    </>
  )
}
export default AddService;