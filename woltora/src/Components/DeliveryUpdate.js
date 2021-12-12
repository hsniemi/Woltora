import React, {useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './Styles/Restaurant.module.css';

export default function DeliveryUpdate() {
    const {restaurant_id} = useParams();
    const {restaurant_name} = useParams();
    const {order_id} = useParams();
    const [eta, setEta] = useState("");
    const [orderStatus, setOrderStatus] = useState("Select status");
    const navigate = useNavigate();


    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        if(orderStatus === "Select status"){return}
        try {
            const response = await axios.put('http://localhost:4000/updatestatus', {
                status: orderStatus,
                eta: eta,
                order_id: order_id
            });
            console.log(response);
            setEta("");
            setOrderStatus("Select status");  
          } catch (err) {
              console.error(err);
          }
    }
    
     const handleChangeEta = (event) =>{
        setEta(event.target.value);
        console.log(event.target.value);
    }

    const handleChangeStatus = (event) =>{
        console.log(event.target.value);
        setOrderStatus(event.target.value);
    }

    const handleClick = (event) =>{
        event.preventDefault();
        navigate(`/owner/${restaurant_id}/${restaurant_name}`)
    }

    return (
    <div className={styles.updates}>
        <div>
            <button type="button" onClick={handleClick}>Back to orders</button>
        </div>
        <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Update Status</th>
                    <th>Estimated time of arrival</th>
                </tr>
            </thead>
            <tbody>          
                <td>
                    <select
                        name="orderStatus"
                        value= {orderStatus}
                        required
                        onChange= {handleChangeStatus}
                        >
                        <option>Select status</option>
                        <option>Preparing</option>
                        <option>Ready for delivery</option>
                        <option>Delivering</option>
                        <option>Delivered</option>
                    </select>
                </td>
                <td>
                    <input 
                        type="time"
                        name="eta" 
                        value={eta} 
                        required
                        onChange={handleChangeEta} 
                        >
                    </input>
                </td>
                <td>
                    <button onClick={handleUpdateStatus}>Update status</button>
                </td>
            </tbody>
        </table>
        </div>
    </div>
    )
}
