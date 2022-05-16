import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db } from "../firebase/config"

const useOrders = () =>{
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])

    async function fetchOrders(){
        setError("")
        setLoading(true)
        try {
            const querySnapshot = await getDocs(collection(db, "orders-customer"))
            let orders = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let  createdAtReadable = doc.data()?.createdAt
                createdAtReadable = new Date(createdAtReadable.toDate())
                console.log({createdAtReadable})
                orders.push({productId: doc.id, ...doc.data()}, createdAtReadable);
            });
            setError("");
            setLoading(false)
            orders = orders.sort((a,b)=> b.createdAtReadable - a.createdAtReadable)
            setOrders(orders)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError("Error Occoured")
        }

    }
    useEffect(()=>{
        fetchOrders()
    }, [])
    
    return {error, loading, orders, fetchOrders}
}

export default useOrders;