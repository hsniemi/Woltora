import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Styles/Owner.module.css';

export default function Owner(props) {
  console.log("Owner component");
  console.log(props.ownerId);

  const ownerRestaurants = props.restaurants.filter(restaurant => restaurant.OwnerId === props.ownerId);

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