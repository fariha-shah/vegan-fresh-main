import {
  ShoppingBag,
  Heart,
  RefreshCcw,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
    <div className={`${bg} p-3 rounded-xl`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <div>
      <p className="font-body text-gray-400 text-sm">{label}</p>
      <p className="font-heading font-bold text-text-dark text-2xl">{value}</p>
    </div>
  </div>
);

const DashboardOverview = () => {
  const { orders } = useSelector((state) => state.orders);
  const { items: favorites } = useSelector((state) => state.favorites);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const stats = [
    {
      icon: ShoppingBag,
      label: 'Total Orders',
      value: orders.length,
      color: 'text-primary',
      bg: 'bg-green-50',
    },
    {
      icon: Heart,
      label: 'My Favorites',
      value: favorites.length,
      color: 'text-tomato',
      bg: 'bg-red-50',
    },
    {
      icon: ShoppingBag,
      label: 'Cart Items',
      value: cartItems.length,
      color: 'text-carrot',
      bg: 'bg-orange-50',
    },
    {
      icon: RefreshCcw,
      label: 'Subscriptions',
      value: '1 Active',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
  ];

  const recentOrders = orders.slice(0, 3);

  const statusColor = {
    delivered: 'bg-green-100 text-primary',
    shipped: 'bg-blue-100 text-blue-600',
    processing: 'bg-orange-100 text-carrot',
    pending: 'bg-gray-100 text-gray-500',
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div
        className="bg-gradient-to-r from-primary to-primary-light 
      rounded-2xl p-6 text-white"
      >
        <p className="font-body text-green-100 text-sm">Welcome back 👋</p>
        <h2 className="font-heading font-bold text-2xl mt-1">{user?.name}</h2>
        <p className="font-body text-green-100 text-sm mt-1">
          Here's what's happening with your orders today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-text-dark text-lg">
            Recent Orders
          </h3>
          <button
            onClick={() => navigate('/dashboard/orders')}
            className="flex items-center gap-1 text-primary text-sm 
            font-body hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 
              bg-bg-light rounded-xl"
            >
              <div>
                <p className="font-heading font-semibold text-text-dark text-sm">
                  {order.id}
                </p>
                <p className="font-body text-gray-400 text-xs mt-0.5">
                  {order.date} · {order.items.length} items
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-heading font-bold text-primary text-sm">
                  ${order.total}
                </span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-body 
                font-medium capitalize ${statusColor[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-heading font-semibold text-text-dark text-lg mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: 'Shop Now',
              path: '/products',
              bg: 'bg-primary text-white',
            },
            { label: 'My Cart', path: '/cart', bg: 'bg-carrot text-white' },
            {
              label: 'Track Order',
              path: '/dashboard/track',
              bg: 'bg-blue-500 text-white',
            },
            {
              label: 'Favorites',
              path: '/dashboard/favorites',
              bg: 'bg-tomato text-white',
            },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className={`${action.bg} py-3 px-4 rounded-xl text-sm 
              font-body font-medium flex items-center justify-center gap-2 
              hover:opacity-90 transition`}
            >
              {action.label}
              <TrendingUp className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
