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
//import data from './RestaurantData.json';
import Register from './Components/Register';
import AddMenu from './Components/AddMenu';
import axios, {post} from 'axios';
import FormData from 'form-data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      ownerId: 1,
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

    addRestaurant = (restaurantName, restaurantAddress, restaurantHoursFrom, restaurantHoursTo, restaurantType, 
      restaurantPriceLevel, restaurantImage ) => {
        console.log("This state ownerId: " + this.state.ownerId);
        let restaurantHours = restaurantHoursFrom + "-" + restaurantHoursTo;
        const url = "http://localhost:4000/owner/addrestaurant"; 
        const formData = new FormData();
        formData.append('Name', restaurantName);
        formData.append('Address', restaurantAddress);
        formData.append('OperatingHours', restaurantHours);
        formData.append('Type', restaurantType);
        formData.append('PriceLevel', restaurantPriceLevel);
        formData.append('OwnerId', this.state.ownerId);
        formData.append('Image', restaurantImage);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        }
        post(url, formData, config)
        .then((response) => {
          console.log(response);
          this.setState({restaurants: response.data});
        })
        .catch(err => console.log(err));      
      }
   
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="navbar">
            <Link to="/"><div>Home</div></Link>
            <Link to="/Login"><div>Login/Register</div></Link>
          </div>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/Login" element={ <Login /> } />
            <Route path="/Owner" element={ <Owner restaurants={ this.state.restaurants } ownerId={this.state.ownerId}/> } />
            <Route path="/owner/addrestaurant" element={ <AddRestaurant restaurants={ this.state.restaurants } addRestaurant={ this.addRestaurant }/> } />
            <Route path="/owner/addrestaurant/addmenu" element={ <AddMenu /> } />
            <Route path="/Register" element={ <Register /> } />
            <Route path="/OwnerLogin" element={ <OwnerLogin/> } />
            <Route path="/OwnerRegister" element={ <OwnerRegister/> } />
            <Route path="/OwnerDeliveryUpdate" element={ <OwnerDeliveryUpdate/> } />   
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
