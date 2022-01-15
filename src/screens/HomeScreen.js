import { useEffect } from "react"
import {collection, getDocs, addDoc, getDoc} from 'firebase/firestore'

import {useNavigate} from 'react-router-dom'

import {db} from "../firebase/config"

function HomeScreen() {
    const navigate = useNavigate()
    function showDOCUMENTS(){
        const ref = collection(db, "products")
        getDocs(ref).then(snapshot=> {
            const data = []
            snapshot.docs.forEach(doc=> console.log(doc.data()))
        })

    }
    useEffect(()=>{
        const ref = collection(db, "products")
        // getDocs(ref).then(snapshot=> console.log(snapshot.docs))
    }, [])

    return<div className="flex justify-center">
        <div>        
        <button  className="bg-red-500 p-3 m-3 rounded border-2"
        onClick={()=> navigate("/AddNewProduct")}>Add New Product</button>
        </div>
    </div>
}


export default HomeScreen