import React from 'react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import MainLayout from '../../layouts/MainLayout';

const ContactPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 transition-colors">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Kontak Kami</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
