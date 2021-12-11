import axios from 'axios';
import React, {useState} from 'react'
import styles from './Styles/addMenu.module.css';
import {Link} from 'react-router-dom';


export default function AddMenu(props) {
    
    const restaurant_id = props.restaurant_id;
    console.log("AddMenu restaurant_id: " + restaurant_id);

    const [state, setState] = useState({
        name:"", 
        category:"", 
        description:"", 
        price:""
    });
    const [previewSource, setPreviewSource] = useState("");
    const [fileInputState, setFileInputState] = useState("");
    const handleFileInputChange = (e) => {
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
                await axios.post('http://localhost:4000/owner/addrestaurant/addmenu', data)
                .then(response => img_url = response.data);
                uploadData(state.category, state.name, state.description, state.price, img_url);
            } catch (err) {
                console.error(err);
            }
        }

        const uploadData = async (category, name, description, price, img_url) => {
            try {
                await axios.post('http://localhost:4000/owner/addrestaurant/addmenu/data', {
                    restaurant_id: props.restaurant_id,
                    category: category,
                    name: name,
                    description: description,
                    price: price,
                    image: img_url
                }, 
                {headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => console.log(response));  
                setFileInputState('');
                setPreviewSource('');
                setState({
                    category: "",
                    name: "",
                    description: "",
                    price:""
                })
            } catch (err) {
                console.error(err);
            }
        };


    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    };

    // const addMenuItem = (event) => {
    //     event.preventDefault();
    //     props.addMenuItem(menuItemCategory, menuItemName, menuItemDescription, menuItemPrice, menuItemImage);
    // }

    return (
        <div>
            <div className={styles.header}>
                <Link to="/owner">Back to main page</Link>
                <h1>Add Menu</h1>
            </div>
            <div className={styles.menuForm}>
                <form  onSubmit={handleSubmit}>
                    <div className={styles.category}>
                    <select 
                        className="form-control-sm"
                        name="category"   
                        value= {state.category}   
                        required                 
                        onChange={ handleChange }
                        >
                        <option>Choose Category</option>
                        <option>Buffet</option>
                        <option>Fast food</option>
                        <option>Fast casual</option>
                        <option>Casual dining</option>
                        <option>Fine dining</option>
                    </select>
                    </div>
               
                    <div className={styles.imageviewContainer}>
                    
                     
                    <div className={styles.menuInfo}>
                    <div className={styles.imageField}>
                            <label>Select Image</label>
                            <input 
                                type="file" 
                                name="image" 
                                value = {fileInputState}
                                required
                                onChange={ handleFileInputChange }                               
                            />
                        </div>
                        <div className={styles.menuNameDescription}>
                            <label>Name </label>
                            <label>Description </label>
                        </div>
                        <div className={styles.menuNameDescriptionField}>
                            <input 
                                className="form-control-sm"
                                type="text" 
                                name="name"
                                value= {state.name} 
                                required                             
                                onChange={ handleChange } 
                                />
                            <input
                                className="form-control-sm" 
                                type="text" 
                                name="description" 
                                value={state.description} 
                                required                              
                                onChange={ handleChange } 
                                />           
                        </div>
                        <div className={styles.menuPrice}>
                            <label>Price </label> 
                            <input 
                                className="form-control-sm"
                                type="text" 
                                name="price"     
                                value= {state.price} 
                                required    
                                placeholder="00.00"                      
                                onChange={ handleChange }
                                />
                            <div>€</div>     
                        </div> 
                    </div>
                    </div>
                <div>
                    <div className={styles.imageButtonContainer}>
                    <div >
                        {previewSource && (
                            <img
                                src={previewSource}
                                alt="chosen"
                                style={{height: '100px'}} />
                        )}
                        </div>
                    </div>
                    <div>
                        <button type="submit" >Submit</button>
                    </div>
                </div>
                </form> 
                          
            </div>
            <div>
            </div>
        </div>
    )
}
