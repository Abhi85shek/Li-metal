import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';
import selectedSupplierAtom from '../atoms/selectedSupplierAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import serviceDetailsAtom from '../atoms/ServiceState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import completeOrderModalVisibleAtom from '../atoms/completeOrderModalVisibleAtom';
import CompleteOrderModal from '../component/CompleteOrderModal';
import moment from 'moment';


const CreateOrder = (props) => {
    const [areas,setAreas] = useState([]);
    const [areaValue,setAreaValue] = useState("");
    const [costCenters,setCostCenters] = useState([]);
    const [costCenterValue,setCostCenterValue] =useState("");
    const [locations,setLocations] =useState([]);
    const [areaOfWorks,setAreaOfWorks]=useState([]);
    const [areaOfWorkValue,setAreaOfWorkValue] = useState("");
    const [locationValue,setLocationValue]= useState("");
    const [poGenerateData,setPoGenerateData] = useState("");
    const [preProcessedAreaOfWork,setPreProcessedAreaOfWork]=useState("")
    const [preProcessedCostCenter,setPreProcessedCostCenter]=useState("")
    const [supplierNumber,setSupplierNumber]=useState()
    const [showModal,setShowModal]=useRecoilState(completeOrderModalVisibleAtom)
    const serviceData=useRecoilValue(serviceDetailsAtom)
    const [orderObj,setOrderObj]=useState(null)    

    const getArea = async ()=>{
        const result = await axios.get("http://localhost:4000/getAllArea",{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        setAreas(result.data);
    };
    
    const getCostCenter = async ()=>{
        const result = await axios.get(`http://localhost:4000/getCostCenter/${areaValue}`,{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        setCostCenters(result.data);
    };

    const getLocation =async ()=>{
        const result = await axios.get("http://localhost:4000/getLocation",{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        setLocations(result.data);
    };

    const getAreaOfWork =async ()=>{
        const result = await axios.get(`http://localhost:4000/getAreaOfWork/${costCenterValue}`,{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
       setAreaOfWorks(result.data);
    };
    
    const generatePoNumber = async()=>{
        const result = await axios.post(`http://localhost:4000/generatePO`,{areaId:areaValue,costCenterId:costCenterValue,areaOfWorkId:areaOfWorkValue,locationId:locationValue});
        setPoGenerateData(result.data.PONumber);
    };
    useEffect(()=>{
            getArea();
            
    },[]);

    const preprocessAreaofWork=(val)=>{
        setAreaValue(val)
        if(val.length==1)
        {
            console.log("check 1")
            setPreProcessedAreaOfWork("0"+val)
        }
        else{
            console.log("check 2")
            setPreProcessedAreaOfWork(val)
        }
    }

    const preprocessCostCenter=(val)=>{
        setCostCenterValue(val)
        if(val.length==1)
        {
            setPreProcessedCostCenter("0"+"0"+val)
        }
        else if(val.length==2){
            setPreProcessedCostCenter("0"+val)
        }
        else{
            setPreProcessedCostCenter(val)
        }
    }

    const generatePONum=()=>{
        console.log("inside fun")
        // let areaofWorkVal,costCenterVal;
        // if(costCenterValue.length==1){
        //     costCenterVal="0"+costCenterValue
        //     console.log("1")
        // }
        // else{
        //     costCenterVal=costCenterValue+""
        //     console.log("2")
        // }
        

        // if(areaOfWorkValue.length==1){
        //     areaofWorkVal="0"+"0"+areaOfWorkValue
        //     console.log("3")
        // }
        // else if(areaOfWorkValue.length==2){
        //     areaofWorkVal="0"+areaOfWorkValue
        //     console.log("4")
        // }
        // else{
        //     areaOfWorkValue=areaOfWorkValue
        //     console.log("5")
        // }
       
        let poNum="0"+areaValue+'-'+preProcessedAreaOfWork+'-'+preProcessedCostCenter+"-"+"0"+locationValue+'-'+props.supplierNumber+""
        console.log('suppnum')
        // console.log(selectedSupplier)

        setPoGenerateData(poNum)
    }

    const handleCreateOrder=()=>{
        setShowModal(true)
    }

    const createOrderSubmit=async()=>{
        let serviceDataArray=serviceData
        if(serviceDataArray.length==0||poGenerateData.length==0||props.supplierQbId.length==0||props.customerId.length==0)
        {
            setTimeout(()=>{
                toast.error('Please fill all the order details', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              },0);
              return
        }
        console.log(serviceDataArray)
        let TotalAmt=0
        let Line=[]
        let id=1
        for (let data of serviceData )
        {
            TotalAmt+=data.totalAmount
            // let lineObj={
            //     "DetailType":"ItemBasedExpenseLineDetail",
            //     "Amount":data.totalAmount,
            //     "Description":data.description,
            //     "Id":id+"",
            //     "LineNum":id*1,
            //     "ItemBasedExpenseLineDetail":{
            //         "ItemRef":{
            //             "name":data.serviceName,
            //             "value":data.serviceqbId
            //         },
            //         "Qty":data.quantity*1,
            //         "TaxCodeRef":{
            //             "value":"NON"
            //         },
            //         "BillableStatus":"Non-Billable",
            //         "UnitPrice":data.rate*1
            //     }
            // }
            // lineObj.DetailType="ItemBasedExpenseLineDetail"
            // lineObj.Amount=data.totalAmount
            // lineObj.Description=data.description
            // lineObj.Id=id+""
            // lineObj.LineNum=id*1
            // lineObj.ItemBasedExpenseLineDetail={
            //     "ItemRef":{
            //         "name":data.serviceName,
            //         "value":data.serviceqbId
            //     },
            //     "Qty":data.quantity*1,
            //     "TaxCodeRef":{
            //         "value":"NON",
            //     },
            //     "BillableStatus":"Non-Billable",
            //     "UnitPrice":data.rate*1
            // }
        Line.push({
            "DetailType":"ItemBasedExpenseLineDetail",
            "Amount":data.totalAmount,
            "Description":data.description,
            "Id":id+"",
            "LineNum":id*1,
            "ItemBasedExpenseLineDetail":{
                "ItemRef":{
                    "name":data.serviceName,
                    "value":data.serviceqbId
                },
                "Qty":data.quantity*1,
                "TaxCodeRef":{
                    "value":"NON"
                },
                "BillableStatus":"Non-Billable",
                "UnitPrice":data.rate*1
            }
        })
        
    id+=1
    }
        let orderObj={
            "vendorId":props.vendorId,
            "DocNumber":poGenerateData,
            "TotalAmt":TotalAmt,
            "Line":Line,
            "customerName":props.customerName,
            "supplierName":props.supplierName,
            "APAccountRef":{
                "name": "Accounts Payable (A/P)",
                "value": "33"
            },
            "VendorRef":{
                "name":props.supplierName,
            "value":props.supplierQbId,
            },
            "ShipTo":{
                "name": props.customerName,
                "value": props.customerId
            }
        }
          console.log(orderObj)
          setOrderObj(orderObj)
          setShowModal(true)
        //   let quickbooksCredentials=localStorage.getItem('quickbooksCredentials')
        //   const result = await axios.post(`http://localhost:4000/createPO`,{data:orderObj,refreshToken:quickbooksCredentials});
        //   if(result.status==201)
        //   {
        //    console.log("toasting")
           
        //        toast.success('PO created successfully', {
        //          position: "top-center",
        //          autoClose: 2000,
        //          hideProgressBar: true,
        //          closeOnClick: true,
        //          pauseOnHover: true,
        //          draggable: true,
        //          progress: undefined,
        //        });
        //      }

        }
    

    useEffect(()=>{
        console.log("area of work")
        if (areaValue.length>0){
            console.log("area of work condition")
        getCostCenter();
        }
    },[areaValue]);

    useEffect(()=>{
        console.log("cost center")
        if(costCenterValue.length>0){
            console.log("cost center condition")
        getAreaOfWork();
        }
    },[costCenterValue]);

    useEffect(()=>{
        getLocation();
    },[]);
  return ( 
    <>
    { showModal && <CompleteOrderModal orderObj={orderObj}  customerCurrency={props.customerCurrency} /> }
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
            <select id="area" onChange={(e)=>{preprocessAreaofWork(e.target.value)}} value={areaValue} className="w-[100%] float-left h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ">
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
            <select id="costCenter" onChange={(e)=>{preprocessCostCenter(e.target.value)}}className="w-[100%] float-left h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ">
          
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
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={generatePONum}>Generate PO Number</button>
        </div>
       
        {/* <div className='flex flex-row text-center justify-center mt-4'>
         <select id="areaOfWork" onChange={(e)=>{setAreaOfWorkValue(e.target.value)}} className="w-[100%] float-left h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ">
           
           <option>Choose an Area Of Work</option>
           {
               areaOfWorks.map((work)=>(
                   <option value={work.id} key={work.id}>{work.areaOfWorkName}</option>
               ))
           }
           </select>
        </div>      */}

<div className='flex flex-row text-center justify-center mt-4'>
            <p>Partial PO :&nbsp;&nbsp;{poGenerateData}</p>
        </div>

<div className='text-center mt-4'>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={createOrderSubmit}>Review Order</button>
        </div>
    </div>
   
    </div>
    </>
  )
}

export default CreateOrder;