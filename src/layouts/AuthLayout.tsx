import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  imageSrc?: string;
};

export default function AuthLayout({
  children,
  title,
  subtitle,
  imageSrc,
}: Props) {
  return (
    <div className="min-h-screen flex">
      {/* Bagian kiri (form) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center">
        {imageSrc ? (
          <img src={imageSrc} alt="auth illustration" className="max-w-xl" />
        ) : (
          <h2 className="text-white text-4xl font-bold">Brand</h2>
        )}
      </div>

      {/* Bagian kanan (gambar/ilustrasi) */}
      <div className="flex flex-col justify-center w-full md:w-1/2 p-8 sm:p-16">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
