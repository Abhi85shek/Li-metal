import React,{useEffect, useRef, useState} from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import CreateProduct from '../component/CreateProduct';
import AddProduct from '../component/AddProduct';
import addProductModalAtom from '../atoms/addProductModalAtom';
import { useRecoilState,useRecoilValue} from 'recoil';
import ProductArchiveModal from '../component/ProductArchiveModal';
import archiveProductModalAtom from '../atoms/archiveProductModalAtom';
import { BsSearch } from "react-icons/bs";
import {AiFillFilter} from "react-icons/ai"
import editProductModalVisible from '../atoms/editProductModalVisible';
import EditProductModal from '../component/EditProductModal';
import addNewLocalProductVisibleAtom from '../atoms/addNewLocalProductVisibleAtom';
import AddLocalProduct from '../component/AddLocalProduct';

const AllProducts = () => {

    const [showModal,setShowModal] = useRecoilState(addProductModalAtom);
    const [showEditModal,setShowEditModal]=useRecoilState(editProductModalVisible)
    const [archiveShowModal,setArchiveShowModal] = useRecoilState(archiveProductModalAtom);
    const [showAddLocalProductModal,setShowAddLocalProductModal]=useRecoilState(addNewLocalProductVisibleAtom)
    const [allProducts,setAllProducts] = useState([]);
    const [selectedArchivedProduct,setSelectedArchivedProduct] = useState(null);
    const [totalRecords,setTotalRecords] = useState(0);
    let [currentPage,setCurrentPage] = useState(0);
    let [searchProduct, setsearchProduct]=useState("")
    let [isTypeFilterVisible,setTypeFilterVisible]=useState(false)
    let [filtersArray,setFiltersArray]=useState([])
    let [selectedProduct,setSelectedProduct]=useState([])
    const filterRef=useRef([])
    let types=['Service','Non-Inventory']
    const currentCount =10;
    let totalNumberOfPages;

    const getAllProducts = async ()=>{
        
        const result = await axios.get(`http://localhost:4000/allProducts/${currentPage}/${currentCount}`,{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        setAllProducts(result.data.data.cur_records);
        setTotalRecords(result.data.data.total_count);
    };
    const getProductByNameForFirstSearch = async ()=>{
        setCurrentPage(0)
        const result = await axios.post(`http://localhost:4000/searchOrder/${0}/${currentCount}`, {productName:searchProduct},{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        setAllProducts(result.data.data.cur_records);
        setTotalRecords(result.data.data.total_count);
    };
    const getProductByName = async ()=>{
        const result = await axios.post(`http://localhost:4000/searchOrder/${currentPage}/${currentCount}`, {productName:searchProduct},{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        setAllProducts(result.data.data.cur_records);
        setTotalRecords(result.data.data.total_count);
    };
    

    const archiveHandler =(product)=>{
            setArchiveShowModal(true);
            setSelectedArchivedProduct(product);
    };

  const  updateFiltersArray=(type)=>{
    for (let value of filtersArray){
    if(value==type){
        console.log("here")
        setFiltersArray(filtersArray.filter(item => item !== type))
        return
    }
}
        console.log("i am here")
        setFiltersArray(arr=>[...arr,type])}
  

    const previousPageHandler =()=>{
        if(currentPage>0)
        {
            setCurrentPage(--currentPage);
        }

        if(searchProduct.length>0 ){
           
          
                getProductByName()
            
        }
        else{
           
            if(filtersArray.length>0)
            {
              applyFilters()
            }
            else{
              getAllProducts();}
         
      };
        
    };

    const applyFilters=async()=>{

        console.log(filtersArray)
      
        let filterString=""
        let newfilterString=""
        if(filtersArray.length==1){
            newfilterString="\'"+filtersArray[0]+"\'"
        }
        else{
        for(let filter of filtersArray)
        {
            filterString+="\'"+filter+"\',"
            newfilterString=filterString.substring(0,filterString.length-1)
        }
    }
        console.log(newfilterString)
        const result = await axios.post(`http://localhost:4000/filterServices/${currentPage}/${currentCount}`, {category:'Type',filter:newfilterString},{

            headers:{
    
              Authorization:`Bearer+ ${JSON.parse(localStorage.getItem("userData")).token}`
    
            }
    
          });
        setAllProducts(result.data.data.cur_records);
        setTotalRecords(result.data.data.total_count);
        // setTypeFilterVisible(false)
    
    }

    // const applyFiltersandSearch=async()=>{
    //     console.log(filtersArray)
    //     let filterString="";
    //     let newfilterString=""
    //     if(filtersArray.length==1){
    //         newfilterString="\'"+filtersArray[0]+"\'"
    //     }
    //     else{
    //     for(let filter of filtersArray)
    //     {
    //         filterString+="\'"+filter+"\',"
    //         newfilterString=filterString.substring(0,filterString.length-1)
    //     }
    //     }

    //     const result = await axios.post(`http://localhost:4000/advanceSearch/${currentPage}/${currentCount}`, {category:'Type',filter:newfilterString,searchWord:searchProduct});
    //     setAllProducts(result.data.data.cur_records);
    //     setTotalRecords(result.data.data.total_count);
    //     // setTypeFilterVisible(false)
    // }


    useEffect(()=>{
        console.log("searching all products")
        if(searchProduct.length==0){
           
                getAllProducts()
            
        }
        else{
         
            getProductByNameForFirstSearch()
            if(filtersArray.length>0){
                handleFilterReset()
            }
            

        }
    },[searchProduct])

    const nextPageHandler = ()=>{
        setCurrentPage(++currentPage);
        if(searchProduct.length>0)
        {
        
                getProductByName()
            
        }
        else{
          if(filtersArray.length>0)
          {
            applyFilters()
          }
          else{
            getAllProducts();}
       
    };
    }

   const handleFilterReset=async()=>{
    setTypeFilterVisible(false)
      let  x=document.querySelectorAll('.checkbox')
        for(let i=0; i<x.length; i++) {
            x[i].checked= false;
         }  
      setFiltersArray([])
    if(searchProduct.length>0)
    {
        getProductByName()
    }
    else{
        getAllProducts();
        }
   }

    totalNumberOfPages = Math.ceil(totalRecords/10);
  return (
    <>
  { showModal ? <AddProduct /> : " "}
  { showEditModal ? <EditProductModal selectedProduct={selectedProduct}  /> : " "}
   {archiveShowModal ? <ProductArchiveModal  product={selectedArchivedProduct} /> : " "}
   {showAddLocalProductModal? <AddLocalProduct/>:" "}
    {/* <div>Products Page</div> */}
    {localStorage.getItem('uType')==='admin'?
       
    <CreateProduct />:null}
    <div className='w-full px-40 py-2 '>
        <div className='w-full flex border-[#6BA4B8] border-2 border- h-14 rounded-md pl-4 '>
        <BsSearch size={28} className='mt-3 text-slate-400 text-xl'/>
        <input placeholder='Start typing to search a product....' className='w-full text-xl text-slate-400 px-4 focus:outline-none  ' onChange={(val)=>{setsearchProduct(val.target.value)}}/>
        {/* <button type="button" onClick={getProductByName}  class="w-40 text-white bg-[#5ba3bd] hover:bg-[#417587] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-2 h-13 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Search</button> */}
        </div>
    </div>
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
                <th scope="col" className=" px-6 py-3 ">
                   <span className='flex flex-row flex-1 space-x-2 items-center'>
                   Type 
                    <AiFillFilter onClick={()=>{setTypeFilterVisible(!isTypeFilterVisible)}} size={12} className="ml-2 hover:cursor-pointer"/>
                    </span>
                    {isTypeFilterVisible?
                    <div className='h-15 w-42 bg-white outline-2 border-2 outline-slate-600 absolute'> 
                      { types.map((type,i)=>{
                        return(
                            <div className='p-1 h-7 items-center normal-case font-medium hover:cursor-pointer hover:bg-[#6BA4B8] hover:text-white'>
                                <input type="checkbox" className='checkbox' ref={el => filterRef.current[i] = el}  id={type} name={type} onClick={()=>updateFiltersArray(type)} value={type}/>
                                        <label className='mt-[-5px]' > {type}</label>
                                </div>
                        )
                       })
                    }
                    <div className='flex flex-row p-2'>
                    <button type='button' onClick={applyFilters} className={'w-15 rounded inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white-500 bg-green-400'} >
                        
                            Apply</button>
                            <button type='button' onClick={handleFilterReset} className={'w-15 rounded inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white-500 bg-blue-400'} >
                        
                            Reset</button>
                            </div>
                    </div>:null
}
                </th> 
                <th   scope="col" className="px-6 py-3">
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
                    <tr className={product.active === 0 ? "bg-white border-b  dark:bg-gray-800 dark:border-gray-700 ": "bg-white border-b dark:bg-gray-800 dark:border-gray-700"} key={product.id} >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {product.serviceName}
                    </th>
                    <td className="px-6 py-4">
                        {product.description? product.description : "_"}
                    </td>
                    <td className="px-6 py-4">
                        {product.type}
                    </td>
                    <td onClick={()=>{setShowEditModal(true);setSelectedProduct(product)}} className="px-6 py-4">
                        <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Edit</p>
                    </td>
                    <td className="px-6 py-4">
                        <p onClick={()=>{archiveHandler(product)}} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">{product.active ==0 ? "Unarchive" : "Archive"}</p>
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
      : 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} disabled={currentPage == 0  ||(searchProduct.length>0 && totalRecords<10 )? true : false}>
                        <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                            Previous</button>
                      <button type='button' onClick={nextPageHandler} 
                      className={currentPage+1 == totalNumberOfPages ? 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-white-500 bg-gray-400 rounded-lg border border-gray-300 opacity-70 cursor-no-drop dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:text-white'
                      : 'inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} disabled={currentPage+1 == totalNumberOfPages ||(searchProduct.length>0 && totalRecords<10 ) ?true :false}>
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