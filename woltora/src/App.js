import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddRestaurant from './Components/AddRestaurant';
import Home from './Components/Home';
import Login from './Components/Login';
import Owner from './Components/Owner';
import data from './RestaurantData.json';
import Register from './Components/Register';

function App() {

  const restaurants = data.restaurants;

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
          <Route path="/Login/Register" element={ <Register /> } />
          <Link to="/Login"><div>Login</div></Link>
          <Route path="/Owner" element={ <Owner restaurants={ restaurants }/> } />
          <Route path="/owner/addrestaurant" element={ <AddRestaurant /> } />          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
