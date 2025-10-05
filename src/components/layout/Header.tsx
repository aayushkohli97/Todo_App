
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-material-primary">Material Todo</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <User className="h-5 w-5 text-material-primary mr-2" />
            <span className="text-gray-700">{user.name}</span>
          </div>
          <Button 
            onClick={logout} 
            variant="ghost"
            className="flex items-center text-gray-700 hover:text-material-primary"
          >
            <LogOut className="h-5 w-5 mr-1" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
