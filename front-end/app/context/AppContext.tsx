
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

interface UserData {
  walletAddress?: string;
  role?: string | null;
  details?: any;
}

interface AppContextType {
  isWalletConnected: boolean;
  role: string | null;
  setRole: (role: string | null) => void;
  isConnectModalOpen: boolean;
  setConnectModalOpen: (isOpen: boolean) => void;
  isRoleModalOpen: boolean;
  setRoleModalOpen: (isOpen: boolean) => void;
  isRegistrationModalOpen: boolean;
  setRegistrationModalOpen: (isOpen: boolean) => void;
  isAddPropertyModalOpen: boolean;
  setAddPropertyModalOpen: (isOpen: boolean) => void;
  handleRoleSelect: (selectedRole: string) => void;
  handleRegistrationSuccess: (details: UserData) => void;
  handleGetStarted: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected, address } = useAccount();
  const [role, setRole] = useState<string | null>(null);
  const [isConnectModalOpen, setConnectModalOpen] = useState(false);
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setAddPropertyModalOpen] = useState(false);
  const router = useRouter();

  const handleGetStarted = () => {
    setConnectModalOpen(true);
  };

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    setRoleModalOpen(false);
    setRegistrationModalOpen(true);
  };

  const handleRegistrationSuccess = (details: UserData) => {
    const userData: UserData = {
      walletAddress: address,
      role,
      details
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    setRegistrationModalOpen(false);
    router.push('/dashboard');
  };


  return (
    <AppContext.Provider value={{
      isWalletConnected: isConnected,
      role,
      setRole,
      isConnectModalOpen,
      setConnectModalOpen,
      isRoleModalOpen,
      setRoleModalOpen,
      isRegistrationModalOpen,
      setRegistrationModalOpen,
      isAddPropertyModalOpen,
      setAddPropertyModalOpen,
      handleRoleSelect,
      handleRegistrationSuccess,
      handleGetStarted
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
