import React from 'react'
import Restaurant from './Restaurant';
import styles from './Styles/Restaurant.module.css';

export default function RestaurantList(props) {

    return (
        <div>
            <div className={styles.display} >
                {
                   props.restaurants.map(restaurant => <Restaurant key={restaurant.restaurant_id}{...restaurant}/>) 
                }
            </div>
        </div>
    )
}