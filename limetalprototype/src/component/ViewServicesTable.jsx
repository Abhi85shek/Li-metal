import React,{useState} from 'react';


const ViewServicesTable = (props) => {


    const serviceDetails = props.line
    console.log(serviceDetails)
  

    return (
    <>
    <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-white border-b">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Service Name
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Description
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Quantity
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Rate 
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Tax
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Amount
                </th>

              </tr>
            </thead>
            <tbody>
            {  serviceDetails.length > 0   &&
                serviceDetails.map((list)=>(
                  <tr className="bg-gray-100 border-b" key={list.id}>
                      <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {list.ItemBasedExpenseLineDetail?.ItemRef?.name}
                      </td>
                      <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {list.Description}
                      </td>
                      <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {list.ItemBasedExpenseLineDetail?.Qty}
                      </td>    
                      <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {list.ItemBasedExpenseLineDetail?.UnitPrice}
                      </td> 
                      <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                       {list.ItemBasedExpenseLineDetail?.TaxCodeRef?.value}
                      </td> 
                      <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {list.Amount}
                      </td> 
        
                </tr>
                ))
              }
            </tbody>
            </table>
           
            </div>
            </div>
            </div>
            </div>
          
            </>
  )
}

export default ViewServicesTable