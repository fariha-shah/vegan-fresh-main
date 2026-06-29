import { useState } from 'react';
import { Plus, Pencil, Trash2, X, FileText } from 'lucide-react';
import { mockBlogs } from '../data/adminMockData';

export default function Blogs() {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: '',
    author: 'Admin',
    content: '',
    isPublished: false,
  });

  // OPEN ADD
  function openAddModal() {
    setEditing(null);
    setForm({
      title: '',
      author: 'Admin',
      content: '',
      isPublished: false,
    });
    setShowModal(true);
  }

  // OPEN EDIT
  function openEditModal(blog) {
    setEditing(blog);
    setForm(blog);
    setShowModal(true);
  }

  // DELETE
  function handleDelete(id) {
    if (confirm('Delete this blog post?')) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  }

  // SUBMIT
  function handleSubmit(e) {
    e.preventDefault();

    const newBlog = {
      ...form,
      id: editing ? editing.id : Date.now(),
    };

    if (editing) {
      setBlogs(blogs.map((b) => (b.id === editing.id ? newBlog : b)));
    } else {
      setBlogs([newBlog, ...blogs]);
    }

    setShowModal(false);
  }

  return (
    <div className="p-2">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkGray flex items-center gap-2">
          <FileText className="text-green-600" />
          Blog Posts
        </h1>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Add Post
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4">Post</th>
              <th className="p-4">Author</th>
              <th className="p-4">Content</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-50 transition">
                {/* TITLE */}
                <td className="p-4">
                  <div className="font-semibold text-gray-800">{b.title}</div>
                </td>

                {/* AUTHOR */}
                <td className="p-4 text-gray-600">{b.author}</td>

                {/* CONTENT PREVIEW */}
                <td className="p-4 text-gray-500 max-w-xs truncate">
                  {b.content}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      b.isPublished
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {b.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(b)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(b.id)}
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
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">
            {/* CLOSE */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-lg font-bold mb-4">
              {editing ? 'Edit Post' : 'Add Post'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* TITLE */}
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Blog title"
                className="w-full border p-2 rounded-lg"
              />

              {/* AUTHOR */}
              <input
                required
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Author"
                className="w-full border p-2 rounded-lg"
              />

              {/* CONTENT */}
              <textarea
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write your blog content here..."
                className="w-full border p-2 rounded-lg h-40"
              />

              {/* PUBLISH */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isPublished: e.target.checked,
                    })
                  }
                />
                Publish immediately
              </label>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                {editing ? 'Save Changes' : 'Add Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
