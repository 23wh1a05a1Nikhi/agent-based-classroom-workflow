import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty';
  department: string;
  rollNo?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock authentication logic
    // In real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Detect role from email
    const isStudent = email.includes('student') || /^\d+@/.test(email);
    
    const mockUser: User = isStudent ? {
      id: '1',
      name: 'John Student',
      email: email,
      role: 'student',
      department: 'Computer Science',
      rollNo: '2021CS001'
    } : {
      id: '2',
      name: 'Dr. Sarah Faculty',
      email: email,
      role: 'faculty',
      department: 'Computer Science'
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
