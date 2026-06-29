import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiPackage,
} from 'react-icons/fi';
import {
  mockProducts,
  mockOrders,
  mockUsers,
  mockWeeklySales,
} from '../data/adminMockData';

export default function AdminDashboard() {
  const totalSales = mockOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const lowStock = mockProducts.filter((p) => p.stock < 10);
  const maxSale = Math.max(...mockWeeklySales.map((d) => d.sales));

  const stats = [
    {
      label: 'Total Sales',
      value: `Rs ${totalSales}`,
      color: 'bg-primary',
      icon: FiDollarSign,
    },
    {
      label: 'Total Orders',
      value: mockOrders.length,
      color: 'bg-carrot',
      icon: FiShoppingCart,
    },
    {
      label: 'Total Users',
      value: mockUsers.length,
      color: 'bg-organic',
      icon: FiUsers,
    },
    {
      label: 'Total Products',
      value: mockProducts.length,
      color: 'bg-leaf',
      icon: FiPackage,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-poppins font-bold text-darkGray mb-6">
        Dashboard
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-card p-5">
            <div
              className={`w-10 h-10 rounded-lg ${s.color} mb-3 flex items-center justify-center`}
            >
              <s.icon size={20} className="text-white" />
            </div>
            <p className="font-inter text-sm text-gray-500">{s.label}</p>
            <p className="font-poppins text-2xl font-bold text-darkGray">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Weekly sales — simple CSS bar chart */}
      <div className="bg-white rounded-2xl shadow-card p-5 mb-8">
        <h2 className="font-poppins font-semibold text-darkGray mb-4">
          Weekly Sales
        </h2>
        <div className="flex items-end justify-between gap-3 h-48">
          {mockWeeklySales.map((d) => (
            <div
              key={d.day}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <span className="font-inter text-xs text-gray-500">
                Rs {d.sales}
              </span>
              <div
                className="w-full bg-primary rounded-t-md transition-all duration-300"
                style={{ height: `${(d.sales / maxSale) * 140}px` }}
              />
              <span className="font-inter text-xs font-medium text-darkGray">
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Low stock alerts */}
      {lowStock.length > 0 && (
        <div className="bg-white rounded-2xl shadow-card p-5">
          <h2 className="font-poppins font-semibold text-darkGray mb-3">
            ⚠️ Low Stock Alerts
          </h2>
          <ul className="space-y-2">
            {lowStock.map((p) => (
              <li key={p.id} className="font-inter text-sm text-tomato">
                {p.image} {p.name} — only {p.stock} {p.unit} left
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
