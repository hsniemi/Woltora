import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import styles from './Styles/Owner.module.css';
import axios from 'axios';

export default function AddRestaurant(props) {

    const [state, setState] = useState({
        newRestaurantName: "",
        newRestaurantAddress: "",
        newRestaurantHoursFrom: "",
        newRestaurantHoursTo:"",
        newRestaurantType: "",
        newRestaurantPriceLevel: ""
    });
    const [previewSource, setPreviewSource] = useState("");
    const [fileInputState, setFileInputState] = useState("");
  
    const handleImageChange = (e) => {
        previewFile(e.target.files[0]);
        setFileInputState(e.target.value);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource);
        };

        const uploadImage = async (file) => {
            var img_url = "";
            const data = {data: file};
            try {
                await axios.post('http://localhost:4000/owner/addrestaurant/image', data)
                .then(response => img_url = response.data);
                uploadData(state.newRestaurantName, state.newRestaurantAddress, state.newRestaurantHoursFrom, state.newRestaurantHoursTo, 
                    state.newRestaurantType, state.newRestaurantPriceLevel, img_url);
            } catch (err) {
                console.error(err);
            }
        };

        const uploadData = async (name, address, hours_from, hours_to, type, price_level, img_url) => {
            const operating_hours = hours_from + "-" + hours_to;
            try {
                await axios.post('http://localhost:4000/owner/addrestaurant/data', {
                    name: name,
                    address: address,
                    operating_hours: operating_hours,
                    type: type,
                    price_level: price_level,
                    owner_id: props.ownerId,
                    image: img_url
                }, 
                {headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => addRestaurant(response.data.restaurant_id));  
                setFileInputState('');
                setPreviewSource('');
                setState({
                    newRestaurantName: "",
                    newRestaurantAddress: "",
                    newRestaurantHoursFrom: "",
                    newRestaurantHoursTo:"",
                    newRestaurantType: "",
                    newRestaurantPriceLevel: ""
                })
            } catch (err) {
                console.error(err);
            }
        };

    const handleChange = (event) => {
        const value = event.target.value;
        setState({
        ...state,
        [event.target.name]: value
        });
        console.log(value);
    }

   

    const addRestaurant = (restaurantId) =>  {
        console.log(restaurantId);
        props.addRestaurant(restaurantId);
   }


        return(
            <div>
                <div>
                    <h1>Add Restaurant</h1>
                </div>
                <div className={styles.restaurantInfoContainer}>
                <div className={styles.previewImage}>
                        {previewSource && (
                            <img
                                src={previewSource}
                                alt="chosen"
                                style={{height: '150px'}} />
                        )}
                </div>
                <div className={styles.restaurantInfo}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.textField}>
                            <div><label>Name: </label></div>
                            <div 
                                className={styles.inputField}><input 
                                type="text" 
                                name="newRestaurantName"  
                                value={state.newRestaurantName}
                                required
                                onChange={ handleChange }/>
                                </div>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Address: </label></div>
                            <div className={styles.inputField}>
                                <input 
                                    type="text" 
                                    name="newRestaurantAddress" 
                                    value= {state.newRestaurantAddress}
                                    required
                                    onChange={ handleChange }/>
                            </div>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Operating hours: </label></div>
                            <div className={styles.inputField}>from 
                                <input 
                                    type="time" 
                                    name="newRestaurantHoursFrom" 
                                    value= {state.newRestaurantHoursFrom}
                                    required
                                    onChange={ handleChange }
                                    />to 
                                <input 
                                    type="time" 
                                    name="newRestaurantHoursTo"
                                    value= {state.newRestaurantHoursTo} 
                                    required
                                    onChange={ handleChange }/>
                            </div>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Type: </label></div>
                                <select 
                                    name="newRestaurantType" 
                                    value= {state.newRestaurantType}
                                    required
                                    onChange= {handleChange}>
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
                                <select 
                                    name="newRestaurantPriceLevel"
                                    value= {state.newRestaurantPriceLevel} 
                                    required
                                    onChange={ handleChange}>
                                    <option>No selection</option>
                                    <option>€</option>
                                    <option>€€</option>
                                    <option>€€€</option>
                                    <option>€€€€</option>
                                </select>
                        </div>
                        <div className={styles.textField}>
                            <div><label>Image: </label></div>
                            <div>
                                <input 
                                    type="file" 
                                    name="image"
                                    value= {fileInputState} 
                                    onChange={ handleImageChange }/>
                            </div>
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
