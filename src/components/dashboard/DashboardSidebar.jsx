import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Import logout action — top pe add karo
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import {
  User,
  Package,
  Truck,
  Heart,
  RefreshCcw,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import logo from '../../assets/images/logo.png';

const NAV_ITEMS = [
  { label: 'Profile', path: 'profile', icon: User },
  { label: 'Order History', path: 'orders', icon: Package },
  { label: 'Track Order', path: 'tracking', icon: Truck },
  { label: 'Favorites', path: 'favorites', icon: Heart },
  { label: 'Subscriptions', path: 'subscriptions', icon: RefreshCcw },
];

export default function DashboardSidebar({ user }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const SidebarContent = (
    <div className="flex h-full flex-col bg-white">
      {/* Logo — click karo toh homepage */}
      <div
        onClick={() => navigate('/')}
        className="flex items-center justify-center px-6 py-5 border-b border-[#F5F5F5] cursor-pointer"
      >
        <img
          src={logo}
          alt="Vegan Fresh"
          className="h-24 w-auto object-contain hover:opacity-80 transition-opacity duration-200"
        />
      </div>

      {/* User card */}
      <div className="mx-4 mt-5 flex items-center gap-3 rounded-2xl bg-[#F5F5F5] p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A5D6A7] font-poppins font-semibold text-[#2E7D32]">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="min-w-0">
          <p className="truncate font-poppins text-sm font-medium text-[#2C3E50]">
            {user?.name || 'Guest User'}
          </p>
          <p className="truncate font-inter text-xs text-[#2C3E50]/60">
            {user?.email || 'guest@example.com'}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-6 flex-1 space-y-1 px-4">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} className="relative block">
            {({ isActive }) => (
              <div
                className={`relative flex items-center gap-3 rounded-xl px-4 py-2.5 font-inter text-sm transition-colors duration-200 ${
                  isActive
                    ? 'text-[#2E7D32] font-medium'
                    : 'text-[#2C3E50]/70 hover:text-[#2E7D32] hover:bg-[#F5F5F5]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="dashboard-active-pill"
                    className="absolute inset-0 rounded-xl bg-[#E8F5E9]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon size={18} className="relative z-10" />
                <span className="relative z-10">{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#F5F5F5] px-4 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-inter text-sm text-[#E53935] transition-colors hover:bg-[#FDECEA]"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-[#F5F5F5]">
        <div className="sticky top-0 h-screen">{SidebarContent}</div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-[#F5F5F5] bg-white px-4 py-2 lg:hidden">
        <img
          src={logo}
          alt="Vegan Fresh"
          className="h-14 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity duration-200"
          onClick={() => navigate('/')}
        />
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-[#2C3E50] hover:bg-[#F5F5F5]"
          aria-label="Open dashboard menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-72 shadow-2xl lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 rounded-lg p-1.5 text-[#2C3E50] hover:bg-[#F5F5F5]"
                aria-label="Close dashboard menu"
              >
                <X size={20} />
              </button>
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
