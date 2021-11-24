import React, {useState} from 'react'
import styles from './Styles/addMenu.module.css';

export default function AddMenu(props) {

    const [menuItemName, setMenuItemName] = useState("");
    const [menuItemCategory, setMenuItemCategory] = useState("");
    const [menuItemDescription, setMenuItemDescription] = useState("");
    const [menuItemPrice, setMenuItemPrice] = useState("");
    const [menuItemImage, setMenuItemImage] = useState("");

    const addMenuItem = (event) => {
        event.preventDefault();
        props.addMenuItem(menuItemCategory, menuItemName, menuItemDescription, menuItemPrice, menuItemImage);
    }

    return (
        <div>
            <div className={styles.header}>
                <h1>Add Menu</h1>
            </div>
            <div className={styles.menuForm}>
                <form onSubmit={addMenuItem}>
                    <div className={styles.category}>
                    <select 
                        name="category"                       
                        onChange={  event => setMenuItemCategory(event.target.value)}
                        >
                        <option>Choose Category</option>
                        <option>Buffet</option>
                        <option>Fast food</option>
                        <option>Fast casual</option>
                        <option>Casual dining</option>
                        <option>Fine dining</option>
                    </select>
                    </div>
                    <div className={styles.menuInfo}>
                        <div className={styles.imageField}>
                            <label>Select Image</label>
                            <input 
                                type="file" 
                                name="image" 
                                onChange={ event => setMenuItemImage(event.target.files[0]) }                               
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
                                onChange={  event => setMenuItemName(event.target.value)} 
                                />
                            <input 
                                type="text" 
                                name="description"                                
                                onChange={  event => setMenuItemDescription(event.target.value)} 
                                />
                                
                        </div>
                        <div className={styles.menuPrice}>
                            <label>Price </label> 
                            <input 
                                type="text" 
                                name="price"                                
                                onChange={ event => setMenuItemPrice(event.target.value)}
                                /> 
                        </div> 
                    </div>
                <div className={styles.AddMenu}>
                    <button type="submit">Submit</button>
                </div>
                </form>           
            </div>
            <div>
            </div>
        </div>
    )
}
