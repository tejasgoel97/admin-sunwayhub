import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react"
import InputformComp from "../components/InputFormComp";
import { db } from "../firebase/config";

const DisputeScreen = () =>{
    const [tabIndex, setTabIndex] = useState(1);
    const [error, setError] = useState(null)
    const [disputes, setDisputes] = useState([])

    const loadDispute = async function(){
        try{
            setError(null)
            const querySnapshot = await getDocs(collection(db, "disputes"))
            let disputesArray = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let  createdAtReadable = doc.data()?.createdAt
                createdAtReadable = new Date(createdAtReadable.toDate())
                console.log({createdAtReadable})
                disputesArray.push({id: doc.id, ...doc.data(), createdAtReadable});
            });
            disputesArray = disputesArray.sort((a,b)=> b.createdAtReadable - a.createdAtReadable)

            console.log({disputesArray})
            setDisputes(disputesArray)
            
        }
        catch(err){
            setError(err)
        }
        
    }
    useEffect(()=>{
        loadDispute()
    },[])
    const newDisputes = disputes.filter((d)=> d.status ==='CREATED')
    const solvedDisputes = disputes.filter((d)=> d.status ==='COMPLETED')
    if(error){
        return <div className="flex flex-1 justify-center items-center">
            <h2 className="font-extrabold text-2xl">Something went Wrong ...Try again reloading the page</h2>
        </div>
    }
    return <div className="content-center ">

        <div className="flex justify-evenly max-w-3xl mx-auto">
            <button className={`${tabIndex ===1 ? "bg-yellow-500" : "bg-slate-800"} p-2 rounded-md m-1 text-white`} onClick={()=> setTabIndex(1)}>New <span className="bg-green-600 p-1  px-2 m-1 rounded-full">{newDisputes.length}</span></button>
            <button className={`${tabIndex ===2 ? "bg-yellow-500" : "bg-slate-800"} p-2 rounded-md m-1 text-white`} onClick={()=> setTabIndex(2)} >Solved <span className="bg-green-600 p-1  px-2 m-1 rounded-full">{solvedDisputes.length}</span></button>
        </div>
        <div className="mx-auto max-w-3xl">
            {tabIndex === 1 ? newDisputes.map((d)=>{
                return<DisputeCard d={d} />
            }) : solvedDisputes.map((d)=>{
                return<DisputeCard d={d} />
            })}
        </div>
    </div>
}

const DisputeCard = ({d}) =>{
    const [showUpdate, setShowUpdate] = useState(false)

    let  createdAt = d.createdAt
    const date = new Date(createdAt.toDate()).toDateString()
    const time = new Date(createdAt.toDate()).toLocaleTimeString()
    return (
    <div className="bg-green-200 border-2 rounded m-2 overflow-hidden  position: relative p-10" >
        {showUpdate && <UpdatePopUp setShowUpdate={setShowUpdate} d={d}/>}
        <div className="flex justify-between bg-green-900">
            <h3 className="bg-red-500 text-green-200 p-1">{date} {time}</h3>
            {d.status === "CREATED" && <button onClick={()=> setShowUpdate(true)}  className="btn rounded-md bg-green-500 m-1 text-white px-1">RESOLVE </button>}
        </div>
        <div>
            <h2><span className="font-bold">Text By Customer: </span>{d.textByCustomer}</h2>
            {d.resolutionNotes && <h2><span className="font-bold">Text By Customer: </span>{d.resolutionNotes}</h2>}
            <h2><span className="font-bold">Customer Phone No: </span>{d.phoneNumber}</h2>
            <h2><span className="font-bold">Customer ID: </span>{d.uid}</h2>
        </div>
    </div>)
    }


const UpdatePopUp = ({setShowUpdate, d}) =>{
    const [updateNotes, setUpdateNotes] = useState("");
    async function updateDispute(){
        if(!updateNotes) return alert("Please enter something in the Resoution Notes")
        const disputeRef = doc(db, "disputes", d.id);
        try {
            await updateDoc(disputeRef, {
                status:"COMPLETED",
                resolutionNotes:updateNotes,
            });    
            console.log("updated")
            alert("SucessFully updated")
            window.location.reload()
        } catch (error) {
            alert("error")
        }
        

    }
    
    return <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div className="bg-white px-16 py-14 rounded-md text-center">
            
            <InputformComp label="Resolution Notes" text={updateNotes} setText={setUpdateNotes} type="text"/>
            <button
                className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
                onClick={() => setShowUpdate(false)}
            >
                GoBack
            </button>
            <button className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={()=> updateDispute()}>
                Update
            </button>
        </div>
    </div>
}


export default DisputeScreen;