import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Owner from './Components/Owner';
import Register from './Components/Register';
import data from './Data.json';

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
          <Route path="/Owner" element={ <Owner /> } />
          <Route path="/Login/Register" element={ <Register /> } />
          <Link to="/Login"><div>Login</div></Link>
        </div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/Login" element={ <Login /> } />
          <Route path="/Owner" element={ <Owner restaurants={ restaurants }/> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
