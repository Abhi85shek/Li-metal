import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';
const CreateOrder = () => {
    const [areas,setAreas] = useState([]);
    const [areaValue,setAreaValue] = useState("");
    const [costCenters,setCostCenters] = useState([]);
    const [costCenterValue,setCostCenterValue] =useState("");
    const [locations,setLocations] =useState([]);
    const [areaOfWorks,setAreaOfWorks]=useState([]);
    const [areaOfWorkValue,setAreaOfWorkValue] = useState("");
    const [locationValue,setLocationValue]= useState("");
    const [poGenerateData,setPoGenerateData] = useState("");

    const getArea = async ()=>{
        const result = await axios.get("http://localhost:4000/getAllArea");
        setAreas(result.data);
    };
    
    const getCostCenter = async ()=>{
        const result = await axios.get(`http://localhost:4000/getCostCenter/${areaValue}`);
        setCostCenters(result.data);
    };

    const getLocation =async ()=>{
        const result = await axios.get("http://localhost:4000/getLocation");
        setLocations(result.data);
    };

    const getAreaOfWork =async ()=>{
        const result = await axios.get(`http://localhost:4000/getAreaOfWork/${costCenterValue}`);
       setAreaOfWorks(result.data);
    };
    
    const generatePoNumber = async()=>{
        const result = await axios.post(`http://localhost:4000/generatePO`,{areaId:areaValue,costCenterId:costCenterValue,areaOfWorkId:areaOfWorkValue,locationId:locationValue});
        setPoGenerateData(result.data.PONumber);
    };
    useEffect(()=>{
            getArea();
            
    },[]);

    useEffect(()=>{
        if (areaValue.length>0){
        getCostCenter();
        }
    },[areaValue]);

    useEffect(()=>{
        if(costCenterValue.length>0){
        getAreaOfWork();
        }
    },[costCenterValue]);
    useEffect(()=>{
        getLocation();
    },[]);
  return (
    <>
    <div className=' w-full flex flex-row items-center justify-center  p-6'>
    <div className='w-full'>
        <div className='flex flex-row justify-center items center p-2 '>
        <div className='flex basis-1/2  justify-center  items-center p-2 space-x-2'>
            <div className='basis-1/6 '>
        <label htmlFor="location" className="float-right text-sm font-medium text-gray-900 dark:text-gray-400">Location</label>
          </div>
          <div className='basis-5/6 '>
            <select id="location" required  onChange={(e)=>{setLocationValue(e.target.value)}} className="w-[100%] float-left h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ">
            <option >Choose a Location</option>
            {
                locations.map((location)=>(
                    <option value={location.id} key={location.id}>{location.locationName}</option>
                ))
            }
            </select>
            </div>
        </div>
        <div className='flex basis-1/2 justify-center  items-center p-2 space-x-2'>
        <div className='basis-1/6 '>
            <label htmlFor="area" className="float-right items-center text-sm font-medium text-gray-900 dark:text-gray-400">Area</label>
           </div>
           <div className='basis-5/6 '>
            <select id="area" onChange={(e)=>{setAreaValue(e.target.value)}} value={areaValue} className="w-[100%] float-left h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ">
    {   areas.map((area)=>(
                <option value={area.id} key={area.id}>{area.areaName}</option>
         ))
     }
            </select>
            </div>
        </div>
        </div>

        <div className='flex flex-row justify-center items center p-2'>
        <div className='flex basis-1/2 justify-center  items-center p-2 space-x-2'>  
        <div className='basis-1/6 '> 
        <label htmlFor="costCenter" className="float-right items-center text-sm font-medium text-gray-900 dark:text-gray-400">Cost Center</label>
          </div>
          <div className='basis-5/6 '>
            <select id="costCenter" onChange={(e)=>{setCostCenterValue(e.target.value)}}className="w-[100%] float-left h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ">
          
            <option>Choose a Cost Center</option>
                    {
                         costCenters.map((cost)=>( 
                            <option value={cost.id} key={cost.id}>{cost.costCenterName}</option>
                        )
                        )
                    }
            </select>
            </div>
        </div>
        
        <div className='flex basis-1/2 justify-center  items-center p-2 space-x-2'>
        <div className='basis-1/6 '>  
        <label htmlFor="areaOfWork" className="float-right items-center text-sm font-medium text-gray-900 dark:text-gray-400">Area of Work</label>
         </div>
         <div className='basis-5/6 '>
            <select id="areaOfWork" onChange={(e)=>{setAreaOfWorkValue(e.target.value)}} className="w-[100%] float-left h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ">
           
            <option>Choose an Area Of Work</option>
            {
                areaOfWorks.map((work)=>(
                    <option value={work.id} key={work.id}>{work.areaOfWorkName}</option>
                ))
            }
            </select>
            </div>
        </div>
        </div>
        <div className='text-center mt-4'>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={generatePoNumber}>Generate PO Number</button>
        </div>
        <div className='text-center mt-4'>
            <p>{poGenerateData}</p>
        </div>
    </div>
    </div>
    </>
  )
}

export default CreateOrder;