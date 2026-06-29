import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  ChevronDown,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { useState } from 'react';

const STATUS_CONFIG = {
  pending: { label: 'Pending', icon: Clock, color: '#F57C00', bg: '#FFF3E0' },
  processing: {
    label: 'Processing',
    icon: RotateCcw,
    color: '#F57C00',
    bg: '#FFF3E0',
  },
  shipped: { label: 'Shipped', icon: Truck, color: '#2E7D32', bg: '#E8F5E9' },
  delivered: {
    label: 'Delivered',
    icon: CheckCircle2,
    color: '#2E7D32',
    bg: '#E8F5E9',
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    color: '#E53935',
    bg: '#FDECEA',
  },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = cfg.icon;

  return (
    <span
      className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      <Icon size={13} />
      {cfg.label}
    </span>
  );
};

const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div className="rounded-xl bg-white shadow">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5"
      >
        <div>
          <p className="font-semibold">{order.orderNumber}</p>
          <p className="text-xs text-gray-500">
            {new Date(order.createdAt).toDateString()} · {order.paymentMethod}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={order.orderStatus} />
          <p className="font-semibold text-green-700">Rs {order.totalAmount}</p>
          <ChevronDown className={`transition ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="border-t p-5">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>Rs {item.price}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Orders() {
  const orders = useSelector((state) => state.orders.orders);

  if (!orders.length) {
    return (
      <div className="p-10 text-center">
        <Package className="mx-auto mb-3 text-gray-300" size={40} />
        <p>No orders yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
