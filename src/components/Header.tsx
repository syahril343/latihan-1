// src/components/Header.tsx
import { Bell, Moon, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";

type Props = {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
};

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/data": "Data",
  "/users": "Users",
  "/contact": "Contact",
};

export default function Header({ darkMode, setDarkMode }: Props) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Page";

  return (
    <header className="bg-transparent h-16 flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
        </button>

        <Bell className="cursor-pointer hover:text-primary transition-colors" />
        <span className="text-gray-600 dark:text-gray-300 font-semibold">Hello, Teguh!</span>
      </div>
    </header>
  );
}
