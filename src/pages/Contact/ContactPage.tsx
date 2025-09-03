// src/components/Contact/ContactPage.tsx
import React from 'react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import MainLayout from '../../layouts/MainLayout';

const ContactPage: React.FC = () => {
  return (
    <>
    <MainLayout>
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Kartu utama yang menjadi latar belakang putih */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-6xl mx-auto">
        {/* Layout Grid Responsif */}
        {/* 1 kolom di layar kecil, 2 kolom di layar medium ke atas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Kolom Kiri */}
          <ContactInfo />
          
          {/* Kolom Kanan */}
          <ContactForm />
        </div>
      </div>
    </div>
    </MainLayout>
    </>
  );
};

export default ContactPage;