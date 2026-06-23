import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Package,
  MapPin,
  CreditCard,
  ArrowRight,
  Home,
  Truck,
  Leaf,
} from 'lucide-react';

// Small floating leaves for a subtle celebratory feel without a full confetti
// library — kept restrained so it still reads as "professional," not gimmicky.
function FloatingLeaves() {
  const leaves = Array.from({ length: 8 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {leaves.map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-lg"
          style={{ left: `${10 + i * 11}%`, top: '55%' }}
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], y: -120, rotate: 180 }}
          transition={{ duration: 2.2, delay: i * 0.12, ease: 'easeOut' }}
        >
          🍃
        </motion.span>
      ))}
    </div>
  );
}

export default function OrderConfirmationPage() {
  const location = useLocation();
  const state = location.state;

  // Someone navigated here directly without placing an order — no data to show.
  if (!state) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F5F5] px-4 text-center">
        <Package size={40} className="mb-3 text-[#2C3E50]/20" />
        <p className="font-poppins text-base font-medium text-[#2C3E50]">
          No order found
        </p>
        <p className="mt-1 font-inter text-sm text-[#2C3E50]/50">
          Place an order from your cart to see a confirmation here.
        </p>
        <Link
          to="/"
          className="mt-5 rounded-xl bg-[#2E7D32] px-5 py-2.5 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1B5E20]"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  const { orderNumber, address, payment, items, total } = state;
  const estimatedDate = new Date(Date.now() + 2 * 86400000).toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Success header */}
        <div className="relative mb-8 flex flex-col items-center rounded-card bg-white px-6 py-10 text-center shadow-card">
          <FloatingLeaves />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
              delay: 0.1,
            }}
            className="relative z-10 mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F5E9]"
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.35,
                type: 'spring',
                stiffness: 300,
                damping: 16,
              }}
            >
              <CheckCircle2 size={42} className="text-[#2E7D32]" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 font-poppins text-2xl font-semibold text-[#2C3E50]"
          >
            Order Placed Successfully!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 mt-2 font-inter text-sm text-[#2C3E50]/60"
          >
            Thank you — your fresh vegetables are on their way.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="relative z-10 mt-4 rounded-full bg-[#F5F5F5] px-4 py-1.5 font-inter text-sm font-medium text-[#2C3E50]"
          >
            Order #{orderNumber}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-5"
        >
          {/* Delivery estimate */}
          <div className="flex items-center gap-4 rounded-card bg-white p-5 shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9]">
              <Truck size={18} className="text-[#2E7D32]" />
            </div>
            <div>
              <p className="font-poppins text-sm font-semibold text-[#2C3E50]">
                Estimated Delivery
              </p>
              <p className="font-inter text-sm text-[#2C3E50]/60">
                {estimatedDate}
              </p>
            </div>
          </div>

          {/* Address + payment */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-card bg-white p-5 shadow-card">
              <p className="mb-2 flex items-center gap-1.5 font-inter text-xs font-medium text-[#2C3E50]/50">
                <MapPin size={12} />
                Delivery Address
              </p>
              <p className="font-inter text-sm text-[#2C3E50]">
                {address.street}, {address.city}, {address.state} {address.zip}
              </p>
            </div>
            <div className="rounded-card bg-white p-5 shadow-card">
              <p className="mb-2 flex items-center gap-1.5 font-inter text-xs font-medium text-[#2C3E50]/50">
                <CreditCard size={12} />
                Payment Method
              </p>
              <p className="font-inter text-sm text-[#2C3E50]">
                {payment.method === 'card'
                  ? `Card ending •••• ${payment.cardNumber?.slice(-4) || '----'}`
                  : 'Cash on Delivery'}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="rounded-card bg-white p-5 shadow-card">
            <p className="mb-3 flex items-center gap-1.5 font-poppins text-sm font-semibold text-[#2C3E50]">
              <Package size={15} className="text-[#2E7D32]" />
              Items Ordered
            </p>
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between font-inter text-sm"
                >
                  <span className="flex items-center gap-2 text-[#2C3E50]/80">
                    <Leaf size={12} className="text-[#2E7D32]" />
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="text-[#2C3E50]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between border-t border-[#F5F5F5] pt-3">
              <span className="font-poppins text-sm font-semibold text-[#2C3E50]">
                Total Paid
              </span>
              <span className="font-poppins text-base font-semibold text-[#2E7D32]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/dashboard/tracking"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2E7D32] py-3 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1B5E20]"
            >
              Track Order
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E0E0E0] py-3 font-inter text-sm font-medium text-[#2C3E50]/70 transition-colors hover:bg-white"
            >
              <Home size={15} />
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
