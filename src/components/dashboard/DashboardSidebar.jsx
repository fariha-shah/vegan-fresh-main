import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  RefreshCcw,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const sidebarLinks = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'My Profile', path: '/dashboard/profile', icon: User },
  { label: 'Order History', path: '/dashboard/orders', icon: ShoppingBag },
  { label: 'Track Order', path: '/dashboard/track', icon: MapPin },
  { label: 'My Favorites', path: '/dashboard/favorites', icon: Heart },
  {
    label: 'Subscriptions',
    path: '/dashboard/subscriptions',
    icon: RefreshCcw,
  },
];

const DashboardSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <aside className="w-64 min-h-screen bg-white shadow-sm flex flex-col">
      {/* User Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full bg-primary flex items-center 
          justify-center text-white font-heading font-bold text-lg"
          >
            {user?.name?.charAt(0)}
          </div>
          <div>
            <p className="font-heading font-semibold text-text-dark text-sm">
              {user?.name}
            </p>
            <p className="font-body text-gray-400 text-xs">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.path}
                end={link.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm 
                  font-body font-medium transition-all duration-200
                  ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-dark hover:bg-bg-light hover:text-primary'
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm 
          font-body font-medium text-tomato hover:bg-red-50 w-full 
          transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
