import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Package,
  Truck,
  Heart,
  RefreshCcw,
  LogOut,
  Menu,
  X,
  Leaf,
} from 'lucide-react';

// Keep this list as the single source of truth for dashboard nav.
// path is relative to /dashboard (see routing setup in Step 1 notes)
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

  const handleLogout = () => {
    // Replace with your real auth logout (clear token, dispatch redux action, etc.)
    localStorage.removeItem('token');
    navigate('/login');
  };

  const SidebarContent = (
    <div className="flex h-full flex-col bg-white">
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 py-6 border-b border-[#F5F5F5]">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2E7D32]">
          <Leaf size={18} className="text-white" />
        </div>
        <span className="font-poppins text-lg font-semibold text-[#2C3E50]">
          Vegan<span className="text-[#2E7D32]">Fresh</span>
        </span>
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
      <div className="flex items-center justify-between border-b border-[#F5F5F5] bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2E7D32]">
            <Leaf size={16} className="text-white" />
          </div>
          <span className="font-poppins text-base font-semibold text-[#2C3E50]">
            Vegan<span className="text-[#2E7D32]">Fresh</span>
          </span>
        </div>
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
