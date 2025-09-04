import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

// images
import fotoProfil from "../assets/images/profil.jpeg";
// icons
import {
  X,
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
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 State modal & profile
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
        Swal.fire({
          title: "Logout berhasil!",
          text: "Anda sudah keluar dari aplikasi.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  // 🔹 Handle form
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
      className={`relative z-20 inset-y-0 left-0 px-4 py-3 w-64 bg-gradient-to-b from-primary to-blue-400 shadow-md transform  
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col`}
    >
      {/* Bagian atas */}
      <div className="flex-1">
        <div className="relative flex items-center justify-center px-6 py-4">
          <h1 className="text-3xl font-bold text-white">Viemedika</h1>
          <button
            className="absolute right-6 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-col space-y-2 px-4">
          {myNav.map((item, i) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-white transition ${
                  active ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bagian bawah (Profile + tombol) */}
      <div className="p-6 bg-blue-300/50 rounded-2xl space-y-6 w-48 mx-auto">
        <div className="flex justify-center">
          <img src={fotoProfil} alt="Profile" className="w-20 rounded-lg" />
        </div>
        <div className="flex justify-evenly text-white">
          <button onClick={handleLogout}>
            <LogOut />
          </button>
          <button onClick={() => setIsModalOpen(true)}>
            <Settings />
          </button>
        </div>
      </div>

      {/* 🔹 Modal Edit Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-30">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Profil</h2>
            <form onSubmit={handleSave} className="space-y-4">
              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              {/* Password Lama */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password Lama</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={profile.oldPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              {/* Password Baru */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password Baru</label>
                <input
                  type="password"
                  name="newPassword"
                  value={profile.newPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              {/* Konfirmasi Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
