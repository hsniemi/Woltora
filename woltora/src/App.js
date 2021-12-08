import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddRestaurant from './Components/AddRestaurant';
import Home from './Components/Home';
import Login from './Components/Login';
import Owner from './Components/Owner';
import OwnerRegister from './Components/OwnerRegister';
import OwnerLogin from './Components/OwnerLogin';
import OwnerDeliveryUpdate from './Components/OwnerDeliveryUpdate';
import Register from './Components/Register';
import AddMenu from './Components/AddMenu';
import axios from 'axios';
import Shoppingcart from './Components/Shoppingcart';
import RestaurantView from './Components/RestaurantView';
import OrderHistoryView from './Components/OrderHistoryView';
import Customer from './Components/Customer';
import CustomerOrderHistory from './Components/CustomerOrderHistory';
import {OrderContextProvider} from './Context/OrderContext';
import MenuView from './Components/MenuView';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      menus: [],
      orders:[],
      owner_id: "023004bf-be6a-4e83-8017-123e65aa3de3",
      customer_id:"c0a8547f-3bde-4c6f-aba9-0f4d2feb2aeb",
      restaurant_id: ""
    }
    console.log("app.js: constructor");
  }

  componentDidMount() {
    console.log("Mounted");
    axios.get("http://localhost:4000")
    .then(response => {
      this.setState({restaurants: response.data})
      console.log(response.data);
    })
    .catch(err => console.log(err));
  }

  addRestaurant = (restaurant) => {
    this.setState([...this.state.restaurants, restaurant]);
  }

  addRestaurantId = (restaurant_id ) => {
    console.log('app.js: addRestaurant Id ' + restaurant_id);
    this.setState({
      restaurant_id: restaurant_id
    })
  }

    setOrders = (orders) => {
      console.log("app.js, allOrders: " + orders);
      this.setState({
        orders: orders
      })
    }
   
  render() {
    return (
      
      <BrowserRouter>
        <div>
            <Link to="/"><div>Home</div></Link>
            <Link to="/Login"><div>Login/Register</div></Link>
        <div>
          <OrderContextProvider>
          <Routes>
            <Route path="/" element={ <Home restaurants={this.state.restaurants}/> } />
            <Route path="/menu/:restaurant_id" element={<MenuView />}/>
            <Route path="/Login" element={ <Login /> } />
            <Route path="/Owner" element={ <Owner owner_id={this.state.owner_id} restaurants={this.state.restaurants} addRestaurantId={this.addRestaurantId}/> } />
            <Route path="/owner/:restaurant_id/:restaurant_name" element={ <RestaurantView setOrders={this.setOrders}/> }/>
            <Route path="/owner/orderhistory/:restaurant_name/:restaurant_id" element={<OrderHistoryView />} orders={this.state.orders} />
            <Route path="/owner/addrestaurant" element={ <AddRestaurant owner_id={this.state.owner_id} addRestaurant={this.addRestaurant} addRestaurantId={this.addRestaurantId}/> } />
            <Route path="/owner/addrestaurant/addmenu" element={ <AddMenu  restaurant_id={this.state.restaurant_id}/> } />
            <Route path="/customer" element={<Customer customer_id={this.state.customer_id}/>} />
            <Route path="/customer/orderhistory" element={<CustomerOrderHistory customer_id={this.state.customer_id}/>}/>
            <Route path="/Register" element={ <Register /> } />
            <Route path="/OwnerLogin" element={ <OwnerLogin/> } />
            <Route path="/OwnerRegister" element={ <OwnerRegister/> } />
            <Route path="/OwnerDeliveryUpdate" element={ <OwnerDeliveryUpdate/> } />
            <Route path="/Shoppingcart" element={ <Shoppingcart customer_id={this.state.customer_id}/>} />   
          </Routes>
          </OrderContextProvider>
        </div>
        </div>
      </BrowserRouter>
    );
 }
}

export default App;
