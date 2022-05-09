import CustomerOrder from "../components/Orders.js/CustomerOrder"
import useOrders from "../hooks/useOrders"

function OrdersScreen() {
    const {error, loading, orders} = useOrders()

    return <CustomerOrder orders={orders}/>
}


export default OrdersScreen