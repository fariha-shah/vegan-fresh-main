// Fareeha client dashboard, cart, checkout system
import { useState } from 'react';
import { motion } from 'framer-motion';
import LiveMap from './LiveMap';
import {
  Package,
  Loader2,
  Truck,
  CheckCircle2,
  MapPin,
  CalendarClock,
  PhoneCall,
} from 'lucide-react';

const MOCK_TRACKED_ORDERS = [
  {
    _id: '2',
    orderNumber: 'VF-20260051',
    orderStatus: 'shipped',
    tracking: {
      estimatedDelivery: '2026-06-24',
      currentLocation: 'Out for delivery — near Saddar, Rawalpindi',
    },
    rider: { name: 'Bilal Ahmed', phone: '+92 300 1234567' },
  },
  {
    _id: '3',
    orderNumber: 'VF-20260058',
    orderStatus: 'processing',
    tracking: {
      estimatedDelivery: '2026-06-25',
      currentLocation: 'Being packed at Vegan Fresh warehouse',
    },
    rider: null,
  },
];

const STAGES = [
  { key: 'pending', label: 'Order Placed', icon: Package },
  { key: 'processing', label: 'Processing', icon: Loader2 },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

const stageIndex = (status) => STAGES.findIndex((s) => s.key === status);

function StatusStepper({ status }) {
  const activeIndex = stageIndex(status);
  const progressPercent = (activeIndex / (STAGES.length - 1)) * 100;

  return (
    <div className="relative pt-2">
      {/* Track line */}
      <div className="absolute left-0 top-[27px] h-1 w-full rounded-full bg-[#F5F5F5]" />
      {/* Animated fill */}
      <motion.div
        className="absolute left-0 top-[27px] h-1 rounded-full bg-[#2E7D32]"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercent}%` }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      <div className="relative flex justify-between">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isDone = i < activeIndex;
          const isActive = i === activeIndex;
          const reached = i <= activeIndex;

          return (
            <div
              key={stage.key}
              className="flex flex-col items-center gap-2"
              style={{ width: 80 }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ duration: 0.4 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-white"
                style={{
                  backgroundColor: reached ? '#2E7D32' : '#FFFFFF',
                  borderColor: reached ? '#2E7D32' : '#E0E0E0',
                }}
              >
                <Icon
                  size={18}
                  className={
                    isActive && stage.key === 'processing' ? 'animate-spin' : ''
                  }
                  style={{ color: reached ? '#FFFFFF' : '#2C3E50' }}
                  strokeWidth={2}
                />
              </motion.div>
              <span
                className="text-center font-inter text-xs font-medium"
                style={{ color: reached ? '#2E7D32' : '#2C3E50aa' }}
              >
                {stage.label}
              </span>
              {isDone && <CheckCircle2 size={12} className="text-[#2E7D32]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Tracking() {
  const [orders] = useState(MOCK_TRACKED_ORDERS);
  const [selectedId, setSelectedId] = useState(MOCK_TRACKED_ORDERS[0]?._id);

  const order = orders.find((o) => o._id === selectedId);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center rounded-card bg-white p-12 text-center shadow-card">
        <Truck size={36} className="mb-3 text-[#2C3E50]/20" />
        <p className="font-poppins text-base font-medium text-[#2C3E50]">
          No active orders to track
        </p>
        <p className="mt-1 font-inter text-sm text-[#2C3E50]/50">
          Once you place an order, you'll be able to follow it here in real
          time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Order selector */}
      {orders.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {orders.map((o) => (
            <button
              key={o._id}
              onClick={() => setSelectedId(o._id)}
              className={`rounded-xl px-4 py-2 font-inter text-xs font-medium transition-colors ${
                o._id === selectedId
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-white text-[#2C3E50]/60 hover:bg-[#F5F5F5]'
              }`}
            >
              {o.orderNumber}
            </button>
          ))}
        </div>
      )}

      {/* Stepper card */}
      <div className="rounded-card bg-white p-6 shadow-card sm:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-poppins text-base font-semibold text-[#2C3E50]">
            {order.orderNumber}
          </h3>
          <span className="flex items-center gap-1.5 rounded-full bg-[#E8F5E9] px-3 py-1 font-inter text-xs font-medium text-[#2E7D32]">
            <CalendarClock size={13} />
            Est. delivery{' '}
            {new Date(order.tracking.estimatedDelivery).toLocaleDateString(
              'en-US',
              {
                month: 'short',
                day: 'numeric',
              }
            )}
          </span>
        </div>

        <StatusStepper status={order.orderStatus} />
      </div>

      {/* Live location + map placeholder */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-card bg-white p-6 shadow-card">
          <p className="mb-3 flex items-center gap-2 font-poppins text-sm font-semibold text-[#2C3E50]">
            <MapPin size={16} className="text-[#2E7D32]" />
            Current Status
          </p>
          <p className="font-inter text-sm text-[#2C3E50]/70">
            {order.tracking.currentLocation}
          </p>

          {order.rider && (
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#F5F5F5] px-4 py-3">
              <div>
                <p className="font-inter text-xs text-[#2C3E50]/50">
                  Delivery Rider
                </p>
                <p className="font-inter text-sm font-medium text-[#2C3E50]">
                  {order.rider.name}
                </p>
              </div>
              <a
                href={`tel:${order.rider.phone}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2E7D32] text-white transition-transform hover:scale-105"
                aria-label="Call rider"
              >
                <PhoneCall size={15} />
              </a>
            </div>
          )}
        </div>

        {/* Live map — animates a simulated rider position now, swap ROUTE in
            LiveMap.jsx for real coordinates once Socket.io tracking is live */}
        <div className="shadow-card">
          <LiveMap active={order.orderStatus === 'shipped'} height={220} />
        </div>
      </div>
    </div>
  );
}
