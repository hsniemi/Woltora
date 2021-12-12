import React from 'react'
import {useNavigate} from 'react-router-dom';
import styles from './Styles/Restaurant.module.css';

export default function Restaurant(props) {
    let navigate = useNavigate();


    const handleViewMenu = (id) => {
        navigate(`/menu/${id}`);
    }

    return (
        <div>
            <div className={styles.container}>
                <div>
                    <img
                        src={props.image}
                        alt="restaurantImage"
                        height="300px"
                    />
                </div>
                <div className={styles.name}>
                    {props.name}
                </div>
                <div>
                    {props.type}
                </div>
                <div>
                    Price Level: {props.price_level}
                </div>
                <div>
                    {props.address}
                </div>
                <div>
                    Open: {props.operating_hours}
                </div>
            </div>
            <div>
                <button onClick={() => handleViewMenu(props.restaurant_id)}>View menu</button>
            </div>
        </div>
    )
}
