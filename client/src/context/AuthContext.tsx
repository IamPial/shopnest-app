'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../mock/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isLoggedIn: boolean;
  isAdmin: boolean;
  loginAsCustomer: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUserProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUsers[0]);
  const [role, setRole] = useState<UserRole>('CUSTOMER');

  useEffect(() => {
    const savedRole = localStorage.getItem('shopnest_role') as UserRole | null;
    const savedUserJson = localStorage.getItem('shopnest_user');
    
    if (savedUserJson) {
      try {
        const parsed = JSON.parse(savedUserJson);
        setUser(parsed);
        setRole(parsed.role || 'CUSTOMER');
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    } else if (savedRole) {
      switchRole(savedRole);
    }
  }, []);

  const loginAsCustomer = () => {
    const customerUser = mockUsers.find((u) => u.role === 'CUSTOMER') || mockUsers[0];
    setUser(customerUser);
    setRole('CUSTOMER');
    localStorage.setItem('shopnest_user', JSON.stringify(customerUser));
    localStorage.setItem('shopnest_role', 'CUSTOMER');
  };

  const loginAsAdmin = () => {
    const adminUser = mockUsers.find((u) => u.role === 'ADMIN') || mockUsers[1];
    setUser(adminUser);
    setRole('ADMIN');
    localStorage.setItem('shopnest_user', JSON.stringify(adminUser));
    localStorage.setItem('shopnest_role', 'ADMIN');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopnest_user');
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('shopnest_role', newRole);
    if (newRole === 'ADMIN') {
      const adminUser = mockUsers.find((u) => u.role === 'ADMIN') || mockUsers[1];
      setUser(adminUser);
      localStorage.setItem('shopnest_user', JSON.stringify(adminUser));
    } else {
      const customerUser = mockUsers.find((u) => u.role === 'CUSTOMER') || mockUsers[0];
      setUser(customerUser);
      localStorage.setItem('shopnest_user', JSON.stringify(customerUser));
    }
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates, updatedAt: new Date().toISOString() };
    setUser(updated);
    localStorage.setItem('shopnest_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoggedIn: !!user,
        isAdmin: role === 'ADMIN' || user?.role === 'ADMIN',
        loginAsCustomer,
        loginAsAdmin,
        logout,
        switchRole,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
