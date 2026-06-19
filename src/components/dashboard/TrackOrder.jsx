import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Search,
  XCircle,
  ShoppingBag,
  RefreshCw,
} from 'lucide-react';

const steps = [
  {
    id: 1,
    label: 'Order Placed',
    desc: 'Your order has been received',
    icon: ShoppingBag,
  },
  {
    id: 2,
    label: 'Processing',
    desc: 'We are preparing your vegetables',
    icon: Package,
  },
  {
    id: 3,
    label: 'Shipped',
    desc: 'Your order is on the way',
    icon: Truck,
  },
  {
    id: 4,
    label: 'Delivered',
    desc: 'Order delivered successfully',
    icon: CheckCircle,
  },
];

const getStepIndex = (status) => {
  switch (status) {
    case 'pending':
      return 0;
    case 'processing':
      return 1;
    case 'shipped':
      return 2;
    case 'delivered':
      return 3;
    default:
      return 0;
  }
};

const statusConfig = {
  delivered: {
    color: 'text-primary',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  shipped: {
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  processing: {
    color: 'text-carrot',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  pending: {
    color: 'text-gray-500',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
};

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.orders);
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelected] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!search.trim()) {
      setError('Please enter an Order ID');
      return;
    }
    const found = orders.find(
      (o) => o.id.toLowerCase() === search.toLowerCase()
    );
    if (found) {
      setSelected(found);
      setError('');
    } else {
      setSelected(null);
      setError(`No order found with ID "${search}"`);
    }
  };

  const activeStep = selectedOrder ? getStepIndex(selectedOrder.status) : -1;
  const config = selectedOrder ? statusConfig[selectedOrder.status] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-heading font-bold text-2xl text-text-dark">
          Track Order
        </h2>
        <p className="font-body text-gray-400 text-sm mt-1">
          Enter your Order ID to see real-time status
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <label className="font-body font-medium text-text-dark text-sm mb-2 block">
          Enter Order ID
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 
            w-4 h-4 text-gray-400"
            />
            <input
              type="text"
              placeholder="e.g. ORD-001"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 
              font-body text-sm text-text-dark outline-none focus:border-primary 
              focus:ring-2 focus:ring-green-100"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary-dark text-white font-body 
            font-medium text-sm px-6 py-3 rounded-xl transition-colors duration-200
            flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Track
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="font-body text-tomato text-sm mt-2 flex items-center gap-1">
            ⚠️ {error}
          </p>
        )}

        {/* Quick Select Hint */}
        <div className="mt-4 flex flex-wrap gap-2">
          <p className="font-body text-gray-400 text-xs self-center">
            Quick select:
          </p>
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setSearch(o.id);
                setError('');
              }}
              className="text-xs font-body font-medium px-3 py-1.5 
              bg-bg-light hover:bg-green-50 hover:text-primary text-gray-500 
              rounded-lg transition"
            >
              {o.id}
            </button>
          ))}
        </div>
      </div>

      {/* Order Result */}
      {selectedOrder && (
        <>
          {/* Order Info Card */}
          <div
            className={`bg-white rounded-2xl shadow-sm border 
          ${config.border} p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-text-dark text-lg">
                  {selectedOrder.id}
                </h3>
                <p className="font-body text-gray-400 text-sm mt-0.5">
                  Ordered on {selectedOrder.date} · {selectedOrder.items.length}{' '}
                  items
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs 
                font-body font-medium px-3 py-1.5 rounded-full capitalize
                ${config.bg} ${config.color}`}
                >
                  {selectedOrder.status}
                </span>
                <p className="font-heading font-bold text-primary text-xl mt-1">
                  ${selectedOrder.total}
                </p>
              </div>
            </div>

            {/* Delivery Info */}
            <div
              className="flex items-center gap-2 bg-bg-light 
            rounded-xl px-4 py-3"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <p className="font-body text-sm text-text-dark">
                Delivering to:{' '}
                <span className="font-medium">
                  House 12, Street 4, Peshawar
                </span>
              </p>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-heading font-semibold text-text-dark text-lg mb-8">
              Order Progress
            </h3>

            {selectedOrder.status === 'cancelled' ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 bg-red-50 rounded-full flex 
                items-center justify-center mx-auto mb-3"
                >
                  <XCircle className="w-8 h-8 text-tomato" />
                </div>
                <p className="font-heading font-bold text-tomato text-lg">
                  Order Cancelled
                </p>
                <p className="font-body text-gray-400 text-sm mt-1">
                  This order has been cancelled
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Progress Bar */}
                <div
                  className="hidden sm:flex items-center justify-between 
                relative mb-8"
                >
                  {/* Background Line */}
                  <div
                    className="absolute top-6 left-0 right-0 h-1 
                  bg-gray-200 z-0"
                  />
                  {/* Active Line */}
                  <div
                    className="absolute top-6 left-0 h-1 bg-primary 
                    z-0 transition-all duration-500"
                    style={{
                      width: `${(activeStep / (steps.length - 1)) * 100}%`,
                    }}
                  />

                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index <= activeStep;
                    const isActive = index === activeStep;

                    return (
                      <div
                        key={step.id}
                        className="flex flex-col items-center z-10 flex-1"
                      >
                        {/* Icon Circle */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center 
                        justify-center border-2 transition-all duration-300
                        ${
                          isCompleted
                            ? 'bg-primary border-primary shadow-md shadow-green-200'
                            : 'bg-white border-gray-200'
                        }`}
                        >
                          <Icon
                            className={`w-5 h-5 
                          ${isCompleted ? 'text-white' : 'text-gray-300'}`}
                          />
                        </div>

                        {/* Label */}
                        <p
                          className={`font-body font-medium text-xs mt-3 
                        text-center
                        ${
                          isActive
                            ? 'text-primary font-semibold'
                            : isCompleted
                              ? 'text-text-dark'
                              : 'text-gray-400'
                        }`}
                        >
                          {step.label}
                        </p>
                        <p
                          className="font-body text-gray-400 text-xs 
                        text-center mt-0.5 hidden md:block"
                        >
                          {step.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Progress — Vertical */}
                <div className="sm:hidden space-y-4">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index <= activeStep;
                    const isActive = index === activeStep;

                    return (
                      <div key={step.id} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex 
                          items-center justify-center border-2
                          ${
                            isCompleted
                              ? 'bg-primary border-primary'
                              : 'bg-white border-gray-200'
                          }`}
                          >
                            <Icon
                              className={`w-4 h-4 
                            ${isCompleted ? 'text-white' : 'text-gray-300'}`}
                            />
                          </div>
                          {index < steps.length - 1 && (
                            <div
                              className={`w-0.5 h-8 mt-1
                            ${index < activeStep ? 'bg-primary' : 'bg-gray-200'}`}
                            />
                          )}
                        </div>
                        <div className="pt-2">
                          <p
                            className={`font-body font-medium text-sm
                          ${
                            isActive
                              ? 'text-primary'
                              : isCompleted
                                ? 'text-text-dark'
                                : 'text-gray-400'
                          }`}
                          >
                            {step.label}
                          </p>
                          <p className="font-body text-gray-400 text-xs mt-0.5">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ETA Banner */}
                <div
                  className="mt-6 bg-green-50 border border-green-200 
                rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-body font-medium text-primary text-sm">
                      {selectedOrder.status === 'delivered'
                        ? 'Your order has been delivered! 🎉'
                        : 'Estimated Delivery: Today by 6:00 PM'}
                    </p>
                    <p className="font-body text-gray-400 text-xs mt-0.5">
                      {selectedOrder.status === 'delivered'
                        ? 'Thank you for shopping with Vegan Fresh'
                        : 'Our delivery partner is on the way'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3
              className="font-heading font-semibold text-text-dark 
            text-lg mb-4"
            >
              Items in this Order
            </h3>
            <div className="space-y-3">
              {selectedOrder.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between 
                bg-bg-light px-4 py-3 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 bg-green-50 rounded-lg flex 
                    items-center justify-center text-lg"
                    >
                      🥦
                    </div>
                    <div>
                      <p className="font-body font-medium text-text-dark text-sm">
                        {item.name}
                      </p>
                      <p className="font-body text-gray-400 text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-heading font-bold text-text-dark text-sm">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Empty State — no search yet */}
      {!selectedOrder && !error && (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <div
            className="w-16 h-16 bg-green-50 rounded-full flex 
          items-center justify-center mx-auto mb-4"
          >
            <Truck className="w-8 h-8 text-primary" />
          </div>
          <p className="font-heading font-semibold text-gray-400 text-lg">
            Enter Order ID above
          </p>
          <p className="font-body text-gray-400 text-sm mt-1">
            You can find your Order ID in Order History
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
