// src/components/Header.tsx
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import profil1 from "../assets/images/profil.jpeg";

type Props = {
  setSidebarOpen: (val: boolean) => void;
};

// mapping judul berdasarkan path
const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/data": "Data",
  "/users": "Users",
};

export default function Header({ setSidebarOpen }: Props) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Page";

  return (
    <header className="bg-transparent h-16 flex items-center justify-between px-6 bg-blue-100">
      {/* Toggle Sidebar (Mobile) */}
      <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
        <Menu className="w-6 h-6" />
      </button>

      {/* Dynamic Title */}
      <h2 className="text-lg font-semibold">{title}</h2>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 font-semibold">Hello, Syahril!</span>
        <img
          src={profil1}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}
