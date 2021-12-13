import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import styles from './Styles/Owner.module.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';


export default function AddRestaurant(props) {
    const decodedToken = jwt.decode(props.jwt);
    console.log(decodedToken);
    const [restaurantCreated, setRestaurantCreated] = useState(false);

    const [state, setState] = useState({
        newRestaurantName: "",
        newRestaurantAddress: "",
        newRestaurantHoursFrom: "",
        newRestaurantHoursTo:"",
        newRestaurantType: "No selection",
        newRestaurantPriceLevel: "No selection"
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
            const data = {data: file};
            try {
                const response = await axios.post('http://localhost:4000/owner/addrestaurant/image', data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + props.jwt
                    }
                })
                const img_url = response.data;
                uploadData(state.newRestaurantName, state.newRestaurantAddress, state.newRestaurantHoursFrom, state.newRestaurantHoursTo, 
                    state.newRestaurantType, state.newRestaurantPriceLevel, img_url);
            } catch (err) {
                console.error(err);
            }
        };

        const uploadData = async (name, address, hours_from, hours_to, type, price_level, img_url) => {
            const operating_hours = hours_from + "-" + hours_to;
            if(type === "No selection" || price_level === "No selection"){return}
            try {
                const response = await axios.post('http://localhost:4000/owner/addrestaurant/data', {
                    name: name,
                    address: address,
                    operating_hours: operating_hours,
                    type: type,
                    price_level: price_level,
                    user_id: decodedToken.user.id,
                    image: img_url
                }, 
                {headers: {
                    'Content-Type': 'application/json'
                }})
                addRestaurantId(response.data.restaurant_id); 
                addRestaurant(response.data); 
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
                setRestaurantCreated(true);
            } catch (err) {
                console.error(err);
            }
        };

    const addRestaurant= (newRestaurant) => {
        props.addRestaurant(newRestaurant);
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setState({
        ...state,
        [event.target.name]: value
        });
    };

    const addRestaurantId = (restaurant_id) =>  {
        console.log(restaurant_id);
        props.addRestaurantId(restaurant_id);
   }


        return(
            <div>
                <div>
                    <Link to="/owner">Back to main page</Link>
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
                                    onChange={handleChange}>
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
                                    required
                                    onChange={ handleImageChange }/>
                            </div>
                        </div>
                        <div className={styles.textField}>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    <div className={styles.addMenuLink}>
                        {restaurantCreated === true ? 
                                <Link to="addMenu">Create new menu</Link>
                                :
                                <>
                                </>
                            }
                    </div>
                </div> 
                </div>               
            </div>
        )
}
