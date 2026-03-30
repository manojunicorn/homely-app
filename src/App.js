import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CookRegister from './pages/CookRegister';
import CustomerPage from './pages/CustomerPage';
import CartPage from './pages/CartPage';
import CookDashboard from './pages/CookDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cook-register" element={<CookRegister />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cook-dashboard" element={<CookDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;