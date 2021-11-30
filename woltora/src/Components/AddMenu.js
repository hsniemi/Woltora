import axios from 'axios';
import React, {useState} from 'react'
import styles from './Styles/addMenu.module.css';
import FormData from 'form-data';

export default function AddMenu(props) {
    console.log(props.restaurantId);
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
                    restaurant_id: props.restaurantId,
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
                <h1>Add Menu</h1>
            </div>
            <div className={styles.menuForm}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.category}>
                    <select 
                        name="category"   
                        value= {state.category}                    
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
                                onChange={ handleFileInputChange }                               
                            />
                        </div>
                        <div className={styles.menuNameDescription}>
                            <label>Name </label>
                            <label>Description </label>
                        </div>
                        <div className={styles.menuNameDescriptionField}>
                            <input 
                                type="text" 
                                name="name"
                                value= {state.name}                              
                                onChange={ handleChange } 
                                />
                            <input 
                                type="text" 
                                name="description" 
                                value={state.description}                               
                                onChange={ handleChange } 
                                />           
                        </div>
                        <div className={styles.menuPrice}>
                            <label>Price </label> 
                            <input 
                                type="text" 
                                name="price"     
                                value= {state.price}                           
                                onChange={ handleChange }
                                /> 
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
