import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthLayout from "../../layouts/AuthLayout"; // Layout
import cabangImg from "../../assets/images/images/cabangImg.svg";
import { Store } from "lucide-react";

interface Branch {
  user_id: string;
  user_name: string;
  branch_id: string;
  branch_name: string;
  address: string;
  phone: string;
}

const BaseUrl = import.meta.env.VITE_BASE_URL;

export default function GetBranches() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        // 1. Cek profile → validasi token
        const profileRes = await axios.get(`${BaseUrl}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profileRes.status !== 200) {
          localStorage.removeItem("authToken");
          navigate("/");
          return;
        }

        // 2. Ambil branches list
        const branchRes = await axios.get(`${BaseUrl}/api/branches_combo`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (branchRes.data.status === "success") {
          setBranches(branchRes.data.data);
        } else {
          localStorage.removeItem("authToken");
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("authToken");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSelectBranch = async (branchId: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await axios.post(
        `${BaseUrl}/api/set_branch`,
        { branch_id: branchId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status === "success") {
        localStorage.setItem("authToken", res.data.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal memilih branch");
    }
  };

  if (loading) {
    return (
      <AuthLayout imageSrc={cabangImg}>
        <div className="p-6 text-center">Memuat data cabang...</div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout imageSrc={cabangImg}>
      <div className="p-6">
        <div className="mb-8 text-center">
          <h1 className="lg:text-3xl font-bold mb-4">Pilih Cabang</h1>
          <p className="text-md">Pilih cabang terlebih dulu untuk melanjutkan</p>
        </div>
        <ul className="space-y-3">
          {branches.map((branch) => (
            <li
              key={branch.branch_id}
              className="p-4 border flex items-center gap-8 rounded-xl shadow-sm border-primary cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectBranch(branch.branch_id)}
            >
              <Store size={40} />
              <div>
                <h2 className="font-semibold">{branch.branch_name}</h2>
                <p className="text-sm text-gray-600">{branch.address}</p>
                <p className="text-sm text-gray-500">{branch.phone}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AuthLayout>
  );
}
