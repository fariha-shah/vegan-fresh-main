import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCcw,
  Calendar,
  Package,
  Pause,
  Play,
  Trash2,
  Plus,
  X,
  Leaf,
  Check,
} from "lucide-react";

// Replace with: GET /api/subscriptions (matches the `subscriptions` schema)
const INITIAL_SUBSCRIPTIONS = [
  {
    _id: "s1",
    plan: "weekly",
    boxType: "medium",
    deliveryDay: "Wednesday",
    price: 45,
    isActive: true,
    nextDelivery: "2026-06-25",
    vegetables: ["Tomato", "Spinach", "Carrot", "Onion"],
  },
  {
    _id: "s2",
    plan: "biweekly",
    boxType: "small",
    deliveryDay: "Friday",
    price: 28,
    isActive: false,
    nextDelivery: "2026-07-03",
    vegetables: ["Broccoli", "Cabbage"],
  },
];

const BOX_TYPES = [
  { key: "small", label: "Small Box", desc: "3-4 veggies · 1-2 people", price: 28 },
  { key: "medium", label: "Medium Box", desc: "6-8 veggies · 3-4 people", price: 45 },
  { key: "large", label: "Large Box", desc: "10-12 veggies · 5+ people", price: 65 },
];

const DAYS = ["Monday", "Wednesday", "Friday"];

function StatusToggle({ isActive, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
        isActive ? "bg-[#2E7D32]" : "bg-[#E0E0E0]"
      }`}
      aria-label="Toggle subscription status"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute h-5 w-5 rounded-full bg-white shadow-md"
        style={{ left: isActive ? 26 : 4 }}
      />
    </button>
  );
}

function SubscriptionCard({ sub, onToggle, onCancel }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className="rounded-card bg-white p-6 shadow-card"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9]">
            <RefreshCcw size={18} className="text-[#2E7D32]" />
          </div>
          <div>
            <p className="font-poppins text-sm font-semibold capitalize text-[#2C3E50]">
              {sub.plan} · {sub.boxType} box
            </p>
            <p className="flex items-center gap-1 font-inter text-xs text-[#2C3E50]/50">
              <Calendar size={11} />
              Delivers every {sub.deliveryDay}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 font-inter text-xs font-medium ${
              sub.isActive ? "bg-[#E8F5E9] text-[#2E7D32]" : "bg-[#F5F5F5] text-[#2C3E50]/50"
            }`}
          >
            {sub.isActive ? "Active" : "Paused"}
          </span>
          <StatusToggle isActive={sub.isActive} onToggle={() => onToggle(sub._id)} />
        </div>
      </div>

      {/* Vegetables included */}
      <div className="mt-4 flex flex-wrap gap-2">
        {sub.vegetables.map((veg) => (
          <span
            key={veg}
            className="flex items-center gap-1 rounded-full bg-[#F5F5F5] px-3 py-1 font-inter text-xs text-[#2C3E50]/70"
          >
            <Leaf size={11} className="text-[#2E7D32]" />
            {veg}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#F5F5F5] pt-4">
        <div className="font-inter text-sm text-[#2C3E50]/60">
          Next delivery:{" "}
          <span className="font-medium text-[#2C3E50]">
            {new Date(sub.nextDelivery).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-poppins text-sm font-semibold text-[#2E7D32]">
            ${sub.price}/box
          </span>
          <button
            onClick={() => onToggle(sub._id)}
            className="flex items-center gap-1.5 rounded-xl border border-[#E0E0E0] px-3 py-1.5 font-inter text-xs font-medium text-[#2C3E50]/70 transition-colors hover:bg-[#F5F5F5]"
          >
            {sub.isActive ? <Pause size={13} /> : <Play size={13} />}
            {sub.isActive ? "Pause" : "Resume"}
          </button>
          <button
            onClick={() => onCancel(sub._id)}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[#E53935] transition-colors hover:bg-[#FDECEA]"
            aria-label="Cancel subscription"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function NewSubscriptionModal({ onClose, onCreate }) {
  const [plan, setPlan] = useState("weekly");
  const [boxType, setBoxType] = useState("medium");
  const [day, setDay] = useState("Wednesday");

  const selectedBox = BOX_TYPES.find((b) => b.key === boxType);

  const handleCreate = () => {
    onCreate({
      _id: `s${Date.now()}`,
      plan,
      boxType,
      deliveryDay: day,
      price: selectedBox.price,
      isActive: true,
      nextDelivery: new Date(Date.now() + 7 * 86400000).toISOString(),
      vegetables: ["Tomato", "Cabbage", "Carrot"],
    });
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="w-full max-w-lg rounded-t-card bg-white p-6 shadow-card sm:rounded-card sm:p-8"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-poppins text-lg font-semibold text-[#2C3E50]">
            New Subscription
          </h3>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-[#F5F5F5]">
            <X size={18} className="text-[#2C3E50]/60" />
          </button>
        </div>

        {/* Plan toggle */}
        <p className="mb-2 font-inter text-xs font-medium text-[#2C3E50]/50">Delivery Plan</p>
        <div className="mb-5 flex gap-2">
          {["weekly", "biweekly"].map((p) => (
            <button
              key={p}
              onClick={() => setPlan(p)}
              className={`flex-1 rounded-xl py-2.5 font-inter text-sm font-medium capitalize transition-colors ${
                plan === p ? "bg-[#2E7D32] text-white" : "bg-[#F5F5F5] text-[#2C3E50]/60"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Box type */}
        <p className="mb-2 font-inter text-xs font-medium text-[#2C3E50]/50">Box Size</p>
        <div className="mb-5 space-y-2">
          {BOX_TYPES.map((box) => (
            <button
              key={box.key}
              onClick={() => setBoxType(box.key)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                boxType === box.key
                  ? "border-[#2E7D32] bg-[#E8F5E9]"
                  : "border-[#E0E0E0] hover:bg-[#F5F5F5]"
              }`}
            >
              <div>
                <p className="font-inter text-sm font-medium text-[#2C3E50]">{box.label}</p>
                <p className="font-inter text-xs text-[#2C3E50]/50">{box.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-poppins text-sm font-semibold text-[#2E7D32]">
                  ${box.price}
                </span>
                {boxType === box.key && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                    <Check size={12} />
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Delivery day */}
        <p className="mb-2 font-inter text-xs font-medium text-[#2C3E50]/50">Delivery Day</p>
        <div className="mb-6 flex gap-2">
          {DAYS.map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`flex-1 rounded-xl py-2.5 font-inter text-xs font-medium transition-colors ${
                day === d ? "bg-[#2E7D32] text-white" : "bg-[#F5F5F5] text-[#2C3E50]/60"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <button
          onClick={handleCreate}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2E7D32] py-3 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1B5E20]"
        >
          <Package size={15} />
          Start Subscription · ${selectedBox.price}/{plan === "weekly" ? "week" : "2 weeks"}
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Subscriptions() {
  const [subs, setSubs] = useState(INITIAL_SUBSCRIPTIONS);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = (id) => {
    // Replace with: PUT /api/subscriptions/:id { isActive: !current }
    setSubs((prev) => prev.map((s) => (s._id === id ? { ...s, isActive: !s.isActive } : s)));
  };

  const handleCancel = (id) => {
    // Replace with: DELETE /api/subscriptions/:id
    setSubs((prev) => prev.filter((s) => s._id !== id));
  };

  const handleCreate = (newSub) => {
    // Replace with: POST /api/subscriptions
    setSubs((prev) => [newSub, ...prev]);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="font-inter text-sm text-[#2C3E50]/50">
          {subs.length} active {subs.length === 1 ? "subscription" : "subscriptions"}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 rounded-xl bg-[#2E7D32] px-4 py-2.5 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1B5E20]"
        >
          <Plus size={15} />
          New Subscription
        </button>
      </div>

      {subs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-card bg-white p-12 text-center shadow-card">
          <RefreshCcw size={36} className="mb-3 text-[#2C3E50]/20" />
          <p className="font-poppins text-base font-medium text-[#2C3E50]">
            No subscriptions yet
          </p>
          <p className="mt-1 font-inter text-sm text-[#2C3E50]/50">
            Start a weekly or biweekly veggie box and never run out of fresh produce.
          </p>
        </div>
      ) : (
        <motion.div layout className="space-y-4">
          <AnimatePresence>
            {subs.map((sub) => (
              <SubscriptionCard
                key={sub._id}
                sub={sub}
                onToggle={handleToggle}
                onCancel={handleCancel}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {showModal && (
          <NewSubscriptionModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
        )}
      </AnimatePresence>
    </div>
  );
}