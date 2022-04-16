import { collection, getDocs, addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db, projectAuth } from "../firebase/config";


const useDealerCode = ()=>{
    const [dealerCode, setDealerCode] = useState([]);
    const [dealerCodeLoadingError, setDealerCodeLoadingError] = useState(false)
    const [isDealerCodeloading, setIsDealerCodeLoading] = useState(false)
    async function getDealerCode(){
        try{
            setIsDealerCodeLoading(true)
            setDealerCodeLoadingError(false)
            const querySnapshot = await getDocs(collection(db, "dealers"))
            let dealerCode = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                dealerCode.push({id: doc.id, ...doc.data()});
            });
            
            setIsDealerCodeLoading(false)
            setDealerCodeLoadingError(false)
            setDealerCode(dealerCode)

        }catch(err){
            console.log(err)
            setIsDealerCodeLoading(false)
            setDealerCodeLoadingError("Error Occoured in Loading product, Please reload the Page")
        }
    }

    async function createDealer(dealerNameInput, dealerCodeInput){
        if(!dealerNameInput || dealerNameInput?.length ==0) {
            alert("please enter a Valid Dealer Name")
            return null
        }
        if(!dealerCodeInput || dealerCodeInput?.length ==0) {
            alert("please enter a Valid Dealer Code")
            return null
        }
        const finalDealer = {
            dealerCode: dealerCodeInput.toUpperCase(),
            dealerName: dealerNameInput,
            isAllowed: true,
            createdAt: new Date(),
            createdBy:  projectAuth.currentUser?.email || "FOUND BUG"
        }
        try {
            const docRef = await addDoc(collection(db, "dealers"), finalDealer);
            console.log("Document written with ID: ", docRef.id);
            window.alert(`Document written with ID: ${ docRef.id}`)
            getDealerCode()
        } catch (error) {
            console.log(error)
            window.alert('Cannot create the product, Please try again')
        }
    }
    useEffect(()=>{

        getDealerCode()

    }, [])

    return {dealerCode,isDealerCodeloading, dealerCodeLoadingError, setDealerCode,createDealer}
}

export default useDealerCode;