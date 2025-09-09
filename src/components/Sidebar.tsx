// src/components/Sidebar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

// images
import fotoProfil from "../assets/images/profil.jpeg";
// icons
import {
  LayoutDashboard,
  Database,
  UserPen,
  LogOut,
  Settings,
  Contact,
} from "lucide-react";

const myNav = [
  { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Data", path: "/data", icon: <Database className="w-5 h-5" /> },
  { label: "Users", path: "/users", icon: <UserPen className="w-5 h-5" /> },
  { label: "Contact", path: "/contact", icon: <Contact className="w-5 h-5" /> },
];

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  darkMode?: boolean; // 🔹 new prop
};

export default function Sidebar({ darkMode }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleLogout = () => {
  Swal.fire({
    title: "Yakin mau logout?",
    text: "Anda akan keluar dari aplikasi.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, logout",
    cancelButtonText: "Batal",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      // 🔹 Hapus semua token saat logout
      localStorage.removeItem("authToken");
      localStorage.removeItem("branchToken");

      Swal.fire({
        title: "Logout berhasil!",
        text: "Anda sudah keluar dari aplikasi.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      }).then(() => {
        navigate("/", { replace: true }); // pastikan tidak bisa back ke dashboard
      });
    }
  });
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Password baru dan konfirmasi tidak sama ⚠️",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setIsModalOpen(false);

    Swal.fire({
      title: "Berhasil!",
      text: "Profil berhasil diperbarui 🎉",
      icon: "success",
      confirmButtonColor: "#2563eb",
    });
  };

  return (
    <div
      className={`
        relative z-20 inset-y-0 left-0 px-2 py-3
        w-20 md:w-64
        flex flex-col transition-all duration-300
        ${darkMode
          ? "bg-gray-900 text-white shadow-lg"
          : "bg-gradient-to-b from-primary to-blue-400 text-white shadow-md"}
      `}
    >
      {/* Bagian atas */}
      <div className="flex-1">
        <div className="flex items-center justify-center px-6 py-4">
          <h1 className="hidden md:block text-3xl font-bold">Viemedika</h1>
          <h1 className="md:hidden text-xl font-bold">V</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-col space-y-2 px-2">
          {myNav.map((item, i) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={i}
                to={item.path}
                className={`group relative flex items-center justify-center md:justify-start gap-3 px-3 py-2 rounded-lg transition
                  ${active
                    ? darkMode
                      ? "bg-gray-700 font-semibold"
                      : "bg-white/20 font-semibold"
                    : darkMode
                      ? "hover:bg-gray-800"
                      : "hover:bg-white/10"
                  }
                `}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
                <span
                  className="absolute left-14 md:hidden opacity-0 group-hover:opacity-100
                             bg-black text-white text-xs px-2 py-1 rounded-md transition-opacity"
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bagian bawah */}
      <div className="p-4 flex flex-col items-center md:w-48 md:mx-auto md:space-y-4">
        <img
          src={fotoProfil}
          alt="Profile"
          className="hidden md:block w-20 rounded-lg"
        />

        <div className="flex justify-center md:justify-evenly w-full">
          <button onClick={handleLogout} className="text-white">
            <LogOut />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden md:block text-white"
          >
            <Settings />
          </button>
        </div>
      </div>

      {/* Modal Edit Profil */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-30">
          <div
            className={`p-6 rounded-xl shadow-lg w-full max-w-md
              ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
            `}
          >
            <h2 className="text-xl font-bold mb-4">Edit Profil</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:ring ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:ring ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:ring ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password Lama</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={profile.oldPassword}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:ring ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password Baru</label>
                <input
                  type="password"
                  name="newPassword"
                  value={profile.newPassword}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:ring ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Konfirmasi Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:ring ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 rounded-lg ${
                    darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-white ${
                    darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
