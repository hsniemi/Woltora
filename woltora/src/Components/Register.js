import React, {useState} from 'react'
import styles from './Styles/Register.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Register() {

const [state, setState] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    postCode: ""
});

const handleSubmit = (e) => {
    e.preventDefault();
    sendRegistration();
}

const sendRegistration = async () => {
    try {
        const response = await axios.post('http://localhost:4000/register', {
          fname: state.firstName,
          lname: state.lastName,
          street_address: state.streetAddress,
          post_code: state.postCode,
          user_name: state.username,
          password: state.password
        },
        {headers: {
          'Content-Type': 'application/json'
      }})
        console.log(response.data);
        setState({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            streetAddress: "",
            postCode: ""
        })
      } catch (err) {
        console.error(err);
      }
}

const handleChange = (event) => {
    const value = event.target.value;
    setState({
    ...state,
    [event.target.name]: value
    });
};


    return (
      <div>
        <div className={styles.registerHeader}>
          <h1><Link to="/login"><div>Login</div></Link> or Register here</h1>
            </div>
                <div className={styles.registerBox}>
                 <form  onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <input type="text" name="username" value={state.username} placeholder="Username" onChange={handleChange}/>
                        </label>
                    </div>
                <div>
                    <label>
                    <br/>
                        <input type="text" name="password" value={state.password} placeholder="Password" onChange={handleChange}/>
                    </label>
                <div>
                    <label>
                    <br/>
                        <input type="text" name="firstName" value={state.firstName} placeholder="First name" onChange={handleChange}/>
                    </label>
                </div>
                <div>
                    <label>
                    <br/>
                        <input type="text" name="lastName" value={state.lastName} placeholder="Last name" onChange={handleChange}/>
                    </label>
                </div>
                <div>
                <br/>
                    <label>
                        <input type="text" name="streetAddress" value={state.streetAddress} placeholder="Street address" onChange={handleChange}/>
                    </label>
                </div>
                <div>
                <br/>
                    <label>
                        <input type="text" name="postCode" value={state.postCode} placeholder="Postcode" onChange={handleChange}/>
                    </label>
                </div>
            <div>
            <br/>
            <input type="submit" value="Submit" />
            </div>
        </div>
                </form>
        </div>
    </div>
    )
  }