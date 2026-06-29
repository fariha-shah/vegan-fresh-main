import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';

export default function CheckoutPage() {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // 🔒 LOGIN GUARD
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: '/checkout' }} />;
  }

  // 🛒 CART CHECK
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const deliveryFee = totalAmount >= 50 ? 0 : 5;
  const tax = totalAmount * 0.05;
  const total = totalAmount + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-bg-light px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 font-poppins text-2xl font-semibold text-text-dark">
          Checkout
        </h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <CheckoutForm items={items} total={total} />

          {/* Order Summary */}
          <div className="rounded-card bg-white p-6 shadow-card lg:sticky lg:top-24 lg:self-start">
            <h3 className="mb-4 font-poppins text-sm font-semibold text-text-dark">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </h3>

            <div className="space-y-2.5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-text-dark">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t pt-3 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee}`}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-3 flex justify-between border-t pt-3">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-green-primary">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
