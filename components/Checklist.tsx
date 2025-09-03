
import React, { useState } from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import PlusIcon from './icons/PlusIcon';

interface ChecklistProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onDeleteCompleted: () => void;
}

const Checklist: React.FC<ChecklistProps> = ({ tasks, onAddTask, onToggleTask, onDeleteTask, onDeleteCompleted }) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(newTaskText);
    setNewTaskText('');
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Añadir una nueva tarea..."
          className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        />
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold p-3 rounded-md transition-colors flex items-center justify-center disabled:opacity-50"
          disabled={!newTaskText.trim()}
          aria-label="Añadir tarea"
        >
          <PlusIcon />
        </button>
      </form>
      
      <div className="space-y-3 h-64 overflow-y-auto pr-2">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={onToggleTask} 
              onDelete={onDeleteTask} 
            />
          ))
        ) : (
          <p className="text-center text-gray-500 pt-8">Aún no hay tareas. ¡Añade una!</p>
        )}
      </div>

      <div className="border-t border-gray-700 pt-4 flex justify-between items-center text-sm text-gray-400">
        <span>{tasks.length - completedCount} Tareas pendientes</span>
        <button 
          onClick={onDeleteCompleted}
          className="text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={completedCount === 0}
        >
          Limpiar completadas
        </button>
      </div>
    </div>
  );
};

export default Checklist;
