import React,{useState,useEffect} from 'react';
import axios from 'axios';
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
        getCostCenter();
    },[areaValue]);

    useEffect(()=>{
        getAreaOfWork();
    },[costCenterValue]);
    useEffect(()=>{
        getLocation();
    },[]);
  return (
    <div className='w-[25%]'>
        <div className='pt-5'>
        <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Location</label>
            <select id="location" required  onChange={(e)=>{setLocationValue(e.target.value)}} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a Location</option>
            {
                locations.map((location)=>(
                    <option value={location.id}>{location.locationName}</option>
                ))
            }
            </select>
        </div>
        <div>
            <label for="area" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Area</label>
            <select id="area" onChange={(e)=>{setAreaValue(e.target.value)}} value={areaValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    {   areas.map((area)=>(
                <option value={area.id}>{area.areaName}</option>
         ))
     }
            </select>
        </div>
        <div className='pt-5'>
        <label for="costCenter" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Cost Center</label>
            <select id="costCenter" onChange={(e)=>{setCostCenterValue(e.target.value)}}class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a Cost Center</option>
                    {
                         costCenters.map((cost)=>( 
                            <option value={cost.id}>{cost.costCenterName}</option>
                        )
                        )
                    }
            </select>
        </div>
        <div className='pt-5'>
        <label for="areaOfWork" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Area of Work</label>
            <select id="areaOfWork" onChange={(e)=>{setAreaOfWorkValue(e.target.value)}} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose an Area Of Work</option>
            {
                areaOfWorks.map((work)=>(
                    <option value={work.id}>{work.areaOfWorkName}</option>
                ))
            }
            </select>
        </div>
        
        <div className='text-center mt-4'>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={generatePoNumber}>Generate PO Number</button>
        </div>
        <div className='text-center mt-4'>
            <p>{poGenerateData}</p>
        </div>
    </div>
  )
}

export default CreateOrder;