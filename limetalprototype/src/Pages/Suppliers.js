import React from 'react'
import { useRecoilState } from 'recoil'
import addNewSupplierModalAtom from '../atoms/addNewSupplierModalAtom'
import addNewVendorModalAtom from '../atoms/addNewVendorModalAtom'
import AddServiceTable from '../component/AddServiceTable'
import AddSupplier from '../component/AddSupplier'
import AddVendors from '../component/AddVendors'
import AllSuppliers from '../component/AllSuppliers'
import Navbar from '../component/Navbar'
import EditSupplierModal from '../component/EditSupplierModal'
import editSupplierModalAtom from '../atoms/EditSupplierModalAtom'

const Suppliers = () => {

  const [showAddNewSupplier,setShowAddNewSupplier]=useRecoilState(addNewSupplierModalAtom)
  const [showEditModal,setShowEditModal]=useRecoilState(editSupplierModalAtom)
  const [showAddNewVendor,setShowAddNewVendor]=useRecoilState(addNewVendorModalAtom)

  return (
    <>
    {showAddNewSupplier?<AddSupplier/>:null}
    {showAddNewVendor?<AddVendors/>:null}
   
    <div className='flex items-center justify-center py-3 px-7'>
        {/* <FilterDropdown /> */}
        {localStorage.getItem('uType')==='admin'?
        <>
    <button type="button" onClick={()=>{setShowAddNewSupplier(true)}} class="text-[#5ba3bd] font-medium border-[#5ba3bd] border-2 text-lg  hover:bg-[#5ba3bd] focus:ring-4 focus:ring-blue-300 hover:text-slate-100 rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 mt-4 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add New Supplier +</button>
   {localStorage.getItem('quickbooksCredentials')!=null?
    <button type="button" onClick={()=>{setShowAddNewVendor(true)}} class="text-[#5ba3bd] font-medium border-[#5ba3bd] border-2 text-lg  hover:bg-[#5ba3bd] focus:ring-4 focus:ring-blue-300 hover:text-slate-100 rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 mt-4 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Supplier QB +</button>:null}

    </>:null }
    </div>
        <h1 className='text-center mt-2 text-2xl font-medium'>List of all Suppliers present in Database</h1>
        <AllSuppliers />
    </>
    
  )
}

export default Suppliers