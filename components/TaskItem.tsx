
import React from 'react';
import { Task } from '../types';
import TrashIcon from './icons/TrashIcon';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg group">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-5 w-5 rounded bg-gray-600 border-gray-500 text-teal-500 focus:ring-teal-500 cursor-pointer"
        />
        <span className={`transition-colors ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
          {task.text}
        </span>
      </div>
      <button 
        onClick={() => onDelete(task.id)}
        className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Eliminar tarea ${task.text}`}
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default TaskItem;
