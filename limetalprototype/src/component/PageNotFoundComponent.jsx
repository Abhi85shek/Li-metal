import React from 'react';

function PageNotFoundComponent(props) {
    return (
        <div className='mt-10 w-full'>
            <div className='flex flex-row text-9xl justify-center items-center font-bold text-red-500'>
                404
            </div>
            <div className='flex flex-row mt-2 text-3xl justify-center items-center font-medium text-red-500'>
                Page Not Found
            </div>
            <div className='flex flex-row mt-8 text-4xl justify-center items-center font-medium text-slate-600'>
            {localStorage.getItem('quickbooksCredentials')==null?
            <>The Page you are trying to find doesn't exist or you are not connected to quickbooks</> :
            <>The Page you are trying to find doesn't exist </>} 
            </div>
        </div>
    );
}

export default PageNotFoundComponent;