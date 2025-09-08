// src/layouts/MainLayout.tsx
import { type ReactNode, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  // Inisialisasi dark mode dari localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? stored === "true" : false; // default false
  });

  // Update class html & localStorage saat darkMode berubah
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      <Sidebar sidebarOpen={true} setSidebarOpen={() => {}} darkMode={darkMode} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header dengan toggle dark mode */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
