// Fareeha client dashboard, cart, checkout system
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Lock } from 'lucide-react';

// NOTE: This is a styled UI shell for the card fields. When Ayesh's Stripe
// integration is ready, swap the three inputs below for Stripe Elements:
//   import { CardElement } from "@stripe/react-stripe-js";
//   <CardElement options={{ style: { base: { fontFamily: "Inter, sans-serif" } } }} />
// and submit via stripe.confirmCardPayment(clientSecret) against
// POST /api/payments/create-intent.

const Input = ({ label, ...props }) => (
  <div>
    <label className="mb-1.5 block font-inter text-xs font-medium text-[#2C3E50]/50">
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-xl border border-[#E0E0E0] bg-white px-4 py-2.5 font-inter text-sm text-[#2C3E50] outline-none transition-colors focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/15"
    />
  </div>
);

export default function PaymentForm({ payment, onChange }) {
  const set = (field) => (e) =>
    onChange({ ...payment, [field]: e.target.value });
  const setMethod = (method) => onChange({ ...payment, method });

  return (
    <div className="space-y-5">
      <h3 className="flex items-center gap-2 font-poppins text-base font-semibold text-[#2C3E50]">
        <CreditCard size={17} className="text-[#2E7D32]" />
        Payment Method
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => setMethod('card')}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
            payment.method === 'card'
              ? 'border-[#2E7D32] bg-[#E8F5E9]'
              : 'border-[#E0E0E0] hover:bg-[#F5F5F5]'
          }`}
        >
          <CreditCard size={18} className="text-[#2E7D32]" />
          <div>
            <p className="font-inter text-sm font-medium text-[#2C3E50]">
              Card
            </p>
            <p className="font-inter text-xs text-[#2C3E50]/50">
              Visa, Mastercard via Stripe
            </p>
          </div>
        </button>

        <button
          onClick={() => setMethod('cod')}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
            payment.method === 'cod'
              ? 'border-[#2E7D32] bg-[#E8F5E9]'
              : 'border-[#E0E0E0] hover:bg-[#F5F5F5]'
          }`}
        >
          <Wallet size={18} className="text-[#2E7D32]" />
          <div>
            <p className="font-inter text-sm font-medium text-[#2C3E50]">
              Cash on Delivery
            </p>
            <p className="font-inter text-xs text-[#2C3E50]/50">
              Pay when it arrives
            </p>
          </div>
        </button>
      </div>

      {payment.method === 'card' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.25 }}
          className="space-y-4 overflow-hidden"
        >
          <Input
            label="Card Number"
            placeholder="4242 4242 4242 4242"
            value={payment.cardNumber || ''}
            onChange={set('cardNumber')}
            maxLength={19}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry (MM/YY)"
              placeholder="12/28"
              value={payment.expiry || ''}
              onChange={set('expiry')}
              maxLength={5}
            />
            <Input
              label="CVC"
              placeholder="123"
              value={payment.cvc || ''}
              onChange={set('cvc')}
              maxLength={3}
            />
          </div>
          <p className="flex items-center gap-1.5 font-inter text-xs text-[#2C3E50]/40">
            <Lock size={11} />
            Payments are securely processed by Stripe — card details never touch
            our servers.
          </p>
        </motion.div>
      )}
    </div>
  );
}
