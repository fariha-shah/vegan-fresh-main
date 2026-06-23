import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-poppins text-2xl font-semibold text-[#2C3E50]">
            Your Cart
          </h1>
          <Link
            to="/"
            className="flex items-center gap-1.5 font-inter text-sm text-[#2E7D32] hover:underline"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-card bg-white p-14 text-center shadow-card">
            <ShoppingCart size={40} className="mb-3 text-[#2C3E50]/20" />
            <p className="font-poppins text-base font-medium text-[#2C3E50]">
              Your cart is empty
            </p>
            <p className="mt-1 font-inter text-sm text-[#2C3E50]/50">
              Browse fresh vegetables and add a few to get started.
            </p>
            <Link
              to="/"
              className="mt-5 rounded-xl bg-[#2E7D32] px-5 py-2.5 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1B5E20]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <motion.div layout className="space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="lg:sticky lg:top-8 lg:self-start">
              <CartSummary items={items} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
