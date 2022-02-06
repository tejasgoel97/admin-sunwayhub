import { collection, doc, getDoc, getDocs } from '@firebase/firestore';
import {useState, useEffect} from 'react'
import AddProductForm from "../components/AddProductForm";
import { db } from '../firebase/config';


export default function AddProduct() {
    const [allCat, setAllCat] = useState([]);
    
    useEffect(()=>{
        const catRef = collection(db, "categories")
        getDocs(catRef).then(snapshot=> {
            let Categories = []
            snapshot.forEach(doc=>{
                Categories.push(doc.data())
                console.log(doc.id, " => ", doc.data());
            })
            setAllCat(Categories)
        })
    }, [])

    return<div className="justify-center flex">
        <AddProductForm allCat={allCat}/>
    </div>
}