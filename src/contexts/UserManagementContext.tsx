import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, USER_LOGIN_EVENT } from './AuthContext';

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked' | 'on-hold';
  lastActive: string;
  joinedDate: string;
  totalInvestments: number;
}

interface UserManagementContextType {
  users: PlatformUser[];
  addUser: (user: Omit<PlatformUser, 'id' | 'joinedDate'>) => void;
  updateUser: (id: string, updates: Partial<PlatformUser>) => void;
  deleteUser: (id: string) => void;
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
  putOnHold: (id: string) => void;
  syncAuthUser: (authUser: User) => void;
  getUserStats: () => {
    total: number;
    active: number;
    blocked: number;
    onHold: number;
  };
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

const SAMPLE_USERS: PlatformUser[] = [
  {
    id: 'user-1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    role: 'user',
    status: 'active',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    joinedDate: new Date('2024-01-15').toISOString(),
    totalInvestments: 2500000,
  },
  {
    id: 'user-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    role: 'user',
    status: 'active',
    lastActive: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    joinedDate: new Date('2024-02-20').toISOString(),
    totalInvestments: 1800000,
  },
  {
    id: 'user-3',
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    role: 'user',
    status: 'active',
    lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    joinedDate: new Date('2024-03-10').toISOString(),
    totalInvestments: 3200000,
  },
  {
    id: 'user-4',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    role: 'user',
    status: 'on-hold',
    lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    joinedDate: new Date('2024-04-05').toISOString(),
    totalInvestments: 950000,
  },
  {
    id: 'user-5',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    role: 'user',
    status: 'blocked',
    lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    joinedDate: new Date('2024-05-12').toISOString(),
    totalInvestments: 500000,
  },
];

export const UserManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<PlatformUser[]>([]);

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('truassets_users');
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error('Error parsing stored users:', error);
        setUsers([]);
      }
    } else {
      setUsers(SAMPLE_USERS);
      localStorage.setItem('truassets_users', JSON.stringify(SAMPLE_USERS));
    }
    // Start with empty list - users will be added when they login
  }, []);

  // Save users to localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('truassets_users', JSON.stringify(users));
    }
  }, [users]);

  const addUser = (userData: Omit<PlatformUser, 'id' | 'joinedDate'>) => {
    const newUser: PlatformUser = {
      ...userData,
      id: 'user-' + Date.now(),
      joinedDate: new Date().toISOString(),
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  const updateUser = (id: string, updates: Partial<PlatformUser>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...updates } : user))
    );
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const blockUser = (id: string) => {
    updateUser(id, { status: 'blocked' });
  };

  const unblockUser = (id: string) => {
    updateUser(id, { status: 'active' });
  };

  const putOnHold = (id: string) => {
    updateUser(id, { status: 'on-hold' });
  };

  const getUserStats = () => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === 'active').length,
      blocked: users.filter((u) => u.status === 'blocked').length,
      onHold: users.filter((u) => u.status === 'on-hold').length,
    };
  };

  // Sync authenticated user with user management system
  const syncAuthUser = (authUser: User) => {
    // Don't add admin users to the user management list
    if (authUser.role === 'admin') {
      return;
    }

    setUsers((prevUsers) => {
      // Check if user already exists
      const existingUserIndex = prevUsers.findIndex((u) => u.email === authUser.email);
      
      if (existingUserIndex !== -1) {
        // Update existing user's last active time
        const updatedUsers = [...prevUsers];
        updatedUsers[existingUserIndex] = {
          ...updatedUsers[existingUserIndex],
          lastActive: new Date().toISOString(),
          name: authUser.name,
        };
        return updatedUsers;
      } else {
        // Add new user
        const newUser: PlatformUser = {
          id: authUser.id,
          name: authUser.name,
          email: authUser.email,
          role: authUser.role,
          status: 'active',
          lastActive: new Date().toISOString(),
          joinedDate: new Date().toISOString(),
          totalInvestments: 0,
        };
        return [newUser, ...prevUsers];
      }
    });
  };

  // Listen for user login events
  useEffect(() => {
    const handleUserLogin = (event: Event) => {
      const customEvent = event as CustomEvent<User>;
      if (customEvent.detail) {
        syncAuthUser(customEvent.detail);
      }
    };

    window.addEventListener(USER_LOGIN_EVENT, handleUserLogin);
    
    return () => {
      window.removeEventListener(USER_LOGIN_EVENT, handleUserLogin);
    };
  }, []); // Empty dependency array since syncAuthUser uses setUsers callback

  const value: UserManagementContextType = {
    users,
    addUser,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser,
    putOnHold,
    syncAuthUser,
    getUserStats,
  };

  return (
    <UserManagementContext.Provider value={value}>
      {children}
    </UserManagementContext.Provider>
  );
};

export const useUserManagement = () => {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error('useUserManagement must be used within a UserManagementProvider');
  }
  return context;
};
