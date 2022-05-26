import React,{useState} from 'react'
import {areas,costCenter,areaOfWork,locations} from "../data";
const CreateOrder = () => {

    let result =costCenter;
    const [area,setArea] =useState("");

    const areaHandler =(e)=>{
        console.log(e.target.value);
       result = costCenter.filter(cost => cost.linkedArea == e.target.value);

    };
    console.log(area);
    console.log(result);
  return (
    <div className='w-[25%]'>
        <div>
            <label for="area" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Area</label>
            <select id="area" onChange={(e)=>{setArea(e.target.value);areaHandler(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            
    {   areas.map((area)=>(
                <option value={area.areaName}>{area.areaName}</option>
         ))
     }
            </select>
        </div>
        <div className='pt-5'>
        <label for="costCenter" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Cost Center</label>
            <select id="costCenter" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a Cost Center</option>
            
                {console.log(result)}

                {/* { result.map((cost)=>( 
                    <option value={cost.code}>{cost.name}</option>
                )
                ))
                } */}
            </select>
        </div>
        <div className='pt-5'>
        <label for="areaOfWork" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Area of Work</label>
            <select id="areaOfWork" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose an Area Of Work</option>
            {
                areaOfWork.map((work)=>(
                    <option value={work.name}>{work.name}</option>
                ))
            }
            </select>
        </div>
        <div className='pt-5'>
        <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Location</label>
            <select id="location" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a Location</option>
            {
                locations.map((location)=>(
                    <option value={location.name}>{location.name}</option>
                ))
            }
            </select>
        </div>
        <div className='text-center mt-4'>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Generate PO Number</button>
        </div>
    </div>
  )
}

export default CreateOrder