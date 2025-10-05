
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll mock the user authentication
      // In a real app, this would validate against a backend
      const mockUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = mockUsers.find(
        (u: any) => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Success!",
        description: "You've successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll store the user in localStorage
      // In a real app, this would create a user in the backend
      const mockUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (mockUsers.some((u: any) => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, this would be hashed on the server
      };
      
      mockUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(mockUsers));
      
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
