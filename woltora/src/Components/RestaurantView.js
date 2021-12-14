import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Constants from '../Constants.json'

export default function RestaurantView(props) {
    const decodedToken = jwt.decode(props.jwt);
    console.log(decodedToken);
    const [activeOrders, setActiveOrders] = useState([]);
    const {restaurant_name} = useParams();
    const {restaurant_id} = useParams();
    let navigate = useNavigate();
 
    useEffect(() => {
        const getOrders = async () =>{
            try {
                const response = await axios.get(Constants.API_ADDRESS +`/owner/${restaurant_id}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + props.jwt
                    }
                })
                console.log(response);
                setActiveOrders(response.data.data.orders.filter(order => order.status !== 'Closed'));
                console.log(activeOrders);
             
            } catch (error) {
                console.error(error.message);
            }
        }
      getOrders();
    },[restaurant_id]); 

    const handleClick = (event) =>{
        event.preventDefault();
        navigate('/owner');
    }

    const handleOrderHistoryClick = (event) =>{
        event.preventDefault();
        navigate(`/owner/orderhistory/${restaurant_name}/${restaurant_id}`);
    }
    const [state, setState] = useState({
        status: "",
        eta: ""
    });

    const handleChange = (event) => {
        const value = event.target.value;
        setState({
        ...state,
        [event.target.name]: value
        });
    };

    const handleCloseOrder = async (id) =>{
        try {
            const response = await axios.put(Constants.API_ADDRESS +'/closeorder', {
                status: "Closed",
                order_id: id
            },
            {
            headers: {
                'Authorization': 'Bearer ' + props.jwt
            }
            });
            setActiveOrders(activeOrders.filter(order => order.order_id !== id));
            console.log(response);
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleUpdateStatus = (order_id) =>{
        navigate(`/deliveryupdate/${restaurant_id}/${restaurant_name}/${order_id}`);
    }

    return (
        <div>
            <button onClick={handleClick}>Back to main paige</button>
            <h1>Orders for {restaurant_name}</h1>
            <div >
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Delivery address</th>
                            <th scope="col">Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeOrders &&
                        activeOrders.map((order, i) => {
                            return(
                                <tr key={i}>
                                    <td>{order.order_id}</td>
                                    <td>{order.date}</td>
                                    <td>{order.name}</td>
                                    <td>{order.price} €</td>
                                    <td>{order.status}</td>
                                    <td>{order.delivery_address}</td>
                                    {order.status === "Received" ? 
                                        <td><button onClick={() => handleCloseOrder(order.order_id)}>Close order</button></td>
                                        :
                                        <>
                                            <td>
                                                <button onClick={() => handleUpdateStatus(order.order_id)}>Update order status</button>
                                            </td>
                                        </>
                                    }    
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={handleOrderHistoryClick}>View order history</button>
            </div>

        </div>
    )
}
