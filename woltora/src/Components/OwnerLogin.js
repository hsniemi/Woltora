import React from 'react'
import styles from './Styles/OwnerLogin.module.css';
import { Link } from 'react-router-dom'

export default function OwnerLogin() {
    return (
      <div className={styles.loginBackground}>
        <div className={styles.loginHeader}>
          <h1>Login here or <Link to="/OwnerRegister"><div>Register</div></Link></h1>
        </div>
        <div className={styles.loginBox}>
        <form>
          <div><label>
          <input type="text" placeholder="Username" />
          </label>
          </div>
          <div>
          <label>
          <br/>
          <input type="password" placeholder="Password"/>
          </label>
          <div>
          <br/>
          <input type="submit" placeholder="Submit" />
          </div>
          </div>
          </form>
        </div>
      </div>
    )
  }