
'use client';

import React, { useState, useEffect } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('userData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setRole(parsedData.role || 'Buyer');
      }
    }
  }, []);

  return <div>{children}</div>;
};

export default Layout;
