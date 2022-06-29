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
    const getAllProducts = async ()=>{
        const result = await axios.get("http://localhost:4000/allProducts");
        setAllProducts(result.data);
    };
    const archiveHandler =(product)=>{
            setArchiveShowModal(true);
            setSelectedArchivedProduct(product);
    };

    useEffect(()=>{
        getAllProducts();
    },[]);

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
</div>
    </>
  )
}

export default AllProducts