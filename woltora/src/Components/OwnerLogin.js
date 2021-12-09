import React from 'react';
import styles from './Styles/OwnerLogin.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function OwnerLogin() {
  const username = React.useRef(null)
  const password = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLogin();
  }
  const sendLogin = async () => {
    try {
      const res = await axios.get('http://localhost:4000/OwnerLogin', {
        auth: {
          username: username.current.value,
          password: password.current.value
        }
      })
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginHeader}>
        <h1>Login here or <Link to="/Register"><div>Register</div></Link></h1>
      </div>
      <div className={styles.loginBox}>
        <form onSubmit={handleSubmit}>
          <div><label>
            <input type="text" placeholder="Username" ref={username} />
          </label>
          </div>
          <div>
            <label>
              <br />
              <input type="password" placeholder="Password" ref={password} />
            </label>
            <div>
              <br />
              <input type="submit" placeholder="Submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}