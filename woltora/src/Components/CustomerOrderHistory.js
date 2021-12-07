import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function CustomerOrderHistory(props) {
    const [orders, setOrders] = useState([]);
    const {customer_id} = props;
    let navigate = useNavigate();

    useEffect(() =>{
        const getOrders = async() =>{
            console.log({customer_id});
            try {
                const response = await axios.get(`http://localhost:4000/customerhistory/${customer_id}`);
                console.log(response);
                setOrders(response.data);
            } catch (err) {
                console.error(err.message);
            }
        }
        getOrders();
    },[])

    const handleClick = (event) => {
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
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders &&
                    orders.map((order) => {
                        return(
                            <tr key={order.order_id}>
                                <td>{order.date}</td>
                                <td>{order.total_price}</td>
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
