import { useState } from 'react';
import { Plus, Pencil, Trash2, X, UploadCloud } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/adminMockData';

export default function Products() {
  const [products, setProducts] = useState(mockProducts);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    unit: 'kg',
    isOrganic: false,
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // OPEN ADD
  const openAddModal = () => {
    setEditing(null);
    setForm({
      name: '',
      category: mockCategories[0].name,
      price: '',
      stock: '',
      unit: 'kg',
      isOrganic: false,
      image: null,
    });
    setPreview(null);
    setShowModal(true);
  };

  // OPEN EDIT
  const openEditModal = (product) => {
    setEditing(product);
    setForm(product);
    setPreview(product.image);
    setShowModal(true);
  };

  // DELETE
  const handleDelete = (id) => {
    if (confirm('Delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // IMAGE CHANGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      id: editing ? editing.id : Date.now(),
      price: Number(form.price),
      stock: Number(form.stock),
      image: preview || '🥗',
    };

    if (editing) {
      setProducts(products.map((p) => (p.id === editing.id ? productData : p)));
    } else {
      setProducts([...products, productData]);
    }

    setShowModal(false);
  };

  return (
    <div className="p-2">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkGray">Products</h1>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Organic</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <span className="font-medium">{p.name}</span>
                </td>

                <td className="p-4">{p.category}</td>

                <td className="p-4">
                  Rs {p.price}/{p.unit}
                </td>

                <td
                  className={`p-4 ${p.stock < 10 ? 'text-red-500 font-semibold' : ''}`}
                >
                  {p.stock}
                </td>

                <td className="p-4">{p.isOrganic ? '🌿 Yes' : '—'}</td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
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

            <h2 className="text-lg font-bold mb-4">
              {editing ? 'Edit Product' : 'Add Product'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* IMAGE UPLOAD */}
              <label className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                <UploadCloud className="text-gray-500" />
                <span className="text-sm text-gray-500 mt-1">
                  Upload Product Image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>

              {/* PREVIEW */}
              {preview && (
                <img
                  src={preview}
                  className="w-full h-40 object-cover rounded-xl"
                />
              )}

              <input
                required
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-2 rounded-lg"
              />

              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border p-2 rounded-lg"
              >
                {mockCategories.map((c) => (
                  <option key={c.id}>{c.name}</option>
                ))}
              </select>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border p-2 rounded-lg"
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="w-full border p-2 rounded-lg"
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isOrganic}
                  onChange={(e) =>
                    setForm({ ...form, isOrganic: e.target.checked })
                  }
                />
                Organic Product
              </label>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                {editing ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
