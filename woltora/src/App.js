import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="navbar">
          <Link to="/"><div>Home</div></Link>
          <Link to="/contacts"><div>Contact List</div></Link>
        </div>
        <Routes>
          <Route path="/" element={ <Home /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
