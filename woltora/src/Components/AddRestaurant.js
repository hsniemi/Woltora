import React from 'react'
import styles from './Owner.module.css';

export default function AddRestaurant() {
    return (
        <div>
            <div>
                <h1>Add Restaurant</h1>
            </div>
            <div className={styles.restaurantInfo}>
                <form method="post">
                    <div className={styles.textField}>
                        <div><label>Name: </label></div>
                        <div><input type="text" name="RestaurantName" placeholder="Name of the restaurant" required/></div>    
                    </div>
                    <div className={styles.textField}>
                        <div><label>Address: </label></div>
                        <div><input type="text" name="RestaurantAddress" placeholder="Address of the restaurant" required/></div>
                    </div>
                    <div className={styles.textField}>
                        <div><label>Operating hours: </label></div>
                        <div><input type="text" name="OperatingHours" placeholder="hh.mm-hh.mm" required/></div>
                    </div>
                    <div className={styles.textField}>
                        <div><label>Type: </label></div>
                        <div><ul></ul></div>
                    </div> 
                    <div className={styles.textField}>
                        <div><label>Price level: </label></div>
                        <div><ul></ul></div>
                    </div>
                    <div className={styles.textField}>
                        <div><label>Image: </label></div>
                        <div><input type="File"/></div>
                    </div>             
                </form>
            </div>           
            
        </div>
    )
}
