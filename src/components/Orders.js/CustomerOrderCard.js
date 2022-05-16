import { useState } from "react"
import UseChangeOrderStatus from "../../hooks/useChangeOrderStatus"
import InputformComp from "../InputFormComp"


const CustomerOrderCard = ({order}) =>{
    const [showDispatch, setShowDispatch] = useState(false)
    const [showCancel, setShowCancel] = useState(false)
    const [showComplete, setShowComplete] = useState(false)
    let  createdAt = order.createdAt
    createdAt = new Date(createdAt.toDate()).toDateString()
    return <div className="bg-green-200 border-2 rounded m-2 overflow-hidden  position: relative " >
        {showDispatch && <DispatchPopup setShowDispatch={setShowDispatch} order={order}/>}
        {showCancel && <CancelPopup setShowCancel={setShowCancel} order={order}/>}
        {showComplete && <CompletePopup setShowComplete={setShowComplete} order={order}/>}
        <div>
            <div className="flex justify-between bg-green-900">
                <h3 className="bg-red-500 text-green-200 p-1">{createdAt}</h3>
                <div>
                    {order.status === "CREATED" && <button onClick={()=> setShowDispatch(true)} className="btn rounded-md bg-green-500 m-1 text-white px-1">DISPATCH </button>}
                    {(order.status === "DISPATCHED" || order.status === "CREATED") &&<button onClick={()=> setShowCancel(true)} className="btn rounded-md bg-red-600 m-1 text-white px-1">CANCEL</button>}
                    {order.status === "DISPATCHED" && <button onClick={()=> setShowComplete(true)} className="btn rounded-md bg-green-600 m-1 text-white px-1">COMPLETE</button>}
                </div>
            </div>
            <h2>Order Id: {order.id}</h2>
            <h2>Payment Id: {order.paymentId}</h2>
            <h2>Amount : {order.amountAfterCoupon}</h2>
            {order.dealerName && <h2 className=""><span className="font-bold text-lg">Dealer Name:</span> {order.dealerName}</h2>}
            <h2 className="font-bold text-lg">DelieveryAddress</h2>
            <h2 className="pl-10"><span className="font-bold">Name:</span> {order.deliveryAddress.name}</h2>
            <h2 className="pl-10"><span className="font-bold">Phone No: </span> {order.deliveryAddress.number}</h2>
            <h2 className="pl-10"><span className="font-bold">House No:</span> {order.deliveryAddress.houseNo}</h2>
            <h2 className="pl-10"><span className="font-bold">Landmark: </span> {order.deliveryAddress.landmark}</h2>
            <h2 className="pl-10"><span className="font-bold">Street: </span> {order.deliveryAddress.street}</h2>
            <h2 className="pl-10"><span className="font-bold">City: </span> {order.deliveryAddress.city}</h2>
            <h2 className="pl-10"><span className="font-bold">PINCODE: </span> {order.deliveryAddress.pinCode}</h2>
            {/* <h2>{order.deliveryAddress}</h2> */}
            <div>
                {order.items.map((item)=>{
                    return <div className='flex justify-start p-1 border-2 m-1'>
                        <div className="h-20 w-20 bg-green-900">
                            <img src={item.featureImage}/>
                        </div>
                        <div className="px-1">
                            <p className="text-gray-500 font-extrabold">{item.productName}</p>
                            <p>Quantity: <span className="font-bold text-orange-900  ">{item.quantity}</span></p>
                            <p>Order Price: ₹{item.SP}</p>
                            <p className="font-bold text-orange-900  ">Total: ₹{item.SP*item.quantity}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}


const DispatchPopup = ({setShowDispatch, order}) =>{
    const [dispatchNotes, setDispatchNotes] = useState("");
    const [trackAddress, setTrackAddress] = useState("");
    const {dispatchOrder} = UseChangeOrderStatus()
    function callbackFxn(){
        window.alert("Order Updated")
        window.location.reload()

        setShowDispatch(false)
    }
    let isDealer = order.dealerName ? true: false
    return <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div className="bg-white px-16 py-14 rounded-md text-center">
            
            <InputformComp label="Dispatch Notes" text={dispatchNotes} setText={setDispatchNotes} type="text"/>
            <InputformComp label="Track Address" text={trackAddress} setText={setTrackAddress} type="text"/>
            <button
                className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
                onClick={() => setShowDispatch(false)}
            >
                Cancle
            </button>
            <button className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={()=> dispatchOrder(isDealer, order.id,dispatchNotes,trackAddress, callbackFxn)}>
                Dispatch
            </button>
        </div>
    </div>
}

const CancelPopup = ({setShowCancel, order}) =>{
    const [cancelNotes, setCancelNotes] = useState("");
    const {cancelOrder} = UseChangeOrderStatus()
    function callbackFxn(){
        window.alert("Order Updated")
        window.location.reload()
        setShowCancel(false)
    }
    let isDealer = order.dealerName ? true: false
    return <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div className="bg-white px-16 py-14 rounded-md text-center">
            
            <InputformComp label="Cancel Notes" text={cancelNotes} setText={setCancelNotes} type="text"/>
            <button
                className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
                onClick={() => setShowCancel(false)}
            >
                GoBack
            </button>
            <button className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={()=> cancelOrder(isDealer, order.id,cancelNotes, callbackFxn)}>
                Cancel Order
            </button>
        </div>
    </div>
}

const CompletePopup = ({setShowComplete, order}) =>{
    const [completeNotes, setCompleteNotes] = useState("");
    const {completeOrder} = UseChangeOrderStatus()
    function callbackFxn(){
        window.alert("Order Updated")
        window.location.reload()
        setShowComplete(false)
    }
    let isDealer = order.dealerName ? true: false
    return <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div className="bg-white px-16 py-14 rounded-md text-center">
            
            <InputformComp label="Complete Notes" text={completeNotes} setText={setCompleteNotes} type="text"/>
            <button
                className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
                onClick={() => setShowComplete(false)}
            >
                GoBack
            </button>
            <button className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={()=> completeOrder(isDealer, order.id,completeNotes, callbackFxn)}>
                Complete Order
            </button>
        </div>
    </div>
}

export default CustomerOrderCard;