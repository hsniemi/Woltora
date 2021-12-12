import React, {useState, useEffect} from 'react'
import styles from './Styles/Customer.module.css';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';

export default function Customer(props) {
    const decodedToken = jwt.decode(props.jwt);
    const customerId = decodedToken.user.user_id;

    const [ongoingOrder, setOngoingOrder] = useState([]);
    let navigate = useNavigate();
    
    useEffect(() =>{
        const getLatestOrders = async() =>{
            try {
                const response = await axios.get(`http://localhost:4000/customer/${customerId}`);
                console.log(response);
                setOngoingOrder(response.data);
            } catch (err) {
                console.error(err.message);
            }
        }
        getLatestOrders();
    },[])

    const handleReceived = (order_id) => {
        markOrderReceived(order_id);
    }

    const markOrderReceived = async (id) => {
        console.log(id);
        try {
            const response = await axios.put(`http://localhost:4000/customer/receivedorder/${id}`);
            console.log(response);
        } catch (err) {
            console.error(err.message);        
        }
    }

    const handleViewHistory = (event) => {
        navigate('/customer/orderhistory');
    }

    return (
           <div>
            <div className={styles.customerHeader}>
                <div className={styles.customerPage}>
                    <h1>Customer Page</h1>
                    <div><Link to="/">Home</Link></div>
                </div>
                <h3>Hello, {decodedToken.user.fname}</h3>   
            </div>
            <div className={styles.latestOrder}>
                {ongoingOrder &&
                ongoingOrder.map((order) =>{
                    return(
                        <div key={order.order_id}className={styles.orderItem}>
                           <div>Date: {order.date}</div>
                           <div>{order.total_price} €</div>
                           <div className={styles.status}>Order status: {order.status}</div>
                           <div className={styles.status}>Estimated time of arrival: {order.eta}</div>
                           {order.status === "Delivering" ? 
                                <button onClick={() => handleReceived(order.order_id)}>Mark as received</button>
                                :
                                <>
                                </>
                            }
                           
                        </div>
                    )
                })}
            </div>
            <button onClick={handleViewHistory} className={styles.orderHistory}>View order history</button>
        </div>
    )
}
