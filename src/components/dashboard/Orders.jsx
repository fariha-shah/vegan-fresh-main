import { useState } from 'react';
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

// Mock data shaped exactly like the `orders` collection in the schema.
// Replace with: const { data } = await api.get("/orders")  -> GET /api/orders
const MOCK_ORDERS = [
  {
    _id: '1',
    orderNumber: 'VF-20260042',
    createdAt: '2026-06-18',
    orderStatus: 'delivered',
    paymentMethod: 'card',
    totalAmount: 1840,
    items: [
      { name: 'Fresh Tomato', quantity: 2, price: 260, image: '🍅' },
      { name: 'Fresh Carrot', quantity: 1, price: 200, image: '🥕' },
      { name: 'Fresh Spinach', quantity: 3, price: 460, image: '🥬' },
    ],
  },
  {
    _id: '2',
    orderNumber: 'VF-20260051',
    createdAt: '2026-06-21',
    orderStatus: 'shipped',
    paymentMethod: 'cod',
    totalAmount: 980,
    items: [
      { name: 'Fresh Broccoli', quantity: 2, price: 520, image: '🥦' },
      { name: 'Fresh Onion', quantity: 1, price: 200, image: '🧅' },
    ],
  },
  {
    _id: '3',
    orderNumber: 'VF-20260058',
    createdAt: '2026-06-22',
    orderStatus: 'processing',
    paymentMethod: 'card',
    totalAmount: 620,
    items: [
      { name: 'Fresh Yellow Pepper', quantity: 3, price: 620, image: '🫑' },
    ],
  },
  {
    _id: '4',
    orderNumber: 'VF-20260039',
    createdAt: '2026-06-10',
    orderStatus: 'cancelled',
    paymentMethod: 'card',
    totalAmount: 440,
    items: [{ name: 'Fresh Red Chili', quantity: 2, price: 440, image: '🌶️' }],
  },
];

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
      className="flex items-center gap-1.5 rounded-full px-3 py-1 font-inter text-xs font-medium"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      <Icon size={13} />
      {cfg.label}
    </span>
  );
};

const OrderCard = ({ order, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
      className="overflow-hidden rounded-card bg-white shadow-card"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:justify-between sm:p-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F5F5]">
            <Package size={18} className="text-[#2E7D32]" />
          </div>
          <div>
            <p className="font-poppins text-sm font-semibold text-[#2C3E50]">
              {order.orderNumber}
            </p>
            <p className="flex items-center gap-1 font-inter text-xs text-[#2C3E50]/50">
              <Calendar size={11} />
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              <span className="mx-1">·</span>
              <CreditCard size={11} />
              {order.paymentMethod === 'card' ? 'Card' : 'Cash on Delivery'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <StatusBadge status={order.orderStatus} />
          <p className="font-poppins text-sm font-semibold text-[#2E7D32]">
            Rs {order.totalAmount.toLocaleString()}
          </p>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown size={18} className="text-[#2C3E50]/40" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="border-t border-[#F5F5F5] px-5 py-4 sm:px-6">
              <ul className="space-y-2.5">
                {order.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between font-inter text-sm"
                  >
                    <span className="flex items-center gap-2 text-[#2C3E50]/80">
                      <span className="text-base">{item.image}</span>
                      {item.name}
                      <span className="text-[#2C3E50]/40">
                        × {item.quantity}
                      </span>
                    </span>
                    <span className="text-[#2C3E50]">Rs {item.price}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {(order.orderStatus === 'shipped' ||
                  order.orderStatus === 'processing') && (
                  <button className="rounded-xl bg-[#2E7D32] px-4 py-2 font-inter text-xs font-medium text-white transition-colors hover:bg-[#1B5E20]">
                    Track Order
                  </button>
                )}
                {order.orderStatus === 'delivered' && (
                  <button className="rounded-xl border border-[#2E7D32] px-4 py-2 font-inter text-xs font-medium text-[#2E7D32] transition-colors hover:bg-[#E8F5E9]">
                    Reorder
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Orders() {
  const [orders] = useState(MOCK_ORDERS);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-card bg-white p-12 text-center shadow-card">
        <Package size={36} className="mb-3 text-[#2C3E50]/20" />
        <p className="font-poppins text-base font-medium text-[#2C3E50]">
          No orders yet
        </p>
        <p className="mt-1 font-inter text-sm text-[#2C3E50]/50">
          Your fresh vegetable orders will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <OrderCard key={order._id} order={order} index={index} />
      ))}
    </div>
  );
}
