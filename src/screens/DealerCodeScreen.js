import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import InputformComp from "../components/InputFormComp";
import { db } from "../firebase/config";
import useDealerCode from "../hooks/useDealerCode"

function DealerCodeScreen() {
    const {dealerCode,isDealerCodeloading, dealerCodeLoadingError, setDealerCode, createDealer} = useDealerCode();
    const [nameInput, setNameInput] = useState("")
    const [codeInput, setCodeInput] = useState("")

    if(isDealerCodeloading) return <p>Loading...</p>
    if(dealerCodeLoadingError) return <p>A Error Occoured..Please refresh the page</p>
    console.log(dealerCode)
    async function handleIsAllowed(dealerId, currentValue, index){
        console.log("params", dealerId, currentValue, index)
        try {
            const dealerREf = doc(db, "dealers", dealerId);
            await updateDoc(dealerREf, {
                isAllowed: !currentValue
              });
              let newArray = [...dealerCode]
              newArray[index] = {...dealerCode[index], isAllowed: !currentValue}
              setDealerCode(newArray)
        } catch (error) {
            console.log(error)
        }
    }
    return<div className=" flex justify-around position:relative flex-wrap m-3">
        <h3 className="w-1/2 text-4xl text-center underline">Dealer Codes</h3>
        <div className="w-1/2 flex items-center justify-end">
            <button className="p-2 text-white rounded-full bg-green-800">Create new Dealer</button>
            {/* Dealer Add DealerForm */}
        
        </div>
        <div className="w-4/5 flex justify-center items-center">
            <InputformComp label="Dealer Name" text={nameInput} setText={setNameInput} type="text"/>
            <InputformComp label="Dealer Code" text={codeInput} setText={setCodeInput} type="text"/>
            <button className="bg-red-500 p-2 px-9 mt-7 rounded text-white" onClick={()=> createDealer(nameInput, codeInput)}>Add</button>
        </div>
        {dealerCode.map((dc,index)=>{
            return<div className="w-2/6 p-4 m-3 border-2 border-green-500 rounded-lg" key={dc.id}>
                  <div className='position: absolute right-0 z-50'>
                    
                </div>
                <p>Dealer Name: {dc.dealerName}</p>
                <p>Dealer Code: {dc.dealerCode}</p>
                <p>Created By: {dc.createdBy}</p>
                <div className="form-check">
                    <span>Allowed</span>
                    <input className="form-check-input appearance-none h-4 w-4 border border-red-300 rounded-lg bg-red-700 checked:bg-green-600 checked:border-green-900 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                        type="checkbox"  
                        onChange={()=> handleIsAllowed(dc.id, dc.isAllowed, index)} 
                        checked={dc.isAllowed}/>
                </div>
            </div>
        })}
    </div>
}

export default DealerCodeScreen