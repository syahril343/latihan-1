import React, { useState } from "react";
import Swal from "sweetalert2";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Formulir:", formData);

    Swal.fire({
      title: "Berhasil!",
      text: "Pesan Anda telah terkirim 🎉",
      icon: "success",
      confirmButtonColor: "#2563eb",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 transition-colors">
        Kirimkan Kami Pesan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {(["name", "email", "subject"] as (keyof FormData)[]).map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 transition-colors"
            >
              {field === "name"
                ? "Nama Lengkap"
                : field === "email"
                ? "Alamat Email"
                : "Subjek"}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder={
                field === "name"
                  ? "John Doe"
                  : field === "email"
                  ? "anda@email.com"
                  : "Tuliskan subjek pesan Anda"
              }
            />
          </div>
        ))}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 transition-colors"
          >
            Pesan
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Tuliskan pesan Anda di sini..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-primary dark:bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Kirim Pesan
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
