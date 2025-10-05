
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      // Load todos from localStorage
      const storedTodos = localStorage.getItem(`todos_${user.id}`);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    }
  }, [user]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
    }
  }, [todos, user]);

  const addTodo = (title: string, description: string) => {
    if (!user) return;
    
    const newTodo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      userId: user.id,
    };
    
    setTodos([...todos, newTodo]);
    toast({
      title: "Task added",
      description: "Your new task has been added successfully.",
    });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed.",
    });
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id: string, title: string, description: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  return (
    <div>
      <TodoForm onAddTodo={addTodo} />
      
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        {todos.length === 0 ? (
          <div className="text-center p-8 material-card">
            <p className="text-gray-500">You don't have any tasks yet. Add your first task above!</p>
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggleComplete={toggleComplete}
              onUpdate={updateTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
