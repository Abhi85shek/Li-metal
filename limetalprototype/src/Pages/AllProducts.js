import React,{useEffect, useState} from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import CreateProduct from '../component/CreateProduct';
import AddProductModal from '../component/AddProductModal';
import addProductModalAtom from '../atoms/addProductModalAtom';
import { useRecoilState,useRecoilValue} from 'recoil';
import ProductArchiveModal from '../component/ProductArchiveModal';
import archiveProductModalAtom from '../atoms/archiveProductModalAtom';
const AllProducts = () => {

    const [showModal,setShowModal] = useRecoilState(addProductModalAtom);
    const [archiveShowModal,setArchiveShowModal] = useRecoilState(archiveProductModalAtom);
    const [allProducts,setAllProducts] = useState([]);
    const [selectedArchivedProduct,setSelectedArchivedProduct] = useState(null);
    const [totalRecords,setTotalRecords] = useState(0);
    let [currentPage,setCurrentPage] = useState(0);
    const currentCount =10;
    let totalNumberOfPages;

    const getAllProducts = async ()=>{
        const result = await axios.get(`http://localhost:4000/allProducts/${currentPage}/${currentCount}`);
        setAllProducts(result.data.data.cur_records);
        setTotalRecords(result.data.data.total_count);
    };

    const archiveHandler =(product)=>{
            setArchiveShowModal(true);
            setSelectedArchivedProduct(product);
    };

    const previousPageHandler =()=>{

        if(currentPage>0)
        {
            setCurrentPage(--currentPage);
        }
        
    };

    const nextPageHandler = ()=>{
        setCurrentPage(++currentPage);
    };

    useEffect(()=>{
        getAllProducts();
    },[]);

    totalNumberOfPages = Math.ceil(totalRecords/10);
  return (
    <>
    <Navbar />
  { showModal ? <AddProductModal /> : " "}
   {archiveShowModal ? <ProductArchiveModal  product={selectedArchivedProduct} /> : " "}
    {/* <div>Products Page</div> */}
    <CreateProduct />
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-6 mt-4">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Type
                </th> 
                <th scope="col" className="px-6 py-3">
                    Edit
                </th>
                <th scope="col" className="px-6 py-3">
                    Delete
                </th>
            </tr>
        </thead>
        <tbody>
           { allProducts.map((product)=>
                (
                    <tr className={product.active === 0 ? "bg-white border-b  dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-r from-rose-400": "bg-white border-b dark:bg-gray-800 dark:border-gray-700"} key={product.id} >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {product.serviceName}
                    </th>
                    <td className="px-6 py-4">
                        {product.description? product.description : "_"}
                    </td>
                    <td className="px-6 py-4">
                        {product.type}
                    </td>
                    <td className="px-6 py-4">
                        <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Edit</p>
                    </td>
                    <td className="px-6 py-4">
                        <p onClick={()=>{archiveHandler(product)}} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">{product.active ==0 ? "UnArchive" : "Archive"}</p>
                    </td>
                </tr>
                )
           )
           }
        </tbody>
    </table>
    <div className='inline-block py-2 min-w-full sm:px-6 flex lg:px-8 '>
        <p>Page {currentPage+1}/{totalNumberOfPages}</p>
    </div>
    <div class="flex flex-col items-center">
                 <span class="text-sm text-gray-700 dark:text-gray-400 mt-">
                    Showing <span class="font-semibold text-gray-900 dark:text-white">{(currentPage*10)+1}</span> to <span class="font-semibold text-gray-900 dark:text-white">{currentPage*10 + 10 > totalRecords ? (currentPage*10 + 10)-(currentPage*10 + 10 - totalRecords) :currentPage*10 + 10  }</span> of <span class="font-semibold text-gray-900 dark:text-white">{totalRecords}</span> Entries
                </span>
   
    <div className='inline-block py-6 min-w-full sm:px-6 flex lg:px-8 text-center space-x-5 justify-center'>
                   
                      <button type='button' onClick={previousPageHandler} className={currentPage == 0 ? 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white-500 bg-gray-400 rounded-lg border border-gray-300 opacity-70 cursor-no-drop dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:text-white'
      : 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} disabled={currentPage == 0 ? true : false}>
                        <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                            Previous</button>
                      <button type='button' onClick={nextPageHandler} 
                      className={currentPage+1 == totalNumberOfPages ? 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white-500 bg-gray-400 rounded-lg border border-gray-300 opacity-70 cursor-no-drop dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:text-white'
                      : 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} disabled={currentPage+1 == totalNumberOfPages ?true :false}>
                          Next
                        <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                       </button>

    </div>
</div>
</div>
    </>
  )
}

export default AllProducts