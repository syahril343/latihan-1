import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import MainLayout from "../layouts/MainLayout";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Syahril", email: "syahril@mail.com", role: "Admin", status: "Active" },
    { id: 2, name: "Budi", email: "budi@mail.com", role: "User", status: "Inactive" },
    { id: 3, name: "Ani", email: "ani@mail.com", role: "User", status: "Active" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  // Open modal (Add or Edit)
  const openModal = (user?: User) => {
    if (user) {
      setEditUser(user);
      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditUser(null);
      setForm({ name: "", email: "", role: "User", status: "Active" });
    }
    setIsModalOpen(true);
  };

  // Save user (Add or Update)
  const handleSave = () => {
    if (editUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? { ...editUser, ...form } : u))
      );
    } else {
      setUsers((prev) => [
        ...prev,
        { id: Date.now(), ...form },
      ]);
    }
    setIsModalOpen(false);
  };

  // Delete user
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  // Filter
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
  {/* Tombol Add */}
  <button
    onClick={() => openModal()}
    className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-700 transition"
  >
    Add Users <Plus className="w-4 h-4" />
  </button>

  {/* Search */}
  <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300
                       focus:ring-1 focus:ring-primary
                       transition-all outline-none"
              />
            </div>
</div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center space-x-2">
                    <button
                      onClick={() => openModal(user)}
                      className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-gray-500 py-6 italic"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
              <h2 className="text-lg font-bold">
                {editUser ? "Edit User" : "Add User"}
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option>User</option>
                  <option>Admin</option>
                </select>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as "Active" | "Inactive",
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Users;
