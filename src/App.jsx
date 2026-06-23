import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Profile from './components/dashboard/Profile';
import Orders from './components/dashboard/Orders';
import Tracking from './components/dashboard/Tracking';
import Favorites from './components/dashboard/Favorites';
import Subscriptions from './components/dashboard/Subscriptions';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/profile" replace />} />
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="subscriptions" element={<Subscriptions />} />
      </Route>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
    </Routes>
  );
}

export default App;
