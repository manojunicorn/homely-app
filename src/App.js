import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CookRegister from './pages/CookRegister';
import CustomerPage from './pages/CustomerPage';

function Navbar() {
  return (
    <div className="navbar">
      <h1>Homely</h1>
      <p>Bangalore's home food community</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cook-register" element={<CookRegister />} />
        <Route path="/customer" element={<CustomerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;