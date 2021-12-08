import React, {useState, createContext} from 'react';


export const OrderContext = createContext();

export const OrderContextProvider = props => {

    const [cartItems, setCartItems] = useState([]);

    const addCartItems = (menu) => {
        const existingMenu = cartItems.find((item) => item.menu_id === menu.menu_id);
        if (existingMenu) {
            setCartItems(
                cartItems.map((item) =>
                item.menu_id === menu.menu_id ? {...existingMenu, qty: existingMenu.qty + 1} : item
                )
            );
        } else {
            setCartItems([...cartItems, {...menu, qty: 1}]);
        }
    };

    const removeCartItems = (menu) => {
        const existingMenu = cartItems.find((item) => item.menu_id === menu.menu_id);
        if(existingMenu.qty === 1) {
            setCartItems(cartItems.filter((item) => item.menu_id !== menu.menu_id));
        } else{
            setCartItems(
                cartItems.map((item) =>
                item.menu_id === menu.menu_id ? {...existingMenu, qty: existingMenu.qty - 1} : item
                )
            );
        }
    }
    
    return (
        <OrderContext.Provider value={{cartItems, setCartItems, addCartItems, removeCartItems}}>
            {props.children}
        </OrderContext.Provider>
    )
}