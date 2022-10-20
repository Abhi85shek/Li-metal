import React, { useEffect,useState } from 'react'
import axios from 'axios'
import HomepageStatitisticsCard from '../component/HomepageStatitisticsCard'


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
      <HomepageStatitisticsCard title="Total Orders Placed" value={ordersCount} bg='bg-[#cf4232]'/>
      <HomepageStatitisticsCard title="Total Approved PO's" value={allApprovedOrdersCount} bg='bg-[#36b45a]'/>
      <HomepageStatitisticsCard title="Total QB Created PO's" value={allQbOrdersCount} bg='bg-[#3653b4]'/>
     
      
    </div>  
    <div className='p-8 flex flex-row justify-around items-center space-x-2'> 
    <HomepageStatitisticsCard title="Total Unapproved PO's" value={allUnapprovedOrdersCount} bg='bg-[#36b4a1]'/>
    <HomepageStatitisticsCard title="Total Products Present" value={allProductscount} bg='bg-[#ae36b4]' />
    </div>
    </div>
  
  )
}

export default Home;