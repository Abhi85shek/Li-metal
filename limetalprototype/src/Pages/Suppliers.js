import React from 'react'
import AddServiceTable from '../component/AddServiceTable'
import Navbar from '../component/Navbar'
import SuppliersTable from '../component/SuppliersTable'

const Suppliers = () => {
  return (
    <>
        <h1 className='text-center mt-2 text-lg font-medium'>All Suppliers</h1>
        <SuppliersTable />
       

    </>
    
  )
}

export default Suppliers