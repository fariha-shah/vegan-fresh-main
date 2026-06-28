import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/slices/cartSlice';

export default function CartPage() {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deliveryFee = totalAmount >= 50 ? 0 : 5;
  const tax = totalAmount * 0.05;
  const total = totalAmount + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-bg-light px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-poppins text-2xl font-semibold text-text-dark">
            Your Cart
          </h1>
          <Link
            to="/products"
            className="flex items-center gap-1.5 font-inter text-sm text-green-primary hover:underline"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        {/* Empty cart */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-card bg-white p-14 text-center shadow-card">
            <ShoppingCart size={40} className="mb-3 text-gray-300" />
            <p className="font-poppins text-base font-medium text-text-dark">
              Your cart is empty
            </p>
            <p className="mt-1 font-inter text-sm text-gray-400">
              Browse fresh vegetables and add a few to get started.
            </p>
            <Link
              to="/products"
              className="mt-5 rounded-xl bg-green-primary px-5 py-2.5 font-inter text-sm font-medium text-white transition-colors hover:bg-green-dark"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* Cart Items */}
            <div className="space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 bg-white rounded-card p-4 shadow-card"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-xl bg-green-pale flex items-center justify-center shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-poppins font-semibold text-sm text-text-dark truncate">
                        {item.name}
                      </p>
                      <p className="text-green-primary font-bold text-base mt-0.5">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 border-2 border-gray-200 rounded-xl px-3 py-1.5">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        className="w-7 h-7 rounded-lg border-2 border-green-primary text-green-primary font-bold flex items-center justify-center hover:bg-green-primary hover:text-white transition-all"
                      >
                        −
                      </button>
                      <span className="font-poppins font-bold text-sm min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="w-7 h-7 rounded-lg border-2 border-green-primary text-green-primary font-bold flex items-center justify-center hover:bg-green-primary hover:text-white transition-all"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="font-poppins font-bold text-sm text-text-dark min-w-[60px] text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-gray-300 hover:text-tomato transition-colors ml-1"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Clear cart */}
              <div className="flex justify-end">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-[13px] text-gray-400 hover:text-tomato transition-colors font-inter"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-card bg-white p-6 shadow-card lg:sticky lg:top-24 lg:self-start">
              <h3 className="font-poppins font-bold text-[17px] text-text-dark mb-5">
                Order Summary
              </h3>

              <div className="space-y-3 font-inter text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span
                    className={
                      deliveryFee === 0
                        ? 'text-green-primary font-semibold'
                        : ''
                    }
                  >
                    {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-[12px] text-carrot">
                    Add ${(50 - totalAmount).toFixed(2)} more for free delivery!
                  </p>
                )}
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-4 mt-4">
                <span className="font-poppins font-bold text-text-dark">
                  Total
                </span>
                <span className="font-poppins font-bold text-[18px] text-green-primary">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="mt-5 w-full flex items-center justify-center gap-2 bg-green-primary hover:bg-green-dark text-white font-poppins font-semibold text-sm py-3 rounded-xl transition-all duration-200 hover:shadow-hover"
              >
                Proceed to Checkout →
              </Link>

              <Link
                to="/products"
                className="mt-3 w-full flex items-center justify-center text-[13px] text-gray-400 hover:text-green-primary transition-colors font-inter"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
