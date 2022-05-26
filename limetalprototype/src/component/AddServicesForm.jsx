import React from 'react'

const AddServicesForm = () => {
  return (
    <form class="w-full max-w-lg">
    <div class="w-full mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="service">
        Service Name
      </label>
      <input class="appearance-none block w-full text-gray-700 border border-gray-700 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="service" type="text" placeholder="Electrolyzer Development" />   
    </div>
   <div class="w-full ">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">
        Description
      </label>
      <textarea className='form-control block w-full px-3 py-1.5 border-gray-700 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' id="description" placeholder='Description'></textarea>
    </div>
   <div class="flex flex-wrap -mx-3 mb-6 mt-4">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="quantity">
        Quantity
      </label>
      <input class="appearance-none block w-full text-gray-700 border border-gray-700 rounded py-2 px-4 mb-3 leading-tight focus:outline-none " id="quantity" type="number" placeholder="10" />
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="rate">
        Rate
      </label>
      <input class="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="rate" type="number" placeholder="600" />
    </div>
    </div>
    <div class="form-check">
      <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="tax" />
      <label class="form-check-label inline-block text-gray-800" for="tax">
        TAX
      </label>
    </div>
    <div className='flex space-x-10 justify-center mt-2'>
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Create Order</button>
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Add New Service</button>
    </div>
</form>
)
}

export default AddServicesForm;