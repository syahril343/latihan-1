import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import MainLayout from "../layouts/MainLayout";

type DataRow = { id: number; title: string; year: string; };
const initialData: DataRow[] = [
  { id: 1, title: "Conan the Barbarian", year: "1982" },
  { id: 2, title: "The Terminator", year: "1984" },
  { id: 3, title: "Predator", year: "1987" },
  { id: 4, title: "Total Recall", year: "1990" },
  { id: 5, title: "True Lies", year: "1994" },
  { id: 6, title: "Eraser", year: "1996" },
];

const Data = () => {
  const [data] = useState<DataRow[]>(initialData);
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.year.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-4">
        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => {}}
            className="ripple flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-700 transition relative overflow-hidden"
          >
            Add Data <Plus className="w-4 h-4 ml-1" />
          </button>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-primary outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-xl transition-colors">
          <table className="min-w-full text-left text-gray-900 dark:text-gray-100">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Year</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-3">{row.title}</td>
                  <td className="px-6 py-3">{row.year}</td>
                  <td className="px-6 py-3 text-center space-x-2">
                    <button className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-800">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-gray-500 dark:text-gray-400 py-6 italic">
                    No data found
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

export default Data;
