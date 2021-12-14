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
      restaurant_id: "",
      ownerJWT: null,
      customerJWT: null,
    }
  }

  componentDidMount() {
    axios.get(Constants.API_ADRESS +"/")
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
  ownerLogin = (ownerJWT) => {
    this.setState({
      ownerJWT: ownerJWT
    })
  }

  login = (customerJWT) => {
    this.setState({
      customerJWT: customerJWT
    })
  }

  logout = () => {
    this.setState({
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
        <Route path="/owner/:restaurant_id/:restaurant_name" element={ <RestaurantView setOrders={this.setOrders} jwt={this.state.ownerJWT}/> }/>
        <Route path="/owner/orderhistory/:restaurant_name/:restaurant_id" element={<OrderHistoryView jwt={this.state.ownerJWT} orders={this.state.orders} />} />
        <Route path="/owner/addrestaurant" element={ <AddRestaurant jwt={this.state.ownerJWT} addRestaurant={this.addRestaurant} addRestaurantId={this.addRestaurantId}/> } />
        <Route path="/owner/addrestaurant/addmenu" element={ <AddMenu restaurant_id={this.state.restaurant_id} jwt={this.state.ownerJWT} /> } />
        <Route path="/DeliveryUpdate/:restaurant_id/:restaurant_name/:order_id" element={ <DeliveryUpdate jwt={this.state.ownerJWT}/> } />
      </>
      }

      if(this.state.customerJWT !== null) {
        authRoutes =
      <>
        <Route path="/customer" element={<Customer jwt={this.state.customerJWT} logout={this.logout} customer_id={this.state.customer_id}/>} />
        <Route path="/Shoppingcart" element={ <Shoppingcart jwt={this.state.customerJWT}/>} /> 
        <Route path="/customer/orderhistory" element={<CustomerOrderHistory jwt={this.state.customerJWT}/>}/>
      </>
      }
    
      return (
        <BrowserRouter>
          <div>
            <OrderContextProvider>
            <Routes>
              <Route path="/" element={ <Home restaurants={this.state.restaurants} logout={this.logout} userLoggedIn={this.state.customerJWT != null}/> } />
              <Route path="/menu/:restaurant_id" element={<MenuView userLoggedIn={this.state.customerJWT != null}/>}/>
              {authRoutes}
              <Route path="*" element={<Home restaurants={this.state.restaurants} userLoggedIn={this.state.customerJWT != null}/> } />
            </Routes>
            </OrderContextProvider>
          </div>
        </BrowserRouter>
      );
   }  
}

export default App;
