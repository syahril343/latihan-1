// src/components/Contact/ContactInfo.tsx
import React from 'react';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

const ContactInfo: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 transition-colors">
        Informasi Kontak
      </h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <FiMapPin className="text-blue-600 mt-1 dark:text-blue-400 transition-colors" size={20} />
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 transition-colors">Alamat</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">
              Jalan Sehat Selalu No. 123, Jakarta Pusat, Indonesia
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FiMail className="text-blue-600 mt-1 dark:text-blue-400 transition-colors" size={20} />
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 transition-colors">Email</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">support@viemedika.com</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FiPhone className="text-blue-600 mt-1 dark:text-blue-400 transition-colors" size={20} />
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 transition-colors">Telepon</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">(021) 1234-5678</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 rounded-lg overflow-hidden shadow-md dark:shadow-gray-700 transition-shadow">
        <img 
          src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg" 
          alt="Peta lokasi Viemedika" 
          className="w-full h-64 object-cover"
        />
      </div>
    </div>
  );
};

export default ContactInfo;
