import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';



export default function RestaurantView(props) {
    const [activeOrders, setActiveOrders] = useState([]);

    const {restaurant_name} = useParams();
    const {restaurant_id} = useParams();
    let navigate = useNavigate();
 
    useEffect(() => {
        const getOrders = async () =>{
            try {
                const response = await axios.get(`http://localhost:4000/owner/${restaurant_id}`)
                console.log(response);
                setActiveOrders(response.data.data.orders.filter(order => order.status !== 'Closed'));
             
            } catch (error) {
                console.error(error.message);
            }
        }
      getOrders();
    },[]); 

    const handleClick = (event) =>{
        navigate('/owner');
    }

    const handleOrderHistoryClick = (event) =>{
        navigate(`/owner/orderhistory/${restaurant_name}/${restaurant_id}`);
    }

    return (
        <div>
            <button onClick={handleClick}>Back to main paige</button>
            <h1>Orders for {restaurant_name}</h1>
            <div >
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Customer address</th>
                            <th scope="col">Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeOrders &&
                        activeOrders.map((order) => {
                            return(
                                <tr key={order.order_id}>
                                    <td>{order.date}</td>
                                    <td>{order.total_price}</td>
                                    <td>{order.status}</td>
                                    <td>{order.customer_address}</td>
                                    <td><button>Update Status</button></td>
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
