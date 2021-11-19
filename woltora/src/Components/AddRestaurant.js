import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import styles from './Styles/Owner.module.css';

export default function AddRestaurant(props) {

    const [newRestaurantName, setNewRestaurantName] = useState("");
    const [newRestaurantAddress, setNewRestaurantAddress] = useState("");
    const [newRestaurantHoursFrom, setNewRestaurantHoursFrom] = useState("");
    const [newRestaurantHoursTo, setNewRestaurantHoursTo] = useState("");
    const [newRestaurantType, setNewRestaurantType] = useState("");
    const [newRestaurantPriceLevel, setNewRestaurantPriceLevel] = useState("");
    const [newRestaurantImage, setNewRestaurantImage] = useState("");

    const addRestaurant = (event) =>  {
        event.preventDefault();
        props.addRestaurant(newRestaurantName, newRestaurantAddress, newRestaurantHoursFrom, 
        newRestaurantHoursTo, newRestaurantType, newRestaurantPriceLevel, newRestaurantImage);
   }

    // const [state, setState] = useState({
    //     newRestaurantName: "",
    //     newRestaurantAddress: "",
    //     newRestaurantHoursFrom: "",
    //     newRestaurantHoursTo:"",
    //     newRestaurantType: "",
    //     newRestaurantPriceLevel: "",
    //     newRestaurantImage: ""
    // });

    // function handleChange(event) {
    //     const value = event.target.value;
    //     setState({
    //     ...state,
    //     [event.target.name]: value
    //     });
    //     console.log(value);
    // }

    // function handleImageChange(event) {
    //     setState({
    //         newRestaurantImage: event.target.files[0]
    //     })
    // }

        return(
            <div>
                <div>
                    <h1>Add Restaurant</h1>
                </div>
                <div className={styles.restaurantInfoContainer}>
                <div className={styles.restaurantInfo}>
                    <form onSubmit={addRestaurant}>
                        <div className={styles.textField}>
                            <div><label>Name: </label></div>
                            <div className={styles.inputField}><input type="text" name="newRestaurantName" placeholder="Name of the restaurant" required 
                            onChange={ event => setNewRestaurantName(event.target.value) }/></div>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Address: </label></div>
                            <div className={styles.inputField}><input type="text" name="newRestaurantAddress" placeholder="Address of the restaurant" required 
                            onChange={ event => setNewRestaurantAddress(event.target.value) }/></div>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Operating hours: </label></div>
                            <div className={styles.inputField}>from <input type="time" name="newRestaurantHoursFrom" required 
                            onChange={ event => setNewRestaurantHoursFrom(event.target.value) }/>to <input type="time" name="newRestaurantHoursTo" onChange={ event => setNewRestaurantHoursTo(event.target.value) }/></div>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Type: </label></div>
                                <select name="newRestaurantType" onChange= { event => setNewRestaurantType(event.target.value) }>
                                    <option>No selection</option>
                                    <option>Buffet</option>
                                    <option>Fast food</option>
                                    <option>Fast casual</option>
                                    <option>Casual dining</option>
                                    <option>Fine dining</option>
                                </select>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Price level: </label></div>
                                <select name="newRestaurantPriceLevel" onChange={ event => setNewRestaurantPriceLevel(event.target.value)}>
                                    <option>No selection</option>
                                    <option>€</option>
                                    <option>€€</option>
                                    <option>€€€</option>
                                    <option>€€€€</option>
                                </select>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Image: </label></div>
                            <div><input type="File" name="newRestaurantImage" onChange={ event => setNewRestaurantImage(event.target.files[0]) }/></div>
                        </div>
                        <div className={styles.textField}>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    <div className={styles.addMenuLink}>
                    <Link to="addMenu">Create new menu</Link> 
                    </div>
                </div>  
                </div>              
            </div>
        )
}
