import MainLayout from "../layouts/MainLayout"; 
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 },
  { name: "Mei", sales: 3890 },
  { name: "Jun", sales: 4390 },
  { name: "Jul", sales: 4490 },
  { name: "Agu", sales: 3200 },
  { name: "Sep", sales: 5000 },
  { name: "Okt", sales: 4800 },
  { name: "Nov", sales: 5100 },
  { name: "Des", sales: 6100 },
];

const cards = [
  { title: "Total User", value: "1,250", icon: <Users className="w-10 h-10 text-blue-500" /> },
  { title: "Produk", value: "320", icon: <Package className="w-10 h-10 text-green-500" /> },
  { title: "Pesanan Pending", value: "58", icon: <ShoppingCart className="w-10 h-10 text-orange-500" /> },
  { title: "Pendapatan Bulan Ini", value: "Rp 25.5 jt", icon: <DollarSign className="w-10 h-10 text-purple-500" /> },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 transition-colors">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Selamat Datang, Admin 👋</h1>
          <p className="text-gray-500 dark:text-gray-400">Senin, 1 September 2025</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 flex items-center space-x-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              title={card.value}
            >
              {card.icon}
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{card.title}</p>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{card.value}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Grafik */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 overflow-x-auto transition-colors">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Penjualan Bulanan</h2>
          <div className="h-64 min-w-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="sales" fill="#FF9A00" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 overflow-x-auto transition-colors">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Aktivitas Terbaru</h2>
          <table className="min-w-full text-left text-gray-900 dark:text-gray-100">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                <th className="p-2">Tanggal</th>
                <th className="p-2">User</th>
                <th className="p-2">Aktivitas</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="p-2">01/09/2025</td>
                <td className="p-2">Budi</td>
                <td className="p-2">Membuat Pesanan</td>
                <td className="p-2 text-green-600">Sukses</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="p-2">31/08/2025</td>
                <td className="p-2">Siti</td>
                <td className="p-2">Menambah Produk</td>
                <td className="p-2 text-green-600">Sukses</td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="p-2">30/08/2025</td>
                <td className="p-2">Admin</td>
                <td className="p-2">Menghapus User</td>
                <td className="p-2 text-red-600">Gagal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
