// src/components/Header.tsx
import { Menu, Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import profil1 from "../assets/images/profil.jpeg";
import { useState } from "react";

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

  const [search, setSearch] = useState("");

  return (
    <header className="bg-transparent h-16 flex items-center justify-between px-6 bg-blue-100">
      {/* Toggle Sidebar (Mobile) */}
      <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
        <Menu className="w-6 h-6" />
      </button>

      {/* Dynamic Title */}
      <h2 className="text-lg font-semibold">{title}</h2>

      {/* Search Input Modern */}
      <div className="hidden md:flex flex-1 justify-center px-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                       transition-all outline-none"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <Bell className="cursor-pointer hover:text-primary transition-colors" />
        <span className="text-gray-600 font-semibold">Hello, Syahril!</span>
      </div>
    </header>
  );
}
