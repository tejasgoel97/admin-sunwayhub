import { useState } from "react"
import InputformComp from "../InputFormComp"


const CustomerOrderCard = ({order}) =>{
    const [showDispatch, setShowDispatch] = useState(false)
    let  createdAt = order.createdAt
    createdAt = new Date(createdAt.toDate()).toDateString()
    return <div className="bg-green-200 border-2 rounded m-2 overflow-hidden  position: relative " >
        {showDispatch && <DispatchPopup setShowDispatch={setShowDispatch} order={order}/>}
        <div>
            <div className="flex justify-between bg-green-900">
                <h3 className="bg-red-500 text-green-200 p-1">{createdAt}</h3>
                <button onClick={()=> setShowDispatch(true)} className="btn rounded-md bg-pink-800 m-1 text-white px-1">DISPATCH</button>
            </div>
            <h2>Order Id: {order.orderId}</h2>
            <h2>Payment Id: {order.paymentId}</h2>
            <h2>Amount : {order.amountAfterCoupon}</h2>
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
    const [dispatchNotes, setDispatchNotes] = useState("")
    return <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div className="bg-white px-16 py-14 rounded-md text-center">
            
            <InputformComp label="Dispatch Notes" text={dispatchNotes} setText={setDispatchNotes} type="text"/>
            <button
                class="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
                onClick={() => setShowDispatch(false)}
            >
                Cancle
            </button>
            <button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={()=> null}>
                Dispatch
            </button>
        </div>
    </div>
}

export default CustomerOrderCard;