import React, { useContext } from 'react'
import {OrderContext} from '../Context/OrderContext';


export default function Menu(props) {
    const {addCartItems} = useContext(OrderContext);
    const {menu} = props;

    const handleAddToCart = (menu) => {
        console.log(menu);
        addCartItems(menu);
    }

    return (
        <div>
            <div>
                <div>
                    <img
                        src={menu.image}
                        alt="menuImage"
                        height="300px"
                    />
                </div>
                <div>
                    {menu.name}
                </div>
                <div>
                    {menu.description}
                </div>
                <div>
                    {menu.price}
                </div>
                <div>
                    {menu.category}
                </div>
            </div>
            <div>
                <button onClick={() => handleAddToCart(menu)}>Add to cart</button>
            </div>
        </div>
    )
}