import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Event to notify when a user logs in
export const USER_LOGIN_EVENT = 'user_login';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('truassets_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Dispatch event for existing user on mount
        window.dispatchEvent(new CustomEvent(USER_LOGIN_EVENT, { detail: parsedUser }));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('truassets_user');
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('truassets_user', JSON.stringify(userData));
    // Dispatch event when user logs in
    window.dispatchEvent(new CustomEvent(USER_LOGIN_EVENT, { detail: userData }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('truassets_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
