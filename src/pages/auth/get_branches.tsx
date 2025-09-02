import { useEffect, useState, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(`${BaseUrl}/api/branches_combo`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: { data: { status: string; data: SetStateAction<Branch[]>; }; }) => {
        if (res.data.status === "success") {
          setBranches(res.data.data);
        }
      })
      .catch((err: unknown) => console.error(err));
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
        // Simpan branch terpilih di localStorage (opsional)
        localStorage.setItem("selectedBranch", branchId);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal memilih branch");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Pilih Cabang</h1>
      <ul className="space-y-3">
        {branches.map((branch) => (
          <li
            key={branch.branch_id}
            className="p-4 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelectBranch(branch.branch_id)}
          >
            <h2 className="font-semibold">{branch.branch_name}</h2>
            <p className="text-sm text-gray-600">{branch.address}</p>
            <p className="text-sm text-gray-500">{branch.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
