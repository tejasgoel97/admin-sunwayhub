import { collection, getDocs } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { db } from '../../firebase/config'
import useProducts from '../../hooks/useProducts';
import useCategories from '../../hooks/useCategories';
import ProductCard from './ProductCard';


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
               return <ProductCard product={product} handleProductEdit={handleProductEdit}/>
           })}
        </div>
    </div>
    )
}


export default AllProductList