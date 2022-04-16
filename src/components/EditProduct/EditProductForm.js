import React, { useState } from 'react';
import ImageUploadComp from '../ImageUploadComp';
import InputformComp from '../InputFormComp';
import DropDownMenu from "../DropDownMenu"
import ImageUploadModel from "../ImageUploadModel"
import { addDoc, collection } from '@firebase/firestore';
import { db, projectAuth } from '../../firebase/config';
import ConfirmChangesModel from './ConfirmChangesModel';
import ManageImageComp from './ManageImageComp';
import useEditProduct from '../../hooks/useEditProduct';
import DeliveryCodesComp from '../DeliveryCodesComp';
import AddRatingReview from '../AddProduct/AddRatingReview';


const EditProductForm =({allCat, product, productId}) =>{
    const selectedCat= allCat.find(cat=> cat.id===product.mainCategory)
    const selectedSubCat = selectedCat.subCat.find(subcat=> subcat.subCatName === product.subCategory)
    const [name, setName] = useState(product.productName);
    const [category, setCategory] = useState(selectedCat);
    const [subCategory, setSubCategory] = useState(selectedSubCat);
    const [MRP, setMRP] = useState(product.MRP);
    const [SP, setSP] = useState(product.SP);
    const [GST, setGST] = useState(product.GST || 0);

    const [maxQuantity, setMaxQuantity] = useState(product.maxQuantity);
    const [description, setdescription] = useState(product.productDescription || [])
    const [showModel, setShowModel] = useState(false);
    const [imgUrl, setImgUrl] = useState(product.featureImage || "");
    const [error, setError] = useState(null)
    const[confirmModel, setConfirmModel] = useState(false)
    const [deliveryCodes, setDeliveryCodes] = useState(product.deliveryCodes || [])
    const [rating, setRating] = useState(product.rating ||"5.0");
    const [reviews, setReviews] = useState(product.reviews|| []);

    
    const {editLoading, editError, success, editProduct} = useEditProduct(productId);

    function handleUrl(url){
        setError(null)
        setImgUrl(url)
      }
    function handleDescriptionChange(index, value){
        console.log(index, value)
        let disc = [...description];
        disc[index] = value;
        setdescription(disc);
    }
    function handleNewDescrition(){
        let disc = [...description];
        disc.push("")
        setdescription(disc)
    }
    function removedescription(index){
        let disc = [...description];
        disc.splice(index, 1);
        setdescription(disc)
    }

    
   function handleCategorySelect(cat){
    setCategory(cat)
    setSubCategory(null)
   }
    
   let FinalProduct = {}
    async function handleChange(){
        setError(null)
        let errorArray =[];
        if(!name) errorArray.push("Please select a Valid Name");
        // if(!category) errorArray.push("Please Select a Valid Category")
        // if(!subCategory) errorArray.push("Please Select a Valid Sub Category")
        if(MRP<10) errorArray.push("MRP should be greater then 10")
        if(SP<10) errorArray.push("SP should be greater then 10")
        if(+SP> +MRP) return setError("Selling Price Should not be greater then MRP")
        if(maxQuantity<1) errorArray.push("Please select a max Quantity to order");
        if(description.length <1) errorArray.push("Please Select Atleast One description")
        console.log("ERR", errorArray)
        if(errorArray.length) return setError(errorArray);
        const CatName = category.id;
        const SubCatName = subCategory.id;
        FinalProduct= new ProductModel(name, MRP, SP,GST, CatName, SubCatName, description, maxQuantity, imgUrl,  deliveryCodes, rating, reviews);
        editProduct(FinalProduct)

        
        // setConfirmModel(FinalProduct)
        // const docRef = await addDoc(collection(db, "products"), FinalProduct);
        //   console.log("Document written with ID: ", docRef.id);
    }
    return (
        <div className="w-auto xl:w-4/6 space-y-3">
            <InputformComp label="Product Name" text={name} setText={setName} type="text"/>
            <div className="flex justify-center space-x-2 flex-1">
               <InputformComp label="MRP" text={MRP} setText={setMRP} type="number"/>
               <InputformComp label="Selling Price" text={SP} setText={setSP} type="number"/>
               <InputformComp label="GST %" text={GST} setText={setGST} type="number"/>

            </div>
            <div className="flex justify-center space-x-2 flex-1 p-8">  
                <DropDownMenu options = {allCat} selected={category} setSelected = {handleCategorySelect} nameField="catName" placeHolder="Select Category"/>
                {category && <DropDownMenu options = {category.subCat} selected={subCategory} setSelected = {setSubCategory} nameField="subCatName" placeHolder="Select Sub Category"/>}
            </div>
            <div>  
                <span className ="font-bold ">Description  </span>
                <span className="hover:animate-bounce cursor-pointer" onClick={handleNewDescrition}><img className="inline-block" src="https://img.icons8.com/color/30/000000/plus--v3.png"/></span>
            <div> 
                {description.map((text, index)=>{
                    return <div className="flex align-middle m-0 p-0" key={index}>
                    <InputformComp  text={text} setText={handleDescriptionChange.bind(this, index)} type="text"/>
                    <button className="font-bold  mb-3 hover:text-red-400" onClick={()=>removedescription(index)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png"/> </button>
                    </div>
                })}
                </div>
            </div>
            <div className="flex flex-col flex-1 items-center justify-center">
            <button
                onClick={() => setShowModel(true)}
                className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold m-4">
                {imgUrl ?"Change Image": "Add Image"}
            </button>
            {/* CONFIRMATION MODEL */}
            {confirmModel && <ConfirmChangesModel setConfirmModel={setConfirmModel} finalProduct={confirmModel} initialProduct={product} productId={productId}/>}
            {/* This is model to show Image Uploading Feature */}
            {showModel && <ImageUploadModel setShowModel={setShowModel} handleUrl={handleUrl}/>}
            <div >
            
            {imgUrl && <img src={imgUrl} className="h-56"/>}
            </div>
            </div>
            <InputformComp label="Max Product Order" text={maxQuantity} setText={setMaxQuantity} type="number"/>
            <DeliveryCodesComp deliveryCodes={deliveryCodes} setDeliveryCodes={setDeliveryCodes}/>
            <AddRatingReview rating ={rating} reviews={reviews} setRating={setRating} setReviews={setReviews} />
            
            {error && <div>{error.map((e)=> <p key={e} className="p-1 my-1 bg-red-600 rounded break-words text-white">{e}</p>)}</div>}
            <button className="bg-green-700 mx-2 my-2 px-2 py-2 text-center text-white rounded-full w-full" onClick={handleChange}>Make Changes</button>
        </div>
    )
}
function ProductModel(productName, MRP, SP, GST, mainCategory , subCategory, productDescription, maxQuantity, featureImage, deliveryCodes, rating, reviews){
    let SearchString = `${productName} ${mainCategory} ${subCategory} `
    SearchString = SearchString.toLowerCase();
    let updatedDate = new Date();
    let updatedBy = projectAuth.currentUser?.email || "FOUND BUG"

    return{
        productName, MRP, SP, GST, mainCategory ,subCategory, productDescription, maxQuantity, featureImage, deliveryCodes, rating, reviews, SearchString, updatedDate, updatedBy
    }
}



export default EditProductForm;