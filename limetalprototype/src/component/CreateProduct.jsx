import React from 'react'
import FilterDropdown from './FilterDropdown';

const CreateProduct = () => {
  return (
    <div className='flex items-center py-3 px-7'>
        {/* <FilterDropdown /> */}
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add New Product</button>
    </div>
  )
}

export default CreateProduct;