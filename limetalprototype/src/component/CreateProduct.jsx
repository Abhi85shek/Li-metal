import React from 'react';
// import FilterDropdown from './FilterDropdown';
import { useRecoilState } from 'recoil';
import addProductModalAtom from '../atoms/addProductModalAtom';
const CreateProduct = () => {
  
  const [showModal,setShowModal] = useRecoilState(addProductModalAtom);

  return (
    <div className='flex items-center justify-center py-3 px-7'>
        {/* <FilterDropdown /> */}
    <button type="button" onClick={()=>{setShowModal(true)}} class="text-[#5ba3bd] font-medium border-[#5ba3bd] border-2 text-lg  hover:bg-[#5ba3bd] focus:ring-4 focus:ring-blue-300 hover:text-slate-100 rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 mt-4 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add New Product +</button>
    </div>
  )
}

export default CreateProduct;