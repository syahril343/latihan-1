import { Link, useLocation } from "react-router-dom";

// images
import fotoProfil from "../assets/images/profil.jpeg";
// icons
import {
  X,
  LayoutDashboard,
  Database,
  UserPen,
  LogOut,
  Ellipsis,
} from "lucide-react";

const myNav = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Data",
    path: "/data",
    icon: <Database className="w-5 h-5" />,
  },
  { label: "Users", path: "/users", icon: <UserPen className="w-5 h-5" /> },
];

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const location = useLocation();

  return (
    <div
      className={`relative z-20 inset-y-0 left-0 px-4 py-3 w-64 bg-gradient-to-b from-primary to-blue-400 shadow-md transform  
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col`}
    >
      {/* Bagian atas (Logo + Nav) */}
      <div className="flex-1">
        {/* Header logo */}
        <div className="relative flex items-center justify-center px-6 py-4">
          <h1 className="text-xl font-bold text-white">Viemedika</h1>

          {/* Tombol close di pojok kanan */}
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

      {/* Bagian bawah (Profile) */}
      <div className="p-4 bg-blue-300/50 justify-center rounded-xl">
        <img src={fotoProfil} alt="Profile" className="w-20 rounded-lg" />
        <div className="flex text-white">
          <div>
            <LogOut />
          </div>
          <div>
            <Ellipsis />
          </div>
        </div>
      </div>
    </div>
  );
}
