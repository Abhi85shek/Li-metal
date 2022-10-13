import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import editProductModalVisible from '../atoms/editProductModalVisible';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProductModal = (props) => {
  
    const [showModal,setShowModal] = useRecoilState(editProductModalVisible);
    const [productName,setProductName] = useState(props.selectedProduct.serviceName);
    const [description,setDescription] = useState(props.selectedProduct.description);
    const [type,setType] = useState(props.selectedProduct.type);
    const [productId,setProductId]=useState(props.selectedProduct.id)

    const editProduct= async (e)=>{
        e.preventDefault();
        let id=productId
        const result = await axios.post(`http://localhost:4000/editProduct/${id}`,{productName:productName,description:description,type:type},{

          headers:{
  
            Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
  
          }
  
        });
        setShowModal(false);
        console.log(result)
        if(result.status==201)
       {
        console.log("toasting")
        
            toast.success('Product updted successfully', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
   
else{
    setTimeout(()=>{
        toast.error('Error Occoured', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },0);
}
   }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className="relative inline-block align-bottom  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-[#6BA4B8] px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
        <div className="sm:items-start">
          <div className="mt-3 text-center  sm:mt-0 sm:ml-4 sm:text-left">
            <div className='flex flex-row justify-center items-center'>
                <h3 className="text-2xl leading-6 uppercase justify-center  font-bold text-md text-neutral-100" id="modal-title">Edit Product</h3>
                </div>
            <div className="mt-3 w-[100%]">
                <form onSubmit={editProduct} className="w-[100%]">
                    <div className=''>
                        <label htmlFor='productName' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Product Name</label>
                        <input type="text" id="productName" value={productName} onChange={(e)=>{setProductName(e.target.value)}} className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="w-full mt-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                Description
                        </label>
                        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className='mb-3 form-control block w-full px-3 py-1.5  text-base font-normal text-gray-700 bg-white bg-clip-padding  border-gray-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' id="description" placeholder='Description'></textarea>
                    </div>
                    <div className='w-full mt-4'>
                        <label htmlFor='type' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Type</label>
                        <input type="text" id="type" value={type} onChange={(e)=>{setType(e.target.value)}} className='shadow appearance-none rounded border-none w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button type="submit" className="text-white bg-[#335663] hover:bg-[#244049] focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none ">Submit</button>
                    </div>
                </form>                  
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#6BA4B8] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        {/* <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">Invite</button> */}
        <button type="button" onClick={()=>{setShowModal(false)}} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
       
      </div>
    </div>
    
  </div>
  
</div>
  )
}

export default EditProductModal;