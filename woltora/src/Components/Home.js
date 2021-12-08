import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import RestaurantList from './RestaurantList'
import styles from './Styles/Home.module.css';


export default function Home(props) {
  const [searchFieldString, setSearchFieldString] = useState("");
  const {restaurants} = props;


  const onSearchFieldChange = (event) => {
    console.log(event.target.value);
    setSearchFieldString(event.target.value);
  }

  return(
    <div>
      <div className={styles.headerContainer}>
        <div>
          <h2>Woltora</h2>
          <p> Welcome to Woltora! Find the best restaurants near you.</p>
        </div>
        <div>
          <Link to="/Shoppingcart">Go to shopping cart</Link>
        </div>
      </div>
      <div className={styles.searchBar}>
        <input type="text" id="searchField" onChange={onSearchFieldChange} value={searchFieldString} placeholder="Search for restaurants" ></input>
      </div>
      <div>
        <RestaurantList restaurants={restaurants.filter(restaurant => restaurant.name.toUpperCase().includes(searchFieldString.toUpperCase()))}/>
      </div>
    </div>
    )

}   
