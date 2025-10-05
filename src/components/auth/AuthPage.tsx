
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-material-primary">Material Todo</h1>
        <p className="text-gray-600 mt-2">Organize your life with style</p>
      </div>
      {isLogin ? (
        <LoginForm onToggleForm={toggleForm} />
      ) : (
        <SignupForm onToggleForm={toggleForm} />
      )}
    </div>
  );
};

export default AuthPage;
