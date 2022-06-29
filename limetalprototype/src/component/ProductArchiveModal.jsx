import { ToastContainer, toast } from 'react-toastify';
import React from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import archiveProductModalAtom from '../atoms/archiveProductModalAtom';
import 'react-toastify/dist/ReactToastify.css';
const ProductArchiveModal = ({product}) => {

    const [showModal,setShowModal] = useRecoilState(archiveProductModalAtom);
    
    const archiveProductHandler = async() =>{
        setShowModal(false);
        const result = await axios.post("http://localhost:4000/archiveProductById",{id:product.id}); 
        alert("Archive Done");
        // toast.success('Archive Succesfully Done', {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     });
    };
  return (
    <div className='bg-red-700'>
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
     <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
     <div className="flex justify-end p-2 z-50 opacity-100">
         <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
             <svg className="w-5 h-5" onClick={()=>setShowModal(false)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
         </button>
     </div>
     <div className="p-6 pt-0 text-center">
         <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
         <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to archive this Service?</h3>
         <button  type="button" onClick={archiveProductHandler} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
             Yes, I'm sure
         </button>
         <button  type="button" onClick={()=>setShowModal(false)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
     </div> 
     <ToastContainer />
 </div>
</div>
</div>

</div>
  )
}

export default ProductArchiveModal