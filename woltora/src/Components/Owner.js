import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import styles from './Styles/Owner.module.css';
import {useNavigate} from 'react-router-dom';
import RestaurantView from './RestaurantView';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export default function Owner(props) {
  const decodedToken = jwt.decode(props.jwt);
  console.log(decodedToken);

  const [restaurants, setRestaurants] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const getRestaurants = async () =>{
        try {
            const response = await axios.get(`http://localhost:4000`)
            console.log(response);
            setRestaurants(response.data.filter(restaurant => restaurant.user_id === decodedToken.user.id));
         
        } catch (error) {
            console.error(error.message);
        }
    }
  getRestaurants();
},[]);

  const handleClick = (event) => {
    navigate('/owner/addrestaurant');
  }
  const handleMenuClick = (id) => {
    props.addRestaurantId(id);
    navigate('/owner/addrestaurant/addmenu');
  }

  if(restaurants.length < 1) {
    return (
      <div>
      <div className={styles.ownerHeader}>
        <div>Restaurant manager page</div>
        <div>Hello, {decodedToken.user.fname}</div>
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
    console.log(restaurants);
    return (
      <div>
        <div className={styles.ownerHeader}>
          <div>Restaurant manager page</div>
          <div>Hello, {decodedToken.user.fname}</div>
        </div>
        <div className={styles.restaurantContainer}>
            <div >
              {restaurants.map((restaurant) => 
              <div className={styles.restaurants} key={restaurant.restaurant_id}>
                <div >
                  <img
                    src={restaurant.image}
                    alt="ownerRestaurant"
                    style={{height: '100%'}} 
                  />
                </div>
                <div className={styles.restaurantItemContainer}>
                  <div className={styles.restaurantItem}>{restaurant.name}</div>
                  <div className={styles.restaurantItem}>{restaurant.address}</div>
                  <div className={styles.restaurantItem}>Open: {restaurant.operating_hours}</div>
                  <Link to={restaurant.restaurant_id+'/'+restaurant.name} className={styles.restaurantItem}><div >View</div></Link>
                  <button  className={styles.restaurantItem} onClick={() => handleMenuClick(restaurant.restaurant_id)}>Add Menu</button>
                </div>
              </div>
              )}
            </div>
          <div className={styles.button}><button onClick={handleClick}>Add restaurant</button></div>
        </div>
      </div>
    )
  }
}