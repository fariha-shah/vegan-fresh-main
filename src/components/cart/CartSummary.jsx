// Fareeha client dashboard, cart, checkout system
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Tag, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

const FREE_DELIVERY_THRESHOLD = 50;
const DELIVERY_FEE = 5;
const TAX_RATE = 0.05;

const MOCK_COUPONS = { FRESH10: 0.1, VEGAN20: 0.2 };

export default function CartSummary({ items }) {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(null);

  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const tax = subtotal * TAX_RATE;
  const discountRate =
    applied && applied !== 'invalid' ? applied.discountRate : 0;
  const discount = subtotal * discountRate;
  const total = subtotal + deliveryFee + tax - discount;

  const handleApplyCoupon = () => {
    const upper = code.trim().toUpperCase();
    if (MOCK_COUPONS[upper]) {
      setApplied({ code: upper, discountRate: MOCK_COUPONS[upper] });
    } else {
      setApplied('invalid');
    }
  };

  return (
    <div className="rounded-card bg-white p-6 shadow-card sm:p-7">
      <h3 className="mb-5 font-poppins text-base font-semibold text-[#2C3E50]">
        Order Summary
      </h3>

      <div className="space-y-3 font-inter text-sm">
        <div className="flex justify-between text-[#2C3E50]/70">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#2C3E50]/70">
          <span>Delivery Fee</span>
          <span>
            {deliveryFee === 0 ? (
              <span className="text-[#2E7D32]">Free</span>
            ) : (
              `$${deliveryFee.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between text-[#2C3E50]/70">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-[#2E7D32]">
            <span>Discount ({applied.code})</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD && (
        <p className="mt-3 rounded-xl bg-[#FFF3E0] px-3 py-2 font-inter text-xs text-[#F57C00]">
          Add ${(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} more for free
          delivery
        </p>
      )}

      {/* Coupon */}
      <div className="mt-5">
        <label className="mb-1.5 flex items-center gap-1.5 font-inter text-xs font-medium text-[#2C3E50]/50">
          <Tag size={12} />
          Coupon Code
        </label>
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setApplied(null);
            }}
            placeholder="e.g. FRESH10"
            className="flex-1 rounded-xl border border-[#E0E0E0] bg-white px-3 py-2 font-inter text-sm text-[#2C3E50] outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/15"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={!code.trim()}
            className="rounded-xl bg-[#2C3E50] px-4 py-2 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1f2d3a] disabled:opacity-40"
          >
            Apply
          </button>
        </div>

        {applied === 'invalid' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 flex items-center gap-1 font-inter text-xs text-[#E53935]"
          >
            <XCircle size={12} />
            Invalid or expired coupon
          </motion.p>
        )}
        {applied && applied !== 'invalid' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 flex items-center gap-1 font-inter text-xs text-[#2E7D32]"
          >
            <CheckCircle2 size={12} />
            {applied.code} applied — {Math.round(applied.discountRate * 100)}%
            off
          </motion.p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#F5F5F5] pt-4">
        <span className="font-poppins text-base font-semibold text-[#2C3E50]">
          Total
        </span>
        <span className="font-poppins text-lg font-semibold text-[#2E7D32]">
          ${total.toFixed(2)}
        </span>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        disabled={items.length === 0}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2E7D32] py-3 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1B5E20] disabled:opacity-40"
      >
        Proceed to Checkout
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
