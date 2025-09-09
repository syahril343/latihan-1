import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Edit,
  Trash,
} from "lucide-react";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// 📊 Data penjualan
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

// 📌 Cards data
const cards = [
  {
    title: "Total User",
    value: 1250,
    icon: Users,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Produk",
    value: 320,
    icon: Package,
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Pesanan Pending",
    value: 58,
    icon: ShoppingCart,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Pendapatan Bulan Ini",
    value: 25500000,
    icon: DollarSign,
    color: "bg-purple-500/10 text-purple-500",
  },
];

// Type aktivitas
interface Activity {
  tanggal: string;
  user: string;
  aktivitas: string;
  status: "Sukses" | "Gagal" | "Pending";
}

const Dashboard = () => {
  const [animatedValues, setAnimatedValues] = useState(cards.map(() => 0));
  const branch = localStorage.getItem("branchToken") || "Cabang Utama";

  const [activities, setActivities] = useState<Activity[]>([
    { tanggal: "01/09/2025", user: "Budi", aktivitas: "Membuat Pesanan", status: "Sukses" },
    { tanggal: "31/08/2025", user: "Siti", aktivitas: "Menambah Produk", status: "Sukses" },
    { tanggal: "30/08/2025", user: "Admin", aktivitas: "Menghapus User", status: "Gagal" },
    { tanggal: "29/08/2025", user: "Andi", aktivitas: "Membatalkan Pesanan", status: "Pending" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Activity>({
    tanggal: "",
    user: "",
    aktivitas: "",
    status: "Sukses",
  });

  // 🎯 Efek animasi angka naik
  useEffect(() => {
    cards.forEach((card, i) => {
      let start = 0;
      const end = card.value;
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setAnimatedValues((prev) => {
          const newValues = [...prev];
          newValues[i] = start;
          return newValues;
        });
      }, stepTime);
    });
  }, []);

  // 🔥 Helper format angka
  const formatNumber = (num: number) =>
    num.toLocaleString("id-ID", {
      style: cards[3].value === num ? "currency" : "decimal",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 18) return "Selamat Siang";
    return "Selamat Malam";
  };

  // 🚀 CRUD Handler
  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...activities];
      updated[editIndex] = formData;
      setActivities(updated);
    } else {
      setActivities([{ ...formData }, ...activities]);
    }
    setFormData({ tanggal: "", user: "", aktivitas: "", status: "Sukses" });
    setEditIndex(null);
    setShowModal(false);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(activities[index]);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    const filtered = activities.filter((_, i) => i !== index);
    setActivities(filtered);
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 transition-colors">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            {getGreeting()}, Admin 👋
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            {branch} •{" "}
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {card.title}
                  </p>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                    {formatNumber(animatedValues[i])}
                  </h2>
                </div>
                <div
                  className={`p-3 rounded-full ${card.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Grafik Penjualan */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 transition-colors">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">
            Penjualan Bulanan
          </h2>
          <div className="h-72 w-full overflow-x-auto">
            <div className="min-w-[400px] h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="url(#colorSales)" radius={[6, 6, 0, 0]} />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={false}
                  />
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Aktivitas Terbaru
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Plus className="w-4 h-4" /> Tambah
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[500px] w-full text-left text-gray-900 dark:text-gray-100 text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                  <th className="p-2">Tanggal</th>
                  <th className="p-2">User</th>
                  <th className="p-2">Aktivitas</th>
                  <th className="p-2">Status</th>
                  <th className="p-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="p-2">{act.tanggal}</td>
                    <td className="p-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-bold">
                        {act.user[0]}
                      </div>
                      {act.user}
                    </td>
                    <td className="p-2">{act.aktivitas}</td>
                    <td className="p-2">
                      {act.status === "Sukses" && (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" /> {act.status}
                        </span>
                      )}
                      {act.status === "Gagal" && (
                        <span className="flex items-center gap-1 text-red-600">
                          <XCircle className="w-4 h-4" /> {act.status}
                        </span>
                      )}
                      {act.status === "Pending" && (
                        <span className="flex items-center gap-1 text-yellow-600">
                          <Clock className="w-4 h-4" /> {act.status}
                        </span>
                      )}
                    </td>
                    <td className="p-2 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(i)}
                        className="p-2 bg-yellow-400/20 text-yellow-600 rounded-lg hover:bg-yellow-400/30"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
                        className="p-2 bg-red-500/20 text-red-600 rounded-lg hover:bg-red-500/30"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                {editIndex !== null ? "Edit Aktivitas" : "Tambah Aktivitas"}
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Tanggal"
                  value={formData.tanggal}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggal: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="User"
                  value={formData.user}
                  onChange={(e) =>
                    setFormData({ ...formData, user: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Aktivitas"
                  value={formData.aktivitas}
                  onChange={(e) =>
                    setFormData({ ...formData, aktivitas: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as Activity["status"] })
                  }
                  className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="Sukses">Sukses</option>
                  <option value="Gagal">Gagal</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
