import React from 'react'
import AddServicesForm from '../component/AddServicesForm'
import Navbar from '../component/Navbar'

const AddService = () => {
  return (
    <>  
    <Navbar />
    <div className='flex flex-col justify-center items-center pt-5 font-raleway '>
        <h1>AddService</h1>
        <AddServicesForm />
    </div>
    </>
  )
}

export default AddService