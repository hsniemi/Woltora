import React, {useState, useEffect} from 'react'
import styles from './Styles/Customer.module.css';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Constants from '../Constants.json'

export default function Customer(props) {
    const decodedToken = jwt.decode(props.jwt);
    console.log(decodedToken);
    
    const customer_id = decodedToken.user.id;

    const [ongoingOrder, setOngoingOrder] = useState([]);
    let navigate = useNavigate();
    
    useEffect(() =>{
        const getLatestOrders = async() =>{
            console.log("get orders: " + customer_id);
            try {
                const response = await axios.get(Constants.API_ADRESS +`/customer/${customer_id}`, 
                {
                    headers: {
                        'Authorization': 'Bearer ' + props.jwt
                    }
                });
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
            const response = await axios.put(Constants.API_ADRESS +`/customer/receivedorder/${id}`, null, 
            {
                headers: {
                    'Authorization': 'Bearer ' + props.jwt
                }
            });
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
                <div className={styles.customerLogout}>
                    <button onClick={props.logout}>Logout</button>
                    <h3>Hello, {decodedToken.user.fname}</h3>  
                </div> 
            </div>
            <div className={styles.latestOrder}>
                {ongoingOrder &&
                ongoingOrder.map((order, index) =>{
                    return(
                        <div key={index}className={styles.orderItem}>
                           <div>Date: {order.date}</div>
                           <div>Order Id: {order.order_id} €</div>
                           <div>{order.name} €</div>
                           <div>{order.price} €</div>
                           <div className={styles.status}>Order status: {order.status}</div>
                           <div className={styles.status}>Estimated time of arrival: {order.eta}</div>
                           {order.status === "Delivered" ? 
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
