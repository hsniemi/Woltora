import React from 'react'
import styles from './Styles/Register.module.css';
import { Link } from 'react-router-dom'


export default function Register() {
    return (
      <div>
        <div className={styles.registerHeader}>
          <h1><Link to="/login"><div>Login</div></Link> or Register here</h1>
            </div>
                <div className={styles.registerBox}>
                 <form>
                    <div>
                        <label>
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
                    <label>
                        First name:
                        <input type="text" name="Fname" />
                    </label>
                </div>
                <div>
                    <label>
                        Last name:
                        <input type="text" name="Lname" />
                    </label>
                </div>
                <div>
                    <label>
                        Street Address:
                        <input type="text" name="Saddress" />
                    </label>
                </div>
                <div>
                    <label>
                        Postal Code:
                        <input type="text" name="Pcode" />
                    </label>
                </div>
            <div>
            <input type="submit" value="Submit" />
            </div>
        </div>
                </form>
        </div>
    </div>
    )
  }