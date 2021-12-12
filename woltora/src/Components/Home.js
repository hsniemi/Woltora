import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import RestaurantList from './RestaurantList'
import styles from './Styles/home.module.css';


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
        <div className={styles.homeLogin}>
          <div>
            <Link to="/"><div>Home</div></Link>
          </div>
          <div>
            <Link to="/customer"><div>My account</div></Link>
          </div>
          <div>
            <Link to="/Login"><div>Login/Register</div></Link>
          </div>
          <div>
          {props.userLoggedIn ? "Logged In" : "Logged Out"}
          </div>
        </div>
        <div className={styles.shoppingcartLink}>
          {props.userLoggedIn ? 
            <Link to="/Shoppingcart">Go to shopping cart</Link>
            :
            <></>
          }
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
