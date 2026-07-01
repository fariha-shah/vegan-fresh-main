//Wajeeha Home page,setup
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiMenu, HiX } from 'react-icons/hi';
import { BsHandbag } from 'react-icons/bs';
import logo from '../../assets/images/logo.png';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Categories', path: '/products' },
  { name: 'Products', path: '/products' },
  { name: 'About Us', path: '/about' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user); // ✅ user added

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md h-[70px]">
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="shrink-0 flex items-center">
          <img
            src={logo}
            alt="Vegan Fresh"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center gap-4">
            {NAV_LINKS.map((link, i) => (
              <li key={link.name} className="flex items-center gap-4">
                <Link
                  to={link.path}
                  className={`font-poppins font-semibold text-[13px] uppercase tracking-wide transition-colors duration-200
                    ${
                      location.pathname === link.path
                        ? 'text-green-primary'
                        : 'text-text-dark hover:text-green-primary'
                    }`}
                >
                  {link.name}
                </Link>
                {i < NAV_LINKS.length - 1 && (
                  <span className="text-green-light text-sm select-none">
                    •
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Shop Button */}
          <Link
            to="/cart"
            className="hidden md:flex items-center gap-2 bg-green-primary hover:bg-green-dark text-white font-poppins font-bold text-sm uppercase tracking-wide px-6 py-2.5 rounded-full transition-all duration-300 shadow-card hover:shadow-hover hover:scale-105"
          >
            <BsHandbag size={18} />
            Shop
            {cartCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-green-primary text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* ✅ Desktop: User = Dashboard, Admin/Logout = Sign In */}
          {isAuthenticated && user?.role !== 'admin' ? (
            <Link
              to="/dashboard"
              className="hidden md:flex items-center gap-2 border-2 border-green-primary text-green-primary hover:bg-green-pale font-poppins font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 border-2 border-green-primary text-green-primary hover:bg-green-pale font-poppins font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-green-dark p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-card border-t border-green-pale">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-6 py-4 border-b border-green-pale font-poppins font-semibold text-[13px] uppercase tracking-wide text-text-dark hover:text-green-primary hover:bg-green-pale transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/cart"
            className="flex items-center gap-2 px-6 py-4 font-poppins font-bold text-[13px] uppercase text-green-primary"
          >
            <BsHandbag size={16} /> Shop
            {cartCount > 0 && (
              <span className="ml-1 bg-green-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* ✅ Mobile: User = Dashboard, Admin/Logout = Sign In */}
          {isAuthenticated && user?.role !== 'admin' ? (
            <Link
              to="/dashboard"
              className="block px-6 py-4 font-poppins font-semibold text-[13px] uppercase tracking-wide text-text-dark hover:text-green-primary hover:bg-green-pale transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="block px-6 py-4 font-poppins font-semibold text-[13px] uppercase tracking-wide text-text-dark hover:text-green-primary hover:bg-green-pale transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
