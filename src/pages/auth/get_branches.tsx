import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthLayout from "../../layouts/AuthLayout";
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
    const fetchBranches = async () => {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        navigate("/");
        return;
      }

      try {
        // ambil daftar branches
        const res = await axios.get(`${BaseUrl}/api/branches_combo`, {
          headers: { Authorization: `Bearer ${loginToken}` },
        });

        if (res.data.status === "success") {
          setBranches(res.data.data);
        } else {
          localStorage.removeItem("loginToken");
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("loginToken");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [navigate]);

  const handleSelectBranch = async (branchId: string) => {
    const loginToken = localStorage.getItem("loginToken");
    if (!loginToken) return;

    try {
      const res = await axios.post(
        `${BaseUrl}/api/set_branch`,
        { branch_id: branchId },
        {
          headers: { Authorization: `Bearer ${loginToken}` },
        }
      );

      if (res.data.status === "success") {
        // simpan final token dan branch info
        localStorage.removeItem("loginToken");
        localStorage.setItem("authToken", res.data.data);
        localStorage.setItem("branchToken", branchId); // ✅ simpan branch

        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal memilih cabang");
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
