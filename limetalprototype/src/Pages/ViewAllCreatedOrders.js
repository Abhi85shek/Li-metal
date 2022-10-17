import React from 'react'
import AllOrders from '../component/AllOrders'
import AllQbPo from '../component/AllQbPo'
import ViewAllCreatedOrdersTable from '../component/ViewallCreatedOrdersTable'

const ViewAllCreatedOrders = () => {

  

  return (
    <>

        <h1 className='text-center mt-2 text-lg font-medium'>All Orders Created by User</h1>
       <ViewAllCreatedOrdersTable/>
    </>
    
  )
}

export default ViewAllCreatedOrders