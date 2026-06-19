import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Search,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  delivered: {
    label: 'Delivered',
    icon: CheckCircle,
    color: 'text-primary',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  shipped: {
    label: 'Shipped',
    icon: Truck,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  processing: {
    label: 'Processing',
    icon: Package,
    color: 'text-carrot',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'text-gray-500',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    color: 'text-tomato',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
};

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const config = statusConfig[order.status];
  const Icon = config.icon;

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border ${config.border} 
    overflow-hidden transition-all duration-200`}
    >
      {/* Order Header */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`${config.bg} p-3 rounded-xl`}>
            <ShoppingBag className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <p className="font-heading font-semibold text-text-dark text-sm">
              {order.id}
            </p>
            <p className="font-body text-gray-400 text-xs mt-0.5">
              📅 {order.date} · {order.items.length} items
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <span
            className={`hidden sm:flex items-center gap-1.5 text-xs 
          font-body font-medium px-3 py-1.5 rounded-full ${config.bg} 
          ${config.color}`}
          >
            <Icon className="w-3.5 h-3.5" />
            {config.label}
          </span>

          {/* Total */}
          <span className="font-heading font-bold text-primary text-base">
            ${order.total}
          </span>

          {/* Expand Toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 hover:bg-bg-light rounded-lg transition"
          >
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Order Items */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 py-4 bg-bg-light">
          <p className="font-heading font-semibold text-text-dark text-sm mb-3">
            Order Items
          </p>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white 
                px-4 py-3 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 bg-green-50 rounded-lg flex 
                  items-center justify-center text-base"
                  >
                    🥦
                  </div>
                  <div>
                    <p className="font-body font-medium text-text-dark text-sm">
                      {item.name}
                    </p>
                    <p className="font-body text-gray-400 text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-heading font-semibold text-text-dark text-sm">
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Order Footer */}
          <div
            className="flex items-center justify-between mt-4 pt-3 
          border-t border-gray-200"
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1.5 text-xs font-body 
              font-medium px-3 py-1.5 rounded-full ${config.bg} ${config.color}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {config.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {order.status === 'shipped' && (
                <button
                  onClick={() => navigate('/dashboard/track')}
                  className="text-xs font-body font-medium text-blue-500 
                  hover:underline"
                >
                  Track Order →
                </button>
              )}
              <div className="text-right">
                <p className="font-body text-gray-400 text-xs">Total</p>
                <p className="font-heading font-bold text-primary text-base">
                  ${order.total}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OrderHistory = () => {
  const { orders } = useSelector((state) => state.orders);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = orders.filter((order) => {
    const matchSearch = order.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusTabs = ['all', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-heading font-bold text-2xl text-text-dark">
          Order History
        </h2>
        <p className="font-body text-gray-400 text-sm mt-1">
          Track and manage all your past orders
        </p>
      </div>

      {/* Search + Filter */}
      <div
        className="bg-white rounded-2xl shadow-sm p-4 flex flex-col 
      sm:flex-row gap-3"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 
          w-4 h-4 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border 
            border-gray-200 font-body text-sm text-text-dark outline-none 
            focus:border-primary focus:ring-2 focus:ring-green-100"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {statusTabs.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`capitalize text-xs font-body font-medium px-3 
              py-2 rounded-lg transition-all duration-200
              ${
                filterStatus === status
                  ? 'bg-primary text-white'
                  : 'bg-bg-light text-gray-500 hover:bg-green-50 hover:text-primary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: 'Total Orders',
            value: orders.length,
            bg: 'bg-green-50',
            color: 'text-primary',
          },
          {
            label: 'Delivered',
            value: orders.filter((o) => o.status === 'delivered').length,
            bg: 'bg-blue-50',
            color: 'text-blue-500',
          },
          {
            label: 'In Progress',
            value: orders.filter(
              (o) => o.status === 'processing' || o.status === 'shipped'
            ).length,
            bg: 'bg-orange-50',
            color: 'text-carrot',
          },
          {
            label: 'Cancelled',
            value: orders.filter((o) => o.status === 'cancelled').length,
            bg: 'bg-red-50',
            color: 'text-tomato',
          },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
            <p className={`font-heading font-bold text-2xl ${s.color}`}>
              {s.value}
            </p>
            <p className="font-body text-gray-500 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Orders List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="font-heading font-semibold text-gray-400 text-lg">
            No orders found
          </p>
          <p className="font-body text-gray-400 text-sm mt-1">
            Try changing your search or filter
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
