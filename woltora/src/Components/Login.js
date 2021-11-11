import React from 'react'
import styles from './Styles/Login.module.css';
import { Link } from 'react-router-dom'


export default function Login() {
    return (
      <div>
        <div className={styles.loginHeader}>
          <h1>Login here or <Link to="Register"><div>Register</div></Link></h1>
        </div>
        <div className={styles.loginBox}>
        <form>
          <div><label>
          Username:
          <input type="text" name="username" />
          </label>
          </div>
          <div>
          <label>
          Password:
          <input type="text" name="password"/>
          </label>
          <div>
          <input type="submit" value="Submit" />
          </div>
          </div>
          </form>
        </div>
      </div>
    )
  }