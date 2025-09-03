
import React, { useState, useMemo } from 'react';
import { Task } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Carousel from './components/Carousel';
import Checklist from './components/Checklist';

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [nextId, setNextId] = useLocalStorage<number>('nextId', 1);

  const pendingTasks = useMemo(() => tasks.filter(task => !task.completed), [tasks]);

  const handleAddTask = (text: string) => {
    if (text.trim() === '') return;
    const newTask: Task = {
      id: nextId,
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDeleteCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Lista de Tareas
        </h1>
        <p className="text-gray-400 mt-2">Organiza tu día, una tarea a la vez.</p>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-teal-400">Tareas Pendientes</h2>
          <Carousel pendingTasks={pendingTasks} />
        </div>
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-teal-400">Gestionar Tareas</h2>
          <Checklist 
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onDeleteCompleted={handleDeleteCompletedTasks}
          />
        </div>
      </main>

      <footer className="w-full max-w-4xl text-center mt-12 text-gray-500 text-sm">
        <p>Creado con React, TypeScript y Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
