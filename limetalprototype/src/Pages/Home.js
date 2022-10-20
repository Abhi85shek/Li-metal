import React, { useEffect,useState } from 'react'
import axios from 'axios'


const Home = () => {


  let [ordersCount,setAllOrdersCount]=useState(0)
  let [allApprovedOrdersCount,setAllApprovedOrdersCount]=useState(0)
  let [allUnapprovedOrdersCount,setAllUnapprovedOrdersCount]=useState(0)
  let [allQbOrdersCount,setAllQbOrdersCount]=useState(0)
  let [allProductscount,setAllProductsCount]=useState(0)

  const getAllOrdersCount=async()=>{

    await axios.get('http://localhost:4000/gettotalorders').then(res=>{console.log(res.data.data[0].totalorders);setAllOrdersCount(res.data?.data[0]?.totalorders)}).catch(err=>{{console.log(err)}}
    )
  } 




    const getAllUnapprovedOrdersCount=async()=>{
      await axios.get('http://localhost:4000/getallpendingpo').then(res=>{setAllUnapprovedOrdersCount(res.data?.data[0]?.totalPendingPo)}).catch(err=>{{console.log(err)}}
      )
      
    }
    
    const getAllApprovedOrdersCount=async()=>{
      await axios.get('http://localhost:4000/getallapprovedpo').then(res=>{setAllApprovedOrdersCount(res.data?.data[0]?.totalApprovedPO)}).catch(err=>{{console.log(err)}}
      )
    }
    
    const getAllQbOrdersCount=async()=>{
      await axios.get('http://localhost:4000/getallqbcreated').then(res=>{setAllQbOrdersCount(res.data?.data[0]?.totalqbcreated)}).catch(err=>{{console.log(err)}}
      )
    }
    
    const getAllProductCount=async()=>{
      await axios.get('http://localhost:4000/getallproductcount').then(res=>{setAllProductsCount(res.data?.data[0]?.totalproducts)}).catch(err=>{{console.log(err)}}
      )
    }
    
    
    useEffect(()=>{
    
      getAllOrdersCount();
      getAllApprovedOrdersCount();
      getAllUnapprovedOrdersCount();
      getAllQbOrdersCount();
      getAllProductCount();
    
    
    },[])

  return (
    <div className='flex flex-col flex-1'> 
       <div className='p-4 flex flex-row justify-around items-center space-x-2 mt-10'> 
      <div className='flex justify-center items-center h-60 w-60 shadow-2xl rounded bg-[#508193] text-neutral-50'>
        <div className='flex flex-col p-4  justify-center items-center'>
          <div className='text-3xl font-bold p-2 justify-center items-center'>Total Orders Placed</div>
          <div className='text-6xl justify-center items-center font-bold p-2'>{ordersCount}</div>
        </div>
      </div>
      <div className='flex justify-center items-center h-60 w-60 shadow-2xl rounded bg-[#508193] text-neutral-50'>
        <div className='flex flex-col p-4  justify-center items-center'>
          <div className='text-3xl font-bold p-2 justify-center items-center'>Total Approved PO's</div>
          <div className='text-6xl justify-center items-center font-bold p-2'>{allApprovedOrdersCount}</div>
        </div>
      </div>
      <div className='flex justify-center items-center h-60 w-60 shadow-2xl rounded bg-[#508193] text-neutral-50'>
        <div className='flex flex-col p-4  justify-center items-center'>
          <div className='text-3xl font-bold p-2 justify-center items-center'>Total QB created PO's</div>
          <div className='text-6xl justify-center items-center font-bold p-2'>{allQbOrdersCount}</div>
        </div>
      </div>
    </div>  
    <div className='p-8 flex flex-row justify-around items-center space-x-2'> 
    <div className='flex justify-center items-center h-60 w-60 shadow-2xl rounded bg-[#508193] text-neutral-50'>
        <div className='flex flex-col p-4  justify-center items-center'>
          <div className='text-3xl font-bold p-2 justify-center items-center'>Total Unapproved PO's</div>
          <div className='text-6xl justify-center items-center font-bold p-2'>{allUnapprovedOrdersCount}</div>
        </div>
      </div><div className='flex justify-center items-center h-60 w-60 shadow-2xl rounded bg-[#508193] text-neutral-50'>
        <div className='flex flex-col p-4  justify-center items-center'>
          <div className='text-3xl font-bold p-2 justify-center items-center'>Total Products Present</div>
          <div className='text-6xl justify-center items-center font-bold p-2'>{allProductscount}</div>
        </div>
      </div> 
    </div>
    </div>
  
  )
}

export default Home;