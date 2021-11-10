import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Owner from './Owner';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="navbar">
          <Link to="/"><div>Home</div></Link>
          <Link to="/Login"><div>Login</div></Link>
        </div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/Login" element={ <Login /> } />
          <Route path="/Owner" element={ <Owner /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
