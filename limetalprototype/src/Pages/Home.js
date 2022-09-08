import React from 'react'


const Home = () => {
  return (
    <div className='flex flex-col flex-1 bg-gray-600'> 
       <div className='p-4 flex flex-row justify-around items-center space-x-2 mt-10'> 
      <div className='h-60 w-60 bg-red-400 rounded-md'></div>
      <div className='h-60 w-60 bg-red-400 rounded-md'></div>
      <div className='h-60 w-60 bg-red-400 rounded-md'></div>
      
    </div>  
    <div className='p-8 flex flex-row justify-around items-center space-x-2'> 
      <div className='h-60 w-60 bg-red-400 rounded-md'></div>
      <div className='h-60 w-60 bg-red-400 rounded-md'></div>
      
    </div>
    </div>
  
  )
}

export default Home;