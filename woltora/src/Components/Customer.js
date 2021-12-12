import React, {useState, useEffect, useContext} from 'react'
import styles from './Styles/Customer.module.css';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

export default function Customer(props) {
    console.log(props.user_id);
    const {customer_id} = props;
    const [ongoingOrder, setOngoingOrder] = useState();
    let navigate = useNavigate();
    
    useEffect(() =>{
        const getLatestOrders = async() =>{
            console.log({customer_id});
            try {
                const response = await axios.get(`http://localhost:4000/customer/${customer_id}`);
                console.log(response.data);
                setOngoingOrder(response.data.filter(order => order.status !== 'Closed' && order.status !== 'Received'));
            } catch (err) {
                console.error(err.message);
            }
        }
        getLatestOrders();
    },[])

    const handleReceived = (order) => {
        markOrderReceived(order.order_id);
    }

    const markOrderReceived = async (id) => {
        console.log(id);
        try {
            const response = await axios.put(`http://localhost:4000/customer/receivedorder/${id}`);
            console.log(response);
            setOngoingOrder(ongoingOrder.filter(order => order.order_id !== id));
        } catch (err) {
            console.error(err.message);        
        }
    }

    const handleViewHistory = (event) => {
        event.preventDefault();
        navigate('/customer/orderhistory');
    }

    return (
           <div>
            <div className={styles.customerHeader}>
            <div className={styles.customerPage}>
                    <h1>Customer Page</h1>
                    <div><Link to="/">Home</Link></div>
                </div>
                <h3>Hello, user</h3>   
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
                                <button onClick={() => handleReceived(order)}>Mark as received</button>
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
