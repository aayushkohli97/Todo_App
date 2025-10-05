
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (title: string, description: string) => void;
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTodo(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="material-card p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-material-primary">Add New Task</h2>
      <div className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="material-input"
            required
          />
        </div>
        <div>
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="material-input min-h-[80px]"
          />
        </div>
        <Button 
          type="submit" 
          className="material-button-primary"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
