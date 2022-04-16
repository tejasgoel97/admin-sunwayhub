import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase/config";

// const washingtonRef = doc(db, "cities", "DC");

// await updateDoc(washingtonRef, {
//   capital: true
// });


const useEditProduct = (productId) =>{
    const {editLoading, setEditLoading} = useState(false);
    const [success, setSuccess] = useState(false)
    const {editError, setEditError} = useState(null);
    const navigate = useNavigate()
    async   function editProduct(data) {
        console.log(data);
        const productRef = doc(db, "products", productId);
        try {
            await updateDoc(productRef, data)
            window.alert(`Product Edited`)
            navigate('/')
        } catch (error) {
            console.log(error)
            setEditError("someThing went Wrong Please reload the page")
        }

        
    }
    return {editLoading, editError, success, editProduct}
}

export default useEditProduct;