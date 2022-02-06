import { collection, getDocs } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { db } from '../../firebase/config'
import useProducts from '../../hooks/useProducts';
import useCategories from '../../hooks/useCategories';


const AllProductList = () =>{
    const {products,isProductloading, productLoadingError} = useProducts()
    const {categories,isCategoriesloading, categoriesLoadingError} = useCategories();

    const navigate = useNavigate();
    function handleProductEdit(productId){
        // if(!productId) return null
        navigate(`/editproduct/${productId}`)
    }
    if(isCategoriesloading || isProductloading) return <p>Loading...</p>
    return (
    <div className="content-center">
        <h1>All Products</h1>
        <div className="w-full mx-auto max-w-2xl" >
           { products.map(product=>{
               console.log(product)
               const {productName, SP, MRP, featureImage, mainCategory,subCategory, productId} = product;
               let discountPerc = ((1-SP/MRP)*100).toFixed(2);
               return <div className="bg-green-50 border-2 rounded m-2 overflow-hidden cursor-pointer" onClick={()=> handleProductEdit(productId)}>
                   <div className="flex justify-around">
                       <div className="h-40 w-40 bg-green-900   ">
                           <img src={featureImage}/>
                       </div>
                       <div className="flex-1 p-4">
                           <h2 className="text-red-400 text-lg font-bold ">{productName}</h2>
                           <h3 className="text-stone-600"><span className="font-bold">Price:</span> ₹{product.SP}  <strike className="text-stone-400 line-through text-sm">₹{product.MRP}</strike> <span className="text-xs bg-green-900 text-red-100 px-1 rounded">Discount: {discountPerc}%</span></h3>
                           <h3 className="text-stone-600"><span className="font-bold">Main Category:</span> {mainCategory}</h3>
                           <h4 className="text-stone-600"><span className="font-bold">Sub Category:</span> {subCategory}</h4>
                           <button className="bg-green-600 px-1 rounded border-2"> <img src="https://img.icons8.com/material-outlined/20/000000/edit--v2.png" className="inline"/>Edit</button>
                        </div>
                   </div>
                   
               </div>
           })}
        </div>
    </div>
    )
}


export default AllProductList