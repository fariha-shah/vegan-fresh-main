// Minahil admindashboard
import { useState } from 'react';
import { mockOrders } from '../data/adminMockData';
import { CheckCircle, Clock, Truck, PackageCheck, XCircle } from 'lucide-react';

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-gray-100 text-gray-600',
    icon: Clock,
  },
  processing: {
    label: 'Processing',
    className: 'bg-orange-100 text-orange-600',
    icon: PackageCheck,
  },
  shipped: {
    label: 'Shipped',
    className: 'bg-blue-100 text-blue-600',
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-green-100 text-green-600',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-600',
    icon: XCircle,
  },
};

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders);

  function updateStatus(id, status) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <div className="p-2">
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-darkGray mb-6">Orders</h1>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          {/* HEAD */}
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {orders.map((o) => {
              const status = statusConfig[o.status];
              const Icon = status.icon;

              return (
                <tr key={o.id} className="border-t hover:bg-gray-50 transition">
                  {/* ORDER ID */}
                  <td className="p-4 font-semibold text-darkGray">
                    #{o.orderNumber}
                  </td>

                  {/* CUSTOMER */}
                  <td className="p-4 text-gray-700">{o.customer}</td>

                  {/* AMOUNT */}
                  <td className="p-4 font-medium">Rs {o.totalAmount}</td>

                  {/* DATE */}
                  <td className="p-4 text-gray-500">{o.date}</td>

                  {/* STATUS */}
                  <td className="p-4">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-semibold border-none outline-none ${status.className}`}
                    >
                      {Object.keys(statusConfig).map((key) => (
                        <option key={key} value={key}>
                          {statusConfig[key].label}
                        </option>
                      ))}
                    </select>

                    {/* STATUS BADGE (visual layer) */}
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span
                        className={`flex items-center gap-1 px-3 py-1 rounded-full ${status.className}`}
                      >
                        <Icon size={14} />
                        {status.label}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
