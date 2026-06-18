import { ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Categories', path: '/categories' },
    { label: 'Products', path: '/products' },
    { label: 'About Us', path: '/about' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-1.5">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-xl text-primary">
            vegan
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                className="font-body text-text-dark hover:text-primary 
                transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side — Cart + Dashboard */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 hover:bg-bg-light rounded-full transition"
          >
            <ShoppingCart className="w-6 h-6 text-text-dark" />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-tomato text-white 
              text-xs font-bold w-5 h-5 rounded-full flex items-center 
              justify-center"
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Dashboard Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary-dark 
            text-white text-sm font-body font-medium px-4 py-2 rounded-lg 
            transition-colors duration-300"
          >
            {user?.name?.split(' ')[0]}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-text-dark" />
            ) : (
              <Menu className="w-6 h-6 text-text-dark" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-text-dark hover:text-primary 
                  text-sm font-medium block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setMenuOpen(false);
                }}
                className="w-full bg-primary text-white text-sm font-medium 
                py-2 rounded-lg"
              >
                My Dashboard
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
