import MainLayout from "../layouts/MainLayout"; // Layout

import { Users, Package, ShoppingCart, DollarSign} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const Dashboard = () => {
  return (
    <>
      <MainLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold">Selamat Datang, Admin 👋</h1>
            <p className="text-gray-500">Senin, 1 September 2025</p>
          </div>

          {/* Cards Ringkasan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Total User",
                value: "1,250",
                icon: <Users className="w-10 h-10 text-blue-500" />,
              },
              {
                title: "Produk",
                value: "320",
                icon: <Package className="w-10 h-10 text-green-500" />,
              },
              {
                title: "Pesanan Pending",
                value: "58",
                icon: <ShoppingCart className="w-10 h-10 text-orange-500" />,
              },
              {
                title: "Pendapatan Bulan Ini",
                value: "Rp 25.5 jt",
                icon: <DollarSign className="w-10 h-10 text-purple-500" />,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4"
              >
                {card.icon}
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <h2 className="text-xl font-bold">{card.value}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Grafik Dummy */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-semibold text-lg mb-4">Penjualan Bulanan</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#FF9A00" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Aktivitas Terbaru */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-semibold text-lg mb-4">Aktivitas Terbaru</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="p-2">Tanggal</th>
                  <th className="p-2">User</th>
                  <th className="p-2">Aktivitas</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">01/09/2025</td>
                  <td className="p-2">Budi</td>
                  <td className="p-2">Membuat Pesanan</td>
                  <td className="p-2 text-green-600">Sukses</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">31/08/2025</td>
                  <td className="p-2">Siti</td>
                  <td className="p-2">Menambah Produk</td>
                  <td className="p-2 text-green-600">Sukses</td>
                </tr>
                <tr>
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
    </>
  );
};

export default Dashboard;
