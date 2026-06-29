import { useState } from 'react';
import { Plus, Pencil, Trash2, X, FolderTree } from 'lucide-react';
import { mockCategories } from '../data/adminMockData';

export default function Categories() {
  const [categories, setCategories] = useState(mockCategories);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    isActive: true,
  });

  // SLUG GENERATOR
  const generateSlug = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

  // OPEN ADD
  function openAddModal() {
    setEditing(null);
    setForm({
      name: '',
      description: '',
      isActive: true,
    });
    setShowModal(true);
  }

  // OPEN EDIT
  function openEditModal(category) {
    setEditing(category);
    setForm(category);
    setShowModal(true);
  }

  // DELETE
  function handleDelete(id) {
    if (confirm('Delete this category?')) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  }

  // TOGGLE ACTIVE
  function toggleActive(id) {
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  }

  // SUBMIT
  function handleSubmit(e) {
    e.preventDefault();

    const slug = generateSlug(form.name);

    const newCategory = {
      ...form,
      slug,
      id: editing ? editing.id : Date.now(),
    };

    if (editing) {
      setCategories(
        categories.map((c) => (c.id === editing.id ? newCategory : c))
      );
    } else {
      setCategories([newCategory, ...categories]);
    }

    setShowModal(false);
  }

  return (
    <div className="p-2">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkGray flex items-center gap-2">
          <FolderTree className="text-green-600" />
          Categories
        </h1>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4">Category</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50 transition">
                {/* NAME */}
                <td className="p-4 font-semibold text-gray-800">{c.name}</td>

                {/* SLUG */}
                <td className="p-4 text-gray-500 font-mono text-xs">
                  {c.slug}
                </td>

                {/* DESCRIPTION */}
                <td className="p-4 text-gray-600 max-w-xs truncate">
                  {c.description || '—'}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <button
                    onClick={() => toggleActive(c.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                      c.isActive
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {c.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>

                {/* ACTIONS */}
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(c)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
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
              {editing ? 'Edit Category' : 'Add Category'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* NAME */}
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Category name"
                className="w-full border p-2 rounded-lg"
              />

              {/* SLUG PREVIEW */}
              {form.name && (
                <p className="text-xs text-gray-500">
                  Slug: {generateSlug(form.name)}
                </p>
              )}

              {/* DESCRIPTION */}
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                placeholder="Category description (optional)"
                className="w-full border p-2 rounded-lg h-24"
              />

              {/* ACTIVE */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isActive: e.target.checked,
                    })
                  }
                />
                Active category
              </label>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                {editing ? 'Save Changes' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
