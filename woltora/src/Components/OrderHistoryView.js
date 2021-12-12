import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import styles from './Styles/Restaurant.module.css';

export default function OrderHistoryView(props) {
    const [closedOrders, setClosedOrders] = useState([]);

    let navigate = useNavigate();
    const {restaurant_name} = useParams();
    const {restaurant_id} = useParams();

    useEffect(() => {
        const getOrders = async () =>{
            try {
                const response = await axios.get(`http://localhost:4000/owner/${restaurant_id}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + props.jwt
                    }
                })
                console.log(response);
                setClosedOrders(response.data.data.orders.filter(order => order.status === 'Closed'));
             
            } catch (error) {
                console.error(error.message);
            }
        }
      getOrders();
    },[]);

    const handleClick = (event) => {
        event.preventDefault();
        navigate('/owner');
    }
    const handleBackToOrders = (event) =>{
        event.preventDefault();
        navigate(`/owner/${restaurant_id}/${restaurant_name}`)
    }

    return (
        <div>
            <div className={styles.buttons}>
                <button onClick={handleClick}>Back to main page</button>
                <button onClick={handleBackToOrders}>Back to orders</button>
            </div>
            <h1>Order history for {restaurant_name}</h1>
            <div >
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Order Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Customer Id</th>
                            <th scope="col">Order Id</th>   
                        </tr>
                    </thead>
                    <tbody>
                        {closedOrders &&
                        closedOrders.map((order) => {
                            return(
                                <tr key={order.order_id}>
                                    <td>{order.date}</td>
                                    <td>{order.total_price} €</td>
                                    <td>{order.status}</td>
                                    <td>{order.user_id}</td>
                                    <td>{order.order_id}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )

}