import { useEffect, useState, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthLayout from "../../layouts/AuthLayout"; // Layout
// images
import cabangImg from "../../assets/images/images/cabangImg.svg";
// icons
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
// menampilkan branches list
// if => ngecek ada gak authToken di local storage
// if isset authToken => valid / expired
/* if valid => {
  "branch_id": "BRC193059EV8ZDC",
  "user_id": "USR93931038Y5XZ",
  "user_role": "superadmin"
}*/
// if ketemu => dashboard
// if tidak => lanjut tampilkan halaman branches list


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
      .then(
        (res: { data: { status: string; data: SetStateAction<Branch[]> } }) => {
          if (res.data.status === "success") {
            setBranches(res.data.data);
          }
        }
      )
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
        localStorage.setItem("authToken", res.data.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal memilih branch");
    }
  };

  return (
    <>
      <AuthLayout imageSrc={cabangImg}>
        <div className="p-6">
          <div className="mb-8 text-center">
            <h1 className="lg:text-3xl font-bold mb-4">
              Pilih Cabang
            </h1>
            <p className="text-md">
              Pilih cabang terlebih dulu untuk melanjutkan
            </p>
          </div>
          <ul className="space-y-3">
            {branches.map((branch) => (
              <li
                key={branch.branch_id}
                className="p-4 border flex items-center gap-8 rounded-xl shadow-sm border-primary cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectBranch(branch.branch_id)}
              >
                <div className="">
                  <Store size={40} />
                </div>
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
    </>
  );
}
