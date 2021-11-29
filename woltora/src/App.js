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
import FormData from 'form-data';


import Shoppingcart from './Components/Shoppingcart';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      menus: [],
      ownerId: "023004bf-be6a-4e83-8017-123e65aa3de3",
      restaurantId: ""
    }
  }

  componentDidMount() {
    console.log("Mounted");
    axios.get("http://localhost:4000")
    .then(response => {
      console.log(response);
      this.setState({restaurants: response.data})
    })
    .catch(err => console.log(err));
  }

    addRestaurant = (restaurantId ) => {
      console.log('app.js: addRestaurant' + restaurantId);
      this.setState({
        restaurantId: restaurantId
      })
    }

    addMenuItem = (menuCategory, menuName, menuDescription, menuPrice, menuImage) => {
  
    }
   
  render() {
    return (
      <BrowserRouter>
        <div>
            <div class="navbar">
            <a class="active" href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <input type="text" placeholder="Search.."></input>
            </div>
            <Link to="/"><div>Home</div></Link>
            <Link to="/Login"><div>Login/Register</div></Link>

        
        <div>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/Login" element={ <Login /> } />
            <Route path="/Owner" element={ <Owner restaurants={ this.state.restaurants } ownerId={this.state.ownerId}/> } />
            <Route path="/owner/addrestaurant" element={ <AddRestaurant restaurants={ this.state.restaurants } addRestaurant={ this.addRestaurant } ownerId={this.state.ownerId}/> } />
            <Route path="/owner/addrestaurant/addmenu" element={ <AddMenu addMenuItem={ this.addMenuItem } restaurantId={this.state.restaurantId}/> } />
            <Route path="/Register" element={ <Register /> } />
            <Route path="/OwnerLogin" element={ <OwnerLogin/> } />
            <Route path="/OwnerRegister" element={ <OwnerRegister/> } />
            <Route path="/OwnerDeliveryUpdate" element={ <OwnerDeliveryUpdate/> } />
            <Route path="/Shoppingcart>" element={ <Shoppingcart />} />   
          </Routes>

        </div>

        </div>



      </BrowserRouter>




    );

  }

}

export default App;
