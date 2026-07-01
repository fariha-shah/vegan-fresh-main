// Minahil admindashboard

import { useState } from 'react';
import { Plus, Trash2, X, BadgePercent, Tag } from 'lucide-react';
import { mockCoupons } from '../data/adminMockData';

export default function Coupons() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    isActive: true,
  });

  // OPEN MODAL
  function openAddModal() {
    setForm({
      code: '',
      discountType: 'percentage',
      discountValue: '',
      isActive: true,
    });
    setShowModal(true);
  }

  // DELETE
  function handleDelete(id) {
    if (confirm('Delete this coupon?')) {
      setCoupons(coupons.filter((c) => c.id !== id));
    }
  }

  // TOGGLE ACTIVE/INACTIVE
  function toggleStatus(id) {
    setCoupons(
      coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  }

  // SUBMIT
  function handleSubmit(e) {
    e.preventDefault();

    setCoupons([
      ...coupons,
      {
        ...form,
        id: Date.now(),
        discountValue: Number(form.discountValue),
      },
    ]);

    setShowModal(false);
  }

  return (
    <div className="p-2">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkGray flex items-center gap-2">
          <Tag className="text-green-600" />
          Coupons
        </h1>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Add Coupon
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4">Code</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((c) => {
              const isPercent = c.discountType === 'percentage';

              return (
                <tr key={c.id} className="border-t hover:bg-gray-50 transition">
                  {/* CODE */}
                  <td className="p-4">
                    <span className="font-mono font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-md">
                      {c.code}
                    </span>
                  </td>

                  {/* DISCOUNT */}
                  <td className="p-4 flex items-center gap-2 font-medium">
                    {isPercent ? (
                      <BadgePercent size={16} className="text-green-600" />
                    ) : (
                      <span className="text-gray-600">Rs</span>
                    )}
                    {c.discountValue}
                    {isPercent ? '%' : ''}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        c.isActive
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {c.isActive ? 'Active' : 'Expired'}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 flex gap-2">
                    {/* TOGGLE */}
                    <button
                      onClick={() => toggleStatus(c.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        c.isActive
                          ? 'bg-gray-100 hover:bg-gray-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {c.isActive ? 'Disable' : 'Activate'}
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
            {/* CLOSE */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-lg font-bold mb-4">Add Coupon</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* CODE */}
              <input
                required
                value={form.code}
                onChange={(e) =>
                  setForm({
                    ...form,
                    code: e.target.value.toUpperCase(),
                  })
                }
                placeholder="Coupon code (e.g. FRESH10)"
                className="w-full border p-2 rounded-lg"
              />

              {/* TYPE */}
              <select
                value={form.discountType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discountType: e.target.value,
                  })
                }
                className="w-full border p-2 rounded-lg"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed (Rs)</option>
              </select>

              {/* VALUE */}
              <input
                required
                type="number"
                value={form.discountValue}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discountValue: e.target.value,
                  })
                }
                placeholder="Discount value"
                className="w-full border p-2 rounded-lg"
              />

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Add Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
