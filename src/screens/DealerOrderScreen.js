import useDealerOrders from "../hooks/useDealerOrders"


const DealerOrderScreen = () =>{
    const {error, loading, dealerOrders} = useDealerOrders()

    console.log(dealerOrders)

    return<div>DealerOrderScreen</div>
}


export default DealerOrderScreen