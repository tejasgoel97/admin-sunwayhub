import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, projectAuth } from "../firebase/config";

const UseChangeOrderStatus = () =>{
    async function dispatchOrder(isDealer,orderId, dispatchNotes, trackAddress,callbackFxn){
        const collectionName = isDealer ? "orders-dealer" : ""
        const orderRef = doc(db, collectionName, orderId);
        const newHistory = {
            changedBy:  {
                phoneNumber: projectAuth.currentUser?.email || "FOUND BUG",
                uid:projectAuth.currentUser.uid,
            },
            time: new Date(),
            status: "DISPATCHED"
        }
        try {
            await updateDoc(orderRef, {
                changesHistory: arrayUnion(newHistory),
                status:"DISPATCHED",
                dispatchNotes,
                trackAddress,
            });
            console.log("DOCUMENT UPDATED")
            callbackFxn()
        } catch (error) {
            console.log(error)
        }       

    }

    async function cancelOrder(isDealer,orderId, cancelNotes,callbackFxn){
        const collectionName = isDealer ? "orders-dealer" : ""
        const orderRef = doc(db, collectionName, orderId);
        const newHistory = {
            changedBy:  {
                phoneNumber: projectAuth.currentUser?.email || "FOUND BUG",
                uid:projectAuth.currentUser.uid,
            },
            time: new Date(),
            status: "CANCELLED"
        }
        try {
            await updateDoc(orderRef, {
                changesHistory: arrayUnion(newHistory),
                status:"CANCELLED",
                cancelNotes,
            });
            console.log("DOCUMENT UPDATED")
            callbackFxn()
        } catch (error) {
            console.log(error)
        }       

    }

    async function completeOrder(isDealer,orderId, completeNotes,callbackFxn){
        const collectionName = isDealer ? "orders-dealer" : ""
        const orderRef = doc(db, collectionName, orderId);
        const newHistory = {
            changedBy:  {
                phoneNumber: projectAuth.currentUser?.email || "FOUND BUG",
                uid:projectAuth.currentUser.uid,
                time: new Date()
            },
            time: new Date(),
            status: "COMPLETED"
        }
        try {
            await updateDoc(orderRef, {
                changesHistory: arrayUnion(newHistory),
                status:"COMPLETED",
                completeNotes,
            });
            console.log("DOCUMENT UPDATED")
            callbackFxn()
        } catch (error) {
            console.log(error)
            window.alert("SOMETHING WENT WRONG")
        }       

    }


    return {dispatchOrder, cancelOrder, completeOrder}
}

export default UseChangeOrderStatus;