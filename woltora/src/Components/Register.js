import React, {useState} from 'react'
import styles from './Styles/Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Constants from '../Constants.json'


export default function Register() {
    const navigate = useNavigate();
    const [registerProcessState, setRegisterProcessState] = useState("idle");

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
        setRegisterProcessState("processing");
        try {
            const response = await axios.post(Constants.API_ADDRESS +'/register', {
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
            setRegisterProcessState("registerSuccess");
            setState({
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                streetAddress: "",
                postCode: ""
            })
            setTimeout(() => {
                navigate('/login', {replace: true});
            },1500);
        } catch (err) {
            console.error(err);
            setRegisterProcessState("registerFailure");
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setState({
        ...state,
        [event.target.name]: value
        });
    };

    let registerUIControls = null;

    switch(registerProcessState){
        case "idle":
            registerUIControls = <input type="submit" value="Submit"/>
            break;

        case "processing":
            registerUIControls = <span style={{color: "blue"}}>Processing...</span>
            break;

        case "registerSuccess":
            registerUIControls = <span style={{color: "green"}}>Registration success</span>
            break;
        
        case "registerFailure":
            registerUIControls = <span style={{color: "red"}}>Error</span>
            break;
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
                            <input required type="text" name="username" value={state.username} placeholder="Username" onChange={handleChange}/>
                        </label>
                    </div>
                <div>
                    <label>
                    <br/>
                        <input required type="text" name="password" value={state.password} placeholder="Password" onChange={handleChange}/>
                    </label>
                <div>
                    <label>
                    <br/>
                        <input required type="text" name="firstName" value={state.firstName} placeholder="First name" onChange={handleChange}/>
                    </label>
                </div>
                <div>
                    <label>
                    <br/>
                        <input required type="text" name="lastName" value={state.lastName} placeholder="Last name" onChange={handleChange}/>
                    </label>
                </div>
                <div>
                <br/>
                    <label>
                        <input required type="text" name="streetAddress" value={state.streetAddress} placeholder="Street address" onChange={handleChange}/>
                    </label>
                </div>
                <div>
                <br/>
                    <label>
                        <input required type="text" name="postCode" value={state.postCode} placeholder="Postcode" onChange={handleChange}/>
                    </label>
                </div>
            <div>
            <br/>
                {registerUIControls}
            </div>
            </div>
        </form>
        </div>
    </div>
    )
  }