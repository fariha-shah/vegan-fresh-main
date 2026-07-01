// Minahil admindashboard
import { useState } from 'react';
import { mockUsers } from '../data/adminMockData';
import { Shield, ShieldOff, User } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState(mockUsers);

  function toggleBlock(id) {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u))
    );
  }

  return (
    <div className="p-2">
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-darkGray mb-6">Users</h1>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          {/* HEAD */}
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {users.map((u) => {
              const initials = u.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase();

              return (
                <tr key={u.id} className="border-t hover:bg-gray-50 transition">
                  {/* USER INFO */}
                  <td className="p-4 flex items-center gap-3">
                    {/* AVATAR */}
                    <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">
                      {initials || <User size={14} />}
                    </div>

                    <span className="font-medium text-darkGray">{u.name}</span>
                  </td>

                  {/* EMAIL */}
                  <td className="p-4 text-gray-600">{u.email}</td>

                  {/* ROLE */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        u.role === 'admin'
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.blocked
                          ? 'bg-red-100 text-red-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {u.blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="p-4">
                    <button
                      onClick={() => toggleBlock(u.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        u.blocked
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      {u.blocked ? (
                        <>
                          <Shield size={14} />
                          Unblock
                        </>
                      ) : (
                        <>
                          <ShieldOff size={14} />
                          Block
                        </>
                      )}
                    </button>
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
