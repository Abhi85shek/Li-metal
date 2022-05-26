import React from 'react'
import Navbar from '../component/Navbar'
import SuppliersTable from '../component/SuppliersTable'

const Suppliers = () => {
  return (
    <>
        <Navbar/>
        <h1 className='text-center mt-2 text-lg font-medium'>All Suppliers</h1>
        <SuppliersTable />

    </>
    
  )
}

export default Suppliers