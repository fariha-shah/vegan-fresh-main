// Fareeha client dashboard, cart, checkout system
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
}) {
  const dec = () => onChange(Math.max(min, quantity - 1));
  const inc = () => onChange(Math.min(max, quantity + 1));

  return (
    <div className="flex items-center rounded-xl border border-[#E0E0E0] bg-white">
      <button
        onClick={dec}
        disabled={quantity <= min}
        className="flex h-8 w-8 items-center justify-center rounded-l-xl text-[#2C3E50]/60 transition-colors hover:bg-[#F5F5F5] disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        <Minus size={13} />
      </button>

      <div className="flex h-8 w-9 items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={quantity}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="font-inter text-sm font-medium text-[#2C3E50]"
          >
            {quantity}
          </motion.span>
        </AnimatePresence>
      </div>

      <button
        onClick={inc}
        disabled={quantity >= max}
        className="flex h-8 w-8 items-center justify-center rounded-r-xl text-[#2C3E50]/60 transition-colors hover:bg-[#F5F5F5] disabled:opacity-30"
        aria-label="Increase quantity"
      >
        <Plus size={13} />
      </button>
    </div>
  );
}
