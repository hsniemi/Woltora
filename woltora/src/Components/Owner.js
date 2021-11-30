import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Styles/Owner.module.css';
import axios from 'axios';
export default function Owner(props) {
  console.log("Owner component");
  console.log(props.owner_id);

  const ownerRestaurants = props.restaurants.filter(restaurant => restaurant.owner_id === props.owner_id);
  

  if(ownerRestaurants.length < 1) {
    return (
      <div>
      <div className={styles.ownerHeader}>
        <div>Restaurant manager page</div>
        <div>Hello, user</div>
      </div>
      <div>
        <div className={styles.ownerAddRestaurant}>
          <div>You have no restaurants</div>
          <Link to="addrestaurant"><div><button>Add restaurant</button></div></Link>
        </div>
      </div>
    </div>
    )
  }
  else {
    console.log(ownerRestaurants);
    return (
      <div>
        <div className={styles.ownerHeader}>
          <div>Restaurant manager page</div>
          <div>Hello, user</div>
        </div>
        <div >
            <div >
              {ownerRestaurants.map((restaurant, index) => 
              <div className={styles.restaurants} key={index}>
                <div >
                  <img
                    src={restaurant.image}
                    style={{height: '100%'}} 
                  />
                </div>
                  <div className={styles.restaurantItemContainer}>
                  <div className={styles.restaurantItem}>{restaurant.name}</div>
                  <div className={styles.restaurantItem}>{restaurant.address}</div>
                  <div className={styles.restaurantItem}>Open: {restaurant.operating_hours}</div>
                </div>
              </div>
              )}
            </div>
          <Link to="addrestaurant"><div className={styles.button}><button>Add restaurant</button></div></Link>
        </div>
      </div>
    )
  }
}