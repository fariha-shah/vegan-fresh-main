// Minahil admindashboard
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  FileText,
  Tag,
  AlertTriangle,
  LogOut,
  Menu,
  X,
  Leaf,
} from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import logo from '../../assets/images/logo.png';

const NAV_LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: FolderTree },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/blogs', label: 'Blog Posts', icon: FileText },
  { to: '/admin/coupons', label: 'Coupons', icon: Tag },
  { to: '/admin/stock-alerts', label: 'Stock Alerts', icon: AlertTriangle },
];

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const SidebarContent = (
    <div className="flex h-full flex-col bg-white border-r border-gray-100">
      {/* Logo */}
      <div
        className="flex items-center justify-center px-6 py-5 border-b border-gray-100 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          src={logo}
          alt="Vegan Fresh"
          className="h-16 w-auto object-contain hover:opacity-80 transition-opacity"
        />
      </div>

      {/* Admin badge */}
      <div className="mx-4 mt-4 mb-2 flex items-center gap-2 bg-green-pale px-4 py-2.5 rounded-xl">
        <div className="w-8 h-8 rounded-full bg-green-primary flex items-center justify-center">
          <Leaf size={15} className="text-white" />
        </div>
        <div>
          <p className="font-poppins font-bold text-[13px] text-green-dark">
            Admin Panel
          </p>
          <p className="font-inter text-[11px] text-gray-400">Vegan Fresh</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
        {NAV_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-2.5 rounded-xl font-inter text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-green-primary text-white shadow-card'
                  : 'text-gray-500 hover:bg-green-pale hover:text-green-dark'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-100 px-4 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl font-inter text-[13px] font-medium text-tomato hover:bg-red-50 transition-colors"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0">
        {SidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="flex md:hidden items-center justify-between bg-white border-b border-gray-100 px-4 py-3">
        <img
          src={logo}
          alt="Vegan Fresh"
          className="h-12 w-auto object-contain cursor-pointer"
          onClick={() => navigate('/')}
        />
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-gray-600 hover:bg-green-pale"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-72 shadow-2xl md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 p-1.5 rounded-lg text-gray-500 hover:bg-green-pale z-10"
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
