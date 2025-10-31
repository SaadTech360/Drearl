
'use client'

import React from 'react';
import Navbar from '@/app/components/Navbar';
import { useAppContext } from '@/app/context/AppContext';
import AddPropertyModal from '@/app/components/modals/AddPropertyModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAddPropertyModalOpen } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Navbar />
      {children}
      {isAddPropertyModalOpen && <AddPropertyModal />}
    </div>
  );
};

export default Layout;
