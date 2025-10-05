
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-material-primary">Material Todo</h1>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
        <div className="mt-6 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-material-primary mx-auto"></div>
      </div>
    </div>
  );
};

export default Index;
