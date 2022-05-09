import { useState } from "react"
import CustomerOrderCard from "./CustomerOrderCard"


const CustomerOrder = ({orders}) => {
    const [orderIndex, setOrderIndex] = useState(1);

    console.log(orders)
    const newOrders = orders.filter(o=>{
        if(o.status === "CREATED") return true
    })
    const dispatchedOrders = orders.filter(o=>{
        if(o.status === "DISPATCHED") return true
    })
    const completedOrders = orders.filter(o=>{
        if(o.status === "COMPLETED") return true
    })
    const cancelledOrders = orders.filter(o=>{
        if(o.status === "CANCELLED") return true
    })
    return (
        <div className="content-center ">
            <div className="flex justify-evenly max-w-3xl mx-auto">
                <button className={`${orderIndex ===1 ? "bg-yellow-500" : "bg-slate-800"} p-1 rounded-md m-1 text-white`} onClick={()=> setOrderIndex(1)}>New Orders</button>
                <button className={`${orderIndex ===2 ? "bg-yellow-500" : "bg-slate-800"} p-1 rounded-md m-1 text-white`} onClick={()=> setOrderIndex(2)} >DISPATCHED</button>
                <button className={`${orderIndex ===3 ? "bg-yellow-500" : "bg-slate-800"} p-1 rounded-md m-1 text-white`} onClick={()=> setOrderIndex(3)}>COMPLETED</button>
                <button className={`${orderIndex ===4 ? "bg-yellow-500" : "bg-slate-800"} p-1 rounded-md m-1 text-white`} onClick={()=> setOrderIndex(4)}>CANCELLED</button>
            </div>
            {/* *****************NEW ORDERS********************** */}
            {orderIndex === 1 && <div className="mx-auto max-w-3xl">
                <h2 className="font-bold p-1">New Orders</h2>
                {newOrders.length >0 && newOrders.map((order)=>{
                    return <CustomerOrderCard order={order} />
                })}
            </div>
            }
            {/* *****************DISPATCHED********************** */}

            {orderIndex === 2 && <div className="mx-auto max-w-3xl">
                <h2 className="font-bold p-1">DISPATCHED</h2>
                {dispatchedOrders.length >0 && dispatchedOrders.map((order)=>{
                    return <CustomerOrderCard order={order} />
                })}
            </div>
            }
            {/* *****************COMPLETED********************** */}

            {orderIndex === 3 && <div className="mx-auto max-w-3xl">
                <h2 className="font-bold p-1">COMPLETED</h2>
                {completedOrders.length >0 && completedOrders.map((order)=>{
                    return <CustomerOrderCard order={order} />
                })}
            </div>
            }
            {/* *****************CANCELLED********************** */}

            {orderIndex === 4 && <div className="mx-auto max-w-3xl">
                <h2 className="font-bold p-1">CANCELLED</h2>
                {cancelledOrders.length >0 && cancelledOrders.map((order)=>{
                    return <CustomerOrderCard order={order} />
                })}
            </div>
            }
        </div>
    )
}

export default CustomerOrder