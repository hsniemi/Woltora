import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';
import styles from './Styles/Restaurant.module.css';
import {Link} from 'react-router-dom';
import Constants from '../Constants.json'

export default function MenuView(props) {
    const [menus, setMenus] = useState([]);
    const {restaurant_id} = useParams();

    useEffect(() =>{
        const getMenus = async (req, res) => {
            try{
                const response = await axios.get(Constants.API_ADDRESS + `/menu/${restaurant_id}`);
                console.log(response.data);
                setMenus(response.data);
            }catch(err){
                console.log(err.message);
            }   
        }
        getMenus();
    },[])

    return (
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
            <div className={styles.display} >
                {
                   menus.map(menu => <Menu key={menu.menu_id} menu={menu}/>) 
                }
            </div>
        </div>
    )
}