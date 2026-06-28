import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  CreditCard,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
// SAHI
import { clearCart } from '../../store/slices/cartSlice';

const STEPS = [
  { key: 'address', label: 'Address', icon: MapPin },
  { key: 'payment', label: 'Payment', icon: CreditCard },
  { key: 'review', label: 'Review', icon: ClipboardCheck },
];

function StepIndicator({ activeIndex }) {
  return (
    <div className="mb-8 flex items-center">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const reached = i <= activeIndex;
        return (
          <div
            key={step.key}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{ scale: i === activeIndex ? 1.08 : 1 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2"
                style={{
                  backgroundColor: reached ? '#2E7D32' : '#FFFFFF',
                  borderColor: reached ? '#2E7D32' : '#E0E0E0',
                }}
              >
                <Icon size={16} color={reached ? '#FFFFFF' : '#2C3E50'} />
              </motion.div>
              <span
                className="font-inter text-xs font-medium"
                style={{ color: reached ? '#2E7D32' : '#2C3E50aa' }}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-2 h-0.5 flex-1 rounded-full bg-[#F5F5F5]">
                <motion.div
                  className="h-0.5 rounded-full bg-[#2E7D32]"
                  initial={{ width: 0 }}
                  animate={{ width: i < activeIndex ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ReviewStep({ address, payment, items, total }) {
  return (
    <div className="space-y-5">
      <h3 className="flex items-center gap-2 font-poppins text-base font-semibold text-[#2C3E50]">
        <ClipboardCheck size={17} className="text-[#2E7D32]" />
        Review Your Order
      </h3>

      <div className="rounded-xl bg-[#F5F5F5] p-4">
        <p className="mb-1 font-inter text-xs font-medium text-[#2C3E50]/50">
          Deliver to
        </p>
        <p className="font-inter text-sm text-[#2C3E50]">
          {address.street}, {address.city}, {address.state} {address.zip},{' '}
          {address.country}
        </p>
        <p className="font-inter text-sm text-[#2C3E50]/70">{address.phone}</p>
      </div>

      <div className="rounded-xl bg-[#F5F5F5] p-4">
        <p className="mb-1 font-inter text-xs font-medium text-[#2C3E50]/50">
          Payment
        </p>
        <p className="font-inter text-sm text-[#2C3E50]">
          {payment.method === 'card'
            ? `Card ending •••• ${payment.cardNumber?.slice(-4) || '----'}`
            : 'Cash on Delivery'}
        </p>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between font-inter text-sm"
          >
            <span className="text-[#2C3E50]/80">
              {item.name} × {item.quantity}
            </span>
            <span className="text-[#2C3E50]">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-t border-[#E0E0E0] pt-3">
        <span className="font-poppins text-sm font-semibold text-[#2C3E50]">
          Total
        </span>
        <span className="font-poppins text-base font-semibold text-[#2E7D32]">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default function CheckoutForm({ items, total }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [placing, setPlacing] = useState(false);

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'Pakistan',
    phone: '',
  });
  const [payment, setPayment] = useState({ method: 'card' });

  const currentKey = STEPS[stepIndex].key;

  const canGoNext = () => {
    if (currentKey === 'address') {
      return address.street && address.city && address.phone;
    }
    if (currentKey === 'payment') {
      return (
        payment.method === 'cod' ||
        (payment.cardNumber && payment.expiry && payment.cvc)
      );
    }
    return true;
  };

  const handleNext = () =>
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const handleBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const handlePlaceOrder = () => {
    // Replace with: POST /api/orders, then POST /api/payments/create-intent if card
    setPlacing(true);
    setTimeout(() => {
      const orderNumber = `VF-${Math.floor(20260000 + Math.random() * 9999)}`;
      dispatch(clearCart());
      navigate('/order-confirmation', {
        state: { orderNumber, address, payment, items, total },
      });
    }, 1200);
  };

  return (
    <div className="rounded-card bg-white p-6 shadow-card sm:p-8">
      <StepIndicator activeIndex={stepIndex} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentKey}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {currentKey === 'address' && (
            <AddressForm address={address} onChange={setAddress} />
          )}
          {currentKey === 'payment' && (
            <PaymentForm payment={payment} onChange={setPayment} />
          )}
          {currentKey === 'review' && (
            <ReviewStep
              address={address}
              payment={payment}
              items={items}
              total={total}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={stepIndex === 0}
          className="flex items-center gap-1.5 rounded-xl border border-[#E0E0E0] px-4 py-2.5 font-inter text-sm font-medium text-[#2C3E50]/70 transition-colors hover:bg-[#F5F5F5] disabled:opacity-0"
        >
          <ChevronLeft size={15} />
          Back
        </button>

        {currentKey !== 'review' ? (
          <button
            onClick={handleNext}
            disabled={!canGoNext()}
            className="flex items-center gap-1.5 rounded-xl bg-[#2E7D32] px-5 py-2.5 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1B5E20] disabled:opacity-40"
          >
            Continue
            <ChevronRight size={15} />
          </button>
        ) : (
          <button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="flex items-center gap-2 rounded-xl bg-[#2E7D32] px-5 py-2.5 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1B5E20] disabled:opacity-70"
          >
            {placing ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Placing Order...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
