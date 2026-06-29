import { AlertTriangle } from 'lucide-react';
import { mockProducts } from '../data/adminMockData';

export default function StockAlerts() {
  const lowStock = mockProducts.filter((p) => p.stock < 10);

  return (
    <div className="p-2">
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-darkGray mb-6 flex items-center gap-2">
        <AlertTriangle className="text-red-500" />
        Stock Alerts
      </h1>

      {/* EMPTY STATE */}
      {lowStock.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-6 text-gray-500 text-center">
          🎉 No low stock products right now
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {/* TABLE */}
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Stock Left</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {lowStock.map((p) => {
                const isCritical = p.stock <= 5;

                return (
                  <tr
                    key={p.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* PRODUCT */}
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover border"
                      />
                      <span className="font-medium">{p.name}</span>
                    </td>

                    {/* CATEGORY */}
                    <td className="p-4 text-gray-600">{p.category}</td>

                    {/* STOCK */}
                    <td
                      className={`p-4 font-semibold ${
                        isCritical ? 'text-red-600' : 'text-orange-500'
                      }`}
                    >
                      {p.stock} {p.unit}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={`flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full w-fit ${
                          isCritical
                            ? 'bg-red-100 text-red-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        <AlertTriangle size={14} />
                        {isCritical ? 'Critical Low Stock' : 'Low Stock'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
