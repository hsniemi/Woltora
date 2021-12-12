import React, {useState, useContext } from 'react'
import {OrderContext} from '../Context/OrderContext';
import styles from './Styles/Shoppingcart.module.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Shoppingcart(props) {
  console.log(props.customer_id);

  const [payment, setPayment] = useState("Credit card");
  const [deliveryAddress, setDeliveryAddress] = useState("");


  const {cartItems, setCartItems, addCartItems, removeCartItems} = useContext(OrderContext);
  const itemsPrice = cartItems.reduce((prev, curr) => prev + curr.price * curr.qty, 0);

  const handleSendOrder = (event) => {
    event.preventDefault();
    sendOrder();
  }

  const sendOrder = async () => {
    try {
      const response = await axios.post('http://localhost:4000/shoppingcart', {
        user_id: props.customer_id,
        total_price: itemsPrice,
        status: "Waiting",
        delivery_address: deliveryAddress,
        payment_method: payment
      },
      {headers: {
        'Content-Type': 'application/json'
    }})
      console.log(response);
      sendMenuOrder(response.data.order_id);
    } catch (err) {
      console.error(err);
    }
  }

  const sendMenuOrder =  (orderId) => {
    cartItems.forEach(async (item) => {
      try {
        const response = await axios.post('http://localhost:4000/shoppingcart/menuorder', {
          menu_id: item.menu_id,
          order_id: orderId
        })
        console.log(response);
        setPayment("Credit card");
        setDeliveryAddress("");
        setCartItems([]);
      } catch (err) {
        console.error(err.message);
      }
    });
  }

  const handleAddress = (event) => {
    setDeliveryAddress(event.target.value);
  }

  const handleChange = (event) => {
    setPayment(event.target.value);
  };

    return (
      <div className={styles.container}>
        <div className={styles.linkHeader}>
          <h1 className={styles.shoppingHeader}>Shopping cart</h1>
          <div><Link to="/">Home</Link></div>
        </div>
        <div>{cartItems.length === 0 && <p>Shopping cart is empty.</p>}</div>
        {cartItems.map((item) => (
          <div key={item.menu_id} className="row">
            <div className="col-2" width="10%">{item.name}</div>
            <div className="col-2" width="10%">
              <button onClick={()=>addCartItems(item)} >+</button>
              <button onClick={()=>removeCartItems(item)} >-</button>
            </div>
            <div className="col-2" width="10%">{item.qty} x {item.price}€</div>
          </div>
        ))}
        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className={styles.total}>
              <div className="col-2">Total</div>
              <div className="col-1">{itemsPrice}€</div>
            </div>
            <div className={styles.address}>
                <div><label>Delivery address </label></div>
                  <input
                    type="text" 
                    name="deliveryAddress" 
                    value= {deliveryAddress}
                    required
                    onChange={ handleAddress }/>
            </div>
            <div className={styles.order}>
              <select
                name="payment" 
                value= {payment}
                required
                onChange= {handleChange}>
                <option>Credit card</option>
                <option>Google Pay</option>
                <option>Apple Pay</option>
              </select>
              <button onClick={handleSendOrder}>Send order</button>
            </div>
          </>
        )}
      </div>
)
}
