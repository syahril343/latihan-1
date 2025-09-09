import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import Swal from "sweetalert2";

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
    { id: 1, name: "Teguh", email: "teguh@mail.com", role: "Admin", status: "Active" },
    { id: 2, name: "Budi", email: "budi@mail.com", role: "User", status: "Inactive" },
    { id: 3, name: "Ani", email: "ani@mail.com", role: "User", status: "Active" },
  ]);

  const rippleClass = "relative overflow-hidden";

  const handleAdd = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add User",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Email">' +
        '<select id="swal-input3" class="swal2-select"><option>User</option><option>Admin</option></select>' +
        '<select id="swal-input4" class="swal2-select"><option>Active</option><option>Inactive</option></select>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = (document.getElementById("swal-input1") as HTMLInputElement).value;
        const email = (document.getElementById("swal-input2") as HTMLInputElement).value;
        const role = (document.getElementById("swal-input3") as HTMLSelectElement).value;
        const status = (document.getElementById("swal-input4") as HTMLSelectElement).value as "Active" | "Inactive";
        if (!name || !email) {
          Swal.showValidationMessage("Name and Email are required");
          return null;
        }
        return { name, email, role, status };
      },
    });

    if (formValues) {
      setUsers([...users, { id: Date.now(), ...formValues }]);
      Swal.fire({ icon: "success", title: "User Added!", timer: 1500, showConfirmButton: false });
    }
  };

  const handleEdit = async (user: User) => {
    const { value: formValues } = await Swal.fire({
      title: `Edit User ID: ${user.id}`,
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Name" value="${user.name}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Email" value="${user.email}">` +
        `<select id="swal-input3" class="swal2-select"><option${user.role === "User" ? " selected" : ""}>User</option><option${user.role === "Admin" ? " selected" : ""}>Admin</option></select>` +
        `<select id="swal-input4" class="swal2-select"><option${user.status === "Active" ? " selected" : ""}>Active</option><option${user.status === "Inactive" ? " selected" : ""}>Inactive</option></select>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = (document.getElementById("swal-input1") as HTMLInputElement).value;
        const email = (document.getElementById("swal-input2") as HTMLInputElement).value;
        const role = (document.getElementById("swal-input3") as HTMLSelectElement).value;
        const status = (document.getElementById("swal-input4") as HTMLSelectElement).value as "Active" | "Inactive";
        if (!name || !email) {
          Swal.showValidationMessage("Name and Email are required");
          return null;
        }
        return { name, email, role, status };
      },
    });

    if (formValues) {
      setUsers(users.map(u => (u.id === user.id ? { ...u, ...formValues } : u)));
      Swal.fire({ icon: "success", title: "User Updated!", timer: 1500, showConfirmButton: false });
    }
  };

  const handleDelete = (user: User) => {
    Swal.fire({
      title: "Delete User?",
      text: `User ${user.name} will be deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    }).then(result => {
      if (result.isConfirmed) {
        setUsers(users.filter(u => u.id !== user.id));
        Swal.fire({ icon: "success", title: "Deleted!", timer: 1500, showConfirmButton: false });
      }
    });
  };

  const filteredUsers = users.filter(
    u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-4">
        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={handleAdd}
            className={`${rippleClass} flex items-center justify-center w-full sm:w-auto px-5 py-2 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all`}
          >
            Add User <Plus className="w-4 h-4 ml-2" />
          </button>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-xl transition-colors">
          <table className="min-w-full text-left text-gray-900 dark:text-gray-100">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  title={`Status: ${user.status}`}
                >
                  <td className="px-4 py-3 text-sm sm:text-base">{user.name}</td>
                  <td className="px-4 py-3 text-sm sm:text-base break-words">{user.email}</td>
                  <td className="px-4 py-3 text-sm sm:text-base">{user.role}</td>
                  <td className="px-4 py-3 text-sm sm:text-base">
                    <span
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200"
                          : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-200"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className={`${rippleClass} p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-800 transition-all`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className={`${rippleClass} p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800 transition-all`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 dark:text-gray-400 py-6 italic">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Users;
