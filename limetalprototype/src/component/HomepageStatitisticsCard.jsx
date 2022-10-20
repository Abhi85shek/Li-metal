import React from 'react';

function HomepageStatitisticsCard(props) {
    return (
        <>    
            <div className={`flex justify-center items-center h-60 w-60 shadow-2xl rounded-xl ${props.bg} text-neutral-50`}>
        <div className='flex flex-col p-4  justify-center items-center'>
          <div className='text-3xl font-bold p-2 justify-center items-center'>{props.title}</div>
          <div className='text-6xl justify-center items-center font-bold p-2'>{props.value}</div>
        </div>
      </div>
      </>
    );
}

export default HomepageStatitisticsCard;