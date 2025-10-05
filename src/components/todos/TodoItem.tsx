
import React, { useState } from 'react';
import { Check, Trash2, Edit, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
}

const TodoItem = ({ todo, onDelete, onToggleComplete, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(todo.id, editTitle, editDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <div className="task-container material-card p-4 mb-4">
      {isEditing ? (
        <div className="space-y-3">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="material-input font-medium"
            placeholder="Task title"
          />
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="material-input min-h-[80px]"
            placeholder="Description"
          />
          <div className="flex space-x-2 mt-3">
            <Button
              type="button"
              onClick={handleSave}
              className="material-button-primary"
              size="sm"
            >
              <Save className="mr-1 h-4 w-4" />
              Save
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              size="sm"
            >
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggleComplete(todo.id)}
                className="mt-1"
              />
              <div>
                <h3 className={cn(
                  "font-medium text-lg transition-all duration-200",
                  todo.completed && "text-muted-foreground line-through"
                )}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className={cn(
                    "text-gray-600 mt-1",
                    todo.completed && "text-muted-foreground line-through"
                  )}>
                    {todo.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-material-primary"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={() => onDelete(todo.id)}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-material-danger"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
