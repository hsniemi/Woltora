import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Constants from '../Constants.json'

export default function CustomerOrderHistory(props) {
    const decodedToken = jwt.decode(props.jwt);
    const customer_id = decodedToken.user.id;
    const [orders, setOrders] = useState([]);
    let navigate = useNavigate();

    useEffect(() =>{
        const getOrders = async() =>{
            console.log({customer_id});
            try {
                const response = await axios.get(`/customerhistory/${customer_id}`, 
                {
                    headers: {
                        'Authorization': 'Bearer ' + props.jwt
                    }
                });
                console.log(response);
                setOrders(response.data);
            } catch (err) {
                console.error(err.message);
            }
        }
        getOrders();
    },[])

    const handleClick = (event) => {
        event.preventDefault();
        navigate('/customer');
    }

    return (
        <div>
        <button onClick={handleClick}>Back to main page</button>
        <h1>Order history</h1>
        <div >
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Order Id</th>
                        <th scope="col">Price</th>
                        <th scope="col">Product</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders &&
                    orders.map((order, i) => {
                        return(
                            <tr key={i}>
                                <td>{order.date}</td>
                                <td>{order.order_id}</td>
                                <td>{order.price} €</td>
                                <td>{order.name}</td>
                                <td>{order.status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    )
}
