import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db } from "../firebase/config"

const useDealerOrders = () =>{
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [dealerOrders, setDealerOrders] = useState([])

    async function fetchDealerOrders(){
        setError("")
        setLoading(true)
        try {
            const querySnapshot = await getDocs(collection(db, "orders-dealer"))
            let orders = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let  createdAtReadable = doc.data()?.createdAt
                createdAtReadable = new Date(createdAtReadable.toDate())
                console.log({createdAtReadable})
                orders.push({id: doc.id, ...doc.data(), createdAtReadable});
            });
            setError("");
            setLoading(false)
            orders = orders.sort((a,b)=> b.createdAtReadable - a.createdAtReadable)
            setDealerOrders(orders)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError("Error Occoured")
        }

    }
    useEffect(()=>{
        fetchDealerOrders()
    }, [])
    
    return {error, loading, dealerOrders, fetchDealerOrders}
}

export default useDealerOrders;