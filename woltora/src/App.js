import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddRestaurant from './Components/AddRestaurant';
import Home from './Components/Home';
import Login from './Components/Login';
import Owner from './Components/Owner';
import OwnerRegister from './Components/OwnerRegister';
import OwnerLogin from './Components/OwnerLogin';
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
import DeliveryUpdate from './Components/DeliveryUpdate';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      menus: [],
      orders:[],
      owner_id: "",
      customer_id: "",
      restaurant_id: "",
      ownerJWT: null,
      customerJWT: null,
    }
  }

  componentDidMount() {
    axios.get("http://localhost:4000")
    .then(response => {
      this.setState({restaurants: response.data})
      console.log(response.data);
    })
    .catch(err => console.log(err));
  }

  addOwnerId = (ownerId) => {
    this.setState({owner_id: ownerId})
    console.log('new owner_id: ' + this.state.owner_id);
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
  ownerLogin = (ownerJWT, id) => {
    this.setState({
      ownerJWT: ownerJWT,
      owner_id: id
    })
  }

  login = (customerJWT, id) => {
    this.setState({
      customerJWT: customerJWT,
      customer_id: id,
  
    })
    console.log(this.state.customerJWT);
  }

  logout = () => {
    this.state({
      customerJWT: null,
      ownerJWT: null
    })
  }
   
    render() {
      console.log(this.state.customerJWT);
      console.log(this.state.ownerJWT);

      let authRoutes = 
      <>
        <Route path="/OwnerLogin" element={ <OwnerLogin ownerLogin={this.ownerLogin}/> } />
        <Route path="/OwnerRegister" element={ <OwnerRegister /> } />
        
        <Route path="/Login" element={ <Login login={this.login} /> } />
        <Route path="/Register" element={ <Register /> } />
      </>
  
      if(this.state.ownerJWT !== null) {
      authRoutes = 
      <>
        <Route path="/Owner" element={ <Owner addRestaurantId={this.addRestaurantId} jwt={this.state.ownerJWT} logout={this.logout}/> } />
        <Route path="/owner/:restaurant_id/:restaurant_name" element={ <RestaurantView setOrders={this.setOrders}/> }/>
        <Route path="/owner/orderhistory/:restaurant_name/:restaurant_id" element={<OrderHistoryView />} orders={this.state.orders} />
        <Route path="/owner/addrestaurant" element={ <AddRestaurant jwt={this.state.jwt} addRestaurant={this.addRestaurant} addRestaurantId={this.addRestaurantId}/> } />
        <Route path="/owner/addrestaurant/addmenu" element={ <AddMenu restaurant_id={this.state.restaurant_id} /> } />
        <Route path="/DeliveryUpdate/:restaurant_id/:restaurant_name/:order_id" element={ <DeliveryUpdate/> } />
      </>
      }

      if(this.state.customerJWT !== null) {
        authRoutes =
      <>
        <Route path="/customer" element={<Customer jwt={this.state.customerJWT} logout={this.logout}/>} />
        <Route path="/Shoppingcart" element={ <Shoppingcart customer_id={this.state.customer_id} jwt={this.state.customerJWT}/>} /> 
        <Route path="/customer/orderhistory" element={<CustomerOrderHistory customer_id={this.state.customer_id}/>}/>
      </>
      }
    
      return (
        <BrowserRouter>
          <div>
            <OrderContextProvider>
            <Routes>
              <Route path="/" element={ <Home restaurants={this.state.restaurants} userLoggedIn={this.state.customerJWT != null}/> } />
              <Route path="/menu/:restaurant_id" element={<MenuView userLoggedIn={this.state.customerJWT != null}/>}/>
              {authRoutes}
              
            </Routes>
            </OrderContextProvider>
          </div>
        </BrowserRouter>
      );
   }  
}

export default App;
