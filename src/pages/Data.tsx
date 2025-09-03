import MainLayout from "../layouts/MainLayout"; // Layout

import { Plus, Pencil, Trash2, Search } from "lucide-react";
import DataTable, { type TableColumn } from "react-data-table-component";
import { useState } from "react";
import Swal from "sweetalert2";

type DataRow = {
  id: number;
  title: string;
  year: string;
};

const initialData: DataRow[] = [
  { id: 1, title: "Conan the Barbarian", year: "1982" },
  { id: 2, title: "The Terminator", year: "1984" },
  { id: 3, title: "Predator", year: "1987" },
  { id: 4, title: "Total Recall", year: "1990" },
  { id: 5, title: "True Lies", year: "1994" },
  { id: 6, title: "Eraser", year: "1996" },
  { id: 7, title: "Collateral Damage", year: "2002" },
  { id: 8, title: "The Matrix", year: "1999" },
  { id: 9, title: "Inception", year: "2010" },
  { id: 10, title: "Conan the Barbarian", year: "1982" },
  { id: 11, title: "Conan the Barbarian", year: "1982" },
  { id: 12, title: "The Terminator", year: "1984" },
  { id: 13, title: "Predator", year: "1987" },
  { id: 14, title: "Total Recall", year: "1990" },
  { id: 15, title: "True Lies", year: "1994" },
  { id: 16, title: "Eraser", year: "1996" },
  { id: 17, title: "Collateral Damage", year: "2002" },
  { id: 18, title: "The Matrix", year: "1999" },
  { id: 19, title: "Inception", year: "2010" },
  { id: 20, title: "Inception", year: "2010" },
];

const Data = () => {
  const [data, setData] = useState<DataRow[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 13;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  // Tambah Data
  const handleAdd = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Tambah Data",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Title">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Year">',
      focusConfirm: false,
      preConfirm: () => {
        const title = (
          document.getElementById("swal-input1") as HTMLInputElement
        ).value;
        const year = (
          document.getElementById("swal-input2") as HTMLInputElement
        ).value;
        if (!title || !year) {
          Swal.showValidationMessage("Semua field harus diisi");
          return null;
        }
        return { title, year };
      },
      showCancelButton: true,
    });

    if (formValues) {
      const newData: DataRow = {
        id: data.length + 1,
        title: formValues.title,
        year: formValues.year,
      };
      setData([...data, newData]);
      Swal.fire("Berhasil!", "Data berhasil ditambahkan.", "success");
    }
  };

  // Edit Data
  const handleUpdate = (row: DataRow) => {
    Swal.fire({
      title: `Edit Data ID: ${row.id}`,
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Title" value="${row.title}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Year" value="${row.year}">`,
      focusConfirm: false,
      preConfirm: () => {
        const title = (
          document.getElementById("swal-input1") as HTMLInputElement
        ).value;
        const year = (
          document.getElementById("swal-input2") as HTMLInputElement
        ).value;
        if (!title || !year) {
          Swal.showValidationMessage("Semua field harus diisi");
          return null;
        }
        return { title, year };
      },
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const updatedData = data.map((d) =>
          d.id === row.id
            ? { ...d, title: result.value.title, year: result.value.year }
            : d
        );
        setData(updatedData);
        Swal.fire("Tersimpan!", `Data ID ${row.id} diperbarui.`, "success");
      }
    });
  };

  // Hapus Data
  const handleDelete = (row: DataRow) => {
    Swal.fire({
      title: "Yakin?",
      text: `Data ID ${row.id} akan dihapus!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredData = data.filter((d) => d.id !== row.id);
        setData(filteredData);
        Swal.fire(
          "Terhapus!",
          `Data ID ${row.id} berhasil dihapus.`,
          "success"
        );
      }
    });
  };

  const columns: TableColumn<DataRow>[] = [
    { name: "ID", selector: (row) => row.id, width: "80px" },
    { name: "Title", selector: (row) => row.title },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleUpdate(row)}
            className="p-1 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  const [search, setSearch] = useState("");

  return (
    <>
      <MainLayout>
        {/* Header Atas */}
        <div className="flex items-center justify-between  mb-4">
          <div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-3 py-2 bg-primary text-white text-sm rounded-md hover:bg-secondary transition"
            >
              Tambah
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input Modern */}
          
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300
                       focus:ring-1 focus:ring-primary
                       transition-all outline-none"
              />
            </div>
          </div>

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={currentData}
          noHeader
          pagination={false}
        />

        {/* Custom Pagination */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-primary text-white" : "bg-white "
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </MainLayout>
    </>
  );
};

export default Data;
