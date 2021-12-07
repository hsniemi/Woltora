import React, {useState, createContext} from 'react';


export const OrderContext = createContext();

export const OrderContextProvider = props => {

    const [orders, setOrders] = useState([]);
    
    return (
        <OrderContext.Provider value={{orders, setOrders}}>
            {props.children}
        </OrderContext.Provider>
    )
}