import React, {useState, useEffect} from 'react'
import styles from './Styles/Customer.module.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

export default function Customer(props) {
    console.log(props.customer_id);
    const {customer_id} = props;
    const [ongoingOrder, setOngoingOrder] = useState([]);
    let navigate = useNavigate();
    
    useEffect(() =>{
        const getLatestOrders = async() =>{
            console.log({customer_id});
            try {
                const response = await axios.get(`http://localhost:4000/customer/${customer_id}`);
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
                <h1>Customer Page</h1>
                <h3>Hello, user</h3>   
            </div>
            <div className={styles.latestOrder}>
                {ongoingOrder &&
                ongoingOrder.map((order) =>{
                    return(
                        <div key={order.order_id}className={styles.orderItem}>
                           <div>Date: {order.date}</div>
                           <div>{order.total_price}</div>
                           <div className={styles.status}>Order status: {order.status}</div>
                           <button onClick={() => handleReceived(order.order_id)}>Mark as received</button>
                        </div>
                    )
                })}
            </div>
            <button onClick={handleViewHistory} className={styles.orderHistory}>View order history</button>
        </div>
    )
}
