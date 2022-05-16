import CustomerOrder from "../components/Orders.js/CustomerOrder"
import useDealerOrders from "../hooks/useDealerOrders"


const DealerOrderScreen = () =>{
    const {error, loading, dealerOrders, fetchDealerOrders} = useDealerOrders()

    console.log(dealerOrders)

    return <CustomerOrder orders={dealerOrders} fetchDealerOrders={fetchDealerOrders}/>}


export default DealerOrderScreen