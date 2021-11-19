import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Owner from './Components/Owner';
import Register from './Components/Register';
import OwnerLogin from './Components/OwnerLogin';
import OwnerRegister from './Components/OwnerRegister';
import OwnerDeliveryUpdate from './Components/OwnerDeliveryUpdate';

function App() {

  /*const restaurants = data.restaurants;*/

  return (
    <BrowserRouter>
      <div>
        <div className="navbar">
          <Link to="/"><div>Home</div></Link>
          <Link to="/Login"><div>Login/Register</div></Link>
        </div>
        <div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/Login" element={ <Login /> } />
          <Route path="/Owner" element={ <Owner /> } />
          <Route path="/Register" element={ <Register /> } />
          <Route path="/OwnerLogin" element={ <OwnerLogin/> } />
          <Route path="/OwnerRegister" element={ <OwnerRegister/> } />
          <Route path="/OwnerDeliveryUpdate" element={ <OwnerDeliveryUpdate/> } />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
