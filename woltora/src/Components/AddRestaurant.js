import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import styles from './Styles/Owner.module.css';

export default function AddRestaurant(props) {

    const addRestaurant = (event) =>  {
        event.preventDefault();
        props.addRestaurant(state.newRestaurantName, state.newRestaurantAddress, state.newRestaurantHoursFrom, 
        state.newRestaurantHoursTo, state.newRestaurantType, state.newRestaurantPriceLevel, state.newRestaurantImage);
   }

    const [state, setState] = useState({
        newRestaurantName: "",
        newRestaurantAddress: "",
        newRestaurantHoursFrom: "",
        newRestaurantHoursTo:"",
        newRestaurantType: "",
        newRestaurantPriceLevel: "",
        newRestaurantImage: ""
    });

    function handleChange(event) {
        const value = event.target.value;
        setState({
        ...state,
        [event.target.name]: value
        });
        console.log(value);
    }

    function handleImageChange(event) {
        setState({
            newRestaurantImage: event.target.files[0]
        })
    }

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
                            <div className={styles.inputField}><input type="text" name="newRestaurantName" value={state.newRestaurantName} placeholder="Name of the restaurant" required 
                            onChange={ handleChange }/></div>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Address: </label></div>
                            <div className={styles.inputField}><input type="text" name="newRestaurantAddress" value={state.newRestaurantAddress} placeholder="Address of the restaurant" required 
                            onChange={ handleChange }/></div>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Operating hours: </label></div>
                            <div className={styles.inputField}>from <input type="time" name="newRestaurantHoursFrom" value={state.newRestaurantHoursFrom} required 
                            onChange={ handleChange }/>to <input type="time" name="newRestaurantHoursTo" value={state.newRestaurantHoursTo} onChange={ handleChange }/></div>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Type: </label></div>
                                <select name="newRestaurantType" value={state.newRestaurantType} onChange= {handleChange }>
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
                                <select name="newRestaurantPriceLevel" value={state.newRestaurantPriceLevel} onChange={ handleChange }>
                                    <option>No selection</option>
                                    <option>€</option>
                                    <option>€€</option>
                                    <option>€€€</option>
                                    <option>€€€€</option>
                                </select>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Image: </label></div>
                            <div><input type="File" onChange={ handleImageChange }/></div>
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
