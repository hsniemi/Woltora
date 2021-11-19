import React from 'react'
import styles from './Styles/OwnerDeliveryUpdate.module.css';
import { Link } from 'react-router-dom'

export default function OwnerDeliveryUpdate() {
    const MAX_WIDTH = 300
     const STATUS = [
      "Not placed",             // status 0
      "Order Received",         // status 1
      "Waiting for delivery",   // status 2
      "In delivery",            // status 3
      "Delivered",              // status 4
     ]
        const LAST_STATUS = 4
    
        return(
        
        class ProgressBar extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              currentStatus: 0
            };
        
            this.updateStatus = this.updateStatus.bind(this);
            this.resetStatus = this.resetStatus.bind(this);
          }
        
          updateStatus() {
            if (this.state.currentStatus < LAST_STATUS) {
              this.setState(prevState => ({
                currentStatus: prevState.currentStatus + 1
              }));
            }
          }
          
          resetStatus() {
            this.setState(prevState => ({
              currentStatus: 0
            }));
          }
          
          get statusText() {
            return STATUS[this.state.currentStatus]
          }
        
          render() {
            return (
              <div class="page">
                <div class="update-order">
                  <div><i>Welcome to Woltora!</i></div>
                  <button onClick={this.updateStatus}>
                    Update status {this.state.currentStatus}
                  </button>
                  <button onClick={this.resetStatus}>
                    Reset status
                  </button>
                  <div id="root"></div>
                </div>
                
                <hr/>
                
                <div class="order-status--container">
                  <h2>Order status</h2>
                  <p class="status-text">{this.statusText}</p>
                  <div class="progress--container">
                    <div class={'progress' + (this.state.currentStatus > 0 ? ' completed' : '')}>
                      Order received
                    </div>
                    <div class={'progress' + (this.state.currentStatus > 1 ? ' completed' : '')}>
                      Waiting for delivery
                    </div>
                    <div class={'progress' + (this.state.currentStatus > 2 ? ' completed' : '')}>
                      In delivery
                    </div>
                    <div class={'progress' + (this.state.currentStatus > 3 ? ' completed' : '')}>
                      Delivered
                    </div>
                    <div id="root"></div>
                    ReactDOM.render(
                    <ProgressBar />,,
                     document.getElementById('root')
                    );
                  </div>
                </div>
              </div>
            );
          }
        }
    )
}