import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Owner.module.css';

export default function Owner(props) {

  const ownerId = 3;

  const ownerRestaurants = props.restaurants.filter(restaurant => restaurant.OwnerId === ownerId);

  if(ownerRestaurants.length < 1) {
    console.log(ownerRestaurants);
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
        <div>
          <div className={styles.ownerAddRestaurant}>
            <div>
              {ownerRestaurants.map(restaurant => 
              <div>{restaurant.Name}</div>
              )}
            </div>
            <Link to="addrestaurant"><div><button>Add restaurant</button></div></Link>
          </div>
        </div>
      </div>
    )
  }
}