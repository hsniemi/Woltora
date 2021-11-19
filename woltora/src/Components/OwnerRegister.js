import React from 'react'
import styles from './Styles/OwnerRegister.module.css';
import { Link } from 'react-router-dom'


export default function OwnerRegister() {
    return (
      <div>
        <div className={styles.registerHeader}>
          <h1><Link to="/OwnerLogin"><div>Login</div></Link> or Register here</h1>
            </div>
                <div className={styles.registerBox}>
                 <form>
                    <div>
                        <label>
                            <input type="text" placeholder="Username" />
                        </label>
                    </div>
                <div>
                    <label>
                    <br/>
                        <input type="text" placeholder="Password"/>
                    </label>
                <div>
                    <label>
                    <br/>
                        <input type="text" placeholder="Owner name" />
                    </label>
                </div>
                <div>
                    <label>
                    <br/>
                        <input type="text" placeholder="Phone" />
                    </label>
                </div>
                <div>
                <br/>
                    <label>
                        <input type="text" placeholder="Street address" />
                    </label>
                </div>
                <div>
                <br/>
                    <label>
                        <input type="text" placeholder="Postcode" />
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