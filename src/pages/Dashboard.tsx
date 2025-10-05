
import React from 'react';
import Header from '@/components/layout/Header';
import TodoList from '@/components/todos/TodoList';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TodoList />
      </main>
    </div>
  );
};

export default Dashboard;
