import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import ChatWidget from './components/common/ChatWidget';

// Fareeha's pages
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

// Dashboard sub-components
import Profile from './components/dashboard/Profile';
import Orders from './components/dashboard/Orders';
import Tracking from './components/dashboard/Tracking';
import Favorites from './components/dashboard/Favorites';
import Subscriptions from './components/dashboard/Subscriptions';

// Wajeeha's pages
import Homepage from './pages/Homepage';
import Productspage from './pages/Productspage';
import ProductDetail from './pages/ProductDetail';

// Fareeha's Auth pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Taimoor's pages
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public pages — with Navbar + Footer ── */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Productspage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Taimoor's pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Route>

        {/* ── Dashboard — NO Navbar/Footer ── */}
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="subscriptions" element={<Subscriptions />} />
        </Route>
      </Routes>

      {/* ChatWidget — sab pages pe show hoga */}
      <ChatWidget />
    </BrowserRouter>
  );
};

export default App;
