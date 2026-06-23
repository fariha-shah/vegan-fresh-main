import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';

export default function CheckoutPage() {
  const items = useSelector((state) => state.cart.items);

  // No checking out with an empty cart.
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const deliveryFee = subtotal >= 50 ? 0 : 5;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 font-poppins text-2xl font-semibold text-[#2C3E50]">
          Checkout
        </h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <CheckoutForm items={items} total={total} />

          {/* Compact read-only order summary */}
          <div className="rounded-card bg-white p-6 shadow-card lg:sticky lg:top-8 lg:self-start">
            <h3 className="mb-4 font-poppins text-sm font-semibold text-[#2C3E50]">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </h3>
            <div className="space-y-2.5">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between font-inter text-sm"
                >
                  <span className="text-[#2C3E50]/70">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="text-[#2C3E50]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-[#F5F5F5] pt-3 font-inter text-sm text-[#2C3E50]/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-[#F5F5F5] pt-3">
              <span className="font-poppins text-sm font-semibold text-[#2C3E50]">
                Total
              </span>
              <span className="font-poppins text-base font-semibold text-[#2E7D32]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
