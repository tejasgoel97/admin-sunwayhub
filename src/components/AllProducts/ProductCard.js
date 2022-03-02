import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const ProductCard = ({product, handleProductEdit}) =>{
    const [available, setAvailable] = useState(()=> product.available? true: false);
    const {productName, SP, MRP, featureImage, mainCategory,subCategory, productId} = product;
    let discountPerc = ((1-SP/MRP)*100).toFixed(2);
    console.log("available",product.available)
    

    async function handleAvailablity(){
        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, {
            available: !available
          });
        setAvailable(!available)
    }

    return <div className="bg-green-50 border-2 rounded m-2 overflow-hidden  position: relative " >
    <div className='position: absolute right-0'>
         <div class="form-check">
             <span>Avaiable</span>
             <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-lg bg-white checked:bg-green-600 checked:border-green-900 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" onClick={(e)=> handleAvailablity()} checked={available}/>
         </div>
     </div>
    <div className="flex justify-around cursor-pointer" onClick={()=> handleProductEdit(productId)}>
        <div className="h-40 w-40 bg-green-900">
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
}


export default ProductCard;