import React from 'react'
import AddServiceTable from '../component/AddServiceTable'
import AllSuppliers from '../component/AllSuppliers'
import Navbar from '../component/Navbar'

const Suppliers = () => {
  return (
    <>
        <h1 className='text-center mt-2 text-lg font-medium'>All Suppliers</h1>
        <AllSuppliers />
    </>
    
  )
}

export default Suppliers